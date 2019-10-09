#! /bin/bash

##################################################
### This script expects to be executed by NPM
### from the root of the project. For example,
### with the command "npm run validateComponents"
### with the command "npm run validatecomponents"
##################################################


##################################################
### Be very sure when you add component names to
### these lists...
##################################################
compsAllowedToNotBeInTheStyleGuide=("Configurable") #"AuthRoute" "Configuration" "Logger")
compsAllowedToNotHaveDisplayName=("Configurable")
# Note that configurable creates its display name dynamically using the name of the component it wraps...
compsAllowedToNotHaveTests=()
compsAllowedToNotHaveExamples=("AuthRoute" "AutoCompleteInput" "Configurable" "Configuration" "Logger")
apisAllowedToNotHaveTests=("AbstractDocument" "DataPoint" "DataSet" "DateFormat" "DocumentMode" "FacetFilter" "FieldNames" "GraphEdge" "GraphNode" "Placement" "Position" "QueryResponse" "SearchDocument" "SearchFacet" "SearchFacetBucket" "SearchFacetStatistics" "SearchFeedback" "SearchPlacement" "SignalData" "Signals" "SimpleIngestDocument" "SimplePrincipal" "SimpleQueryRequest")
utilsAllowedToNotHaveTests=("ElasticToQueryResponse" "FetchUtils" "KnowledgeGraphUtils" "QueryRequestToElastic" "QueryRequestToSolr" "SolrToQueryResponse")


##################################################g
### Find all of the component classes in the project
##################################################

compdir="./src/components"
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


##################################################g
### Find all of the API classes in the project
##################################################

apidir="./src/api"
i=0
while read line
do
  if [[ $line =~ .*\.js$ ]]
  then
    name=`basename $line .js`
    apiNames[$i]="$name"
    (( i++ ))
  fi
done < <(ls -1 "${apidir}")

echo "The project has ${#apiNames[@]} API classes in it. Checking their validity..."

# for apiName in "${apiNames[@]}"
# do
#   echo $apiName
# done


##################################################g
### Find all of the utility classes in the project
##################################################

utildir="./src/util"
i=0
while read line
do
  if [[ $line =~ .*\.js$ ]]
  then
    name=`basename $line .js`
    utilNames[$i]="$name"
    (( i++ ))
  fi
done < <(ls -1 "${utildir}")

echo "The project has ${#utilNames[@]} utility classes in it. Checking their validity..."

# for utilName in "${utilNames[@]}"
# do
#   echo $utilName
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

##################################################g
### Validate that the API classes are all listed in
### the index.js file for export from the library
##################################################
i=0
for apiName in "${apiNames[@]}"
do
  if grep -q "\ $apiName\ " "./src/index.js"
  then
    :
  else
    missingApisInIndex[$i]="$apiName"
    (( i++ ))
  fi
done

echo ""
if [ ${#missingApisInIndex[@]} -eq 0 ]
then
  echo "API classes missing from the index.js file:"
  echo None
else
  echo "API classes missing from the index.js file (${#missingApisInIndex[@]}):"
  echo ${missingApisInIndex[*]}
fi

##################################################g
### Validate that the utility classes are all listed in
### the index.js file for export from the library
##################################################
i=0
for utilName in "${utilNames[@]}"
do
  if grep -q "\ $utilName\ " "./src/index.js"
  then
    :
  else
    missingUtilsInIndex[$i]="$utilName"
    (( i++ ))
  fi
done

echo ""
if [ ${#missingUtilsInIndex[@]} -eq 0 ]
then
  echo "Utility classes missing from the index.js file:"
  echo None
else
  echo "Utility classes missing from the index.js file (${#missingUtilsInIndex[@]}):"
  echo ${missingUtilsInIndex[*]}
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
### corresponding style guide example file
##################################################
i=0
for compName in "${compNames[@]}"
do
  if [ ! -f ./documentation/components/${compName}.md ]
  then
    compsMissingExamples[$i]="$compName"
    (( i++ ))
  fi
done

for i in "${compsAllowedToNotHaveExamples[@]}"; do
  compsMissingExamples=(${compsMissingExamples[@]//*$i*})
done

echo ""
if [ ${#compsMissingExamples[@]} -eq 0 ]
then
  echo "Components that have no corresponding style guide example:"
  echo None
else
  echo "Components that have no corresponding style guide example (${#compsMissingExamples[@]}):"
  echo ${compsMissingExamples[*]}
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


##################################################
### Validate that the API classes all have a
### corresponding test
##################################################
i=0
for apiName in "${apiNames[@]}"
do
  if [ ! -f ./tests/api/${apiName}-test.js ]
  then
    apisMissingTests[$i]="$apiName"
    (( i++ ))
  fi
done

for i in "${apisAllowedToNotHaveTests[@]}"; do
  apisMissingTests=(${apisMissingTests[@]//*$i*})
done

echo ""
if [ ${#apisMissingTests[@]} -eq 0 ]
then
  echo "API classes that have no corresponding test:"
  echo None
else
  echo "API classes that have no corresponding test (${#apisMissingTests[@]}):"
  echo ${apisMissingTests[*]}
fi


##################################################
### Validate that the utility classes all have a
### corresponding test
##################################################
i=0
for utilName in "${utilNames[@]}"
do
  if [ ! -f ./tests/util/${utilName}-test.js ]
  then
    utilsMissingTests[$i]="$utilName"
    (( i++ ))
  fi
done

for i in "${utilsAllowedToNotHaveTests[@]}"; do
  utilsMissingTests=(${utilsMissingTests[@]//*$i*})
done

echo ""
if [ ${#utilsMissingTests[@]} -eq 0 ]
then
  echo "Utility classes that have no corresponding test:"
  echo None
else
  echo "Utility classes that have no corresponding test (${#utilsMissingTests[@]}):"
  echo ${utilsMissingTests[*]}
fi


totalErrors=$((${#missingCompsInIndex[@]} + ${#missingApisInIndex[@]} + ${#missingUtilsInIndex[@]} + ${#missingCompsInStyleGuide[@]} + ${#compsMissingExamples[@]} + ${#compsWithMissingDisplayName[@]} + ${#apisMissingTests[@]} + ${#utilsMissingTests[@]})) # + ${#compsMissingTests[@]}  Don't complain about this yet

echo "Total Errors: ${totalErrors}"

exit $totalErrors
