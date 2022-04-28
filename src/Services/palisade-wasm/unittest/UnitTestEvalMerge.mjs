import assert from 'assert'
import factory from '../lib/palisade_pke.js'
import {copyVecToJs} from './common.mjs'

function mockEvalMerge(arrays) {
	return arrays.map(array => array[0])
}

async function TestArbBGVEvalMerge() {
	const module = await factory();
	try {

		const arrays = [
			[4],
			[2],
			[3],
			[5],
		];
		const expected = mockEvalMerge(arrays);
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
		// rotation keys MUST be pre-computed to use EvalMerge()
		cc.EvalAtIndexKeyGen(kp.secretKey,[-1,-2,-3,-4,-5,-6,-7,-8]);

		const plaintexts = vectors.map(
			vector => cc.MakePackedPlaintext(vector)
		);

		const ciphertexts = plaintexts.map(
			plaintext => cc.Encrypt(kp.publicKey, plaintext)
		);

		const ciphertextProduct = cc.EvalMerge(ciphertexts);
		const plaintext = cc.Decrypt(kp.secretKey,ciphertextProduct);
		plaintext.SetLength(arrays.length);
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
	describe('#EvalMerge()', () => {
		it('Should merge multiple ciphertexts into one', TestArbBGVEvalMerge)
		.timeout(10000)
	});
});
