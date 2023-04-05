async function addFeatAttrBand(service, servicefield, name, lineNo, colour) {
  //Add Inventory Layer, fields, route, and DFO's
  let addFeatAttrBandObj = {
    "layer": service, "label": name, "field": servicefield, "routename": DIAGRAMRANGE.roadway.routename,
    "dfo_fm": DIAGRAMRANGE.roadway.dfo_fm, "dfo_to": DIAGRAMRANGE.roadway.dfo_to,
    "y_offset_pix": getYBaseline(lineNo)
  };

  let featureService = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/" + service + "/FeatureServer/0";

  let theFields = "RTE_NM,BEGIN_DFO,END_DFO," + servicefield;
  let theQuery = "RTE_NM='" + DIAGRAMRANGE.roadway.routename + "'" + " AND (BEGIN_DFO < " + DIAGRAMRANGE.roadway.dfo_to + " AND END_DFO > " + DIAGRAMRANGE.roadway.dfo_fm + ")";
  let theOrder = "RTE_NM ASC, BEGIN_DFO ASC";
  let theService = queryRecordFromService(featureService, theQuery, theOrder, theFields);
  let response = await new_xmlRequestWithProcessing(theService);

  let processFeatAttrBandObj = processFeatAttrBand(response, service, servicefield, name, lineNo, colour);

  return { ...addFeatAttrBandObj, ...processFeatAttrBandObj };
}


async function addFeatAttrPoint(service, servicefield, name, lineNo) {
  //Add Inventory Layer, fields, route, and DFO's
  let addFeatAttrPointObj = {
    "layer": service, "label": name, "field": servicefield, "routename": DIAGRAMRANGE.roadway.routename,
    "dfo_fm": DIAGRAMRANGE.roadway.dfo_fm, "dfo_to": DIAGRAMRANGE.roadway.dfo_to,
    "y_offset_pix": getYBaseline(lineNo)
  };

  let featureService = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/" + service + "/FeatureServer/0";

  let theFields = "RTE_NM,DFO," + servicefield;
  let theQuery = "RTE_NM='" + DIAGRAMRANGE.roadway.routename + "'" + " AND (DFO < " + DIAGRAMRANGE.roadway.dfo_to + " AND DFO > " + DIAGRAMRANGE.roadway.dfo_fm + ")";
  let theOrder = "RTE_NM ASC, DFO ASC";
  let theService = queryRecordFromService(featureService, theQuery, theOrder, theFields);
  let response = await new_xmlRequestWithProcessing(theService);
  let processFeatAttrPointObj = processFeatAttrPoint(response, service, servicefield, name, lineNo);

  return { ...addFeatAttrPointObj, ...processFeatAttrPointObj };
}


async function addControlSections(service, servicefield, name, lineNo) {
  //Add Inventory Layer, fields, route, and DFO's
  let addControlSectionsObj = {
    "layer": service, "label": name, "field": servicefield, "routename": DIAGRAMRANGE.roadway.routename,
    "dfo_fm": DIAGRAMRANGE.roadway.dfo_fm, "dfo_to": DIAGRAMRANGE.roadway.dfo_to,
    "y_offset_pix": getYBaseline(lineNo)
  };

  let featureService = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/" + service + "/FeatureServer/0";

  let theQuery = "RTE_NM='" + DIAGRAMRANGE.roadway.routename + "'" + " AND (BEGIN_DFO < " + DIAGRAMRANGE.roadway.dfo_to + " AND END_DFO > " + DIAGRAMRANGE.roadway.dfo_fm + ")";

  let theOrder = "RTE_NM ASC, BEGIN_DFO ASC";
  let theFields = "RTE_NM,BEGIN_DFO,END_DFO," + servicefield + ",BEGIN_MPT,END_MPT";

  let theService = queryRecordFromService(featureService, theQuery, theOrder, theFields);
  let response = await new_xmlRequestWithProcessing(theService);
  let processMultiControlSectionsObj = {};

  processMultiControlSectionsObj = processMultiControlSections(response, service, servicefield, name, lineNo);

  return { ...addControlSectionsObj, ...processMultiControlSectionsObj };
}


