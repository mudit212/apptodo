/*
################                                                   #######################
                   Script.js to add Mind to our TODO application
################                                                   #######################
*/

/*AJAX -- xmlhttprequest object

 Make request to the server

1. Without reloading the code
2. Asynchronously - fast
*/

console.log('Script.js running');

const RESPONSE_DONE=4;
const STATUS_OK=200;
const TODO_LIST_ID ='todo_list_div';
const NEW_INPUT_TODO_ID='new_input_id';
const COMPLETE_TODO_ID='completedtodo';
const DELETE_ID='deletedtodo';

window.onload= getTodoAJAX();

/*---------------------AJAX Functions to make the webpage more dynamic -----------------------------------------------*/

//To GET all the TODO by hitting the api --> GET  /api/todos and then reloading all the div elements
function getTodoAJAX()
{
    var xhr=new XMLHttpRequest();
    xhr.open("GET",'/api/todos',true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                add_todo_element(TODO_LIST_ID,xhr.responseText);
                add_todo_element_complete(COMPLETE_TODO_ID,xhr.responseText);
                add_todo_element_delete(DELETE_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}

// Add a new TODO in the list by hitting the api -->   PUT  /api/todos
function addTodoAJAX()
{
    var title=document.getElementById(NEW_INPUT_TODO_ID).value;
    var xhr= new XMLHttpRequest();
    xhr.open("POST",'/api/todos',true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_title="+encodeURI(title);

    xhr.onreadystatechange=function()
    {
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                add_todo_element(TODO_LIST_ID,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

/*------------------------ Adding and creating the elements ---------------------------------------------------------*/

//Add a todo element whose status is ACTIVE in a todo_list div
function add_todo_element(id,todo_data_json){

    var todos=JSON.parse(todo_data_json);
    var parent=document.getElementById(id);
    parent.innerHTML="";
    if(parent)
    {
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status=="ACTIVE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                }
            }
        );
    }
}

//Add a todo element whose status is COMPLETE in a completetodo div
function add_todo_element_complete(id,todo_data_json){
    var todos=JSON.parse(todo_data_json);
    var parent=document.getElementById(id);
    parent.innerHTML="";

    if(parent)
    {
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status=="COMPLETE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    add_todo_element(TODO_LIST_ID, todo_data_json);


                }

            }
        );

    }
}

//Add a todo element whose status is DELETE in a deletetodo div
function add_todo_element_delete(id,todo_data_json){
    var todos=JSON.parse(todo_data_json);
    var parent=document.getElementById(id);
    parent.innerHTML="";
    if(parent)
    {
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status=="DELETED") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    add_todo_element(TODO_LIST_ID, todo_data_json);
                    add_todo_element_complete(COMPLETE_TODO_ID,todo_data_json);

                }
            }
        );

    }
}

//To create a Todo title as a div-Element and add the delete and complete button functionality to it
function createTodoElement(id,todo_object)
{
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("id", id);
    todo_element.setAttribute("class", "todostatus" + todo_object.status);
    if (todo_object.status == 'ACTIVE')
    {
        var complete = document.createElement('input');
        todo_element.appendChild(complete);
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('class','completebutton');
        complete.setAttribute("onclick", 'completeAJAX(' + id + ')');
        complete.setAttribute("id", 'del' + id);
    }
    if (todo_object.status != 'DELETED' )
    {
        var del = document.createElement("IMG");
        del.setAttribute('src','./images/wrong.png');
        del.setAttribute('height','12');
        del.setAttribute('width','12');
        del.setAttribute('class','deletebutton');
        todo_element.appendChild(del);
        del.setAttribute("onclick", 'deleteAJAX(' + id + ')');
    }
    if(todo_object.status=='COMPLETE')
    {
        var complete = document.createElement('input');
        todo_element.appendChild(complete);
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('checked','checked');
        complete.setAttribute('class','completebutton');
        complete.setAttribute('onclick','activeAJAX('+id+')');
    }
    return todo_element;
}

/* ------------------------Updating and Deleting todo with the given Id --------------------------------------------*/


//To UPDATE a TODO with particular Id by hitting the api --> PUT  /api/todo/:id   -- active a todo
function activeAJAX(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=ACTIVE";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                add_todo_element(TODO_LIST_ID,xhr.responseText);
                add_todo_element_complete(COMPLETE_TODO_ID,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

//To UPDATE a TODO with particular Id by hitting the api --> PUT  /api/todo/:id   -- complete a todo
function completeAJAX(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=COMPLETE";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {

                add_todo_element_complete(COMPLETE_TODO_ID,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

//To DELETE a TODO with particular Id by hitting the api --> DELETE  /api/todo/:id -- delete a todo
function deleteAJAX(id){

    var xhr=new XMLHttpRequest();
    xhr.open("DELETE",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=DELETED";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                add_todo_element_delete(DELETE_ID,xhr.responseText);

            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

/* ------------------------------- HIDE Functionality to hide Content under the  DIV Element------------------------ */

//Hide a Complete div element
function hideCompleteAJAX()
{
    var hide=document.getElementById(COMPLETE_TODO_ID);
    if (hide.style.display === 'none')
    {
        hide.style.display = 'block';
    }
    else
    {
        hide.style.display = 'none';
    }

}

//Hide a Delete div element
function hideDeleteAJAX()
{
    var hide=document.getElementById(DELETE_ID);
    if (hide.style.display === 'none')
    {
        hide.style.display = 'block';
    }
    else
    {
        hide.style.display = 'none';
    }
}