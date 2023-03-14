const lrsApiFields = [
  "LAT",
  "LON",
  "GID",
  "RTE_DEFN_LN_NM",
  "RTE_DFO",
  "ROUTEID",
  "ROUTENUMBER",
  "RTE_PRFX_TYPE_DSCR",
  "RDBD_TYPE_DSCR",
  "RMRKR_PNT_NBR",
  "RMRKR_DISPLACEMENT",
  "CTRL_SECT_LN_NBR",
  "CTRL_SECT_MPT",
  "MSG",
  "distance"
]


const outputFieldIDs = {
  ROUTEID: "#p_returned_ROUTEID",
  RTE_DEFN_LN_NM: "#p_returned_RTE_DEFN_LN_NM",
  RDBD_TYPE_DSCR: "#p_returned_RDBD_TYPE_DSCR",
  RTE_DFO: "#p_returned_RTE_DFO",
  CTRL_SECT_LN_NBR: "#p_returned_CTRL_SECT_LN_NBR",
  CTRL_SECT_MPT: "#p_returned_CTRL_SECT_MPT",
  RMRKR_PNT_NBR: "#p_returned_RMRKR_PNT_NBR",
  RMRKR_DISPLACEMENT: "#p_returned_RMRKR_DISPLACEMENT",
  LAT: "#p_returned_LAT",
  LON: "#p_returned_LON",
  BDFO: "#p_returned_RTE_DFO_begin",
  EDFO: "#p_returned_RTE_DFO_end",
  ROUTEID_ROUTE: "#p_returned_ROUTEID_ROUTE",
  RTE_DEFN_LN_NM_ROUTE: "#p_returned_RTE_DEFN_LN_NM_ROUTE",
  RTE_DFO_BEGIN: "#p_returned_RTE_DFO_BEGIN",
  RTE_DFO_END: "#p_returned_RTE_DFO_END",
  RDBD_TYPE_DSCR_ROUTE: "#p_returned_RDBD_TYPE_DSCR_ROUTE",
  CTRL_SECT_LN_NBR_BEGIN: "#p_returned_CTRL_SECT_LN_NBR_BEGIN",
  CTRL_SECT_MPT_BEGIN: "#p_returned_CTRL_SECT_MPT_BEGIN",
  CTRL_SECT_LN_NBR_END: "#p_returned_CTRL_SECT_LN_NBR_END",
  CTRL_SECT_MPT_END: "#p_returned_CTRL_SECT_MPT_END",
  RMRKR_PNT_NBR_BEGIN: "#p_returned_RMRKR_PNT_NBR_BEGIN",
  RMRKR_DISPLACEMENT_BEGIN: "#p_returned_RMRKR_DISPLACEMENT_BEGIN",
  RMRKR_PNT_NBR_END: "#p_returned_RMRKR_PNT_NBR_END",
  RMRKR_DISPLACEMENT_END: "#p_returned_RMRKR_DISPLACEMENT_END",
  LAT_BEGIN: "#p_returned_LAT_BEGIN",
  LON_BEGIN: "#p_returned_LON_BEGIN",
  LAT_END: "#p_returned_LAT_END",
  LON_END: "#p_returned_LON_END"

};

const measureRanges = {
  latitude: {
    "max": 37,
    "min": 24,
    "step": 0.000001
  },
  longitude: {
    "max": -93,
    "min": -107,
    "step": 0.000001
  },
  referencemarker: {
    "max": 1000,
    "min": 0,
    "step": 1
  },
  displacement: {
    "max": 2,
    "min": 0,
    "step": 0.001
  },
  dfo: {
    "max": 1000,
    "min": 0,
    "step": 0.001
  },
  milepointmeasure: {
    "max": 1000,
    "min": 0,
    "step": 0.001
  }
}