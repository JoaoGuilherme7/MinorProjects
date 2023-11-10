document.addEventListener('DOMContentLoaded', () => {

    //By default submit button is disabled
    document.querySelector('#submit').disabled = true;
    document.querySelector('#task').onkeyup = () => {
        if(document.querySelector('#task').value.length > 0){
            document.querySelector('#submit').disabled = false;
        }else{
            document.querySelector('#submit').disabled = true;
        } 
    }

    const form = document.querySelector('form')
    form.onsubmit = () => {
        const task = document.querySelector('#task').value;
        const li = document.createElement('li');
        li.innerHTML = task;

        document.querySelector('#tasksList').append(li);
        document.querySelector('#task').value = '';
        document.querySelector('#submit').disabled = true;




        // Stop form submiting
        return false;
    }
})