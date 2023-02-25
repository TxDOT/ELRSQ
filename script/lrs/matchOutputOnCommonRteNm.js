//get right route
async function matchOutputOnCommonRteNm(inputMethod, method, B_results, E_results, rte_nm) {
  console.log(rte_nm);
  let b_output = {};
  let e_output = {};
  let transposed = 0;
  let RteDfoArr = [];
  let bdfo = '';
  let edfo = '';

  //get right route

  if (method == 1 || method == 3) {

    if (inputMethod == "html") {
      let B_RTENMs = B_results.map(a => a.RTE_DEFN_LN_NM);
      let E_RTENMs = E_results.map(a => a.RTE_DEFN_LN_NM);
      let BE_RTENMs = B_RTENMs.filter(x => E_RTENMs.includes(x));

      dropDownPopulator("#candidateRTENMs", BE_RTENMs); // need to dynamically create selector
      rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
      rte_nm = BE_RTENMs[rte_nm_Index];

      RteDfoArr.push(rte_nm);

    }

    else if (inputMethod == "table") {

    }

  }
  // end get right route

  let b_index = B_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  let e_index = E_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  b_output = B_results[b_index];
  e_output = E_results[e_index];
  bdfo = B_results[b_index]['RTE_DFO'];
  edfo = E_results[e_index]['RTE_DFO'];

  // check min and max DFOs and transpose if necessary
  if (bdfo > edfo) {
    transposed = 1;
  }

  RteDfoArr.push(Math.min(bdfo, edfo));
  RteDfoArr.push(Math.max(bdfo, edfo));


  let matchOutputOnCommonRteNmOutput = [];

  try {
    if (transposed == 0) {
      matchOutputOnCommonRteNmOutput = (Object.values(b_output)).concat(Object.values(e_output));
    } else {
      matchOutputOnCommonRteNmOutput = (Object.values(e_output)).concat(Object.values(b_output));
    }
  } catch (err) {
    matchOutputOnCommonRteNmOutput = lrsApiFields.concat(lrsApiFields);
  }

  return (matchOutputOnCommonRteNmOutput);
}