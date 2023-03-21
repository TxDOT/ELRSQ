//---------------------------------------
//HTML 5 Drawing functions -  Requires a Canvas tag with and id of srdCanvas, color is hexadecimal (ex. #FFFFFF)
//---------------------------------------
function drawRectangle(begX, begY, theWidth, theHeight, theColor) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = theColor;
    ctx.fillRect(begX, begY, theWidth, theHeight);
}
function drawCircle(begX, begY, theRadius, theColor) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = theColor;
    ctx.arc(begX, begY, theRadius, 0, 2 * Math.PI);
    ctx.fill();
}
function drawPoint(begX, begY, theRadius, theColor) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = theColor;
    ctx.arc(begX, begY, theRadius, 0, 2 * Math.PI);
    ctx.fill();
}
function drawLine(begX, begY, endX, endY, theWidth, theColor) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = theWidth;
    ctx.moveTo(begX, begY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = theColor;
    ctx.stroke();
}
function drawLineMultiplePoints(theCoords, theWidth, theColor) {
    if (theCoords.length > 0) {
        var canvas = document.getElementById("srdCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = theWidth;
        ctx.strokeStyle = theColor;

        //First point
        ctx.moveTo(theCoords[0][0], theCoords[0][1]);

        //Remainder of points
        for (var i = 1; i < theCoords.length; i++) {
            ctx.lineTo(theCoords[i][0], theCoords[i][1]);
        }

        ctx.stroke();
        ctx.closePath();
    }
}
function drawPolygon(theCoords, theWidth, fillColor, outlineColor, theScale) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.scale(theScale, theScale);
    ctx.beginPath();
    ctx.lineWidth = theWidth;

    //First point
    ctx.moveTo(theCoords[0][0], theCoords[0][1]);

    //Remainder of points
    for (var i = 0; i < theCoords.length; i++) {
        if (i > 0) {
            ctx.lineTo(theCoords[i][0], theCoords[i][1]);
        }
    }

    //Closing the polygon
    ctx.closePath();

    //Colors and styles
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = outlineColor;
    ctx.stroke();
}
function drawText(theText, theX, theY, theColor, theSize) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = theSize + "px Arial";
    ctx.fillStyle = theColor;
    ctx.textAlign = "center";
    ctx.fillText(theText, theX, theY);
}
function drawTextRotated(theText, theX, theY, theColor, theSize) {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = theSize + "px Arial";
    ctx.fillStyle = theColor;
    ctx.save();
    ctx.translate(theX, theY);
    ctx.rotate(-90 * Math.PI / 180);
    ctx.textAlign = "center";
    ctx.fillText(theText, 40, 25);
    ctx.restore();
}
function clearDrawings() {
    var canvas = document.getElementById("srdCanvas");
    var ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //WATCH
}
