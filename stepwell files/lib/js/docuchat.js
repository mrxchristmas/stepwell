


// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------




// const differenceInCalendarDays = require('date-fns/difference_in_calendar_days');
// const dateFormat = require('date-fns/format');


// update everything that deals with doc



const docList=[];

// stores PLANNING documents retreived from a project
const planningDocuments = [];

// stores ACTUAL documents retreived from a project
const actualDocuments = [];

var chosenId='';
//var chosenStage="";
var loggedInUser;
const stagesSelected = ["Draft", "Review", "Approval"];
const tempChanges = [];
var activeDoc;
const allProjects = [];



// ---------------------------------------------------------------------------------




function searchDocumentArray(list, docid, docname){
    var i;
    for(i=0;i<list.length;i++){
        if(list[i].id == docid || list[i].name == docname){
            return i;
        }
    }
    return -1;
}

// function checkIfLinked(docname, list){
//     var i;
//     for(i=0;i<list.length;i++){
//         if(list[i].linkstage != undefined){
//             return true;
//         }
//     }
//     return false;
// }

function checkIfMilestone(docname, list){
    var i;
    for(i=0;i<list.length;i++){
        if(list[i].milestone != undefined){
            return true;
        }
    }
    return false;
}

function getHighestDate(addDoc, linkedToDoc){
    var chosenStage = $('#choose-link-stage').val();
    var dates = [];

    let currentLink = addDoc.link;
    if (currentLink != undefined){
        dates.push(new Date(currentLink.date));
    }else{
        dates.push(new Date(addDoc.searchStage(chosenStage).ed));
    }
    currentLink = linkedToDoc.link;
    if (currentLink != undefined){
        dates.push(new Date(currentLink.date));
    }else{
        dates.push(new Date(linkedToDoc.searchStage(chosenStage).ed));
    }
    console.log("All Dates: ", dates);
    let maxDate = new Date(Math.max.apply(null,dates));
    return maxDate;
}

function updateLinkedDates(doc, stage, endDate){
    var chosenStage = doc.searchStage(stage);
    chosenStage.ed = endDate;

    var currentLink = doc.link;
    while(currentLink != undefined){
        let currentDoc = planningDocuments[searchDocumentArray(planningDocuments, 'id', currentLink.docname)];
        let currentDocStage = currentDoc.searchStage(stage);
        currentDocStage.ed = endDate;
        currentLink.date = endDate;
        currentLink = currentLink.getNextLinkedDocument();
    }
}

function removeLink(docToDelete, docnamechosen, list){
    var i;
    for(i=0;i<list.length;i++){
        var doc = list[i];

        if(doc.name == docToDelete){
            api_deleteDocumentLink(doc.linkid, doc.id, doc.linkstage);
            doc.link = undefined;
            doc.linkstage = undefined;
            doc.linkid = undefined;
        }else{
            var currentLink = doc.link;
            while(currentLink!=undefined){
                if(currentLink.docname == docToDelete){
                    let next = currentLink.getNextLinkedDocument();
                    let prev = currentLink.getPreviousLinkedDocument();
                    if(prev == undefined){
                        if(next == undefined){
                            doc.linkstage = undefined;
                            doc.linkid = undefined;
                        }
                        doc.link = next;
                        if(next != undefined){
                            next.setPreviousLinkedDocument(prev);
                        }
                        
                    }else{
                        prev.setNextLinkedDocument(next);
                        if(next!=undefined){
                            next.setPreviousLinkedDocument(prev);
                        }
                    }
                    if(currentLink.docname == docToDelete){
                        api_deleteDocumentLink(currentLink.id, currentLink.docid, currentLink.stage);
                        let tmpDoc = planningDocuments[searchDocumentArray(planningDocuments,'id', docnamechosen)];
                        if(tmpDoc != undefined && tmpDoc.link == undefined){
                            console.log('Delete Link', currentLink.id, tmpDoc.id, currentLink.stage);
                            api_deleteDocumentLink(currentLink.id, tmpDoc.id, currentLink.stage);
                            tmpDoc.linkid = undefined;
                            tmpDoc.linkstage  = undefined;
                        }
                    }
                    break;
                }else{
                    currentLink = currentLink.getNextLinkedDocument();
                }
            }
        }
    }
    return false;
}

function updateLinkDocSelector(selector, currentDoc){
    $(selector).empty();
    var list = [];
    let currentLink = currentDoc.link;
    list.push(currentDoc.name);
    while (currentLink != undefined){
        list.push(currentLink.docname);
        currentLink = currentLink.getNextLinkedDocument();
    }

    for(let i=0;i<planningDocuments.length;i++){
        let doc = planningDocuments[i];
        if(list.indexOf(doc.name) < 0 && doc.name != null){
            // add option tag here
            console.log(' add option tag here');
            $(selector).append(`<option value="${doc.id}">${doc.name}</option>`);
        }
    }
}

function updatePredsDocSelector(selector, currentDoc){
    $(selector).empty();
    var list = [];
    let currentPreds = currentDoc.producessor;
    list.push(currentDoc.name);
    while (currentPreds != undefined){
        list.push(currentPreds.docname);
        currentPreds = currentPreds.getNextProducessorDocument();
    }

    for(let i=0;i<planningDocuments.length;i++){
        let doc = planningDocuments[i];
        if(list.indexOf(doc.name) < 0 && doc.name != null){
            // add option tag here
            console.log(' add option tag here');
            $(selector).append(`<option value="${doc.id}">${doc.name}</option>`);
        }
    }
}

function addLink(docToAdd, docLinkedTo){
    var i;
    var linkedToDoc = planningDocuments[searchDocumentArray(planningDocuments, 'id', docLinkedTo)];
    var addDoc = planningDocuments[searchDocumentArray(planningDocuments, 'id', docToAdd)];
    var chosenStage = $('#choose-link-stage').val();

    // save current document as link IF it did not have a link before
    let saveLinkedToDoc = false;
    if(linkedToDoc.link == undefined){
        saveLinkedToDoc = true;
    }

    // retrieve previous linkid or generate new linkid if previous link doesnt exists
    var link_id;
    if(linkedToDoc.linkid != undefined || (linkedToDoc.linkid == undefined && addDoc.linkid != undefined) ){
        link_id = linkedToDoc.linkid;
    }else if(linkedToDoc.linkstage == undefined && addDoc.linkstage != undefined){
        link_id = addDoc.linkid;
    }else{
        link_id = generateLinkId();
    }
    linkedToDoc.linkid = link_id;
    linkedToDoc.linkstage = chosenStage;

    addDoc.linkid = link_id;
    addDoc.linkstage = chosenStage;
    console.log('planning documents: ', planningDocuments);
    // gets the highest dates from the documents linked together
    let tmpDate = getHighestDate(addDoc, linkedToDoc);
    var zdate = new Date( tmpDate.getTime() + Math.abs(tmpDate.getTimezoneOffset()*60000));
    var highestDate = ''+zdate.getFullYear() + '-' + (zdate.getMonth()+1) + '-';
    if(zdate.getDate().length > 1){
        highestDate += zdate.getDate();
    }else{
        highestDate += '0' + zdate.getDate();
    }
    // updates links 
    updateLinkedDates(addDoc, chosenStage, highestDate);
    updateLinkedDates(linkedToDoc, chosenStage, highestDate);

    // adds new link to the current document 
    var newLink = new Link();
    newLink.docname = addDoc.name;
    newLink.id = link_id;
    newLink.stage = chosenStage;
    newLink.date = highestDate;
    linkedToDoc.appendLink(newLink);
    // adds new link to new document selected for link
    let tmpLink = new Link();
    tmpLink.id = newLink.id;
    tmpLink.stage = newLink.stage;
    tmpLink.date = newLink.date;
    tmpLink.docname = linkedToDoc.name;
    addDoc.appendLink(tmpLink);
    // adding new link to all the previous linked documents
    var currentLink = linkedToDoc.link;
    while(currentLink != undefined){
        let linkFound = addDoc.searchLink(currentLink.docname);
        if(linkFound == undefined && currentLink.docname != addDoc.name){
            let tmpLink = new Link();
            tmpLink.id = newLink.id;
            tmpLink.stage = newLink.stage;
            tmpLink.date = newLink.date;
            tmpLink.docname = currentLink.docname;
            addDoc.appendLink(tmpLink);
        }
        currentLink = currentLink.getNextLinkedDocument();
    }

    let n = '#tasklist_';
    let s = '.tasklist-widget-dates-';
    if(chosenStage == 'Draft'){
        s += 'drafted';
    }else if(chosenStage == 'Review'){
        s += 'reviewed';
    }else if(chosenStage == 'Approval'){
        s += 'approveed';
    }else if(chosenStage == 'Execution'){
        s += 'executioned';
    }else{
        s += 'postapproveed';
    }
    // updates new linked date to the UI below
    currentLink = addDoc.link;
    let addDocStage = addDoc.searchStage(chosenStage);
    if(addDocStage != undefined){
        addDocStage.ed = highestDate;
        n += addDoc.id;
        $(n).children('.tasklist-widget-title').children(s).val(highestDate);

    }
    $(n).children('.tasklist-widget-title').children(s).removeClass('editable').addClass('uneditable');
    n = '#tasklist_';
    n += linkedToDoc.id;
    $(n).children('.tasklist-widget-title').children(s).removeClass('editable').addClass('uneditable');
    
    while(currentLink != undefined){
        var currentDoc = planningDocuments[searchDocumentArray(planningDocuments, 'id', currentLink.docname)];
        let currentDocStage = currentDoc.searchStage(currentLink.stage);
        if(currentDocStage != undefined){
            currentDocStage.ed = highestDate;
            n = '#tasklist_';
            n += currentDoc.id;
            $(n).children('.tasklist-widget-title').children(s).val(highestDate);
        }
        let tmpLink = addDoc.link;
        while(tmpLink != undefined){
            let linkFound = currentDoc.searchLink(tmpLink.docname);
            if(linkFound == undefined && tmpLink.docname != currentDoc.name){
                let zlink = new Link();
                zlink.id = tmpLink.id;
                zlink.stage = tmpLink.stage;
                zlink.date = tmpLink.date;
                zlink.docname = tmpLink.docname;
                currentDoc.appendLink(zlink);
            }
            tmpLink = tmpLink.getNextLinkedDocument();
        }
        let linkFound = currentDoc.searchLink(addDoc.name);
        if(linkFound == undefined){
            let clink = new Link();
            clink.id = currentLink.id;
            clink.stage = currentLink.stage;
            clink.date = currentLink.date;
            clink.docname = addDoc.name;
            currentDoc.appendLink(clink);
        }
        currentLink = currentLink.getNextLinkedDocument();
    }
    
    // updates links in the database
    api_createPlanningDocumentLink(addDoc.linkid, addDoc.id, addDoc.linkstage);
    if(saveLinkedToDoc == true){
        api_createPlanningDocumentLink(linkedToDoc.linkid, linkedToDoc.id, linkedToDoc.linkstage);
    }
    
}

