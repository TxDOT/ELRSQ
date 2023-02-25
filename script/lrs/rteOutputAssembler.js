//get right route
async function rteOutputAssembler(routeQueryOutput, inputMethod, method, B_results, E_results, rte_nm) {
  let b_output = {};
  let e_output = {};
  let transposed = 0;
  let RteDfoArr = [];
  let bdfo = '';
  let edfo = '';

  //get right route

  if (method == 1 || method == 3) {

    if (inputMethod == "html") {


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


  let rteOutputAssemblerOutput = [];

  try {
    if (transposed == 0) {
      rteOutputAssemblerOutput = (Object.values(b_output)).concat(Object.values(e_output));
    } else {
      rteOutputAssemblerOutput = (Object.values(e_output)).concat(Object.values(b_output));
    }
  } catch (err) {
    rteOutputAssemblerOutput = lrsApiFields.concat(lrsApiFields);
  }

  return (rteOutputAssemblerOutput);
}