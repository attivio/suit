#! /bin/bash

##################################################
### This script expects to be executed by NPM
### from the root of the project. For example,
### with the command "npm run validateComponents"
##################################################


##################################################
### Be very sure when you add component names to
### these lists...
##################################################
compsAllowedToNotBeInTheStyleGuide=("AuthRoute" "Configurable" "Configuration" "Logger")
compsAllowedToNotHaveDisplayName=("Configurable" "NavTabInfo")
compsAllowedToNotHaveTests=()

compdir="./src/components"

##################################################g
### Find all of the components in the project
##################################################
i=0
while read line
do
  if [[ $line =~ .*\.js$ ]]
  then
    name=`basename $line .js`
    compNames[$i]="$name"
    (( i++ ))
  fi
done < <(ls -1 "${compdir}")

echo "The project has ${#compNames[@]} components in it. Checking their validity..."


# for compName in "${compNames[@]}"
# do
#   echo $compName
# done

##################################################g
### Validate that the components are all listed in
### the index.js file for export from the library
##################################################
i=0
for compName in "${compNames[@]}"
do
  if grep -q "\ $compName\ " "./src/index.js"
  then
    :
  else
    missingCompsInIndex[$i]="$compName"
    (( i++ ))
  fi
done

echo ""
if [ ${#missingCompsInIndex[@]} -eq 0 ]
then
  echo "Components missing from the index.js file:"
  echo None
else
  echo "Components missing from the index.js file (${#missingCompsInIndex[@]}):"
  echo ${missingCompsInIndex[*]}
fi

##################################################
### Validate that the components are all listed in
### the style guide configuration file
##################################################
i=0
for compName in "${compNames[@]}"
do
  if grep -q "/${compName}.js" "./styleguide.config.js"
  then
    :
  else
    missingCompsInStyleGuide[$i]="$compName"
    (( i++ ))
  fi
done

for i in "${compsAllowedToNotBeInTheStyleGuide[@]}"; do
  missingCompsInStyleGuide=(${missingCompsInStyleGuide[@]//*$i*})
done

echo ""
if [ ${#missingCompsInStyleGuide[@]} -eq 0 ]
then
  echo "Missing components in the styleguide.config.js file:"
  echo None
else
  echo "Missing components in the styleguide.config.js file (${#missingCompsInStyleGuide[@]}):"
  echo ${missingCompsInStyleGuide[*]}
fi

##################################################
### Validate that the components all have a
### corresponding test
##################################################
i=0
for compName in "${compNames[@]}"
do
  if [ ! -f ./tests/components/${compName}-test.js ]
  then
    compsMissingTests[$i]="$compName"
    (( i++ ))
  fi
done

for i in "${compsAllowedToNotHaveTests[@]}"; do
  compsMissingTests=(${compsMissingTests[@]//*$i*})
done

echo ""
if [ ${#compsMissingTests[@]} -eq 0 ]
then
  echo "Components that have no corresponding test:"
  echo None
else
  echo "Components that have no corresponding test (${#compsMissingTests[@]}):"
  echo ${compsMissingTests[*]}
fi

##################################################
### Validate that all of the components have a
### display name property.
##################################################
i=0
for compName in "${compNames[@]}"
do
  if grep -q "static\sdisplayName\s*=\s*'${compName}'\s*;" "./src/components/${compName}.js"
  then
    :
  else
    compsWithMissingDisplayName[$i]="$compName"
    (( i++ ))
  fi
done

for i in "${compsAllowedToNotHaveDisplayName[@]}"; do
  compsWithMissingDisplayName=(${compsWithMissingDisplayName[@]//*$i*})
done

echo ""
if [ ${#compsWithMissingDisplayName[@]} -eq 0 ]
then
  echo "Components which are missing the display name attribute:"
  echo None
else
  echo "Components which are missing the display name attribute (${#compsWithMissingDisplayName[@]}):"
  echo ${compsWithMissingDisplayName[*]}
fi



totalErrors=$((${#missingCompsInIndex[@]} + ${#missingCompsInStyleGuide[@]} + ${#compsMissingTests[@]} + ${#compsWithMissingDisplayName[@]}))

echo "Total Errors: ${totalErrors}"

exit $totalErrors
