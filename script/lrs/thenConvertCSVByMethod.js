// bulk conversion functions
function thenConvertCSVByMethod(fileContents) {
  console.log("thenConvertCSVByMethod");

  //set method parameter depending on tab
  if (currentLRM == `referencemarker-tab`) {
    method = 2;
    csvinToResultsArray(fileContents, method, 1, 2, 3); // need to determine template
  } else if (currentLRM == `controlsection-tab`) {
    method = 3;
    csvinToResultsArray(fileContents, method, 1, 2); // need to determine template
  } else if (currentLRM == `distancefromorigin-tab`) {
    method = 4;
    csvinToResultsArray(fileContents, method, 1, 2); // need to determine template
  } else {
    method = 1;
    csvinToResultsArray(fileContents, method, 2, 1);
  }
}
