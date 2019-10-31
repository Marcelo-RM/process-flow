window.onload = function () {
    // Create click function to status items
    var listItems = document.querySelectorAll("ul.progressbar li");
    listItems.forEach(item => {
        //Create method for click item
        item.onclick = changeColor;

        //Change this; Creating charts for items
        var size1 = Math.floor(Math.random() * 10);
        var size2 = Math.floor(Math.random() * 10);
        var elem = item.children[0];
        this.createChart(elem, size1, size2);
    });

    //Set info for the first item in panel
    this.updateInfo(listItems[0]);

    //CREATE CHART
    this.createChart();
}

/**
 * Método usado para alterar cor (classe) quando item for clicado
 * @param {MouseEvent} event 
 */
function changeColor(event) {
    var className = event.target.className;
    var listItem = event.target;

    //Se a classe conter fas o clique foi no icone
    //É necessário alterar classe parent
    if (className.includes("fas") || className.includes("chart")) {
        listItem = event.target.parentElement;
    }
    if (className != "selected") {
        removeSelectedClass();
        listItem.className = "selected";
        updateInfo(listItem);
    }
}

/**
 * Método que remove a classe de todos os itens de status
 */
function removeSelectedClass() {
    var status = document.querySelectorAll("ul.progressbar li");
    status.forEach(item => {
        item.className = "";
    });
}

/**
 * Altera o conteúdo da panel de informação
 * @param {HtmlObject} item Status clicado
 */
function updateInfo(item) {
    var head = document.getElementById("panelHeading");
    var cont = document.getElementById("panelContent");

    head.innerHTML = item.innerText +
        " <span class='badge sap-button'>5</span>";
    //cont.innerText = "Exibindo conteudo referente ao " + item.innerText;
}

function createChart(elem, vl1, vl2) {
    //var ctx = document.getElementById('myChart').getContext('2d');
    var ctx = elem.getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    vl1,
                    vl2
                ],
                backgroundColor: [
                    '#07e30a',
                    '#aaa',
                ],
                borderWidth: 0,
                weight: 1
            }]
            /*,
            labels: [
                'Completo',
                'Pendente'
            ]*/
        },
        options: {
            cutoutPercentage: 70,
            responsive: false,
            tooltips: {
                enabled: false
            }
        }
    });
}