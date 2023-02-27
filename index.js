let input = document.querySelector(".input");
let btnTask = document.querySelector(".btnTask");
let tasks = document.querySelector(".tasks");

function criali(){
    const li = document.createElement('li')
    return li;
}


function bttRem(li){
    li.innerHTML += ' ';
    const bttRemove = document.createElement('button');
    bttRemove.innerText = 'Delete';
    bttRemove.setAttribute('class', 'delete');
    bttRemove.setAttribute('title', 'Deletar task');
    li.appendChild(bttRemove);
}

function clearInput(){
    input.value = '';
    input.focus();
}
function addSaveTasks(){
    let tasks = localStorage.getItem('tasks');
    let taskList = JSON.parse(tasks);

    for(let task of taskList){
        criaTarefa(task);
    }
}

function criaTarefa(input){
    const li = criali();
    li.innerHTML = input;
    tasks.appendChild(li);
    clearInput();
    bttRem(li);
    saveTask();
};

function saveTask(){
    let liTasks = tasks.querySelectorAll('li');
    let taskList = [];
    
    for (let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        taskList.push(taskText)
    }
    let taskJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJSON);
}

input.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(input.value !== ''){
        criaTarefa(input.value);
        clearInput();
        }
    }
});

document.addEventListener('click',function(e) {
    const el = e.target;

    if(el.classList.contains('btnTask') && input.value !== ''){
        criaTarefa(input.value)   
    }

    if(el.classList.contains('delete')){
        el.parentElement.remove();
        saveTask();
    }
});
addSaveTasks();
