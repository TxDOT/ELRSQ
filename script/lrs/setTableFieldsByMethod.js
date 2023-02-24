

async function setTableFieldsByMethod(method, parsedInputCSV) {
  let field_indices = [];
  let candidate_fields = parsedInputCSV[0];
  all_fields = [...Array(candidate_fields.length).keys()];

  if (method == 1) {
    dropDownPopulator("#blat_field", candidate_fields);
    dropDownPopulator("#blon_field", candidate_fields);
    dropDownPopulator("#elat_field", candidate_fields);
    dropDownPopulator("#elon_field", candidate_fields);
    dropDownPopulator("#rte_nm_field", candidate_fields); //TODO make this optional

    let blat_field = ~~await confirmFieldChoice("#btn-blat_field", "#blat_field");
    let blon_field = ~~await confirmFieldChoice("#btn-blon_field", "#blon_field");
    let elat_field = ~~await confirmFieldChoice("#btn-elat_field", "#elat_field");
    let elon_field = ~~await confirmFieldChoice("#btn-elon_field", "#elon_field");
    let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field"); //TODO make this optional

    lrm_indices = [blat_field, blon_field, elat_field, elon_field, rte_nm_field];
  }

  else if (method == 2) {
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

    lrm_indices = [rte_nm_field, brm_field, bd_field, erm_field, ed_field];
  }

  else if (method == 3) {
    dropDownPopulator("#bcs_field", candidate_fields);
    dropDownPopulator("#bmpm_field", candidate_fields);
    dropDownPopulator("#ecs_field", candidate_fields);
    dropDownPopulator("#empm_field", candidate_fields);
    dropDownPopulator("#rte_nm_field", candidate_fields); //TODO make this optional

    let bcs_field = ~~await confirmFieldChoice("#btn-bcs_field", "#bcs_field");
    let bmpm_field = ~~await confirmFieldChoice("#btn-bmpm_field", "#bmpm_field");
    let ecs_field = ~~await confirmFieldChoice("#btn-ecs_field", "#ecs_field");
    let empm_field = ~~await confirmFieldChoice("#btn-empm_field", "#empm_field");
    let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field"); //TODO make this optional

    lrm_indices = [bcs_field, bmpm_field, ecs_field, empm_field, rte_nm_field];
  }

  else if (method == 4) {
    dropDownPopulator("#rte_nm_field", candidate_fields);
    dropDownPopulator("#bdfo_field", candidate_fields);
    dropDownPopulator("#edfo_field", candidate_fields);

    let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
    let bdfo_field = ~~await confirmFieldChoice("#btn-bdfo_field", "#bdfo_field");
    let edfo_field = ~~await confirmFieldChoice("#btn-edfo_field", "#edfo_field");

    lrm_indices = [rte_nm_field, bdfo_field, edfo_field];
  }

  other_indices = all_fields.filter(x => !lrm_indices.includes(x));

  field_indices = [lrm_indices, other_indices];

  return field_indices;
}
