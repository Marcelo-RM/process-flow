'use strict';

window.onload = function () {
    // Create click function to status items
    var listItems = document.querySelectorAll("ul.progressbar li");
    listItems.forEach(item => {
        //Create method for click item
        item.onclick = changeColor;
    });

    //Set info for the first item in panel
    //this.updateInfo(listItems[0]);
}

/**
 * Método usado para alterar cor (classe) quando item for clicado
 * @param {MouseEvent} event 
 */
function changeColor(event) {
    if(event.className !== undefined){
        var className = event.className;
        var listItem = event;
    } else {
        className = event.target.className;
        listItem = event.target;
    }

    //Se a classe conter fas o clique foi no icone
    //É necessário alterar classe parent
    if (className.includes("fas") || className.includes("chart")) {
        listItem = event.target.parentElement;
    }
    removeSelectedClass();
    listItem.className = "selected";
    updateInfo(listItem);
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
    var head = $("#panelHeading")[0];
    var cont = $("#panelContent")[0];

    var arr = getItems();
    head.innerHTML = item.innerText +
        "<span class='badge sap-button' style='margin-left:5px'>"+ arr.filter(
            function(el){
                if(el.status == item.id){
                    return el.status
                }
            }).length +
        "</span>";
    cont.innerHTML = createList(arr, item.id);
}

/**
 * 
 * @param {Array} items array de objetos contendo todos os dados da OV
 * @param {String} status status do item clicado
 * @returns {HtmlObject} list Lista com todos os itens já montado em detalhes
 */
function createList(items, status){
    var list =  "<ul class='list-group'>";
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" +
                    // "<li class='list-group-item'>"+item.innerText+"</li>" ;
        items.forEach(el => {
            if(el.status == status){
                list += createListItem(el, status);//"<li class='list-group-item'>"+el.ov + el.data + el.vendedor+"</li>" ;
            }
        });
    list += "</ul>";
    return list;
}

function createListItem(item, status){
    var listItem;
    var arrStatus = [
        'criado',
        'validacao',
        'separacao',
        'faturado',
        'transito',
        'entregue'
    ];

    var thisStatus = arrStatus[arrStatus.findIndex(function(el){return el == status})];

    if(thisStatus == "criado" || thisStatus == "validacao"){
        listItem = detailForStatusCriado(item);
    }
    if(thisStatus == "separacao"){
        listItem = detailForStatusSeparacao(item);
    }
    if(thisStatus == "faturado"){
        listItem = detailForStatusFaturamento(item);
    }
    if(thisStatus == "transito"){
        listItem = detailForStatusTransito(item);
    }
    if(thisStatus == "entregue"){
        listItem = detailForStatusEntregue(item);
    }

    return listItem;
}

/**
 * Metodo chamado durante clique no botão pesquisar
 * Será substituido por um método c# para consulta ao banco de dados
 * Criar método que chame uma função c# pode ser a melhor solução
 */
function updateChart(){
    var cnpj = $("#cnpj")[0];
    if(!_cnpj(cnpj.value)){
        cnpj.style.border = '1px solid red';
        toast("error");
        return;
    }
    else {
        cnpj.style.border = '1px solid #ccc';
    }
    var listItems = document.querySelectorAll("ul.progressbar li");
    var items = getItems();

    var qtdRecusado = 0, qtdCriado = 0, qtdValidacao = 0, qtdSeparacao = 0,
        qtdFaturado = 0, qtdTransito = 0, qtdEntregue = 0;
    //Loop para popular valores referentes aos dados do grafico
    items.forEach(function(el){
        if(el.status == "criado" && el.sts == "recusado"){
            qtdRecusado += 1;
        }
        if(el.status == "criado"){
            qtdCriado += 1;
        }
        if(el.status == "validacao"){
            qtdCriado += 1;
            qtdValidacao += 1;
        }
        if(el.status == "separacao"){
            qtdCriado += 1;
            qtdValidacao += 1;
            qtdSeparacao += 1;
        }
        if(el.status == "faturado"){
            qtdCriado += 1;
            qtdValidacao += 1;
            qtdSeparacao += 1;
            qtdFaturado += 1;
        }
        if(el.status == "transito"){
            qtdCriado += 1;
            qtdValidacao += 1;
            qtdSeparacao += 1;
            qtdFaturado += 1;
            qtdTransito += 1;
        }
        if(el.status == "entregue"){
            qtdCriado += 1;
            qtdValidacao += 1;
            qtdSeparacao += 1;
            qtdFaturado += 1;
            qtdTransito += 1;
            qtdEntregue += 1;
        }
    });
    //Loop que vai criar os graficos para cada item
    listItems.forEach(function(item){
        var greenSize = 0;
        var graySize = 0;
        var redSize = qtdRecusado;

        if(item.id == "criado"){
            greenSize = qtdCriado;
            graySize = items.length - greenSize;
        }
        if(item.id == "validacao"){
            greenSize = qtdValidacao;
            graySize = items.length - (greenSize + redSize);
            redSize = 0;
        }
        if(item.id == "separacao"){
            greenSize = qtdSeparacao;
            graySize = items.length - (greenSize + redSize);
            redSize = 0;
        }
        if(item.id == "faturado"){
            greenSize = qtdFaturado;
            graySize = items.length - (greenSize + redSize);
            redSize = 0;
        }
        if(item.id == "transito"){
            greenSize = qtdTransito;
            graySize = items.length - (greenSize + redSize);
            redSize = 0;
        }
        if(item.id == "entregue"){
            greenSize = qtdEntregue;
            graySize = items.length - (greenSize + redSize);
            redSize = 0;
        }

        var elem = item.children[0].tagName == "DIV" ? item.children[1] : item.children[0];
        createChart(elem, greenSize, graySize, redSize);
    })
    changeColor(listItems[0]);
}

