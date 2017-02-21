#!/bin/sh

# Author: Travis Clarke (travis.m.clarke@travismclarke.com)
# Date: Thu, 10 Dec 2016
# Version: 1.0.0
#
# The MIT License (MIT)

# Copyright (c) 2016 - Travis Clarke - https://www.travismclarke.com

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.


######################################################
######% CONFIG %######################################
######################################################
PROJECT_ROOT='.'
PACKAGE_JSON="${PROJECT_ROOT}/package.json"

FILES=()
# ... add files that need version bumping HERE!
#
# e.g.
FILES+=("${PACKAGE_JSON}")
FILES+=("${PROJECT_ROOT}/bower.json")
FILES+=("${PROJECT_ROOT}/image-map.js")
#
######################################################
######################################################
######################################################

if [ "${#FILES[@]}" = 0 ]; then
	echo
	echo "${RED}Configure ${NC}${LIGHTRED}FILES${NC}${RED} before using.${NC}" >&2
	exit 0
fi

BOLD='\033[1m'
NC='\033[0m'
WHITE='\033[1;37m'
RED='\033[31m'
LIGHTRED='\033[1;31m'

PACKAGE_VERSION=$(cat "${PACKAGE_JSON}"\
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g'
  )

IFS='.' read -r MAJOR MINOR PATCH <<< "${PACKAGE_VERSION}"

VERSION="${BOLD}v1.0.0${NC}"

USAGE=$(cat <<EOF
\n
\t${BOLD}bump.sh${NC} --help 		# Print usage information.
\n
\t${BOLD}bump.sh${NC} --version 	# Print version number.
\n
\t${BOLD}bump.sh${NC} --verbose 	# Verbose mode.
\n
\t${BOLD}bump.sh${NC} --patch\t 	# v0.0.0 => v0.0.1
\n
\t${BOLD}bump.sh${NC} --minor\t 	# v0.0.0 => v0.1.0
\n
\t${BOLD}bump.sh${NC} --major\t 	# v0.0.0 => v1.0.0
\n
\t${BOLD}bump.sh${NC} 		# same as: ${BOLD}bump.sh${NC} --patch
\n
EOF
)

# OPTIONS RETRIEVAL
function get_options() {
    while [ "$@" ]; do
        case "$1" in
        -h|--help )
            echo "${USAGE}"
            exit 0
            ;;
        -v|--verbose )
            VERBOSE="-v"
            shift
            ;;
        --version )
            echo "${VERSION}"
            exit 0
            ;;
        --patch )
            PATCH=$((${PATCH} + 1))
            shift
            ;;
        --minor )
            MINOR=$(($MINOR + 1))
            shift
            ;;
        --major )
            MAJOR=$(($MAJOR + 1))
            shift
            ;;
        *)
			echo
            echo "${RED}Error: unknown option ${NC}${LIGHTRED}$1${NC}" >&2 ;
            echo "${USAGE}"
            exit 1
            ;;
        esac
    done
}

# OPTIONS CHECK
if [ "$#" != 0 ]; then
    get_options $@
else
    # default
    PATCH=$((${PATCH} + 1))
fi

NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"

for file in "${FILES[@]}"
do
    replace ${VERBOSE-'-s'} "${PACKAGE_VERSION}" "${NEW_VERSION}" -- ${file}
done

echo && echo "${BOLD}v${PACKAGE_VERSION}${NC} => ${WHITE}v${NEW_VERSION}${NC}"
