window.onload = function() {
    // Create click function to status items
    var listItems = document.querySelectorAll("ul.progressbar li");
    listItems.forEach(item => {
        item.onclick = changeColor;
    });

    //Set info for the first item in panel
    this.updateInfo(listItems[0]);
}

/**
 * Método usado para alterar cor (classe) quando item for clicado
 * @param {MouseEvent} event 
 */
function changeColor(event){
    var className = event.target.className;
    var listItem = event.target;

    //Se a classe conter fas o clique foi no icone
    //É necessário alterar classe parent
    if(className.includes("fas")){
        listItem = event.target.parentElement;
    }
    if (className != "selected"){
        removeSelectedClass();
        listItem.className = "selected";
        updateInfo(listItem);
    }
}

/**
 * Método que remove a classe de todos os itens de status
 */
function removeSelectedClass(){
    var status = document.querySelectorAll("ul.progressbar li");
    status.forEach(item => {
        item.className = "";
    });
}

/**
 * Altera o conteúdo da panel de informação
 * @param {HtmlObject} item Status clicado
 */
function updateInfo(item){
    var head = document.getElementById("panelHeading");
    var cont = document.getElementById("panelContent");

    head.innerHTML = item.innerText + 
                     " <span class='badge sap-button'>5</span>";
    //cont.innerText = "Exibindo conteudo referente ao " + item.innerText;
}