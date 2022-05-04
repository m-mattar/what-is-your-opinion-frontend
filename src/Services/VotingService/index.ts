import { Question } from "../../Models/Question";
import { VoteOption } from "../../Models/VoteOption";
import { BASE_URL } from "../ServicesUtils";
import axios from "axios";

// const factory = {}; // = require("../palisade-wasm/lib/palisade_pke")

class VotingService {
  public getQuestionById(questionId: string): Question {
    let Mock_Question = {
      id: questionId,
      questionType: "What's your opinion on...",
      voteOptions: [
        {id: "1", option: "With"},
        {id: "2", option: "Against"}
      ] as VoteOption[],
      entity: "The American University of Beirut",
    } as Question;

    return Mock_Question;
  };

  private deserializeCiphertext(str: string,
                                module: {
                                  DeserializeCiphertextFromBuffer: (arg0: Uint8Array, arg1: any) => any;
                                  SerType: { BINARY: any; };
                                }) {
    const strarr = str.split(',')
    const numarr = strarr.map((el) => parseInt(el))
    const uint8arr = Uint8Array.from(numarr)
    const obj = module.DeserializeCiphertextFromBuffer(uint8arr, module.SerType.BINARY)
    return obj
  }

  private serializeCiphertext(obj: any,
                              module: {
                                SerializeCiphertextToBuffer: (arg0: any, arg1: any) => any;
                                SerType: { BINARY: any; };
                              }) {
    const uint8arr = module.SerializeCiphertextToBuffer(obj, module.SerType.BINARY)
    return uint8arr.join()
  }

  private deserializePublicKey(str: string,
                               module: {
                                 DeserializePublicKeyFromBuffer: (arg0: Uint8Array, arg1: any) => any;
                                 SerType: { BINARY: any; };
                               }) {
    var strarr = str.split(',');
    var numarr = strarr.map((el) => parseInt(el))
    var uint8array = Uint8Array.from(numarr);
    const obj = module.DeserializePublicKeyFromBuffer(uint8array, module.SerType.BINARY)
    return obj
  }


  private serializePublicKey(obj: any,
                             module: {
                               SerializePublicKeyToBuffer: (arg0: any, arg1: any) => any;
                               SerType: { BINARY: any; };
                             }) {
    const uint8arr = module.SerializePublicKeyToBuffer(obj, module.SerType.BINARY)
    return uint8arr.join()
  }

  public async collect(pollID: any,
                       oneTimeCode: any,
                       location: any) {

    // const module = await factory()
    // var cc = null
    //
    // try {
    //   const plaintextModulus = 65537
    //   const sigma = 3.2
    //   const depth = 2
    //
    //   cc = new module.GenCryptoContextBGVrns(depth,
    //     plaintextModulus, module.SecurityLevel.HEStd_128_classic,
    //     sigma, depth, module.MODE.OPTIMIZED, module.KeySwitchTechnique.HYBRID)
    //
    //   cc.Enable(module.PKESchemeFeature.ENCRYPTION)
    //   cc.Enable(module.PKESchemeFeature.SHE)
    //   cc.Enable(module.PKESchemeFeature.MULTIPARTY)
    //
    // } catch (err) {
    //   console.error(err)
    //   return 1
    // }
    //
    // const getCollectRes = await axios({
    //   method: 'post',
    //   url: `${BASE_URL}/collect/jointPublicKey`,
    //   data: {
    //     id: pollID
    //   }
    // })
    //
    // const numVoters = getCollectRes.data.numVoters
    // const jointPublicKeyStr = getCollectRes.data.jointPublicKey
    //
    // var keyPair = null
    //
    // if (!jointPublicKeyStr) {
    //   keyPair = cc.KeyGen()
    // } else {
    //   const jointPublicKey = this.deserializePublicKey(jointPublicKeyStr, module)
    //   keyPair = cc.MultipartyKeyGen(jointPublicKey)
    // }
    //
    // const newJointPublicKeyStr = this.serializePublicKey(keyPair.publicKey, module)
    //
    // await axios({
    //   method: 'post',
    //   url: `${BASE_URL}/collect`,
    //   data: {
    //     id: pollID,
    //     newNumVoters: numVoters + 1,
    //     newJointPublicKey: newJointPublicKeyStr,
    //     oneTimeCode: oneTimeCode,
    //     location: location
    //   }
    // })
    //
    // return keyPair.secretKey;

    return "SecretKey";
  }


