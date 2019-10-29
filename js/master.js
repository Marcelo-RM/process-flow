window.onload = function() {
    // Create click function to status items
    var listItems = document.querySelectorAll("ul.progressbar li");
    listItems.forEach(item => {
        item.onclick = changeColor;
    });

    //Set info for the first item in panel
    this.updateInfo(listItems[0]);
}

function changeColor(event){
    var className = event.target.className;
    if (className != "selected"){
        removeSelectedClass();
        event.target.className = "selected";
        updateInfo(event.target);
    }
}

function removeSelectedClass(){
    var status = document.querySelectorAll("ul.progressbar li");
    status.forEach(item => {
        item.className = "";
    });
}

function updateInfo(item){
    var head = document.getElementById("panelHeading");
    var cont = document.getElementById("panelContent");

    head.innerText = item.innerText;
    cont.innerText = "Exibindo conteudo referente ao " + item.innerText;
}