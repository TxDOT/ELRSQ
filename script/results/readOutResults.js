/** determine pagination and fill in HTML table results
 *
 * @param {*} results
 * @param {*} navIndex
 */
function readOutPointResults(results, navIndex) {
  const index = navIndex ? navIndex - 1 : 0;
  paginationUpdater("#result-pagination", results.length);

  let multiMatch = 0;

  if (SESSIONHISTORYARR.last()[0].data.length > 1) { multiMatch = 1; }

  if (multiMatch == 0) {
    ONSCREENMATCH = SESSIONHISTORYARR.last()[index]; // set on screen result to index
    fillInPointHtmlTable(ONSCREENMATCH.data[0]);
    try { localPointGeoJSONToMap(ONSCREENMATCH.geojson[0]); } catch { }
  } else {
    ONSCREENMATCH = SESSIONHISTORYARR.last()[0]; // set on screen result to index
    fillInPointHtmlTable(ONSCREENMATCH.data[index]);
    try { localPointGeoJSONToMap(ONSCREENMATCH.geojson[index]); } catch { }
  }
}


/** determine pagination and fill in HTML table results
*
* @param {*} results
* @param {*} navIndex
*/
function readOutRouteResults(results, navIndex) {
  const index = navIndex ? navIndex - 1 : 0;
  paginationUpdater("#result-pagination", results.length);

  let multiMatch = 0;

  if (SESSIONHISTORYARR.last()[0].data.length > 1) { multiMatch = 1; }

  if (multiMatch == 0) {
    ONSCREENMATCH = SESSIONHISTORYARR.last()[index]; // set on screen result to index
    fillInRouteHtmlTable(ONSCREENMATCH.data[0]);
    try { localRouteGeoJSONToMap(ONSCREENMATCH.geojson[0]); } catch { }
  }
}

