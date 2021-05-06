#!/usr/bin/bash
name=$1
[ -z "$name" ] && echo "Library name not specified" && exit 1
#src="../dhis2-app/${name}"
#npm install $(npm pack "$src" | tail -1)

src="../../dhis2-app/${name}"
cd localDep
file=$(npm pack "$src" | tail -1)
cd ..
npm install "./localDep/$file"