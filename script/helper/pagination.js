//insert pagination
function insertPagination(currentPagination, resultCount) {
  console.log(currentPagination + " of " + resultCount);

  //insert pagination
  $("#result-pagination").html(navTitle); // FIXME this is changing the inner HTML instead of dynamically creating elements
  $("#pagn_prev").on('click', function () { navResults('prev'); }); //TODO move point on map
  $("#pagn_next").on('click', function () { navResults('next'); }); // TODO separate out from specific function

}


function paginationUpdater(someId, resultCount, currentPagination) {

  if (resultCount > 1) {
    if (currentPagination == 1) {
      $('someId > nav > ul > .li_prev').addClass(disabled);
      $('someId > nav > ul > .li_curr').addClass(active).html(`${currentPagination} of ${resultCount}`);
      $('someId > nav > ul > .li_next').removeClass(disabled);

    }

    else if (currentPagination + 0 == resultCount) {
      $('someId > nav > ul > .li_prev').removeClass(disabled);
      $('someId > nav > ul > .li_curr').addClass(active).html(`${currentPagination} of ${resultCount}`);
      $('someId > nav > ul > .li_next').addClass(disabled);
    }

    else {
      $('someId > nav > ul > .li_prev').removeClass(disabled);
      $('someId > nav > ul > .li_curr').addClass(active).html(`${currentPagination} of ${resultCount}`);
      $('someId > nav > ul > .li_next').removeClass(disabled);
    }
  }

  else if (resultCount == 1) {
    $('someId > nav > ul > .li_curr').addClass(active).html(`${currentPagination} of ${resultCount}`);
  }

  else {
    $('someId > nav > ul > .li_curr').addClass(active).html(`No data`);
  }

}







