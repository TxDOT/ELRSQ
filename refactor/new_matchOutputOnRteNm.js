//get right route
async function matchOutputOnRteNm(inputMethod, method, [results0, results1], rte_nm) {
  let output0 = {};
  let output1 = {};
  let RteDfoArr = [];
  let bdfo = '';
  let edfo = '';

  //get right route
  if (method == 1 || method == 3) {
    if (inputMethod == "html") {
      let RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (typeGeom == "Route") {
        let RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        let candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        let candidateRteNms = RTENMs0;
      }

      dropDownPopulator("#candidateRTENMs", candidateRteNms); // need to dynamically create selector
      rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
      rte_nm = candidateRteNms[rte_nm_Index];
    }

  }
  // end get right route

  let match = [];

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  output0 = results0[index0];
  
  if (typeGeom == "Route") {
    let index1 = results1.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    output1 = results1[index1];
    bdfo = results0[index0]['RTE_DFO'];
    edfo = results1[index1]['RTE_DFO'];

    RteDfoArr.push(rte_nm);
    RteDfoArr.push(Math.min(bdfo, edfo));
    RteDfoArr.push(Math.max(bdfo, edfo));

    // check min and max DFOs and transpose if necessary
    if (bdfo > edfo) {
      match = (Object.values(output1)).concat(Object.values(output0));
    } else {
      match = (Object.values(output0)).concat(Object.values(output1));
    }
  } else {
    match = (Object.values(output0));
  }

  return (match);
}