function makequeryTxDOT_Roadways_Unsegmented(){
    const routeNameElem = document.getElementById("p_returned_RTE_DEFN_LN_NM");
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

