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







// function displayTheNote (){
//     let note_buts = document.querySelectorAll('.js-note-button')
//     let note_bads = document.querySelectorAll('.note__bad textarea')
//     note_buts.forEach((but)=>{
//         but.addEventListener(('click'),(e)=>{
//             // this to make the note appear and disappear 
//             const currentAdd = e.currentTarget.dataset.name
//             console.log(currentAdd)
//             note_bads.forEach((note)=>{
//                 console.log(note)
                
//                 if (currentAdd === note.dataset.name && note.style.display === 'none'){
//                     note.style.display = 'block';
//                     note.addEventListener("input", () => {
//                         let written = note.value;
//                         console.log(written);
//                         localStorage.setItem(`savedText${note.dataset.name}`, written);
                        
//                     });
//                     window.onload = function () {
//                         let savedText = localStorage.getItem(`savedText${note.dataset.name}`);
//                         if (savedText) {
//                         note.value = savedText;
//                         }
//                     }


//                 }
//                 else {
//                     note.style.display = 'none'
//                 }


//             })
            
//             // saveWhatsInsideTextArea()
//         })
//     })
// }
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

// saveWhatsInsideTextArea() 



// 2- i wanna make the note bad interactive almost done 
// 3- i wanna add a progress thing 
// 5 - i wanna do like a group of tasks


// const filter_list= [1,2,'a','b']

// arr=filter_list.filter((el)=>{
//     return typeof el === "number" 
// })

// console.log(arr)

// function highAndLow(numbers){
//     return [Math.max(...numbers.split(' ')) , Math.min(...numbers.split(' '))]
// }



// console.log(highAndLow("1 3 5 7 -15"))

// const b = ("1 3 5 7") ;

// console.log(b.split(' '));



// const splitArry = b.split(' ')

// console.log(splitArry)

// console.log(...splitArry)

// console.log(Math.min(...splitArry))



/*
    Some numbers have funny properties. For example:

    89 --> 8¹ + 9² = 89 * 1
    695 --> 6² + 9³ + 5⁴= 1390 = 695 * 2
    46288 --> 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51
    Given two positive integers n and p, we want to find a positive integer k, if it exists, such that the sum of the digits of n raised to consecutive powers starting from p is equal to k * n.

    In other words, writing the consecutive digits of n as a, b, c, d ..., is there an integer k such that :

    If it is the case we will return k, if not return -1.

    Note: n and p will always be strictly positive integers.

*/

function digPow(n,p) {
    let y = n.toString().split('');  // Corrected to toString()
    console.log(y)
    let sum = 0;
    y.forEach((ele)=>{
        sum+= ele ** p
        p++
    })
    if (sum % n === 0){
        return sum / n
    } else {
        return -1
    }
}


// another solution 

/*

    function digPow(n, p) {
        var x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
        return x % n ? -1 : x / n
    }

*/


/*
    reduce(callbackFn)
    reduce(callbackFn, initialValue)

callbackFn


A function to execute for each element in the array. Its return value becomes the value of the accumulator parameter on the next invocation of callbackFn. For the last invocation, the return value becomes the return value of reduce(). The function is called with the following arguments:

accumulator
The value resulting from the previous call to callbackFn. On the first call, its value is initialValue if the latter is specified; otherwise its value is array[0].

currentValue
The value of the current element. On the first call, its value is array[0] if initialValue is specified; otherwise its value is array[1].

currentIndex
The index position of currentValue in the array. On the first call, its value is 0 if initialValue is specified, otherwise 1.

array
The array reduce() was called upon.

initialValue Optional
A value to which accumulator is initialized the first time the callback is called. If initialValue is specified, callbackFn starts executing with the first value in the array as currentValue. If initialValue is not specified, accumulator is initialized to the first value in the array, and callbackFn starts executing with the second value in the array as currentValue. In this case, if the array is empty (so that there's no first value to return as accumulator), an error is thrown.
*/ 

let x = [5 , 3 , 2 ]

x.reduce((s,d,i)=>{
    s +  d
},0)


// he need a function that return the sum of leateset tow numbers

// this my approach 

function sumTwoSmallestNumbers(numbers){
    let min =  Math.min(...numbers)

    let arr = [];
    
    numbers.forEach((ele)=>{
        if(ele > min){
            arr.push(ele)
        }
        
    })
    console.log(arr)

    let min2 = Math.min(...arr)

    return min + min2

} 

console.log(sumTwoSmallestNumbers([ 593, 94, 79, 239 ]

))

// and after doing a reasherch i've found more efficient methods 

// like = > To memorize this, remember that (a, b) => a - b sorts numbers in ascending order.

/*
    function sumTwoSmallestNumbers(numbers) {  
    // Sort the array in ascending order
    let sortedNumbers = numbers.sort((a, b) => a - b);
    
    // Return the sum of the first two elements
    return sortedNumbers[0] + sortedNumbers[1];
}

*/

let n = [ 593, 94, 79, 239 ]
console.log(n)
n.splice(2,1)
console.log(n)

console.log(n.sort((a,b)=> b - a))


// we will crate a function that genrate a random phone number 

function randomPhoneNumberGenerator(number) {

    
    let phoneNumber = [[],[],[]]
    function genrateRandomNumber (numbers,index){
        let RNI = Math.floor(Math.random() * numbers.length)  // this will give you a random number 0-9
        let RN = numbers[RNI]
        numbers.splice(RNI,1)
        console.log(`the lenght of the list ${numbers.length} `)
        phoneNumber[index].push(RN) 
    }
    while(number.length > 7){
        genrateRandomNumber(number,0)
    }
    while(number.length > 4){
        genrateRandomNumber(number,1)
    }
    while(number.length > 0){
        genrateRandomNumber(number,2)
    }
    return `(${phoneNumber[0].join('')}) ${phoneNumber[1].join('')} - ${phoneNumber[2].join('')}`
}

console.log(randomPhoneNumberGenerator([0,1,2,3,4,5,6,7,8,9]))


// this is a nicer way 

/*
    function createPhoneNumber(numbers) {
    // Shuffle the array
    numbers.sort(() => Math.random() - 0.5);
    
    // Format the first 10 shuffled numbers as a phone number
    let [areaCode, prefix, lineNumber] = [
        numbers.slice(0, 3).join(''),   // First 3 digits
        numbers.slice(3, 6).join(''),   // Next 3 digits
        numbers.slice(6, 10).join('')   // Last 4 digits
    ];
    
    return `(${areaCode}) ${prefix}-${lineNumber}`;
}

Explanation of numbers.sort(() => Math.random() - 0.5);
Math.random() generates a random floating-point number between 0 and 1.
Subtracting 0.5 (Math.random() - 0.5) gives a range between -0.5 and 0.5.
If the result is negative, the two elements being compared will be sorted one way.
If the result is positive, they will be sorted the other way.
sort() uses this result to decide if one element should go before or after another, effectively shuffling the array.

*/ 

let numbersN =  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

numbersN.sort(()=> Math.random() - 0.5)

console.log(numbersN)
console.log(Math.random() - 0.5)

console.log(numbersN.slice(0,4).join(''))


function equivelent (numbers) {
    let revNumber =  numbers.sort(()=> -1)
    let sum = revNumber.reduce((s,d,i)=>{
        return s + (d ? Math.pow(2, i) : 0);
    },0)
    return sum
}


console.log(equivelent([1, 0, 1, 1]))