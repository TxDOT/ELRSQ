// description

























//get right route
async function rteDfoAssembler(routeQueryOutput, method, B_results, E_results, rte_nm) {

  //get right route
  if (method == 2 || method == 4) {

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    let bdfo = B_results[b_index]['RTE_DFO'];

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    let edfo = E_results[e_index]['RTE_DFO'];

    // check min and max DFOs and transpose if necessary
    routeQueryOutput.push(Math.min(bdfo, edfo));
    routeQueryOutput.push(Math.max(bdfo, edfo));

  } else

    if (method == 1 || method == 3) {

      let B_RTENMs = B_results.map(a => a.RTE_DEFN_LN_NM);
      let E_RTENMs = E_results.map(a => a.RTE_DEFN_LN_NM);
      let BE_RTENMs = B_RTENMs.filter(x => E_RTENMs.includes(x));

      if (method == 1) {
        dropDownPopulator("#candidateRTENMs", BE_RTENMs);
        rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
        rte_nm = BE_RTENMs[rte_nm_Index];
      } else if (method == 3) {
        dropDownPopulator("#candidateRTENMs_2", BE_RTENMs);
        rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs_2", "#candidateRTENMs_2");
        rte_nm = BE_RTENMs[rte_nm_Index];
      }

      routeQueryOutput.push(rte_nm);

      let b_index = B_results.findIndex(function (item, i) {
        return item.RTE_DEFN_LN_NM === rte_nm;
      });

      let bdfo = B_results[b_index]['RTE_DFO'];

      let e_index = E_results.findIndex(function (item, i) {
        return item.RTE_DEFN_LN_NM === rte_nm;
      });

      let edfo = E_results[e_index]['RTE_DFO'];

      // check min and max DFOs and transpose if necessary
      routeQueryOutput.push(Math.min(bdfo, edfo));
      routeQueryOutput.push(Math.max(bdfo, edfo));

    }
  // end get right route

  let rteOutputAssemblerOutput = [];
  /**
    try {
      rteOutputAssemblerOutput = (Object.values(b_output)).concat(Object.values(e_output));
    } catch (err) {
      rteOutputAssemblerOutput = lrsApiFields.concat(lrsApiFields);
    }
  */


  //return (rteOutputAssemblerOutput); //TODO change to a return function
}