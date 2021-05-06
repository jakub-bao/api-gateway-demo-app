#!/usr/bin/bash
name=$1
[ -z "$name" ] && echo "Library name not specified" && exit 1
src="../dhis2-app/${name}"
echo "Running npm start in $src"
cd $src
npm start