async function addConcurrency(service, servicefield, name, dfoGapArr, lineNo, colour) {
  //Add Inventory Layer, fields, route, and DFO's
  let addConcurrencyObj = {
    "layer": service, "label": name, "field": servicefield, "routename": DIAGRAMRANGE.roadway.routename,
    "dfo_fm": DIAGRAMRANGE.roadway.dfo_fm, "dfo_to": DIAGRAMRANGE.roadway.dfo_to,
    "y_offset_pix": getYBaseline(lineNo)
  };

  let processConcurrencyObj = await processConcurrency(dfoGapArr, lineNo, colour);
  return { ...addConcurrencyObj, ...processConcurrencyObj };
}


function processFeatAttrBand(records, service, servicefield, name, lineNo, colour) {
  let processFeatAttrBandObj = {};
  let customAttributeValue = "";

  //Adding inventory breaks to diagramSpecifications
  processFeatAttrBandObj.measure_breaks = [];
  processFeatAttrBandObj.bands = [];

  // start loop over records
  for (let i = 0; i < records.features.length; i++) {

    let bandObj = {};

    if (name == "County") { customAttributeValue = records.features[i].attributes.CNTY_NM; }

    let customAttributeMeasureBeg_mi = Math.max(records.features[i].attributes.BEGIN_DFO, DIAGRAMRANGE.roadway.dfo_fm);
    let customAttributeMeasureEnd_mi = Math.min(records.features[i].attributes.END_DFO, DIAGRAMRANGE.roadway.dfo_to);

    let offsetBeg_mi = customAttributeMeasureBeg_mi - DIAGRAMRANGE.roadway.dfo_fm;
    let offsetEnd_mi = customAttributeMeasureEnd_mi - DIAGRAMRANGE.roadway.dfo_fm;

    processFeatAttrBandObj.measure_breaks.push({
      "measure_label": customAttributeMeasureBeg_mi,
      "offset_end_pix": limitOffsetBeg(offsetBeg_mi),
      "y_offset_pix": getYBaseline(lineNo) - 15
    });

    processFeatAttrBandObj.measure_breaks.push({
      "measure_label": customAttributeMeasureEnd_mi,
      "offset_end_pix": limitOffsetEnd(offsetEnd_mi),
      "y_offset_pix": getYBaseline(lineNo) - 15
    });



    bandObj.i = i;
    bandObj.lineNo = lineNo;
    bandObj.customAttributeMeasureBeg_mi = customAttributeMeasureBeg_mi;
    bandObj.customAttributeMeasureEnd_mi = customAttributeMeasureEnd_mi;
    bandObj.offset_beg_mi = offsetBeg_mi;
    bandObj.offset_end_mi = offsetEnd_mi;
    bandObj.paletteForAttribute = colour;
    bandObj.label = customAttributeValue;

    processFeatAttrBandObj.bands.push(bandObj);

  }
  // end loop over records
  return processFeatAttrBandObj;
}


function processFeatAttrPoint(records, service, servicefield, name, lineNo) {
  let processFeatAttrPointObj = {};
  let customAttributeValue = "";

  //Adding inventory breaks to diagramSpecifications
  processFeatAttrPointObj.measure_breaks = [];
  processFeatAttrPointObj.marks = [];

  // start loop over records
  for (let i = 0; i < records.features.length; i++) {

    let markObj = {};

    customAttributeValue = records.features[i].attributes.MRKR_NBR;

    let customAttributeMeasureBeg_mi = records.features[i].attributes.DFO;
    let offsetBeg_mi = customAttributeMeasureBeg_mi - DIAGRAMRANGE.roadway.dfo_fm;

    processFeatAttrPointObj.measure_breaks.push({
      "measure_label": customAttributeMeasureBeg_mi,
      "offset_end_pix": calcMiToPixOffset(offsetBeg_mi),
      "y_offset_pix": getYBaseline(lineNo) - 15
    });

    markObj.lineNo = lineNo;
    markObj.customAttributeMeasureBeg_mi = customAttributeMeasureBeg_mi;
    markObj.offset_beg_mi = offsetBeg_mi;
    markObj.label = customAttributeValue;

    processFeatAttrPointObj.marks.push(markObj);

  }
  // end loop over records
  return processFeatAttrPointObj;
}


