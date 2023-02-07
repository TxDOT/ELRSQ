function showResults(results, navIndex) {

  allResults = results;
  console.log(allResults);
  const index = navIndex ? navIndex - 1  : 0;
  currentResult = allResults[index];

  //results pagination
  const navTitle = `<span> <button class='btn btn-primary btn-nav' onClick="navResults('prev')">prev</button> 
    ${currentPos} of ${results.length} 
    <button class='btn btn-primary btn-nav' onClick="navResults('next')">next</button></span>`


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
  

  //insert pagination
  document.getElementById("result-pagination").innerHTML= navTitle;


}

//navResults called by pagination buttons in showResults function
function navResults(direction) {
  direction == 'next' ? currentPos++ : currentPos--;
  
  if (currentPos > 0 && currentPos <= allResults.length){
    showResults(allResults, currentPos)
  }
}