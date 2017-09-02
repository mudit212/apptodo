/*This is DATABASE OF OUR TODO APPKICATION  and Exporting the data*/

var StatusENUMS ={
     ACTIVE:'ACTIVE',
     COMPLETE:'COMPLETE',
     DELETED:'DELETED'
};

var todos={

    1 :{title :'Learn Javascript' ,status:StatusENUMS.ACTIVE},
    2 :{title :'GIT',status:StatusENUMS.ACTIVE},
    3 :{title :'Git tutorial' ,status:StatusENUMS.ACTIVE}
};

var next_todo_id=4;

module.exports={
    StatusENUMS:StatusENUMS,
    todos:todos,
    next_todo_id:next_todo_id
}