function addPred(docToAdd, docPredTo){
    var i;
    var predToDoc = planningDocuments[searchDocumentArray(planningDocuments, 'id', docPredTo)];
    var addDoc = planningDocuments[searchDocumentArray(planningDocuments, 'id', docToAdd)];
    var chosenStage = $('#choose-preds-stage').val();

    // console.log("chosen stage: ", chosenStage);
    // console.log("linkedToDoc: ", predToDoc);
    // console.log("addDoc: ", addDoc);

    if(predToDoc.searchPred(addDoc.name) == undefined){
        var pred_id;
        if(predToDoc.producessorid != undefined){
            pred_id = predToDoc.producessorid;
        }else{
            pred_id = generatePredId();
        }

        // console.log("predid: ", pred_id);

        var highestDate;
        if(predToDoc.producessor == undefined){
            highestDate = addDoc.searchStage(chosenStage).ed;
        }else{
            let dates = [];
            dates.push(new Date(addDoc.searchStage(chosenStage).ed));
            dates.push(new Date(predToDoc.producessor.date));
            let tmpDate = new Date(Math.max.apply(null,dates));
            let zdate = new Date( tmpDate.getTime() + Math.abs(tmpDate.getTimezoneOffset()*60000));
            highestDate = ''+zdate.getFullYear() + '-' + (zdate.getMonth()+1) + '-';
            if(zdate.getDate().length > 1){
                highestDate += zdate.getDate();
            }else{
                highestDate += '0' + zdate.getDate();
            }
        }
        console.log("highest date: ", highestDate);
        let tmpDate = new Date(predToDoc.searchStage(chosenStage).sd);
        let predToDocDate = new Date(tmpDate.getTime() + Math.abs(tmpDate.getTimezoneOffset()*60000));
        
        let zdate = new Date( new Date(highestDate).getTime() + Math.abs(new Date(highestDate).getTimezoneOffset()*60000));
        
        if(predToDocDate < zdate){
            // console.log('change pred date');
            predToDoc.searchStage(chosenStage).sd = highestDate;
        }

        var newPred = new Producessor();
        newPred.docname = addDoc.name;
        newPred.id = pred_id;
        newPred.stage = chosenStage;
        newPred.date = highestDate;
        predToDoc.appendProducessor(newPred);

        let n = '#tasklist_';
        n += predToDoc.id;
        let s = '.tasklist-widget-dates-';
        if(chosenStage == 'Draft'){
            s += 'drafted';
        }else if(chosenStage == 'Review'){
            s += 'reviewed';
        }else if(chosenStage == 'Approval'){
            s += 'approveed';
        }else if(chosenStage == 'Execution'){
            s += 'executioned';
        }else{
            s += 'postapproveed';
        }
        $(n).children('.tasklist-widget-title').children(s).val(highestDate);
        
        // console.log("Initially add Docname: "+ newPred.docname + " To docName: "+ predToDoc.name);
    }
}

function removePredecessor(doc, docToDelete){
    let currentPred = doc.producessor;
    let prevPred = undefined;
    while(currentPred != undefined){
        if(currentPred.docname == docToDelete.name){
            if(prevPred == undefined){
                doc.producessor = undefined;
                doc.producessorstage = undefined;
                doc.producessorid = undefined;
            }else{
                let next = currentPred.getNextProducessorDocument();
                prevPred.setNextProducessorDocument(next);
                if(next != undefined){
                    next.setPreviousProducessorDocument(prevPred);
                }
            }
            break;
        }else{
            prevPred = currentPred;
            currentPred = currentPred.getNextProducessorDocument();
        }
    }

}

function searchPlanningId(docid){
    var i;
    for(i=0;i<planningDocuments.length;i++){
        if(planningDocuments[i].id == docid){
            return i;
        }
    }
    i = -1;
    return i;
}








// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------
// MIGHT NEED FUNCTIONS


function generateDays(sd, ed){
    // Use: days = generateDays(startdate, enddate);
    // used to calculate days when retrieving date
    var dt1 = new Date(sd);
    var dt2 = new Date(ed);
    var days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    return days
}
function calculateDays(stageDiv){
    // calcultes and updates days input area
    var elms = stageDiv.getElementsByTagName("*");
    var dt1 = new Date(elms[1].value);
    var dt2 = new Date(elms[2].value);
    var days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    elms[3].value = days + 1;
}




function clearObject(obj){
    // Use: clearObject(obj);
    // empties out the object passed in
    while (obj.firstChild){
        obj.removeChild(obj.firstChild);
    }
}


function updateProducessorList(obj){
    // Use: updateProducessorList(selectObject);
    // updates producessor List, puts docs as options
    clearObject(obj);
    var opt = document.createElement("option");
    opt.value = "------";
    opt.innerHTML = "------";
    obj.appendChild(opt);
    var i;

    var lbl = document.getElementById("selectedDocName");
    for(i=0;i<docList.length;i++){
        if(docList[i].name !== lbl.innerHTML){
            var opt1 = document.createElement("option");
            opt1.value = docList[i].name;
            opt1.innerHTML = docList[i].name;
            obj.appendChild(opt1);
        }
    }
}

function updateStageDropDown(obj){
    // Use: updateStageDropDown(obj);
    // obj would be the producessor select object
    // this would be the stages list drop down
    var destination = obj.parentElement.getElementsByTagName("select")[1];
    var index = searchName(obj.value);
    var currentStage = docList[index].stage;
    clearObject(destination);
    
    while(currentStage != undefined){
        var opt = document.createElement("option");
        opt.value = currentStage.name;
        opt.innerHTML = currentStage.name;
        destination.appendChild(opt);

        currentStage = currentStage.getNextStage();
    }
    console.log("producessor stages change!");
}



function addProjectsToList(sel){
    var i;
    clearObject(sel);
    console.log("projects: ", allProjects);
    var opt = document.createElement("option");
        opt.value = "------";
        opt.innerHTML = "------";
        sel.appendChild(opt);
    for(i=0;i<allProjects.length;i++){
        var opt = document.createElement("option");
        opt.value = allProjects[i][1];
        opt.innerHTML = allProjects[i][1];
        sel.appendChild(opt);
    }
}


function updateScheduleEditDoc(obj){
    var elms = obj.parentElement.getElementsByTagName("*");
    api_updatePlanningScheduleByDocId (elms[0].innerHTML,elms[2].value,elms[3].value,elms[4].value,elms[5].value,elms[6].value,elms[7].value);
    console.log("document schedule updated");
    
}
function clearList(list){
    // Use: clearList(list);
    // empties out the given list
    while (list.length > 0){
        list.pop();
    }
}

function boardProjInfo(projName, location){
    // Use displayProjInfo(obj, location);
    // obj is the select tag
    // location is div tag where you want to display information in
    //displaysProjInfo at given location
    var div = document.getElementById(location);
    var elms = div.getElementsByTagName("label");
    if(projName != '------'){
        var index = searchProject(projName);

        elms[0].innerHTML = allProjects[index][0];
        elms[1].innerHTML = allProjects[index][1];
        elms[2].innerHTML = allProjects[index][2];
    }
}



function sortBoard(sortBy){
    var draftColumn = document.getElementById("draftColumn");
    var reviewColumn = document.getElementById("reviewColumn");
    var approvalColumn = document.getElementById("approvalColumn");
    var executionColumn = document.getElementById("executionColumn");
    var postapprovalColumn = document.getElementById("postapprovalColumn");
    var span;
    var index;
    var i;
    var children;
    var tmpDocList = [];

    if(sortBy == 'Start Date'){
        span = document.createElement("span");
        span.setAttribute("class", "boardDocument"); //span attribute(css class)
        span.setAttribute("style", `background-color: ${SUB_COLOR}; color: white;`); 
        children = draftColumn.getElementsByTagName("*");
        tmpDocList;
        for(i=0;i<children.length;i++){
            index = searchDocumentByName(planningDocuments, children[i]);
            if(index > -1){
                tmpDocList.push(planningDocuments[i]);
            }
        }

    }
}






// $("#taskBoardDocList").on('click', '.taskBoardTasksElement', function(){
//     var elms = document.getElementById("taskBoardDocumentInfo").getElementsByTagName("*");
//     if(elms[0].innerHTML == ''){
//         // var index = getPlanningDocumentIndex('', this.parentElement.id);
//         // var lastDate = getLastDate(planningDocuments[index]);
//         // elms[0].innerHTML = planningDocuments[index].id;
//         // elms[1].innerHTML = planningDocuments[index].name;
//         // elms[2].innerHTML = planningDocuments[index].stage.sd;
//         // elms[3].innerHTML = lastDate;
//     }
    

//     this.classList.toggle("activeTask");
//     var location = document.getElementById("taskBoardEditTaskRow");
//     elms = location.getElementsByTagName("*");
//     $('.taskBoardEditTaskRow').show();
    
//     // var currentTask = getTaskByDocId(this.parentElement.id, this.innerHTML);
//     // elms[0].value = this.innerHTML;
//     // elms[1].value = currentTask.sd;
//     // elms[2].value = currentTask.ed;
    
