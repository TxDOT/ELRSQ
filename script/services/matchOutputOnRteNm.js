/**
 *
 * @param {*} calcGeomType is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} unfilteredArr is an array with two elements, each of which is an array
 * @param {*} rte_nm is a user-provided Route Name
 * @returns an object with values for each LRM conversion data point
 *  if there is no data, each data point should be null
 */

async function matchOutputOnRteNm(convertSessionParams, unfilteredArr, rte_nm) {
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(unfilteredArr); }
  let matchError = 0;
  let preBEGIN = `BEGIN_`;
  let preEND = `END_`;

  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  let notmatch0 = lrsDummy;
  let notmatchbegin = Object.keys(lrsDummy).reduce((a, c) => (a[`${preBEGIN}${c}`] = lrsDummy[c], a), {});
  Object.keys(notmatchbegin).forEach((i) => notmatchbegin[i] = null);
  let notmatchend = Object.keys(lrsDummy).reduce((a, c) => (a[`${preEND}${c}`] = lrsDummy[c], a), {});
  Object.keys(notmatchend).forEach((i) => notmatchend[i] = null);

  let notmatch1 = { ...notmatchbegin, ...notmatchend };

  // get right rte_nm
  if (convertSessionParams.currentLrmNo == 1 || convertSessionParams.currentLrmNo == 3) {
    rte_nm = await getRightRteNm(convertSessionParams, unfilteredArr);
  }

  // match output
  let output0 = {};
  let output1 = {};
  let match = {};

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  output0 = results0[index0];

  if (convertSessionParams.calcGeomType == "Point") {
    matchError = index0; // if index0 is -1 it will set matchError to that value

    if (matchError >= 0) {
      match = { ...output0 };
    }

    else {
      match = notmatch0;
    }
  }


  if (convertSessionParams.calcGeomType == "Route") {
    matchError = index0; // if index0 is -1 it will set matchError to that value

    if (matchError >= 0) {

      let index1 = results1.findIndex(function (item, i) {
        return item.RTE_DEFN_LN_NM === rte_nm;
      });

      matchError = index1; // if index1 is -1 it will set matchError to that value
      output1 = results1[index1];

      if (matchError >= 0) {
        bdfo = output0['RTE_DFO'];
        edfo = output1['RTE_DFO'];

        // check min and max DFOs and transpose if necessary
        let begin = {};
        let end = {};

        if (bdfo > edfo) {
          begin = Object.keys(output1).reduce((a, c) => (a[`${preBEGIN}${c}`] = output1[c], a), {});
          end = Object.keys(output0).reduce((a, c) => (a[`${preEND}${c}`] = output0[c], a), {});
        } else {
          begin = Object.keys(output0).reduce((a, c) => (a[`${preBEGIN}${c}`] = output0[c], a), {});
          end = Object.keys(output1).reduce((a, c) => (a[`${preEND}${c}`] = output1[c], a), {});
        }

        match = { ...begin, ...end };
      }

      else {
        match = notmatch1;
      }
    }

    else {
      match = notmatch1;
    }

  }

  return (match);
}
