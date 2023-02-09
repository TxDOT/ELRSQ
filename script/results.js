// determine pagination and fill in HTML table results
function showResults(results, navIndex) {
  allResults = results;
  resultCount = allResults.length; // use this somewhere
  const index = navIndex ? navIndex - 1  : 0;
  currentResult = allResults[index];

  //insert pagination
  insertPagination(currentPos, resultCount);

  // fill in HTML results
  document.getElementById("p_returned_ROUTEID").innerHTML = currentResult['ROUTEID'];
  document.getElementById("p_returned_ROUTENUMBER").innerHTML = currentResult['RTE_DEFN_LN_NM'];
  document.getElementById("p_returned_RDBD_TYPE_DSCR").innerHTML = currentResult['RDBD_TYPE_DSCR'];
  document.getElementById("p_returned_RTE_DFO").innerHTML = currentResult['RTE_DFO'];

  document.getElementById("p_returned_CTRL_SECT_LN_NBR").innerHTML = currentResult['CTRL_SECT_LN_NBR'];
  document.getElementById("p_returned_CTRL_SECT_MPT").innerHTML = currentResult['CTRL_SECT_MPT'];

  document.getElementById("p_returned_RMRKR_PNT_NBR").innerHTML = currentResult['RMRKR_PNT_NBR'];
  document.getElementById("p_returned_RMRKR_DISPLACEMENT").innerHTML = currentResult['RMRKR_DISPLACEMENT'];

  document.getElementById("p_returned_LAT").innerHTML = currentResult['LAT'];
  document.getElementById("p_returned_LON").innerHTML = currentResult['LON'];
  }

//navResults called by pagination buttons in showResults function
function navResults(direction) {
  direction == 'next' ? currentPos++ : currentPos--;
  
  if (currentPos > 0 && currentPos <= resultCount){
    showResults(allResults, currentPos)
  }
}


//insert pagination
function insertPagination(currentPos, resultCount) {
  console.log(currentPos + " of " + resultCount);
  const btn_prev_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Previous</span></li>`;
  const btn_next_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Next</span></li>`;

  const btn_prev_active = `<li class="page-item"><span class="page-link" onClick="navResults('prev')">Previous</span></li>`;
  const btn_next_active = `<li class="page-item"><span class="page-link" onClick="navResults('next')">Next</span></li>`;

  const pgnStart = `<nav aria-label="..."><ul class="pagination justify-content-center">`
  const pgnEnd = `</ul></nav>`
  const pgnCurrentOpen = `<li class="page-item active" aria-current="page"><span class="page-link">`
  const pgnCurrentClose = `</span></li>`
  const pgnCurrentIndicator = `${currentPos} of ${resultCount}`
  var pgnCurrent = `<li class="page-item active" aria-current="page"><span class="page-link">` + "No data" + `</span></li>`
  var navTitle = pgnStart + pgnCurrent + pgnEnd

  if (resultCount > 1){
    if (currentPos == 1){
      pgnCurrent = btn_prev_inactive + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    } else if (currentPos + 0 == resultCount){
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_inactive
    } else {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    }
  } else if (resultCount == 1){
    pgnCurrent = pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose
  } else {
    pgnCurrent = pgnCurrentOpen + "No data" + pgnCurrentClose
  }

  navTitle = pgnStart + pgnCurrent + pgnEnd

  //insert pagination
  document.getElementById("result-pagination").innerHTML= navTitle;

}


