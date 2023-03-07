let PLANNING_DOCUMENTS;
let ACTUAL_DOCUMENTS;
let SCHEDULE_DOCUMENTS;



class PlanningDocs{
    list = [];

    addNewDoc(newDoc){
        this.list.push(newDoc);
    }
    searchDocById(docid){
        for(let i=0;i<this.list.length;i++){
            if(this.list[i].id == docid){
                return this.list[i];
            }
        }
        return undefined;
    }
    searchDocByName(docname){
        for(let i=0;i<this.list.length;i++){
            if(this.list[i].name == docname){
                return this.list[i];
            }
        }
        return undefined;
    }
    getMilestoneDocs(){
        let tmpList = [];
        for(let i=0;i<this.list.length;i++){
            if(this.list[i].milestone != undefined){
                tmpList.push(this.list[i]);
            }
        }
        return tmpList;
    }
    fetchByProjectID(projid, sender){
        this.list = []; //empties out the list
        if(sender == 'pull-planning-documents'){
            api_fetchPlanningDocumentsByProjectId(projid, sender);
        }else if(sender == 'fetch-build-schedule'){
            // api_fetchBuildSchedule(projectid, 'fetch-build-schedule');

            console.log("New Planning Documents: ", this.list);
            console.log("Old Planning Documents: ", planningDocuments);
            
            this.initializeLinks();
            this.initializePredecessors();
        }
    }
    displayDocuments(board){
        if(board == 'status'){
            
            var tmpSD = document.getElementById("status-header-filter-fromdate").value; //from date
            var timeFrame = document.getElementById("statusBoard-selTime"); //to date
            var selFilter = document.getElementById("statusBoard-selFilter"); //display in order by (sd/ed/milestones...)
            
            var chosenSD = new Date(tmpSD);
            var today = new Date();
            var lastDate = new Date(tmpSD);

            //locations to place documents
            var draftLocation = $("#draftColumnNew");
            var reviewLocation = $("#reviewColumnNew");
            var approvalLocation =  $("#approvalColumnNew");
            var executionLocation =  $("#executionColumnNew");
            var postApprovalLocation =  $("#postApprovalColumnNew");
            
            // clears the locations
            draftLocation.empty();
            reviewLocation.empty();
            approvalLocation.empty();
            executionLocation.empty();
            postApprovalLocation.empty();
            
            // sets the end date restriction
            if(timeFrame.value == '1week'){
                lastDate.setDate(lastDate.getDate() + 7); //last date
            }else if(timeFrame.value == '2weeks'){
                lastDate.setDate(lastDate.getDate() + 14); //last date
            }else if(timeFrame.value == '1month'){
                lastDate.setMonth(lastDate.getMonth() + 1); //last date
            }else if(timeFrame.value == '2months'){
                lastDate.setMonth(lastDate.getMonth() + 2); //last date
            }else if(timeFrame.value == '4months'){
                lastDate.setMonth(lastDate.getMonth() + 4); //last date
            }else if(timeFrame.value == '6months'){
                lastDate.setMonth(lastDate.getMonth() + 6); //last date
            }else if(timeFrame.value == '1year'){
                lastDate.setFullYear(lastDate.getFullYear() + 1); //last date
            }else if(timeFrame.value == '2years'){
                lastDate.setFullYear(lastDate.getFullYear() + 2); //last date
            }else if(timeFrame.value == '4years'){
                lastDate.setFullYear(lastDate.getFullYear() + 4); //last date
            }else{
                console.log("timeFrame not selected. Last Date:", timeFrame);
            }
            
            if(selFilter.value == 'sd'){
                console.log('Displaying documents accoring to start dates')
                var i;
                var currentStage;
                var currentDoc;

                for(i=0;i<this.list.length;i++){
                    currentDoc = this.list[i];
                    currentStage = currentDoc.stage;
                    while(currentStage != undefined){
                        let tmpStartDate = new Date(currentStage.sd);
                        if(tmpStartDate >= chosenSD && tmpStartDate <= lastDate){
                            let startDate = currentStage.sd;
                            let endDate = currentStage.ed;
                            
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(startDate),
                                Date.parse(endDate),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            let docDiv = `<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${currentDoc.name}">${currentDoc.id}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${currentDoc.name}</span>
                                </div>
                                <span class="status-body-widget-dates" >${startDate} -> ${endDate}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${currentDoc.name}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`;
                    
                            // console.log('currentStage.name: ', currentStage.name);
                            if(currentStage.name == "Draft"){
                                draftLocation.append(docDiv);
                            }else if(currentStage.name == "Review"){
                                reviewLocation.append(docDiv);
                            }else if(currentStage.name == "Approval"){
                                approvalLocation.append(docDiv);
                            }else if(currentStage.name == "Execution"){
                                executionLocation.append(docDiv);
                            }else if(currentStage.name == "Post-Approval"){
                                postApprovalLocation.append(docDiv);
                            }

                        }
                        currentStage = currentStage.getNextStage();
                    }
                }
            }


        }
    }
    initializeLinks(){
        console.log("Initializing Links");
        var i;
        for(i =0;i<this.list.length;i++){
            var linkid = this.list[i].linkid;
            var linkstage = this.list[i].linkstage;
            var str = '#tasklist_' + this.list[i].id;
            // disables fields that are linked together
            if(linkstage != undefined && linkid != undefined && linkstage != '' && linkid != ''){
                if(linkstage == 'Draft'){
                    $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-drafted').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Review'){
                    $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-reviewed').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Approval'){
                    $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-approvaled').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Execution'){
                    $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-executioned').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Post-Approval'){
                    $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-postapprovaled').removeClass('editable').addClass('uneditable');
                }   
            }
            var j=0;
            for(j=0;j<this.list.length;j++){
                let newLink = new Link();
                if(j != i && this.list[j].linkid != undefined && this.list[j].linkid == linkid){
                    newLink.id = linkid;
                    newLink.stage = linkstage;
                    newLink.date = this.list[j].searchStage(linkstage).ed;
                    if(this.list[j].actualtitle == undefined){
                        newLink.docname = this.list[j].name;
                        newLink.docid = this.list[j].id;
                    }else{
                        newLink.docname = this.list[j].actualtitle;
                        newLink.docid = this.list[j].actualid;
                    }
                    this.list[i].appendLink(newLink);
                }
            }
        }

    }
    initializePredecessors(){
        var i;
        for(i=0;i<this.list.length;i++){
            var j;
            var producessorid = this.list[i].producessorid;
            var producessorstage = this.list[i].producessorstage;
            // var str = '#tasklist_' + this.list[i].id;
            // if(producessorstage != undefined){
            //     if(producessorstage == 'Draft'){
            //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-drafted').removeClass('editable').addClass('uneditable');
            //     }else if(producessorstage == 'Review'){
            //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-reviewed').removeClass('editable').addClass('uneditable');
            //     }else if(producessorstage == 'Approval'){
            //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-approvaled').removeClass('editable').addClass('uneditable');
            //     }else if(producessorstage == 'Execution'){
            //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-executioned').removeClass('editable').addClass('uneditable');
            //     }else if(producessorstage == 'Post-Approval'){
            //         $(str).children('.tasklist-widget-title').children('.tasklist-widget-dates-postapprovaled').removeClass('editable').addClass('uneditable');
            //     }
            // }

            for(j=0;j<this.list.length;j++){
                let newProducessor = new Producessor();
                if(j != i && this.list[j].producessorid != undefined && this.list[j].producessorid == producessorid){
                    newProducessor.id = producessorid;
                    newProducessor.stage = producessorstage;
                    newProducessor.date = this.list[j].searchStage(producessorstage).ed;
                    if(this.list[j].actualtitle == undefined){
                        newProducessor.docname =this.list[j].name;
                        newProducessor.docid = this.list[j].id;
                    }else{
                        newProducessor.docname = this.list[j].actualtitle;
                        newProducessor.docid = this.list[j].actualid;
                    }
                    this.list[i].appendProducessor(newProducessor);
                }
            }
        }
    }
    removeLink(docToDelete, docnamechosen){
        var i;
        for(i=0;i<this.list.length;i++){
            var doc = this.list[i];
    
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
                            let tmpDoc = PLANNING_DOCUMENTS.list.searchDocByName(docnamechosen);
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
    removePredecessor(doc, docToDelete){
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
    addLink(docToAdd, docLinkedTo){
        var i;
        var linkedToDoc = PLANNING_DOCUMENTS.list.searchDocByName(docLinkedTo);
        var addDoc = PLANNING_DOCUMENTS.list.searchDocByName(docToAdd);
        var chosenStage = $('#choose-link-stage').val();
    
        if(linkedToDoc != undefined && addDoc != undefined){
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
        
            console.log('planning documents: ', PLANNING_DOCUMENTS.list);
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
                s += 'approvaled';
            }else if(chosenStage == 'Execution'){
                s += 'executioned';
            }else{
                s += 'postapprovaled';
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
                var currentDoc = PLANNING_DOCUMENTS.list.searchDocByName(currentLink.docname);
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
        
    }
    addPred(docToAdd, docPredTo){
        var i;
        var predToDoc = PLANNING_DOCUMENTS.list.searchDocByName(docPredTo);
        var addDoc = PLANNING_DOCUMENTS.list.searchDocByName(docToAdd);
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
                s += 'approvaled';
            }else if(chosenStage == 'Execution'){
                s += 'executioned';
            }else{
                s += 'postapprovaled';
            }
            $(n).children('.tasklist-widget-title').children(s).val(highestDate);
            
            // console.log("Initially add Docname: "+ newPred.docname + " To docName: "+ predToDoc.name);
        }
    }
    updateLinkedDates(doc, stage, endDate){
        var chosenStage = doc.searchStage(stage);
        chosenStage.ed = endDate;
    
        var currentLink = doc.link;
        while(currentLink != undefined){
            let currentDoc = this.searchDocByName(currentLink.docname);
            if(currentDoc != undefined){
                let currentDocStage = currentDoc.searchStage(stage);
                currentDocStage.ed = endDate;
                currentLink.date = endDate;
                currentLink = currentLink.getNextLinkedDocument();
            }
        }
    }
    
}

class ActualDocs{
    list = [];

    addNewDoc(newDoc){
        this.list.push(newDoc);
    }
    searchDocById(docid){
        for(let i=0;i<this.list.length;i++){
            if(list[i].id == docid){
                return list[i];
            }
        }
        return undefined;
    }
    searchDocByName(docname){
        for(let i=0;i<this.list.length;i++){
            if(list[i].name == docname){
                return list[i];
            }
        }
        return undefined;
    }
    getMilestoneDocs(){
        let tmpList = [];
        for(let i=0;i<this.list.length;i++){
            if(list[i].milestone != undefined){
                tmpList.push(list[i]);
            }
        }
        return tmpList;
    }

    fetchByProjectID(projid){
        this.list = [] //empties out the list
        api_fetchActualDocumentsByProjectId(projid, 'pull-actual-documents');
    }
    
    displayDocuments(board){
        if(board == 'status'){
            
            var tmpSD = document.getElementById("status-header-filter-fromdate").value; //from date
            var timeFrame = document.getElementById("statusBoard-selTime"); //to date
            var selFilter = document.getElementById("statusBoard-selFilter"); //display in order by (sd/ed/milestones...)
            
            var chosenSD = new Date(tmpSD);
            var today = new Date();
            var lastDate = new Date(tmpSD);

            //locations to place documents
            var draftLocation = $("#draftColumnNew");
            var reviewLocation = $("#reviewColumnNew");
            var approvalLocation =  $("#approvalColumnNew");
            var executionLocation =  $("#executionColumnNew");
            var postApprovalLocation =  $("#postApprovalColumnNew");
            
            // clears the locations
            draftLocation.empty();
            reviewLocation.empty();
            approvalLocation.empty();
            executionLocation.empty();
            postApprovalLocation.empty();
            
            // sets the end date restriction
            if(timeFrame.value == '1week'){
                lastDate.setDate(lastDate.getDate() + 7); //last date
            }else if(timeFrame.value == '2weeks'){
                lastDate.setDate(lastDate.getDate() + 14); //last date
            }else if(timeFrame.value == '1month'){
                lastDate.setMonth(lastDate.getMonth() + 1); //last date
            }else if(timeFrame.value == '2months'){
                lastDate.setMonth(lastDate.getMonth() + 2); //last date
            }else if(timeFrame.value == '4months'){
                lastDate.setMonth(lastDate.getMonth() + 4); //last date
            }else if(timeFrame.value == '6months'){
                lastDate.setMonth(lastDate.getMonth() + 6); //last date
            }else if(timeFrame.value == '1year'){
                lastDate.setFullYear(lastDate.getFullYear() + 1); //last date
            }else if(timeFrame.value == '2years'){
                lastDate.setFullYear(lastDate.getFullYear() + 2); //last date
            }else if(timeFrame.value == '4years'){
                lastDate.setFullYear(lastDate.getFullYear() + 4); //last date
            }else{
                console.log("timeFrame not selected. Last Date:", timeFrame);
            }
            
            if(selFilter.value == 'sd'){
                console.log('Displaying documents accoring to start dates')
                var i;
                var currentStage;
                var currentDoc;

                for(i=0;i<this.list.length;i++){
                    currentDoc = this.list[i];
                    currentStage = currentDoc.stage;
                    while(currentStage != undefined){
                        let tmpStartDate = new Date(currentStage.sd);
                        if(tmpStartDate >= chosenSD && tmpStartDate <= lastDate){
                            let startDate = currentStage.sd;
                            let endDate = currentStage.ed;
                            if(currentStage.getPreviousStage() != undefined && currentStage.getPreviousStage().timestamp != undefined){
                                startDate = currentStage.getPreviousStage().timestamp;
                            }
                            if(currentStage.getNextStage() != undefined && currentStage.getNextStage().timestamp != undefined){
                                endDate = currentStage.getNextStage().timestamp;
                            }
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(startDate),
                                Date.parse(endDate),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            let docDiv;
                            if(startDate < currentStage.sd){
                                docDiv = `<div class="status-body-widget ahead">
                                    <span class="status-body-widget-id" title="${currentDoc.name}">${currentDoc.id}</span>
                                    <div class="status-body-widget-name">
                                        <span class="status-body-widget-name-title" >${currentDoc.name}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${startDate} -> ${endDate}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                        <i class="fas fa-link status-body-widget-mapid" title="${currentDoc.name}"></i>
                                        <i class="fas fa-id-card-alt" title="${currentDoc.ownerid}"></i>
                                        <i class="fas fa-exclamation-triangle" title="Send Warning Message to User"></i>
                                        <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`;
                            }else if(currentStage.timestamp == undefined && new Date(endDate) == today){
                                docDiv = `<div class="status-body-widget delayed">
                                    <span class="status-body-widget-id" title="${currentDoc.name}">${currentDoc.id}</span>
                                    <div class="status-body-widget-name">
                                        <span class="status-body-widget-name-title" >${currentDoc.name}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${startDate} -> ${endDate}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                        <i class="fas fa-link status-body-widget-mapid" title="${currentDoc.name}"></i>
                                        <i class="fas fa-id-card-alt" title="${currentDoc.ownerid}"></i>
                                        <i class="fas fa-exclamation-triangle" title="Send Warning Message to User"></i>
                                        <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`;
                            }else if(currentStage.timestamp == undefined && today > new Date(endDate)){
                                docDiv = `<div class="status-body-widget late">
                                    <span class="status-body-widget-id" title="${currentDoc.name}">${currentDoc.id}</span>
                                    <div class="status-body-widget-name">
                                        <span class="status-body-widget-name-title" >${currentDoc.name}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${startDate} -> ${endDate}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                        <i class="fas fa-link status-body-widget-mapid" title="${currentDoc.name}"></i>
                                        <i class="fas fa-id-card-alt" title="${currentDoc.ownerid}"></i>
                                        <i class="fas fa-exclamation-triangle" title="Send Warning Message to User"></i>
                                        <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`;
                            }else{
                                docDiv = `<div class="status-body-widget ontime">
                                    <span class="status-body-widget-id" title="${currentDoc.name}">${currentDoc.id}</span>
                                    <div class="status-body-widget-name">
                                        <span class="status-body-widget-name-title" >${currentDoc.name}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${startDate} -> ${endDate}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                        <i class="fas fa-link status-body-widget-mapid" title="${currentDoc.name}"></i>
                                        <i class="fas fa-id-card-alt" title="${currentDoc.ownerid}"></i>
                                        <i class="fas fa-exclamation-triangle" title="Send Warning Message to User"></i>
                                        <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`;
                            }
                            
                            // console.log('currentStage.name: ', currentStage.name);
                            if(currentStage.name == "Draft"){
                                draftLocation.append(docDiv);
                            }else if(currentStage.name == "Review"){
                                reviewLocation.append(docDiv);
                            }else if(currentStage.name == "Approval"){
                                approvalLocation.append(docDiv);
                            }else if(currentStage.name == "Execution"){
                                executionLocation.append(docDiv);
                            }else if(currentStage.name == "Post-Approval"){
                                postApprovalLocation.append(docDiv);
                            }

                        }
                        currentStage = currentStage.getNextStage();
                    }
                }
            }


        }
    }
    
}

class Doc{
    name = undefined;
    id = undefined;

    // linkid = undefined;
    // linkstage = undefined;
    producessorid = undefined;
    producessorstage = undefined;

    project = undefined; // this has to be a project class
    stage = undefined; // this has to be a stage class
    task = undefined;
    link = undefined;
    producessor = undefined;
    
    exectutioned = undefined;

    milestone = undefined;

    //used for actual documents ONLY
    ownerid = undefined;
    status = undefined;
    mapid = undefined;

    list = [];
    constructor(name){
        this.name = name;
    }
    checkLink(){
        return this.link;
    }
    checkProdecessor(){
        return this.producessor;
    }
    appendLink(newLink){
        let currentLink = this.link;
        let prevLink = undefined;
        if(currentLink == undefined){
            this.link = newLink;
            this.linkid = newLink.id;
            this.linkstage = newLink.stage;
        }else{
            while (currentLink != undefined){
                prevLink = currentLink;
                currentLink = currentLink.getNextLinkedDocument();
            }
            prevLink.setNextLinkedDocument(newLink);
            newLink.setPreviousLinkedDocument(prevLink);
        }
        
    }
    appendProducessor(newPred){
        let currentPred = this.producessor;
        let prevPred = undefined;
        if(currentPred == undefined){
            this.producessor = newPred;
            this.producessorid = newPred.id;
            this.producessorstage = newPred.stage;
        }else{
            while (currentPred != undefined){
                prevPred = currentPred;
                currentPred = currentPred.getNextProducessorDocument();
            }
            prevPred.setNextProducessorDocument(newPred);
            newPred.setPreviousProducessorDocument(prevPred);
        }
        
    }
    appendTask(newTask){
        let currentTask = this.task;
        let prevTask = undefined;
        if(currentTask == undefined){
            this.task = newTask;
        }else{
            while (currentTask != undefined){
                prevTask = currentTask;
                currentTask = currentTask.getNextTask();
            }
            prevTask.setNextTask(newTask);
            newTask.setPreviousTask(prevTask);
        }
        
    }
    searchStage(stagename){
        let currentStage = this.stage;
        while (currentStage != undefined){
            if(currentStage.name == stagename){
                return currentStage;
            }
            currentStage = currentStage.getNextStage();
        }
        return currentStage;
    }
    searchTask(taskid){
        let currentTask = this.task;
        while (currentTask != undefined){
            if(currentTask.id == taskid){
                return currentTask;
            }
            currentTask = currentTask.getNextTask();
        }
        return currentTask;
    }
    searchLink(docName){
        var currentLink = this.link;
        while (currentLink != undefined){
            if(currentLink.docname == docName){
                return currentLink;
            }
            currentLink = currentLink.getNextLinkedDocument();
        }
        return currentLink;
    }
    searchPred(docName){
        var currentPred = this.producessor;
        while (currentPred != undefined){
            if(currentPred.docname == docName){
                return currentPred;
            }
            currentPred = currentPred.getNextProducessorDocument();
        }
        return currentPred;
    }
    
    
}

class Stage{
    name = undefined;
    sd = undefined;
    ed = undefined;
    days = undefined;
    timestamp = undefined; //records date when the stage was completed

    _last = undefined;
    _next = undefined;

    list = [];
    constructor(zname){
        this.name = zname;
    }
    getNextStage(){
        return this._next;
    }
    getPreviousStage(){
        return this._last;
    }
    setNextStage(newNextStage){
        this._next = newNextStage;
    }
    setPreviousStage(newPreviousStage){
        this._last = newPreviousStage;
    }
}

class Link{
    stage = undefined;
    date = undefined;
    docname = undefined;
    id = undefined;

    // will be used to identify if this link needs to be deleted or not
    status = undefined; 

    _last = undefined;
    _next = undefined;

    list = [];
    constructor(zdocname, zstage){
        this.docname = zdocname;
        this.stage = zstage;
    }
    getNextLinkedDocument(){
        return this._next;
    }
    getPreviousLinkedDocument(){
        return this._last;
    }
    setNextLinkedDocument(newDoc){
        this._next = newDoc;
    }
    setPreviousLinkedDocument(newDoc){
        this._last = newDoc;
    }
   
}

class Producessor{
    stage = undefined;
    date = undefined;
    docname = undefined;
    docid = undefined;
    id = undefined;

    _last = undefined;
    _next = undefined;

    list = [];
    constructor(zstage){
        this.stage = zstage;
    }
    getNextProducessorDocument(){
        return this._next;
    }
    getPreviousProducessorDocument(){
        return this._last;
    }
    setNextProducessorDocument(newDoc){
        this._next = newDoc;
    }
    setPreviousProducessorDocument(newDoc){
        this._last = newDoc;
    }
}

class Task{
    id = undefined;
    name = undefined;
    status = undefined;
    sd = undefined;
    ed = undefined;

    documentid = undefined;
    documentname = undefined;

    _last = undefined;
    _next = undefined;
    
    list = [];
    constructor(zname){
        this.name = zname;
    }
    getNextTask(){
        return this._next;
    }
    getPreviousTask(){
        return this._last;
    }
    setNextTask(nextTask){
        this._next = nextTask;
    }
    setPreviousTask(lastTask){
        this._last = lastTask;
    }
    
}

// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------
class ScheduleDocument{
    constructor(options){
        this.list = this.fetch(options);
        this.initializeLinkPred();
    }
    fetch(options){
    let list = [];
        const cbsuccess=data=>{
            let dis = this;
            $.each(data, function(key, value){
                let obj = [];
                if(value != 'error'){
                    // console.log("Value: ", value);
                    let ed = '';
                    if(value.postapprovaled == "" || value.postapprovaled == undefined || value.postapprovaled == null){
                        ed = value.approvaled;
                    }else{
                        ed = value.postapprovaled;
                    }
                    obj = {
                        'projectid' : value.projectid,
                        'docid' : value.planningid, 
                        'title' : value.planningtitle, 
                        'draftsd' : value.draftsd,
                        'drafted' : value.drafted,
                        'reviewed' : value.reviewed,
                        'approvaled' : value.approvaled,
                        'executioned' : value.executioned,
                        'postapprovaled' : value.postapprovaled,
                        'startdate' : value.draftsd,
                        'enddate' : ed,
                        'mapid' : value.mapid,
                        'milestone' : value.milestone,
                        'linkid' : value.linkid,
                        'linkstage' : value.linkstage,
                        'predecessorid' : value.producessorid,
                        'predecessorstage' : value.producessorstage,
                    };
                    const newDoc = new NewDoc(obj);
                    list[list.length] = newDoc;
                }
            });
        }
        const cbcomplete =()=>{
            // this.initializeLinkPred();
            options.callback('Fetching Schedule Document');
        }
        // capi_fetchPlanningDocumentByProjectId(options, cbsuccess, cbcomplete);  
        capi_fetchPlanningDocuments(options, cbsuccess, cbcomplete)
        
        return list;
    }
    initializeLinkPred(){
        console.log("Initializing Links and Predecessors");
        var dis = this;
        $.each(this.list, function(key, value){
            let linkid = value.linkid;
            let linkstage = value.linkstage;
            
            //disable editing if linked at a stage
            if(linkstage != undefined && linkid != undefined && linkstage != null && linkid != null && linkstage != '' && linkid != ''){
                if(linkstage == 'Draft'){
                    $('#pschedulelist_'+value.planningid).children('.pschedulelist-widget-title').children('.pschedulelist-widget-dates-drafted').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Review'){
                    $('#pschedulelist_'+value.planningid).children('.pschedulelist-widget-titlee').children('.pschedulelist-widget-dates--reviewed').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Approval'){
                    $('#pschedulelist_'+value.planningid).children('.pschedulelist-widget-titlee').children('.pschedulelist-widget-dates--approvaled').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Execution'){
                    $('#pschedulelist_'+value.planningid).children('.pschedulelist-widget-titlee').children('.pschedulelist-widget-dates--executioned').removeClass('editable').addClass('uneditable');
                }else if(linkstage == 'Post-Approval'){
                    $('#pschedulelist_'+value.planningid).children('.pschedulelist-widget-titlee').children('.pschedulelist-widget-dates--postapprovaled').removeClass('editable').addClass('uneditable');
                }   
            }

            value.link = new NewLink();
            
            // console.log('Main Loop: ', value);
            // console.log('Doc name: ', value.planningtitle);
            // console.log('Linkid: ', linkid);
            // console.log('Link Stage: ', linkstage);

            $.each(dis.list, function(key, tmpvalue){
                let tmplinkid = tmpvalue.linkid;
                let tmplinkstage = tmpvalue.linkstage;

                
                // console.log('Inner Loop: ', tmpvalue);
                // console.log('Doc name: ', tmpvalue.planningtitle);
                // console.log('Linkid: ', tmplinkid);
                // console.log('Link Stage: ', tmplinkstage);

                if(tmpvalue.docid != value.docid && tmpvalue.docid != "nst" && value.linkid != undefined && tmpvalue.linkid == value.linkid){
                    let ed = undefined;
                    if(value.linkstage == 'Draft'){
                        ed = value.drafted;
                    }else if(value.linkstage == 'Review'){
                        ed = value.reviewed;
                    }else if(value.linkstage == 'Approval'){
                        ed = value.approvaled;
                    }else if(value.linkstage == 'Execution'){
                        ed = value.exectutioned;
                    }else if(value.linkstage == 'Post-Approval'){
                        ed = value.postapprovaled;
                    }   
                    let tmp = {
                        "linkid" : tmpvalue.linkid,
                        "linkstage" : tmpvalue.linkstage,
                        "planningid" : tmpvalue.docid,
                        "planningtitle" : tmpvalue.title,
                        "enddate" : value[value.linkstage]
                    };
                    value.link.addLink(tmp);
                    
                }

            });

            value.predecessor = new NewPredecessor();
            value.predecessor.fetch(value);
        });

        

    }
    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'docid' : options.docid,
                'projectid' : options.projectid,
                'title' : options.title,
                'approvaled' : options.approvaled,
                'draftsd' : options.draftsd,
                'drafted' : options.drafted,
                'reviewed' : options.reviewed,
                'executioned' : options.executioned,
                'postapprovaled' : options.postapprovaled
            }
            const zobj = new NewDoc(obj);
            zobj.link = new NewLink();
            zobj.predecessor = new NewPredecessor();
            
            this.list[this.list.length] = zobj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createPlanningDocument(options, cbsuccess, cbcomplete);
    }
    update(options, callback){
        let obj = this.list.find(obj => obj.docid == options.docid);
        const cbsuccess=data=>{
            console.log(data, obj);
            obj.approvaled = options.approvaled,
            obj.draftsd = options.draftsd,
            obj.drafted = options.drafted,
            obj.reviewed = options.reviewed,
            obj.executioned = options.executioned,
            obj.postapprovaled = options.postapprovaled
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updatePlanningDocumentDates(options, cbsuccess, cbcomplete);
    }
    delete(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const zdata = $.grep(this.list, function(e){ 
                return e.getDocid() != options.docid; 
            });
            this.list = zdata;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deletePlanningDocument(options, cbsuccess, cbcomplete);
    }
    getList(){
        return this.list;
    }
    getObjByDocId(planid){
        return this.list.find(obj => obj.getDocid() == planid);
    }
    getDocByPlanningId(planid){
        return this.list.find(obj => obj.docid == planid);
    }
    getDocByPlanningTitle(plantitle){
        return this.list.find(obj => obj.title == plantitle);
    }
    addToUi(location){
        if(location == 'new-schedule-schedule'){
            console.log("over here: ", this.list.length);
            $('.pschedulelist-widget-con').empty();

            $.each(this.list, function(key, value){
                if(value.planningid != "nst"){
                    $('.pschedulelist-widget-con').append(`
                        <div id="pschedulelist_${value.planningid}" class="pschedulelist-widget color-sc">
                            <div status="closed"  class="pschedulelist-widget-title">
                                <i status="bars" class="fas fa-bars handle pschedulelist-widget-addpschedule"></i>
                                <span id = '${value.planningid}'>${value.planningtitle}</span>
                                <input class="pschedulelist-widget-dates-draftsd editable" value="${value.draftsd}" type="date" disabled>
                                <input class="pschedulelist-widget-dates-drafted editable" value="${value.drafted}" type="date" disabled>
                                <input class="pschedulelist-widget-dates-reviewed editable" value="${value.reviewed}" type="date" disabled>
                                <input class="pschedulelist-widget-dates-approvaled editable" value="${value.approvaled}" type="date" disabled>
                                <input class="pschedulelist-widget-dates-executioned editable" value="${value.executioned}" type="date" disabled>
                                <input class="pschedulelist-widget-dates-postapprovaled editable" value="${value.postapprovaled}" type="date" disabled>
                                <i class="fas fa-edit handler-icon"></i>
                                <i class="fas fa-link handler-icon"></i>
                                <i class="fas fa-paperclip handler-icon"></i>
                            </div>
                        </div>
                    `);
                    $('.pschedulelist-widget').droppable(docListDropOption1);
                }
            });


            $('.pschedulelist-widget-con').append(`
            <div id="pschedulelist_nst" class="pschedulelist-widget color-sc">
                <div status="closed" class="pschedulelist-widget-title">
                    <i status="bars" class="fas fa-bars handle pschedulelist-widget-addpschedule"></i>
                    <span>Non Specified Task</span>
                    
                </div>
            </div>`);
            $('.pschedulelist-widget').droppable(docListDropOption1);
        }
        
    }
    saveSchedule(planid, draftsd, drafted, reviewed, approvaled, executioned, postapprovaled){
        let doc = this.getDocByPlanningId(planid); 
        console.log("Finding Doc: ", doc);
        if(doc != undefined && doc != null){
            doc.draftsd = draftsd;
            doc.drafted = drafted;
            doc.reviewed = reviewed;
            doc.approvaled = approvaled;
            doc.executioned = executioned;
            doc.postapprovaled = postapprovaled;

            capi_updatePlanningScheduleByDocId(planid,doc.draftsd,doc.drafted, doc.reviewed, doc.approvaled, doc.executioned, doc.postapprovaled, doc.linkid, doc.linkstage, doc.predecessorid, doc.predecessorstage);
        }
    }
    fillLinkDocSelect(selecttag, currentplanid){
        selecttag.empty();
        // console.log('Select should be empty');
        let doc = this.getDocByPlanningId(currentplanid);
        $.each(this.list, function(key, value){
            if(doc.link!=undefined || doc.link.list.length >0){
                let found = doc.link.searchDocById(value.docid);
                if(value.docid != currentplanid && found == undefined  && value.docid != "nst"){
                    selecttag.append(`
                    <option value="${value.title}">${value.title}</option>`);
                }
            }
            
        });
    }
    fillPredDocSelect(selecttag, currentplanid){
        selecttag.empty();
        // console.log('Select should be empty');
        let doc = this.getDocByPlanningId(currentplanid);
        $.each(this.list, function(key, value){
            // console.log('value', value);
            if(doc.predecessor != undefined && doc.predecessor.list != undefined && doc.predecessor.list.length != 0){
                // console.log('pred not empty');
                let found = doc.predecessor.searchDocById(value.docid);
                if(value.docid != currentplanid && found == undefined  && value.docid != "nst"){
                    // console.log('select tag adjusted');
                    selecttag.append(`
                    <option value="${value.title}">${value.title}</option>`);
                }
            }else{
                console.log('pred empty');
                if(value.docid != currentplanid && value.docid != "nst"){
                    // console.log('select tag adjusted');
                    selecttag.append(`
                    <option value="${value.title}">${value.title}</option>`);
                }
            }
        });
    }
    remove(projid, planid, complete=()=>{}){
        console.log("remove triggered");
        let i =0;
        $.each(this.list, function(key, value){
            // console.log(this.list.indexOf(value));
            if(value.planningid == planid){
                console.log('VAlue', i);
                this.list.splice(this.list.indexOf(value),1);
            }
            i++;
        });
        console.log(this.list);
        // complete();
    }
    getLinkedDocuments(planid){
        let doc = this.getDocByPlanningId(planid);
        if(doc != undefined && doc != null){
            return doc.link.getLinks();
        }else{
            return undefined;
        }
    }
    addNewLink(currentDoc, docToAdd, stage){
        let currentdoc = this.getDocByPlanningTitle(currentDoc);
        let doctoadd = this.getDocByPlanningTitle(docToAdd);
        let dis = this;
        let obj1 = [];

        console.log('CurrentDoc: ', currentdoc);
        console.log('doctoadd: ', doctoadd);
        

        if(currentdoc != undefined && doctoadd != undefined){
            let lid = undefined;
            let lstage = stage;
            let ed = undefined;
            
            let clink = currentdoc.link;
            let alink = doctoadd.link;

            // defines the linkid
            if(currentdoc.linkid != undefined && doctoadd.linkid == undefined){
                lid = currentdoc.linkid;
            }else if(currentdoc.linkid == undefined && doctoadd.linkid == undefined){
                lid = generateLinkID();
            }else{
                lid = doctoadd.linkid;
            }

            if(doctoadd[lstage] > currentdoc[lstage]){
                ed = doctoadd[lstage];
            }else{
                ed = currentdoc[lstage];
            }
            console.log('ED: ', ed);

            doctoadd.linkid = lid;
            currentdoc.linkid = lid;
            
            doctoadd.linkstage = stage;
            currentdoc.linkstage = stage;
            
            doctoadd[lstage] = ed;
            currentdoc[lstage] = ed;

            // assigns the new doc as link to the current doc
            obj1 = {
                "planningid" : doctoadd.docid,
                "planningtitle" : doctoadd.title,
                "linkid" : lid,
                "linkstage" : lstage,
                "enddate" : ed
            }
            let obj2 = {
                "planningid" : currentdoc.docid,
                "planningtitle" : currentdoc.title,
                "linkid" : lid,
                "linkstage" : lstage,
                "enddate" : ed
            }

            if(currentdoc.link == undefined){
                currentdoc.link = new NewLink();
            }

            if(alink == undefined){
                doctoadd.link = new NewLink();
            }

            
            if(currentdoc.link.list.length == 0 && doctoadd.link.list.length != 0){
                //all the link(s) of the currentDoc to newdoc
                $.each(alink.list, function(key, value){
                    value.enddate = ed;
                    
                    let tmpdoc = dis.getDocByPlanningId(value.planningid);
                    if(tmpdoc != undefined){
                        tmpdoc[lstage] = ed;
                        tmpdoc.link.addLink(obj2);

                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).val(ed);
                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).removeClass('editable').addClass('uneditable');

                    }
                    currentdoc.link.addLink(value);
                });

            }else if(doctoadd.link.list.length == 0 && currentdoc.link.list.length != 0){
                //all the link(s) of the currentDoc to newdoc
                $.each(clink.list, function(key, value){
                    value.enddate = ed;
                    
                    let tmpdoc = dis.getDocByPlanningId(value.planningid);
                    if(tmpdoc != undefined){
                        tmpdoc[lstage] = ed;
                        tmpdoc.link.addLink(obj1);

                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).val(ed);
                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).removeClass('editable').addClass('uneditable');

                    }
                    doctoadd.link.addLink(value);
                });

            }
            clink.addLink(obj1);
            currentdoc.createLink(obj1);
            
            alink.addLink(obj2);
            doctoadd.createLink(obj2);

            $(`#preqtasklist_${currentdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).val(ed);
            $(`#preqtasklist_${currentdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).removeClass('editable').addClass('uneditable');
        
        }

        return obj1;
        
    }
    addNewPred(currentDoc, docToAdd, stage){
        console.log(currentDoc, docToAdd, stage);

        let currentdoc = this.getDocByPlanningTitle(currentDoc);
        let doctoadd = this.getDocByPlanningTitle(docToAdd);
        let dis = this;
        let obj = [];
        
        console.log('CurrentDoc: ', currentdoc);
        console.log('doctoadd: ', doctoadd);
        
        if(currentdoc != undefined && doctoadd != undefined){
            let pid = undefined;
            let pstage = stage;
            let startstage = pstage.slice(0,-2) + "sd";
            let sd = undefined;
            let ed = doctoadd[pstage];
            
            let cpred = currentdoc.pred;

            // defines the predid
            console.log(currentdoc.predecessorid);
            if(currentdoc.predecessorid == undefined || currentdoc.predecessorid == null){
                pid = generateProducessorID();
            }else{
                pid = currentdoc.predecessorid;
            }

            if(currentdoc[startstage] < doctoadd[pstage]){
                currentdoc[startstage] = doctoadd[pstage];
            }
            console.log('ED: ', ed);

            doctoadd.predid = pid;
            currentdoc.predid = pid;
            
            doctoadd[pstage] = ed;
            currentdoc[pstage] = ed;

            // assigns the new doc as pred to the current doc
            obj = {
                'predecessorid' : pid,
                'docid' : currentdoc.docid,
                'title' : currentdoc.title,
                'stage' : pstage,
                'preddocid' : doctoadd.docid,
                'preddoctitle' : doctoadd.title,
                'prevdate' : undefined,
                'enddate' : ed
            }

            currentdoc.predecessor.addPred(obj);
            currentdoc.createPredecessor(obj);
            currentdoc.predecessorid = pid;
        }


        return obj;
    }
    removeLink(removeid, success=()=>{}){
        const dis = this;
        $.each(this.list, function(key, value){
            console.log('VAlue: ', value);
            if(value.docid == removeid){
                let obj={
                    'linkid': value.linkid,
                    'docid': value.docid,
                    'stage' : value.linkstage
                };
                console.log('Object: ', obj);
                const cbsuccess=data=>{
                    value.linkid = undefined;
                    value.linkstage = undefined;
                    value.link = new NewLink();
                    success(data);
                };
                capi_deleteDocumentLink(obj, cbsuccess);
            }else{
                if(value.link != undefined){
                    let removed = value.link.removeDoc(removeid);
                    console.log('Removed: ', removed);

                    if(value.link.list.length == 0){
                        let obj={
                            'linkid': value.linkid,
                            'docid': value.docid,
                            'stage' : value.linkstage
                        };
                        console.log('Object: ', obj);
                        const cbsuccess=data=>{
                            value.linkid = undefined;
                            value.linkstage = undefined;
                            success(data);
                        };
                        capi_deleteDocumentLink(obj, cbsuccess);
                    }
                }
            }
        });
        
    }
    removePred(currentdoc, removeid){
        const dis = this;
        let doc = this.getDocByPlanningTitle(currentdoc);

        if(doc!= undefined){
            let preds = doc.predecessor;
            if(preds != undefined && preds.list != undefined){
                const cbcomplete=()=>{
                    if (preds.list == undefined || preds.list.length == 0){
                        doc.predecessorid = undefined;
                        doc.predecessorstage = undefined;
                    }
                };
                
                let removed = preds.removeDoc(removeid, cbcomplete);
                console.log("Pred delete: ", removed);
            }
        }

        
        
    }

    makeMilestone(planid){
        let doc = this.getDocByPlanningId(planid);
        if(doc != undefined){
            doc.milestone = true;
        }
        
        capi_updateMilestone(planid);
    }
    removeMilestone(planid){
        let doc = this.getDocByPlanningId(planid);
        if(doc != undefined){
            doc.milestone = undefined;
        }
        capi_deleteMilestone(planid);
    }

    getDocsByLinkid(linkid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.linkid == linkid){
                list.push(value);
            }
        });
        return list;
    }
    displayDocuments(location){
        if(location == 'active-proj-document-view-planning'){
            console.log('will display planning documents here');

            var startdate = $('#status-header-filter-fromdate').val(); //from date
            var timeFrame = $('#statusBoard-selTime').val(); //to date
            var selFilter = $('#statusBoard-selFilter').val(); //display in order by (sd/ed/milestones...)
            
            var chosenSD = new Date(startdate);
            var today = new Date();
            var lastDate = new Date(startdate);

           
            // sets the end date restriction
            if(timeFrame == '1week'){
                lastDate.setDate(lastDate.getDate() + 7); //last date
            }else if(timeFrame == '2weeks'){
                lastDate.setDate(lastDate.getDate() + 14); //last date
            }else if(timeFrame == '1month'){
                lastDate.setMonth(lastDate.getMonth() + 1); //last date
            }else if(timeFrame == '2months'){
                lastDate.setMonth(lastDate.getMonth() + 2); //last date
            }else if(timeFrame == '4months'){
                lastDate.setMonth(lastDate.getMonth() + 4); //last date
            }else if(timeFrame == '6months'){
                lastDate.setMonth(lastDate.getMonth() + 6); //last date
            }else if(timeFrame == '1year'){
                lastDate.setFullYear(lastDate.getFullYear() + 1); //last date
            }else if(timeFrame == '2years'){
                lastDate.setFullYear(lastDate.getFullYear() + 2); //last date
            }else if(timeFrame == '4years'){
                lastDate.setFullYear(lastDate.getFullYear() + 4); //last date
            }else{
                console.log("timeFrame not selected. Last Date:", timeFrame);
            }
            
            $("#draftColumnNew").empty();
            $("#reviewColumnNew").empty();
            $('#approvalColumnNew').empty();
            $("#executionColumnNew").empty();
            $("#postApprovalColumnNew").empty();
                
            
            if(selFilter == 'sd'){
                console.log('Filter: Start Date');
                $.each(this.list, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    
                    if(new Date(value.draftsd) > chosenSD && new Date(value.draftsd) < lastDate){
                        tmpSD = value.draftsd;
                        tmpED = new Date(value.drafted);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.drafted) > chosenSD && new Date(value.drafted) < lastDate){
                        tmpSD = new Date(value.drafted);
                        tmpED = new Date(value.reviewed);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.reviewed) > chosenSD && new Date(value.reviewed) < lastDate){
                        tmpSD = new Date(value.reviewed); 
                        tmpED = new Date(value.approvaled); 
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.approvaled) > chosenSD && new Date(value.approvaled) < lastDate){
                        tmpSD = new Date(value.approvaled);
                        tmpED = new Date(value.executioned);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.executioned) > chosenSD && new Date(value.executioned) < lastDate){
                        tmpSD = new Date(value.executioned);
                        tmpED = new Date(value.postapprovaled);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                });
            }else if(selFilter == 'ed'){
                console.log('Filter: End Date');
                $.each(this.list, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    
                    if(new Date(value.drafted) > chosenSD && new Date(value.drafted) < lastDate){
                        tmpSD = value.draftsd;
                        tmpED = new Date(value.drafted);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.reviewed) > chosenSD && new Date(value.reviewed) < lastDate){
                        tmpSD = new Date(value.drafted);
                        tmpED = new Date(value.reviewed);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.approvaled) > chosenSD && new Date(value.approvaled) < lastDate){
                        tmpSD = new Date(value.reviewed); 
                        tmpED = new Date(value.approvaled); 
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.executioned) > chosenSD && new Date(value.executioned) < lastDate){
                        tmpSD = new Date(value.approvaled);
                        tmpED = new Date(value.executioned);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                    if(new Date(value.postapprovaled) > chosenSD && new Date(value.postapprovaled) < lastDate){
                        tmpSD = new Date(value.executioned);
                        tmpED = new Date(value.postapprovaled);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                });
            }else if(selFilter == 'stage'){
                console.log('Filter: Stage');
                $.each(this.list, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    
                    if(new Date(value.draftsd) > chosenSD && new Date(value.draftsd) < lastDate){
                        tmpSD = value.draftsd;
                        tmpED = new Date(value.drafted);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }else if(new Date(value.drafted) >= chosenSD && new Date(value.drafted) < lastDate){
                        tmpSD = new Date(value.drafted);
                        tmpED = new Date(value.reviewed);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }else if(new Date(value.reviewed) >= chosenSD && new Date(value.reviewed) < lastDate){
                        tmpSD = new Date(value.reviewed); 
                        tmpED = new Date(value.approvaled); 
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }else if(new Date(value.approvaled) >= chosenSD && new Date(value.approvaled) < lastDate){
                        tmpSD = new Date(value.approvaled);
                        tmpED = new Date(value.executioned);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }else if(new Date(value.executioned) >= chosenSD && new Date(value.executioned) < lastDate){
                        tmpSD = new Date(value.executioned);
                        tmpED = new Date(value.postapprovaled);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                            <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                            <div class="status-body-widget-name">
                            <span class="status-body-widget-name-title" >${value.title}</span>
                            </div>
                            <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                            <span class="status-body-widget-when" >${when}</span>
                            <div class="status-body-widget-icons-con">
                            <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                            <i status="name" class="fas fa-clone id-name-switch" ></i>
                            </div>
                        </div>`);
                
                    }
                });
            }else if(selFilter == 'milestone'){
                console.log('Filter: Milestone');
                $.each(this.list, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    if(value.milestone){
                        if(new Date(value.draftsd) > chosenSD && new Date(value.draftsd) < lastDate){
                            tmpSD = value.draftsd;
                            tmpED = new Date(value.drafted);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(today),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                    
                        }else if(new Date(value.drafted) >= chosenSD && new Date(value.drafted) < lastDate){
                            tmpSD = new Date(value.drafted);
                            tmpED = new Date(value.reviewed);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(today),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                    
                        }else if(new Date(value.reviewed) >= chosenSD && new Date(value.reviewed) < lastDate){
                            tmpSD = new Date(value.reviewed); 
                            tmpED = new Date(value.approvaled); 
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(today),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                    
                        }else if(new Date(value.approvaled) >= chosenSD && new Date(value.approvaled) < lastDate){
                            tmpSD = new Date(value.approvaled);
                            tmpED = new Date(value.executioned);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(today),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                    
                        }else if(new Date(value.executioned) >= chosenSD && new Date(value.executioned) < lastDate){
                            tmpSD = new Date(value.executioned);
                            tmpED = new Date(value.postapprovaled);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(today),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                    
                        }
                    }
                });
            }



            
        }



        
    }
    updateMapId(docid, planid){
        let obj = this.list.find(obj => obj.docid == docid);
        if(obj != undefined){
            obj.mapid = planid;
        }
    }




    
}

class ActualDocument{
    constructor(options){
        this.list = this.fetch(options);
        this.initializeLinkPred();
    }
    fetch(options){
    let list = [];
        const cbsuccess=data=>{
            let dis = this;
            $.each(data, function(key, value){
                let obj = [];
                if(value != 'error'){
                    // console.log("Value: ", value);
                    let ed = '';
                    if(value.postapprovaled == "" || value.postapprovaled == undefined || value.postapprovaled == null){
                        ed = value.approvaled;
                    }else{
                        ed = value.postapprovaled;
                    }
                    obj = {
                        'projectid' : value.projectid,
                        'mapid' : value.mapid,
                        'docid' : value.docid,
                        'title' : value.title,
                        'draftsd' : value.draftsd,
                        'drafted' : value.drafted,
                        'reviewed' : value.reviewed,
                        'approvaled' : value.approvaled,
                        'executioned' : value.executioned,
                        'postapprovaled' : value.postapprovaled,
                        'milestone' : value.milestone,
                        'linkid' : value.linkid,
                        'linkstage' : value.linkstage,
                        'predecessorid' : value.producessorid,
                        'predecessorstage' : value.predecessorstage,
                        'status' : value.status,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : value.approvestamp,
                        'execution' : value.execution,
                        'postapprovestamp' : value.postapprovestamp,

                        'effective' : value.effective,
                        'comid' : value.comid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'url' : value.url,
                        'version' : value.version,
                        'reference' : value.reference,
                    };
                    if(value.docid == "D-999900002"){
                        console.log('ASKHJDGKJHASGDKJHAGSD', obj);
                    }
                    const newDoc = new NewDoc(obj);
                    list[list.length] = newDoc;
                }
            });
        }
        const cbcomplete =()=>{
            // this.initializeLinkPred();
            if(options != undefined){
                options.callback('Fetching Actual Document');
            }
        }
        // capi_fetchPlanningDocuments(options, cbsuccess, cbcomplete)
        capi_fetchActualDocuments(options, cbsuccess, cbcomplete);
        return list;
    }
    initializeLinkPred(){
        console.log("Initializing Links and Predecessors");
        var dis = this;
        $.each(this.list, function(key, value){
            value.link = new NewLink();
            $.each(dis.list, function(key, tmpvalue){
                let tmplinkid = tmpvalue.linkid;
                let tmplinkstage = tmpvalue.linkstage;

                if(tmpvalue.docid != value.docid && tmpvalue.docid != "nst" && value.linkid != undefined && tmpvalue.linkid == value.linkid){
                    let tmp = {
                        "linkid" : tmpvalue.linkid,
                        "linkstage" : tmpvalue.linkstage,
                        "planningid" : tmpvalue.docid,
                        "planningtitle" : tmpvalue.title,
                        "enddate" : value[value.linkstage]
                    };
                    value.link.addLink(tmp);
                }

            });
            value.predecessor = new NewPredecessor();
            value.predecessor.fetch(value);
        });

        

    }
    getList(){
        return this.list;
    }
    getMappedList(){
        let list = [];
        $.each(this.list, function(key, value){
            // console.log('LA:KJSDJL:KASDKLJ:ADSKL:JASDJKL:',value.mapid);
            if(value.mapid != null && value.mapid != undefined && value.mapid != ""  && value.mapid != "null" ){
                list.push(value);
            }
        });
        return list;
    }
    
    getObjByDocId(planid){
        return this.getMappedList().find(obj => obj.getDocid() == planid);
    }
    getDocByPlanningId(planid){
        return this.getMappedList().find(obj => obj.docid == planid);
    }
    getDocByPlanningTitle(plantitle){
        return this.getMappedList().find(obj => obj.title == plantitle);
    }
    fillLinkDocSelect(selecttag, currentplanid){
        selecttag.empty();
        // console.log('Select should be empty');
        let doc = this.getDocByPlanningId(currentplanid);
        $.each(this.getMappedList(), function(key, value){
            if(doc.link!=undefined || doc.link.list.length >0){
                let found = doc.link.searchDocById(value.docid);
                if(value.docid != currentplanid && found == undefined  && value.docid != "nst"){
                    selecttag.append(`
                    <option value="${value.title}">${value.title}</option>`);
                }
            }
            
        });
    }
    fillPredDocSelect(selecttag, currentplanid){
        selecttag.empty();
        // console.log('Select should be empty');
        let doc = this.getDocByPlanningId(currentplanid);
        $.each(this.getMappedList(), function(key, value){
            // console.log('value', value);
            if(doc.predecessor != undefined && doc.predecessor.list != undefined && doc.predecessor.list.length != 0){
                // console.log('pred not empty');
                let found = doc.predecessor.searchDocById(value.docid);
                if(value.docid != currentplanid && found == undefined  && value.docid != "nst"){
                    // console.log('select tag adjusted');
                    selecttag.append(`
                    <option value="${value.title}">${value.title}</option>`);
                }
            }else{
                console.log('pred empty');
                if(value.docid != currentplanid && value.docid != "nst"){
                    // console.log('select tag adjusted');
                    selecttag.append(`
                    <option value="${value.title}">${value.title}</option>`);
                }
            }
        });
    }
    fillDocs(location){
        $(location).empty();
        if(location.includes('.preferences-body-list')){
            $.each(this.list, function(key, value){
                $('.preferences-body-list').append(`
                    <span docid="${value.docid}" url="${value.url}" class="preferences-body-list-widget btn-shadow">${value.title} v${value.version}<i class="fas fa-trash"></i></span>
                `);
            });
        }
    }
    getLinkedDocuments(planid){
        let doc = this.getDocByPlanningId(planid);
        if(doc != undefined && doc != null){
            return doc.link.getLinks();
        }else{
            return undefined;
        }
    }
    addNewLink(currentDoc, docToAdd, stage){
        let currentdoc = this.getDocByPlanningTitle(currentDoc);
        let doctoadd = this.getDocByPlanningTitle(docToAdd);
        let dis = this;
        let obj1 = [];

        console.log('CurrentDoc: ', currentdoc);
        console.log('doctoadd: ', doctoadd);
        

        if(currentdoc != undefined && doctoadd != undefined){
            let lid = undefined;
            let lstage = stage;
            let ed = undefined;
            
            let clink = currentdoc.link;
            let alink = doctoadd.link;

            // defines the linkid
            if(currentdoc.linkid != undefined && doctoadd.linkid == undefined){
                lid = currentdoc.linkid;
            }else if(currentdoc.linkid == undefined && doctoadd.linkid == undefined){
                lid = generateLinkID();
            }else{
                lid = doctoadd.linkid;
            }

            if(doctoadd[lstage] > currentdoc[lstage]){
                ed = doctoadd[lstage];
            }else{
                ed = currentdoc[lstage];
            }
            console.log('ED: ', ed);

            doctoadd.linkid = lid;
            currentdoc.linkid = lid;
            
            doctoadd[lstage] = ed;
            currentdoc[lstage] = ed;

            // assigns the new doc as link to the current doc
            obj1 = {
                "planningid" : doctoadd.docid,
                "planningtitle" : doctoadd.title,
                "linkid" : lid,
                "linkstage" : lstage,
                "enddate" : ed
            }
            let obj2 = {
                "planningid" : currentdoc.docid,
                "planningtitle" : currentdoc.title,
                "linkid" : lid,
                "linkstage" : lstage,
                "enddate" : ed
            }

            if(currentdoc.link == undefined){
                currentdoc.link = new NewLink();
            }

            if(alink == undefined){
                doctoadd.link = new NewLink();
            }

            
            if(currentdoc.link.list.length == 0 && doctoadd.link.list.length != 0){
                //all the link(s) of the currentDoc to newdoc
                $.each(alink.list, function(key, value){
                    value.enddate = ed;
                    
                    let tmpdoc = dis.getDocByPlanningId(value.planningid);
                    if(tmpdoc != undefined){
                        tmpdoc[lstage] = ed;
                        tmpdoc.link.addLink(obj2);

                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).val(ed);
                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).removeClass('editable').addClass('uneditable');

                    }
                    currentdoc.link.addLink(value);
                });

            }else if(doctoadd.link.list.length == 0 && currentdoc.link.list.length != 0){
                //all the link(s) of the currentDoc to newdoc
                $.each(clink.list, function(key, value){
                    value.enddate = ed;
                    
                    let tmpdoc = dis.getDocByPlanningId(value.planningid);
                    if(tmpdoc != undefined){
                        tmpdoc[lstage] = ed;
                        tmpdoc.link.addLink(obj1);

                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).val(ed);
                        $(`#preqtasklist_${tmpdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).removeClass('editable').addClass('uneditable');

                    }
                    doctoadd.link.addLink(value);
                });

            }
            clink.addLink(obj1);
            currentdoc.createLink(obj1);
            
            alink.addLink(obj2);
            doctoadd.createLink(obj2);

            $(`#preqtasklist_${currentdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).val(ed);
            $(`#preqtasklist_${currentdoc.planningid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${lstage}`).removeClass('editable').addClass('uneditable');
        
        }

        return obj1;
        
    }
    addNewPred(currentDoc, docToAdd, stage){
        console.log(currentDoc, docToAdd, stage);

        let currentdoc = this.getDocByPlanningTitle(currentDoc);
        let doctoadd = this.getDocByPlanningTitle(docToAdd);
        let dis = this;
        let obj = [];
        
        console.log('CurrentDoc: ', currentdoc);
        console.log('doctoadd: ', doctoadd);
        
        if(currentdoc != undefined && doctoadd != undefined){
            let pid = undefined;
            let pstage = stage;
            let startstage = pstage.slice(0,-2) + "sd";
            let sd = undefined;
            let ed = doctoadd[pstage];
            
            let cpred = currentdoc.pred;

            // defines the predid
            console.log(currentdoc.predecessorid);
            if(currentdoc.predecessorid == undefined || currentdoc.predecessorid == null){
                pid = generateProducessorID();
            }else{
                pid = currentdoc.predecessorid;
            }

            if(currentdoc[startstage] < doctoadd[pstage]){
                currentdoc[startstage] = doctoadd[pstage];
            }
            console.log('ED: ', ed);

            doctoadd.predid = pid;
            currentdoc.predid = pid;
            
            doctoadd[pstage] = ed;
            currentdoc[pstage] = ed;

            // assigns the new doc as pred to the current doc
            obj = {
                'predecessorid' : pid,
                'docid' : currentdoc.docid,
                'title' : currentdoc.title,
                'stage' : pstage,
                'preddocid' : doctoadd.docid,
                'preddoctitle' : doctoadd.title,
                'prevdate' : undefined,
                'enddate' : ed
            }

            currentdoc.predecessor.addPred(obj);
            currentdoc.createPredecessor(obj);
            currentdoc.predecessorid = pid;
        }


        return obj;
    }
    removeLink(removeid, success=()=>{}){
        const dis = this;
        $.each(this.getMappedList(), function(key, value){
            console.log('VAlue: ', value);
            if(value.docid == removeid){
                let obj={
                    'linkid': value.linkid,
                    'docid': value.docid,
                    'stage' : value.linkstage
                };
                capi_deleteDocumentLink(obj, success);
                value.linkid = undefined;
                value.linkstage = undefined;
                value.link = new NewLink();
            }else{
                if(value.link != undefined){
                    let removed = value.link.removeDoc(removeid);
                    console.log('Removed: ', removed);

                    if(value.link.list.length == 0){
                        let obj={
                            'linkid': value.linkid,
                            'docid': value.docid,
                            'stage' : value.linkstage
                            };
                        capi_deleteDocumentLink(obj, success);
                        value.linkid = undefined;
                        value.linkstage = undefined;
                    }
                }
            }
        });
        
    }
    removePred(currentdoc, removeid){
        const dis = this;
        let doc = this.getDocByPlanningTitle(currentdoc);

        if(doc!= undefined){
            let preds = doc.predecessor;
            if(preds != undefined && preds.list != undefined){
                const cbcomplete=()=>{
                    if (preds.list == undefined || preds.list.length == 0){
                        doc.predecessorid = undefined;
                        doc.predecessorstage = undefined;
                    }
                };
                
                let removed = preds.removeDoc(removeid, cbcomplete);
                console.log("Pred delete: ", removed);
            }
        }

        
        
    }
    makeMilestone(planid){
        let doc = this.getDocByPlanningId(planid);
        if(doc != undefined){
            doc.milestone = true;
        }
        
        capi_updateMilestone(planid);
    }
    removeMilestone(planid){
        let doc = this.getDocByPlanningId(planid);
        if(doc != undefined){
            doc.milestone = undefined;
        }
        capi_deleteMilestone(planid);
    }
    getDocsByLinkid(linkid){
        let list = [];
        $.each(this.getMappedList(), function(key, value){
            if(value.linkid == linkid){
                list.push(value);
            }
        });
        return list;
    }
    displayDocuments(location){
        if(location == 'active-proj-document-view-actual'){
            console.log('will display actual documents here');

            var startdate = $('#status-header-filter-fromdate').val(); //from date
            var timeFrame = $('#statusBoard-selTime').val(); //to date
            var selFilter = $('#statusBoard-selFilter').val(); //display in order by (sd/ed/milestones...)
            const maplist = this.getMappedList();

            

            var chosenSD = new Date(`${startdate} 00:00:00`);
            var today = new Date();
            today.setHours(0,0,0,0);
            var lastDate = new Date(`${startdate} 00:00:00`);

           
            // sets the end date restriction
            if(timeFrame == '1week'){
                lastDate.setDate(lastDate.getDate() + 7); //last date
            }else if(timeFrame == '2weeks'){
                lastDate.setDate(lastDate.getDate() + 14); //last date
            }else if(timeFrame == '1month'){
                lastDate.setMonth(lastDate.getMonth() + 1); //last date
            }else if(timeFrame == '2months'){
                lastDate.setMonth(lastDate.getMonth() + 2); //last date
            }else if(timeFrame == '4months'){
                lastDate.setMonth(lastDate.getMonth() + 4); //last date
            }else if(timeFrame == '6months'){
                lastDate.setMonth(lastDate.getMonth() + 6); //last date
            }else if(timeFrame == '1year'){
                lastDate.setFullYear(lastDate.getFullYear() + 1); //last date
            }else if(timeFrame == '2years'){
                lastDate.setFullYear(lastDate.getFullYear() + 2); //last date
            }else if(timeFrame == '4years'){
                lastDate.setFullYear(lastDate.getFullYear() + 4); //last date
            }else{
                console.log("timeFrame not selected. Last Date:", timeFrame);
            }
            
            $("#draftColumnNew").empty();
            $("#reviewColumnNew").empty();
            $('#approvalColumnNew').empty();
            $("#executionColumnNew").empty();
            $("#postApprovalColumnNew").empty();
                
            // console.log('ASDKLJHKJLASDHJKLASD', this.getMappedList());
            if(selFilter == 'sd'){
                console.log('Filter: Start Date');
                $.each(maplist, function(key, value){
                    console.log('AKJHKALJSDHJKLADSHJKLADSHJKLADSJKHL', maplist);
                    let tmpSD;
                    let tmpED;
                    let stage;
                    
                    // new Date(`${value.draftsd} 00:00:00`).getTime() > chosenSD && new Date(`${value.draftsd} 00:00:00`).getTime() < lastDate

                    if(new Date(value.draftsd) > chosenSD && new Date(value.draftsd) < lastDate){
                        tmpSD = value.draftsd;
                        tmpED = new Date(value.drafted);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                        </div>`);
                        
                    }
                    if(new Date(value.drafted) > chosenSD && new Date(value.drafted) < lastDate){
                        tmpSD = new Date(value.drafted);
                        tmpED = new Date(value.reviewed);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.draftstamp) > new Date(value.drafted)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.draftstamp) < new Date(value.drafted)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.drafted) <= today && (value.draftstamp == "" || value.draftstamp == undefined || value.draftstamp == null)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                    }
                    if(new Date(value.reviewed) > chosenSD && new Date(value.reviewed) < lastDate){
                        tmpSD = new Date(value.reviewed); 
                        tmpED = new Date(value.approvaled); 
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );

                        if(new Date(value.reviewstamp) > new Date(value.reviewed)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.reviewstamp) < new Date(value.reviewed)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.reviewed) <= today && (value.reviewstamp == "" || value.reviewstamp == undefined || value.reviewstamp == null)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                        
                
                    }
                    if(new Date(value.approvaled) > chosenSD && new Date(value.approvaled) < lastDate){
                        tmpSD = new Date(value.approvaled);
                        tmpED = new Date(value.executioned);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.approvestamp) > new Date(value.approvaled)){
                            $("#executionColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.approvestamp) < new Date(value.approvaled)){
                            $("#executionColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.approvaled) <= today && (value.approvestamp == "" || value.approvestamp == undefined || value.approvestamp == null)){
                            $("#executionColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                    }
                    if(new Date(value.executioned) > chosenSD && new Date(value.executioned) < lastDate){
                        tmpSD = new Date(value.executioned);
                        tmpED = new Date(value.postapprovaled);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.postapprovestamp) > new Date(value.executioned)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.postapprovestamp) < new Date(value.executioned)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.executioned) <= today && (value.postapprovestamp == "" || value.postapprovestamp == undefined || value.postapprovestamp == null)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                        
                
                    }
                });
            }else if(selFilter == 'ed'){
                console.log('Filter: End Date');
                $.each(maplist, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    
                    if(new Date(value.drafted) > chosenSD && new Date(value.drafted) < lastDate){
                        tmpSD = value.draftsd;
                        tmpED = new Date(value.drafted);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.draftstamp) > new Date(value.drafted)){
                            $("#draftColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.draftstamp) < new Date(value.drafted)){
                            $("#draftColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.drafted) <= today && (value.draftstamp == "" || value.draftstamp == undefined || value.draftstamp == null)){
                            $("#draftColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                
                    }
                    if(new Date(value.reviewed) > chosenSD && new Date(value.reviewed) < lastDate){
                        tmpSD = new Date(value.drafted);
                        tmpED = new Date(value.reviewed);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.reviewstamp) > new Date(value.reviewed)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.reviewstamp) < new Date(value.reviewed)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.reviewed) <= today && (value.reviewstamp == "" || value.reviewstamp == undefined || value.reviewstamp == null)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                    }
                    if(new Date(value.approvaled) > chosenSD && new Date(value.approvaled) < lastDate){
                        tmpSD = new Date(value.reviewed); 
                        tmpED = new Date(value.approvaled); 
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.approvestamp) > new Date(value.approvaled)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.approvestamp) < new Date(value.approvaled)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.approvaled) <= today && (value.approvestamp == "" || value.approvestamp == undefined || value.approvestamp == null)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                    }
                    if(new Date(value.executioned) > chosenSD && new Date(value.executioned) < lastDate){
                        tmpSD = new Date(value.approvaled);
                        tmpED = new Date(value.executioned);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.execution) > new Date(value.executioned)){
                            $("#executionColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.execution) < new Date(value.executioned)){
                            $("#executionColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.executioned) <= today && (value.execution == "" || value.execution == undefined || value.execution == null)){
                            $("#executionColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                        
                
                    }
                    if(new Date(value.postapprovaled) > chosenSD && new Date(value.postapprovaled) < lastDate){
                        tmpSD = new Date(value.executioned);
                        tmpED = new Date(value.postapprovaled);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(today),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.postapprovestamp) > new Date(value.postapprovaled)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.postapprovestamp) < new Date(value.postapprovaled)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.postapprovaled) <= today && (value.postapprovestamp == "" || value.postapprovestamp == undefined || value.postapprovestamp == null)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                
                    }
                });
            }else if(selFilter == 'stage'){
                console.log('Filter: Stage');
                $.each(maplist, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    
                    if(new Date(value.draftsd) > chosenSD && new Date(value.draftsd) < lastDate){
                        tmpSD = value.draftsd;
                        tmpED = new Date(value.drafted);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                        </div>`);
                        
                    }else if(new Date(value.drafted) > chosenSD && new Date(value.drafted) < lastDate){
                        tmpSD = new Date(value.drafted);
                        tmpED = new Date(value.reviewed);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.draftstamp) > new Date(value.drafted)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.draftstamp) < new Date(value.drafted)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.drafted) <= today && (value.draftstamp == "" || value.draftstamp == undefined || value.draftstamp == null)){
                            $("#reviewColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                    }else if(new Date(value.reviewed) > chosenSD && new Date(value.reviewed) < lastDate){
                        tmpSD = new Date(value.reviewed); 
                        tmpED = new Date(value.approvaled); 
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );

                        if(new Date(value.reviewstamp) > new Date(value.reviewed)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.reviewstamp) < new Date(value.reviewed)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.reviewed) <= today && (value.reviewstamp == "" || value.reviewstamp == undefined || value.reviewstamp == null)){
                            $('#approvalColumnNew').append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                        
                
                    }else if(new Date(value.approvaled) > chosenSD && new Date(value.approvaled) < lastDate){
                        tmpSD = new Date(value.approvaled);
                        tmpED = new Date(value.executioned);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.approvestamp) > new Date(value.approvaled)){
                            $("#executionColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.approvestamp) < new Date(value.approvaled)){
                            $("#executionColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.approvaled) <= today && (value.approvestamp == "" || value.approvestamp == undefined || value.approvestamp == null)){
                            $("#executionColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                    }else if(new Date(value.executioned) > chosenSD && new Date(value.executioned) < lastDate){
                        tmpSD = new Date(value.executioned);
                        tmpED = new Date(value.postapprovaled);
                        const when = dateFns.distanceInWordsStrict(
                            Date.parse(tmpSD),
                            Date.parse(tmpED),
                            {
                                addSuffix: true,
                                unit: 'd'
                            }
                        );
                        
                        if(new Date(value.postapprovestamp) > new Date(value.executioned)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget late">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.postapprovestamp) < new Date(value.executioned)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ahead">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else if(new Date(value.executioned) <= today && (value.postapprovestamp == "" || value.postapprovestamp == undefined || value.postapprovestamp == null)){
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget delayed">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }else{
                            $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                                <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                <div class="status-body-widget-name">
                                <span class="status-body-widget-name-title" >${value.title}</span>
                                </div>
                                <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                <span class="status-body-widget-when" >${when}</span>
                                <div class="status-body-widget-icons-con">
                                <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                <i status="name" class="fas fa-clone id-name-switch" ></i>
                                </div>
                            </div>`);
                        }
                        
                
                    }
                });
            }else if(selFilter == 'milestone'){
                console.log('Filter: Milestone');
                $.each(maplist, function(key, value){
                    let tmpSD;
                    let tmpED;
                    let stage;
                    if(value.milestone){
                        if(new Date(value.draftsd) > chosenSD && new Date(value.draftsd) < lastDate){
                            tmpSD = value.draftsd;
                            tmpED = new Date(value.drafted);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(tmpSD),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            $("#draftColumnNew").append(`<div class="status-body-widget ontime">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${tmpSD} -> ${value.drafted}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                            </div>`);
                            
                        }else if(new Date(value.drafted) > chosenSD && new Date(value.drafted) < lastDate){
                            tmpSD = new Date(value.drafted);
                            tmpED = new Date(value.reviewed);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(tmpSD),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            if(new Date(value.draftstamp) > new Date(value.drafted)){
                                $("#reviewColumnNew").append(`<div class="status-body-widget late">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.draftstamp) < new Date(value.drafted)){
                                $("#reviewColumnNew").append(`<div class="status-body-widget ahead">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.drafted) <= today && (value.draftstamp == "" || value.draftstamp == undefined || value.draftstamp == null)){
                                $("#reviewColumnNew").append(`<div class="status-body-widget delayed">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else{
                                $("#reviewColumnNew").append(`<div class="status-body-widget ontime">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.drafted} -> ${value.reviewed}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }
                        }else if(new Date(value.reviewed) > chosenSD && new Date(value.reviewed) < lastDate){
                            tmpSD = new Date(value.reviewed); 
                            tmpED = new Date(value.approvaled); 
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(tmpSD),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
    
                            if(new Date(value.reviewstamp) > new Date(value.reviewed)){
                                $('#approvalColumnNew').append(`<div class="status-body-widget late">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.reviewstamp) < new Date(value.reviewed)){
                                $('#approvalColumnNew').append(`<div class="status-body-widget ahead">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.reviewed) <= today && (value.reviewstamp == "" || value.reviewstamp == undefined || value.reviewstamp == null)){
                                $('#approvalColumnNew').append(`<div class="status-body-widget delayed">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else{
                                $('#approvalColumnNew').append(`<div class="status-body-widget ontime">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.reviewed} -> ${value.approvaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }
                            
                    
                        }else if(new Date(value.approvaled) > chosenSD && new Date(value.approvaled) < lastDate){
                            tmpSD = new Date(value.approvaled);
                            tmpED = new Date(value.executioned);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(tmpSD),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            if(new Date(value.approvestamp) > new Date(value.approvaled)){
                                $("#executionColumnNew").append(`<div class="status-body-widget late">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.approvestamp) < new Date(value.approvaled)){
                                $("#executionColumnNew").append(`<div class="status-body-widget ahead">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.approvaled) <= today && (value.approvestamp == "" || value.approvestamp == undefined || value.approvestamp == null)){
                                $("#executionColumnNew").append(`<div class="status-body-widget delayed">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else{
                                $("#executionColumnNew").append(`<div class="status-body-widget ontime">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.approvaled} -> ${value.executioned}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }
                        }else if(new Date(value.executioned) > chosenSD && new Date(value.executioned) < lastDate){
                            tmpSD = new Date(value.executioned);
                            tmpED = new Date(value.postapprovaled);
                            const when = dateFns.distanceInWordsStrict(
                                Date.parse(tmpSD),
                                Date.parse(tmpED),
                                {
                                    addSuffix: true,
                                    unit: 'd'
                                }
                            );
                            
                            if(new Date(value.postapprovestamp) > new Date(value.executioned)){
                                $("#postApprovalColumnNew").append(`<div class="status-body-widget late">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.postapprovestamp) < new Date(value.executioned)){
                                $("#postApprovalColumnNew").append(`<div class="status-body-widget ahead">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else if(new Date(value.executioned) <= today && (value.postapprovestamp == "" || value.postapprovestamp == undefined || value.postapprovestamp == null)){
                                $("#postApprovalColumnNew").append(`<div class="status-body-widget delayed">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }else{
                                $("#postApprovalColumnNew").append(`<div class="status-body-widget ontime">
                                    <span class="status-body-widget-id" title="${value.title}">${value.docid}</span>
                                    <div class="status-body-widget-name">
                                    <span class="status-body-widget-name-title" >${value.title}</span>
                                    </div>
                                    <span class="status-body-widget-dates" >${value.executioned} -> ${value.postapprovaled}</span>
                                    <span class="status-body-widget-when" >${when}</span>
                                    <div class="status-body-widget-icons-con">
                                    <i class="fas fa-link status-body-widget-mapid" title="${value.title}"></i>
                                    <i status="name" class="fas fa-clone id-name-switch" ></i>
                                    </div>
                                </div>`);
                            }
                            
                    
                        }
                    }
                });
            }



            
        }
        
    }
    updateMapId(docid, planid){
        let obj = this.list.find(obj => obj.docid == docid);
        if(obj != undefined){
            const planobj = ACCUSER.getProject(obj.projectid).ScheduleDocument.getObjByDocId(planid);
            obj.mapid = planid;
            obj.draftsd = planobj.draftsd;
            obj.drafted = planobj.drafted;
            obj.reviewed = planobj.reviewed;
            obj.approvaled = planobj.approvaled;
            obj.executioned = planobj.executioned;
            obj.postapprovaled = planobj.postapprovaled;
        }
    }
    

    
    



}

class NewDoc{
    constructor(obj){

        this.docid = obj.docid,
        this.title = obj.title,

        this.projectid = obj.projectid,
        this.mapid = obj.mapid,
        this.draftsd = obj.draftsd,
        this.drafted = obj.drafted,
        this.reviewed = obj.reviewed,
        this.approvaled = obj.approvaled,
        this.executioned = obj.executioned,
        this.postapprovaled = obj.postapprovaled,
        this.milestone = obj.milestone,
        
        this.startdate = obj.startdate,
        this.enddate = obj.enddate,
        this.linkid = obj.linkid,
        this.linkstage = obj.linkstage,
        this.predecessorid = obj.predecessorid,
        this.predecessorstage = obj.predecessorstage,

        this.status = obj.status,
        this.draftstamp = obj.draftstamp,
        this.proofreadstamp = obj.proofreadstamp,
        this.reviewstamp = obj.reviewstamp,
        this.approvestamp = obj.approvestamp,
        this.execution = obj.execution,
        this.postapprovestamp = obj.postapprovestamp,

        // extras for actualdocument
        this.effective = obj.effective,
        this.comid = obj.comid,
        this.docsuff = obj.docsuff,
        this.cat1 = obj.cat1,
        this.cat2 = obj.cat2,
        this.cat3 = obj.cat3,
        this.cat4 = obj.cat4,
        this.ownerid = obj.ownerid,
        this.url = obj.url,
        this.version = obj.version,
        this.reference = obj.reference,

        // these will be classes
        this.link = undefined,
        this.predecessor = undefined
    }
    getData(){
        return {
            "docid" : this.docid,
            "projectid" : this.projectid,
            "title" : this.title,
            "draftsd" : this.draftsd,
            "drafted" : this.drafted,
            "reviewed" : this.reviewed,
            "approvaled" : this.approvaled,
            "executioned" : this.executioned,
            "postapprovaled" : this.postapprovaled,
            "milestone" : this.milestone,

            "startdate" : this.startdate,
            "enddate" : this.enddate,
            
            "linkid" : this.linkid,
            "linkstage" : this.linkstage,
            "predecessorid" : this.predecessorid,
            "predecessorstage" : this.predecessorstage,

            "status" : this.status,
            "draftstamp" : this.draftstamp,
            "proofreadstamp" : this.proofreadstamp,
            "reviewstamp" : this.reviewstamp,
            "approvestamp" : this.approvestamp,
            "execution" : this.execution,
            "postapprovestamp" : this.postapprovestamp,

            "effective" : this.effective,
            "comid" : this.comid,
            "docsuff" : this.docsuff,
            "cat1" : this.cat1,
            "cat2" : this.cat2,
            "cat3" : this.cat3,
            "cat4" : this.cat4,
            "ownerid" : this.ownerid,
            "url" : this.url,
            "version" : this.version,
            "reference" : this.reference,
        }
    }
    getDocid(){
        return this.docid;
    }
    getLinks(){
        if(this.link == undefined){
            return undefined;
        }else{
            return this.link.list;
        }
    }
    getPreds(){
        if(this.predecessor == undefined){
            return undefined;
        }else{
            return this.predecessor.list;
        }
    }
    fetchTasks(){
        // then pull all tasks for this document
        const cbsuccess=data=>{
            console.log(data);

            let dis = this;
            $.each(data, function(key, value){
                let options = [];
                if(value != 'error'){
                    // console.log("Value: ", value);
                    let resourceOptions = {
                        'id' : value.id,
                        'taskid' : value.taskid,
                        'type' : value.type,
                        'projectid' : value.projectid,
                        'planid' : value.planid,
                        'supplierid' : value.supplierid,
                        'accid' : value.accid,
                        'hours' : value.hours,
                        'status' : value.status,
                        'suggesteddate' : value.suggesteddate,
                        'assignment' : value.assignment,
                        'usercomment' : value.usercomment,
                        'pmcomment' : value.pmcomment,
                        'usrread' : value.usrread,
                        'pmread' : value.pmread,
                        'firstname' : value.firstname,
                        'lastname' : value.lastname,
                        'suppliername' : value.suppliername
                    };
                    let taskOptions = {
                        "taskid" : value.taskid,
                        "projectid" : value.projectid,
                        "planid" : value.planid,
                        "status" : value.status,
                        "taskname" : value.taskname,
                        "startdate" : value.startdate,
                        "enddate" : value.enddate
                    };
                    let task = undefined;
                    let newResource = undefined;
                    
                    if(dis.task == undefined){
                        dis.task = new NewTask();
                    }else{
                        task = dis.task.getTaskById(value.taskid);
                    }

                    if(task == undefined){
                        dis.task.addTask(taskOptions);
                        if(value.id != "" && value.id != null){
                            newResource = new Resource();
                            newResource.addResource(resourceOptions);
                            dis.task.list[dis.task.list.length - 1].resource = newResource;
                        }
                    }else{
                        if(value.id != "" && value.id != null){
                            task.resource.addResource(resourceOptions);
                        }
                    }
                }
            });
        }
        const cbcomplete =()=>{
            
        }
        capi_fetchTaskResourceByPlanIdUpdated(this.planningid, cbsuccess, cbcomplete)
    
    }
    createLink(options){
        const cbsuccess=data=>{
            console.log(data);
            // this.list[this.list.length] = {
            //     'linkid' : options.linkid,
            //     'docid' : options.planningid,
            //     'stage' : options.linkstage
            // };
        };
        const cbcomplete=()=>{
            // callback();
            // this.updateDoc();
        };
        capi_createPlanningDocumentLink(options, cbsuccess, cbcomplete);
    }
    createPredecessor(options){
       
        const cbcomplete=()=>{
            // callback();
            // this.updateDoc();
        };
        capi_createPlanningDocumentPredecessor(options, cbcomplete);
    }
    updateMilestone(callback){
        const cbsuccess=data=>{
            console.log(data);
            this.milestone = "true"
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateMilestone({"docid" : this.docid}, cbsuccess, cbcomplete);
    }
    deleteMilestone(callback){
        const cbsuccess=data=>{
            console.log(data);
            this.milestone = null
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteMilestone({"docid" : this.docid}, cbsuccess, cbcomplete);
    }
    
    updateDoc(){
        // let obj = this.list.find(obj => obj.docid == docid);
        const cbsuccess=data=>{
            // console.log(data);
            // obj.docid = this.docid;
            // obj.title = this.title,
            // obj.approvaled = this.approvaled,
            // obj.draftsd = this.draftsd,
            // obj.drafted = this.drafted,
            // obj.reviewed = this.reviewed,
            // obj.executioned = this.executioned,
            // obj.postapprovaled = this.postapprovaled
        };
        const cbcomplete=()=>{
            // callback();
        };
        capi_updatePlanningDocumentDates(this, cbsuccess, cbcomplete);
    }


    
}
class NewLink{
    constructor(){
        this.list = [];
        // this.addLink(obj);
    }
    addLink(obj){
        this.list[this.list.length] = {
            "planningid" : obj.planningid,
            "planningtitle" : obj.planningtitle,
            "linkid" : obj.linkid,
            "linkstage" : obj.linkstage,
            "enddate" : obj.enddate
        };
        
    }
    searchDocById(planid){
        $.each(this.list, function(key, value){
            if(value.planningid == planid){
                console.log('link found');
                return value;
            }
        });
        return undefined;
    }
    searchDocByTitle(ztitle){
        $.each(this.list, function(key, value){
            if(value.title == ztitle){
                return value;
            }
        });
        return undefined;
    }
    removeDoc(removeid){
        const dis = this;
        $.each(this.list, function(key, value){
            if(value != undefined && (value.planningid == removeid || value.docid == removeid)){
                console.log('should delete this');
                dis.list.splice(key, 1);
                return true;
            }
        });
        return false;
    }
    
    
}
class NewPredecessor{
    constructor(){
        this.list = [];
    }
    fetch(options){
        const cbsuccess=data=>{
            let dis = this;
            console.log('retrieved pred values: ', data);
            
            $.each(data, function(key, value){
                console.log('VALUE: ', value);
                if(value != "error"){
                    let doc = ACCUSER.getProject(options.projectid).ScheduleDocument.getDocByPlanningId(value.preddocid);

                    dis.list[dis.list.length] = {
                        'predecessorid' : value.predecessorid,
                        'docid' : value.docid,
                        'title' : options.title,
                        'stage' : value.stage,
                        'preddocid' : value.preddocid,
                        'preddoctitle' : doc.title,
                        'enddate' : doc[value.stage],
                        'prevdate' : value.prevdate
                    };
                }
            });
        };
        capi_fetchPlanningDocumentPredecessor(options, cbsuccess);
    }
    addPred(obj){
        if(this.list == undefined){
            this.list = [];
        }
        this.list[this.list.length] = {
            'predecessorid' : obj.predecessorid,
            'docid' : obj.docid,
            'title' : obj.title,
            'stage' : obj.stage,
            'preddocid' : obj.preddocid,
            'preddoctitle' : obj.preddoctitle,
            'prevdate' : obj.prevdate,
            'enddate' : obj.enddate
        };
    }
    searchDocById(zpreddocid){
        $.each(this.list, function(key, value){
            if(value.preddocid == zpreddocid){
                // console.log('link found');
                return value;
            }
        });
        return undefined;
    }
    searchDocByTitle(ztitle){
        $.each(this.list, function(key, value){
            if(value.title == ztitle){
                return value;
            }
        });
        return undefined;
    }
    removeDoc(removeid, callback){
        const dis = this;
        $.each(this.list, function(key, value){
            if(value != undefined && value.preddocid == removeid){
                console.log('should delete this');
                const cbsuccess=()=>{
                    dis.list.splice(key, 1);
                };
                const cbcomplete=()=>{
                    callback();
                    return true;
                };
                capi_deletePlanningDocumentPredecessor(value, cbsuccess, cbcomplete);
            }
        });
        return false;
    }
    getDocsByPredsid(predsid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.predecessorid == predsid){
                list.push(value);
            }
        });
        return list;
    }

}

class SamplePlanningDoc{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                const options = {
                    "planningid" : value.planningid,
                    "projectid" : value.projectid,
                    "planningtitle" : value.planningtitle,
                    "draftsd" : value.draftsd,
                    "drafted" : value.drafted,
                    "reviewed" : value.reviewed,
                    "approvaled" : value.approvaled,
                    "executioned" : value.executioned,
                    "postapprovaled" : value.postapprovaled,
                    "actualid" : value.actualid,
                    "milestone" : value.milestone,
                    
                    "linkid" : value.linkid,
                    "linkstage" : value.linkstage,
                    "producessorid" : value.producessorid,
                    "producessorstage" : value.producessorstage,
                    "actualtitle" : value.actualtitle,
                    "taskid" : value.taskid,
                    "taskstatus" : value.taskstatus,
                    "taskname" : value.taskname,
                    "tasksd" : value.tasksd,
                    "tasked" : value.tasked
                };
                list[list.length] = options;
            }); 
        };
        const cbcomplete=()=>{
            options.callback('Fetching Planning Documents');
            console.log('Fetch Complete');
        };
        capi_fetchBuildSchedule(options.projectid, cbsuccess, cbcomplete );
        return list;
    }

    getObjByPlanningId(options){
        return this.list.find(obj => obj.planningid == options.planningid);
    }
}









