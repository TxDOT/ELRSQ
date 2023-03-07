

function makequeryTxDOT_Roadways_Unsegmented() {
  let routeName = $(outputFieldIDs.RTE_DEFN_LN_NM).html();
  let lat = $(outputFieldIDs.LAT).html();
  let lon = $(outputFieldIDs.LON).html();
  xmin = (parseFloat(lon) - 0.0001);
  xmax = (parseFloat(lon) + 0.0001);
  ymin = (parseFloat(lat) - 0.0001);
  ymax = (parseFloat(lat) + 0.0001);

  point = `{"xmin":${xmin},"ymin":${ymin},"xmax":${xmax},"ymax":${ymax},"spatialReference":{"wkid":4326}}`
  encodedpoint = encodeURIComponent(point);


  url = `https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Roadways_Unsegmented/FeatureServer/0/query?f=json&` +
    `where=RTE_NM%3D%27${routeName}%27&` +
    `geometry=${encodedpoint}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&` +
    `outFields=*&returnGeometry=false`

  /* Copy text into clipboard */
  navigator.clipboard.writeText(url);

  rdwayQuery(url);
}


//TODO RouteBuilder: do something with these results
// pull out min and max DFO
async function rdwayQuery(url) {
  GreenToYellow();
  const results = await queryRoadwayService(url);
  YellowToGreen();
  let min_DFO = results.features[0].attributes.BEGIN_DFO;
  let max_DFO = results.features[0].attributes.END_DFO;
  console.log(min_DFO);
  console.log(max_DFO);
  return [min_DFO, max_DFO];
}


//iterates over PROJECTSARR array
//for each project, queries queryRecordFromServiceGeometry
//FIXME add PROJECTLINES as an argument instead of hardcoded
async function queryProjectGeometry(myProjectsArr) {
  console.log(myProjectsArr);
  resetProjectLines();

  GreenToYellow();

  //get segment is called within a loop, for each project
  for (var i = 0; i < myProjectsArr.length; i++) {
    let myProjectData = myProjectsArr[i]

    let results = await queryRoadwayServiceByLine(myProjectData);
    myClippedLine = getSegment(results, myProjectData, PROJECTSARR);
    PROJECTLINES.push(myClippedLine);
  }

  YellowToGreen();

}

// added output spatial reference to return WGS84
async function queryRoadwayServiceByLine(myProjectData) {
  url = "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Roadways/FeatureServer/0" + "/query?f=json&where=" + "RTE_NM" + "='" +
    myProjectData.RTE_NM +
    "'&returnGeometry=true&outSR=4326&geometryPrecision=6&returnM=true&orderByFields=BEGIN_DFO"

  console.log("queryRoadwayServiceByLine using url: " + url);
  GreenToYellow();
  const results = await queryRoadwayService(url);
  YellowToGreen();
  console.log("queryRoadwayServiceByLine feature count: " + results.features.length);
  return results;
}