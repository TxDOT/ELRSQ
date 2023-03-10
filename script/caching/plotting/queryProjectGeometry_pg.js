


async function queryProjectGeometry_pg(projObj) {

  resetProjectFeatureCollections();

  GreenToYellow();

  //get segment is called within a loop, for each project
  let results = await queryRoadwayServiceByLine(projObj);
  let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj);

  YellowToGreen();

  return aProjectFeatureCollection;

}
