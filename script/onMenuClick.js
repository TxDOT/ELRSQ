function onMenuClick(menuChoice, subMenu, elem) {

    document.getElementById("result-pagination").innerHTML= "";
    document.getElementById("results-container").innerHTML =  "";
  
    currentSelection = [menuChoice, subMenu];
    //add selected class to these two 
  
    //load the submenu
    const selectedContentItem = contentAndEvent[menuChoice][subMenu];
    const selectedMainItem = contentAndEvent[menuChoice];
  
    //remove select from all   
    if (elem) {
      //menu-button
      const menuButtonElems = document.getElementsByClassName('menu-button');
      
      Array.from(menuButtonElems).forEach(function(element) {
          element.classList.remove("selected");
      });
  
      elem.classList.add("selected")
    }
    
    const subMenuBody = []
    let counter = 0
    for (const subItemKey in selectedMainItem) {
      const firstClass = !counter ? 'first' : '';
      const activeItem = subMenu == subItemKey ?  true : false;
      subMenuBody.push(`<div class="col-sm menu-button ${firstClass} ${ activeItem ? 'selected': ''}" onClick='onMenuClick("${menuChoice}","${subItemKey}")'>${selectedMainItem[subItemKey].title}</div>`);
      counter++;
    }
    
    document.getElementById("sub-menu").innerHTML = subMenuBody.join("");
    //load body
    let bodyContent = "<div class='mt-3'></div>";
    
    bodyContent += selectedContentItem.body.join("</br>");
  
    document.getElementById("dynamic-content").innerHTML = bodyContent;
    document.getElementById("body-title").innerHTML = "Query";
  }