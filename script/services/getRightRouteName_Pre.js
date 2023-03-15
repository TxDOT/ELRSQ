function getRightRouteName_Pre(inputMethod, rtenmformat, rte_nm_lrm_indices, currentRow) {

  let user_input_rte_nm = '';
  
  if (inputMethod == "html") {
    if (rtenmformat == "AAdddd") {
      user_input_rte_nm = fixThisVerySpecificTextFormat(currentRow[rte_nm_lrm_indices]);
    } else {
      user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
    }
  } else if (inputMethod == "table") {
    user_input_rte_nm = (typeof rte_nm_lrm_indices !== 'undefined') ? currentRow[rte_nm_lrm_indices] : '';
  }

  return user_input_rte_nm;
}
