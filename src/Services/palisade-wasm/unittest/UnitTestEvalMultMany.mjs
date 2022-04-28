import assert from 'assert'
import factory from '../lib/palisade_pke.js'
import {copyVecToJs} from './common.mjs'

function mockEvalMultMany(arrays) {
	const result = Array(arrays[0].length).fill(1)
	for (let i=0; i<arrays.length; i++) {
		for (let j=0; j<result.length; j++) {
			result[j] *= arrays[i][j];
		}
	}
	return result;
}


async function TestArbBGVEvalMultMany() {
	const module = await factory();
	try {

		const arrays = [
			[2,2,3,5,7],
			[3,2,3,5,7],
			[5,2,3,5,7],
			[7,2,3,5,7],
		];
		const expected = mockEvalMultMany(arrays);
		const vectors = arrays.map(
			array => module.MakeVectorInt64Clipped(array)
		);

		const plaintextModulus = 65537;
		const sigma = 3.2;
		const depth = 2;

		const cc = module.GenCryptoContextBFVrns(
		  plaintextModulus, module.SecurityLevel.HEStd_128_classic,
		  sigma, 0, depth, 0, module.MODE.OPTIMIZED);

		cc.Enable(module.PKESchemeFeature.ENCRYPTION);
		cc.Enable(module.PKESchemeFeature.SHE);

		const kp = cc.KeyGen();
		cc.EvalMultKeyGen(kp.secretKey);

		const plaintexts = vectors.map(
			vector => cc.MakePackedPlaintext(vector)
		);

		const ciphertexts = plaintexts.map(
			plaintext => cc.Encrypt(kp.publicKey, plaintext)
		);

		const ciphertextProduct = cc.EvalMultMany(ciphertexts);
		const plaintext = cc.Decrypt(kp.secretKey,ciphertextProduct);
		plaintext.SetLength(arrays[0].length);
		const got = copyVecToJs(plaintext.GetPackedValue());

		assert.deepEqual(expected,got);
	}
	catch (error) {
		const msg = typeof error === 'number' ?
			module.getExceptionMessage(error) : error
		throw new Error(msg)
	}
}

describe('CryptoContext', () => {
	describe('#EvalMultMany()', () => {
		it(
			'Should compute the same product '+
			'for ciphertexts as native numbers',
			TestArbBGVEvalMultMany
		).timeout(10000)
	});
});