//     // console.log("currentTask: ", currentTask);
// });

function getTaskByDocId(docid, taskname){
    var docIndex = getPlanningDocumentIndex('', docid);
    var currentTask = undefined;
    if(docIndex > -1){
        currentTask = planningDocuments[docIndex].task;
        while (currentTask != undefined){
            if(currentTask.name == taskname){
                return currentTask;
            }
            currentTask = currentTask.getNextTask();
        }
    }else{
        console.log("Document not found in planning document.");
    }
    return currentTask;
}

function getLastDate(document){
    var t = document.stage;
    var date;
    while(t != undefined){
        date = t.ed;
        t = t.getNextStage();
    }
    return date;
}

function addTaskRow(obj){
    var location = obj.parentElement.nextElementSibling;
    // var docName = obj.parentElement.parentElement.parentElement.id;
    var elms = location.getElementsByClassName('taskBoardTaskRow');
    var elmsInputs;
    var newStartDate;
    var lastDate;
    var firstDate;
    var docName = obj.parentElement.parentElement.parentElement.id;
    var index = getPlanningDocumentIndex(docName,'id');
    if (elms.length > 0){
        elmsInputs = elms[elms.length-1].getElementsByTagName('input');
        newStartDate = elmsInputs[2].value; //sets new startdate; takes end date of previous task
    }else{
        newStartDate = planningDocuments[index].stage.sd;
    }
    lastDate = getLastDate(planningDocuments[index]);
    firstDate = planningDocuments[index].stage.sd;

    var div;
    var button;
    var input;

    div = document.createElement("div");
    div.setAttribute("class", "taskBoardTaskRow");

    button = document.createElement("button");
    button.setAttribute("class", "taskBoardTaskRowBtnIcon btn-shadow roundEdges");
    button.setAttribute('onclick', 'removeTaskRow(this)');
    button.innerHTML = '<i class="fas fa-minus-circle"></i>';
    div.append(button);

    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Task Name");
    input.setAttribute("class", "centreAlignText taskBoardTaskElement roundEdges");
    div.append(input);

    input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute('min', firstDate);
    input.setAttribute('max', lastDate);
    input.setAttribute("class", "centreAlignText taskBoardTaskElement roundEdges");
    input.value = newStartDate;
    div.append(input);

    input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute('min', firstDate);
    input.setAttribute('max', lastDate);
    input.setAttribute("class", "centreAlignText taskBoardTaskElement roundEdges");
    input.value = lastDate;
    div.append(input);

    button = document.createElement("button");
    button.setAttribute("class", "taskBoardTaskRowBtnIcon btn-shadow roundEdges");
    button.innerHTML = '<i class="far fa-save"></i>';
    button.setAttribute('onclick', 'saveDocumentTask(this)');
    div.append(button);

    button = document.createElement("button");
    button.setAttribute("class", "taskBoardTaskRowBtnIcon btn-shadow roundEdges");
    button.innerHTML = '<i class="fas fa-users"></i>';
    div.append(button);

    location.append(div);

    console.log("add task row btn clicked");
    
}
function removeTaskRow(obj){
    var location = obj.parentElement.parentElement;
    var target = obj.parentElement;
    var targetElms = target.getElementsByTagName('input');
    var nextElement = target.nextElementSibling;
    var elms;
    
    if(nextElement != undefined && nextElement != null){
        elms = nextElement.getElementsByTagName('input');
        elms[1].value = targetElms[1].value;
    }
    location.removeChild(target);
}
function taskEndDateChanged(obj){
    var parent = obj.parentElement;
    var location = parent.nextElementSibling;
    var elms;
    
    var docName = obj.parentElement.parentElement.parentElement.parentElement.id;
    var document = planningIndex[getPlanningDocumentIndex(docName,'id')];

    console.log("location: ", location);
    if(location != undefined && location != null){
        elms = location.getElementsByTagName('input');
        elms[1].value = obj.value;
    }

}

function saveDocumentTask(obj){
    var parent = obj.parentElement;
    var elms = parent.getElementsByTagName('input');
    var taskname = elms[0].value;
    var startDate = elms[1].value;
    var endDate = elms[2].value;
    var document = planningDocuments[getPlanningDocumentIndex(obj.parentElement.parentElement.parentElement.parentElement.id)];
    var taskid = generateTaskID();

    var currentTask = taskExists(document.name, taskname);
    var lastTask = getLastTask(document.name, taskname);

    if(currentTask == undefined){
        console.log('creating new task');
        // create new task and save it here
        var newTask = new Task(taskname);
        newTask.sd = startDate;
        newTask.ed = endDate;
        newTask.id = taskid;
        newTask.setPreviousTask(lastTask);
        if(lastTask == undefined){
            document.task = newTask;
        }else{
            lastTask.setNextTask(newTask);
        }
        
        api_createPlanningDocumentTask(taskid, document.id, taskname, startDate, endDate);
    }else{
        // task found in document
        currentTask.sd = startDate;
        currentTask.ed = endDate;
        currentTask.name = taskname;
        console.log('updating task');
        api_updatePlanningDocumentTask(currentTask.id, document.id, taskname, startDate, endDate);
    }
    
}

function taskExists(docName, taskName){
    var index = getPlanningDocumentIndex(docName, 'id');
    var currentTask = planningDocuments[index].task;

    while (currentTask != undefined && currentTask.name != taskName){
        
        currentTask = currentTask.getNextTask();
    }
    return currentTask;
}
function getLastTask(docName, taskName){
    var index = getPlanningDocumentIndex(docName, 'id');
    var currentTask = planningDocuments[index].task;

    while (currentTask != undefined && currentTask.getNextTask != undefined){
        currentTask = currentTask.getNextTask();
    }
    return currentTask;
}


function getDivIndex(list, div){
    var i;
    for(i=0; i<list.length;i++){
        if(list[i] == div){
            return i;
        }
    }
    return -1;
}
function getPlanningDocumentIndex(name, id){
    var i=0;
    for (i=0;i<planningDocuments.length;i++){
        if(planningDocuments[i].name == name || planningDocuments[i].id == id){
            return i;
        }
    }
    return -1;
}
function getTaskBoardDocIndex(name){
    var location = document.getElementById("taskBoardDocList");
    var elms = location.getElementsByTagName("*");
    var i;
    console.log(elms.length);
    for(i=0;i<elms.length;i++){
        if(elms[i].innerHTML == name){
            return i;
        }
    }
    return -1;
}




// function generateLinkId(){
//     return 'PDL-' +Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
// }
function generatePredId(){
    return 'PDP-' +Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
}

// initializes links after retrieving document information
function createLinks(list){
    var i;
    for(i=0;i<list.length;i++){
        var j;
        var linkid = list[i].linkid;
        var linkstage = list[i].linkstage;

        var str = '#tasklist_' + list[i].id;
        if(linkstage != undefined && linkid != undefined && linkstage != '' && linkid != ''){
            if(linkstage == 'Draft'){
                $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-drafted').removeClass('editable').addClass('uneditable');
            }else if(linkstage == 'Review'){
                $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-reviewed').removeClass('editable').addClass('uneditable');
            }else if(linkstage == 'Approval'){
                $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-approveed').removeClass('editable').addClass('uneditable');
            }else if(linkstage == 'Execution'){
                $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-executioned').removeClass('editable').addClass('uneditable');
            }else if(linkstage == 'Post-Approval'){
                $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-postapproveed').removeClass('editable').addClass('uneditable');
            }
            
        }

        for(j=0;j<list.length;j++){
            let newLink = new Link();
            if(j != i && list[j].linkid != undefined && list[j].linkid == linkid){
                newLink.id = linkid;
                newLink.stage = linkstage;
                newLink.date = list[j].searchStage(linkstage).ed;
                if(list[j].actualtitle == undefined){
                    newLink.docname = list[j].name;
                    newLink.docid = list[j].id;
                }else{
                    newLink.docname = list[j].actualtitle;
                    newLink.docid = list[j].actualid;
                }
                list[i].appendLink(newLink);
            }
        }
    }
}
// initializes producessor after retrieving document information
function createProducessor(list){
    var i;
    for(i=0;i<list.length;i++){
        var j;
        var producessorid = list[i].producessorid;
        var producessorstage = list[i].producessorstage;

        // var str = '#tasklist_' + list[i].id;
        // if(producessorstage != undefined){
        //     if(producessorstage == 'Draft'){
        //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-drafted').removeClass('editable').addClass('uneditable');
        //     }else if(producessorstage == 'Review'){
        //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-reviewed').removeClass('editable').addClass('uneditable');
        //     }else if(producessorstage == 'Approval'){
        //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-approveed').removeClass('editable').addClass('uneditable');
        //     }else if(producessorstage == 'Execution'){
        //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-executioned').removeClass('editable').addClass('uneditable');
        //     }else if(producessorstage == 'Post-Approval'){
        //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-postapproveed').removeClass('editable').addClass('uneditable');
        //     }
            
        // }

        for(j=0;j<list.length;j++){
            let newProducessor = new Producessor();
            if(j != i && list[j].producessorid != undefined && list[j].producessorid == producessorid){
                newProducessor.id = producessorid;
                newProducessor.stage = producessorstage;
                newProducessor.date = list[j].searchStage(producessorstage).ed;
                if(list[j].actualtitle == undefined){
                    newProducessor.docname = list[j].name;
                    newProducessor.docid = list[j].id;
                }else{
                    newProducessor.docname = list[j].actualtitle;
                    newProducessor.docid = list[j].actualid;
                }
                list[i].appendProducessor(newProducessor);
            }
        }
    }
}