  public async votePhase(module: any,
                         cc: { MakePackedPlaintext: (arg0: any) => any; Encrypt: (arg0: any, arg1: any) => any; },
                         pollID: any, realJointPublicKey: any) {
    var realEncryptedVotes = []

    const getOneTimeCodesRes = await axios({
      method: 'post',
      url: `${BASE_URL}/poll/oneTimeCodes`,
      data: {
        id: pollID
      }
    })

    const oneTimeCodes = getOneTimeCodesRes.data

    const getVoteRes = await axios({
      method: 'post',
      url: `${BASE_URL}/vote/jointPublicKey`,
      data: {
        id: pollID
      }
    })

    const jointPublicKeyStr = getVoteRes.data.jointPublicKey
    const jointPublicKey = this.deserializePublicKey(jointPublicKeyStr, module)

    if (jointPublicKeyStr === this.serializePublicKey(realJointPublicKey, module)) {
      console.log("jointPublicKey equal")
    }

    for (var i = 0; i < 3; i++) {
      console.log('Voting: ' + i)

      const vectorOfInts = module.MakeVectorInt64Clipped(i === 0 ? [1, 0] : [0, 1]);
      const plaintext = cc.MakePackedPlaintext(vectorOfInts);
      const ciphertext = cc.Encrypt(jointPublicKey, plaintext);

      realEncryptedVotes.push(ciphertext)

      const serializedCiphertext = this.serializeCiphertext(ciphertext, module)

      await axios({
        method: 'post',
        url: `${BASE_URL}/vote`,
        data: {
          id: pollID,
          oneTimeCode: oneTimeCodes[i].code,
          encryptedVote: serializedCiphertext
        }
      })
    }

    const getSeparateRes = await axios({
      method: 'post',
      url: `${BASE_URL}/decrypt/votes`,
      data: {
        id: pollID
      }
    })

    const separateVotes: number[] = getSeparateRes.data.map((vote: { encryptedVote: any; }) => vote.encryptedVote)
    for (const idx in separateVotes) {
      if (separateVotes[idx] === this.serializeCiphertext(realEncryptedVotes[idx], module)) {
        console.log('equal separate')
      }
    }

    return realEncryptedVotes
  }

  public async decryptPhase(module: any, cc: any, pollID: any, secretKeys: any[],
                            realJointEncryption: any, realPartialDecryptions: any) {
    const getOneTimeCodesRes = await axios({
      method: 'post',
      url: `${BASE_URL}/poll/oneTimeCodes`,
      data: {
        id: pollID
      }
    })

    const oneTimeCodes = getOneTimeCodesRes.data

    for (var i = 0; i < 3; i++) {
      console.log('Decrypting: ' + i)
      const getDecryptRes = await axios({
        method: 'post',
        url: `${BASE_URL}/decrypt/jointEncryption`,
        data: {
          id: pollID
        }
      })

      const jointEncryptionStr = getDecryptRes.data.jointEncryption
      const numReceivedDecryptions = getDecryptRes.data.numReceivedDecryptions

      const jointEncryption = this.deserializeCiphertext(jointEncryptionStr, module)

      if (jointEncryptionStr === this.serializeCiphertext(realJointEncryption, module)) {
        console.log("jointEncryption equal")
      }

      var ciphertextPartial = null
      if (numReceivedDecryptions === 0) {
        ciphertextPartial = cc.MultipartyDecryptLead(secretKeys[i], [jointEncryption]).get(0)
      } else {
        ciphertextPartial = cc.MultipartyDecryptMain(secretKeys[i], [jointEncryption]).get(0)
      }

      const ciphertextPartialStr = this.serializeCiphertext(ciphertextPartial, module)

      await axios({
        method: 'post',
        url: `${BASE_URL}/decrypt`,
        data: {
          id: pollID,
          oneTimeCode: oneTimeCodes[i].code,
          partialDecryption: ciphertextPartialStr
        }
      })
    }

    // const getPartialsRes = await axios({
    // 	method: 'post',
    // 	url: `${domain}/decrypt/votes`,
    // 	data: {
    // 		id: pollID
    // 	}
    // })

    // const partialDecryptions = getPartialsRes.data.map((vote) => vote.partialDecryption)

    // for (const j in partialDecryptions) {
    // 	if (partialDecryptions[j] === serializeCiphertext(realPartialDecryptions[j])) {
    // 		console.log('Partial decryptions equal')
    // 		throw 1
    // 	}
    // }

  }

};

export const votingService = new VotingService();