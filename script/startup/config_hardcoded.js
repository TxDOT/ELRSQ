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
];

const lrsDummy = {
  "LAT": null,
  "LON": null,
  "GID": null,
  "RTE_DEFN_LN_NM": null,
  "RTE_DFO": null,
  "ROUTEID": null,
  "ROUTENUMBER": null,
  "RTE_PRFX_TYPE_DSCR": null,
  "RDBD_TYPE_DSCR": null,
  "RMRKR_PNT_NBR": null,
  "RMRKR_DISPLACEMENT": null,
  "CTRL_SECT_LN_NBR": null,
  "CTRL_SECT_MPT": null,
  "MSG": null,
  "distance": null
};


const lrsDummy2 = {
  "LAT": null,
  "LON": null,
  "RTE_DEFN_LN_NM": null,
  "RTE_DFO": null,
  "RTE_PRFX_TYPE_DSCR": null,
  "RMRKR_PNT_NBR": null,
  "RMRKR_DISPLACEMENT": null,
  "CTRL_SECT_LN_NBR": null,
  "CTRL_SECT_MPT": null,
  "distance": null
};


const exportFields = {
  point_rtenm: ["RTE_DEFN_LN_NM", "RTE_DFO"],
  point_controlsection: ["CTRL_SECT_LN_NBR", "CTRL_SECT_MPT"],
  point_fieldlocation: ["RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT"],
  point_coordinates: ["LAT", "LON", "distance"],
  route_rtenm: ["BEGIN_RTE_DEFN_LN_NM", "END_RTE_DEFN_LN_NM", "BEGIN_RTE_DFO", "END_RTE_DFO"],
  route_controlsection: ["BEGIN_CTRL_SECT_LN_NBR", "END_CTRL_SECT_LN_NBR", "BEGIN_CTRL_SECT_MPT", "END_CTRL_SECT_MPT"],
  route_fieldlocation: ["BEGIN_RMRKR_PNT_NBR", "BEGIN_RMRKR_DISPLACEMENT", "END_RMRKR_PNT_NBR", "END_RMRKR_DISPLACEMENT"],
  route_coordinates: ["BEGIN_LAT", "BEGIN_LON", "END_LAT", "END_LON", "BEGIN_distance", "END_distance"]
}


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
    "step": 0.000001,
    "placeholder": 29.652006
  },
  longitude: {
    "max": -93,
    "min": -107,
    "step": 0.000001,
    "placeholder": -97.659926
  },
  referencemarker: {
    "max": 1000,
    "min": 0,
    "step": 1,
    "placeholder": 622
  },
  displacement: {
    "max": 2,
    "min": 0,
    "step": 0.001,
    "placeholder": 0.065
  },
  dfo: {
    "max": 1000,
    "min": 0,
    "step": 0.001,
    "placeholder": 1.606
  },
  milepointmeasure: {
    "max": 1000,
    "min": 0,
    "step": 0.001,
    "placeholder": 2.394
  }
};

const fieldsKeep = [
  "LAT", "LON",
  "RTE_DEFN_LN_NM", "RTE_DFO",
  "RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT",
  "CTRL_SECT_LN_NBR", "CTRL_SECT_MPT",
  "distance"];

const fieldsPoint = [
  "LAT", "LON",
  "RTE_DEFN_LN_NM", "RTE_DFO",
  "RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT",
  "CTRL_SECT_LN_NBR", "CTRL_SECT_MPT",
  "distance"];

const fieldsRoute = [
  "BEGIN_LAT", "BEGIN_LON",
  "END_LAT", "END_LON",
  "BEGIN_RTE_DEFN_LN_NM", "END_RTE_DEFN_LN_NM",
  "BEGIN_RTE_DFO", "END_RTE_DFO",
  "BEGIN_RMRKR_PNT_NBR", "BEGIN_RMRKR_DISPLACEMENT",
  "END_RMRKR_PNT_NBR", "END_RMRKR_DISPLACEMENT",
  "BEGIN_CTRL_SECT_LN_NBR", "BEGIN_CTRL_SECT_MPT",
  "END_CTRL_SECT_LN_NBR", "END_CTRL_SECT_MPT",
  "BEGIN_distance", "END_distance"];

const fieldsPointDrop = ["GID", "ROUTEID", "ROUTENUMBER", "RTE_PRFX_TYPE_DSCR", "RDBD_TYPE_DSCR", "MSG"];

const fieldsRouteDrop = [
  "BEGIN_GID", "END_GID", "BEGIN_ROUTEID", "END_ROUTEID", "BEGIN_ROUTENUMBER",
  "END_ROUTENUMBER", "BEGIN_RTE_PRFX_TYPE_DSCR", "END_RTE_PRFX_TYPE_DSCR",
  "BEGIN_RDBD_TYPE_DSCR", "END_RDBD_TYPE_DSCR", "BEGIN_MSG", "END_MSG"];

const noResultErrorMessage = "Input location not found. Enter a valid location combination.";




