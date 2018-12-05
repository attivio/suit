#! /bin/bash

##################################################
### This script expects to be executed by NPM
### from the root of the project. For example,
### with the command "npm run cleanFlow"
##################################################

# It is designed to be passed the output of calling the
# flow command with node_modules errors filtered out.
# If there are additional errors, it will return that number
# or zero if all errors are from the node_modules
# directory.


errors=0
while read line
do
  if [[ $line =~ ^(src|docs|tests)/ ]]
  then
    echo $line
    (( errors++ ))
  fi
done

echo "The project has ${errors} errors."
exit $errors
