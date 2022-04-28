import assert from 'assert'
import factory from '../lib/palisade_pke.js'
import {copyVecToJs} from './common.mjs'

const targetTowers = 1;

async function TestArbBGVEvalNegate() {
	const module = await factory();
	try {

		const x = 5;
		// operation is squaring; expect x^2
		const expected = x*x;
		const vector = module.MakeVectorInt64Clipped([x]);

		const plaintextModulus = 65537;
		const sigma = 3.2;
		const depth = 2;
		const cc = new module.GenCryptoContextBGVrns(depth,
			plaintextModulus, module.SecurityLevel.HEStd_128_classic,
			sigma, depth, module.MODE.OPTIMIZED,
			module.KeySwitchTechnique.HYBRID);
		// Enable features that you wish to use
		cc.Enable(module.PKESchemeFeature.ENCRYPTION);
		cc.Enable(module.PKESchemeFeature.SHE);
		cc.Enable(module.PKESchemeFeature.LEVELEDSHE);

		const kp = cc.KeyGen();
		cc.EvalMultKeyGen(kp.secretKey);

		const plaintext = cc.MakePackedPlaintext(vector);

		const ciphertext = cc.Encrypt(kp.publicKey, plaintext);
		// perform multiplication to increase towers
		const ciphertextSquared =
			cc.EvalMultCipherCipher(ciphertext,ciphertext);

		// in the JS port, we don't bother exporting ciphertext.GetElements().
		// Instead, verify compression works by asserting that
		// the serialized compressed ciphertext is smaller than
		// the serialized original ciphertext.
		const compressed = cc.Compress(ciphertextSquared, targetTowers);

		const originalBuffer =
			module.SerializeCiphertextToBuffer(ciphertextSquared, module.SerType.BINARY);
		const compressedBuffer =
			module.SerializeCiphertextToBuffer(compressed, module.SerType.BINARY);

		const originalBufferLength = originalBuffer.byteLength;
		const compressedBufferLength = compressedBuffer.byteLength;

		assert(compressedBufferLength < originalBufferLength);

		const decrypted = cc.Decrypt(kp.secretKey,ciphertextSquared);
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
	describe('#Compress()', () => {
		it('Should reduce tower size to specified target', TestArbBGVEvalNegate)
		.timeout(10000)
	});
});
