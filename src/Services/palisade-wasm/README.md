# General information

`palisade-wasm` is the official web-assembly port of the [PALISADE homomorphic library](https://palisade-crypto.org/). `palisade-wasm` supports all homomorphic encryption schemes supported by PALISADE and exposes an API similar to the C++ API for PALISADE.

All versions of PALISADE starting with v1.11.3 are supported.

`palisade-wasm` is licensed under the BSD-3 license.

# Quick Start

The fastest way to install the Palisade WASM port
is through the npm [package](https://www.npmjs.com/package/palisade-crypto)

```
npm install palisade-crypto
node
> palisade = require('palisade-crypto')
> palisade.CreatePKEModule().then(x=>{pke=x;console.log(pke)})
> // now the pke module is loaded as 'pke' in the global scope
```

# Notes specific to palisade-wasm

* The `palisade-wasm` port is somewhat slower than the C++ version of PALISADE due to a normal slowdown incurred in web assembly builds (typically 2x) and additional slow-down due to the use of 64-bit arithmetic in PALISADE (64-bit arithmetic is emulated in WASM).
* We optimized `palisade-wasm` for `BGVrns`, `CKKS`, and `FHEW` schemes. The users should typically expect a slowdown of 2x-3x as compared to `clang` builds and about 4x-5x as compared to `gcc` builds.
* We did not optimize `BFVrns` and `BFVrnsB`. So a more significant slowdown is expected for some operations in these schemes, specifically the homomorphic multplication. We recommend using `BGVrns` instead of `BFVrns` and `BFVrnsB` in use cases where homomorphic computations using `palisade-wasm` need to be performed. In scenarios where only client operations, i.e., key generation, encryption, and decryption, are needed, either scheme can be used.
* Web assembly running environment is typically limited to 4GB of RAM.
* `palisade-wasm` does not currently support multi-threading.

# Examples

`palisade-wasm` comes with the following examples, which are the JS versions of selected C++ PALISADE examples:

- [boolean.js](examples/js/binfhe/boolean.js): shows an example of Boolean circuit evaluation using FHEW (in the TFHE/GINX mode)
- [boolean_serial_binary.js](examples/js/binfhe/boolean_serial_binary.js): shows an example with serialization/deserialization of Boolean circuit evaluation using FHEW (in the TFHE/GINX mode)
- [pre_buffer.js](examples/js/pke/pre-buffer.js): demonstrates use of PALISADE for encryption, proxy re-encryption and decryption of packed vector of binary data
- [simple_integer.js](examples/js/pke/simple_integer.js): simple example showing homomorphic additions, multiplications, and rotations for vectors of integers using BFVrns
- [simple_integer_bgvrns.js](examples/js/pke/simple_integer_bgvrns.js): simple example showing homomorphic additions, multiplications, and rotations for vectors of integers using BGVrns
- [simple_integer_serial_buffer.js](examples/js/pke/simple_integer_serial_buffer.js): simple example showing typical serialization/deserialization calls for a prototype computing homomorphic additions, multiplications, and rotations for vectors of integers using BFVrns
- [simple_real_numbers.js](examples/js/pke/simple_real_numbers.js): simple example showing homomorphic additions, multiplications, and rotations for vectors of real numbers using CKKS
- [threshold_fhe.js](examples/js/pke/threshold_fhe.js): shows several examples of threshold FHE in BGVrns, BFVrns, and CKKS

# Build instructions from source

1. Install `emscripten` using the instructions at https://emscripten.org/docs/getting_started/downloads.html.
2. Install `NodeJs` if not already installed.
3. Clone PALISADE either from https://gitlab.com/palisade/palisade-development or https://gitlab.com/palisade/palisade-release.
4. Cd to the PALISADE folder (either `palisade-development` or `palisade-release`) and create `embuild` directory.
5. Run
```
export PREFIX=~/install/location
mkdir embuild
cd embuild
emcmake cmake .. -DCMAKE_INSTALL_PREFIX=${PREFIX}
emmake make -jN
```
Where N is number of cores available.
to do the cmake configuration. Here, `~/install/location` can be replaced with any empty directory at the desired location where palisade binaries should be installed.

6. Run
```
emmake make install
```
to install the binaries in the desired location.

To include the unit tests, examples, or benchmarks, the corresponding cmake flags can be set to "ON" instead of "OFF".


7. Clone the `palisade-wasm` repository and cd to `palisade-wasm`.

8. Run the following commands to build the NodeJS bindings.
```
mkdir build
cd build
emcmake cmake .. -DPalisade_DIR=${PREFIX}/lib/Palisade
emmake make
```

This should install emscripten libraries in `palisade-wasm/lib` directory.

9. Now run the examples in the following directories using `nodejs`
* examples/js/binfhe/
* examples/js/pke/

## Running web-assembly unit tests

Compile PALISADE in the `embuild` directory using the following CMake flags
```
emcmake cmake .. -DBUILD_UNITTESTS=ON -DCMAKE_INSTALL_PREFIX=~/install/location
```

Run unit tests using `nodejs`:
```
nodejs unittest/binfhe_tests.js
nodejs unittest/pke_tests.js
```

## Running web-assembly benchmarks

Compile PALISADE in the `embuild` directory using the following CMake flags
```
emcmake cmake .. -DBUILD_BENCHMARKS=ON -DCMAKE_INSTALL_PREFIX=~/install/location
```

Run benchmarks using `nodejs`, e.g.,
```
nodejs benchmark/lib-benchmark.js
```

# Typescript Development

For usage examples, we would like to test our code using the same import syntax
as any other user.
To achieve this, run `npm link` followed by `npm link palisade-crypto`.

# Building

To build the distributed package, run `npm run build_package`
followed by `npm pack`
