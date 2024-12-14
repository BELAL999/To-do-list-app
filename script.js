// making an array of the taks and genrate the html 

let tasks = JSON.parse(localStorage.getItem('localTasks')) || [];
let addTasks = document.querySelector('.addedTasks');
const input = document.querySelector('.js-input');
const addButton = document.querySelector('.js-add-button');


addButton.addEventListener(('click'),()=>{
    let inputValue = input.value;
    if(inputValue){
        tasks.push({name :inputValue , status : 'unchecked'})
        addToLocal(tasks,'localTasks')
        updateTheTasks ()
    }
})
function updateTheTasks (){
    let Html= ''
    tasks.forEach((task)=>{
        Html+= 
        `
        <div class='task__note'>
            <div class='box'>
                <div class='info'>
                    <div class="task ${task.status}" data-name='${task.name}'>
                        <div class='open' data-name='${task.name}' >
                            <img src="images/${task.status?task.status:"unchecked"}.png">
                        </div>
                        <p>${task.name}</p>
                    </div>
                    <span class="material-symbols-outlined js-note-button" data-name='${task.name}'>
                        note_alt
                    </span>
                </div>    
                <div class='close' data-name ='${task.name}'>
                    <img src="images/—Pngtree—icon close button_4401093.png">
                </div>
                </div>
            <div class='note__bad'>
                    <textarea id="story" name="story" rows="5" cols="33" style="display: none;" data-name='${task.name}'>Add your Note</textarea>
            </div>
        </div>    
        `
    })
    // get the added tasks and change it 
    addTasks.innerHTML = Html;
    checkTask()
    dealingWithDelate()
    displayTheNote()
    saveWhatsInsideTextArea() 


}

function checkTask(){
    let task = document.querySelectorAll('.task') // it still the same i want it to updated 
    console.log(task)
    task.forEach((item)=>{
        item.addEventListener(('click'),(e)=>{
            let nam = e.currentTarget.dataset.name;
            mathchingItem (nam)
            addToLocal(tasks,'localTasks')
            updateTheTasks()
        })
    })
}

function mathchingItem (nam){
    tasks.forEach((item)=>{
        if (nam===item.name){
            if (item.status==='unchecked'){
                item.status = 'checked'
            }
            else{
                item.status = 'unchecked'
            }
        } 
    })
}
function dealingWithDelate(){
    let close = document.querySelectorAll('.close');
    console.log(close)
    close.forEach((x)=>{
        x.addEventListener(('click'),(e)=>{
            let nam = e.currentTarget.dataset.name
            function mathchingItem (){
                tasks.forEach((item)=>{
                    if (nam===item.name){
                        let index = tasks.indexOf(item)
                        tasks.splice(index,1)
                        addToLocal(tasks,'localTasks')
                    } 
                })
            }
            mathchingItem ()
            updateTheTasks()
        })
    })
}
function addToLocal(theThingYouWannaSaveInLocalStorage,TheNameYouWannaSaveItInLocal){
    const local = JSON.stringify(theThingYouWannaSaveInLocalStorage)
    localStorage.setItem(TheNameYouWannaSaveItInLocal,local)
}

function displayTheNote() {

    let note_buts = document.querySelectorAll('.js-note-button');
    let note_bads = document.querySelectorAll('.note__bad textarea');

    // Load saved content for all notes when the page loads
    window.onload = function () {
        note_bads.forEach((note) => {
            let savedText = localStorage.getItem(`savedText${note.dataset.name}`);
            if (savedText) {
                note.value = savedText;
            }
        });
    };

    // Add click event listeners to each button to toggle the corresponding note
    note_buts.forEach((but) => {
        but.addEventListener('click', (e) => {
            const currentAdd = e.currentTarget.dataset.name;
            console.log(currentAdd);
            
            note_bads.forEach((note) => {
                if (currentAdd === note.dataset.name) {
                    // Toggle display of the note
                    note.style.display = note.style.display === 'none' ? 'block' : 'none';
                    
                    // Only add the input listener once per note
                    if (!note.hasAttribute('data-listener-added')) {
                        note.addEventListener('input', () => {
                            let written = note.value;
                            console.log(written);
                            localStorage.setItem(`savedText${note.dataset.name}`, written);
                        });
                        note.setAttribute('data-listener-added', 'true'); // Mark listener as added
                    }
                } else {
                    // Hide all other notes
                    note.style.display = 'none';
                }
            });
        });
    });

}



function saveWhatsInsideTextArea() {
    let note_bads = document.querySelectorAll('.note__bad textarea');
        note_bads.forEach((note) => {
            let savedText = localStorage.getItem(`savedText${note.dataset.name}`);
            if (savedText) {
                note.value = savedText;
            }
            
        });
}

updateTheTasks ()



