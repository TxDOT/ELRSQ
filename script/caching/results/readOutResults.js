/** determine pagination and fill in HTML table results
 *
 * @param {*} results
 * @param {*} navIndex
 */
function readOutPointResults(results, navIndex) {
    const index = navIndex ? navIndex - 1 : 0;

    ONSCREENMATCH = SESSIONHISTORYARR.last()[index]; // set on screen result to index

    paginationUpdater("#result-pagination", results.length);

    fillInPointHtmlTable(ONSCREENMATCH.data[0]);
    try { localPointGeoJSONToMap(ONSCREENMATCH.geojson); } catch { }
}


/** determine pagination and fill in HTML table results
*
* @param {*} results
* @param {*} navIndex
*/
function readOutRouteResults(results, navIndex) {
    const index = navIndex ? navIndex - 1 : 0;

    ONSCREENMATCH = SESSIONHISTORYARR.last()[index]; // set on screen result to index

    paginationUpdater("#result-pagination", results.length);

    fillInRouteHtmlTable(ONSCREENMATCH.data[0]);
    try { localRouteGeoJSONToMap(ONSCREENMATCH.geojson); } catch { }
}

