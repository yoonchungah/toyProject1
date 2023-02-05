let textInput = document.querySelector('.text_input');
let addBtn = document.querySelector('.add_btn');
let tabs = document.querySelectorAll('.task_tabs div');
let underLine = document.getElementById("under_line");
let taskList = [];
let selectedMenu ='all';
let filterList = [];


//addTask 라는 함수를 넘겨줄거다 
addBtn.addEventListener("click",addTask);
for (let i = 0; i<tabs.length; i++){
  tabs[i].addEventListener("click", function (event){
    filter(event);
  });
}

//addTask 함수 => input태그의 값을 가져와서 그 값을 푸쉬해주는것
function addTask(){
  let taskValue = textInput.value;
  //객체(:관련있는 정보들을 묶어놓은 것)의 추가 정보 필요
  let task ={
    id:randomId(),
    textContant : taskValue,
    isComplete:false
  };

  taskList.push(task);
  textInput.value = '';
  render();
}

//ui를 업데이트 해주는 함수
function render(){
  let resultHtml = '';
  list = [];
  if( selectedMenu === "all"){
    list = taskList;
  } else{
    list = filterList;
  }
  
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete){
      resultHtml += `<div class="task task_done_wrap" id="${list[i].id}">
        <div class="task_done">${list[i].textContant}</div>
        <div class="task_btns">
          <button class="check_btn" onclick="toggleDone('${list[i].id}')"><img src="img/iconmonstr-undo-7-48.png" alt="check"></button>
          <button class="delete_btn" onclick="deleteTask('${list[i].id}')"><img src="img/iconmonstr-trash-can-filled-48.png" alt="delete"></button>
        </div>
      </div>`
    } else{
      resultHtml += `<div class="task" id="${list[i].id}">
        <div>${list[i].textContant}</div>
        <div class="task_btns">
          <button class="check_btn" onclick="toggleDone('${list[i].id}')"><img src="img/iconmonstr-check-mark-lined-48.png" alt="check"></button>
          <button class="delete_btn" onclick="deleteTask('${list[i].id}')"><img src="img/iconmonstr-trash-can-filled-48.png" alt="delete"></button>
        </div>
      </div>`
    }
  }


  document.getElementById('task_menu').innerHTML = resultHtml;
}





function toggleDone(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      // 현재 갖고있는 값의 반대값을 대입 
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}




function deleteTask(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1);
    }
  }
  filter();
}







function filter(event){
 if(event){
  selectedMenu = event.target.id;
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.top =
  event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
 }
  

  filterList = [];
  if(selectedMenu === "ongoing"){
    for(let i = 0; i < taskList.length; i++){
      if (taskList[i].isComplete == false){
        filterList.push(taskList[i]);
      }
    }
  } else if( selectedMenu === "done"){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete){
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}



// 랜덤 함수
function randomId(){
  return "_" + Math.random().toString(36).substr(2, 9);
}