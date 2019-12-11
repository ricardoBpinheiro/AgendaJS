var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form")
    .addEventListener("submit", function (e) {

            var task = document.getElementById('task').value;
            var descricao = document.getElementById('descrição').value; 
            e.preventDefault();
            createTask(task, descricao);
            form.reset();
         
    });

function createTask(taskName, descricao){
        counter+=1;
        var task = {
            id:counter,
            task: taskName,
            descricao: descricao
        }
        let db= firebase.database().ref("tasks/"+counter);
        db.set(task);
        document.getElementById("cardSection").innerHTML='';
        readTask();
        
    }

function readTask(){
    var task= firebase.database().ref("tasks/");
    task.on("child_added",function(data){
        var taskValue= data.val();

        document.getElementById("cardSection").innerHTML+=`
        <div class="card mb-4">
            <div class="card-body">
                
                <strong>Titulo</strong>

                <p class="card-text">${taskValue.task}</p>

                <strong>Descrição</strong>

                <p class="card-text">${taskValue.descricao}</p>

                <button type="submit" style="color:white" class="btn btn-warning"
                onclick="updateTask(${taskValue.id}, '${taskValue.task}', '${taskValue.descricao}')">Editar</button>

                <button type="submit" class="btn btn-danger"
                onclick="deleteTask(${taskValue.id})">Deletar</button>

            </div>
        </div>
    
    `
        
    });
}

function reset(){
    document.getElementById("firstSection").innerHTML=`

    <form class="border p-4 mb-4 " id="form">

    <div class="form-group">
       <label> Titulo</label>
       <input type="text" class="form-control" id="task" placeholder="Titulo">
    </div>


    <div class="form-group">
        <label> Descrição</label>
        <input type="text" class="form-control" id="descrição"
        placeholder="descrição">
    </div>

    <button type="submit" id="button1" class="btn btn-primary"> Add lembrete</button>
    <button style="display: none" id="button2" class="btn btn-success"> Atualizar</button>
    <button style="display: none" id="button3" class="btn btn-danger"> Cancelar</button>

</form>

    `;

    document.getElementById("form").addEventListener("submit", function (e) {
            var task = document.getElementById("task").value;
            var descricao = document.getElementById("descrição").value; 
            e.preventDefault();
            createTask(task, descricao);
            form.reset();
         
    });
}

function updateTask(id,name,descricao){
    
    document.getElementById("firstSection").innerHTML=`

    <form class="border p-4 mb-4 " id="form2">

    <div class="form-group">
       <label> Titulo</label>
       <input type="text" class="form-control" id="task" placeholder="Titulo">
    </div>


    <div class="form-group">
        <label> Descrição</label>
        <input type="text" class="form-control" id="descrição"
        placeholder="Descrição">
    </div>

    <button style="display: none" id="button1" class="btn btn-primary"> Add lembrete</button>
    <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"> Atualizar</button>
    <button style="display: inline-block" id="button3" class="btn btn-danger"> Cancelar</button>

    </form>
    
    `;

    document.getElementById("form2").addEventListener("submit",(e)=>{
        e.preventDefault();
    });

    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
    });

    document.getElementById("button2").addEventListener("click",(e)=>{
        updateTask2(id, document.getElementById("task").value, document.getElementById("descrição").value);
    });

    document.getElementById("task").value=name;
    document.getElementById("descrição").value=descricao;
    
}

function updateTask2(id,name,descricao){
    var taskUpdated={
        task:name,
        id:id,
        descricao:descricao
    } 
    let db= firebase.database().ref("tasks/"+id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
}

function deleteTask(id){
    var task= firebase.database().ref("tasks/"+id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
}

        