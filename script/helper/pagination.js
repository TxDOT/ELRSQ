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
