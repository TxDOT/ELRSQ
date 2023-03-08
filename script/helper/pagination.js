let allResults = [];
function resetAllResults() {
  allResults = [];
}

let currentPagination = 1;
function resetCurrentPagination() {
  currentPagination = 1;
}


function paginatedResultsSequence(results) {
  resetCurrentPagination();
  clearPagination("#result-pagination");
  destroyPaginationEventHandlers("#result-pagination");
  createPaginationEventHandlers("#result-pagination", results);
}

//clear pagination
function clearPagination(someId) {
  let counterDisplay = `No data`;
  $(someId + ' > nav > ul > .li_prev').removeClass("active");
  $(someId + ' > nav > ul > .li_next').removeClass("active");
  $(someId + ' > nav > ul > .li_prev').addClass("disabled");
  $(someId + ' > nav > ul > .li_curr').addClass("active");
  $(someId + ' > nav > ul > .li_curr > span').html(counterDisplay);
  $(someId + ' > nav > ul > .li_next').addClass("disabled");
}

function destroyPaginationEventHandlers(someId) {
  $(someId + ' > nav > ul > .li_prev').off('click');
  $(someId + ' > nav > ul > .li_next').off('click');
}

function createPaginationEventHandlers(someId, results) {
  $(someId + ' > nav > ul > .li_prev').on('click', function prevResult() { navResults('prev', results); });
  $(someId + ' > nav > ul > .li_next').on('click', function nextResult() { navResults('next', results); });
}

//navResults called by pagination buttons in showResults function
function navResults(direction, results) { //FIXME have function as an input

  if (direction == 'prev' && currentPagination > 1) {
    currentPagination--;
  } else if (direction == 'next' && currentPagination < results.length) {
    currentPagination++;
  }

  if (currentPagination > 0 && currentPagination <= results.length) {
    readOutResults(results, currentPagination)
  }
}



function paginationUpdater(someId, currentPagination, results) {
  //console.log("paginationUpdater");
  let resultCount = results.length;
  console.log(currentPagination + " of " + resultCount);
  let counterDisplay = `${currentPagination} of ${resultCount}`;
  //console.log(counterDisplay);

  if (resultCount > 1) {
    console.log("more than 1 result");
    if (currentPagination == 1) {
      console.log("on first result");
      $(someId + ' > nav > ul > .li_prev').addClass("disabled");
      $(someId + ' > nav > ul > .li_curr').addClass("active");
      $(someId + ' > nav > ul > .li_curr > span').html(counterDisplay);
      $(someId + ' > nav > ul > .li_next').removeClass("disabled");
    }

    else if (currentPagination + 0 == resultCount) {
      $(someId + ' > nav > ul > .li_prev').removeClass("disabled");
      $(someId + ' > nav > ul > .li_curr').addClass("active");
      $(someId + ' > nav > ul > .li_curr > span').html(counterDisplay);
      $(someId + ' > nav > ul > .li_next').addClass("disabled");
    }

    else {
      $(someId + ' > nav > ul > .li_prev').removeClass("disabled");
      $(someId + ' > nav > ul > .li_curr').addClass("active");
      $(someId + ' > nav > ul > .li_curr > span').html(counterDisplay);
      $(someId + ' > nav > ul > .li_next').removeClass("disabled");
    }
  }

  else if (resultCount == 1) {
    $(someId + ' > nav > ul > .li_curr > span').addClass("active").html(counterDisplay);
  }

  else {
    $(someId + ' > nav > ul > .li_curr > span').addClass("active").html(`No data`);
  }

}