function new_fillpschedulelistWidgetCon(arr, prid){
    $('.pschedulelist-widget-con').empty();
    $.each(arr, function(key, value){
        if(key == prid){
            // console.log('test',value);
            // --------------------------
            // change this to my verion with classes
            // --------------------------
            
            $.each(value, function(key, value){
                // console.log('test2',value);
                $('.pschedulelist-widget-con').append(`
                    <div id="pschedulelist_${value.planid}" class="pschedulelist-widget color-sc">
                        <div status="closed"  class="pschedulelist-widget-title">
                            <i status="bars" class="fas fa-bars handle pschedulelist-widget-addpschedule"></i>
                            <span>${value.title}</span>
                            <input class="pschedulelist-widget-dates-draftsd editable" value="${value.draftsd}" type="date" disabled>
                            <input class="pschedulelist-widget-dates-drafted editable" value="${value.drafted}" type="date" disabled>
                            <input class="pschedulelist-widget-dates-reviewed editable" value="${value.reviewed}" type="date" disabled>
                            <input class="pschedulelist-widget-dates-approveed editable" value="${value.approveed}" type="date" disabled>
                            <input class="pschedulelist-widget-dates-executioned uneditable" value="${value.executioned}" type="date" disabled>
                            <input class="pschedulelist-widget-dates-postapproveed uneditable" value="${value.postapproveed}" type="date" disabled>
                            <i class="fas fa-edit handler-icon"></i>
                            <i class="fas fa-link handler-icon"></i>
                            <i class="fas fa-paperclip handler-icon"></i>
                        </div>
                    </div>
                `);
                $('.pschedulelist-widget').droppable(docListDropOption1);
            });

            $('.pschedulelist-widget-con').append(`
                <div id="pschedulelist_nst" class="pschedulelist-widget color-sc">
                    <div status="closed" class="pschedulelist-widget-title">
                        <i status="bars" class="fas fa-bars handle pschedulelist-widget-addpschedule"></i>
                        <span>Non Specified Task</span>
                        
                    </div>
                
                </div>
            `);
            $('.pschedulelist-widget').droppable(docListDropOption1);
        }
    });
    
}


// Brijesh - 
// $('#task-header-search-submit').click(function(){
//     let projectid = $('#dashboard-body-projectname').attr('prid');
    
// });


// -------------------------------------------------------------------------------------------------------------------
// Active Projects -> Schedule
$(document).on('click', '.document-link-form-document-list > span > span > .fa-trash', function(){
    console.log('delete icon clicked');
    const main = $('.document-link-con').children('.document-link-form');
    const maindoc = main.children('.document-link-form-title').children('.document-link-form-title-documentname').html();
    console.log(maindoc);
    const removeid = $(this).parent('span').parent('span').attr('id');
    console.log(removeid);
    const prid = $('#task-header-projectid').text();
    console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;

    console.log(doclist);
    const cbsuccess=data=>{
        $(this).parent('span').parent('span').remove();

        let doc = doclist.getDocByPlanningTitle(maindoc);
        if(doc != undefined && (doc.link == undefined || doc.link.list.length == 0)){
            main.children('.document-link-form-stage-select').children('button').removeAttr('disabled');
            main.children('.document-link-form-stage-select').children('select').removeAttr('disabled');
        }
        fillTasklistWidgetCon(prid);
    }
    doclist.removeLink(removeid, cbsuccess);

});
$(document).on('click', '.document-preds-form-document-list > span > span > .fa-trash', function(){
    console.log('predecessor delete icon clicked');
    const main = $('.document-preds-con').children('.document-preds-form');
    const maindoc = main.children('.document-preds-form-title').children('.document-preds-form-title-documentname').html();
    console.log(maindoc);
    const removeid = $(this).parent('span').parent('span').attr('id');
    console.log(removeid);
    const prid = $('#task-header-projectid').text();
    console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;

    console.log(doclist);
    doclist.removePred(maindoc, removeid);

    $(this).parent('span').parent('span').remove();

    let doc = doclist.getDocByPlanningTitle(maindoc);
    if(doc != undefined && (doc.predecessor == undefined || doc.predecessor.list.length == 0)){
        main.children('.document-preds-form-stage-select').children('button').removeAttr('disabled');
        main.children('.document-preds-form-stage-select').children('select').removeAttr('disabled');
    }

    fillTasklistWidgetCon(prid);


});
// function for retrieving all the selected documents
function findSelectedDocument(){
    let list = [];
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            list[list.length] = $(this);
        }
    });


    return list;
}
// add link button
$('#btn-link-add').on('click', function(){
    let main = $('.document-link-con').children('.document-link-form');
    const doclinkedto = main.children('.document-link-form-title').children('.document-link-form-title-documentname').html();
    console.log(doclinkedto);
    const newdoctitle = main.children('.document-link-form-document-select').children('select').val();
    console.log(newdoctitle);
    const stage = main.children('.document-link-form-stage-select').children('select').val();
    console.log(stage);
    const prid = $('#task-header-projectid').text();
    // console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;
    console.log('DocList: ', doclist);

    main.children('.document-link-form-document-list').empty();

    let obj = doclist.addNewLink(doclinkedto, newdoctitle, stage);
    console.log(obj);


    let doc = doclist.getDocByPlanningTitle(doclinkedto);
    if(doc != undefined && doc.link != undefined){
        $.each(doc.link.list, function(key, value){
            main.children('.document-link-form-document-list').append(`
                    <span>${value.planningtitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
        
        });
    }

    main.children('.document-link-form-stage-select').children('button').attr('disabled',true);
    main.children('.document-link-form-stage-select').children('select').attr('disabled',true);
    
    fillTasklistWidgetCon(prid);

});
// add preds button
$('#btn-preds-add').on('click', function(){
    console.log('add predecessor');
    const main = $(this).parent('.document-preds-form-document-select').parent('.document-preds-form');
    const docpredto = main.children('.document-preds-form-title').children('.document-preds-form-title-documentname').html();
    console.log(docpredto);
    const newdoctitle = main.children('.document-preds-form-document-select').children('select').val();
    console.log(newdoctitle);
    const stage = main.children('.document-preds-form-stage-select').children('select').val();
    console.log(stage);
    const prid = $('#task-header-projectid').text();
    console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;
    console.log('DocList: ', doclist);

    let obj = doclist.addNewPred(docpredto, newdoctitle, stage);
    console.log(obj);

    main.children('.document-preds-form-document-list').empty();

    let doc = doclist.getDocByPlanningTitle(docpredto);
    if(doc != undefined && doc.predecessor != undefined){
        if(doc.predecessor.list != undefined && doc.predecessor.list.length != 0){
            console.log('will begin to add pred to UI');
            $.each(doc.predecessor.list, function(key, value){
                console.log('pred: ', value);
                main.children('.document-preds-form-document-list').append(`
                        <span id=${value.preddocid}>${value.preddoctitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
            
            });
        }
    }

    main.children('.document-preds-form-stage-select').children('button').attr('disabled',true);
    main.children('.document-preds-form-stage-select').children('select').attr('disabled',true);
    
    fillTasklistWidgetCon(prid);


});


$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-link', function(){
    let planid = '';
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            const docname = $(this).children('.tasklist-widget-title').children('span').text();
            planid = $(this).attr('id').split('_').pop();
            $('.document-link-form-title-documentname').text(docname);
            console.log(planid, docname);
            $('.document-link-con').css('display', 'flex').show();

            const prid = $('#task-header-projectid').text();
            // console.log(prid);
            const doclist = ACCUSER.getProject(prid).ScheduleDocument;
            // console.log("Documents: ", doclist);
            let main = $('.document-link-con').children('.document-link-form');
            // console.log('Location: ', location);
            
            main.children('.document-link-form-stage-select').children('button').removeAttr('disabled');
            main.children('.document-link-form-stage-select').children('select').removeAttr('disabled');

            doclist.fillLinkDocSelect(main.children('.document-link-form-document-select').children('select'), planid);

            main.children('.document-link-form-document-list').empty();
            
            let doc = doclist.getDocByPlanningId(planid);
            if(doc != undefined && doc != null){
                let links = doc.getLinks();
                // console.log("All Links: ", links);

                $.each(links, function(key, value){
                    main.children('.document-link-form-stage-select').children('select').val(value.linkstage);
                    main.children('.document-link-form-stage-select').children('button').attr('disabled',true);
                    main.children('.document-link-form-stage-select').children('select').attr('disabled',true);
                    
                    main.children('.document-link-form-document-list').append(`
                    <span id ='${value.planningid}'>${value.planningtitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
                });
            }

        }
    });
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-paperclip', function(){
    let planid = '';
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            const docname = $(this).children('.tasklist-widget-title').children('span').text();
            planid = $(this).attr('id').split('_').pop();
            $('.document-preds-form-title-documentname').text(docname);
            console.log(planid, docname);
            $('.document-preds-con').css('display', 'flex').show();

            const prid = $('#task-header-projectid').text();

            console.log(prid);
            const doclist = ACCUSER.getProject(prid).ScheduleDocument;
            console.log(ACCUSER.getProject(prid));
            console.log("Documents: ", doclist);

            let main = $('.document-preds-con').children('.document-preds-form');
            
            main.children('.document-preds-form-stage-select').children('button').removeAttr('disabled');
            main.children('.document-preds-form-stage-select').children('select').removeAttr('disabled');

            doclist.fillPredDocSelect(main.children('.document-preds-form-document-select').children('select'), planid);

            main.children('.document-preds-form-document-list').empty();
            
            let doc = doclist.getDocByPlanningId(planid);
            if(doc != undefined && doc != null){
                let preds = doc.getPreds();
                console.log("All Preds: ", preds);
                if(preds != undefined){
                    $.each(preds, function(key, value){
                        main.children('.document-preds-form-stage-select').children('select').val(value.stage);
                        main.children('.document-preds-form-stage-select').children('button').attr('disabled',true);
                        main.children('.document-preds-form-stage-select').children('select').attr('disabled',true);
                        
                        console.log('append pred');
                        main.children('.document-preds-form-document-list').append(`
                        <span id ='${value.preddocid}'>${value.preddoctitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
                    });
                }
            }



        }
    });

    
});


