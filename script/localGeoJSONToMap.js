// https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html


function foo() {

    console.log('foo');

    require(["esri/layers/GeoJSONLayer"], (GeoJSONLayer) => {


        // create a geojson layer from geojson feature collection
        const geojson = {
            "type": "FeatureCollection",
            "metadata": {},
            "features": [
                { "type": "Feature", "properties": { "mag": 8, }, "geometry": { "type": "Point", "coordinates": [-93.98759004, 30.39780972] }, "id": "ak02327gyz9x" },
                { "type": "Feature", "properties": { "mag": 7 }, "geometry": { "type": "Point", "coordinates": [-94.98759004, 29.39780972] }, "id": "us6000jpiy" }
            ]
        };

        console.log(geojson);

        // create a new blob from geojson featurecollection
        const blob = new Blob([JSON.stringify(geojson)], {
            type: "application/json"
        });

        // URL reference to the blob
        const url = URL.createObjectURL(blob);

        const renderer = {
            type: "simple",
            field: "mag",
            symbol: {
                type: "simple-marker",
                color: "orange",
                outline: {
                    color: "white"
                }
            },
            visualVariables: [{
                type: "size",
                field: "mag",
                stops: [{
                    value: 2.5,
                    size: "4px"
                },
                {
                    value: 8,
                    size: "40px"
                }
                ]
            }]
        };


        // create new geojson layer using the blob url
        const projectLayer = new GeoJSONLayer({
            url: url,
            copyright: "USGS Earthquakes",
            renderer: renderer,
            orderBy: {
                field: "mag"
            }
        });

        view.map.add(projectLayer);  // adds the layer to the map

        // When the layer is loaded, query for the extent
        // of all features in the layer. Then set the view's
        // extent to the returned extent of all features.

        projectLayer
            .when(() => {
                return projectLayer.queryExtent();
            })
            .then((response) => {
                view.goTo(response.extent);
            });

    });
}
















