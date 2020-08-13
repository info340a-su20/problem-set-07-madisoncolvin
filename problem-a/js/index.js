'use strict';

/* Madison Colvin - follow allong with lecture video */
/* your code goes here! */

class Task {

  constructor(newDescription, newIsComplete){
    this.description = newDescription;
    this.complete = newIsComplete;
  }

  render(){
    let elem = document.createElement('li')
    elem.textContent = this.description;
    if(this.complete){
      elem.classList.add('font-strike');
    }
    console.log("before call back is defined, ", this)
    elem.addEventListener('click', () => {
      console.log("you clicked me");
      console.log("inside the callback", this);
      this.toggleFinished(); // call function on myself
      elem.classList.toggle('font-strike');
    })
    return elem
  }


  toggleFinished(){
    this.complete = !this.complete;
  }

}

class TaskList{
  
  constructor(taskArray){
    this.tasks = taskArray;
  }

  addTask(descrString){
    let newTask = new Task(descrString, false);
    this.tasks.push(newTask);

  }

  render(){
    let olElem = document.createElement('ol');
    this.tasks.forEach((aTask) => {
      let taskElem = aTask.render();
      olElem.appendChild(taskElem);
    })
    return olElem;
  }
}

class NewTaskForm {
  constructor(whatFunctionToCallWhenSubmitted){
    this.submitCallback = whatFunctionToCallWhenSubmitted;

  }

  render(){
    let formElem = document.createElement('form');
    
    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?");
    formElem.appendChild(inputElem);
    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event) =>{
      event.preventDefault();
      let inputValue = inputElem.value
      let whatToDo = this.submitCallback; 
      whatToDo(inputValue);
    })

    return formElem;
  }
}

class App{
  constructor(newParentElement, newTaskList){
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  //does not return but attaches to the given tree
  render(){
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let whoYouGunnaCall = (arg) => this.addTaskToList(arg);
    let formObj = new NewTaskForm(whoYouGunnaCall);
    this.parentElement.appendChild(formObj.render())
  }

  addTaskToList(descrString){
    this.taskList.addTask(descrString);
    this.parentElement.innerHTML =''; //clear old app
    this.render();
  }

}

//let aTask = new Task("Make some classes", true);
//let bTask = new Task("Arrow some functions", false);

let taskListObj = new TaskList([
  new Task("Make some classes", true), 
  new Task("Arrow some functions", false)
]);
//taskListObj.addTask("A second task");
//let listElem = taskListObj.render();
//console.log(taskListObj);


//console.log(taskElem);

let appElem = document.querySelector('#app');
//appElem.appendChild(listElem);
let appObj = new App(appElem, taskListObj); //initiates the application
appObj.render();




//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
