// description
function bwd_Rte_Output_Assembler(routeQueryOutput, B_results, E_results, rte_nm) {

  let b_index = B_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  let b_output = B_results[b_index];

  let e_index = E_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  let e_output = E_results[e_index];

  //breakpoint
  console.log(b_output);
  console.log(e_output);

  let rteOutputAssemblerOutput = [];
  try {
    rteOutputAssemblerOutput = (Object.values(b_output)).concat(Object.values(e_output));
  } catch (err) {
    rteOutputAssemblerOutput = lrsApiFields.concat(lrsApiFields);
  }


  return (rteOutputAssemblerOutput);
}
