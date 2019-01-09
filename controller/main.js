/* função main */
/* 
-Ordenar o arduino a começar a registar dados 
-parar o arduino 
-apagar records 
-consultar records 
*/
//xhr-> XMLHttpRequest 
// --  Função para Escondero btão de HTML -- 

//document.getElementById("stopButton").style.display = "none";





function xhrSuccess() {
    this.callback.apply(this, this.arguments);
}

function xhrError() {
    console.error(this.statusText);
}


//url vai ser o do localhost 
//value 1 pra começar 0 para parar
//callback secalhar não é preciso 
/**
 * É o url da rota 
 * @param {*} url 
 * Value é decidido pelo butão Start- 1 Stop-0
 * @param {*} value 
 * Callback é o alerta
 * @param {*} callback
 * ident vai ser o valor passado pelo select do input  
 * @param {*} ident
 */
function order(url, action, callback, ident) {
    console.log("URL:" + url)
    console.log("Action:" + action)
    console.log("Callback:" + callback)
    console.log("Parque:" + ident)

    // console.log(arguments)
    /* 
     data é o obj que vais ser enviado para a bd 
    */
    var data = {};
    data.action = action;
    data.ident = ident;
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.arguments = Array.prototype.slice.call(arguments, 2);
    xhr.onload = xhrSuccess;
    xhr.onerror = xhrError;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
}

/* funções secundárias*/
/*
Função envia dois dados para o controller 
se o value da função for 1 ele assume que está "ligado"
se o value da função for 0 ele assume que está "desligado"

*/


function ard() {
    var action = document.getElementById('slc_value').value
    var ident = document.getElementById('slc_parque').value;
    order('http://localhost:3000/configs/', action, alertStop, ident)
    // document.getElementById("startButton").style.display = "inline";
    // document.getElementById("stopButton").style.display = "none";
}



function alertStart() {
    alert(JSON.parse(this.responseText).message);
}

function alertStop() {
    alert(JSON.parse(this.responseText).message);
}