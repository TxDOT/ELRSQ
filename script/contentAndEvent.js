const contentAndEvent = {
    "form-view":  {
      "coordinates": {
        "title": 'Coordinates',
        "body": [ "<label>Latitude :</label> <input id='lat' type='textbox' value='29.39780'/>",
                  "<label>Longitude :</label> <input id='lon' type='textbox' value='-94.98759'/>",
                  "<button class='btn btn-primary' onClick='formHandler(\"form-view\",\"coordinates\")'>Query</button>"
                ],
        "handler": function() {
          coordinateQuery()
        },
      } ,
       "ref-marker":{
        "title": 'Ref Marker',
        "body":[ 
          "<label>Route Name :</label> <input id='route-name' type='textbox' value='IH0010-KG'/>",
                  "<label>Reference Marker :</label> <input id='reference-marker' type='textbox' value='476'/>",
                  "<label>Displacement :</label> <input id='displacement' type='textbox' value='4'/>",
                  "<button class='btn btn-primary' onClick='formHandler(\"form-view\",\"ref-marker\")'>Query</button>"
                ],
        "handler" : function() {
           refMarkerQuery()
        }
       } ,
       "dfo": {
        "title": 'DFO',
        "body": [ "<label>Route Name :</label> <input id='route-name' type='textbox' value='IH0010-KG'/>",
                  "<label>Distance From Origin :</label> <input id='dfo' type='textbox' value='0.5'/>",
                  "<button class='btn btn-primary' onClick='formHandler(\"form-view\",\"dfo\")'>Query</button>"
                ],
        "handler": function() {
          dfoQuery()
        },
      } ,
       "control-section":{
        "title": 'Control Sec',
        "body":[ "<label>Control Section Number :</label> <input id='control-section-number' type='textbox' value='LY7609'/>",
                  "<label>Mile Point Measure :</label> <input id='mile-point-measure' type='textbox' value='0.2'/>",
                   "<button class='btn btn-primary' onClick='formHandler(\"form-view\",\"control-section\")'>Query</button>"
                ],
        "handler" : function() {
          controlSectionQuery()
        }
       },
       "map-cursor":{
         "title": 'Map Cursor',
        "body":[ "<div>Click on Map</div>"],
        "handler" : function() {
        }
       }
      
    },
     "bulk-conversion":  {
      
      "coordinates": {
        "title": 'Coordinates',
        "body": [ "<div>Bulk Conversion Coordinates (WIP)</div>"
                ],
        "handler": function() {
  
        },
      } ,
       "ref-marker":{
         "title": 'Ref Marker',
        "body":[ "<div>Bulk Conversion Ref Marker (WIP)</div>"
                ],
        "handler" : function() {
  
        }
       } ,
       "dfo": {
         "title": 'DFO',
        "body": ["<div>Bulk Conversion  DFO (WIP)</div>"
                ],
        "handler": function() {
  
        },
      } ,
       "control-section":{
         "title": 'Control Sec',
        "body":["<div>Bulk Conversion Control Sec (WIP)</div>"
                ],
        "handler" : function() {
        }
       }
      
    },
    "build-routes":  {
      
      "coordinates": {
         "title": 'Coordinates',
        "body": ["<div>Build Routes Coordinates (WIP)</div>"
                ],
        "handler": function() {
  
        },
      } ,
       "ref-marker":{
        "title": 'Ref Marker',
        "body":["<div>Build Routes Ref Marker (WIP)</div>"
                ],
        "handler" : function() {
  
        }
       } ,
       "dfo": {
         "title": 'DFO',
        "body": ["<div>Build Routes DFO (WIP)</div>"
                ],
        "handler": function() {
  
        },
      } ,
       "control-section":{
        "title": 'Control Sec',
        "body":["<div>Build Routes Control Sec (WIP)</div>"
                ],
        "handler" : function() {
        }
       }
      
    }
  }
  