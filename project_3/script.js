/* Variables */
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var listItems = document.querySelectorAll("li");    //Added selector for any line in list

/* Add To List Functions */

function inputLength() {
    return input.value.length;
}

function createListElement() {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    addClickBehavior(li);
    addDblClickBehavior(li);
    li.classList.add("list-item")    //For CSS style
    ul.appendChild(li);
    input.value = "";
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterEnter(event) {
    if (inputLength() > 0 && event.key === "Enter") {
        createListElement();
    }
}

/* Remove From List Functions */

function removeListAfterDblClick(item) {   //"item" refering to the selected li
    item.remove();
}

/* Click and Double Click Functions */
/* Decided to go with a dblclick rather than the "Delete" button, or even a trash icon. */

function addDblClickBehavior(item) {
    item.addEventListener("dblclick", () => {
        removeListAfterDblClick(item);
    });
}

function addClickBehavior(item) {
    item.addEventListener("click", () => {
    if (item.classList.contains("finished")) {   //Chose this rather than the item.className === "list-item finished"
        item.style.textDecoration = "";
        item.classList.remove("finished");   //Decided to go with what I am familar with. I am sure a toggle would have worked...
    } else {
        item.style.textDecoration = "line-through";    //Should have used CSS to style, but I was tired and a little confused.
        item.classList.add("finished");
    }
    });    
}

/* Loop */
/* Controls the selection of items in the list */

listItems.forEach((item) => {
    addClickBehavior(item);
    addDblClickBehavior(item);
});

/* Triggers */

button.addEventListener("click", addListAfterClick)
input.addEventListener("keyup", addListAfterEnter)