$('#project-view-boards-document').click(function(){
    console.log('display document schedules');
    const prid = $('#dashboard-body-projectname').attr('prid');
    console.log("projecty id: ", prid);

    let main = $('.status-con').children('.status-body');
    // const doclist = ACCUSER.getProject(prid).ActualDocuments;
    
    // ACTUAL_DOCUMENTS = new ActualDocument({'projectid' : prid});
    // console.log('Actual Documents: ', ACTUAL_DOCUMENTS.list);
    // need to pull actual; documents here


    $("#draftColumnNew").empty();
    $("#reviewColumnNew").empty();
    $('#approvalColumnNew').empty();
    $("#executionColumnNew").empty();
    $("#postApprovalColumnNew").empty();

    // $.each(doclist, function(key, value){
    //     if()
    // });

});
$('#btnRetrieveDocumentsBoard').click(function(){
    console.log('Displaying Documents');
    const prid = $('#dashboard-body-projectname').attr('prid');
    console.log("projecty id: ", prid);
    let main = $('.status-con').children('.status-body');
    
    // console.log('Actual Documents: ', ACTUAL_DOCUMENTS.list);
    const planlist = ACCUSER.getProject(prid).ScheduleDocument;
    const actualdocclass = ACCUSER.getProject(prid).ActualDocument;
    console.log(planlist, actualdocclass);

    var docType = document.getElementById('statusBoard-selDocType');
    if(docType.value == 'planning'){
        console.log('displays Planning documents');
        planlist.displayDocuments('active-proj-document-view-planning');
    }else if(docType.value == 'actual'){
        console.log('displays Actual documents');
        // ACTUAL_DOCUMENTS.displayDocuments('active-proj-document-view-actual');
        actualdocclass.displayDocuments('active-proj-document-view-actual');
    }
});



const docListDropOption1 = {
    accept: ".pschedule-clipboard-pschedulelist-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        const pscheduleid = rngTaskId();
        const projectid = $('.pschedule-header-projectid').attr('prid');
        const planid = $(event.target).attr('id').split('_').pop();
        const name = $(ui.draggable).attr('name');
        let sd = $(event.target).attr('sd');
        let ed = $(event.target).attr('ed');
        let maxd = ed;
        let mind = sd;


        if(sd == 'null' || sd == null || sd == undefined || sd == ''){
            sd = getDateNow();
            mind = '';
        }
        if(ed == 'null' || ed == null || ed == undefined || ed == ''){
            ed = getDateNow();
            maxd = '';
        }
        

        $(event.target).append(`
            <div id="${pscheduleid}" planid="${planid}" projectid="${projectid}" name="${name}" class="pschedulelist-widget-pschedule">
                <input type="text"  value="${name}" class="pschedulelist-widget-pschedule-name-i" placeholder="Please Enter pscheduleName">
                <span class="pschedulelist-widget-pschedule-name-s">${name}</span>
                <input class="pschedulelist-widget-date-start" value="${sd}" type="date">
                <input class="pschedulelist-widget-date-end" value="${ed}" type="date">
                <i class="fas fa-user-plus pschedulelist-widget-icon-resources"></i>
                <i class="fas fa-clipboard-list pschedulelist-widget-icon-clipboard"></i>
                <i status="save" class="fas fa-save pschedulelist-widget-icon-edit"></i>
                <i class="fas fa-trash pschedulelist-widget-icon-delete"></i>
            </div>
        `);
        $(`#${pscheduleid}`).children('.pschedulelist-widget-pschedule-name-i').show();
        $(`#${pscheduleid}`).children('.pschedulelist-widget-pschedule-name-s').hide();
        blinkbg($(`#${pscheduleid}`).children('.pschedulelist-widget-icon-edit'),GREEN_PALETTE, 'transparent');
        $(event.target).children('.pschedulelist-widget-pschedule').show();
        
    }
};
$('#pschedule-header-search-submit').click(function(){
    const prid = $('#pschedule-header-search-projectlist').val();
    console.log(prid);
    
    $('.pschedule-header-projectid').text(`Project Id: ${prid}`).attr('prid', prid);
    $('.pschedule-body').css('display', 'flex').show();

    // $('.pschedule-body-prefs').show();

    SCHEDULE_DOCUMENTS = ACCUSER.getProject(prid).ScheduleDocument;

    let obj = {
        "projectid": prid, 
        "sender": 'new-project-schedule',
        "callback":  callback=data=>{}
    };
    SCHEDULE_DOCUMENTS = new ScheduleDocument(obj);
    console.log("documents: ", SCHEDULE_DOCUMENTS);

   
});

$(document).on('click', '.pschedulelist-widget-title > .handler-icon.fa-edit', function(){
    $(this).siblings('input.editable').prop('disabled', false).css('border-left', '1px solid ' + SUB_COLOR);
    $(this).removeClass('fa-edit').addClass('fa-save');
});
$(document).on('click', '.pschedulelist-widget-title > .handler-icon.fa-save', function(){
    // console.log("saving data");
    const draftsd = $(this).siblings('.pschedulelist-widget-dates-draftsd').val();
    const drafted = $(this).siblings('.pschedulelist-widget-dates-drafted').val();
    const reviewed = $(this).siblings('.pschedulelist-widget-dates-reviewed').val();
    const approveed = $(this).siblings('.pschedulelist-widget-dates-approveed').val();
    const executioned = $(this).siblings('.pschedulelist-widget-dates-executioned').val();
    const postapproveed = $(this).siblings('.pschedulelist-widget-dates-postapproveed').val();

    let planid = $(this).siblings('span').attr('id');
    console.log(planid);
    console.log(draftsd, drafted, reviewed, approveed, executioned, postapproveed);
    SCHEDULE_DOCUMENTS.saveSchedule(planid, draftsd, drafted, reviewed, approveed, executioned, postapproveed);

    $(this).siblings('input').prop('disabled', true).css('border-left', '1px solid white');
    $(this).removeClass('fa-save').addClass('fa-edit');
    
    
});




// Build Project > Schedule
// triggers when link icon clicked
$(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-link', function(){
    let planid = '';
    $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
        let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            const docname = $(this).children('.preqtasklist-widget-title').children('span').text();
            planid = $(this).attr('id').split('_').pop();
            $('.preqdocument-link-form-title-documentname').text(docname);
            console.log(planid, docname);
            $('.preqdocument-link-con').css('display', 'flex').show();

            const prid = $('#request-createtool-required-requestid').attr('prid');
            // console.log(prid);
            const doclist = ACCUSER.getProject(prid).ScheduleDocument;
            // console.log("Documents: ", doclist);
            let main = $('.preqdocument-link-con').children('.preqdocument-link-form');
            // console.log('Location: ', location);
            
            main.children('.preqdocument-link-form-stage-select').children('button').removeAttr('disabled');
            main.children('.preqdocument-link-form-stage-select').children('select').removeAttr('disabled');

            doclist.fillLinkDocSelect(main.children('.preqdocument-link-form-preqdocument-select').children('select'), planid);

            main.children('.preqdocument-link-form-preqdocument-list').empty();
            
            let doc = doclist.getDocByPlanningId(planid);
            if(doc != undefined && doc != null){
                let links = doc.getLinks();
                // console.log("All Links: ", links);
                $(`preqtasklist_${doc.id}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${doc.linkstage}`).addClass('uneditable');

                $.each(links, function(key, value){
                    main.children('.preqdocument-link-form-stage-select').children('select').val(value.linkstage);
                    main.children('.preqdocument-link-form-stage-select').children('button').attr('disabled',true);
                    main.children('.preqdocument-link-form-stage-select').children('select').attr('disabled',true);
                    
                    main.children('.preqdocument-link-form-preqdocument-list').append(`
                    <span id ='${value.planningid}'>${value.planningtitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
                });
            }

        }
    });

});
// triggers when pred icon clicked
$(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-paperclip', function(){
    let planid = '';
    $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
        let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            const docname = $(this).children('.preqtasklist-widget-title').children('span').text();
            planid = $(this).attr('id').split('_').pop();
            $('.preqdocument-preds-form-title-documentname').text(docname);
            console.log(planid, docname);
            $('.preqdocument-preds-con').css('display', 'flex').show();

            const prid = $('#request-createtool-required-requestid').attr('prid');
            console.log(prid);
            const doclist = ACCUSER.getProject(prid).ScheduleDocument;
            console.log(ACCUSER.getProject(prid));
            console.log("Documents: ", doclist);

            let main = $('.preqdocument-preds-con').children('.preqdocument-preds-form');
            
            main.children('.preqdocument-preds-form-stage-select').children('button').removeAttr('disabled');
            main.children('.preqdocument-preds-form-stage-select').children('select').removeAttr('disabled');

            doclist.fillPredDocSelect(main.children('.preqdocument-preds-form-preqdocument-select').children('select'), planid);

            main.children('.preqdocument-preds-form-preqdocument-list').empty();
            
            let doc = doclist.getDocByPlanningId(planid);
            if(doc != undefined && doc != null){
                let preds = doc.getPreds();
                console.log("All Preds: ", preds);
                if(preds != undefined){
                    $.each(preds, function(key, value){
                        main.children('.preqdocument-preds-form-stage-select').children('select').val(value.stage);
                        main.children('.preqdocument-preds-form-stage-select').children('button').attr('disabled',true);
                        main.children('.preqdocument-preds-form-stage-select').children('select').attr('disabled',true);
                        
                        console.log('append pred');
                        main.children('.preqdocument-preds-form-preqdocument-list').append(`
                        <span id ='${value.preddocid}'>${value.preddoctitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
                    });
                }
            }



        }
    });
});


