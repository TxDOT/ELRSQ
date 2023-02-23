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
    EDFO: "#p_returned_RTE_DFO_end"
  };