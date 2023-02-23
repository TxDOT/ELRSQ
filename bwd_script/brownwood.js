const useLoadIndicator = 1;

// status functions
function GreenToYellow() {
  $('#readyIndicator').removeClass('green');
  $('#busyIndicator').addClass('yellow');
  $('#readyBadge').hide();
  $('#busyBadge').show();
}

function YellowToGreen() {
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').show();
}

function ToRed() {
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').removeClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').hide();
  $('#errorIndicator').addClass('red');
  $('#errorBadge').show();
}

function ToGreen() {
  $('#busyIndicator').removeClass('yellow');
  $('#errorIndicator').removeClass('red');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#errorBadge').hide();
  $('#readyBadge').show();
}
// end status functions


const lrsApiFields = [
  "LAT",
  "LON",
  "GID",
  "RTE_DEFN_LN_NM",
  "RTE_DFO",
  "ROUTEID",
  "ROUTENUMBER",
  "RTE_PRFX_TYPE_DSCR",
  "RDBD_TYPE_DSCR",
  "RMRKR_PNT_NBR",
  "RMRKR_DISPLACEMENT",
  "CTRL_SECT_LN_NBR",
  "CTRL_SECT_MPT",
  "MSG",
  "distance"
]

// add certain page elements and event handlers on page load
$(document).ready(function () {

  $("nav_bar-component").load("components/html/nav_bar.html", function (response, status, xhr) {
    if (status == "error") { $("nav_bar-component").html(staticNav_Bar); }
  });

  $("indicator-component").load("components/html/indicator.html", function (response, status, xhr) {
    if (status == "error") { $("indicator-component").html(staticIndicator); }
  });

  // FIXME Bulk Upload: change to use Convert button instead of automatic
  document.getElementById("upload_csv-bulk").addEventListener('change', async function (e) {
    GreenToYellow();
    const fileContents = await readFile(e.target.files[0])
    YellowToGreen();
    //thenConvertCSVByMethod(fileContents);
    bwd_setMethodAndFields(fileContents);
  });

});


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


function fixThisVerySpecificTextFormat(AAdddd) {
  let AAdddd_dash_KG = AAdddd + "-KG";
  return AAdddd_dash_KG;
}


// calls API
async function queryService(url) {
  GreenToYellow();
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
  YellowToGreen();
  return response.json(); // parses JSON response into native JavaScript objects
}


// bulk conversion functions

async function bwd_setMethodAndFields(fileContents) {
  let parsedInputCSV = Papa.parse(fileContents, { "skipEmptyLines": true }).data;

  // set fields
  let field_indices = await bwd_setFields(parsedInputCSV);
  let lrm_indices = field_indices[0];
  let other_indices = field_indices[1];

  await bwd_lrsDualQuery(parsedInputCSV, lrm_indices, other_indices); // need to determine template
}


async function bwd_setFields(parsedInputCSV) {
  let field_indices = [];
  let candidate_fields = parsedInputCSV[0];

  dropDownPopulator("#rte_nm_field", candidate_fields);
  dropDownPopulator("#brm_field", candidate_fields);
  dropDownPopulator("#bd_field", candidate_fields);
  dropDownPopulator("#erm_field", candidate_fields);
  dropDownPopulator("#ed_field", candidate_fields);

  let rte_nm_field = ~~await confirmFieldChoice("#btn-rte_nm_field", "#rte_nm_field");
  let brm_field = ~~await confirmFieldChoice("#btn-brm_field", "#brm_field");
  let bd_field = ~~await confirmFieldChoice("#btn-bd_field", "#bd_field");
  let erm_field = ~~await confirmFieldChoice("#btn-erm_field", "#erm_field");
  let ed_field = ~~await confirmFieldChoice("#btn-ed_field", "#ed_field");

  all_fields = [...Array(candidate_fields.length).keys()];
  lrm_indices = [rte_nm_field, brm_field, bd_field, erm_field, ed_field];
  other_indices = all_fields.filter(x => !lrm_indices.includes(x));

  field_indices = [lrm_indices, other_indices];

  return field_indices;
}


// function which takes method to query lrs service for a single point
async function bwd_lrsDualQuery(parsedInputCSV, lrm_indices, other_indices) {

  GreenToYellow();

  let refinedData = [];
  let titleKeys = other_indices.map(i => parsedInputCSV[0][i]).concat(lrsApiFields.map(i => 'Begin ' + i)).concat(lrsApiFields.map(i => 'End ' + i));
  let b_lrm_indices = [lrm_indices[0], lrm_indices[1], lrm_indices[2]];
  let e_lrm_indices = [lrm_indices[0], lrm_indices[3], lrm_indices[4]];
  let rte_nm_lrm_indices = lrm_indices[0];

  // skipping 0 header row
  for (let rowToQuery = 1; rowToQuery < parsedInputCSV.length; rowToQuery++) { //FIXME change back to 1
    console.log("row " + (rowToQuery + 1) + " of " + parsedInputCSV.length);
    let routeQueryOutput = [];

    let user_input_rte_nm = fixThisVerySpecificTextFormat(parsedInputCSV[rowToQuery][rte_nm_lrm_indices]);
    let B_url = bwd_makeLrsQueryUrlFromIndex(parsedInputCSV[rowToQuery], b_lrm_indices, 1); // FIXME have this take function as argument
    let E_url = bwd_makeLrsQueryUrlFromIndex(parsedInputCSV[rowToQuery], e_lrm_indices, 1);

    console.log(B_url);
    console.log(E_url);

    const B_results = await queryService(B_url);
    const E_results = await queryService(E_url);

    let routeResulrsArr = bwd_Rte_Output_Assembler(routeQueryOutput, B_results, E_results, user_input_rte_nm);
    let rowhead = other_indices.map(i => parsedInputCSV[rowToQuery][i])
    let fullRowData = rowhead.concat(routeResulrsArr);
    refinedData.push(fullRowData);
  }

  refinedData.unshift(titleKeys);

  //TODO tabular export
  tabularRoutesConvertExport(refinedData);

  YellowToGreen();

}


function bwd_makeLrsQueryUrlFromIndex(vector, lrm_indices, format_rte_nm) {
  let routeName = '';

  if (format_rte_nm == 1) {
    routeName = fixThisVerySpecificTextFormat(vector[lrm_indices[0]]);
  } else {
    routeName = vector[lrm_indices[0]];
  }

  let refMarker = vector[lrm_indices[1]];
  let displacement = vector[lrm_indices[2]];
  let url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  return url;
}


// description
function bwd_Rte_Output_Assembler(routeQueryOutput, B_results, E_results, rte_nm) {

  let b_index = B_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm
  });

  let b_output = B_results[b_index];

  let e_index = E_results.findIndex(function (item, i) {
    return item.RTE_DEFN_LN_NM === rte_nm
  });

  let e_output = E_results[e_index];

  //breakpoint
  console.log(b_output);
  console.log(e_output);

  let rteOutputAssemblerOutput = [];
  try {
    rteOutputAssemblerOutput = (Object.values(b_output)).concat(Object.values(e_output));
  } catch (err) {
    rteOutputAssemblerOutput = lrsApiFields.concat(lrsApiFields);
  }


  return (rteOutputAssemblerOutput);
}


// tabularPointsConvertExport

function tabularRoutesConvertExport(resultsArr) {
  exportRoutesToCsvFile(resultsArr);
}


function exportRoutesToCsvFile(resultsArr) {
  console.log("CSV export");

  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'bwdresults.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}