function processMultiControlSections(records, service, servicefield, name, lineNo) {
  let processMultiControlSectionsObj = {};

  let customAttributeValue = "";


  //Adding inventory breaks to diagramSpecifications
  processMultiControlSectionsObj.measure_breaks = [];
  processMultiControlSectionsObj.bands = [];

  // start loop over records
  for (let i = 0; i < records.features.length; i++) {

    let bandObj = {};

    if (name == "Control Sections") { customAttributeValue = records.features[i].attributes.CTRL_SECT_NBR; }

    let customAttributeMeasureBeg_mi = Math.max(records.features[i].attributes.BEGIN_DFO, DIAGRAMRANGE.roadway.dfo_fm);
    let customAttributeMeasureEnd_mi = Math.min(records.features[i].attributes.END_DFO, DIAGRAMRANGE.roadway.dfo_to);

    let offsetBeg_mi = customAttributeMeasureBeg_mi - DIAGRAMRANGE.roadway.dfo_fm;
    let offsetEnd_mi = customAttributeMeasureEnd_mi - DIAGRAMRANGE.roadway.dfo_fm;

    processMultiControlSectionsObj.measure_breaks.push({
      "measure_label": customAttributeMeasureBeg_mi,
      "offset_end_pix": limitOffsetBeg(offsetBeg_mi),
      "y_offset_pix": getYBaseline(lineNo) - 15
    });

    processMultiControlSectionsObj.measure_breaks.push({
      "measure_label": customAttributeMeasureEnd_mi,
      "offset_end_pix": limitOffsetEnd(offsetEnd_mi),
      "y_offset_pix": getYBaseline(lineNo) - 15
    });

    //// start determine begin and end milepoint values/ labels
    //Difference between beginning DFO for record and desired DFO for diagram
    let dfoDiffBeg_mi = DIAGRAMRANGE.roadway.dfo_fm - records.features[i].attributes.BEGIN_DFO;
    let dfoDiffEnd_mi = records.features[i].attributes.END_DFO - DIAGRAMRANGE.roadway.dfo_to;

    //Add Control Section tick marks and labeling for 1 control section
    let DiagramMpBeg_mi = records.features[i].attributes.BEGIN_MPT;
    let DiagramMpEnd_mi = records.features[i].attributes.END_MPT;

    //Clip the beginning milepoint measure if needed
    if (records.features[i].attributes.BEGIN_DFO < DIAGRAMRANGE.roadway.dfo_fm) {
      DiagramMpBeg_mi += dfoDiffBeg_mi;
      DiagramMpBeg_mi = roundToDecimalPlace(DiagramMpBeg_mi, 3);
    }

    //Clip the ending milepoint measure if needed
    if (records.features[i].attributes.END_DFO > DIAGRAMRANGE.roadway.dfo_to) {
      DiagramMpEnd_mi = roundToDecimalPlace(DiagramMpEnd_mi - dfoDiffEnd_mi, 3);
    }

    //// end determine begin and end milepoint values/ labels

    bandObj.begin_mpt_label = DiagramMpBeg_mi;
    bandObj.end_mpt_label = DiagramMpEnd_mi;
    bandObj.offset_beg_mi = offsetBeg_mi;
    bandObj.offset_end_mi = offsetEnd_mi;
    bandObj.label = customAttributeValue;

    processMultiControlSectionsObj.bands.push(bandObj);

  }
  // end loop over records
  return processMultiControlSectionsObj;
}


