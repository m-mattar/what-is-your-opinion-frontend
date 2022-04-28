##
## CMakeLists.txt for PALISADE
##
## This script will build machine-specific header files for compile
## as it generates the Makefile
##


project(palisade-wasm)
cmake_minimum_required (VERSION 3.5.1)

set(CMAKE_CXX_STANDARD 11)
set(CXX_STANDARD_REQUIRED ON)


find_package(Palisade REQUIRED)
include_directories(${PALISADE_INCLUDE})

link_directories(${PALISADE_LIBDIR})
link_libraries(${PALISADE_LIBRARIES})

add_link_options(
	# for now, exceptions are enabled.
	# they are necessary for JSON serialization to work
	#	-sDISABLE_EXCEPTION_CATCHING
	-sALLOW_MEMORY_GROWTH=1
  -sERROR_ON_UNDEFINED_SYMBOLS=0
	-sMAXIMUM_MEMORY=4GB
  )
add_compile_options("-DPALISADE_VERSION=${Palisade_VERSION}")

### add each of the subdirs of src
add_subdirectory(src/binfhe)
add_subdirectory(src/core)
add_subdirectory(src/pke)

find_package (Doxygen QUIET COMPONENTS dot)
if (DOXYGEN_FOUND)

    add_custom_target( apidocs
        COMMAND sh -c "( cat ${CMAKE_CURRENT_SOURCE_DIR}/doc/doxygen-config && echo PROJECT_NUMBER=${PALISADE_VERSION} ) | ${DOXYGEN_EXECUTABLE} -"
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        COMMENT "Generating API documentation with Doxygen"
        VERBATIM )
	message (STATUS "Doxygen and dot are found")

else (DOXYGEN_FOUND)
  message(STATUS "Doxygen and dot (from graphviz) need to be installed to generate the doxygen documentation")
endif (DOXYGEN_FOUND)
