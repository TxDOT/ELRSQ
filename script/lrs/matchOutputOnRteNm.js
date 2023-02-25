//get right route
async function matchOutputOnRteNm(inputMethod, method, P_results, rte_nm) {
  let p_output = {};

  //get right route
  if (method == 1 || method == 3) {
    if (inputMethod == "html") {
      let P_RTENMs = P_results.map(a => a.RTE_DEFN_LN_NM);
      dropDownPopulator("#candidateRTENMs", P_RTENMs); // need to dynamically create selector
      rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
      rte_nm = P_RTENMs[rte_nm_Index];
    }
    else if (inputMethod == "table") {

    }
  }
  // end get right route

  let p_index = P_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  p_output = P_results[p_index];

  let matchOutputOnRteNmOutput = [];

  try {
    matchOutputOnRteNmOutput = (Object.values(p_output));
  } catch (err) {
    matchOutputOnRteNmOutput = lrsApiFields.concat(lrsApiFields);
  }

  return (matchOutputOnRteNmOutput);
}