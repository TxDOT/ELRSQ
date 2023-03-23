// add new last() method:
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};


function dropDownPopulator(dropDownId, candidate_fields) {
  for (var aCandidate_field = 0; aCandidate_field < candidate_fields.length; aCandidate_field++) {
    var optn = candidate_fields[aCandidate_field];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = aCandidate_field; //this returns the index of the selection, not the selection itself
    $(dropDownId).append(el);
  }
}

function dropDownDepopulator(dropDownId) {
  $(dropDownId).empty();
}


async function confirmFieldChoice(buttonId, dropDownId) {
  result = (await
    new Promise(async function (resolve) {
      $(buttonId).on("click", function (e) {
        //e.preventDefault();
        resolve(document.querySelector(dropDownId).value);
      });
    })
  );
  return result;
}


async function confirmFieldChoices(buttonId) {
  result = (await
    new Promise(async function (resolve) {
      $(buttonId).on("click", function (e) {
        resolve("1");
      });
    })
  );
  return result;
}

async function confirmResultsShow(buttonId) {
  result = (await
    new Promise(async function (resolve) {
      $(buttonId).on("click", function (e) {
        resolve("1");
      });
    })
  );
  console.log(result);
  return result;
}





function readFile(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(file);
  });
};


// <!--makeTableFromArray(dataArray)
// accepts multi-dimensional array and returns a string for an HTML table with a header record (Example: [["ID","NAME","AGE"],["1", "Michael",43], ["2", "Jessica",40]])-->


//HTML Table accepts a multi-dimensional array.  First set in the array should contain field names.  Example: [["ID","NAME","AGE"],["1", "Michael",43], ["2", "Jessica",40]]
//---------------------------------------
function makeTableFromArray(dataArray) {

  var result = "<table>";
  for (var i = 0; i < dataArray.length; i++) {
    result += "<tr>";
    for (var j = 0; j < dataArray[i].length; j++) {
      if (i == 0) {
        result += "<th>" + dataArray[i][j] + "</th>";
      }
      else {
        result += "<td>" + dataArray[i][j] + "</td>";
      }
    }
    result += "</tr>";
  }
  result += "</table > ";

  return result;
}
//---------------------------------------


//TODO add many more formats
function fixThisVerySpecificTextFormat(AAdddd) {
  let AAdddd_dash_KG = AAdddd + "-KG";
  return AAdddd_dash_KG;
}
