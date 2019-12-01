//Comprovar se está funcionando
document.addEventListener('DOMContentLoaded', function(){
    console.log("Funciona!!");

    // mostrarErros();

    document.getElementById("buttonSave").onclick = criarLembrete;
});

//Function para verificar se tem texto
function textoValido(texto){
    if(texto == null || texto == "" || texto.lenght < 1 ){
        return false;
    }else{
        return true;
    }
}

//Function para mostrar erros
function mostrarErros(){
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor, informe alguma coisa';
    html += '</div>';     

    document.getElementById('erro').innerHTML = html;
}

//Function para limpar o erro

function limparErros(){
    document.getElementById('erro').innerHTML = "";
}

//Function para criar lembrete

function criarLembrete(){
    var conteudoTextArea = document.getElementById("texto").value;
    if(!textoValido(conteudoTextArea)){
        mostrarErros();
        return;
    }
    limparErros();

    //Criar as variaveis para tempo
    var referencia = new Date();
    var id = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto = conteudoTextArea;

    //JSON = js objetos

    var recordatorio = {
                        "id": id,
                        "data": data,
                        "texto": texto
                        };

    //Function para comprovar se existe lembrete
    comprovarRecordatorio(recordatorio);
}

function recordatorioValido(recordatorioExistentes){
    if(recordatorioExistentes == null || recordatorioExistentes == "" || typeof recordatorioExistentes == "undefined" || recordatorioExistentes == "undefined"){
        return false;
    }
    else{
        return true;
    }
}

//Function para comprovar se existe lembrete
function comprovarRecordatorio(recordatorio){
    var recordatorioExistentes = localStorage.getItem("recordatorios");
    if(!recordatorioValido(recordatorioExistentes)){
        var recordatorios = [];
        recordatorios.push(recordatorio);

        //Salvar recordatorio
        saveRecordatorios(recordatorios);
    }else{
        var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);

        //Salva recordatorio
        recordatoriosRecuperados.push(recordatorio);
        saveRecordatorios(recordatoriosRecuperados);
    }
    mostrarRecordatorios();
}

//Function para salvar lembrete ou recordatorioo
function saveRecordatorios(recordatorios){
    var recordatoriosJSON = JSON.stringify(recordatorios);
    localStorage.setItem("recordatorios", recordatoriosJSON);
    console.log("DEU BOA O SAVE");
}

//Function para exibir os itens
function mostrarRecordatorios(){
    var html = "";

    var recordatorioExistentes = localStorage.getItem("recordatorios");
    if(!recordatorioValido(recordatorioExistentes)){
        html = "Não existe nenhum lembrete";
        document.getElementById("recordatorios").innerHTML = html;
        console.log("DEU BOA NAO TER NADA DE LEMBRETE");
    }
    else{
        var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);
        for(var i = 0; i < recordatoriosRecuperados.length; i++){
            html += formatarRecordatorio(recordatoriosRecuperados[i]);
            console.log("DEU BOA PERCORRER OS LEMBRETES");
        }
        document.getElementById("recordatorios").innerHTML = html;
        console.log("DEU BOA TER ALGO DE LEMBRETE");
    }
}

//Função para exibir os lembretes
function formatarRecordatorio(recordatorio){
    var html = "";
    html += '<div class="recordatorio" id="'+ recordatorio.id + '">';
    html += '<div class="row">';
    html += '<div class="col-6 text-left">';
    html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + recordatorio.data + '</small>';
    html += '</div>';
    html += '<div class="col-6 text-right">';
    html += '<small><i class="fa fa-window-close" aria-hidden="true"></i></small>';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '</div class="row">';
    html += '</div class="col-12">';
    html += recordatorio.texto;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<br>';

    return html;
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("Funciona!!");

    // mostrarErros();

    document.getElementById("buttonSave").onclick = criarLembrete;
    mostrarRecordatorios();
});
