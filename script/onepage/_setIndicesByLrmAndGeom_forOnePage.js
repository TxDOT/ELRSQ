function setIndicesByLrmAndGeom(currentLRMno) {
  let field_indices = [];
  let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];

  if (calcGeomType == "Point") {

    if (currentLRMno == 1) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputLatitude', 'kbInputLongitude'];
    }

    else if (currentLRMno == 2) {

      lrm_indices = lrm_indices0 = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputReferenceMarker', 'kbInputDisplacement'];
    }

    else if (currentLRMno == 3) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['kbInputControlSection', 'kbInputMilepointMeasure'];
    }

    else if (currentLRMno == 4) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName', 'kbInputDistanceFromOrigin'];
    }
  }

  else if (calcGeomType == "Route") {

    if (currentLRMno == 1) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginLatitude', 'kbInputBeginLongitude', 'kbInputEndLatitude', 'kbInputEndLongitude'];
    }

    else if (currentLRMno == 2) {

      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginReferenceMarker', 'kbInputBeginDisplacement', 'kbInputEndReferenceMarker', 'kbInputEndDisplacement'];
    }

    else if (currentLRMno == 3) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['kbInputBeginControlSection', 'kbInputBeginMilepointMeasure', 'kbInputEndControlSection', 'kbInputEndMilepointMeasure'];
    }

    else if (currentLRMno == 4) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['kbInputRouteName_2', 'kbInputBeginDistanceFromOrigin', 'kbInputEndDistanceFromOrigin'];
    }
  }


  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, currentFieldOrder];

  return field_indices;
}
