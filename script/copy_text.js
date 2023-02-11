function copyCoordinates() {
      
    /* Select text area by id*/
    const latElem = document.getElementById("p_returned_LAT");
    const lonElem = document.getElementById("p_returned_LON");
    lat = latElem.innerHTML;
    lon = lonElem.innerHTML;
    text = `${lat}, ${lon}`;

    /* Copy text into clipboard */
    navigator.clipboard.writeText(text);
}


function copyFieldLocation() {
      
    /* Select text area by id*/
    const routeNameElem = document.getElementById("p_returned_ROUTENUMBER");
    const refMarkerElem = document.getElementById("p_returned_RMRKR_PNT_NBR");
    const displacementElem = document.getElementById("p_returned_RMRKR_DISPLACEMENT");
    routeName = routeNameElem.innerHTML;
    refMarker = refMarkerElem.innerHTML;
    displacement = displacementElem.innerHTML;  
    text = `RouteID: ${routeName}, ReferenceMarker: ${refMarker}, Displacement: ${displacement}`;

    /* Copy text into clipboard */
    navigator.clipboard.writeText(text);
}


function copyControlSection() {
      
    /* Select text area by id*/
    const controlSecNumElem = document.getElementById("p_returned_CTRL_SECT_LN_NBR");
    const milePointMeasureElem = document.getElementById("p_returned_CTRL_SECT_MPT");
    controlSecNum = controlSecNumElem.innerHTML;
    milePointMeasure = milePointMeasureElem.innerHTML;
    text = `ControlSectionNumber: ${controlSecNum}, MilePointMeasure: ${milePointMeasure}`;

    /* Copy text into clipboard */
    navigator.clipboard.writeText(text);
}


function copyRouteDFO() {
      
    /* Select text area by id*/
    const routeNameElem = document.getElementById("p_returned_ROUTENUMBER");
    const dfoElem = document.getElementById("p_returned_RTE_DFO");
    routeName = routeNameElem.innerHTML;
    dfo = dfoElem.innerHTML;  
    text = `RouteID: ${routeName}, DistanceFromOrigin: ${dfo}`;

    /* Copy text into clipboard */
    navigator.clipboard.writeText(text);
}

function makequeryTxDOT_Roadways_Unsegmented(){
    const routeNameElem = document.getElementById("p_returned_ROUTENUMBER");
    routeName = routeNameElem.innerHTML;
    const latElem = document.getElementById("p_returned_LAT");
    const lonElem = document.getElementById("p_returned_LON");
    lat = latElem.innerHTML;
    lon = lonElem.innerHTML;
    xmin = (parseFloat(lon) - 0.0001);
    xmax = (parseFloat(lon) + 0.0001);
    ymin = (parseFloat(lat) - 0.0001);
    ymax = (parseFloat(lat) + 0.0001);

    point = `{"xmin":${xmin},"ymin":${ymin},"xmax":${xmax},"ymax":${ymax},"spatialReference":{"wkid":4326}}`
    encodedpoint = encodeURIComponent(point);


    url = `https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Roadways_Unsegmented/FeatureServer/0/query?f=json&`+
    `where=RTE_NM%3D%27${routeName}%27&`+
    `geometry=${encodedpoint}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&`+
    `outFields=*&returnGeometry=false`

    /* Copy text into clipboard */
    navigator.clipboard.writeText(url);

    rdwayQuery(url);


}

