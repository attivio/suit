#!/usr/local/bin/bash

SCRIPT_DIR="$(cd -P "$(dirname "$0")";pwd)"

processFile() {
  component="$1"
  file="$2"
  while read line
  do
    remainder1=${line#*__}
    remainder2=${remainder1%%.__*}
    possibleNumber=${remainder2%:__*}
    if [[ $possibleNumber =~ ^-?[0-9]+$ ]]
    then
      echo "  $component: /index.html#!/$component/$possibleNumber"
    fi
  done < $file
}

for filePath in "$SCRIPT_DIR/../documentation/components"/*
do
  fileName=${filePath##*/}
  baseFileName=${fileName%.*}
  processFile "$baseFileName" "$filePath"
done

