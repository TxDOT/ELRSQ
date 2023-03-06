
require([
  "esri/Graphic",
  "esri/layers/FeatureLayer"
], function (Graphic, FeatureLayer) {




  layer_3 = new FeatureLayer({
    // url:
    //   "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "cim",
        data: {
          type: "CIMSymbolReference",
          primitiveOverrides: [
            {
              type: "CIMPrimitiveOverride",
              primitiveName: "textGraphic",
              propertyName: "TextString",
              valueExpressionInfo: {
                type: "CIMExpressionInfo",
                title: "Custom",
                expression: "$feature.Station_Name",
                returnType: "Default"
              }
            }
          ],
          symbol: getPointSymbolData()
        }
      }
    }
  });






  function getPointSymbolData() {
    return {
      "type": "CIMPointSymbol",
      "symbolLayers": [
        {
          "type": "CIMVectorMarker",
          "enable": true,
          "size": 10,
          "colorLocked": true,
          "anchorPointUnits": "Relative",
          "frame": { "xmin": -5, "ymin": -5, "xmax": 5, "ymax": 5 },
          "markerGraphics": [
            {
              "type": "CIMMarkerGraphic",
              primitiveName: "textGraphic",
              "geometry": { "x": 0, "y": 0 },
              "symbol": {
                "type": "CIMTextSymbol",
                "fontFamilyName": "Arial",
                "fontStyleName": "Bold",
                "height": 10,
                "horizontalAlignment": "Center",
                "offsetX": 0,
                "offsetY": 5.5,
                "symbol": { "type": "CIMPolygonSymbol", "symbolLayers": [{ "type": "CIMSolidFill", "enable": true, "color": [214, 41, 41, 255] }] },
                "verticalAlignment": "Center",
                "font": { "family": "Arial", "decoration": "none", "style": "normal", "weight": "bold" }
              },
              "textString": "text"
            }
          ],
          "scaleSymbolsProportionally": true,
          "respectFrame": true
        },

        {
          "type": "CIMVectorMarker",
          "enable": true,
          "anchorPoint": { "x": 0, "y": -0.5 },
          "anchorPointUnits": "Relative",
          "dominantSizeAxis3D": "Y",
          "size": 40,
          "billboardMode3D": "FaceNearPlane",
          "frame": { "xmin": 0, "ymin": 0, "xmax": 21, "ymax": 21 },
          "markerGraphics": [
            {
              "type": "CIMMarkerGraphic",
              "geometry": { "rings": [[[21, 21], [21, 6.76], [14, 6.56], [10.5, 0], [7.22, 6.56], [0, 6.56], [0, 21], [21, 21]]] },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  { "type": "CIMSolidStroke", "enable": true, "capStyle": "Round", "joinStyle": "Round", "lineStyle3D": "Strip", "miterLimit": 10, "width": 1, "color": [0, 0, 0, 255] },
                  { "type": "CIMSolidFill", "enable": true, "color": [228, 226, 226, 255] }
                ]
              }
            }
          ],
          "scaleSymbolsProportionally": true,
          "respectFrame": true,
          "offsetX": 0,
          "offsetY": -18
        }
      ]
    };
  }



});
























{
  "type": "CIMPointSymbol",
    "symbolLayers": [
      {
        "type": "CIMVectorMarker",
        "enable": true,
        "anchorPointUnits": "Relative",
        "dominantSizeAxis3D": "Y",
        "size": 40,
        "billboardMode3D": "FaceNearPlane",
        "frame": { "xmin": 0, "ymin": 0, "xmax": 28, "ymax": 17 },
        "markerGraphics": [
          {
            "type": "CIMMarkerGraphic",
            "geometry": {
              "rings": [[[25.36, 0], [2.64, 0], [1.63, 0.19], [0.77, 0.74], [0.2, 1.56], [0, 2.52], [0, 14.48], [0.2, 15.44], [0.77, 16.26], [1.63, 16.81], [2.64, 17], [25.36,
                17], [26.37, 16.81], [27.23, 16.26], [27.8, 15.44], [28, 14.48], [28, 2.52], [27.8, 1.56], [27.23, 0.74], [26.37, 0.19], [25.36, 0]]]
            },
            "symbol": {
              "type": "CIMPolygonSymbol",
              "symbolLayers": [
                { "type": "CIMSolidStroke", "enable": true, "capStyle": "Round", "joinStyle": "Round", "lineStyle3D": "Strip", "miterLimit": 10, "width": 1, "color": [162, 183, 158, 255] },
                { "type": "CIMSolidFill", "enable": true, "color": [37, 134, 24, 255] }
              ]
            }
          }
        ],
        "scaleSymbolsProportionally": true,
        "respectFrame": true
      }
    ]
}









