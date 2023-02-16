// determine pagination and fill in HTML table results
function specialResults(results) {
    jsonData = results;
    //resultCount = allResults.length; // use this somewhere
    //currentResult = allResults[index];
  

  
    // fill in HTML results
    /*document.getElementById("p_returned_ROUTEID").innerHTML = currentResult['ROUTEID'];
    document.getElementById("p_returned_RTE_DEFN_LN_NM").innerHTML = currentResult['RTE_DEFN_LN_NM'];
    document.getElementById("p_returned_RDBD_TYPE_DSCR").innerHTML = currentResult['RDBD_TYPE_DSCR'];
    document.getElementById("p_returned_RTE_DFO").innerHTML = currentResult['RTE_DFO'];
  
    document.getElementById("p_returned_CTRL_SECT_LN_NBR").innerHTML = currentResult['CTRL_SECT_LN_NBR'];
    document.getElementById("p_returned_CTRL_SECT_MPT").innerHTML = currentResult['CTRL_SECT_MPT'];
  
    document.getElementById("p_returned_RMRKR_PNT_NBR").innerHTML = currentResult['RMRKR_PNT_NBR'];
    document.getElementById("p_returned_RMRKR_DISPLACEMENT").innerHTML = currentResult['RMRKR_DISPLACEMENT'];
  
    document.getElementById("p_returned_LAT").innerHTML = currentResult['LAT'];
    document.getElementById("p_returned_LON").innerHTML = currentResult['LON'];*/
    }



function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'results.json';

    let linkElement = document.getElementById('#JSONdownload');
    console.log(linkElement);
    //linkElement.setAttribute('href', dataUri);
    //linkElement.setAttribute('download', exportFileDefaultName);
}