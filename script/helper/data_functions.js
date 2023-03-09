// <!--makeDateTime()
// returns a data in this format: month + "/" + day + "/" + year + " " + hour + ":" + minutes-->

// <!--roundToDecimalPlace(value,decimals)
// accepts a number and desired decimal place, returns the number rounded to that place-->

// <!--getRandomIntInclusive(min,max)
// accepts and min and max value, returns a number within that range (inclusive of the min and max passed to function)-->

// <!--findMin(theArray)
// accepts an array, returns the minimum value in that array-->

// <!--findMax(theArray)
// accepts an array, return the maximum value in that array-->

// <!--sumNumericArray(theArray)
// accepts an array, returns the sum of the values in the array-->

// <!--getLeftCharacters(theData,theNumber)
// accepts a string and position number, returns the character from 0 to the position number-->

// <!--getRightCharacters(theData,theNumber)
// accepts a string and number for right most characters to keep, return right most characters-->

// <!--getMiddleCharacters(theData,beginNumber,endNumber)
// accepts a string, begin character number, end character number, returns text between the begin and end numbers-->

// <!--addCommas(nStr)
// accepts a string and return string with commas as needed-->

// <!--removeCommas(nStr)
// accepts a string and return string without commas as needed-->

// <!--replaceCharacter(theText,theReplacement)
// accepts a string and returns a string without any special characters (replaces them with the replacement pass to the function (theReplacement))-->





//Return the Date and Time---------------
function makeDateTime() {
    var monthArray = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	var dateObj = new Date();
	var month = dateObj.getUTCMonth(); //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var hour = dateObj.getUTCHours();
	var minutes = dateObj.getUTCMinutes();
	var newdate = month + "/" + day + "/" + year + " " + hour + ":" + minutes;
    return [monthArray[month],year];
}
//---------------------------------------

//Numberic Operations--------------------
function roundToDecimalPlace(value,decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

//Random Number
function getRandomIntInclusive(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Find Minimum value in an array
function findMin(theArray) {
   var minInArray = Math.min.apply(Math, theArray);
   return minInArray;
}

//Find Maximum value in an array
function findMax(theArray) {
   var maxInArray = Math.max.apply(Math, theArray);
   return maxInArray;
}

//Sum Numbers in a Array
function sumNumericArray(theArray) {
    var sum = 0;
    for (var i = 0, len = theArray.length; i < len; i++) {
        sum += theArray[i];
    }
    return sum;
}
//---------------------------------------

//String Operations Left,Right,Mid,Commas
//---------------------------------------
function getLeftCharacters(theData,theNumber) {
    return theData.substring(0, theNumber);
}

function getRightCharacters(theData,theNumber) {
    return theData.substring(theData.length-theNumber, theData.length);
}

function getMiddleCharacters(theData,beginNumber,endNumber) {
    return theData.substring(beginNumber, beginNumber+endNumber);
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function removeCommas(theString) {
    var newStr = theString.replace(/,/g, '');
    return newStr;
}

function replaceCharacter(theText,theReplacement) {
    var newText = theText.replace(/[^a-zA-Z0-9 ]/g,theReplacement);
    return newText;
}
//---------------------------------------
