/**
 *
 * uses drop downs to get field names
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @param {*} parsedInputCSV
 * @returns
 */


async function setTableFieldsByMethod(convertSessionParams, parsedInputCSV) {
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = []; //test
  let candidate_fields = parsedInputCSV[0];
  all_fields = [...Array(candidate_fields.length).keys()];


  if (convertSessionParams.calcGeomType == "Point") {

    if (convertSessionParams.currentLrmNo == 1) {
      dropDownPopulator("#lat_field", candidate_fields);
      dropDownPopulator("#lon_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
    }

    else if (convertSessionParams.currentLrmNo == 2) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#referencemarker_field", candidate_fields);
      dropDownPopulator("#displacement_field", candidate_fields);
    }

    else if (convertSessionParams.currentLrmNo == 3) {
      dropDownPopulator("#controlsection_field", candidate_fields);
      dropDownPopulator("#milepoint_field", candidate_fields);
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
    }

    else if (convertSessionParams.currentLrmNo == 4) {
      dropDownPopulator("#point_rte_nm_field", candidate_fields);
      dropDownPopulator("#dfo_field", candidate_fields);
    }
  }

  else if (convertSessionParams.calcGeomType == "Route") {

    if (convertSessionParams.currentLrmNo == 1) {
      dropDownPopulator("#blat_field", candidate_fields);
      dropDownPopulator("#blon_field", candidate_fields);
      dropDownPopulator("#elat_field", candidate_fields);
      dropDownPopulator("#elon_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);
    }

    else if (convertSessionParams.currentLrmNo == 2) {
      dropDownPopulator("#route_rte_nm_field", candidate_fields);
      dropDownPopulator("#breferencemarker_field", candidate_fields);
      dropDownPopulator("#bdisplacement_field", candidate_fields);
      dropDownPopulator("#ereferencemarker_field", candidate_fields);
      dropDownPopulator("#edisplacement_field", candidate_fields);
    }

    else if (convertSessionParams.currentLrmNo == 3) {
      dropDownPopulator("#bcontrolsection_field", candidate_fields);
      dropDownPopulator("#bmilepoint_field", candidate_fields);
      dropDownPopulator("#emilepoint_field", candidate_fields);
      dropDownPopulator("#rte_nm_field", candidate_fields);
    }

    else if (convertSessionParams.currentLrmNo == 4) {
      dropDownPopulator("#route_rte_nm_field", candidate_fields);
      dropDownPopulator("#bdfo_field", candidate_fields);
      dropDownPopulator("#edfo_field", candidate_fields);
    }
  }


  let confirmed = ~~await confirmFieldChoices("#confirm-fields");


  if (convertSessionParams.calcGeomType == "Point") {

    if (convertSessionParams.currentLrmNo == 1) {

      let lat_field = document.querySelector("#lat_field").value;
      let lon_field = document.querySelector("#lon_field").value;
      let rte_nm_option = 0; //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? document.querySelector("#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [lat_field, lon_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (convertSessionParams.currentLrmNo == 2) {

      let rte_nm_field = document.querySelector("#point_rte_nm_field").value;
      let referencemarker_field = document.querySelector("#referencemarker_field").value;
      let displacement_field = document.querySelector("#displacement_field").value;

      lrm_indices = lrm_indices0 = [rte_nm_field, referencemarker_field, displacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (convertSessionParams.currentLrmNo == 3) {

      let controlsection_field = document.querySelector("#controlsection_field").value;
      let milepoint_field = document.querySelector("#milepoint_field").value;
      let rte_nm_option = 0; //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? document.querySelector("#point_rte_nm_field") : '';

      lrm_indices = lrm_indices0 = [controlsection_field, milepoint_field, rte_nm_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (convertSessionParams.currentLrmNo == 4) {

      let rte_nm_field = document.querySelector("#point_rte_nm_field").value;
      let dfo_field = document.querySelector("#dfo_field").value;

      lrm_indices = lrm_indices0 = [rte_nm_field, dfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }

  else if (convertSessionParams.calcGeomType == "Route") {

    if (convertSessionParams.currentLrmNo == 1) {

      let blat_field = document.querySelector("#blat_field").value;
      let blon_field = document.querySelector("#blon_field").value;
      let elat_field = document.querySelector("#elat_field").value;
      let elon_field = document.querySelector("#elon_field").value;
      let rte_nm_option = 0; //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? document.querySelector("#rte_nm_field") : '';

      lrm_indices = [blat_field, blon_field, elat_field, elon_field, rte_nm_field];
      lrm_indices0 = [blat_field, blon_field];
      lrm_indices1 = [elat_field, elon_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (convertSessionParams.currentLrmNo == 2) {

      let rte_nm_field = document.querySelector("#route_rte_nm_field").value;
      let breferencemarker_field = document.querySelector("#breferencemarker_field").value;
      let bdisplacement_field = document.querySelector("#bdisplacement_field").value;
      let ereferencemarker_field = document.querySelector("#ereferencemarker_field").value;
      let edisplacement_field = document.querySelector("#edisplacement_field").value;

      lrm_indices = [rte_nm_field, breferencemarker_field, bdisplacement_field, ereferencemarker_field, edisplacement_field];
      lrm_indices0 = [rte_nm_field, breferencemarker_field, bdisplacement_field];
      lrm_indices1 = [rte_nm_field, ereferencemarker_field, edisplacement_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (convertSessionParams.currentLrmNo == 3) {

      let bcontrolsection_field = document.querySelector("#bcontrolsection_field").value;
      let bmilepoint_field = document.querySelector("#bmilepoint_field").value;
      let emilepoint_field = document.querySelector("#emilepoint_field").value;
      let rte_nm_option = 0; //TODO make this optional
      let rte_nm_field = (rte_nm_option == 1) ? document.querySelector("#rte_nm_field") : '';

      lrm_indices = [bcontrolsection_field, bmilepoint_field, emilepoint_field, rte_nm_field];
      lrm_indices0 = [bcontrolsection_field, bmilepoint_field];
      lrm_indices1 = [bcontrolsection_field, emilepoint_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }

    else if (convertSessionParams.currentLrmNo == 4) {

      let rte_nm_field = document.querySelector("#route_rte_nm_field").value;
      let bdfo_field = document.querySelector("#bdfo_field").value;
      let edfo_field = document.querySelector("#edfo_field").value;

      lrm_indices = [rte_nm_field, bdfo_field, edfo_field];
      lrm_indices0 = [rte_nm_field, bdfo_field];
      lrm_indices1 = [rte_nm_field, edfo_field];
      rte_nm_lrm_indices = [rte_nm_field];
    }
  }




  other_indices = all_fields; // returning all input fields

  let field_indicesObj = new Object();
  field_indicesObj.lrm_indices0 = lrm_indices0;
  field_indicesObj.lrm_indices1 = lrm_indices1;
  field_indicesObj.rte_nm_lrm_indices = rte_nm_lrm_indices;
  field_indicesObj.currentFieldOrder = [];
  field_indicesObj.other_indices = other_indices;
  field_indicesObj.confirmed = confirmed;

  return field_indicesObj;
}
