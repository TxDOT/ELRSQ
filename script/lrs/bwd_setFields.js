async function bwd_setFields(parsedInputCSV) {
  let field_indices = [];
  let candidate_fields = parsedInputCSV[0];

  dropDownPopulator("#rte_nm_field", candidate_fields);
  dropDownPopulator("#brm_field", candidate_fields);
  dropDownPopulator("#bd_field", candidate_fields);
  dropDownPopulator("#erm_field", candidate_fields);
  dropDownPopulator("#ed_field", candidate_fields);

  let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
  let brm_field = ~~await confirmFieldChoice("#btn-brm_field", "#brm_field");
  let bd_field = ~~await confirmFieldChoice("#btn-bd_field", "#bd_field");
  let erm_field = ~~await confirmFieldChoice("#btn-erm_field", "#erm_field");
  let ed_field = ~~await confirmFieldChoice("#btn-ed_field", "#ed_field");

  all_fields = [...Array(candidate_fields.length).keys()];
  lrm_indices = [rte_nm_field, brm_field, bd_field, erm_field, ed_field];
  other_indices = all_fields.filter(x => !lrm_indices.includes(x));

  field_indices = [lrm_indices, other_indices];

  return field_indices;
}
