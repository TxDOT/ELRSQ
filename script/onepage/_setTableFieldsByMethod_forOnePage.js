async function setTableFieldsByMethod(CURRENTLRMNO, parsedInputCSV) {
  let field_indices = [];
  // let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = []; //test
  let candidate_fields = parsedInputCSV[0];
  all_fields = [...Array(candidate_fields.length).keys()];

  if (CALCGEOMTYPE == "Point") {

    if (CURRENTLRMNO == 1) {
      dropDownPopulator("#lat_field", candidate_fields);
      dropDownPopulator("#lon_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);

      let lat_field = ~~await confirmFieldChoice("#btn-lat_field", "#lat_field");
      let lon_field = ~~await confirmFieldChoice("#btn-lon_field", "#lon_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [lat_field, lon_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 2) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#referencemarker_field", candidate_fields);
      dropDownPopulator("#displacement_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field");
      let referencemarker_field = ~~await confirmFieldChoice("#btn-referencemarker_field", "#referencemarker_field");
      let displacement_field = ~~await confirmFieldChoice("#btn-displacement_field", "#displacement_field");

      lrm_indices = lrm_indices0 = [rte_nm_field, referencemarker_field, displacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 3) {
      dropDownPopulator("#controlsection_field", candidate_fields);
      dropDownPopulator("#milepointmarker_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);

      let controlsection_field = ~~await confirmFieldChoice("#btn-controlsection_field", "#controlsection_field");
      let milepointmarker_field = ~~await confirmFieldChoice("#btn-milepointmarker_field", "#milepointmarker_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [controlsection_field, milepointmarker_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 4) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#dfo_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-point_rte_nm_field", "#point_rte_nm_field");
      let dfo_field = ~~await confirmFieldChoice("#btn-dfo_field", "#dfo_field");

      lrm_indices = lrm_indices0 = [rte_nm_field, dfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }

  else if (CALCGEOMTYPE == "Route") {

    if (CURRENTLRMNO == 1) {
      dropDownPopulator("#blat_field", candidate_fields);
      dropDownPopulator("#blon_field", candidate_fields);
      dropDownPopulator("#elat_field", candidate_fields);
      dropDownPopulator("#elon_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);

      let blat_field = ~~await confirmFieldChoice("#btn-blat_field", "#blat_field");
      let blon_field = ~~await confirmFieldChoice("#btn-blon_field", "#blon_field");
      let elat_field = ~~await confirmFieldChoice("#btn-elat_field", "#elat_field");
      let elon_field = ~~await confirmFieldChoice("#btn-elon_field", "#elon_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';

      lrm_indices = [blat_field, blon_field, elat_field, elon_field, rte_nm_field];
      lrm_indices0 = [blat_field, blon_field];
      lrm_indices1 = [elat_field, elon_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 2) {
      dropDownPopulator("#route_rte_nm_field", candidate_fields);
      dropDownPopulator("#breferencemarker_field", candidate_fields);
      dropDownPopulator("#bdisplacement_field", candidate_fields);
      dropDownPopulator("#ereferencemarker_field", candidate_fields);
      dropDownPopulator("#edisplacement_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-route_rte_nm_field", "#route_rte_nm_field");
      let breferencemarker_field = ~~await confirmFieldChoice("#btn-breferencemarker_field", "#breferencemarker_field");
      let bdisplacement_field = ~~await confirmFieldChoice("#btn-bdisplacement_field", "#bdisplacement_field");
      let ereferencemarker_field = ~~await confirmFieldChoice("#btn-ereferencemarker_field", "#ereferencemarker_field");
      let edisplacement_field = ~~await confirmFieldChoice("#btn-edisplacement_field", "#edisplacement_field");

      lrm_indices = [rte_nm_field, breferencemarker_field, bdisplacement_field, ereferencemarker_field, edisplacement_field];
      lrm_indices0 = [rte_nm_field, breferencemarker_field, bdisplacement_field];
      lrm_indices1 = [rte_nm_field, ereferencemarker_field, edisplacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 3) {
      dropDownPopulator("#bcontrolsection_field", candidate_fields);
      dropDownPopulator("#bmilepointmarker_field", candidate_fields);
      dropDownPopulator("#econtrolsection_field", candidate_fields);
      dropDownPopulator("#emilepointmarker_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);

      let bcontrolsection_field = ~~await confirmFieldChoice("#btn-bcontrolsection_field", "#bcontrolsection_field");
      let bmilepointmarker_field = ~~await confirmFieldChoice("#btn-bmilepointmarker_field", "#bmilepointmarker_field");
      let econtrolsection_field = ~~await confirmFieldChoice("#btn-econtrolsection_field", "#econtrolsection_field");
      let emilepointmarker_field = ~~await confirmFieldChoice("#btn-emilepointmarker_field", "#emilepointmarker_field");
      let rte_nm_option = 0;  //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field") : '';

      lrm_indices = [bcontrolsection_field, bmilepointmarker_field, econtrolsection_field, emilepointmarker_field, rte_nm_field];
      lrm_indices0 = [bcontrolsection_field, bmilepointmarker_field];
      lrm_indices1 = [econtrolsection_field, emilepointmarker_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (CURRENTLRMNO == 4) {
      dropDownPopulator("#rte_nm_field", candidate_fields);
      dropDownPopulator("#bdfo_field", candidate_fields);
      dropDownPopulator("#edfo_field", candidate_fields);

      let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
      let bdfo_field = ~~await confirmFieldChoice("#btn-bdfo_field", "#bdfo_field");
      let edfo_field = ~~await confirmFieldChoice("#btn-edfo_field", "#edfo_field");

      lrm_indices = [rte_nm_field, bdfo_field, edfo_field];
      lrm_indices0 = [rte_nm_field, bdfo_field];
      lrm_indices1 = [rte_nm_field, edfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }

  other_indices = all_fields.filter(x => !lrm_indices.includes(x));

  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, other_indices];

  return field_indices;
}
