/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} inputMethod is a value of either "html" or "table"
 * @param {*} unfilteredArr an array containing results from 1 or 2 queries
 * @returns a route name
 */

async function getRightRteNm(convertSessionParams, unfilteredArr) {
  let rte_nm = '';
  
  let results0 = unfilteredArr[0];
  let results1 = unfilteredArr[1];

  if (convertSessionParams.currentLrmNo == 1) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (convertSessionParams.inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }

      // this only presents the selector if multiple candidate matches occur
      if (candidateRteNms.length > 1) {
        $("#kbRouteInputRouteName_optional").show();
        dropDownPopulator("#candidateRTENMs", candidateRteNms); // need to dynamically create selector
        rte_nm_Index = await confirmFieldChoice("#btn-candidateRTENMs", "#candidateRTENMs");
        rte_nm = candidateRteNms[rte_nm_Index];
      } else {
        rte_nm = candidateRteNms[0];
      }

    }

    if (convertSessionParams.inputMethod == "table") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

  }

  if (convertSessionParams.currentLrmNo == 3) {
    let candidateRteNms = '';
    let RTENMs0 = [];
    let RTENMs1 = [];

    if (convertSessionParams.inputMethod == "html") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

    if (convertSessionParams.inputMethod == "table") {
      RTENMs0 = results0.map(a => a.RTE_DEFN_LN_NM);
      if (convertSessionParams.calcGeomType == "Route") {
        RTENMs1 = results1.map(a => a.RTE_DEFN_LN_NM);
        candidateRteNms = RTENMs0.filter(x => RTENMs1.includes(x));
      } else {
        candidateRteNms = RTENMs0;
      }
      rte_nm = candidateRteNms[0]; // this is picking the first available candidate route name
    }

  }

  return rte_nm;
}
