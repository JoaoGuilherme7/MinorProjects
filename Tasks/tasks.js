
document.addEventListener('DOMContentLoaded', () => {


    formatForm();
    veryfyInputContent();

    const form = document.querySelector('form');
    form.onsubmit = () => {
        main();
        // Stop form submiting
        return false;
    }

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
    const li = ` <li>
                    ${value}">${value}
                </li>`;
    return li;
}
function pasteTask(array) {
    document.querySelector('#tasksList').innerHTML = array;
}
function getTask() {
    const task = document.querySelector('#task').value;
    return task;
}
function addToTasksArray(iten, array) {

    array.push(iten);
    return array;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
let toDo = [];

function main() {

    const task = getTask()
    addToTasksArray(task, toDo);
    let liArray = toDo.map(transformToLi).join('');

    // console.log(liArray);

    pasteTask(liArray)
    formatForm();

}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::