// preqdocument-link-con > add link button
$('#preqdocument-btn-link-add').on('click', function(){
    const main = $(this).parent('.preqdocument-link-form-preqdocument-select').parent('.preqdocument-link-form');
    const doclinkedto = main.children('.preqdocument-link-form-title').children('.preqdocument-link-form-title-documentname').html();
    console.log(doclinkedto);
    const newdoctitle = $('#choose-link-document').val();
    console.log(newdoctitle);
    const stage = main.children('.preqdocument-link-form-stage-select').children('select').val();
    console.log(stage);
    const prid = $('#request-createtool-required-requestid').attr('prid');
    // console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;
    console.log('DocList: ', doclist);

    let obj = doclist.addNewLink(doclinkedto, newdoctitle, stage);
    console.log(obj);

    $('#link-form-preqdocument-list').empty();

    let doc = doclist.getDocByPlanningTitle(doclinkedto);
    if(doc != undefined && doc.link != undefined){
        $.each(doc.link.list, function(key, value){
            main.children('.preqdocument-link-form-preqdocument-list').append(`
                    <span>${value.planningtitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
        
        });
    }

    main.children('.preqdocument-link-form-stage-select').children('button').attr('disabled',true);
    main.children('.preqdocument-link-form-stage-select').children('select').attr('disabled',true);
    

});
// preqdocument-preds-con > add preds button
$('#preqdocument-btn-preds-add').on('click', function(){
    console.log('add predecessor');
    const main = $(this).parent('.preqdocument-preds-form-preqdocument-select').parent('.preqdocument-preds-form');
    const docpredto = main.children('.preqdocument-preds-form-title').children('.preqdocument-preds-form-title-documentname').html();
    console.log(docpredto);
    const newdoctitle = $('#choose-preds-document').val();
    console.log(newdoctitle);
    const stage = main.children('.preqdocument-preds-form-stage-select').children('select').val();
    console.log(stage);
    const prid = $('#request-createtool-required-requestid').attr('prid');
    console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;
    console.log('DocList: ', doclist);

    let obj = doclist.addNewPred(docpredto, newdoctitle, stage);
    console.log(obj);

    main.children('.preqdocument-preds-form-preqdocument-list').empty();

    let doc = doclist.getDocByPlanningTitle(docpredto);
    if(doc != undefined && doc.predecessor != undefined){
        if(doc.predecessor.list != undefined && doc.predecessor.list.length != 0){
            console.log('will begin to add pred to UI');
            $.each(doc.predecessor.list, function(key, value){
                console.log('pred: ', value);
                main.children('.preqdocument-preds-form-preqdocument-list').append(`
                        <span id=${value.preddocid}>${value.preddoctitle}<span>${value.enddate}<i class="fas fa-trash"></i></span></span>`);
            
            });
        }
    }

    main.children('.preqdocument-preds-form-stage-select').children('button').attr('disabled',true);
    main.children('.preqdocument-preds-form-stage-select').children('select').attr('disabled',true);
    


});


// preq-link-form trash icon clicked
$(document).on('click', '#link-form-preqdocument-list > span > span > .fa-trash', function(){
    console.log('delete icon clicked');
    const main = $('.preqdocument-link-con').children('.preqdocument-link-form');
    const maindoc = main.children('.preqdocument-link-form-title').children('.preqdocument-link-form-title-documentname').html();
    console.log(maindoc);
    const removeid = $(this).parent('span').parent('span').attr('id');
    console.log(removeid);
    const prid = $('#request-createtool-required-requestid').attr('prid');
    console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;

    console.log(doclist);
    const cbsuccess=data=>{
        $(this).parent('span').parent('span').remove();

        let doc = doclist.getDocByPlanningTitle(maindoc);
        if(doc != undefined && (doc.link == undefined || doc.link.list.length == 0)){
            main.children('.preqdocument-link-form-stage-select').children('button').removeAttr('disabled');
            main.children('.preqdocument-link-form-stage-select').children('select').removeAttr('disabled');
        }
    }
    doclist.removeLink(removeid, cbsuccess);

});
// preq-link-form trash icon clicked
$(document).on('click', '.preqdocument-preds-form-preqdocument-list > span > span > .fa-trash', function(){
    console.log('predecessor delete icon clicked');

    const main = $('.preqdocument-preds-con').children('.preqdocument-preds-form');
    const maindoc = main.children('.preqdocument-preds-form-title').children('.preqdocument-preds-form-title-documentname').html();
    console.log(maindoc);
    const removeid = $(this).parent('span').parent('span').attr('id');
    console.log(removeid);
    const prid = $('#request-createtool-required-requestid').attr('prid');
    console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;

    console.log(doclist);
    doclist.removePred(maindoc, removeid);

    $(this).parent('span').parent('span').remove();

    let doc = doclist.getDocByPlanningTitle(maindoc);
    if(doc != undefined && (doc.predecessor == undefined || doc.predecessor.list.length == 0)){
        main.children('.preqdocument-preds-form-stage-select').children('button').removeAttr('disabled');
        main.children('.preqdocument-preds-form-stage-select').children('select').removeAttr('disabled');
    }

});



// star/milestone clicked
$(document).on('click', '.preqsched-body-preqtasklist > .preqtasklist-widget-con > .preqtasklist-widget > .preqtasklist-widget-title > span > .preqtasklist-widget-title-milestone', function(){
    console.log('its a milestone');

    const status = $(this).attr('status');
    // const planid = $(this).parent().attr('id');
    
    const prid = $('.build-projectlist-widget').attr('prid');
    // console.log(prid);
    const doclist = ACCUSER.getProject(prid).ScheduleDocument;

    const main = $(this).parent('span').parent('.preqtasklist-widget-title').parent('.preqtasklist-widget');
    const planid = main.attr('id').split('_').pop();

    console.log( planid);
    if(status == 'idle'){
        doclist.makeMilestone(planid);
        $(this).removeClass('far').addClass('fas').attr('status', 'active');
        $(this).removeClass('idle').addClass('active');
    }else{
        doclist.removeMilestone(planid);
        $(this).removeClass('fas').addClass('far').attr('status', 'idle');
        $(this).removeClass('active').addClass('idle');
    }


});








$('.pschedule-resources-con').click(function(e){
    if(this != e.target){
        return;
    }else{
        $(this).hide();
        $(`#pschedulelist_${selPlanId1}`).children('.pschedulelist-widget-pschedule').remove();
        fillpscheduleResource(selpscheduleId);
        fillpschedules(selPlanId1);
    }
});

$(document).on('click', '.pschedule-clipboard-pschedulelist-widget > i', function(){
    const id = $(this).parent('.pschedule-clipboard-pschedulelist-widget').attr('tid');
    console.log(id);
    removepscheduleClipboard(id);
    $(this).parent('.pschedule-clipboard-pschedulelist-widget').remove();
});
$(document).on('click', '.pschedulelist-widget-icon-edit', function(){
    const main = $(this).parent('.pschedulelist-widget-pschedule');
    const planid = main.attr('planid');
    const projectid = main.attr('projectid');
    const pscheduleid = main.attr('id');
    const pschedulename = main.children('.pschedulelist-widget-pschedule-name-i').val();
    const startdate = $(this).siblings('.pschedulelist-widget-date-start').val();
    const enddate = $(this).siblings('.pschedulelist-widget-date-end').val();
    
    // console.log(planid, projectid, pscheduleid, pschedulename, startdate, enddate);
    if($(this).attr('status') == 'save'){
        // save the record
        const cbsuccess = data => {
            $(this).attr('status','edit');
            $(this).siblings('.pschedulelist-widget-date-start').prop('disabled', true);
            $(this).siblings('.pschedulelist-widget-date-end').prop('disabled', true);
            main.children('.pschedulelist-widget-pschedule-name-i').hide();
            main.children('.pschedulelist-widget-pschedule-name-s').text(pschedulename).show();
            $(this).removeClass('fa-save').addClass('fa-edit');
            let addGate = true;
            for(i=0; i<pscheduleList.length; i++){
                if(pscheduleList[i].taskid == pscheduleid){
                    addGate = false;
                }
            }
            if(addGate){
                pscheduleList[pscheduleList.length] = {
                    'taskid' : pscheduleid,
                    'projectid' : projectid,
                    'planid' : planid,
                    'taskname' : pschedulename,
                    'startdate' : startdate,
                    'enddate' : enddate
                };
            }else{
                updatepscheduleList(pscheduleid, 'taskname', pschedulename);
                updatepscheduleList(pscheduleid, 'startdate', startdate);
                updatepscheduleList(pscheduleid, 'enddate', enddate);
            }
            $('.pschedulelist-widget').children('.pschedulelist-widget-pschedule').remove();
            fillpschedules(planid);
            
        };
        // console.log(pscheduleid, projectid, planid, pschedulename, startdate, enddate);
        api_createTask(pscheduleid, projectid, planid, pschedulename, startdate, enddate, cbsuccess);

    }else if($(this).attr('status') == 'edit'){
        $(this).attr('status','save');
        // enable editing
        $(this).siblings('.pschedulelist-widget-date-start').prop('disabled', false);
        $(this).siblings('.pschedulelist-widget-date-end').prop('disabled', false);
        main.children('.pschedulelist-widget-pschedule-name-i').show();
        main.children('.pschedulelist-widget-pschedule-name-s').hide();
        $(this).removeClass('fa-edit').addClass('fa-save');

    }

});

$(document).on('mouseover', '.pschedulelist-widget-title > span', function(e){
    $(this).siblings('input').hide();
    $(this).siblings('.handler-icon').hide();
    $(this).siblings('span').css({
        'text-overflow': 'initial',
        'overflow': 'initial',
        'background-color': SUB_COLOR,
        'z-index': '100'
    });
});
$(document).on('mouseout', '.pschedulelist-widget-title > span', function(){
    if($(this).parent('.pschedulelist-widget-title').attr('status') == 'closed'){
        $(this).siblings('input').show();
        $(this).siblings('.handler-icon').show();
        $(this).siblings('span').css({
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'background-color': 'initial',
            'z-index': 'initial'
        });
    }
});
$(document).on('click', '.pschedulelist-widget-addpschedule', function(){  // OK
    const planid = $(this).parent('.pschedulelist-widget-title').parent('.pschedulelist-widget').attr('id').split('_').pop();
    const pscheduleid = rngTaskId();
    const projectid = $('.pschedule-header-projectid').attr('prid');
    const sd = $(this).parent('.pschedulelist-widget').attr('sd');
    const ed = $(this).parent('.pschedulelist-widget').attr('ed');

    const status = $(this).attr('status');

    if(status == 'plus'){
        $(`#pschedulelist_${planid}`).append(`
            <div id="${pscheduleid}" planid="${planid}" projectid="${projectid}" class="pschedulelist-widget-pschedule">
                <input type="text" class="pschedulelist-widget-pschedule-name-i" placeholder="Please Enter pscheduleName">
                <span class="pschedulelist-widget-pschedule-name-s"></span>
                <input class="pschedulelist-widget-date-start" value="${sd}" type="date">
                <input class="pschedulelist-widget-date-end" value="${ed}" type="date">
                <i class="fas fa-user-plus pschedulelist-widget-icon-resources"></i>
                <i class="fas fa-clipboard-list pschedulelist-widget-icon-clipboard"></i>
                <i status="save" class="fas fa-save pschedulelist-widget-icon-edit"></i>
                <i class="fas fa-trash pschedulelist-widget-icon-delete"></i>
            </div>
        `);
        $(`#${pscheduleid}`).children('.pschedulelist-widget-pschedule-name-i').show();
        $(`#${pscheduleid}`).children('.pschedulelist-widget-pschedule-name-s').hide();
        blinkbg($(`#${pscheduleid}`).children('.pschedulelist-widget-icon-edit'), GREEN_PALETTE, 'transparent');
    }else{
        $(this).siblings('span').click();
    }
});
$(document).on('click', '.pschedulelist-widget-icon-clipboard', function(){
    const name = $(this).siblings('.pschedulelist-widget-pschedule-name-s')
    .clone()    //clone the element
    .children() //select all the children
    .remove()   //remove all the children
    .end()  //again go back to selected element
    .text();

    setpscheduleClipboard(name);
    blinkbg($('.pschedule-clipboard'), GREEN_PALETTE, BTN_COLOR);
});
$(document).on('click', '.pschedulelist-widget-icon-delete', function(){ // OK
    const pscheduleid = $(this).parent('.pschedulelist-widget-pschedule').attr('id');
    console.log(pscheduleid);
    const cbtrue = () => {
        const cbsuccess=()=>{
            $(this).parent('.pschedulelist-widget-pschedule').remove();
            const data = $.grep(pscheduleList, function(e){ 
                return e.pscheduleid != pscheduleid; 
            });
            pscheduleList = data;
        };
        api_deleteTask(pscheduleid, cbsuccess);
    };
    const cbfalse = () => console.log('Cancelled Delete');
    showAction('All Resources attached to this Task will also be deleted. Do you still wish to proceed?', cbtrue, cbfalse);
});
$(document).on('click', '.pschedulelist-widget-icon-resources', function(){ // OK
    const pscheduleid = $(this).parent('.pschedulelist-widget-pschedule').attr('id');
    const pschedulename = $(this).siblings('.pschedulelist-widget-pschedule-name-s')
        .clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text();
    const planid =  $(this).parent('.pschedulelist-widget-pschedule').parent('.pschedulelist-widget').attr('id').split('_').pop();
    // console.log(planid);
    selpscheduleId = pscheduleid;
    selPlanId1 = planid;

    if(accountList1.length > 0){
        $('#pschedule-resources-form-type-hours-select').empty();
        $('.pschedule-resources-con').css('display', 'flex').show();
        $('.pschedule-resources-form-title-pschedulename').text(pschedulename);
        for(i=0; i<accountList1.length; i++){
            $('#pschedule-resources-form-type-hours-select').append(`
                <option value="${accountList1[i].id}">${accountList1[i].fn} ${accountList1[i].ln}</option>
            `);
        }
        fillpscheduleResourceFormConnectList(pscheduleid);
    }else{
        const cbcomplete=()=>{
            const cbcomplete1=()=>{
                $('.pschedule-resources-con').css('display', 'flex').show();
                $('.pschedule-resources-form-title-pschedulename').text(pschedulename);
                $('#pschedule-resources-form-type-hours-select').empty();
                for(i=0; i<accountList1.length; i++){
                    $('#pschedule-resources-form-type-hours-select').append(`
                        <option value="${accountList1[i].id}">${accountList1[i].fn} ${accountList1[i].ln}</option>
                    `);
                }
                fillpscheduleResourceFormConnectList(pscheduleid);
            };
            api_fetchSupplierByCompanyId(__COMPANY_ID, 'pschedulelist-widget-icon-resources', {}, cbcomplete1)
        };
        api_fetchAccount(__COMPANY_ID, 'na', 'pschedulelist-widget-icon-resources', {}, cbcomplete);
    }

    $('#pschedule-resources-form-type-hours').click();
    let th = 0;
    $('.pschedule-resources-form-connect-list').children('.pschedule-resources-form-connect-list-widget').each(function(){
        let x = $(this).children('div').children('input').val();
        if(isNaN(x)){
            x = 0;
        }
        th += parseFloat(x);
    });
    $('.pschedule-resources-form-totalhours').text(th);
    
});
$('.pschedule-resources-form-type-handle').click(function(){
    const id = $(this).attr('id').split('-').pop();
    selType1 = id;
    $('.pschedule-resources-form-type-container').hide();
    $(`.pschedule-resources-form-type-${id}`).css('display','flex').show();

    if(id == 'hours'){
        $('#pschedule-resources-form-type-hours-select').empty();
        for(i=0; i<accountList1.length; i++){
            $('#pschedule-resources-form-type-hours-select').append(`
                <option value="${accountList1[i].id}">${accountList1[i].fn} ${accountList1[i].ln}</option>
            `);
        }
    }else if(id == 'supplier'){
        $('#pschedule-resources-form-type-supplier-select').empty();
        for(i=0; i<supplierList1.length; i++){
            $('#pschedule-resources-form-type-supplier-select').append(`
                <option value="${supplierList1[i].supplierid}">${supplierList1[i].name}</option>
            `);
        }
    }else if(id == 'tm'){
        $('#pschedule-resources-form-type-tm-select').empty();
        for(i=0; i<supplierList1.length; i++){
            $('#pschedule-resources-form-type-tm-select').append(`
                <option value="${supplierList1[i].supplierid}">${supplierList1[i].name}</option>
            `);
        }
    }

});
$('.pschedule-resources-form-type-submit').click(function(){
    const w = $(this);
    const id = rngTaskResourceId();
    const projectid = $('.pschedule-header-projectid').attr('prid');
    const planid = selPlanId1;
    const pscheduleid = selpscheduleId;
    const type = selType1;
    let supplierid = '';
    let accid = '';
    let hours = '';
    let createSupplierGate = false;
    let createSupplierName = '';
    let createSupplierId = '';
    let fname = '';
    let lname = '';
    let sname = '';

    if(type == "hours"){
        const x = parseFloat($('#pschedule-resources-form-type-hours-input').val());
        accid = $('#pschedule-resources-form-type-hours-select').val();
        const name = $('#pschedule-resources-form-type-hours-select option:selected').text();
        console.log(name);
        const v = name.split(' ');
        lname = v[v.length - 1];
        for(k=0; k<(v.length - 1); k++){
            fname += `${v[k]} `; 
        }
        sname = 'na';
        console.log('fname', fname, 'lname', lname, 'sname', sname);

        if(x != ''){
            if(isNaN(x)){
                blinkbg($('#pschedule-resources-form-type-hours-input'), RED_PALETTE, 'white');
                $('#pschedule-resources-form-type-hours-input').val('');
                return;
            }else{
                hours = x;
            }
        }
    }else if(type == "supplier"){
        const x = $('#pschedule-resources-form-type-supplier-input').val();
        if(x == ''){
            const spl = $('#pschedule-resources-form-type-supplier-select').val();
            const name = $('#pschedule-resources-form-type-supplier-select option:selected').text();
            if(spl == 'null' || spl == '' || spl == null || spl == undefined){
                blinkbg($('#pschedule-resources-form-type-supplier-select'), RED_PALETTE, 'white');
                blinkbg($('#pschedule-resources-form-type-supplier-input'), GREEN_PALETTE, 'white');
                return;
            }else{
                supplierid = spl;
                sname = name; 
                fname = 'na';
                lname = 'na';
            }
        }else{
            const id = rngSupplierId();
            const name = x;
            sname = name; 
            fname = 'na';
            lname = 'na';
            // create supplier api call here
            createSupplierGate = true;
            createSupplierName = name;
            createSupplierId = id;
            supplierid = id;
        }
    }else if(type == "tm"){
        const x = $('#pschedule-resources-form-type-tm-input').val();
        if(x == ''){
            const spl = $('#pschedule-resources-form-type-tm-select').val();
            const name = $('#pschedule-resources-form-type-tm-select option:selected').text();
            if(spl == 'null' || spl == '' || spl == null || spl == undefined){
                blinkbg($('#pschedule-resources-form-type-tm-select'), RED_PALETTE, 'white');
                blinkbg($('#pschedule-resources-form-type-tm-input'), GREEN_PALETTE, 'white');
                return;
            }else{
                supplierid = spl;
                sname = name; 
                fname = 'na';
                lname = 'na';
            }
        }else{
            const id = rngSupplierId();
            const name = x;
            sname = name; 
            fname = 'na';
            lname = 'na';
            // create supplier api call here
            createSupplierGate = true;
            createSupplierName = name;
            createSupplierId = id;
            supplierid = id;
        }

        const y = $('#pschedule-resources-form-type-tm-maxhours').val();
        if(y != ''){
            if(Number.isInteger(parseInt(y))){
                const x = parseInt(y);
                hours = x;
            }else{
                blinkbg($('#pschedule-resources-form-type-tm-maxhours'), RED_PALETTE, 'white');
                $('#pschedule-resources-form-type-tm-maxhours').val('');
                return;
            }
        }
    }

    if(createSupplierGate){
        if(hours == ''){
            hours = 0;
        }
        const cbsuccess=()=>{
            // console.log('Create Supplier: ', createSupplierName, createSupplierId, __COMPANY_ID, projectid);
            const cbsuccess1=()=>{
                // console.log('id', id, 'projectid', projectid, 'pscheduleid', pscheduleid, 'type', type, 'supplierid', supplierid, 'accid', accid, 'hours', hours);
                pscheduleResouceList[pscheduleResouceList.length] = {
                    'id' : id,
                    'taskid' : pscheduleid,
                    'type' : type,
                    'projectid' : projectid,
                    'planid' : planid,
                    'supplierid' : createSupplierId,
                    'accid' : accid,
                    'hours' : hours,
                    'firstname' : fname,
                    'lastname' : lname,
                    'suppliername' : sname
                };
                $(`#pschedulelist_${planid}`).children('.pschedulelist-widget-pschedule').remove();
                // fillpschedules(planid);
                // fillpscheduleResource(pscheduleid);
                // fillpscheduleResourceFormConnectList(pscheduleid);
                let name = '';
                if(sname == 'na'){
                    name = fname + ' ' + lname; 
                }else{
                    name = sname;
                }

                $('.pschedule-resources-form-connect-list').append(`
                    <span rid="${id}" class="pschedule-resources-form-connect-list-widget color-sc">${name}
                        <div>
                            <i class="fas fa-trash pschedule-resources-form-connect-list-widget-delete"></i>
                        </div>
                    </span>
                `);
                // $('.pschedule-resources-con').hide();
            };
            api_createTaskResource(id, pscheduleid, type, projectid, createSupplierId, accid, hours, planid, cbsuccess1);
        };
        api_createSupplier(createSupplierId, __COMPANY_ID, projectid, createSupplierName, cbsuccess);
    }else{
        if(hours == ''){
            hours = 0;
        }
        const cbsuccess1=()=>{
            // console.log('id', id, 'projectid', projectid, 'pscheduleid', pscheduleid, 'type', type, 'supplierid', supplierid, 'accid', accid, 'hours', hours);
            // console.log(id, ',', pscheduleid, ',', type, ',', projectid, ',', supplierid, ',', accid, ',', hours);
            pscheduleResouceList[pscheduleResouceList.length] = {
                'id' : id,
                'taskid' : pscheduleid,
                'type' : type,
                'projectid' : projectid,
                'planid' : planid,
                'supplierid' : supplierid,
                'accid' : accid,
                'hours' : hours,
                'firstname' : fname,
                'lastname' : lname,
                'suppliername' : sname
            };
            // $(`#pschedulelist_${planid}`).children('.pschedulelist-widget-pschedule').remove();
            // fillpscheduleResource(pscheduleid);
            // fillpschedules(planid);
            // fillpscheduleResourceFormConnectList(pscheduleid);
            // $('.pschedule-resources-con').hide();
            let name = '';
            if(sname == 'na'){
                name = fname + ' ' + lname; 
            }else{
                name = sname;
            }

            let ccc = '';
            if(type != "supplier"){
                ccc = `<input type="text" placeholder="hours" value="${hours}" disabled>
                    <i status="edit" class="fas fa-edit pschedule-resources-form-connect-list-widget-edit"></i>`;
            }

            $('.pschedule-resources-form-connect-list').append(`
                <span rid="${id}" class="pschedule-resources-form-connect-list-widget color-sc">${name}
                    <div>
                        ${ccc}
                        <i class="fas fa-trash pschedule-resources-form-connect-list-widget-delete"></i>
                    </div>
                </span>
            `);
        };
        api_createTaskResource(id, pscheduleid, type, projectid, supplierid, accid, hours, planid, cbsuccess1);
    }

    let th = 0;
    $('.pschedule-resources-form-connect-list').children('.pschedule-resources-form-connect-list-widget').each(function(){
        let x = $(this).children('div').children('input').val();
        if(isNaN(x)){
            x = 0;
        }
        th += parseFloat(x);
    });
    $('.pschedule-resources-form-totalhours').text(th);

});

    // pschedule events scheduleboard
$('.pdocument-link-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('.pdocument-preds-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});

    // pschedule Resource Events
$(document).on('click', '.pschedule-body-prefs-resources-widget-delete', function(){
    const id = $(this).parent('.pschedule-body-prefs-resources-widget').attr('id');
    const cbsuccess=()=>{
        const data = $.grep(pscheduleResouceList, function(e){ 
            return e.id != id; 
        });
        pscheduleResouceList = data;
        console.log(curPlanid1);
        $(`#pschedulelist_${curPlanid1}`).children('.pschedulelist-widget-pschedule').remove();
        fillpschedules(curPlanid1);
        $(this).parent('.pschedule-body-prefs-resources-widget').remove();
        
    };
    api_deleteTaskResource(id, cbsuccess);
});
$(document).on('click', '.pschedule-resources-form-connect-list-widget-edit', function(){
    const status = $(this).attr('status');
    const rid = $(this).parent('div').parent('.pschedule-resources-form-connect-list-widget').attr('rid');
    const pscheduleid = $(this).parent('div').parent('.pschedule-resources-form-connect-list-widget').attr('tid');

    if(status == 'edit'){
        $(this).attr('status', 'save');
        $(this).removeClass('fa-edit').addClass('fa-save');
        $(this).siblings('input').prop('disabled', false);
    }else if(status == 'save'){
        const hour = parseFloat($(this).siblings('input').val());
        let tHours = 0;
        if(isNaN(hour)){
            console.log('string', hour);
            blinkbg($(this).siblings('input'), RED_PALETTE, 'white');
            return;
        }else{
            console.log('Save this shit: ',rid, 'hours', hour);
            api_updateTaskResourceColumn(rid, 'hours', hour);
            updatepscheduleResourceList(rid, pscheduleid, 'hours', hour);
            let th = 0;
            $('.pschedule-resources-form-connect-list').children('.pschedule-resources-form-connect-list-widget').each(function(){
                let x = $(this).children('div').children('input').val();
                if(isNaN(x)){
                    x = 0;
                }
                th += parseFloat(x);
            });
            $('.pschedule-resources-form-totalhours').text(th);
        }
        $(this).attr('status', 'edit');
        $(this).removeClass('fa-save').addClass('fa-edit');
        $(this).siblings('input').prop('disabled', true);

        
    }
});
$(document).on('click', '.pschedule-resources-form-connect-list-widget-delete', function(){
    const rid = $(this).parent('div').parent('.pschedule-resources-form-connect-list-widget').attr('rid');
    const cbsuccess=()=>{
        $(this).parent('div').parent('.pschedule-resources-form-connect-list-widget').remove();
        const data = $.grep(pscheduleResouceList, function(e){ 
            return e.id != rid; 
        });
        pscheduleResouceList = data;
        
        let th = 0;
        $('.pschedule-resources-form-connect-list').children('.pschedule-resources-form-connect-list-widget').each(function(){
            let x = $(this).children('div').children('input').val();
            if(isNaN(x)){
                x = 0;
            }
            th += parseFloat(x);
        });
        $('.pschedule-resources-form-totalhours').text(th);
    };
    api_deleteTaskResource(rid, cbsuccess);
});

    // pschedule events clipboard
$('.pschedule-clipboard').draggable({
    start: function(e, ui) {
        // this function fires when you start dragging
        // $('.pschedulelist-widget').css('background-color', GREEN_PALETTE);
        // $(ui.helper).css('max-width', '300px');

        // const tid = $(ui.helper).attr('tid');
        // const name = $(ui.helper).attr('name');
        
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        // $('.pschedulelist-widget').css('background-color', BTN_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    // helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".pschedule-con", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    // cursorAt: { bottom: 10, left: 50}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // cursor: 'grabbing',
    // revert: "none" // draggable will fall back to its place
});
$('.pschedule-clipboard').click(function(){
    const status = $(this).attr('status');
    if(status == 'closed'){
        $(this).animate({'height' : '400px', 'border-radius' : '25px', 'border-top-right-radius' : '0px'}, 200, function(){
            $(this).animate({'width' : '300px'}, 200, function(){
                $('.pschedule-clipboard-icon').css({'opacity' : '1'}).animate({'opacity' : '0'}, 200, function(){
                    $('.pschedule-clipboard-form').css({'display': 'flex', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
                }).hide();
            });
        }).css({
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'position': 'absolute',
            'bottom': '5vh',
            'right': '5vw',
        });
        $(this).attr('status', 'open');
    }
   
});
$('.pschedule-clipboard-title > i').click(function(){
    // console.log('close');
    $('.pschedule-clipboard-form').css({'display': 'flex', 'opacity' : '1'}).animate({'opacity' : '0'}, 100, function(){
        // $('.pschedule-clipboard').animate({'width' : '80px'}, 200);
        $('.pschedule-clipboard').animate({'width' : '80px', 'height' : '80px', 'border-radius' : '50%', 'border-top-right-radius' : 'initial'}, 200, function(){
            $('.pschedule-clipboard-icon').css({'display': 'initial', 'opacity' : '0'}).animate({'opacity' : '1'}, 200, function(){
                $('.pschedule-clipboard').attr('status', 'closed');
            });
        });
    }).hide();
    
});
$('.pschedule-clipboard-addpschedule > button').click(function(){
    const name = $('.pschedule-clipboard-addpschedule > input').val();
    setpscheduleClipboard(name);
    $('.pschedule-clipboard-addpschedule > input').val('');
});








$(document).ready(function(){
    console.log('USER CLASS: ', ACCUSER);
    console.log("USER id: ", __ID);

    // PLANNING_DOCUMENTS = new PlanningDocs();
    // ACTUAL_DOCUMENTS = new ActualDocs();
    // console.log("Planning Docs: ", PLANNING_DOCUMENTS);
    // console.log("Actual Docs: ", ACTUAL_DOCUMENTS);

    // SCHEDULE_DOCUMENTS = new ScheduleDocs();
    // console.log("Documents: ", SCHEDULE_DOCUMENTS);
    
})

// var message = "You have not filled out the form.";
// window.onbeforeunload = function(event) {
//     var e = e || window.event;
//     if (e) {
//         e.returnValue = message;
//     }
//     return message;
// };

// window.onbeforeunload = confirmExit;
//     function confirmExit() {
//         return "Your unsaved data will be deleted once you leave this webpage. Are you sure you want to leave?";
//     }