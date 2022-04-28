// based on
// https://gitlab.com/palisade/palisade-development/-/blob/master/src/pke/unittest/UnitTestEvalInnerProduct.cpp

import assert from 'assert'
import factory from '../lib/palisade_pke.js'

function makeRandomArray(size,limit) {
	return [...Array(size)]
		.map( () => Math.round(Math.random()*limit) )
}

function dot(x,y) {
	let sum = 0;
	for ( let i=0; i<x.length; ++i ) {
		sum += x[i] * y[i];
	}
	return sum;
}

const size = 2;

async function TestArbBFVInnerProductPackedArray() {
	const limit = 15;
	const plaintextMod = 2333;

	const input1 = makeRandomArray(size,limit);
	const input2 = makeRandomArray(size,limit);

	let expectedResult = dot(input1,input2) % plaintextMod;
	if (expectedResult > plaintextMod / 2) expectedResult -= plaintextMod;

	const module = await factory();
	const result = ArbBFVInnerProductPackedArray(module, input1, input2);

	assert.equal(expectedResult,result);
}

// both inputs are VectorInt64
function ArbBFVInnerProductPackedArray(module, input1, input2) {
	const plaintextModulus = 65537;
	const sigma = 3.2;
	const depth = 2;

 	const cc = module.GenCryptoContextBFVrns(
	  plaintextModulus, module.SecurityLevel.HEStd_128_classic,
	  sigma, 0, depth, 0, module.MODE.OPTIMIZED);

	cc.Enable(module.PKESchemeFeature.ENCRYPTION);
	cc.Enable(module.PKESchemeFeature.SHE);

	// Initialize the public key containers
	const kp = cc.KeyGen();

	const input1vec = module.MakeVectorInt64Clipped(input1);
	const input2vec = module.MakeVectorInt64Clipped(input2);
	const intArray1 = cc.MakePackedPlaintext(input1vec);
	const intArray2 = cc.MakePackedPlaintext(input2vec);

	cc.EvalSumKeyGen(kp.secretKey);
	cc.EvalMultKeyGen(kp.secretKey);

	const ciphertext1 = cc.Encrypt(kp.publicKey, intArray1);
	const ciphertext2 = cc.Encrypt(kp.publicKey, intArray2);

	const result = cc.EvalInnerProduct(ciphertext1, ciphertext2, size);

	const intArrayNew = cc.Decrypt(kp.secretKey, result);

	return intArrayNew.GetPackedValue().get(0);
}

describe('CryptoContext', () => {
	describe("#EvalInnerProduct()", () => {
		it(
			'Should compute the same inner product '+
			'for ciphertexts as native numbers',
			TestArbBFVInnerProductPackedArray
		).timeout(10000) // increase timeout because operation is slow
	});
});
