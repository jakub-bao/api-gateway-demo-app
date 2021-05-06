#!/usr/bin/bash
name=$1
[ -z "$name" ] && echo "Library name not specified" && exit 1
src="../dhis2-app/${name}/dist/**/*"
echo "Watching $src"
cpx "$src" "./node_modules/@dhis2-app/${name}/dist" --watch #-v
