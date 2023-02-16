// <!--makeTableFromArray(dataArray)
// accepts multi-dimensional array and returns a string for an HTML table with a header record (Example: [["ID","NAME","AGE"],["1", "Michael",43], ["2", "Jessica",40]])-->


//HTML Table accepts a multi-dimensional array.  First set in the array should contain field names.  Example: [["ID","NAME","AGE"],["1", "Michael",43], ["2", "Jessica",40]]
//---------------------------------------
function makeTableFromArray(dataArray) {
    var result = "<table>";
    for(var i=0; i<dataArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<dataArray[i].length; j++){
            if (i==0) {
                result += "<th>" + dataArray[i][j] + "</th>";
            }
            else {
                result += "<td>" + dataArray[i][j] + "</td>";
            }
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}
//---------------------------------------

