function handleMapClick(evt) {
  
    const mapClickView = currentSelection[0] == "form-view" && currentSelection[1] == "map-cursor"
    if (mapClickView) {
      coordinateQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);
    }
  }