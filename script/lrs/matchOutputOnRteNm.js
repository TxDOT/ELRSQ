async function matchOutputOnRteNm(inputMethod, method, unfilteredArr, rte_nm) {
  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  // get right route
  if (method == 1 || method == 3) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      dropDownPopulator("#candidateRTENMs", candidateRteNms); // need to dynamically create selector
      rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
      rte_nm = candidateRteNms[rte_nm_Index];
    }

  }
  // end get right route

  // match output
  let output0 = {};
  let output1 = {};
  let match = [];

  let index0 = results0.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm;
  });

  output0 = results0[index0];
  console.log(output0);

  if (calcGeomType == "Route") {
    let index1 = results1.findIndex(function (item, i) {
      return item.RTE_DEFN_LN_NM === rte_nm;
    });

    output1 = results1[index1];
    console.log(output1);
    bdfo = output0['RTE_DFO'];
    edfo = output1['RTE_DFO'];

    let RteDfoArr = [];
    RteDfoArr.push(rte_nm);
    RteDfoArr.push(Math.min(bdfo, edfo));
    RteDfoArr.push(Math.max(bdfo, edfo));
    console.log(RteDfoArr);

    // check min and max DFOs and transpose if necessary
    if (bdfo > edfo) {
      match = (Object.values(output1)).concat(Object.values(output0));
    } else {
      match = (Object.values(output0)).concat(Object.values(output1));
    }

  }

  else {
    match = (Object.values(output0));
  }

  return (match);
}


function noMatchOutputOnRteNm(unfilteredArr) {
  let results0 = unfilteredArr[0];
  let output0 = results0[0];
  console.log(output0);
  let nomatch = (Object.values(output0));
  return (nomatch);
}