/**
 * Método usado para criação de gráfico do tipo rosca
 * @param {HtmlObject} elem Objeto html em que ficará o gráfico
 * @param {Number} vl1 Valor exibido no gráfico com a cor verde
 * @param {Number} vl2 Valor exibido no gráfico com a cor cinza
 */
function createChart(elem, valorVerde, valorCinza, valorVermelho) {
    //Verifica se ha valor vermelho
    if(!valorVermelho){valorVermelho = 0}
    //validar se está recebendo elemento para criação do grafico
    var ctx = elem != undefined ? elem.getContext('2d') : "";
    if(ctx == ""){return;}

    //Create Chart
    var chart = new Chart(ctx, {
        type: 'doughnut', //tipo do grafico
        data: {
            datasets: [{
                data: [
                    valorVerde, //Quantidade de itens de cor verde
                    valorCinza, //Quantidade de itens de cor cinza
                    valorVermelho  //Quantidade de itens de cor vermelha
                ],
                backgroundColor: [
                    '#3ada3a', //verde
                    '#aaa', //cinza
                    '#f02929' //Vermelho
                ],
                borderWidth: 0, //tamanho da borda
                weight: 1
            }]
            /*,
            labels: [
                'Completo',
                'Pendente'
            ]*/
        },
        options: {
            cutoutPercentage: 70, //Quanto maior o valor menor a largura do grafico
            responsive: true, //Ajustar automaticamente ao tamanho do elemento pai
            tooltips: {
                enabled: false //Desativa tooltips pois não são necessários
            }
        }
    });
}

function getItems(){
    return [
        {
            material: 'material 001',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'validacao'
        },{
            material: 'material 002',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'validacao'
        },{
            material: 'material 003',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'faturado'
        },{
            material: 'material 004',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'validacao'
        },{
            material: 'material 005',
            sts: 'ativo',
            dataSep: '12/12/2018 12:00:00',
            vendedor: 'Marcelo Montalvão',
            numNFE: 12345,
            dataNFE: '13/12/2018 15:00:00',
            dataMinuta: '15/12/2018 09:30:00',
            dataRecebimento: '15/12/2018 11:30:00',
            status: 'separacao'
        },{
            material: 'material 006',
            sts: 'recusado',
            dataSep: '',
            vendedor: 'Marcelo Montalvão',
            dataMinuta: '',
            dataRecebimento: '',
            numNFE: '',
            dataNFE: '',
            status: 'criado'
        }
    ];
}

//Todas as funções abaixo criam templates html
/**
 * 
 * @param {Object} item objeto contendo dados de um item especifico
 */
function detailForStatusEntregue(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
            "<p class='text-muted'>Número NF-e: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Data aprovação NF-e: "+ item.dataNFE +"</p>" +
        "</div>" +
    "</div>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Saiu p/ Entrega: "+ item.dataMinuta +"</p>" +
            "<p class='text-muted'>Recebimento: "+ item.dataRecebimento +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusTransito(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
            "<p class='text-muted'>Número NF-e: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Data aprovação NF-e: "+ item.dataNFE +"</p>" +
        "</div>" +
    "</div>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Saiu p/ Entrega: "+ item.dataMinuta +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusFaturamento(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
            "<p class='text-muted'>Número NF-e: "+ item.numNFE +"</p>" +
            "<p class='text-muted'>Data aprovação NF-e: "+ item.dataNFE +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusSeparacao(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            //"<p class='text-muted'>Status: "+ item.sts +"</p>" +
            "<p class='text-muted'>Data Separação: "+ item.dataSep +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function detailForStatusCriado(item){
    return "<li class='list-group-item row'>" +
    "<h4 class='mb-1'>"+ item.material +"</h4>" +
    "<div class='col-sm-6 col-lg-6 col-md-6 col-xs-12'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
            "<p class='text-muted'>Status: "+ item.sts +"</p>" +
        "</div>" +
    "</div>" +
    "</li>";
}

function toast(value){
    if(value == "error")
    $.toast({
        heading: 'Error',
        text: 'Cnpj Inválido!',
        icon: 'error',
        loader: true,
        loaderBg: '#fff',
        showHideTransition: 'plain',
        hideAfter: 4000,
        position: {
          left: '40%',
          top: 30
        }
    })
}

/*
 * Método usado para verificar se o cnpj inserido é valido
 */
function _cnpj(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') {
        return false;
    }

    if (cnpj.length != 14) {
        return false;
    }

    if (cnpj == "00000000000000" || cnpj == "11111111111111" ||
        cnpj == "22222222222222" || cnpj == "33333333333333" ||
        cnpj == "44444444444444" || cnpj == "55555555555555" ||
        cnpj == "66666666666666" || cnpj == "77777777777777" ||
        cnpj == "88888888888888" || cnpj == "99999999999999") {
        return false;
    }


    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) { return false; }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        return false;
    }
    return true;
}