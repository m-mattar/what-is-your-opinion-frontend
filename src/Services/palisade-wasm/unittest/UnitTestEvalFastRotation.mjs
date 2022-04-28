import assert from 'assert'
import factory from '../lib/palisade_pke.js'
import {copyVecToJs} from './common.mjs'

function rotate(x,index) {
	return x.slice(index).concat(x.slice(0,index));
}

function mockFastRotations(x, rotations) {
	return rotations.map( rotation => rotate(x,rotation) )
}

async function TestFastRotationCorrect() {
	const module = await factory();
	try {

		const x = [0,0,0,0, 0,0,0,1];
		const rotations = [1,2,3,4,5,6,7];
		const expected = mockFastRotations(x,rotations);
		const vector = module.MakeVectorInt64Clipped(x);

		const plaintextModulus = 65537;
		const sigma = 3.2;
		const depth = 2;
		const cc = new module.GenCryptoContextBGVrns(depth,
			plaintextModulus, module.SecurityLevel.HEStd_128_classic,
			sigma, depth, module.MODE.OPTIMIZED,module.KeySwitchTechnique.HYBRID);

		// Enable features that you wish to use
		// from  core/include/utils/inttype.h, line 115
		cc.Enable(module.PKESchemeFeature.ENCRYPTION);
		cc.Enable(module.PKESchemeFeature.SHE);
		cc.Enable(module.PKESchemeFeature.LEVELEDSHE);

		const kp = cc.KeyGen();

		const plaintext = cc.MakePackedPlaintext(vector);

		const ciphertext = cc.Encrypt(kp.publicKey, plaintext);

		// M is the cyclotomic order and we need it to call EvalFastRotation()
		const M = 2 * cc.GetRingDimension();

		// need to generate eval keys for each of the rotations we are doing
		cc.EvalAtIndexKeyGen(kp.secretKey, rotations);
		// pre-computation is required to use EvalFastRotation()
		const precomp = cc.EvalFastRotationPrecompute(ciphertext);
		const rotatedCiphertexts = rotations.map(
			rotation => cc.EvalFastRotation(ciphertext,rotation,M,precomp)
		);

		const decryptedPlaintexts = rotatedCiphertexts.map(
			ciphertext => cc.Decrypt(kp.secretKey, ciphertext)
		);
		decryptedPlaintexts.forEach(plaintext => plaintext.SetLength(x.length));
		const got = decryptedPlaintexts.map(
			plaintext => copyVecToJs(plaintext.GetPackedValue())
		);

		assert.deepEqual(expected,got);
	}
	catch (error) {
		throw typeof error === 'number' ?
			new Error(module.getExceptionMessage(error)) : error
	}
}

describe('CryptoContext', () => {
	describe('#EvalFastRotation()', () => {
		it('Should rotate ciphertexts correctly', TestFastRotationCorrect)
		.timeout(20000)
	});
});
