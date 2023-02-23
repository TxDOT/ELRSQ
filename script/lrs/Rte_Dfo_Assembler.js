// description


async function Rte_Dfo_Assembler(routeQueryOutput, method, B_results, E_results, rte_nm) {
  if (method == 2 || method == 4) {

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    let bdfo = B_results[b_index]['RTE_DFO'];

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    let edfo = E_results[e_index]['RTE_DFO'];

    routeQueryOutput.push(bdfo);
    routeQueryOutput.push(edfo);

  } else if (method == 1 || method == 3) {

    let B_RTENMs = B_results.map(a => a.RTE_DEFN_LN_NM);
    let E_RTENMs = E_results.map(a => a.RTE_DEFN_LN_NM);
    let BE_RTENMs = B_RTENMs.filter(x => E_RTENMs.includes(x));

    for (var i = 0; i < BE_RTENMs.length; i++) {
      var optn = BE_RTENMs[i];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;

      if (method == 1) {
        $("#candidateRTENMs").append(el);
      } else if (method == 3) {
        $("#candidateRTENMs_2").append(el);
      }

    }

    if (method == 1) {
      rte_nm = await confirmRTENM();
    } else if (method == 3) {
      rte_nm = await confirmRTENM_2();
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
}
