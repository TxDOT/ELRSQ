// description

function rteOutputAssembler(routeQueryOutput, method, B_results, E_results, rte_nm) {
  let b_output = {};
  let e_output = {};

  //get right route
  if (method == 2 || method == 4) {

    let b_index = B_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    b_output = B_results[b_index];

    let e_index = E_results.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    e_output = E_results[e_index];

    console.log(b_output);
    console.log(e_output);
  } else if (method == 1 || method == 3) {

  }

  let rteOutputAssemblerOutput = [];
  /**  */
  try {
    rteOutputAssemblerOutput = (Object.values(b_output)).concat(Object.values(e_output));
  } catch (err) {
    rteOutputAssemblerOutput = lrsApiFields.concat(lrsApiFields);
  }
  /** */

  return (rteOutputAssemblerOutput);
}