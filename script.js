"use strict";
// Please don't delete the 'use strict' line above

// Assign each elements inside of HTML <body> tag to variables
const header = document.getElementById("header");
const button = document.getElementById("button");
const contentHeader = document.getElementById("content-header");
const content = document.getElementById("content");

//== header ==//
const h1 = document.createElement("h1");
h1.innerText = "Nobel Prize Winnners";
header.appendChild(h1);

// == button ==//
// A function that creates button for each category
// Append it to <div id="button">
const categories = [
  "physics",
  "chemistry",
  "medicine",
  "peace",
  "economics",
  "literature",
];
function createButton(array) {
  array.map(function (category) {
    let newButton = document.createElement("button");
    newButton.setAttribute("id", category);
    newButton.innerText = category;
    button.appendChild(newButton);
  });
}
createButton(categories);

//See what does "button" tag have
const test2 = document.getElementsByTagName("button");
console.log(test2);
//It has HTML Collection(6)

// Make each buttons have eventListener
// When it's clicked, it's gonna invoke another function
// that takes each button's id as a parameter.
const buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => displayWinnersByCategory(buttons[i].id));
}

content.classList.add('hide');
//== content header & content ==//
// A function that cleares <div id="content"> <div id="contentHeader">
function clearResults() {
  contentHeader.innerHTML = "";
  content.innerHTML = "";
}

// A function that displays winners by category
function displayWinnersByCategory(categoryName) {
  clearResults();
  
  content.classList.remove('hide');

  let h2 = document.createElement("h2");
  h2.innerText = `Nobel Laureate in ${categoryName}`;
  contentHeader.appendChild(h2);
  
  // Create a drop down list
  let select = document.createElement("select");
  select.id = "year-picker";
  // when it's changed, invoke toggleYearFilter
  select.addEventListener("change", (e) => toggleYearFilter(e.target.value));
  let option = document.createElement("option");
  option.value = "all";
  option.text = "All";
  select.appendChild(option);

  contentHeader.appendChild(select);

  //Loop array of novels.prizes
  for (let i = 0; i < nobels.prizes.length; i++) {
    //If category matches categoryName(a variable passed by button's id)
    //append it to <div id="content">

    if (nobels.prizes[i].category === categoryName) {

      //== Year ==//
      // create <div> with class attributes & custom attribute
      // year-div is div of year and 
      let yearDiv = document.createElement("div");
      yearDiv.setAttribute("class", "year-div");
      yearDiv.setAttribute("data-year", nobels.prizes[i].year);
      let h3 = document.createElement("h3");
      h3.setAttribute("class", "year");
      h3.innerText = `${nobels.prizes[i].year}`;
      yearDiv.appendChild(h3);  

      //Settings for drop down list
      let select = document.getElementById("year-picker");
      let option = document.createElement("option");
      option.value = nobels.prizes[i].year;
      option.text = nobels.prizes[i].year;
      select.appendChild(option);

      //Loop laureates and append them to <div id="content">
      for (let j = 0; j < nobels.prizes[i].laureates.length; j++) {
        let h5 = document.createElement("h5");
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        li.innerText = `${nobels.prizes[i].laureates[j].firstname} ${nobels.prizes[i].laureates[j].surname}`;
        yearDiv.appendChild(h5);
        yearDiv.appendChild(ul);
        yearDiv.appendChild(li);
      }

      content.appendChild(yearDiv);
    }
  }
}

// adds and removes "hide" css class, which "display none" to hide
function toggleYearFilter(year) {
  if(year != "all"){
    // all div without data-year attribue equal year
    let list = document.querySelectorAll(`div[data-year]:not([data-year="${year}"])`);
    for (let i = 0; i < list.length; ++i) {
      list[i].classList.add('hide');
    }

    // remove hide on year to show
    let show = document.querySelector(`div[data-year="${year}"]`);
    show.classList.remove('hide');

  } else {
    // if all show all, remove all hide
    const list = document.querySelectorAll(`div[data-year]`);
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.remove('hide');
    }
  }
}

