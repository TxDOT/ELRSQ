// bulk conversion functions
function thenConvertCSVByMethod(fileContents) {
  console.log("thenConvertCSVByMethod");

  //TODO set method parameter depending on tab

  /**
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
  */

  // get indices
  if (currentLRM == `referencemarker-tab`) {
    method = 2;
    lrm_indices = [1, 2, 3];
  }

  else if (currentLRM == `controlsection-tab`) {
    method = 3;
    lrm_indices = [1, 2];
  }

  else if (currentLRM == `distancefromorigin-tab`) {
    method = 4;
    lrm_indices = [1, 2];
  }

  else {
    method = 1;
    lrm_indices = [2, 1];
  }
  // end get indices

  csvinToResultsArray(fileContents, method, lrm_indices);

}