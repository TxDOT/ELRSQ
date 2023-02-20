// Zooms to the extent of the layer as defined by
// its definitionExpression
// This method will work for all FeatureLayers, even
// those without a saved `fullExtent` on the service.

function zoomToLayer(layer) {
    return layer.queryExtent().then((response) => {
      console.log(response);
      view.goTo(response.extent)
        .catch((error) => {
          console.error(error);
        });
    });
  }
  
  