async function processConcurrency(dfoGaps_Arr, lineNo, colour) {
  let processConcurrencyObj = {};

  //Adding inventory breaks to diagramSpecifications
  processConcurrencyObj.measure_breaks = [];
  processConcurrencyObj.bands = [];

  for (let i = 0; i < dfoGaps_Arr.length; i = i + 1) {

    let bandObj = {};
    let overlap_msg = '';

    if (dfoGaps_Arr[i].width == 0) {
      //overlap_msg = 'no gap';
    } else if (DIAGRAMRANGE.roadway.dfo_fm >= dfoGaps_Arr[i].EDFO || DIAGRAMRANGE.roadway.dfo_to <= dfoGaps_Arr[i].BDFO) {
      //overlap_msg = 'no overlap';
    } else {
      results0 = await getConcurrenciesByLatLon(DIAGRAMRANGE.roadway.routename, dfoGaps_Arr[i].bpoint[0], dfoGaps_Arr[i].bpoint[1]);
      results1 = await getConcurrenciesByLatLon(DIAGRAMRANGE.roadway.routename, dfoGaps_Arr[i].epoint[0], dfoGaps_Arr[i].epoint[1]);
      GIDs0 = _.map(results0.features, _.property('attributes.GID'));
      GIDs1 = _.map(results1.features, _.property('attributes.GID'));
      candidateGIDs = GIDs0.filter(x => GIDs1.includes(x));

      bandObj.i = i;
      bandObj.lineNo = lineNo;
      bandObj.customAttributeMeasureBeg_mi = Math.max(dfoGaps_Arr[i].BDFO, DIAGRAMRANGE.roadway.dfo_fm);
      bandObj.customAttributeMeasureEnd_mi = Math.min(dfoGaps_Arr[i].EDFO, DIAGRAMRANGE.roadway.dfo_to);
      bandObj.paletteForAttribute = colour;
      bandObj.offset_beg_mi = bandObj.customAttributeMeasureBeg_mi - DIAGRAMRANGE.roadway.dfo_fm;
      bandObj.offset_end_mi = bandObj.customAttributeMeasureEnd_mi - DIAGRAMRANGE.roadway.dfo_fm;
      bandObj.feature = "Concurrency";
      bandObj.lrmSelected = "DFO";
      bandObj.groupedOrNot = "New";

      if (candidateGIDs.length > 0) {
        let filteredresults0 = results0.features.filter(function (el) { return el.attributes.GID == candidateGIDs[0]; });
        let filteredresults1 = results1.features.filter(function (el) { return el.attributes.GID == candidateGIDs[0]; });

        let filteredresults01 = [...filteredresults0, ...filteredresults1];

        let GID = filteredresults01[0].attributes.GID;

        let urlGID = `https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Roadways_Unsegmented/FeatureServer/0/query?f=json&` +
          `where=GID%3D%27${GID}%27` +
          `&outFields=GID%2C+RTE_NM%2C+BEGIN_DFO%2C+END_DFO&` +
          `returnGeometry=true&outSR=4326` +
          `&orderByFields=END_DFO&returnExceededLimitFeatures=true&`;

        const resultsGID = await queryRoadwayService(urlGID);

        let insert = {};
        insert.RTE_NM = resultsGID.features[0].attributes.RTE_NM;
        insert.BDFO = filteredresults01[0].attributes.BEGIN_DFO;
        insert.EDFO = filteredresults01[0].attributes.END_DFO;

        console.log(`${DIAGRAMRANGE.roadway.routename} from ${dfoGaps_Arr[i].BDFO} to ${dfoGaps_Arr[i].EDFO} has a concurrency with ${insert.RTE_NM} from ${insert.BDFO} to ${insert.EDFO}`);
        bandObj.label = insert.RTE_NM;
      } else {
        console.log(`${DIAGRAMRANGE.roadway.routename} from ${dfoGaps_Arr[i].BDFO} to ${dfoGaps_Arr[i].EDFO} has a concurrency with Multiple Routes`);
        bandObj.label = "Multiple Routes";
      }

      processConcurrencyObj.bands.push(bandObj);
    }

    console.log(overlap_msg);
  }

  return processConcurrencyObj;
}
