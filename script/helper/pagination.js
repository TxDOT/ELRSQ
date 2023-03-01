let allResults = [];
function resetAllResults() {
  allResults = [];
}

let currentPagination = 1;
function resetCurrentPagination() {
  currentPagination = 1;
}

// determine pagination and fill in HTML table results
//TODO move point on map
function showPointResults(results, navIndex) {
  console.log("showPointResults");

  allResults = results; // FIXME this is changing the value of a global variable
  resultCount = allResults.length; // use this somewhere
  const index = navIndex ? navIndex - 1 : 0;
  currentResult = allResults[index];

  //insert pagination
  insertPagination(currentPagination, resultCount);
  //paginationUpdater("#results-header", currentPagination, resultCount);

  fillInHtmlTable(currentResult);
}



// FIXME just use Jquery to change pagination states
//insert pagination
function insertPagination(currentPagination, resultCount) {
  console.log(currentPagination + " of " + resultCount);
  const btn_prev_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Previous</span></li>`;
  const btn_next_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Next</span></li>`;

  const btn_prev_active = `<li class="page-item"><span id="pagn_prev" class="page-link">Previous</span></li>`;
  const btn_next_active = `<li class="page-item"><span id="pagn_next" class="page-link">Next</span></li>`;

  const pgnStart = `<nav aria-label="..."><ul class="pagination justify-content-center">`
  const pgnEnd = `</ul></nav>`
  const pgnCurrentOpen = `<li class="page-item active" aria-current="page"><span class="page-link">`
  const pgnCurrentClose = `</span></li>`
  const pgnCurrentIndicator = `${currentPagination} of ${resultCount}`
  var pgnCurrent = `<li class="page-item active" aria-current="page"><span class="page-link">` + "No data" + `</span></li>`
  var navTitle = pgnStart + pgnCurrent + pgnEnd

  if (resultCount > 1) {
    if (currentPagination == 1) {
      pgnCurrent = btn_prev_inactive + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    } else if (currentPagination + 0 == resultCount) {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_inactive
    } else {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    }
  } else if (resultCount == 1) {
    pgnCurrent = pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose
  } else {
    pgnCurrent = pgnCurrentOpen + "No data" + pgnCurrentClose
  }

  navTitle = pgnStart + pgnCurrent + pgnEnd

  //insert pagination
  $("#result-pagination").html(navTitle); // FIXME this is changing the inner HTML instead of dynamically creating elements
  $("#pagn_prev").on('click', function () { navResults('prev'); }); //TODO move point on map
  $("#pagn_next").on('click', function () { navResults('next'); }); // TODO separate out from specific function

}



//navResults called by pagination buttons in showResults function
// TODO move point on map
// TODO separate out from specific function
function navResults(direction) {
  direction == 'next' ? currentPagination++ : currentPagination--;

  if (currentPagination > 0 && currentPagination <= resultCount) {
    showPointResults(allResults, currentPagination)
  }
}


























































function _paginationUpdater(someId, currentPagination, resultCount) {
  console.log(currentPagination + " of " + resultCount);

  if (resultCount > 1) {
    if (currentPagination == 1) {
      $(someId + ' > nav > ul > .li_prev').addClass("disabled");
      $(someId + ' > nav > ul > .li_curr').addClass("active").html(`${currentPagination} of ${resultCount}`);
      $(someId + ' > nav > ul > .li_next').removeClass("disabled");

    }

    else if (currentPagination + 0 == resultCount) {
      $(someId + ' > nav > ul > .li_prev').removeClass("disabled");
      $(someId + ' > nav > ul > .li_curr').addClass("active").html(`${currentPagination} of ${resultCount}`);
      $(someId + ' > nav > ul > .li_next').addClass("disabled");
    }

    else {
      $(someId + ' > nav > ul > .li_prev').removeClass("disabled");
      $(someId + ' > nav > ul > .li_curr').addClass("active").html(`${currentPagination} of ${resultCount}`);
      $(someId + ' > nav > ul > .li_next').removeClass("disabled");
    }
  }

  else if (resultCount == 1) {
    $(someId + ' > nav > ul > .li_curr').addClass("active").html(`${currentPagination} of ${resultCount}`);
  }

  else {
    $(someId + ' > nav > ul > .li_curr').addClass("active").html(`No data`);
  }

}



//navResults called by pagination buttons in showResults function
// TODO move point on map
// TODO separate out from specific function
function _navResults(direction) {
  direction == 'next' ? currentPagination++ : currentPagination--;

  if (currentPagination > 0 && currentPagination <= resultCount) {
    showPointResults(allResults, currentPagination)
  }
}
