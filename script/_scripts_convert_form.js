function Convert_Coords(elrs_method) {
  console.log("Convert_Coords function");

  console.log("elrs_method: " + elrs_method);

  function updateEcho(elrs_method) {
    console.log("update echo function");

    if (elrs_method == 1) {
      var lat = $.trim(document.getElementById("inputLat").value);
      var lon = $.trim(document.getElementById("inputLon").value);
      //document.getElementById("parameter_echo").innerHTML = "latitude: " + lat + "; longitude: " + lon;
    } else if (elrs_method == 2) {
      var routeid = $.trim(document.getElementById("inputRouteName_2").value);
      var refmarker = $.trim(document.getElementById("inputReferenceMarker").value);
      var displacement = $.trim(document.getElementById("inputDisplacement").value);
      //document.getElementById("parameter_echo").innerHTML = "routeid: " + routeid + "; refmarker: " + refmarker + "; displacement: " + displacement;
    } else if (elrs_method == 3) {
      var csj = $.trim(document.getElementById("inputControlSec").value);
      var mpm = $.trim(document.getElementById("inputMilepointMeasure").value);
      //document.getElementById("parameter_echo").innerHTML = "control section: " + csj + "; milepoint: " + mpm;
    } else if (elrs_method == 4) {
      var routeid = $.trim(document.getElementById("inputRouteName_4").value);
      var dfo = $.trim(document.getElementById("inputDFO").value);
      //document.getElementById("parameter_echo").innerHTML = "routeid: " + routeid + "; dfo: " + dfo;
    }


  }


  function makeURL(elrs_method) {
    console.log("make apiurl: " + elrs_method);
    var lat = $.trim(document.getElementById("inputLat").value);
    var lon = $.trim(document.getElementById("inputLon").value);
    var routeid_2 = $.trim(document.getElementById("inputRouteName_2").value);
    var routeid_4 = $.trim(document.getElementById("inputRouteName_4").value);
    var refmarker = $.trim(document.getElementById("inputReferenceMarker").value);
    var displacement = $.trim(document.getElementById("inputDisplacement").value);
    var dfo = $.trim(document.getElementById("inputDFO").value);
    var csj = $.trim(document.getElementById("inputControlSec").value);
    var mpm = $.trim(document.getElementById("inputMilepointMeasure").value);

    var gridpath = "https://lrs-ext.us-e1.cloudhub.io/api/"
    var grid_elrs1 = "https://lrs-ext.us-e1.cloudhub.io/api/" + "elrs1?Lat=" + lat + "&Lon=" + lon;
    var grid_elrs2 = "https://lrs-ext.us-e1.cloudhub.io/api/" + "elrs2?RouteID=" + routeid_2 + "&ReferenceMarker=" + refmarker + "&Displacement=" + displacement
    var grid_elrs3 = "https://lrs-ext.us-e1.cloudhub.io/api/" + "elrs3?ControlSectionNumber=" + csj + "&MilePointMeasure=" + mpm;
    var grid_elrs4 = "https://lrs-ext.us-e1.cloudhub.io/api/" + "elrs4?RouteID=" + routeid_4 + "&DistanceFromOrigin=" + dfo


    if (elrs_method == 1) {
      var apiurl = grid_elrs1;
    } else if (elrs_method == 2) {
      var apiurl = grid_elrs2;
    } else if (elrs_method == 3) {
      var apiurl = grid_elrs3;
    } else if (elrs_method == 4) {
      var apiurl = grid_elrs4;
    } else {
      console.log("no URL");
    }

    //document.getElementById("elrs_url").innerHTML=apiurl;
    //document.getElementById("elrs_url").href=apiurl;
    //document.getElementById("elrs_frame").src=apiurl;
    //console.log("updating URL & iframe");

    return apiurl;
  }


  async function getELRS(apiurl) {
    console.log("get elrs from: " + apiurl);
    const response = await fetch(apiurl, {method: 'GET'});
    if (!response.ok) {throw new Error(`Error! status: ${response.status}`);}
      const result = await response.json();
      return result;
  }


  async function parseJSON(apiurl) {
    console.log("parse JSON function");
    console.log("pj elrs_method: " + elrs_method);

    const result = await getELRS(apiurl);
    const stringifiedObject = JSON.stringify(result);
    const parsedObject = JSON.parse(stringifiedObject);
    console.log(parsedObject);

    var route_count = Object.keys(result).length;
    console.log("routes returned: " + route_count);
    //document.getElementById("p_returned_RouteCount").innerHTML = route_count;
    return parsedObject;
  }

  updateEcho(elrs_method);
  //SoftReset_Calculator(elrs_method);
  apiurl = makeURL(elrs_method);
  console.log("apiurl: " + apiurl);
  routes = parseJSON(apiurl);
  return routes;
}


async function renderELRS(em, pg) {
  console.log("render elrs function");
  elrs_method = em;
  console.log("render elrs method: " + elrs_method);

  const routes = await Convert_Coords(em);
  route_count = Object.keys(routes).length;
  pg = 0;

  console.log("route_count: " + route_count);
  document.getElementById("p_returned_LAT").innerHTML = routes[pg].LAT;
  document.getElementById("p_returned_LON").innerHTML = routes[pg].LON;
  document.getElementById("p_returned_ROUTEID").innerHTML = routes[pg].ROUTEID;
  document.getElementById("p_returned_ROUTENUMBER").innerHTML = routes[pg].ROUTENUMBER;
  //document.getElementById("p_returned_RTE_DEFN_LN_NM").innerHTML = routes[pg].RTE_DEFN_LN_NM;
  document.getElementById("p_returned_RTE_DFO").innerHTML = routes[pg].RTE_DFO;
  //document.getElementById("p_returned_RTE_PRFX_TYPE_DSCR").innerHTML = routes[pg].RTE_PRFX_TYPE_DSCR;
  document.getElementById("p_returned_RDBD_TYPE_DSCR").innerHTML = routes[pg].RDBD_TYPE_DSCR;
  document.getElementById("p_returned_RMRKR_PNT_NBR").innerHTML = routes[pg].RMRKR_PNT_NBR;
  document.getElementById("p_returned_RMRKR_DISPLACEMENT").innerHTML = routes[pg].RMRKR_DISPLACEMENT;
  document.getElementById("p_returned_CTRL_SECT_LN_NBR").innerHTML = routes[pg].CTRL_SECT_LN_NBR;
  document.getElementById("p_returned_CTRL_SECT_MPT").innerHTML = routes[pg].CTRL_SECT_MPT;

}

