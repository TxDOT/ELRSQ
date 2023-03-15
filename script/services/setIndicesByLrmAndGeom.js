/**
 *
 * @param {*} calcGeomType  is a value of either "Point" or "Route"
 * @param {*} currentLrmNo is a value of 1-4 representing which linear referencing method is used
 * @returns an array with field indices and names
 */
function setIndicesByLrmAndGeom(convertSessionParams) {
  let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];
  let rte_nm_lrm_indices = [];
  let currentFieldOrder = [];

  if (convertSessionParams.calcGeomType == "Point") {

    if (convertSessionParams.currentLrmNo == 1) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputLatitude', 'kbInputLongitude'];
    }

    else if (convertSessionParams.currentLrmNo == 2) {
      lrm_indices = lrm_indices0 = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputReferenceMarker', 'kbInputDisplacement'];
    }

    else if (convertSessionParams.currentLrmNo == 3) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputControlSection', 'kbInputMilepointMeasure'];
    }

    else if (convertSessionParams.currentLrmNo == 4) {
      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputDistanceFromOrigin'];
    }
  }

  else if (convertSessionParams.calcGeomType == "Route") {

    if (convertSessionParams.currentLrmNo == 1) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginLatitude', 'kbInputBeginLongitude', 'kbInputEndLatitude', 'kbInputEndLongitude'];
    }

    else if (convertSessionParams.currentLrmNo == 2) {
      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginReferenceMarker', 'kbInputBeginDisplacement', 'kbInputEndReferenceMarker', 'kbInputEndDisplacement'];
    }

    else if (convertSessionParams.currentLrmNo == 3) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [3]; // optional
      currentFieldOrder = ['kbInputBeginControlSection', 'kbInputBeginMilepointMeasure', 'kbInputEndMilepointMeasure'];
    }

    else if (convertSessionParams.currentLrmNo == 4) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginDistanceFromOrigin', 'kbInputEndDistanceFromOrigin'];
    }
  }

  let field_indicesObj = new Object();
  field_indicesObj.lrm_indices0 = lrm_indices0;
  field_indicesObj.lrm_indices1 = lrm_indices1;
  field_indicesObj.rte_nm_lrm_indices = rte_nm_lrm_indices;
  field_indicesObj.currentFieldOrder = currentFieldOrder;
  field_indicesObj.other_indices = [];

  return field_indicesObj;
}
