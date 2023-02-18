// function which takes method to query lrs service for a single point
async function lrsDualQuery(method, useMap, ...id_coord) {
    currentPos = 1;
    console.log(method);
    console.log(id_coord);

    let routeQueryOutput = [];


    if (useMap == 1) {
        //clear existing point
        view.graphics.removeAll();
    }

    if (method == 1) {
        b_coord = id_coord.slice(0, 2);
        e_coord = id_coord.slice(2, 4);
    }

    else if (method == 2) {
        b_coord = [id_coord[0], id_coord[1], id_coord[2]];
        e_coord = [id_coord[0], id_coord[3], id_coord[4]];
        rte_nm = document.getElementById(id_coord[0]).value;
        routeQueryOutput.push(rte_nm);
    }

    else if (method == 3) {
        b_coord = id_coord.slice(0, 2);
        e_coord = id_coord.slice(2, 4);
    }

    else if (method == 4) {
        b_coord = [id_coord[0], id_coord[1]];
        e_coord = [id_coord[0], id_coord[2]];
        rte_nm = document.getElementById(id_coord[0]).value;
        routeQueryOutput.push(rte_nm);
    }

    B_url = makeLrsQueryUrlFromHtml(method, b_coord);
    E_url = makeLrsQueryUrlFromHtml(method, e_coord);

    const B_results = await queryService(B_url);
    const E_results = await queryService(E_url);

    console.log("success");
    console.log(B_results);
    console.log(E_results);

    if (method == 1) {
        // need to make array of common route names and pass to selector
    }

    else if (method == 2) {

        let b_index = B_results.findIndex(function (item, i) {
            return item.RTE_DEFN_LN_NM === rte_nm
        });

        /*console.log(rte_nm);
        console.log(b_index);
        console.log(B_results[b_index]);*/
        let bdfo = B_results[b_index]['RTE_DFO'];
        routeQueryOutput.push(bdfo);

        let e_index = E_results.findIndex(function (item, i) {
            return item.RTE_DEFN_LN_NM === rte_nm
        });

        /*console.log(rte_nm);
        console.log(e_index);
        console.log(E_results[e_index]);*/
        let edfo = E_results[e_index]['RTE_DFO'];
        routeQueryOutput.push(edfo);

    }

    else if (method == 3) {
        // need to make array of common control sections and pass to selector
    }

    else if (method == 4) {

        let b_index = B_results.findIndex(function (item, i) {
            return item.RTE_DEFN_LN_NM === rte_nm
        });

        /*console.log(rte_nm);
        console.log(b_index);
        console.log(B_results[b_index]);*/
        let bdfo = B_results[b_index]['RTE_DFO'];
        routeQueryOutput.push(bdfo);

        let e_index = E_results.findIndex(function (item, i) {
            return item.RTE_DEFN_LN_NM === rte_nm
        });

        /*console.log(rte_nm);
        console.log(e_index);
        console.log(E_results[e_index]);*/
        let edfo = E_results[e_index]['RTE_DFO'];
        routeQueryOutput.push(edfo);
    }


    console.log(routeQueryOutput);

    showRouteResults(routeQueryOutput);

    /*
    if (useMap == 1) {
        showResultsOnMap(results);
    }*/

}



// fill in HTML table results
function showRouteResults(routeQueryOutput) {

    // fill in HTML results
    document.getElementById("p_returned_RTE_DEFN_LN_NM").innerHTML = routeQueryOutput[0];
    document.getElementById("p_returned_RTE_DFO_begin").innerHTML = routeQueryOutput[1];
    document.getElementById("p_returned_RTE_DFO_end").innerHTML = routeQueryOutput[2];
}