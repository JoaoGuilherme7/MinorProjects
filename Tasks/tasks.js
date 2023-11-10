
document.addEventListener('DOMContentLoaded', () => {


    formatForm();
    veryfyInputContent();

    const form = document.querySelector('form');
    form.onsubmit = () => {
        main();
        // Stop form submiting
        return false;
    }

    manipulateCheckedBox();
    manipulateUncheckedBox();


})
function veryfyInputContent() {
    const submitButton = document.querySelector('#submit');
    const inputField = document.querySelector('#task');

    inputField.onkeyup = () => {
        if (inputField.value.length > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
}
function formatForm() {
    const inputField = document.querySelector('#task');
    //CLEAR INPUT FIELD & SET SUBMIT BUTTON DISABLED
    document.querySelector('#task').value = '';
    document.querySelector('#submit').disabled = true;
    inputField.focus();
}
function transformToLi(value) {
    const li = ` <li data-index = ${toDo.indexOf(value)}>
                    <input type="checkbox" name="toDoTask" value="${value}" onchange="manipulateCheckedBox()">
                    <label for="doneTask">${value}</label>
                </li>`;
    return li;
}
function pasteToDoTask(array) {
    document.querySelector('#tasksList').innerHTML = array;
}
function getTask() {
    const task = document.querySelector('#task').value;
    return task;
}
function add_ToArray_(iten, array) {

    array.push(iten);
    return array;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var toDo = [];

// pega a tarefa digitada(getTask), adiciona ao array de tarefas(ddToArray), transforma em uma lista de li's(transformToLi), cola na ul ToDo(pasteToDoTask) e limpa o input.
function main() {
    const task = getTask()
    add_ToArray_(task, toDo);
    let liToDoArray = toDo.map(transformToLi).join('');
    pasteToDoTask(liToDoArray)
    formatForm();
}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var done = [];

// retorna apenas a string da task
function findSelected() {
    let selected = document.querySelector('input[name="toDoTask"]:checked').value;
    return selected;
}
// transforma cada item em uma li com os atributos necessarios
function transformToDoneLi(value) {

    const li = ` <li data-index = ${done.indexOf(value)}>
                    <input type="checkbox" name="doneTask" value="${value}" checked onchange="manipulateUncheckedBox()">
                    <label for="doneTask">${value}</label>
                </li>`;
    return li;
}
// "pega o arrai de li concatenado e publica na ul "Done"
function pasteDoneTask(array) {
    document.querySelector('#doneTasksList').innerHTML = array;
}
// tendo o conteúdo, retorna o indice dele no array passado.
function takeIndex(array,value){
    return array.indexOf(value);
}
// remove o conteudo do indice recebido no array tambem recebido
function deleteIndex_From_(index, array){
    array.splice(index, 1)
}

function manipulateCheckedBox() {

    let doneTask = findSelected();
    let indexToDelete = takeIndex(toDo, doneTask);
    deleteIndex_From_(indexToDelete,toDo);
    // publicar ToDoList atualizada
    let liToDoArray = toDo.map(transformToLi).join('');
    pasteToDoTask(liToDoArray);
    // 
    add_ToArray_(doneTask, done);
    const liDoneArray = done.map(transformToDoneLi).join('');
    // console.log(liDoneArray)
    pasteDoneTask(liDoneArray)
}

// -------------------------------------------------
function findUnselected() {
    let unselected = document.querySelector('input[name="doneTask"]:not(:checked)').value;
    return unselected;
}

function manipulateUncheckedBox() {

    let toDoTask = findUnselected();

    let indexToDelete = takeIndex(done, toDoTask);
    deleteIndex_From_(indexToDelete,done);
    // publicar ToDoList atualizada
    let liDoneArray = done.map(transformToDoneLi).join('');
    pasteDoneTask(liDoneArray);

    add_ToArray_(toDoTask, toDo);
    let liToDoArray = toDo.map(transformToLi).join('');
    pasteToDoTask(liToDoArray)
    // formatForm();
}
