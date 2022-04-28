import assert from 'assert'
import factory from '../lib/palisade_pke.js'
import {copyVecToJs} from './common.mjs'

function mockEvalNegate(x) {
	return -x
}

async function TestArbBGVEvalNegate() {
	const module = await factory();
	try {

		const x = 5;
		const expected = mockEvalNegate(x);
		const vector = module.MakeVectorInt64Clipped([x]);

		const plaintextModulus = 65537;
		const sigma = 3.2;
		const depth = 2;

		const cc = module.GenCryptoContextBFVrns(
		  plaintextModulus, module.SecurityLevel.HEStd_128_classic,
		  sigma, 0, depth, 0, module.MODE.OPTIMIZED);

		cc.Enable(module.PKESchemeFeature.ENCRYPTION);
		cc.Enable(module.PKESchemeFeature.SHE);

		const kp = cc.KeyGen();

		const plaintext = cc.MakePackedPlaintext(vector);

		const ciphertext = cc.Encrypt(kp.publicKey, plaintext);

		const ciphertextNegated = cc.EvalNegate(ciphertext);
		const decrypted = cc.Decrypt(kp.secretKey,ciphertextNegated);
		const got = decrypted.GetPackedValue().get(0);

		assert.equal(expected,got);
	}
	catch (error) {
		const msg = typeof error === 'number' ?
			module.getExceptionMessage(error) : error
		throw new Error(msg)
	}
}

describe('CryptoContext', () => {
	describe('#EvalNegate()', () => {
		it('Should multiply ciphertext by -1', TestArbBGVEvalNegate)
	});
});
