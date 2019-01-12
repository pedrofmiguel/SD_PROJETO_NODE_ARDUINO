


function ardfetch() {
    async function fetchAsync() {
        const renderSelect = document.getElementById("result");
        let txt = "";
        const response = await fetch('https://parque-de-estacionamento-cdaves.c9users.io/estacionamento');
        const estacionamentos = await response.json();
        //criação de uma tabela para demonstração dos resultados recebidos
        txt += "<select name='slct' id='slc_parque' onchange='ard()'>"
        txt += "<thead style='background-color:#607d8b; color:white '>";
        txt += "<tr><th>Name</th><th>Email</th><th>Reg. Date</th></tr></thead><tbody>";
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        for (const estacionamento of estacionamentos) {
            txt += "<option value='" + estacionamento.arduino + "'" + ">" + estacionamento.name + "</option>"
        }
        txt += "</select>";
        //envia a tabela construida para a view e mostra no object com ID result
        renderSelect.innerHTML = txt;
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("Fetching...")).catch(reason => console.log(reason.message));
}

