var recordatoriosSlecionados = [];

//function deletar lembretes

function deletarRecordatorio() {
    if (recordatoriosSlecionados.length > 0) {
        var recordatorioExistentes = localStorage.getItem("recordatorios");
        if (recordatorioExistentes == null || recordatorioExistentes == "" || typeof recordatorioExistentes == "undefined" || recordatorioExistentes == "undefined") {
            var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);

            for (var i = 0; i < recordatoriosSlecionados.length; i++) {
                for (var j = 0; j < recordatoriosSlecionados.length; j++) {

                    if (recordatoriosSlecionados[i] == recordatoriosRecuperados[j].id) {

                        recordatoriosRecuperados[j].id = -1;

                    }
                }
            }

            var recordatorioTemporario = [];
            for (var i = 0; i < recordatoriosRecuperados.length; i++) {
                if (recordatoriosRecuperados[i].id != -1) {
                    recordatorioTemporario.push(recordatoriosRecuperados[i]);


                }
            }

            //deletar recordatorio

            if (recordatorioTemporario.length == 0) {
                localStorage.setItem("recodatorios", "");
            } else {
                saveRecordatorios(recordatorioTemporario);
            }

            mostrarRecordatorios();
            selecionarRecordatorio();


        }

    }
}



//Comprovar se está funcionando
document.addEventListener('DOMContentLoaded', function () {
    console.log("Funciona!!");

    // mostrarErros();

    document.getElementById("buttomSave").onclick = criarLembrete;
});

//Function para verificar se tem texto
function textoValido(texto) {
    if (texto == null || texto == "" || texto.lenght < 1) {
        return false;
    } else {
        return true;
    }
}

//Function para mostrar erros
function mostrarErros() {
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor, informe alguma coisa';
    html += '</div>';

    document.getElementById('erro').innerHTML = html;
}

//Function para limpar o erro

function limparErros() {
    document.getElementById('erro').innerHTML = "";
}

//Function para criar lembrete

function criarLembrete() {
    var conteudoTextArea = document.getElementById("texto").value;
    if (!textoValido(conteudoTextArea)) {
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
    document.getElementById("texto").value = "";
}

function recordatorioValido(recordatorioExistentes) {
    if (recordatorioExistentes == null || recordatorioExistentes == "" || typeof recordatorioExistentes == "undefined" || recordatorioExistentes == "undefined") {
        return false;
    }
    else {
        return true;
    }
}

//Function para comprovar se existe lembrete
function comprovarRecordatorio(recordatorio) {
    var recordatorioExistentes = localStorage.getItem("recordatorios");
    if (!recordatorioValido(recordatorioExistentes)) {
        var recordatorios = [];
        recordatorios.push(recordatorio);

        //Salvar recordatorio
        saveRecordatorios(recordatorios);
    } else {
        var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);

        //Salva recordatorio
        recordatoriosRecuperados.push(recordatorio);
        saveRecordatorios(recordatoriosRecuperados);
    }
    mostrarRecordatorios();
}

// Função para selecionar recordatorios...
function selecionarRecordatorio() {
    var recordatorios = document.getElementsByClassName("recordatorio");
    for (var i = 0; i < recordatorios.length; i++) {
        document.getElementById(recordatorios[i].id).onclick = function(e){
            e.stopPropagation();
            //Caso tenha recordatorio
            if (recordatoriosSlecionados.indexOf(this.id) == -1) {
                this.style.backgroundColor = "red";
                recordatoriosSlecionados.push(this.id);
            } else {
                //Caso ñ tenha
                this.style.backgroundColor = "#41dff4";
                for (var b = 0; b < recordatoriosSlecionados.length; b++) {
                    if (recordatoriosSlecionados[b] == this.id) {
                        recordatoriosSlecionados[b] = 0;
                    }

                }
            }

            var recordatorioTemporario = [];
            for (var j = 0; j < recordatoriosSlecionados.length; j++) {
                if (recordatoriosSlecionados[j] != 0) {
                    recordatorioTemporario.push(recordatoriosSlecionados[j]);
                }

            }

            recordatoriosSlecionados = recordatorioTemporario;

        };
    }
}


//Function para salvar lembrete ou recordatorioo
function saveRecordatorios(recordatorios) {
    var recordatoriosJSON = JSON.stringify(recordatorios);
    localStorage.setItem("recordatorios", recordatoriosJSON);
}

//Function para exibir os itens
function mostrarRecordatorios() {
    var html = "";

    var recordatorioExistentes = localStorage.getItem("recordatorios");
    if (!recordatorioValido(recordatorioExistentes)) {
        html = "Não existe nenhum lembrete";
        document.getElementById("recordatorios").innerHTML = html;
    }
    else {
        recordatoriosRecuperados = JSON.parse(recordatorioExistentes);
        for (var i = 0; i < recordatoriosRecuperados.length; i++) {
            html += formatarRecordatorio(recordatoriosRecuperados[i]);
        }
        document.getElementById("recordatorios").innerHTML = html;
    }
}

//Função para exibir os lembretes
function formatarRecordatorio(recordatorio) {
    var html = "";
    html += '<div class="recordatorio" id="' + recordatorio.id + '">';
    html += '<div class="row">';
    html += '<div class="col-6 text-left">';
    html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + recordatorio.data + '</small>';
    html += '</div>';
    html += '<div class="col-6 text-right">';
    html += '<small><i class="fa fa-window-close" aria-hidden="true"></i></small>';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '<div class="row">';
    html += '<div class="col-12">';
    html += recordatorio.texto;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<br>';

    return html;
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("Funciona!!");

    // mostrarErros();

    document.getElementById("buttomSave").onclick = criarLembrete;
    document.getElementById("buttomDelete").onclick = deletarRecordatorio;
    mostrarRecordatorios();
    selecionarRecordatorio();
});
