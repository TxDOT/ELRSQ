function bwd_makeLrsQueryUrlFromIndex(vector, lrm_indices, format_rte_nm) {
  let routeName = '';

  if (format_rte_nm == 1) {
    routeName = fixThisVerySpecificTextFormat(vector[lrm_indices[0]]);
  } else {
    routeName = vector[lrm_indices[0]];
  }

  let refMarker = vector[lrm_indices[1]];
  let displacement = vector[lrm_indices[2]];
  let url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  return url;
}
