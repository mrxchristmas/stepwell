<!DOCTYPE html>
<html lang="en">
<?php
  include "../../controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pro Flow</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
    <link href="lib/css/default.css" rel="stylesheet" /> 
    <link href="lib/css/project_launch.css" rel="stylesheet" /> 
    <link href="lib/css/project_page1.css" rel="stylesheet" />
    <link href="lib/css/project_page2.css" rel="stylesheet" />
    <link href="lib/css/project.css" rel="stylesheet" /> 
    <link href="lib/css/docuchat.css" rel="stylesheet" /> 
    
</head>
<body onload="init();">
  
    <div id="loader">
      <i class="fas fa-spinner"></i>
      <span>Please Wait... Loading Data from Database</span>
    </div>

    <?php
      include "../../views/bodydefaults.html";
    ?>

    <?php
      include "../../views/docchartnav.html";
    ?>

    <div id="content">
        <?php
            include "../../views/contentdefaults.html";
        ?>
      
      <div id ="assignResources" class = "assignResources hidden"> 
        <div class = "assignResourcesContainer columnLayout">
          <div>
            <label class = "rightAlignText rowElement">Total Hours: </label>
            <label class = "rowElement">____</label>
          </div>
        </div>
      </div>

      <div class="dashboard-con hidden nav-maincontainer">
        <div class="nav-content-">
            <div class="dashboard-body-header color-sc">
              <span id="dashboard-body-projectname" class="title">Project Name</span>
              <div class="dashboard-body-header-widget-con">
                
                <div id="project-view-launch" class="dashboard-body-header-widget launch">
                  <div class="dashboard-body-title btn-shadow">
                    <i class="fas fa-rocket"></i>
                    <span>Launch</span>
                  </div>
                </div>

                <div id="task-header-search-submit" class="dashboard-body-header-widget schedule">
                  <!-- <i id="dashboard-schedule-close" class="fas fa-times dashboard-body-close"></i> -->
                  <div class="dashboard-body-title btn-shadow">
                    <i class="fas fa-pencil-ruler"></i>
                    <span>Schedule</span>
                  </div>
                </div>

                <div id="map-header-search-project-submit" class="dashboard-body-header-widget map">
                  <!-- <i id="dashboard-schedule-close" class="fas fa-times dashboard-body-close"></i> -->
                  <div class="dashboard-body-title btn-shadow">
                    <i class="fas fa-link" title="Map Documents"></i>
                    <span>Mapping</span>
                  </div>
                </div>


                <div status="closed" class="dashboard-body-header-widget boards">
                  <div id="project-view-boards" class="dashboard-body-title btn-shadow">
                    <i class="fas fa-table"></i>
                    <span>Status Board</span>
                  </div>

                  <div class="project-board-divider cona">
                      <span class="l"></span>
                      <span class="n"></span>
                      <span class="l"></span>
                  </div>

                  <div id="project-view-boards-task" class="dashboard-body-title btn-shadow project-view-boards-widget cona">
                    <i class="fas fa-tasks"></i>
                    <span>Task</span>
                  </div>

                  <div class="project-board-divider conb">
                      <span class="l"></span>
                      <span class="n"></span>
                      <span class="l"></span>
                  </div>

                  <div id="project-view-boards-document" class="dashboard-body-title btn-shadow project-view-boards-widget conb">
                    <i class="fas fa-file-alt"></i>
                    <span>Document</span>
                  </div>

                  <div class="project-board-divider conc">
                      <span class="l"></span>
                      <span class="n"></span>
                      <span class="l"></span>
                  </div>

                  <div id="project-view-boards-resource" class="dashboard-body-title btn-shadow project-view-boards-widget conc">
                    <i class="fab fa-sourcetree"></i>
                    <span>Resources</span>
                  </div>

                </div>

                <div status="closed" class="dashboard-body-header-widget finance">
                  <div id="project-view-finance" class="dashboard-body-title btn-shadow">
                    <i class="fas fa-table"></i>
                    <span>Finance</span>
                  </div>

                  <div class="project-finance-divider cona">
                      <span class="l"></span>
                      <span class="n"></span>
                      <span class="l"></span>
                  </div>

                  <div id="project-view-finance-budgeting" class="dashboard-body-title btn-shadow project-view-finance-widget cona">
                    <i class="fas fa-user-clock"></i>
                    <span>Budgeting</span>
                  </div>

                  <div class="project-finance-divider conb">
                      <span class="l"></span>
                      <span class="n"></span>
                      <span class="l"></span>
                  </div>

                  <div id="project-view-finance-tracker" class="dashboard-body-title btn-shadow project-view-finance-widget conb">
                    <i class="fas fa-search-dollar"></i>
                    <span>Tracking</span>
                  </div>

                  <div class="project-finance-divider conc">
                      <span class="l"></span>
                      <span class="n"></span>
                      <span class="l"></span>
                  </div>

                  <div id="project-view-finance-spending" class="dashboard-body-title btn-shadow project-view-finance-widget conc">
                    <i class="fas fa-hand-holding-usd"></i>
                    <span>Spending</span>
                  </div>

                </div>

                

                <!-- <div id="finance-project-submit" class="dashboard-body-header-widget map">
                  <div class="dashboard-body-title btn-shadow">
                    <i class="fas fa-hand-holding-usd" title="Spending"></i>
                    <span>Spending</span>
                  </div>
                </div> -->
                
                

              </div>
            </div>
            
            <div class="dashboard-body">
              <div class="project-manage-list-con color-sc">
                  <input id="project-manage-search" type="text" placeholder="Search Projects">
                  <div id="project-manage-list" class="project-manage-list">
                      <span class="project-manage-list-widget btn-shadow">P-123456789</span>
                      <span class="project-manage-list-widget btn-shadow">P-123456789</span>
                      <span class="project-manage-list-widget btn-shadow">P-123456789</span>
                      <span class="project-manage-list-widget btn-shadow">P-123456789</span>
                  </div>
              </div>
              <div class="dashboard-body-content">
                <div class="dashboard-body-content-static">
                  <div id="active-overview-owned-projects" class="widget">
                    <span class="stat">5</span>
                    <span class="title">Owned Projects</span>
                  </div>
                  <div id="active-overview-connected-projects" class="widget">
                    <span class="stat">8</span>
                    <span class="title">Connected Projects</span>
                  </div>
                  <div id="active-overview-active-projects" class="widget">
                    <span class="stat">2</span>
                    <span class="title">Active Projects</span>
                  </div>
                  <div id="active-overview-inactive-projects" class="widget">
                    <span class="stat">0</span>
                    <span class="title">Inactive Projects</span>
                  </div>
                  <div id="active-overview-archived-projects" class="widget">
                    <span class="stat">na</span>
                    <span class="title">Archived Projects</span>
                  </div>
                </div>
                <div class="dashboard-body-content-project">
                  <div class="projectdetails">
                    <img id="dashboard-body-content-project-image" src="lib/images/user2.jpg" alt="">
                    <div class="details">
                      <div class="details-widget project">
                        <span id="dashboard-body-content-project-projectname" class="name">Alicization</span>
                        <span id="dashboard-body-content-project-projectid" class="id">P-68465498355</span>
                      </div>
                      <div class="details-widget manager">
                        <span class="label">Project Manager</span>
                        <span id="dashboard-body-content-project-projectmanager" class="name">Tony Stark <span id="dashboard-body-content-project-projectmanager-id"class="id">U-876765765657</span></span>
                      </div>
                      <div id="dashboard-body-content-project-progressbar" class="progress">
                        <span id="dashboard-body-content-project-progress">Project's Progress : 20%</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div class="dashboard-body-content-details">
                  <div id="active-overview-startdate" class="widget">
                    <span id="dashboard-body-content-details-startdate" class="stat">2020-01-09</span>
                    <span class="title">Started On</span>
                  </div>
                  <div id="active-overview-enddate" class="widget">
                    <span id="dashboard-body-content-details-enddate" class="stat">2021-09-07</span>
                    <span class="title">Estimated Completion Date</span>
                  </div>
                  <div id="active-overview-users" class="widget">
                    <span id="dashboard-body-content-details-users" class="stat">2</span>
                    <span class="title">Number of Users</span>
                  </div>
                  <div id="active-overview-tasks" class="widget">
                    <span id="dashboard-body-content-details-task" class="stat">0</span>
                    <span class="title">Number of Tasks</span>
                  </div>
                </div>
                <br>
                <div class="dashboard-body-content-hours">
                  <div class="legend">
                    <i class="fas fa-user-clock"></i>
                    <span>Team Hours</span>
                  </div>
                  <div class="details">
                    <div class="details-widget allocated">
                      <span id="dashboard-body-content-hours-allocated"><span class="title">Allocated:</span> 1000 Hours</span>
                    </div>
                    <div id="dashboard-body-content-hours-actual-bar" class="details-widget actual">
                      <span id="dashboard-body-content-hours-actual"><span class="title">Actual:</span> 500 Hours</span>
                    </div>
                    <div id="dashboard-body-content-hours-remaining-bar" class="details-widget remaining">
                      <span id="dashboard-body-content-hours-remaining"><span class="title">Remaining:</span> 500 Hours</span>
                    </div>
                  </div>

                </div>
                <br>
                <div class="dashboard-body-content-budget">
                  <div class="legend">
                  <i class="fas fa-money-check-alt"></i>
                    <span>Team Budget</span>
                  </div>
                  <div class="details">
                    <div id="dashboard-body-content-budget-allocated-bar" class="details-widget allocated">
                      <span id="dashboard-body-content-budget-allocated"><span class="title">Allocated:</span> $1000.00</span>
                      
                    </div>
                    <div id="dashboard-body-content-budget-actual-bar" class="details-widget actual">
                      <span id="dashboard-body-content-budget-actual"><span class="title">Actual:</span> $500.00</span>
                    </div>
                    <div id="dashboard-body-content-budget-remaining-bar" class="details-widget remaining">
                      <span id="dashboard-body-content-budget-remaining"><span class="title">Remaining:</span> $500.00</span>
                    </div>
                  </div>

                </div>
                <br>

                <div class="dashboard-body-content-honors">
                  <div class="widget">
                    <i class="fas fa-crown"></i>
                    <img src="lib/images/user4.jpg" alt="">
                    <span>Most Paid Team Member</span>
                  </div>
                  <div class="widget">
                    <i class="fas fa-crown"></i>
                    <img src="lib/images/user1.jpg" alt="">
                    <span>Most Hours Team Member</span>
                  </div>
                  <div class="widget">
                    <i class="fas fa-crown"></i>
                    <img src="lib/images/user3.jpg" alt="">
                    <span>Most Owned Task Team Member</span>
                  </div>
                </div>


              </div>

            </div>
            
        </div>
      </div><!-- ////////////////////////project-con from dashboard//////////////////////// -->

      <!-- // is now called New Projects -->
      <div class="project-schedule-con hidden nav-maincontainer"> 
        <div class="nav-content-">
          <div class="schedule-header">
            <div class="title color-sc">
              <span id="schedule-header-projectname" class="name">New Projects</span>
              <span id="schedule-header-projectid" class="id"></span>
            </div>
            <div class="schedule-panel">
              <div class="schedule-navigation color-sc">
                <span cid="create" class="schedule-navigation-widget ">Project Create</span>
                <span cid="build" class="schedule-navigation-widget ">Build Project</span>
                <span cid="request" class="schedule-navigation-widget ">Project Request</span>
                <span cid="proposal" class="schedule-navigation-widget ">Project Proposal</span>
                <span cid="share" class="schedule-navigation-widget ">Project Share</span>
                <!-- <span cid="build" class="schedule-navigation-widget ">Build Schedule</span> -->
                <!-- <span cid="schedule" class="schedule-navigation-widget">Schedules</span> -->
                <!-- <span cid="map" class="schedule-navigation-widget ">Doc Mapping</span> -->
              </div>
              <div class="schedule-mods">

                <!-- <div class="schedule-mods-widget btn-shadow">
                  <i class="fas fa-pencil-alt" title="View or Edit schedule"></i>
                  <span id="schedule-mods-prefs">View/Edit schedule</span>
                </div> -->

                <div class="schedule-mods-widget hidden btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="schedule-mods-refresh">Refresh Data</span>
                </div>

                <div class="schedule-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="schedule-mods-dashboard">Dashboard</span>
                </div>

                <!-- <div class="schedule-mods-widget btn-shadow">
                  <i class="fas fa-tools" title="Request Creation Tool"></i>
                  <span id="schedule-mods-create">Request Creation Tool</span>
                </div> -->

                <div class="schedule-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit schedule"></i>
                  <span id="schedule-mods-exit">Exit New Projects</span>
                </div>

                <div class="schedule-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="schedule-mods-print">Print</span>
                </div>

                <!-- <div class="schedule-mods-widget btn-shadow">
                  <i class="fas fa-envelope" title="Email"></i>
                  <span id="schedule-mods-email">Email</span>
                </div> -->

              </div>
            </div>
          </div>
          
          <div class="schedule-body">

            <div class="schedule-body-build hidden schedule-body-widget">
              <div class="build-projectlist color-sc">
                <span prname="Project 1" prid="P-1111111111" crid="Brijesh Patel" ownerid="Somesh Sri" class="build-projectlist-widget shadow">Project 1</span>
                <span prname="Project 2" prid="P-1111111112" crid="Noel Santillan" ownerid="Somesh Sri" class="build-projectlist-widget shadow">Project 2</span>
                <span prname="Project 3" prid="P-1111111113" crid="Javeria Ahmed" ownerid="Somesh Sri" class="build-projectlist-widget shadow">Project 3</span>
                <span prname="Project 4" prid="P-1111111114" crid="Ashish Sahota" ownerid="Somesh Sri" class="build-projectlist-widget shadow">Project 4</span>
                <span prname="Project 5" prid="P-1111111115" crid="Somesh Sri" ownerid="Somesh Sri" class="build-projectlist-widget shadow">Project 5</span>

              </div>
              <div class="build-body">
                <div class="build-body-header color-sc">
                    <span class="projectname">Project 1<span class="owner" title="Project Manager">Somesh Sri</span></span>
                    <span class="projectid" >Project 1<span class="creator" title="Project Creator">Brijesh Patel</span></span>
                </div>
                <span id="build-body-action-build" class="build-body-action color-sc shadow">Build</span>
                <!-- <span id="build-body-action-reset" class="build-body-action color-sc shadow">Reset Data<br>(will need verification)</span>
                <span id="build-body-action-delete" class="build-body-action color-sc shadow">Delete Project<br>(will need verification)</span> -->
              </div>
            </div>

            <div class="schedule-body-schedule hidden schedule-body-widget-">
              
              <div class="pschedule-header color-sc">
                <span class="pschedule-header-projectid">Project Id: P-98787678</span>
                <span class="pschedule-header-ownerid">Owner Id: U-98787678</span>
                <div class="pschedule-header-search-con">
                  <select name="" id="pschedule-header-search-projectlist">
                    <option>Project 1</option>
                    <option>Project 2</option>
                    <option>Project 3</option>
                    <option>Project 4</option>
                  </select>
                  <button id="pschedule-header-search-submit" class="btn-shadow">Retrieve Project</button>
                </div>
              </div>

              <div class="pschedule-body">

                <div class="pschedule-body-pschedulelist">
                  <div class="pschedule-body-pschedulelist-legend">
                    <span class="blocking color-title">
                      <i class="fas fa-eye"></i>
                      Expand
                    </span>
                    <span class="dateLegend color-sc">Draft SD</span>
                    <span class="dateLegend color-sc">Draft ED</span>
                    <span class="dateLegend color-sc">Review ED</span>
                    <span class="dateLegend color-sc">Approval ED</span>
                    <span class="dateLegend color-sc">Execution ED</span>
                    <span class="dateLegend color-sc">PostApproval ED</span>
                  </div>
                  <div class="pschedulelist-widget-con">
                    

                    <div id="pschedulelist_PD-1234515" class="pschedulelist-widget color-sc">
                      <div class="pschedulelist-widget-title">
                        <i class="fas fa-stream handle pschedulelist-widget-addpschedule"></i>
                        <span class="">Document Title is super </span>
                        <input type="date">
                        <input type="date">
                        <input type="date">
                        <input type="date">
                        <input type="date">
                        <input type="date">
                        <i status="edit" class="fas fa-edit handler-icon"></i>
                        <i class="fas fa-link handler-icon"></i>
                        <i class="fas fa-paperclip handler-icon"></i>
                      </div>
                      <i class="fas fa-plus "></i>
                        
                      <div id="${pscheduleList[i].pscheduleid}" planid="${pscheduleList[i].planid}" projectid="${pscheduleList[i].projectid}" name="${pscheduleList[i].pschedulename}" class="pschedulelist-widget-pschedule">
                        <input value="" type="text" class="pschedulelist-widget-pschedule-name-i">
                        <span class="pschedulelist-widget-pschedule-name-s">pschedule Name <div><span class="totalhours">200 Hrs</span><span class="counter">2</span> </div> </span>
                        <input class="pschedulelist-widget-date-start" value="2020-09-03" type="date" disabled>
                        <input class="pschedulelist-widget-date-end" value="2020-09-05" type="date" disabled>
                        <i class="fas fa-user-plus pschedulelist-widget-icon-resources"></i>
                        <i class="fas fa-clipboard-list pschedulelist-widget-icon-clipboard"></i>
                        <i status="edit" class="fas fa-edit pschedulelist-widget-icon-edit"></i>
                        <i class="fas fa-trash pschedulelist-widget-icon-delete"></i>
                      </div>
                      <div id="${pscheduleList[i].pscheduleid}" planid="${pscheduleList[i].planid}" projectid="${pscheduleList[i].projectid}" name="${pscheduleList[i].pschedulename}" class="pschedulelist-widget-pschedule">
                          <input value="" type="text" class="pschedulelist-widget-pschedule-name-i">
                          <span class="pschedulelist-widget-pschedule-name-s">pschedule Name pschedule Name is Suuuper Very long you forgot its name <div><span class="totalhours">200 Hrs</span><span class="counter">2</span></div> </span>
                          <input class="pschedulelist-widget-date-start" value="2020-09-03" type="date" disabled>
                          <input class="pschedulelist-widget-date-end" value="2020-09-05" type="date" disabled>
                          <i class="fas fa-user-plus pschedulelist-widget-icon-resources"></i>
                          <i class="fas fa-clipboard-list pschedulelist-widget-icon-clipboard"></i>
                          <i status="edit" class="fas fa-edit pschedulelist-widget-icon-edit"></i>
                          <i class="fas fa-trash pschedulelist-widget-icon-delete"></i>
                      </div>
                      
                    
                    </div>
                  </div>
                </div>

                <div status="closed" class="pschedule-clipboard btn-shadow">
                  <i class="fas fa-clipboard-list pschedule-clipboard-icon"></i>
                  <div class="pschedule-clipboard-form">
                    <span class="pschedule-clipboard-title">Clipboard<i class="fas fa-times"></i></span>
                    <div class="pschedule-clipboard-addpschedule">
                      <input type="text" placeholder="Add pschedule">
                      <button class="btn-shadow">Add Task</button>
                    </div>
                    <div class="pschedule-clipboard-pschedulelist">
                      <span class="pschedule-clipboard-pschedulelist-widget color-sc">pschedule Name <i class="fas fa-trash"></i></span>
                      <span class="pschedule-clipboard-pschedulelist-widget color-sc">pschedule Name <i class="fas fa-trash"></i></span>
                      <span class="pschedule-clipboard-pschedulelist-widget color-sc">pschedule Name <i class="fas fa-trash"></i></span>
                      <span class="pschedule-clipboard-pschedulelist-widget color-sc">pschedule Name <i class="fas fa-trash"></i></span>
                      <span class="pschedule-clipboard-pschedulelist-widget color-sc">pschedule Name <i class="fas fa-trash"></i></span>
                      <span class="pschedule-clipboard-pschedulelist-widget color-sc">pschedule Name <i class="fas fa-trash"></i></span>
                    </div>

                  </div>
                </div>

                <div class="pschedule-resources-con">
                  <div class="pschedule-resources-form btn-shadow">
                    <span class="pschedule-resources-form-title">Add Resources to pschedule: <span class="pschedule-resources-form-title-pschedulename">Custom pschedule Name</span></span>
                    <fieldset class="pschedule-resources-form-type-con">
                      <legend>Select Type of Resource</legend>
                      <input class="pschedule-resources-form-type-handle" id="pschedule-resources-form-type-hours" type="radio" name="prefs-type" value="hours" checked>
                      <label for="pschedule-resources-form-type-hours">Hourly</label>
                      <input class="pschedule-resources-form-type-handle" id="pschedule-resources-form-type-supplier" type="radio" name="prefs-type" value="supplier">
                      <label for="pschedule-resources-form-type-supplier">Supplier</label>
                      <input class="pschedule-resources-form-type-handle" id="pschedule-resources-form-type-tm" type="radio" name="prefs-type" value="tm">
                      <label for="pschedule-resources-form-type-tm">T&M</label>
                    
                      <div class="pschedule-resources-form-type-hours pschedule-resources-form-type-container">
                        <select name="" id="pschedule-resources-form-type-hours-select">
                          <option value="us1">User 1</option>
                          <option value="us2">User 2</option>
                          <option value="us3">User 3</option>
                        </select>
                        <input type="text" id="pschedule-resources-form-type-hours-input" placeholder="Hours">
                        <button class="btn-shadow pschedule-resources-form-type-submit">Add Resource</button>
                      </div>
                      <div class="pschedule-resources-form-type-supplier pschedule-resources-form-type-container">
                        <select name="" id="pschedule-resources-form-type-supplier-select">
                          <option value="sup1">Supplier 1</option>
                          <option value="sup2">Supplier 2</option>
                          <option value="sup3">Supplier 3</option>
                        </select>
                        <input type="text" id="pschedule-resources-form-type-supplier-input" placeholder="Add New Supplier">
                        <button class="btn-shadow pschedule-resources-form-type-submit">Add Resource</button>
                      </div>
                      <div class="pschedule-resources-form-type-tm pschedule-resources-form-type-container">
                        <select name="" id="pschedule-resources-form-type-tm-select">
                          <option value="sup4">Supplier 1</option>
                          <option value="sup5">Supplier 2</option>
                          <option value="sup6">Supplier 3</option>
                        </select>
                        <input type="text" id="pschedule-resources-form-type-tm-input" placeholder="Add New Supplier">
                        <input id="pschedule-resources-form-type-tm-maxhours" type="text" placeholder="Hours">
                        <button class="btn-shadow pschedule-resources-form-type-submit">Add Resource</button>
                      </div>
                    </fieldset>

                    <div class="pschedule-resources-form-connect-list">
                      <span class="pschedule-resources-form-connect-list-widget color-sc">Firstname Lastname 
                        <div>
                          <input type="text" placeholder="hours" value="40" disabled>
                          <i status="edit" class="fas fa-edit pschedule-resources-form-connect-list-widget-edit"></i>
                          <i class="fas fa-trash pschedule-resources-form-connect-list-widget-edit"></i>
                        </div>
                      </span>
                      <span class="pschedule-resources-form-connect-list-widget color-sc">Firstname Lastname 
                        <div><input type="text" placeholder="hours" value="40" disabled><i status="edit" class="fas fa-edit pschedule-resources-form-connect-list-widget-edit"></i><i class="fas fa-trash pschedule-resources-form-connect-list-widget-edit"></i></div>
                      </span>
                      <span class="pschedule-resources-form-connect-list-widget color-sc">Firstname Lastname 
                        <div><input type="text" placeholder="hours" value="40" disabled><i status="edit" class="fas fa-edit pschedule-resources-form-connect-list-widget-edit"></i><i class="fas fa-trash pschedule-resources-form-connect-list-widget-edit"></i></div>
                      </span>
                    </div>

                    <span class="pschedule-resources-form-totalhours-con">Total Hours: <span class="pschedule-resources-form-totalhours"></span></span>


                  </div>
                </div>

                <div class="pdocument-link-con">
                  <div class="pdocument-link-form btn-shadow">
                    <span class="pdocument-link-form-title">Add Link to <span class="pdocument-link-form-title-pdocumentname">Custom Task Name</span></span>
                    <div class="pdocument-link-form-stage-select">
                      <select name="" id="">
                        <option value="drafted">Draft End</option>
                        <option value="reviewed">Review End</option>
                        <option value="approveed">Approve End</option>
                        <option value="executioned">Execution End</option>
                        <option value="postapproveed">Post Approval End</option>
                      </select>
                      <button class="btn-shadow">Select Stage</button>
                    </div>

                    <div class="pdocument-link-form-pdocument-select">
                      <select name="" id="pdocument-select">
                        <option value="">Document Name 1</option>
                        <option value="">Document Name 2</option>
                        <option value="">pDocument Name 3</option>
                        <option value="">pDocument Name 4</option>
                      </select>
                      <button class="btn-shadow">Add Link</button>
                    </div>

                    <div class="pdocument-link-form-pdocument-list">
                      <span>pDocument Name 1<span>2020-09-01<i class="fas fa-trash"></i></span></span>
                      <span>pDocument Name 2<span>2020-09-01<i class="fas fa-trash"></i></span></span>
                      <span>pDocument Name 3<span>2020-09-01<i class="fas fa-trash"></i></span></span>
                    </div>

                  </div>
                </div>

                <div class="pdocument-preds-con">
                  <div class="pdocument-preds-form btn-shadow">
                    <span class="pdocument-preds-form-title">Add Predecessor to <span class="pdocument-preds-form-title-pdocumentname">Custom pDocument Name</span></span>
                    <div class="pdocument-preds-form-stage-select">
                      <select name="" id="">
                        <option value="draftsd">Draft Start</option>
                        <option value="drafted">Draft End</option>
                        <option value="reviewed">Review End</option>
                        <option value="approveed">Approve End</option>
                        <option value="executioned">Execution End</option>
                        <option value="postapproveed">Post Approval End</option>
                      </select>
                      <button class="btn-shadow">Select Stage</button>
                    </div>

                    <div class="pdocument-preds-form-pdocument-select">
                      <select name="" id="">
                        <option value="">pDocument Name 1</option>
                        <option value="">pDocument Name 2</option>
                        <option value="">pDocument Name 3</option>
                        <option value="">pDocument Name 4</option>
                      </select>
                      <button class="btn-shadow">Add Predecessor</button>
                    </div>

                    <div class="pdocument-preds-form-pdocument-list">
                      <span>pDocument Name 1 <span>2020-09-01<i class="fas fa-trash"></i></span></span>
                      <span>pDocument Name 2 <span>2020-09-01<i class="fas fa-trash"></i></span></span>
                      <span>pDocument Name 3 <span>2020-09-01<i class="fas fa-trash"></i></span></span>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            <div class="schedule-body-create hidden schedule-body-widget-">
              <div class="content color-sc">
                <input id="project-id" type="text" placeholder="Create Project ID or Generate One">
                <input id="project-name"type="text" placeholder="Project Name">
                <input id="project-reference"type="text" placeholder="Internal Reference Number (optional)">
                <button id="project-rng-id" class="btn-shadow">Generate Random Project ID</button>
                <button id="project-create" class="btn-shadow">Create Project</button>
              </div>
            </div>

            <div class="schedule-body-share hidden schedule-body-widget-">
              <div class="share-header">
                <!-- <span class="share-header-title color-sc">share Schedule</span> -->
                <div class="share-header-retrieve color-sc">
                  <!-- <span class="share-header-retrieve-header">Retrieve Documents From Project</span> -->
                  <!-- <br> -->
                  <div class="share-header-retrieve-body">
                    <select id="share-header-retrieve-project-con">
                      <option>Test Schedule</option>
                      <option>Project 1</option>
                      <option>Project 1</option>
                    </select>
                    <button id="share-header-retrieve-pull" class="btn-shadow">Select Project</button>
                  </div>
                </div>
              </div>

              <div class="content color-sc">
                <div id="project-connect-search-con" class="project-sameline">
                    <input id="project-connect-search-id" type="text" placeholder="Enter Name or Lastname">
                    <button id="project-connect-search" class="btn-shadow">Search</button>
                </div>
                <div class="project-connect-search-list">
                    <select name="" id="project-connect-search-select">
                        <option value="">Test 1</option>
                        <option value="">Test 2</option>
                    </select>
                    <button id="project-connect-submit" class="btn-shadow">Connect</button>
                </div>

              </div>

            </div>
            
            <div class="schedule-body-request hidden schedule-body-widget">

              <div class="request-incoming-con request-widget-con color-sc">
                <span class="title">Incoming</span>
                <div class="request-incoming-widget-con">

                  <div class="request-incoming-widget btn-shadow">
                    <span class="projectname">Project Name</span>
                    <span class="owner">Noel Santillan</span>

                    <textarea name="" id="" maxlength="100" placeholder="Note Limit 500 characters"></textarea>
                    <div class="btn">
                      <button class="btn-shadow request-incoming-widget-action inreject">Reject</button>
                      <button class="btn-shadow request-incoming-widget-action inview">View</button>
                      <button class="btn-shadow request-incoming-widget-action inapprove">Approve</button>
                    </div>
                  </div>

                </div>
              </div>

              <div class="request-outgoing-con request-widget-con color-sc">
                <span class="title">Outgoing <i class="fas fa-info-circle" title="LEGEND:: Yellow: Waiting, Green: Approved, Red: Rejected"></i></span>
                <div class="request-outgoing-widget-con">

                  <div class="request-outgoing-widget btn-shadow">
                    <div class="title">
                      <span class="projectname">Project Name 1</span>
                      <div class="icons">
                        <i class="fas fa-eye request-outgoing-widget-close"></i>
                        <i class="fas fa-trash"></i>
                      </div>
                    </div>
                    <div class="request-outgoing-account-list hidden">
                      <span class="request-outgoing-account waiting shadow">Noel Santillan<i class="fas fa-minus-circle"></i></span>
                      <span class="request-outgoing-account approved shadow">Noel Santillan<i class="fas fa-check-circle"></i></span>
                      <span class="request-outgoing-account rejected shadow">Noel Santillan<i class="fas fa-times-circle"></i></span>
                    </div>
                    <button class="btn-shadow hidden">Activate Project</button>
                    <button class="btn-shadow retry hidden" title="Another request will be sent to the directors. Old Requests will be deleted.">Resend Project Request</button>
                  </div>
                  <div class="request-outgoing-widget btn-shadow">
                    <div class="title">
                      <span class="projectname">Project Name 2</span>
                      <div class="icons">
                        <i class="fas fa-eye request-outgoing-widget-close"></i>
                        <i class="fas fa-trash"></i>
                      </div>
                    </div>
                    <div class="request-outgoing-account-list hidden">
                      <span class="request-outgoing-account approved shadow">Brijesh Patel<i class="fas fa-check-circle"></i></span>
                      <span class="request-outgoing-account approved shadow">Somesh Sri<i class="fas fa-check-circle"></i></span>
                      <span class="request-outgoing-account approved shadow">Noel Santillan<i class="fas fa-check-circle"></i></span>
                    </div>
                    <button class="btn-shadow activate hidden">Activate Project</button>
                    <button class="btn-shadow retry hidden" title="Another request will be sent to the directors. Old Requests will be deleted.">Resend Project Request</button>
                  </div>

                </div>

              </div>

              <div class="request-create-con request-widget-con color-sc">
                <span class="title">Create</span>
                <span class="select-title">Select Project</span>
                <select name="" id="request-create-con-prlist">
                  <option value="">Project 1</option>
                  <option value="">Project 2</option>
                  <option value="">Project 3</option>
                </select>
                <br>
                <div class="request-create-w">
                  <input type="text" placeholder="Search Name or Lastname">
                  <button id="request-create-con-search" class="btn-shadow">Search</button>
                </div>
                <br>
                <span class="select-title">Select Account<i class="fas fa-info-circle" title="Select Account as the Director who will approve the Request. Supervisor is automatically selected."></i></span>
                <div class="request-create-w">
                  <select name="" id="request-create-con-addlist">
                    <option value="">Account 1</option>
                    <option value="">Account 2</option>
                    <option value="">Account 3</option>
                  </select>
                  <button id="request-create-con-add" class="btn-shadow">Add Account</button>
                </div>
                <div class="request-create-account-list">
                  <span class="request-create-account btn-shadow">Noel Santillan <i class="fas fa-trash"></i></span>
                  <span class="request-create-account btn-shadow">Noel Santillan <i class="fas fa-trash"></i></span>
                  <span class="request-create-account btn-shadow">Noel Santillan <i class="fas fa-trash"></i></span>
                  <span class="request-create-account btn-shadow">Noel Santillan <i class="fas fa-trash"></i></span>
                  <span class="request-create-account btn-shadow">Noel Santillan <i class="fas fa-trash"></i></span>
                  <span class="request-create-account btn-shadow">Noel Santillan <i class="fas fa-trash"></i></span>
                </div>
                <button id="request-create-con-submit" class="btn-shadow submit">Send Request</button>
                
              </div>

            </div>

            <div class="request-createtool-con schedule-body-widget hidden">
              <div class="content">
                <div class="request-createtool-header">
                  <span id="request-createtool-header-technical" class="request-createtool-header-w idle">Technical</span>
                  <span id="request-createtool-header-schedule" class="request-createtool-header-w idle">Schedule</span>
                  <span id="request-createtool-header-budget" class="request-createtool-header-w idle">Budget</span>
                  <span id="request-createtool-header-financial" class="request-createtool-header-w idle">Financial</span>
                  <span id="request-createtool-header-review" class="request-createtool-header-w idle">Review</span>
                  
                  <i class="request-createtool-header-close fas fa-times-circle"></i>
                  <i status="locked" class="request-createtool-header-lock fas fa-lock"></i>
                  <i class="request-createtool-header-print fas fa-print"></i>
                </div>
                <div class="request-createtool-required hidden">
                  <div class="crfill2">
                    <div class="crfill1">
                      <span>Project Name</span>
                      <input id="request-createtool-required-projectname" type="text" placeholder="Project Name">
                    </div>
                    <div class="crfill1">
                      <span>Project Request Number</span>
                      <input id="request-createtool-required-requestid" type="text" placeholder="Project Request Number">
                    </div>
                  </div>
                  <div class="crfill1">
                      <span>Project Score</span>
                      <input id="request-createtool-required-score" type="text" placeholder="Project Score" disabled>
                  </div>
                  <div class="crfill1">
                    <span>Project Description</span>
                    <input id="request-createtool-required-description" type="text" placeholder="Project Description">
                  </div>
                  <div class="crfill1">
                    <span>Location Line 1</span>
                    <input id="request-createtool-required-loc1" type="text" placeholder="Location Line 1">
                  </div>
                  <div class="crfill1">
                    <span>Location Line 2</span>
                    <input id="request-createtool-required-loc2" type="text" placeholder="Location Line 2">
                  </div>
                  <div class="crfill2">
                    <div class="crfill1">
                      <span>Department</span>
                      <select name="" id="request-createtool-required-department" >
                        <option value="">Department 1</option>
                        <option value="">Department 2</option>
                        <option value="">Department 3</option>
                        <option value="">Department 4</option>
                      </select>
                    </div>
                    <div class="crfill1">
                      <span>Requester</span>
                      <select name="" id="request-createtool-required-requestor" >
                        <option value="">Account Name 1</option>
                        <option value="">Account Name 2</option>
                        <option value="">Account Name 3</option>
                        <option value="">Account Name 4</option>
                      </select>
                    </div>
                  </div>
                  <div class="crfill2">
                    <div class="crfill1">
                      <span>Project Manager</span>
                      <select name="" id="request-createtool-required-manager" >
                        <option value="">Account Name 1</option>
                        <option value="">Account Name 2</option>
                        <option value="">Account Name 3</option>
                        <option value="">Account Name 4</option>
                      </select>
                    </div>
                    <div class="crfill1">
                      <span>Project Sponsor</span>
                      <input id="request-createtool-required-sponsor" type="text">
                    </div>
                  </div>
                </div>
                <div class="request-createtool-body">

                  <div class="createtool-container hidden request-createtool-technical-con">
                    <div class="createtool-maintitle d">
                      <span class="crtitle btn-shadow">PROJECT DESCRIPTION<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Background<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Current state / landscape of the business; Performance gap / problem description; Main drivers of the project; Why emergency project; How it is linked to site strategy; Infrastructure project.</span>
                            <textarea id="request-createtool-technical-desc_1" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                            <!-- <div class="request-createtool-technical-con-scoring active">
                              <i class="far fa-info-circle" title="Click to Save Score"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star1" star="1"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star2" star="2"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star3" star="3"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star4" star="4"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star5" star="5"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star6" star="6"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star7" star="7"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star8" star="8"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star8" star="8"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star9" star="9"></i>
                              <i class="far fa-star request-createtool-technical-con-scoring-star star10" star="10"></i>
                            </div> -->
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Project Objectives<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: What is the project?  Describe the changes / future state (not stated solution).</span>
                            <textarea id="request-createtool-technical-desc_2" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Project Alternative / Risk of Waiting<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Iinstruction: Describe what has been considered as an alternative to implementing this new project request. Describe what would happen if to wait 1 year.</span>
                            <textarea id="request-createtool-technical-desc_3" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Project Technical Scope<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">What is In-Scope</span>
                            <textarea id="request-createtool-technical-desc_4_1" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                            <span class="instruction">What is Out-of-Scope</span>
                            <textarea id="request-createtool-technical-desc_4_2" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <button id="createtool-add-d" class="createtool-add btn-shadow">Add Row</button>
                      </div>
                    </div>
                    <div class="createtool-maintitle p">
                      <span class="crtitle btn-shadow">PROJECT PRIORITIZATION<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Quality<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: What is quality impact if project is not done?</span>
                            <textarea id="request-createtool-technical-prior_1" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Financials<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Payback, ROI, Funding strategy, budget, existing IO, exchange rates, forecast, capacity plan,  etc., (if known)</span>
                            <textarea id="request-createtool-technical-prior_2" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Compliance or Regulation<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Identify gaps for compliance?</span>
                            <textarea id="request-createtool-technical-prior_3" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Business Continuity Risk<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Is there a current risk mitigation plan in place until the project is implemented? Describe what would happen if to wait 1 year before initiated requested project.</span>
                            <textarea id="request-createtool-technical-prior_4" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Business Investment / Profatibility<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: If this is a new investment and will provide profatibility, identify the factors.</span>
                            <textarea id="request-createtool-technical-prior_5" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Assumptions to linked Projects/Dependencies<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Assumptions including those linked to an associated enabling projects. Impact of delay on enabling project/s on this request.</span>
                            <textarea id="request-createtool-technical-prior_6" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Risks / Challenges / Road Blocks<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Detail if it is in the site's Risk Register and if so what grading. Emphasize major risk areas and any potential unknown risks. (Include #)</span>
                            <textarea id="request-createtool-technical-prior_7" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Site Resources<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <span class="instruction">Instruction: Will requesting dept. use internal resources to execute and if so what elements?</span>
                            <textarea id="request-createtool-technical-prior_8" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <button id="createtool-add-p" class="createtool-add btn-shadow">Add Row</button>
                      </div>
                    </div>
                    <div class="createtool-maintitle s">
                      <span class="crtitle btn-shadow">PROJECT STRATEGY<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Strategy 1<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <textarea id="request-createtool-technical-strat_1" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Project Close out Requirements<i class="fas fa-caret-left"></i></span>
                          <div class="content">
                            <textarea id="request-createtool-technical-strat_2" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                          </div>
                        </div>
                        <button id="createtool-add-s" class="createtool-add btn-shadow">Add Row</button>
                      </div>
                    </div>
                    <button id="request-createtool-save" class="btn-shadow">Save</button>
                  </div>
                  <div class="createtool-container hidden request-createtool-financial-con">
                    <!-- <div class="crfill2">
                      <div class="crfill1">
                        <span>Requested Amount</span>
                        <input type="text" placeholder="Requested Amount">
                      </div>
                      <div class="crfill1">
                        <span>Currency</span>
                        <input type="text" placeholder="Currency">
                      </div>
                    </div>
                    <div class="crfill1-">
                      <span>Budgeted? (select one)</span>
                      <span class="blocking"></span>
                      <label for="createtool-financial-budgeted-yes">Yes</label>
                      <input id="createtool-financial-budgeted-yes" name="createtool-financial-budgeted" type="radio">
                      <label for="createtool-financial-budgeted-no">No</label>
                      <input id="createtool-financial-budgeted-no" name="createtool-financial-budgeted" type="radio">
                    </div> -->
                    <div class="createtool-maintitle ">
                      <span class="crtitle btn-shadow">ITEM CHECKLIST<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-financial-itemlist-legend">
                          <span>Item Name</span>
                          <span>CAPEX Cost</span>
                          <span>OPEX Cost</span>
                          <span>Vendor</span>
                          <span>Costing Available</span>
                        </div>
                        <div class="createtool-financial-itemlist-body">
                          <!-- <div class="createtool-financial-itemlist-widget">
                            <input type="text" placeholder="Item Name">
                            <input type="text" placeholder="$">
                            <input type="text" placeholder="$">
                            <input type="text" placeholder="Vendor">
                            <input type="text" placeholder="Costing Available">
                          </div> -->
                        </div>
                        <div class="createtool-financial-itemlist-totals">
                          <div class="itemlistrow">
                            <div>
                              <span>Contingency</span>
                              <input id="createtool-financial-itemlist-totals-contingency" value="10" type="text" placeholder="%">
                            </div>
                            <input id="createtool-financial-itemlist-totals-contingency-capex" class="total" type="text" placeholder="$" disabled>
                            <input id="createtool-financial-itemlist-totals-contingency-opex" class="total" type="text" placeholder="$" disabled>
                            <input type="text" disabled>
                            <input type="text" disabled>
                          </div>
                          <div class="itemlistrow">
                            <span>Write off (if any see section below) - EXT OPEX</span>
                            <input type="text" disabled>
                            <input type="text" placeholder="$">
                            <input type="text" disabled>
                            <input type="text" disabled>
                          </div>
                          <div class="itemlistrow">
                            <span><b>Total</b></span>
                            <input id="createtool-financial-itemlist-totals-capex" class="total" type="text" value="$12.00" disabled>
                            <input id="createtool-financial-itemlist-totals-opex" class="total" type="text" placeholder="$15.00" disabled>
                            <input type="text" disabled>
                            <input type="text" disabled>
                          </div>
                          <div class="itemlistrow">
                            <span><b>Project Cost</b></span>
                            <input type="text" disabled>
                            <input type="text" disabled>
                            <input type="text" disabled>
                            <input id="createtool-financial-itemlist-totals-projectcost" class="total" type="text" value="$12.00" disabled>
                          </div>
                        </div>
                        <!-- <button id="createtool-financial-itemlist-add" class="btn-shadow">Add Rows</button> -->
                      </div>
                    </div>
                    <div class="createtool-maintitle ">
                      <span class="crtitle btn-shadow">PREREQUISITE CHECKLIST<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-financial-preqlist-legend">
                          <span>Item / Document</span>
                          <span>Status</span>
                          <span>Doc #</span>
                          <span>Comments</span>
                          <span>A</span>
                        </div>
                        <div class="createtool-financial-preqlist-body">

                          <div class="createtool-financial-preqlist-widget">
                            <input class="item" type="text" placeholder="Item / Document">
                            <select >
                              <option value="">Option 1</option>
                              <option value="">Option 2</option>
                            </select>
                            <input class="doc" type="text" placeholder="Doc #">
                            <textarea maxlength="200" placeholder="200 Chars Maximum"></textarea>
                            <div class="action">
                              <i class="fas fa-save createtool-financial-preqlist-widget-save"></i>
                              <i class="fas fa-trash createtool-financial-preqlist-widget-delete"></i>
                            </div>
                          </div>

                        </div>
                        <button id="createtool-financial-preqlist-add" class="btn-shadow">Add Rows</button>
                      </div>

                    </div>
                  </div>
                  <div class="createtool-container hidden request-createtool-schedule-con">
                    <?php
                      include "../../helper/prequestschedule.html";
                    ?>
                  </div>
                  <div class="createtool-container hidden request-createtool-budget-con">
                    <div id="request-createtool-budget-con-dashboard" class="createtool-maintitle">
                      <span class="crtitle btn-shadow">BUDGETING DASHBOARD<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-budget-itemlist-legend">
                          <span>Item Category</span>
                          <span>Budget Item</span>
                          <span>Category</span>
                          <span>CAPEX Cost</span>
                          <span>OPEX Cost</span>
                          <span>Vendor</span>
                          <span>Costing</span>
                          <span>Actions</span>
                        </div>
                        <div class="createtool-budget-itemlist-body">
                          <!-- <div class="createtool-budget-itemlist-widget">
                            <select class="budget-itemlist-widget-itemcategory">
                              <option value="hours">Category 1</option>
                              <option value="hours">Category 2</option>
                              <option value="hours">Category 3</option>
                            </select>
                            <select class="budget-itemlist-widget-item">
                              <option value="hours">Item 1</option>
                              <option value="hours">Item 2</option>
                              <option value="hours">Item 3</option>
                              <option value="hours">Item 4</option>
                            </select>
                            <select class="budget-itemlist-widget-category" class="popup_widget_upload-category">
                              <option value="hours">Internal</option>
                              <option value="supplier">Supplier (Lumpsum)</option>
                              <option value="tm">Supplier (T&M)</option>
                            </select>
                            <input class="budget-itemlist-widget-capex" type="text" placeholder="$">
                            <input class="budget-itemlist-widget-opex" type="text" placeholder="$">
                            <select class="budget-itemlist-widget-vendor">
                              <option value="">Supplier 1</option>
                              <option value="">Supplier 2</option>
                              <option value="">Supplier 3</option>
                            </select>
                            <input class="budget-itemlist-widget-costing" type="text" placeholder="Costing" disabled>
                            <div class="action">
                              
                              <i onclick="$(this).siblings('.popup-widget-upload-get').click();" class="fas fa-upload" title="upload attachment"></i>
                              <i class="fas fa-coins popup-widget-upload-costing" title="Generate Costing"></i>
                              <i class="fas fa-save budget-itemlist-widget-save" title="save"></i>
                              <i class="fas fa-trash budget-itemlist-widget-delete" title="delete"></i>
                            </div>
                          </div> -->
                        </div>

                        <button id="createtool-budget-itemlist-addrow" class="btn-shadow">Add Rows</button>
                        <button id="createtool-budget-itemlist-additems" class="btn-shadow" style="margin-top: 10px;">Add Items</button>
                      </div>
                    </div>
                    <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">OPEX DASHBOARD - Internal Manhours<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden">
                        <div class="createtool-opex-itemlist-legend">
                          <span>Team Member Name</span>
                          <span>Role</span>
                          <span>Alloted Hours</span>
                          <span>Rate $/Hr</span>
                          <span>Budget Amount (no tax)</span>
                          <span>A</span>
                        </div>
                        <div class="createtool-opex-itemlist-body">
                          <div class="createtool-opex-itemlist-widget">
                            <input class="name" type="text" placeholder="Team Member Name" value="Team Member Name" disabled>
                            <input class="role" type="text" placeholder="Role">
                            <input class="hours" type="text" placeholder="Alloted Hours" value="12 Hrs" disabled>
                            <input class="rate" type="text" placeholder="Rate $/hr">
                            <input class="total" type="text" placeholder="$" value="$200.00" disabled>
                            <i class="fas fa-save createtool-opex-itemlist-widget-save"></i>
                          </div>
                        </div>
                        <!-- <button id="createtool-opex-itemlist-add" class="btn-shadow">Add Rows</button> -->
                      </div>
                    </div>
                    <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">BASELINE OPEX FORECAST<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden request-createtool-budget-baselineforecast-opex">
                        

                        <!-- // THIS IS RESOURCE VIEW // -->
                        <!-- <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Resource 1<i class="fas fa-caret-left"></i></span>
                          <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                            
                            <div class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input type="text"><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                                  <div class="widget t1">
                                    <span class="title">T1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t2">
                                    <span class="title">T2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t3">
                                    <span class="title">T3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="header">
                              <div class="fill">
                                <span>Budget Amount</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill">
                                <span>Remaining Budget</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill type">
                                <span>View Type</span>
                                <select name="" id="">
                                  <option value="monthly">Monthly</option>
                                  <option value="trimester">Trimester</option>
                                  <option value="quarter">Quarterly</option>
                                </select>
                              </div>
                            </div>
                            <button id="createtool-budget-opexforecast-add" class="btn-shadow">Add Year</button>
                          </div>
                        </div> -->
                        
                        <!-- // THIS IS ANNUAL VIEW // -->
                        <!-- <div  class="createtool-subtitle">
                          <span class="crtitle btn-shadow">2020 - 90%<i class="fas fa-caret-left"></i></span>
                          <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                            
                            <div id="forecast_PBF-00000" year="2020" resid="RES-00000" type="opex" fid="F-00000" class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="Noel Santillan" disabled><span>90%</span><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $1200.00 &nbsp;&nbsp; Remaining Budget: $1200.00</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m1" type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m2" type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m3" type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m4" type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m5" type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m6" type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m7" type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m8" type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m9" type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m10" type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m11" type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m12" type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q1" type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q2" type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q3" type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q4" type="text" placeholder="$">
                                  </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                              </div>
                            </div>
                            
                            <div class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="Brijesh Patel" disabled><span>90%</span><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $1200.00 &nbsp;&nbsp; Remaining Budget: $1200.00</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                                  <div class="widget t1">
                                    <span class="title">T1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t2">
                                    <span class="title">T2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t3">
                                    <span class="title">T3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                              </div>
                            </div>

                            <div class="header">
                              <div class="fill">
                                <span>Budget Amount</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill">
                                <span>Remaining Budget</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill type">
                                <span>View Type</span>
                                <select name="" id="">
                                  <option value="monthly">Monthly</option>
                                  <option value="quarter">Quarterly</option>
                                </select>
                              </div>
                              <i class="fas fa-trash"></i>
                            </div>
                            
                            
                          </div>
                        </div> -->

                        <button id="createtool-budget-forecast-addyear-opex" class="btn-shadow">Add Year</button>

                        <div id="createtool-subtitle-popup-addyear-opex" class="createtool-subtitle-popup hidden">
                          <select name="" id="">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                          </select>
                          <button id="createtool-subtitle-popup-addyear-btn-opex" class="btn-shadow">Add</button>
                        </div>

                      </div>
                    </div>
                    <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">BASELINE CAPEX FORECAST<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden request-createtool-budget-baselineforecast-capex">
                        

                        <!-- // THIS IS RESOURCE VIEW // -->
                        <!-- <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">Resource 1<i class="fas fa-caret-left"></i></span>
                          <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                            
                            <div class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input type="text"><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                                  <div class="widget t1">
                                    <span class="title">T1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t2">
                                    <span class="title">T2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t3">
                                    <span class="title">T3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="header">
                              <div class="fill">
                                <span>Budget Amount</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill">
                                <span>Remaining Budget</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill type">
                                <span>View Type</span>
                                <select name="" id="">
                                  <option value="monthly">Monthly</option>
                                  <option value="trimester">Trimester</option>
                                  <option value="quarter">Quarterly</option>
                                </select>
                              </div>
                            </div>
                            <button id="createtool-budget-opexforecast-add" class="btn-shadow">Add Year</button>
                          </div>
                        </div> -->
                        
                        <!-- // THIS IS ANNUAL VIEW // -->
                        <!-- <div class="createtool-subtitle">
                          <span class="crtitle btn-shadow">2020 - 90%<i class="fas fa-caret-left"></i></span>
                          <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                            
                            <div class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="Noel Santillan" disabled><span>90%</span><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $1200.00 &nbsp;&nbsp; Remaining Budget: $1200.00</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                                  <div class="widget t1">
                                    <span class="title">T1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t2">
                                    <span class="title">T2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t3">
                                    <span class="title">T3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                              </div>
                            </div>
                            
                            <div class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="Brijesh Patel" disabled><span>90%</span><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $1200.00 &nbsp;&nbsp; Remaining Budget: $1200.00</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                                  <div class="widget t1">
                                    <span class="title">T1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t2">
                                    <span class="title">T2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t3">
                                    <span class="title">T3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                              </div>
                            </div>

                            <div class="header">
                              <div class="fill">
                                <span>Budget Amount</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill">
                                <span>Remaining Budget</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill type">
                                <span>View Type</span>
                                <select name="" id="">
                                  <option value="monthly">Monthly</option>
                                  <option value="trimester">Trimester</option>
                                  <option value="quarter">Quarterly</option>
                                </select>
                              </div>
                              <i class="fas fa-trash"></i>
                            </div>
                            <br>
                            
                          </div>
                        </div> -->
                        <div  class="createtool-subtitle">
                          <span class="crtitle btn-shadow">2020 - 90%<i class="fas fa-caret-left"></i></span>
                          <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                            
                            <div id="forecast_PBF-00000" year="2020" resid="RES-00000" type="capex" fid="F-00000" class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="Noel Santillan" disabled><span>90%</span><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $1200.00 &nbsp;&nbsp; Remaining Budget: $1200.00</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m1" type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m2" type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m3" type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m4" type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m5" type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m6" type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m7" type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m8" type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m9" type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m10" type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m11" type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input class="createtool-budget-forecast-year-widget-m"  cid="m12" type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q1" type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q2" type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q3" type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input class="createtool-budget-forecast-year-widget-q"  cid="q4" type="text" placeholder="$">
                                  </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                              </div>
                            </div>
                            
                            <div class="createtool-subtitle">
                              <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="Brijesh Patel" disabled><span>90%</span><i class="fas fa-caret-left"></i></span>
                              <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $1200.00 &nbsp;&nbsp; Remaining Budget: $1200.00</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                  <div class="widget jan">
                                    <span class="title">January</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget feb">
                                    <span class="title">February</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget mar">
                                    <span class="title">March</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget apr">
                                    <span class="title">April</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget may">
                                    <span class="title">May</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jun">
                                    <span class="title">June</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget jul">
                                    <span class="title">July</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget aug">
                                    <span class="title">August</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget sep">
                                    <span class="title">September</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget oct">
                                    <span class="title">October</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget nov">
                                    <span class="title">November</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget dec">
                                    <span class="title">December</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                                  <div class="widget t1">
                                    <span class="title">T1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t2">
                                    <span class="title">T2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget t3">
                                    <span class="title">T3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                  <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                  <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input type="text" placeholder="$">
                                  </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                              </div>
                            </div>

                            <div class="header">
                              <div class="fill">
                                <span>Budget Amount</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill">
                                <span>Remaining Budget</span>
                                <input type="text" value="$1200.00" disabled>
                              </div>
                              <div class="fill type">
                                <span>View Type</span>
                                <select name="" id="">
                                  <option value="monthly">Monthly</option>
                                  <option value="quarter">Quarterly</option>
                                </select>
                              </div>
                              <i class="fas fa-trash"></i>
                            </div>
                            
                            
                          </div>
                        </div>

                        <button id="createtool-budget-forecast-addyear-capex" class="btn-shadow">Add Year</button>

                        <div id="createtool-subtitle-popup-addyear-capex" class="createtool-subtitle-popup hidden">
                          <select name="" id="">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                          </select>
                          <button id="createtool-subtitle-popup-addyear-btn-capex" class="btn-shadow">Add</button>
                        </div>

                      </div>
                    </div>

                    <!-- <button id="request-createtool-budget-save" class="btn-shadow">Save</button> -->

                    <div class="popup-budget-supplier hidden">
                      <div class="popup-budget-supplier-form color-sc shadow">
                        <span class="title">Supplier - Milestone based (Lump Sum) Costing</span>
                        <span class="suppliername">Supplier Name</span>
                        <div class="legend">
                          <span>Deliverable/Milestones/Items</span>
                          <span>Payment %</span>
                          <span>Budget Amount (No Tax)</span>
                        </div>
                        <div class="popup-budget-supplier-widget-con">

                          <!-- <div class="popup-budget-supplier-widget">
                            <input type="text" class="name" placeholder="Item Name">
                            <input type="text" class="payment popup-budget-supplier-widget-payment" placeholder="%">
                            <input type="text" class="total" plaecholder="Total Amount" disabled>
                          </div> -->

                        </div>
                        <button id="popup-budget-supplier-form-add" class="btn-shadow">Add rows</button>
                        <button id="popup-budget-supplier-form-save" class="btn-shadow">Save</button>
                      </div>
                    </div>

                    <div class="popup-budget-tm hidden">   
                      <div class="popup-budget-supplier-form color-sc shadow">
                        <span class="title">Supplier - T&M(Time & Materials) Costing</span>
                        <span class="suppliername">Supplier Name</span>
                        <div class="createtool-container">
                          <div class="createtool-maintitle popup-budget-supplier-material">
                            <span class="crtitle btn-shadow">Material Cost Calculator (including rental)<i class="fas fa-caret-left"></i></span>
                            <div class="content hidden popup-budget-supplier-material-con">
                              <div class="legend">
                                <span>Materials Items</span>
                                <span>Unit</span>
                                <span>Quantity</span>
                                <span>Unit Price</span>
                                <span>Amount (no tax)</span>
                                <span>A</span>
                              </div>
                              <div class="popup-budget-supplier-material-widget-con">

                                <div class="popup-budget-supplier-material-widget">
                                  <input class="name" type="text" placeholder="Item Name">
                                  <input class="unit" type="text" placeholder="Unit">
                                  <input class="quantity" type="text" placeholder="Qty.">
                                  <input class="price" type="text" placeholder="$">
                                  <input class="amount" type="text" placeholder="$" disabled>
                                  <i class="fas fa-save popup-budget-supplier-material-widget-save"></i>
                                </div>

                              </div>
                              <span class="popup-budget-supplier-material-totals">Total Amount: $1200.00</span>
                              <button id="popup-budget-supplier-material-add" class="btn-shadow">Add Rows</button>
                            </div>

                          </div>
                          <div class="createtool-maintitle popup-budget-supplier-manhour">
                            <span class="crtitle btn-shadow">Budget Manhours Calculator<i class="fas fa-caret-left"></i></span>
                            <div class="content hidden popup-budget-supplier-manhour-con">
                              <div class="legend">
                                <span>Resource Name</span>
                                <span>Role</span>
                                <span>Hours</span>
                                <span>Rate/hr</span>
                                <span>Amount (no tax)</span>
                                <span>A</span>
                              </div>
                              <div class="popup-budget-supplier-manhour-widget-con">

                                <div class="popup-budget-supplier-manhour-widget">
                                  <input class="name" type="text" placeholder="Resource Name">
                                  <input class="role" type="text" placeholder="Role">
                                  <input class="hours" type="text" placeholder="Hours">
                                  <input class="rate" type="text" placeholder="$">
                                  <input class="amount" type="text" placeholder="$" disabled>
                                  <i class="fas fa-save popup-budget-supplier-manhour-widget-save"></i>
                                </div>

                              </div>
                              <span class="popup-budget-supplier-manhour-totals">Total Amount: $1200.00</span>
                              <button id="popup-budget-supplier-manhour-add" class="btn-shadow">Add Rows</button>
                            </div>

                          </div>
                          <div class="createtool-maintitle">
                            <span class="crtitle btn-shadow">Milestone Based Hours Calculator<i class="fas fa-caret-left"></i></span>
                            <div class="content hidden popup-budget-supplier-milestone-con">
                              <div class="legend">
                                <span class="legend-resource-name">Milestones/ Deleiverables Breakdown</span>
                                <span class="legend-resource-percent">Percentage</span>
                                <div class="legend-resource">
                                  <!-- <span>Res 1</span>
                                  <span>Res 2</span>
                                  <span>Res 3</span>
                                  <span>Res 4</span> -->
                                </div>
                                <span class="legend-resource-hours">Hours</span> 
                                <span class="legend-resource-a">A</span>
                              </div>
                              <div class="popup-budget-supplier-milestone-widget-con">

                                <!-- <div class="popup-budget-supplier-milestone-widget">
                                  <input class="name" type="text" placeholder="Resource Name">
                                  <input class="percent" type="text" placeholder="Percentage" disabled>
                                  <div class="resource">
                                    <input type="text" placeholder="$">
                                    <input type="text" placeholder="$">
                                    <input type="text" placeholder="$">
                                    <input type="text" placeholder="$">
                                  </div>
                                  <input class="popup-budget-supplier-milestone-allotedhours" type="text" placeholder="Hrs" disabled>
                                  <i class="fas fa-save popup-budget-supplier-milestone-widget-save"></i>
                                </div> -->

                              </div>
                              <button id="popup-budget-supplier-milestone-addrows" class="btn-shadow" style="margin-top: 5px;">Add Rows</button>
                            </div>

                          </div>
                          <div class="createtool-maintitle">
                            <span class="crtitle btn-shadow">Expense Calculator - Travel, Mileage, Hotel<i class="fas fa-caret-left"></i></span>
                            <div class="content hidden popup-budget-supplier-expense-con">
                              <div class="legend">
                                <span>Resource Name</span>
                                <span>Total Weeks</span>
                                <span>Trips/Week</span>
                                <span>Km/Miles per Trip</span>
                                <span>Rate $/km-miles</span>
                                <span>Hours per Trip</span>
                                <span>Rate $/hr</span>
                                <span>Fixed Rate per Trip</span>
                                <span>Total Cost</span>
                                <span>A</span>
                              </div>
                              <div class="popup-budget-supplier-expense-widget-con">

                                <div class="popup-budget-supplier-expense-widget">
                                  <input type="text" placeholder="Resource Name">
                                  <input class="weeks" type="text" placeholder="Total Weeks">
                                  <input class="trips" type="text" placeholder="Trips/Week">
                                  <input class="distance" type="text" placeholder="Km/Miles">
                                  <input class="distancerate" type="text" placeholder="$">
                                  <input class="triphours" type="text" placeholder="hrs">
                                  <input class="triphoursrate" type="text" placeholder="$">
                                  <input class="fixedrate" type="text" placeholder="$">
                                  <input class="total" type="text" placeholder="$" disabled>
                                  <i class="fas fa-save popup-budget-supplier-expense-widget-save"></i>
                                </div>

                              </div>
                              <span class="popup-budget-supplier-expense-totals">Total Amount: $1200.00</span>
                              
                            </div>

                          </div>
                        </div>
                        
                        


                      </div>
                    </div>
                    
                    <div class="popup-budget-itemadd hidden">
                      <div class="popup-budget-itemadd-form color-sc shadow">
                        <span class="title">Budgeting Dashboard Item Manager</span>
                        <div class="popup-budget-itemadd-form-con">
                          <div class="popup-budget-itemadd-form-catlist">
                            <div class="popup-budget-itemadd-form-catlist-header">
                              <input type="text" placeholder="Add Category">
                              <button id="popup-budget-itemadd-form-catlist-add" class="btn-shadow">Add</button>
                            </div>
                            <div class="popup-budget-itemadd-form-catlist-widget-con">
                              <span class="popup-budget-itemadd-form-catlist-widget btn-shadow">Category Name <i class="fas fa-trash"></i></span>
                              <span class="popup-budget-itemadd-form-catlist-widget btn-shadow">Category Name <i class="fas fa-trash"></i></span>
                              
                            </div>
                          
                          </div>
                          <div class="popup-budget-itemadd-form-itemlist">
                            <span class="category">Category Name</span>
                            <div class="header">
                              <input class="name" type="text" placeholder="Add Item">
                              <input class="code" type="text" placeholder="Item Code (optional)">
                              <button id="popup-budget-itemadd-form-itemlist-add" class="btn-shadow">Add</button>
                            </div>
                            <div class="popup-budget-itemadd-form-itemlist-widget-con">
                              <!-- <span class="popup-budget-itemadd-form-itemlist-widget btn-shadow">Item Name <i class="fas fa-trash"></i></span>
                              <span class="popup-budget-itemadd-form-itemlist-widget btn-shadow">Item Name <i class="fas fa-trash"></i></span>
                              <span class="popup-budget-itemadd-form-itemlist-widget btn-shadow">Item Name <i class="fas fa-trash"></i></span> -->
                              
                            </div>

                          </div>


                        </div>
                        
                      </div>
                    </div>
                    
                  </div>
                  <div class="createtool-container hidden request-createtool-review-con">
                    <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">REVIEW TECHNICAL CHANGES<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden createtool-review-technical-widget-con">
                        <!-- <div class="createtool-review-technical-widget">
                          <textarea class="description" title="" disabled>Happily Ever After</textarea>
                          <i class="createtool-review-technical-widget-revert fas fa-history" title="Revert"></i>
                        </div> -->
                        
                      </div>
                    </div>
                    <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">REVIEW SCHEDULE CHANGES<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden createtool-review-schedule-widget-con">

                        
                      </div>
                    </div>
                    <!-- <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">REVIEW BUDGET CHANGES<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden createtool-review-budget-widget-con">

                        
                      </div>
                    </div>
                    <div class="createtool-maintitle">
                      <span class="crtitle btn-shadow">REVIEW FINANCIAL CHANGES<i class="fas fa-caret-left"></i></span>
                      <div class="content hidden createtool-review-financial-widget-con">

                        
                      </div>
                    </div> -->
                  </div>


                </div>
              </div>
              
              <div class="popup hidden">
                <div class="popup-widget hidden popup-widget-upload">
                  <span id="popup-widget-upload-title" class="title">Budget Name and Title</span>
                  <div id="popup-widget-upload-folder" class="folder">
                    <span class="popup-widget-upload-folder">File Upload 1<i class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
                    <span class="popup-widget-upload-folder">File Upload 1<i class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
                    <span class="popup-widget-upload-folder">File Upload 1<i class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
                    <span class="popup-widget-upload-folder active">File Upload 1<i class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
                    <span class="popup-widget-upload-folder">File Upload 1<i class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
                    <span class="popup-widget-upload-folder">File Upload 1<i class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
                  </div>
                  <div class="filename">
                    <span>Filename</span>
                    <input id="popup-widget-upload-filename" type="text" >
                  </div>
                  <div class="costing">
                    <span>Costing/Quotation File Number</span>
                    <input id="popup-widget-upload-costing" type="text">
                  </div>
                  <div class="action">
                    <input id="popup-widget-upload-hiddeninput" class="popup-widget-upload-get" onchange="popup_widget_upload($(this))" type="file" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;">
                    <button  onclick="$(this).siblings('.popup-widget-upload-get').click();" class="btn-shadow">Upload<i class="fas fa-upload"></i></button>
                    <button id="popup-widget-upload-submit" class="btn-shadow">Save<i class="fas fa-save"></i></button>
                    <a id="popup-widget-upload-view-h" target="_blank" href="lib/documents/budgetupload/PB-000813545/1613776091.pdf" style="display: none;" >View</a>
                    <button id="popup-widget-upload-view" onclick="$('#popup-widget-upload-view-h')[0].click();" class="btn-shadow">View<i class="fas fa-eye"></i></button>
                    <button id="popup-widget-upload-cancel" class="btn-shadow">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div class="project-preferences-con hidden nav-maincontainer">
        <div class="nav-content-">
          <div class="preferences-header">
            <div class="title color-sc">
              <span id="preferences-header-projectname" class="name">Project Name</span>
              <span id="preferences-header-projectid" class="id">P-87968768</span>
            </div>
            <div class="preferences-panel">
              <div class="preferences-navigation color-sc">
                <span cid="connect" class="preferences-navigation-widget ">Project Connect</span>
                <span cid="minutes" class="preferences-navigation-widget ">Minutes</span>
                <span cid="register" class="preferences-navigation-widget">Project Register</span>
                <span cid="notes" class="preferences-navigation-widget">My Notes</span>
                <span cid="docs" class="preferences-navigation-widget">Project Docs</span>
                <span cid="request" class="preferences-navigation-widget">Request</span>
              </div>
              <div class="preferences-mods">

                <!-- <div class="preferences-mods-widget btn-shadow">
                  <i class="fas fa-pencil-alt" title="View or Edit Preferences"></i>
                  <span id="preferences-mods-prefs">View/Edit Preferences</span>
                </div> -->

                <div class="preferences-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="preferences-mods-refresh">Refresh Data</span>
                </div>

                <div class="preferences-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit Preferences"></i>
                  <span id="preferences-mods-exit">Exit Preferences</span>
                </div>

                <div class="preferences-mods-widget btn-shadow">
                  <i class="fas fa-list-ol" title="Technical"></i>
                  <span id="preferences-mods-technical">Technical</span>
                </div>

                <div class="preferences-mods-widget btn-shadow">
                  <i class="fas fa-calculator" title="Financial"></i>
                  <span id="preferences-mods-financial">Financial</span>
                </div>
                <div class="preferences-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="preferences-mods-print">Print</span>
                </div>
                <div class="preferences-mods-widget btn-shadow hidden">
                  <span id="preferences-mods-add-user">Add Users</span>
                </div>
                

              </div>
            </div>
          </div>
          
          <div class="preferences-body">
        
            <div class="preferences-body-connect hidden preferences-body-widget">
              <div class="project-launch-list-con color-sc">
                  <input id="project-launch-search" type="text" placeholder="Search Team Member Connected to Project">
                  <div id="project-launch-list" class="project-launch-list">
                      <span class="project-launch-list-widget btn-shadow">P-123456789</span>
                      <span class="project-launch-list-widget btn-shadow">P-123456789</span>
                      <span class="project-launch-list-widget btn-shadow">P-123456789</span>
                      <span class="project-launch-list-widget btn-shadow">P-123456789</span>
                  </div>
              </div>
              <div class="project-launch-view-content">
                  <div class="project-launch-usg-con color-sc">
                      <span id="project-launch-usg-id">G-123456789</span>
                      <span id="project-launch-usg-groupname">Group Name</span>
                      <div class="project-launch-owner">
                          <img id="project-launch-usg-photo" src="lib/images/avatardefault.png">
                          <span id="project-launch-usg-ownername">Owner Name</span>
                      </div>
                      <button id="project-launch-usg-remove" class="btn-shadow">Remove from Project</button>
                  </div>
              </div>

              <div class="project-launch-add-user hidden">
                <div class="project-launch-add-user-con color-sc">
                  <div id="project-launch-add-user-search-con" class="project-sameline project-launch-add-user-retrieve">
                      <input id="project-launch-add-user-search-id" type="text" placeholder="Enter Name or Lastname">
                      <button id="project-launch-add-user-search" class="btn-shadow" style="background-color: rgb(82, 148, 226); color: rgb(255, 255, 255);">Search</button>
                  </div>
                  <div class="project-sameline project-launch-add-user-retrieve">
                    <select name="" id="project-launch-add-user-search-select">
                        <option value="">Test 1</option>
                        <option value="">Test 2</option>
                    </select>
                    <button id="project-launch-add-user-submit" class="btn-shadow" style="background-color: rgb(82, 148, 226); color: rgb(255, 255, 255);">Connect</button>
                  </div>
                </div>
              </div>  
            </div>

            <div class="preferences-body-register hidden preferences-body-widget-">

              <div class="register-description hidden">
                <div class="register-description-con color-sc shadow">
                  <i class="fas fa-times-circle close"></i>
                  <span id="register-description-id" class="title">Project Minutes Description</span>
                  <div class="sameline date">
                    <input id="register-description-date" type="date">
                    <input id="register-description-time" type="time">
                  </div>
                  <div class="sameline-">
                    <span>Subject</span>
                    <input id="register-description-subject" class="subject" type="text" placeholder="Subject">
                  </div>
                  <div class="sameline">
                    <div class="sameline-">
                      <span>Type</span>
                      <select id="register-description-type">
                        <option value="change">Change</option>
                        <option value="decision">Decision</option>
                      </select>
                    </div>
                    <div class="sameline-">
                      <span>Mode</span>
                      <select id="register-description-mode">
                        <option value="email">Email</option>
                        <option value="meeting">Meeting</option>
                        <option value="verbal">Verbal</option>
                      </select>
                    </div>
                  </div>
                  <div class="sameline-">
                    <span>Impact</span>
                    <select id="register-description-impact">
                      <option value="impact">Impact</option>
                      <option value="risk">Risk</option>
                      <option value="mitigation">Mitigation</option>
                    </select>
                  </div>
                  <div class="sameline-">
                    <span>Description</span>
                    <textarea id="register-description-description"name="" id="" maxlength="200"></textarea>
                  </div>
                  <div class="sameline-">
                    <span>Impact Field</span>
                    <textarea id="register-description-impact-field"name="" id="" maxlength="200"></textarea>
                  </div>
                  <div class="sameline">
                    <button id="register-description-delete" class="btn-shadow">Delete Register</button>
                    <button status="save" id="register-description-save" class="btn-shadow">Save Register</button>
                  </div>
                </div>
              </div>
              <div class="register-header">
                <span class="title color-sc">Register Filters</span>
                <div class="filter color-sc">
                  <div class="filter-widget">
                    <span>Date From</span>
                    <input id="preferences-body-register-from-date" type="date">
                  </div>
                  <div class="filter-widget">
                    <span>Date To</span>
                    <select name="" id="preferences-body-register-to-date">
                      <option value="1w">1 Week</option>
                      <option value="2w">2 Weeks</option>
                      <option value="1m">1 Month</option>
                      <option value="2m">2 Months</option>
                      <option value="4m">4 Months</option>
                      <option value="6m">6 Months</option>
                      <option value="1y">1 Year</option>
                      <option value="2y">2 Years</option>
                      <option value="5y">5 Years</option>
                      <!-- <option value="1d">1 Decade</option> -->
                    </select>
                  </div>
                  <div class="filter-widget">
                    <span>Search Subject</span>
                    <input id="preferences-body-register-search-subject" type="text" placeholder="Enter Subject">
                  </div>
                  <button id="preferences-body-register-search" class="search">Search</button>
                  <button id="preferences-body-register-view-all" class="register-view-all">View All</button>
                  <button id="preferences-body-register-add" class="register-add btn-shadow">Add Register</button>
                </div>
              </div>
              <div class="register-legend">
                <span>Date</span>
                <span>Time</span>
                <span>Type</span>
                <span>Mode</span>
                <span>Impact</span>
                <span>Subject</span>
                <span>A</span>
                <!-- <label for=""></label> -->
              </div>
              <div class="register-body">

                <div class="register-body-widget color-sc idle">
                  <input type="date" value="2020-12-25" disabled>
                  <input type="time" class="time" min="09:00" max="18:00" value="08:00" required  disabled>
                  <select name="" id=""  disabled>
                    <option value="">Information</option>
                    <option value="">Change</option>
                    <option value="">Decision</option>
                  </select>
                  <select name="" id="" disabled>
                    <option value="">Email</option>
                    <option value="">Meeting</option>
                    <option value="">Verbal</option>
                  </select>
                  <select name="" id="" disabled>
                    <option value="">Impact</option>
                    <option value="">Risk</option>
                    <option value="">Mitigation</option>
                  </select>
                  <input type="text" class="subject" placeholder="Subject" value="Sample Subject"  disabled>
                  <i class="fas fa-eye"></i>
                </div>

              </div>

            </div>
            
            <div class="preferences-body-minutes hidden preferences-body-widget-">

              <!-- <div class="minutes-description hidden">
                <div class="minutes-description-con color-sc shadow">
                  <i class="fas fa-times-circle close"></i>
                  <span id="minutes-description-id" class="title">Project Minutes Description</span>
                  <div class="sameline date">
                    <input id="minutes-description-date" type="date">
                    <input id="minutes-description-time" type="time">
                  </div>
                  <div class="sameline-">
                    <span>Subject</span>
                    <input id="minutes-description-subject" class="subject" type="text" placeholder="Subject">
                  </div>
                  <div class="sameline">
                    <div class="sameline-">
                      <span>Type</span>
                      <select id="minutes-description-type">
                        <option value="info">Information</option>
                        <option value="change">Changes</option>
                        <option value="decision">Decision</option>
                        <option value="action">Action</option>
                      </select>
                    </div>
                    <div class="sameline-">
                      <span>Mode</span>
                      <select id="minutes-description-mode">
                        <option value="verbal">Verbal</option>
                        <option value="meeting">Meeting</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>
                  <div class="sameline-">
                    <span>Location</span>
                    <input id="minutes-description-location" class="location" type="text" placeholder="Location">
                  </div>
                  <div class="sameline-">
                    <span>Attendees</span>
                    <input id="minutes-description-attendees" class="attendees" type="text" placeholder="Attendees">
                  </div>
                  <div class="sameline actiontype">
                    <input id="minutes-description-type-hour" type="radio" name="type" checked>
                    <label for="minutes-description-type-hour">Team</label>
                    <input id="minutes-description-type-supplier" type="radio" name="type">
                    <label for="minutes-description-type-supplier">Supplier</label>
                    <input id="minutes-description-type-tm" type="radio" name="type">
                    <label for="minutes-description-type-tm">T&M</label>
                  </div>
                  <div class="sameline responsible">
                    <div class="sameline- responsible">
                      <span>Responsible</span>
                      <select id="minutes-description-responsible" class="responsible" name="" id="">
                        <option value="">Name1</option>
                        <option value="">Name2</option>
                        <option value="">Name3</option>
                        <option value="">Name4</option>
                      </select>
                    </div>
                    <div class="sameline- hours">
                      <span>Hours</span>
                      <input id="minutes-description-hours" type="text">
                    </div>
                  </div>
                  <div class="sameline-">
                    <span>Due Date</span>
                    <input id="minutes-description-due" class="due" type="date">
                  </div>
                  <div class="sameline-">
                    <span>Description</span>
                    <textarea id="minutes-description-description"name="" id="" maxlength="200"></textarea>
                  </div>

                  <div class="sameline">
                    <button id="minutes-description-delete" class="btn-shadow">Delete Minutes</button>
                    <button status="save" id="minutes-description-save" class="btn-shadow">Save Minutes</button>
                  </div>


                </div>
              </div> -->

              <div class="minutes-addform hidden" type="save">
                <div class="minutes-addform-con color-sc shadow">
                  <i class="fas fa-times-circle close"></i>
                  <i id="minutes-addform-delete" class="fas fa-trash delete"></i>
                  <span id="minutes-addform-id" class="title">Project Minutes Form</span>
                  <div class="minutes-sameline">
                    <div class="minutes-sameline-">
                      <span>Date</span>
                      <input class="minutes-addform-date" type="date">
                    </div>
                    <div class="minutes-sameline-">
                      <span>Time</span>
                      <input class="minutes-addform-time" type="time">
                    </div>
                  </div>
                  <div class="minutes-sameline">
                    <div class="minutes-sameline-">
                      <span>Location</span>
                      <input class="minutes-addform-location" type="text">
                    </div>
                    <div class="minutes-sameline-">
                      <span>Attendees</span>
                      <input class="minutes-addform-attendees" type="text">
                    </div>
                  </div>
                  <div class="minutes-sameline-">
                    <span>Subject</span>
                    <input class="minutes-addform-subject" type="text">
                  </div>
                  <button id="minutes-addform-addmins" class="btn-shadow">Add Minutes</button>
                  <div class="minutes-addform-widget-con">
                    <div id="minute_PM-987978698" class="minutes-addform-widget">
                      <div class="line1">
                        <div class="minutes-sameline- type">
                          <span>Type</span>
                          <select class="minutes-addform-type">
                            <option value="info">I</option>
                            <option value="change">C</option>
                            <option value="decision">D</option>
                            <option value="action">A</option>
                          </select>
                        </div>
                        <div class="minutes-sameline- desc">
                          <span>Description</span>
                          <textarea class="minutes-addform-description" maxlength="200"></textarea>
                        </div>
                        <i class="minutes-addform-widget-remove fas fa-trash"></i>
                      </div>
                      <div class="line2 hidden">
                        <div class="minutes-sameline- actiontype">
                          <span>Type of Resource</span>
                          <select class="minutes-addform-typea" name="" id="">
                            <option value="hours">Team</option>
                            <option value="supplier">Supplier</option>
                            <option value="tm">T&M</option>
                          </select>
                        </div>
                        <div class="minutes-sameline- responsible">
                          <span>Responsible</span>
                          <select class="minutes-addform-responsible">
                            <option value="">Name1</option>
                            <option value="">Name2</option>
                            <option value="">Name3</option>
                            <option value="">Name4</option>
                          </select>
                        </div>
                        <div class="minutes-sameline- hours">
                          <span>Hours</span>
                          <input class="minutes-addform-hours" type="text">
                        </div>
                        <div class="minutes-sameline- due ">
                          <span>Due Date</span>
                          <input class="minutes-addform-due" class="due" type="date">
                        </div>
                      </div>
                    </div>

                  </div>
                  <button id="minutes-addform-submit" class="btn-shadow hidden">Save Minutes</button>
                  <button id="minutes-addform-dist" class="btn-shadow hidden">Distribute</button>
                </div><!-- minutes-addform-con end -->
                
                  
              </div>
              <div class="minutes-header">
                <span class="title color-sc">Minutes Filters</span>
                <div class="filter color-sc">
                  <div class="filter-widget">
                    <span>Date From</span>
                    <input id="preferences-body-minutes-from-date" type="date">
                  </div>
                  <div class="filter-widget">
                    <span>Date To</span>
                    <select name="" id="preferences-body-minutes-to-date">
                      <option value="1w">1 Week</option>
                      <option value="2w">2 Weeks</option>
                      <option value="1m">1 Month</option>
                      <option value="2m">2 Months</option>
                      <option value="4m">4 Months</option>
                      <option value="6m">6 Months</option>
                      <option value="1y">1 Year</option>
                      <option value="2y">2 Years</option>
                      <option value="5y">5 Years</option>
                      <!-- <option value="1d">1 Decade</option> -->
                    </select>
                  </div>
                  <div class="filter-widget">
                    <span>Search Subject</span>
                    <input id="preferences-body-minutes-search-subject" type="text" placeholder="Enter Subject">
                  </div>
                  <button id="preferences-body-minutes-search" class="search">Search</button>
                  <button id="preferences-body-minutes-view-all" class="minutes-view-all">View All</button>
                  <button id="preferences-body-minutes-add" class="minutes-add btn-shadow">Add Minutes</button>
                
                </div>
              </div>
              <div class="minutes-legend">
                <span>Date</span>
                <span>Time</span>
                <span>Subject</span>
                <!-- <span>Location</span>
                <span>Attendees</span>
                <span>Type</span>
                <span>Responsible</span>
                <span>Due Date</span> -->
                <span><i class="fas fa-info-circle" msg="BLUE: Info | ORANGE: decision.change | GREEN: action"></i></span>  
              </div>
              <div class="minutes-body">

                <div class="minutes-body-widget color-sc">
                  <input type="date" class="date" value="2020-12-25" disabled>
                  <input type="time" class="time" min="09:00" max="18:00" value="08:00" required  disabled>
                  <input type="text" class="subject" placeholder="Subject" value="Sample Subject"  disabled>
                  <i class="fas fa-eye"></i>
                </div>

                <div class="minutes-body-widget color-sc">
                  <input type="date" class="date" value="2020-12-25" disabled>
                  <input type="time" class="time" min="09:00" max="18:00" value="08:00" required  disabled>
                  <input type="text" class="subject" placeholder="Subject" value="Sample Subject"  disabled>
                  <i class="fas fa-eye"></i>
                </div>

                

              </div>
            </div>
            
            <div class="preferences-body-docs hidden preferences-body-widget">
              <div class="preferences-body-list-con color-sc">
                  <input id="preferences-body-search" type="text" placeholder="Search Document Connected to Project">
                  <div id="preferences-body-list" class="preferences-body-list">
                      <span class="preferences-body-list-widget btn-shadow">Document Name 1<i class="fas fa-trash"></i></span>
                      <span class="preferences-body-list-widget btn-shadow">Document Name 2<i class="fas fa-trash"></i></span>
                      <span class="preferences-body-list-widget btn-shadow">Document Name 3<i class="fas fa-trash"></i></span>
                      <span class="preferences-body-list-widget btn-shadow">Document Name 4<i class="fas fa-trash"></i></span>
                  </div>
              </div>
            </div>

            <div class="preferences-body-notes hidden preferences-body-widget-">
              <div class="notes-description hidden">
                <div class="notes-description-con color-sc shadow">
                  <i class="fas fa-times-circle close"></i>
                  <span id="notes-description-id" class="title">Project Notes Description</span>
                  <div class="sameline date">
                    <input id="notes-description-date" type="date">
                    <input id="notes-description-time" type="time">
                  </div>
                  <div class="sameline-">
                    <span>Subject</span>
                    <input id="notes-description-subject" class="subject" type="text" placeholder="Subject">
                  </div>
                  <div class="sameline">
                    <div class="sameline-">
                      <span>Type</span>
                      <select id="notes-description-type" disabled>
                        <option value="info">Information</option>
                      </select>
                    </div>
                    <div class="sameline-">
                      <span>Mode</span>
                      <select id="notes-description-mode">
                        <option value="email">Email</option>
                        <option value="meeting">Meeting</option>
                        <option value="verbal">Verbal</option>
                      </select>
                    </div>
                  </div>
                  <!-- <div class="sameline-">
                    <span>Impact</span>
                    <select id="notes-description-impact">
                      <option value="">Not Specified</option>
                      <option value="impact">Impact</option>
                      <option value="risk">Risk</option>
                      <option value="mitigation">Mitigation</option>
                    </select>
                  </div> -->
                  <div class="sameline-">
                    <span>Description</span>
                    <textarea id="notes-description-description"name="" id="" maxlength="200"></textarea>
                  </div>
                  <div class="sameline-">
                    <span>Notes</span>
                    <textarea id="notes-description-impact-field"name="" id="" maxlength="200"></textarea>
                  </div>
                  <div class="sameline">
                    <button id="notes-description-delete" class="btn-shadow">Delete notes</button>
                    <button id="notes-description-save" class="btn-shadow">Save notes</button>
                  </div>
                </div>
              </div>
              <div class="notes-header">
                <span class="title color-sc">Notes Filters</span>
                <div class="filter color-sc">
                  <div class="filter-widget">
                    <span>Date From</span>
                    <input id="preferences-body-notes-from-date" type="date">
                  </div>
                  <div class="filter-widget">
                    <span>Date To</span>
                    <select name=""id="preferences-body-notes-to-date">
                      <option value="1w">1 Week</option>
                      <option value="2w">2 Weeks</option>
                      <option value="1m">1 Month</option>
                      <option value="2m">2 Months</option>
                      <option value="4m">4 Months</option>
                      <option value="6m">6 Months</option>
                      <option value="1y">1 Year</option>
                      <option value="2y">2 Years</option>
                      <option value="5y">5 Years</option>
                    </select>
                  </div>
                  <div class="filter-widget">
                    <span>Search Subject</span>
                    <input id="preferences-body-notes-search-subject" type="text" placeholder="Enter Subject">
                  </div>
                  <button id="preferences-body-notes-search" class="search">Search</button>
                  <button id="preferences-body-notes-view-all" class="notes-view-all">View All</button>
                  <button id="preferences-body-notes-add" class="notes-add btn-shadow">Add Notes</button>
                </div>
              </div>
              <div class="notes-legend">
                <span>Date</span>
                <span>Time</span>
                <span>Type</span>
                <span>Mode</span>
                <span>Comment</span>
                <span>Subject</span>
                <span>A</span>
                <!-- <label for=""></label> -->
              </div>
              <div class="notes-body">

                <div class="notes-body-widget color-sc idle">
                  <input type="date" value="2020-12-25" disabled>
                  <input type="time" class="time" min="09:00" max="18:00" value="08:00" required  disabled>
                  <select name="" id=""  disabled>
                    <option value="">Information</option>
                  </select>
                  <select name="" id="" disabled>
                    <option value="">Email</option>
                    <option value="">Meeting</option>
                    <option value="">Verbal</option>
                  </select>
                  <select name="" id="" disabled>
                    <option value="">Impact</option>
                    <option value="">Risk</option>
                    <option value="">Mitigation</option>
                  </select>
                  <input type="text" class="subject" placeholder="Subject" value="Sample Subject"  disabled>
                  <i class="fas fa-eye"></i>
                </div>

              </div>
            </div>

            <div class="preferences-body-request hidden preferences-body-widget-">
              <div id="preferences-body-request-createtool-container" class="createtool-container hidden preferences-body-request-technical-con">
                <div class="createtool-maintitle launch d2">
                  <span class="crtitle btn-shadow">PROJECT DESCRIPTION<i class="fas fa-caret-left"></i></span>
                  <div class="content hidden">
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Background<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Current state / landscape of the business; Performance gap / problem description; Main drivers of the project; Why emergency project; How it is linked to site strategy; Infrastructure project.</span>
                        <textarea id="preferences-body-request-technical-desc_1" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Project Objectives<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: What is the project?  Describe the changes / future state (not stated solution).</span>
                        <textarea id="preferences-body-request-technical-desc_2" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Project Alternative / Risk of Waiting<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Iinstruction: Describe what has been considered as an alternative to implementing this new project request. Describe what would happen if to wait 1 year.</span>
                        <textarea id="preferences-body-request-technical-desc_3" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Project Technical Scope<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">What is In-Scope</span>
                        <textarea id="preferences-body-request-technical-desc_4_1" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                        <span class="instruction">What is Out-of-Scope</span>
                        <textarea id="preferences-body-request-technical-desc_4_2" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    
                    <button id="launch-createtool-add-d" class="createtool-add btn-shadow">Add Row</button>
                  </div>
                </div>
                <div class="createtool-maintitle launch p2">
                  <span class="crtitle btn-shadow">PROJECT PRIORITIZATION<i class="fas fa-caret-left"></i></span>
                  <div class="content hidden">
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Quality<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: What is quality impact if project is not done?</span>
                        <textarea id="preferences-body-request-technical-prior_1" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Financials<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Payback, ROI, Funding strategy, budget, existing IO, exchange rates, forecast, capacity plan,  etc., (if known)</span>
                        <textarea id="preferences-body-request-technical-prior_2" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Compliance or Regulation<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Identify gaps for compliance?</span>
                        <textarea id="preferences-body-request-technical-prior_3" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Business Continuity Risk<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Is there a current risk mitigation plan in place until the project is implemented? Describe what would happen if to wait 1 year before initiated requested project.</span>
                        <textarea id="preferences-body-request-technical-prior_4" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Business Investment / Profatibility<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: If this is a new investment and will provide profatibility, identify the factors.</span>
                        <textarea id="preferences-body-request-technical-prior_5" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Assumptions to linked Projects/Dependencies<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Assumptions including those linked to an associated enabling projects. Impact of delay on enabling project/s on this request.</span>
                        <textarea id="preferences-body-request-technical-prior_6" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Risks / Challenges / Road Blocks<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Detail if it is in the site's Risk Register and if so what grading. Emphasize major risk areas and any potential unknown risks. (Include #)</span>
                        <textarea id="preferences-body-request-technical-prior_7" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Site Resources<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <span class="instruction">Instruction: Will requesting dept. use internal resources to execute and if so what elements?</span>
                        <textarea id="preferences-body-request-technical-prior_8" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <button id="launch-createtool-add-p" class="createtool-add btn-shadow">Add Row</button>
                  </div>
                </div>
                <div class="createtool-maintitle launch s2">
                  <span class="crtitle btn-shadow">PROJECT STRATEGY<i class="fas fa-caret-left"></i></span>
                  <div class="content hidden">
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Strategy 1<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <textarea id="preferences-body-request-technical-strat_1" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <div class="createtool-subtitle">
                      <span class="crtitle btn-shadow">Project Close out Requirements<i class="fas fa-caret-left"></i></span>
                      <div class="content">
                        <textarea id="preferences-body-request-technical-strat_2" class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
                      </div>
                    </div>
                    <button id="launch-createtool-add-s" class="createtool-add btn-shadow">Add Row</button>
                  </div>
                </div>
                <button id="preferences-body-request-createtool-save" class="btn-shadow">Save</button>
              </div>
              <div class="createtool-container hidden preferences-body-request-financial-con">
                <!-- <div class="crfill2">
                  <div class="crfill1">
                    <span>Requested Amount</span>
                    <input type="text" placeholder="Requested Amount">
                  </div>
                  <div class="crfill1">
                    <span>Currency</span>
                    <input type="text" placeholder="Currency">
                  </div>
                </div>
                <div class="crfill1-">
                  <span>Budgeted? (select one)</span>
                  <span class="blocking"></span>
                  <label for="createtool-financial-budgeted-yes">Yes</label>
                  <input id="createtool-financial-budgeted-yes" name="createtool-financial-budgeted" type="radio">
                  <label for="createtool-financial-budgeted-no">No</label>
                  <input id="createtool-financial-budgeted-no" name="createtool-financial-budgeted" type="radio">
                </div> -->
                <div class="createtool-maintitle preferences-body-request-financial-list-con">
                  <span class="crtitle btn-shadow">ITEM CHECKLIST<i class="fas fa-caret-left"></i></span>
                  <div class="content hidden">
                    <div class="createtool-financial-itemlist-legend">
                      <span>Item Name</span>
                      <span>CAPEX Cost</span>
                      <span>OPEX Cost</span>
                      <span>Vendor</span>
                      <span>Costing Available</span>
                    </div>
                    <div class="createtool-financial-itemlist-body launch-financial-itemlist-body">
                      <div class="createtool-financial-itemlist-widget">
                        <input type="text" placeholder="Item Name">
                        <input type="text" placeholder="$">
                        <input type="text" placeholder="$">
                        <input type="text" placeholder="Vendor">
                        <input type="text" placeholder="Costing Available">
                      </div>
                    </div>
                    <div class="createtool-financial-itemlist-totals">
                      <div class="itemlistrow">
                        <div>
                          <span>Contingency</span>
                          <input id="launch-financial-itemlist-totals-contingency" type="text" placeholder="%">
                        </div>
                        <input type="text" placeholder="$">
                        <input type="text" placeholder="$">
                        <input type="text" disabled>
                        <input type="text" disabled>
                      </div>
                      <div class="itemlistrow">
                        <span>Write off (if any see section below) - EXT OPEX</span>
                        <input id="launch-financial-itemlist-totals-contingency-capex" type="text" disabled>
                        <input id="launch-financial-itemlist-totals-contingency-opex" type="text" placeholder="$">
                        <input type="text" disabled>
                        <input type="text" disabled>
                      </div>
                      <div class="itemlistrow">
                        <span><b>Total</b></span>
                        <input id="launch-financial-itemlist-totals-capex" class="total" type="text" value="$12.00" disabled>
                        <input id="launch-financial-itemlist-totals-opex" class="total" type="text" placeholder="$15.00" disabled>
                        <input type="text" disabled>
                        <input type="text" disabled>
                      </div>
                      <div class="itemlistrow">
                        <span><b>Project Cost</b></span>
                        <input type="text" disabled>
                        <input type="text" disabled>
                        <input type="text" disabled>
                        <input id="launch-financial-itemlist-totals-projectcost" class="total" type="text" value="$12.00" disabled>
                      </div>
                    </div>
                    <!-- <button id="createtool-financial-itemlist-add" class="btn-shadow">Add Rows</button> -->
                  </div>
                </div>
                <div class="createtool-maintitle ">
                  <span class="crtitle btn-shadow">PREREQUISITE CHECKLIST<i class="fas fa-caret-left"></i></span>
                  <div class="content hidden">
                    <div class="createtool-financial-preqlist-legend">
                      <span>Item / Document</span>
                      <span>Status</span>
                      <span>Doc #</span>
                      <span>Comments</span>
                    </div>
                    <div class="createtool-financial-preqlist-body launch-financial-preqlist-body">
                      <div class="createtool-financial-preqlist-widget">
                        <input type="text" placeholder="Item / Document">
                        <select >
                          <option value="">Option 1</option>
                          <option value="">Option 2</option>
                        </select>
                        <input type="text" placeholder="Doc #">
                        <textarea maxlength="200" placeholder="200 Chars Maximum"></textarea>
                      </div>

                    </div>
                    <!-- <button id="createtool-financial-preqlist-add" class="btn-shadow">Add Rows</button> -->
                  </div>

                </div>
              </div>
            </div>

          </div>
          <!-- end of prefs body -->


        </div>
      </div>

      <div class="projects-prefs-con hidden nav-maincontainer">
        <div class="nav-content">
            <div id="project-launch1-con" class="project-page-con">
              <i id="project-launch1-btn-close" class="fas fa-times project-launch-btn-close btn-shadow"></i>
                <div class="pp1-widget-con color-sc">
                    <h1 id="project-launch1-projectname">Project Name</h1>
                    <h2 id="project-launch1-projectid">Project Id</h2>
                </div>
                <div class="pp1-widget-con color-sc">
                    <h2>Identify your Project Class</h2>
                    <div class="pp1-widget-content">
                        <span>Please Select One</span>
                        <select class="pp1-widget-content-in pi_5" id="pp1-project-class">
                            <option value="na">Select One</option>
                            <option value="5.1">Bacterial based recombinant protein</option>
                            <option value="5.2">Monoclonal Antibodies</option>
                            <option value="5.3">Polyclonal Antibodies</option>
                            <option value="5.4">Modified Cohn process based Plasma Proteins or its fraction based Plasma Proteins</option>
                            <option value="5.5">Chromatography based Plasma proteins</option>
                            <option value="5.6">Other class of purification</option>
                            <option value="5.7">Innovative Biotech product</option>
                        </select>
                    </div>
                </div>
                <div class="pp1-widget-con color-sc">
                    <h2>Classify Manufacturing Facility</h2>
                    <div class="pp1-widget-content">
                        <span>Please Select One</span>
                        <select class="pp1-widget-content-in pi_6" id="pp1-manufacturing-facility">
                            <option value="na">Select One</option>
                            <option value="6.1">Single Product facility</option>
                            <option value="6.2">Multi Product facility</option>
                            <option value="6.3">Multi Product from Single Input Material</option>
                        </select>
                    </div>
                </div>
                <div class="pp1-widget-con color-sc mh-500">
                    <h2>Add Products</h2>
                    <div class="pp1-widget-content">
                        <form action="" class="pp1-widget-content" id="pp1-form-add-product">
                            <input class="pp1-widget-content-in" id="pp1-txt-productname" type="text" placeholder="Product Name" >
                        </form>
                        <span><b>Products List</b></span>
                        <span>(Double Click on the product to remove from list)</span>
                        <div id="pp1-container-productname" class="pp1-widget-con-productname">
                            <!-- <span class="productname btn-shadow">Name1</span>
                            <span class="productname btn-shadow">Name2</span> -->
                        </div>
                    </div>
                </div><!-- ADD PRODUCTS -->
                <div class="pp1-widget-con color-sc">
                    <h2>Targeted Input Processing volume per year (Liters)</h2>
                    <div class="pp1-widget-content">
                        <span>We will recommend the optimum production volume after analysis of your data.</span>
                        <input id="pp1-pi_8" class="pp1-widget-content-in pi_8" type="text" placeholder="Enter Desired Amount">
                    </div>
                </div>
                <div class="pp1-widget-con color-sc">
                    <h2>Batch size (Liter/kilograms)</h2>
                    <div class="pp1-widget-content">
                        <span>We will recommend the optimum batch size after analysis of your data.</span>
                        <input id="pp1-pi_9" class="pp1-widget-content-in pi_9" type="text" placeholder="Enter Desired Amount">
                    </div>
                </div>
                <div class="pp1-widget-con color-sc mh-160">
                    <h2>How many hours are you intending to run per day?</h2>
                    <div class="pp1-widget-content">
                        <span>Please Input Intended Number of Hours.</span>
                        <div class="pp1-sameline">
                            <span>0</span>
                            <input class="pi_10" type="range" id="pp1-hours-per-day" min="0" max="24" value="0">
                            <span>24</span>
                        </div>
                        <input class="pp1-widget-content-in pi_10" id="pp1-show-hours-per-day" type="text" value="0">
                    </div>
                </div>
                <div class="pp1-widget-con color-sc mh-160">
                    <h2>How many days are you intending to run per week?</h2>
                    <div class="pp1-widget-content">
                        <span>Please Input Intended Number of Days.</span>
                        <div class="pp1-sameline">
                            <span>0</span>
                            <input class="pi_11" type="range" id="pp1-days-per-week" min="0" max="7" value="1">
                            <span>7</span>
                        </div>
                        <input class="pp1-widget-content-in pi_11" id="pp1-show-days-per-week" type="text" value="0">
                    </div>
                </div>
                <div class="pp1-widget-con color-sc mh-160">
                    <h2>Total number of week(s) facility will be at shutdown</h2>
                    <div class="pp1-widget-content">
                        <span>Please Input Intended Number of Weeks.</span>
                        <div class="pp1-sameline">
                            <span>0</span>
                            <input class="pi_12" type="range" id="pp1-weeks-of-shutdown" min="0" max="52" value="1">
                            <span>52</span>
                        </div>
                        <input class="pp1-widget-content-in pi_12" id="pp1-show-weeks-of-shutdown" type="text" value="0">
                    </div>
                </div>
                <div class="pp1-widget-con color-sc mh-160">
                    <h2>Frequency of shutdown (in months)</h2>
                    <div class="pp1-widget-content">
                        <span>Please Input Intended Number of Months.</span>
                        <div class="pp1-sameline">
                            <span>0</span>
                            <input class="pi_13" type="range" id="pp1-months-of-shutdown" min="0" max="12" value="0">
                            <span>12</span>
                        </div>
                        <input class="pp1-widget-content-in pi_13" id="pp1-show-months-of-shutdown" type="text" value="0">
                    </div>
                </div>
                <div class="pp1-widget-con color-sc">
                    <h2>How are you intending to run?</h2>
                    <div class="pp1-widget-content">
                        <span>Based on your data, batch scheduling will be provided</span>
                        <select class="pp1-widget-content-in pi_14" id="pp1-type-of-run">
                            <option value="na">Select One</option>
                            <option value="14.1">One batch at a time</option>
                            <option value="14.2">Concurrent batches</option>
                        </select>
                    </div>
                </div>
                <div class="pp1-widget-con color-sc">
                    <h2>Select the type of project.</h2>
                    <div class="pp1-widget-content">
                        <span>Please select your Specified Type of Project.</span>
                        <select class="pp1-widget-content-in pi_15" id="pp1-type-of-project">
                            <option value="na">Select One</option>
                            <option value="15.1">Build new manufacturing</option>
                            <option value="15.2">Retrofit of existing facility</option>
                            <option value="15.3">Expansion of current facility</option>
                        </select>
                    </div>
                </div>
                <br><br>
                <button class="pp1-btn-submit btn-shadow" id="pp1-page-submit">Confirm and Go to Next Page</button>
            </div><!-- ////////////////////////project-page1-con//////////////////////// -->
            <div id="project-launch2-con" class="project-page-con">
              <i id="project-launch2-btn-close" class="fas fa-times project-launch-btn-close btn-shadow"></i>
              <i id="project-launch2-btn-back" class="fas fa-arrow-alt-circle-left project-launch-btn-back btn-shadow"></i>
                <h1 class="color-title">Project Information</h1>

                <div class="pp2-widget-con color-sc">
                    <h2>Is the Site Location Identified?</h2>
                    <i zid="16_1" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_1_lock"></i>
                    <div class="pp2-sameline pi_16_1">
                        <span class="pp2-zicontext" name="ac-16_2" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="ac-16_3">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_2" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Provide geographical location</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_2-upload" onclick="$('#browse-16_2').click();">upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_2-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_2-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_2')" type="file" id="browse-16_2" name="ac-16_2" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_2-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save  pi_16_2_upload" type="text" >
                            </div>
                            <div id="ac-16_2-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_2_link" type="text" >
                            </div>
                            <div id="ac-16_2-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_2_note" rows="10" cols="40" style="resize: none;"></textarea>
                            </div>
                        </div>
                        <div id="ac-16_3" class="pp2-widget-content-sub pp2-hidden"">
                            <h3>Buildup area available</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_3-upload" onclick="$('#browse-16_3').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_3-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_3-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_3')" type="file" id="browse-16_3" name="ac-16_3" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_3-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_3_upload" type="text" >
                            </div>
                            <div id="ac-16_3-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_3_link" type="text" >
                            </div>
                            <div id="ac-16_3-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_3_note" rows="10" cols="40" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Seismic report available?</h2>
                    <i zid="16_4" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_4_lock"></i>
                    <div class="pp2-sameline pi_16_4">
                        <span class="pp2-zicontext" name="ac-16_4" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_4">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_4" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Provide Seismic Report</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_4-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_4-upload" onclick="$('#browse-16_4').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_4-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_4-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_4')" type="file" id="browse-16_4" name="ac-16_4" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_4-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_4_report" type="text" >
                            </div>
                            <div id="ac-16_4-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_4_upload" type="text" >
                            </div>
                            <div id="ac-16_4-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_4_link" type="text" >
                            </div>
                            <div id="ac-16_4-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_4_note" rows="10" cols="40" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Soil test Report available?</h2>
                    <i zid="16_5" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_5_lock"></i>
                    <div class="pp2-sameline pi_16_5">
                        <span class="pp2-zicontext" name="ac-16_5" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_5">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_5" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Provide Seismic Report</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_5-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_5-upload" onclick="$('#browse-16_5').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_5-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_5-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_5')" type="file" id="browse-16_5" name="ac-16_5" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_5-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_5_report" type="text" >
                            </div>
                            <div id="ac-16_5-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_5_upload" type="text" >
                            </div>
                            <div id="ac-16_5-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_5_link" type="text" >
                            </div>
                            <div id="ac-16_5-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_5_note" rows="10" cols="40" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Site permit available?</h2>
                    <i zid="16_6" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_6_lock"></i>
                    <div class="pp2-sameline pi_16_6">
                        <span class="pp2-zicontext" name="ac-16_6" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_6">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_6" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Provide Site Permit</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_6-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_6-upload" onclick="$('#browse-16_6').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_6-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_6-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_6')" type="file" id="browse-16_6" name="ac-16_6" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_6-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_6_report" type="text" >
                            </div>
                            <div id="ac-16_6-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_6_upload" type="text" >
                            </div>
                            <div id="ac-16_6-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_6_link" type="text" >
                            </div>
                            <div id="ac-16_6-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_6_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Health, Safety & Environmental clearance available?</h2>
                    <i zid="16_7" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_7_lock"></i>
                    <div class="pp2-sameline pi_16_7">
                        <span class="pp2-zicontext" name="ac-16_7" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_7">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_7" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Provide  Health, Safety & Environmental Clearance</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_7-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_7-upload" onclick="$('#browse-16_7').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_7-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_7-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_7')" type="file" id="browse-16_7" name="ac-16_7" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_7-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_7_report" type="text" >
                            </div>
                            <div id="ac-16_7-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_7_upload" type="text" >
                            </div>
                            <div id="ac-16_7-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_7_link" type="text" >
                            </div>
                            <div id="ac-16_7-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_7_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Waste Management Plan in Place?</h2>
                    <i zid="16_8" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_8_lock"></i>
                    <div class="pp2-sameline pi_16_8">
                        <span class="pp2-zicontext" name="ac-16_8" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_8">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_8" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Provide Waste Management Plan</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_8-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_8-upload" onclick="$('#browse-16_8').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_8-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_8-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_8')" type="file" id="browse-16_8" name="ac-16_8" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_8-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_8_report" type="text" >
                            </div>
                            <div id="ac-16_8-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_8_upload" type="text" >
                            </div>
                            <div id="ac-16_8-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_8_link" type="text" >
                            </div>
                            <div id="ac-16_8-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_8_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Power Requirement to Site Available?</h2>
                    <i zid="16_9" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_9_lock"></i>
                    <div class="pp2-sameline pi_16_9">
                        <span class="pp2-zicontext" name="ac-16_9" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_9">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_9" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Indicate if Available</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_9-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_9-upload" onclick="$('#browse-16_9').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_9-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_9-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_9')" type="file" id="browse-16_9" name="ac-16_9" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_9-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_9_report" type="text" >
                            </div>
                            <div id="ac-16_9-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_9_upload" type="text" >
                            </div>
                            <div id="ac-16_9-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_9_link" type="text" >
                            </div>
                            <div id="ac-16_9-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_9_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Pre HAZOP Study or Equivalent Study Conducted For This Project?</h2>
                    <i zid="16_10" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_10_lock"></i>
                    <div class="pp2-sameline pi_16_10">
                        <span class="pp2-zicontext" name="ac-16_10" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_10">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_10" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Indicate if Conducted. Provide Necessary Documents</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_10-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_10-upload" onclick="$('#browse-16_10').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_10-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_10-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_10')" type="file" id="browse-16_10" name="ac-16_10" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_10-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_10_report" type="text" >
                            </div>
                            <div id="ac-16_10-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_10_upload" type="text" >
                            </div>
                            <div id="ac-16_10-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_10_link" type="text" >
                            </div>
                            <div id="ac-16_10-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_10_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Quality Risk Assessment Conducted For The Process?</h2>
                    <i zid="16_11" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_11_lock"></i>
                    <div class="pp2-sameline pi_16_11">
                        <span class="pp2-zicontext" name="ac-16_11" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_11">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_11" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Indicate if Conducted. Provide Necessary Documents</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_11-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_11-upload" onclick="$('#browse-16_11').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_11-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_11-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_11')" type="file" id="browse-16_11" name="ac-16_11" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_11-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_11_report" type="text" >
                            </div>
                            <div id="ac-16_11-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_11_upload" type="text" >
                            </div>
                            <div id="ac-16_11-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_11_link" type="text" >
                            </div>
                            <div id="ac-16_11-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_11_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Are other permits required?</h2>
                    <i zid="16_12" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_12_lock"></i>
                    <div class="pp2-sameline pi_16_12">
                        <span class="pp2-zicontext" name="ac-16_12" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_12">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_12" class="pp2-widget-content-sub pp2-hidden">
                            <h3>Please Provide Necessary Documents</h3>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_12-certificate">report/certificate<i class="fas fa-certificate pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_12-upload" onclick="$('#browse-16_12').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_12-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_12-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_12')" type="file" id="browse-16_12" name="ac-16_12" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_12-certificate" class="pp2-sameline-r pp2-hidden">
                                <span>Report/CertificateNumber</span>&nbsp;
                                <input class="pp2-input-save pi_16_12_report" type="text" >
                            </div>
                            <div id="ac-16_12-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_12_upload" type="text" >
                            </div>
                            <div id="ac-16_12-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_12_link" type="text" >
                            </div>
                            <div id="ac-16_12-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_12_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pp2-widget-con color-sc">
                    <h2>Is Manufacturing Process Fully Defined For This Project?</h2>
                    <i zid="16_13" status="unlocked" class="fas fa-unlock pp2-widget-gate pi_16_13_lock"></i>
                    <div class="pp2-sameline pi_16_13">
                        <span class="pp2-zicontext" name="ac-16_13" >yes<i class="fas fa-check pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext" name="na-ac-16_13">no<i class="fas fa-times pp2-icon btn-shadow"></i></span>
                        <span class="pp2-zicontext pi_16_13_partial" name="ac-16_13">partially known<i class="fas fa-question pp2-icon btn-shadow"></i></span>
                    </div>
                    <div class="pp2-widget-content">
                        <div id="ac-16_13" class="pp2-widget-content-sub pp2-hidden">
                            <h4 style="text-align: center; margin-top: 5px;">This will help CEIS to understand the limitation of project. CEIS has capability to design project for partially or lab scale process based on system capability analysis.</h4>
                            <div class="pp2-sameline">
                                <span class="pp2-icontext" name="ac-16_13-upload" onclick="$('#browse-16_13').click();" >upload a document<i class="fas fa-upload pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_13-link">link a document<i class="fas fa-link pp2-icon btn-shadow"></i></span>
                                <span class="pp2-icontext" name="ac-16_13-notes">notes<i class="fas fa-comment-alt pp2-icon btn-shadow"></i></span>
                            </div>
                            <input onchange="browse('browse-16_13')" type="file" id="browse-16_13" name="ac-16_13" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;">
                            <br>
                            <div id="ac-16_13-upload" class="pp2-sameline-r pp2-hidden"">
                                <span>file uploaded</span>&nbsp;
                                <input class="pp2-input-save pi_16_13_upload" type="text" >
                            </div>
                            <div id="ac-16_13-link" class="pp2-sameline-r pp2-hidden"">
                                <span>link document</span>&nbsp;
                                <input class="pp2-input-save pi_16_13_link" type="text" >
                            </div>
                            <div id="ac-16_13-notes" class="pp2-sameline-r pp2-hidden"">
                                <span>notes</span>
                                <textarea class="pp2-input-save pi_16_13_note" rows="10" cols="30" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- ////////////////////////project-page2-con//////////////////////// -->
        </div>
      </div><!-- ////////////////////////project-launch-con//////////////////////// -->

      <div class="finance-con hidden nav-maincontainer">
        <div class="nav-content-">
          <div class="finance-header">
            <div class="title color-sc">
              <span id="finance-header-projectname" class="name">Project Finance</span>
              <span id="finance-header-projectid" class="id"></span>
            </div>
            <div class="finance-panel">
              <div class="finance-navigation color-sc">
                <span cid="build" class="finance-navigation-widget ">Budgeting</span>
                <span cid="finance" class="finance-navigation-widget">Spend Tracker</span>
                <span cid="request" class="finance-navigation-widget ">Forecast</span>
                <!-- <span cid="map" class="finance-navigation-widget ">Doc Mapping</span> -->
              </div>
              <div class="finance-mods">

                <div class="finance-mods-widget  btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="finance-mods-refresh">Refresh Data</span>
                </div>

                <div class="finance-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="finance-mods-dashboard">Dashboard</span>
                </div>

                <div class="finance-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit finance"></i>
                  <span id="finance-mods-exit">Exit Finance</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div class="finance-budget-con hidden nav-maincontainer">
        <div class="nav-content-">
          <div class="finbud-header">
            <div class="title color-sc">
              <span id="finbud-header-projectname" class="name">Project Name</span>
              <span id="finbud-header-projectid" class="id">Project Id</span>
              <span id="finbud-header-ownername" class="owner"></span>
              
            </div>
            <div class="finbud-panel">
              <div class="finbud-navigation color-sc">
                <!-- <div class="filter">
                  <span>Select Project</span>
                  <select name="" id="project-finbud-list">
                    <option value="">Project 1</option>
                    <option value="">Project 2</option>
                    <option value="">Project 3</option>
                    <option value="">Project 4</option>
                  </select>
                </div>
                <button id="finbud-project-submit" class="btn-shadow">Select Project</button> -->
              </div>
              <div class="finbud-mods">

                <div class="finbud-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="finbud-mods-refresh">Refresh Data</span>
                </div>

                <div class="finbud-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="finbud-mods-dashboard">Dashboard</span>
                </div>

                <div class="finbud-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit Budgeting"></i>
                  <span id="finbud-mods-exit">Exit Budgeting</span>
                </div>

                <div class="finbud-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="finbud-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>
          <div class="finbud-legend">
            <div class="left">
              <span>Team Member's Name</span>
              <span>Alloted Hours</span>
              <span>Actual Hours</span>
            </div>
            <div class="right">
              <span>Rate</span>
              <span>Lumpsum</span>
              <span>Materials</span>
              <span>A</span>
            </div>
          </div>
          <div class="finbud-body ">

            <div id="finbud_CEO-12345" type="hours" class="finbud-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-finbud-accid">Noel Santillan</span>
                  <input class="project-finbud-hours-alloted" type="text" value="20 Hrs" disabled>
                  <input class="project-finbud-hours-actual" type="text" value="12 Hrs" disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <input class="project-finbud-rate" value="N/A" type="text" disabled>
                    <input class="project-finbud-lumpsum" value="N/A" type="text" disabled>
                    <input class="project-finbud-material" value="N/A" type="text" disabled>
                    <i class="fas fa-edit project-finbud-edit"></i>
                    <!-- <i class="fas fa-calendar-week project-finbud-calendar"></i> -->
                  </div>
                  <span class="bot project-finbud-progress">
                    Budget Consumed: 75%
                  </span>
                </div>
              </div>

            </div>

            <div class="finbud-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-finbud-accid">KDA Supplies Inc</span>
                  <input class="project-finbud-hours-alloted" type="text" value="20 Hrs" disabled>
                  <input class="project-finbud-hours-actual" type="text" value="12 Hrs" disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <input class="project-finbud-rate" value="N/A" type="text" disabled>
                    <input class="project-finbud-lumpsum" value="N/A" type="text" disabled>
                    <input class="project-finbud-material" value="N/A" type="text" disabled>
                    <i class="fas fa-edit project-finbud-edit"></i>
                    <!-- <i class="fas fa-calendar-week project-finbud-calendar"></i> -->
                  </div>
                  <span class="bot project-finbud-progress">
                    Budget Consumed: 75%
                  </span>
                </div>
              </div>

            </div>

            <div class="finbud-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-finbud-accid">KDA Supplies TM</span>
                  <input class="project-finbud-hours-alloted" type="text" value="20 Hrs" disabled>
                  <input class="project-finbud-hours-actual" type="text" value="12 Hrs" disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <input class="project-finbud-rate" value="N/A" type="text" disabled>
                    <input class="project-finbud-lumpsum" value="N/A" type="text" disabled>
                    <input class="project-finbud-material" value="N/A" type="text" disabled>
                    <i class="fas fa-edit project-finbud-edit"></i>
                    <!-- <i class="fas fa-calendar-week project-finbud-calendar"></i> -->
                  </div>
                  <span class="bot project-finbud-progress">
                    Budget Consumed: 75%
                  </span>
                </div>
              </div>

            </div>

          </div>
          <div class="finbud-footer  color-sc">
            <div class="top">
              <div class="footer-widget" title="Total Number of Users">
                <span>Number of Users</span>
                <input id="finbud-footer-hours" type="text" placeholder="Number of Users" value="8" disabled>
              </div>
              <div class="footer-widget" title="Total Number of Suppliers">
                <span>Number of Suppliers</span>
                <input id="finbud-footer-supplier" type="text" placeholder="Number of Suppliers" value="2" disabled>
              </div>
              <div class="footer-widget" title="Total Number of TMs">
                <span>Number of TM</span>
                <input id="finbud-footer-tm" type="text" placeholder="Number of TMs" value="1" disabled>
              </div>
              <div class="footer-widget" title="Total hours alloted to Tasks">
                <span>Alloted Hours</span>
                <input id="finbud-footer-alloted" type="text" placeholder="Alloted Hours" value="200" disabled>
              </div>
              <div class="footer-widget" title="Total Actual Hours">
                <span>Actual Hours</span>
                <input id="finbud-footer-actual" type="text" placeholder="Actual Hours" value="120" disabled>
              </div>
              <div class="footer-widget" title="Difference Between Total Hours and Actual Hours">
                <span>Hour Variance</span>
                <input id="finbud-footer-variance" type="text" placeholder="Hour Variance" value="+80" disabled>
              </div>
            </div>
            <div class="bottom">
              <div id="finbud-footer-progress" class="finbud-footer-progress">
                Assigned Rates : 12%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="finance-tracker-con hidden nav-maincontainer">
        <div class="nav-content-">
          <div class="fintrack-header">
            <div class="title color-sc">
              <span id="fintrack-header-projectname" class="name">Project Name</span>
              <span id="fintrack-header-projectid" class="id">Project Id</span>
              <span id="fintrack-header-ownername" class="owner"></span>
              
            </div>
            <div class="fintrack-panel">
              <div class="fintrack-navigation color-sc">
                <!-- <div class="filter">
                  <span>Select Project</span>
                  <select name="" id="project-fintrack-list">
                    <option value="">Project 1</option>
                    <option value="">Project 2</option>
                    <option value="">Project 3</option>
                    <option value="">Project 4</option>
                  </select>
                </div>
                <button id="fintrack-project-submit" class="btn-shadow">Select Project</button> -->
              </div>
              <div class="fintrack-mods">

                <div class="fintrack-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="fintrack-mods-refresh">Refresh Data</span>
                </div>

                <div class="fintrack-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="fintrack-mods-dashboard">Dashboard</span>
                </div>

                <div class="fintrack-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Exit Budgeting"></i>
                  <span id="fintrack-mods-tracking">Tracking Board</span>
                </div>

                <div class="fintrack-mods-widget btn-shadow hidden">
                  <input id="fintrack-mods-week" type="week">
                  <span id="fintrack-mods-calendar">Weekly Team Budget</span>
                </div>
                <div class="fintrack-mods-widget btn-shadow">
                  <i class="fas fa-print"></i>
                  <span id="fintrack-mods-print" title="print">Print</span>
                </div>

              </div>
            </div>
          </div>
          <div class="fintrack-legend">
            <div class="left">
              <span>Team Member's Name</span>
              <span>Rate</span>
              <span>Alloted Hours</span>
              <span>Actual Hours</span>
            </div>
            <div class="right">
              <span>Alloted Budget</span>
              <span>Actual Budget</span>
              <span>Remaining Budget</span>
              <span >A</span>
            </div>
          </div>
          <div class="fintrack-body ">

            <div id="fintrack_CEO-12345" type="hours" class="fintrack-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-fintrack-accid">Noel Santillan</span>
                  <input class="project-fintrack-hours-rate" type="text" value="$12.00" disabled>
                  <input class="project-fintrack-hours-alloted" type="text" value="20 Hrs" disabled>
                  <input class="project-fintrack-hours-actual" type="text" value="12 Hrs" disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <input class="project-fintrack-budget-alloted" value="N/A" type="text" disabled>
                    <input class="project-fintrack-budget-actual" value="N/A" type="text" disabled>
                    <input class="project-fintrack-budget-variance" value="N/A" type="text" disabled>
                    <i class="fas fa-edit project-fintrack-edit"></i>
                    <!-- <i class="fas fa-calendar-week project-fintrack-calendar"></i> -->
                  </div>
                  <span class="bot project-fintrack-progress">
                    Budget Consumed: 75%
                  </span>
                </div>
              </div>

            </div>

            <div class="fintrack-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-fintrack-accid">KDA Supplies Inc</span>
                  <input class="project-fintrack-hours-rate" type="text" value="$12.00" disabled>
                  <input class="project-fintrack-hours-alloted" type="text" value="20 Hrs" disabled>
                  <input class="project-fintrack-hours-actual" type="text" value="12 Hrs" disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <input class="project-fintrack-budget-alloted" value="N/A" type="text" disabled>
                    <input class="project-fintrack-budget-actual" value="N/A" type="text" disabled>
                    <input class="project-fintrack-budget-variance" value="N/A" type="text" disabled>
                    <i class="fas fa-edit project-fintrack-edit"></i>
                    <!-- <i class="fas fa-calendar-week project-fintrack-calendar"></i> -->
                  </div>
                  <span class="bot project-fintrack-progress">
                    Budget Consumed: 75%
                  </span>
                </div>
              </div>

            </div>

            <div class="fintrack-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-fintrack-accid">KDA Supplies TM</span>
                  <input class="project-fintrack-hours-rate" type="text" value="$12.00" disabled>
                  <input class="project-fintrack-hours-alloted" type="text" value="20 Hrs" disabled>
                  <input class="project-fintrack-hours-actual" type="text" value="12 Hrs" disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <input class="project-fintrack-budget-alloted" value="N/A" type="text" disabled>
                    <input class="project-fintrack-budget-actual" value="N/A" type="text" disabled>
                    <input class="project-fintrack-budget-variance" value="N/A" type="text" disabled>
                    <i class="fas fa-edit project-fintrack-edit"></i>
                    <!-- <i class="fas fa-calendar-week project-fintrack-calendar"></i> -->
                  </div>
                  <span class="bot project-fintrack-progress">
                    Budget Consumed: 75%
                  </span>
                </div>
              </div>

            </div>

          </div>
          <div class="fintrack-footer  color-sc">
            <div class="top">
              <div class="footer-widget" title="Total Number of Users">
                <span>Number of Users</span>
                <input id="fintrack-footer-hours" type="text" placeholder="Number of Users" value="8" disabled>
              </div>
              <div class="footer-widget" title="Total Number of Suppliers">
                <span>Number of Suppliers</span>
                <input id="fintrack-footer-supplier" type="text" placeholder="Number of Suppliers" value="2" disabled>
              </div>
              <div class="footer-widget" title="Total Number of TMs">
                <span>Number of TM</span>
                <input id="fintrack-footer-tm" type="text" placeholder="Number of TMs" value="1" disabled>
              </div>
              <div class="footer-widget" title="Total hours alloted to Tasks">
                <span>Alloted Budget</span>
                <input id="fintrack-footer-alloted" type="text" placeholder="Alloted Hours" value="200" disabled>
              </div>
              <div class="footer-widget" title="Total Actual Hours">
                <span>Actual Budget</span>
                <input id="fintrack-footer-actual" type="text" placeholder="Actual Hours" value="120" disabled>
              </div>
              <div class="footer-widget" title="Difference Between Total Hours and Actual Hours">
                <span>Remaining Budget</span>
                <input id="fintrack-footer-variance" type="text" placeholder="Hour Variance" value="+80" disabled>
              </div>
            </div>
            <div class="bottom">
              <div id="fintrack-footer-progress" class="fintrack-footer-progress">
                Budget Variance : 12%
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="boards-resources-con hidden nav-maincontainer">
        <div class="nav-content-">
          <div class="resource-header">
              <div class="title color-sc">
                <span id="resource-header-projectname" class="name">Project Name</span>
                <span id="resource-header-projectid" class="id">Project Id</span>
                <span id="resource-header-ownername" class="owner">Noel Santillan</span>

              </div>
              <div class="resource-panel">
                <div class="resource-navigation color-sc">
                  <div class="datefilter">
                    <span>Select Week</span>
                    <input id="resource-navigation-week" type="week">
                  </div>
                  <button id="resource-navigation-submit" class="qwertyasdasd btn-shadow">Calendar View</button>
                </div>
                <div class="resource-mods">

                  <div class="resource-mods-widget btn-shadow">
                    <i class="fas fa-sync-alt" title="Refresh Data"></i>
                    <span id="resource-mods-refresh">Refresh Data</span>
                  </div>

                  <div class="resource-mods-widget btn-shadow">
                    <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                    <span id="resource-mods-dashboard">Dashboard</span>
                  </div>

                  <div class="resource-mods-widget btn-shadow">
                    <i class="fas fa-business-time" title="Resource Board"></i>
                    <span id="resource-mods-resource">Resourceboard</span>
                  </div>

                  <div class="resource-mods-widget btn-shadow">
                    <i class="fas fa-backspace" title="Exit Resource"></i>
                    <span id="resource-mods-exit">Exit Resource Board</span>
                  </div>

                  <div class="resource-mods-widget btn-shadow">
                    <i class="fas fa-print" title="Print"></i>
                    <span id="resource-mods-print">Print</span>
                  </div>

                </div>
              </div>
          </div>
          <div class="resource-body">
            <div class="resource-body-legend">
              <span class="name">Account Name</span>
              <span class="hours">Type</span>
              <span class="type">Total Hours</span>
              <span class="sdate">Start Date</span>
              <span class="edate">End Date</span>
              <span class="days">Actual Hours</span>
              <label id="finance_tracking_device_testing_btn" for="">actions</label>
            </div>
            <div class="resource-body-accountlist">

              <div class="resource-body-accountlist-widget color-sc">
                  <div class="step acc">
                    <span class="name"><i class="fas fa-bars" status="closed"></i>Somesh Sri</span>
                    <span class="type">Hours</span>
                    <span class="hours">100 Hours</span>
                    <span class="sdate">2020-01-01</span>
                    <span class="edate">2020-12-25</span>
                    <span class="days">365 Days</span>
                    <i class="fas fa-user-clock"></i>
                  </div>
                  <div class="step tasklist">

                    <div class="tasklist-widget done">
                      <span class="title">Task Name</span>
                      <span class="hours">20 Hours</span>
                      <span class="startdate" title="Start Date">2020-10-01</span>
                      <span class="enddate" title="End Date">2020-10-15</span>
                      <span class="days" title="Total Days">15 Days</span>
                      <span class="blocking"></span>
                    </div>
                    <div class="tasklist-widget idle">
                      
                    </div>
                    <div class="tasklist-widget working">
                      
                    </div>
                    <div class="tasklist-widget dispute">
                      
                    </div>

                  </div>
              </div>

              <div class="resource-body-accountlist-widget color-sc">
                  <div class="step acc">
                    <span class="name"><i class="fas fa-bars" status="closed"></i>Somesh Sri</span>
                    <span class="type">Hours</span>
                    <span class="hours">100 Hours</span>
                    <span class="sdate">2020-01-01</span>
                    <span class="edate">2020-12-25</span>
                    <span class="days">365 Days</span>
                    <i class="fas fa-user-clock"></i>
                  </div>
                  <div class="step tasklist">

                    <div class="tasklist-widget done">
                      <span class="title">Task Name</span>
                      <span class="hours">20 Hours</span>
                      <span class="startdate" title="Start Date">2020-10-01</span>
                      <span class="enddate" title="End Date">2020-10-15</span>
                      <span class="days" title="Total Days">15 Days</span>
                      <span class="blocking"></span>
                    </div>
                    <div class="tasklist-widget idle">
                      
                    </div>
                    <div class="tasklist-widget working">

                    </div>
                    <div class="tasklist-widget dispute">

                    </div>

                  </div>
              </div>

              <div class="resource-body-accountlist-widget color-sc">
                  <div class="step acc">
                    <span class="name"><i class="fas fa-bars" status="closed"></i>Somesh Sri</span>
                    <span class="type">Hours</span>
                    <span class="hours">100 Hours</span>
                    <span class="sdate">2020-01-01</span>
                    <span class="edate">2020-12-25</span>
                    <span class="days">365 Days</span>
                    <i class="fas fa-user-clock"></i>
                  </div>
                  <div class="step tasklist">

                    <div class="tasklist-widget done">
                      <span class="title">Task Name</span>
                      <span class="hours">20 Hours</span>
                      <span class="startdate" title="Start Date">2020-10-01</span>
                      <span class="enddate" title="End Date">2020-10-15</span>
                      <span class="days" title="Total Days">15 Days</span>
                      <span class="blocking"></span>
                    </div>
                    <div class="tasklist-widget idle">
                      
                    </div>
                    <div class="tasklist-widget working">
                      
                    </div>
                    <div class="tasklist-widget dispute">
                      
                    </div>

                  </div>
              </div>

              <div class="resource-body-accountlist-widget color-sc">
                  <div class="step acc">
                    <span class="name"><i class="fas fa-bars" status="closed"></i>Somesh Sri</span>
                    <span class="type">Hours</span>
                    <span class="hours">100 Hours</span>
                    <span class="sdate">2020-01-01</span>
                    <span class="edate">2020-12-25</span>
                    <span class="days">365 Days</span>
                    <i class="fas fa-user-clock"></i>
                  </div>
                  <div class="step tasklist">

                    <div class="tasklist-widget done">
                      <span class="title">Task Name</span>
                      <span class="hours">20 Hours</span>
                      <span class="startdate" title="Start Date">2020-10-01</span>
                      <span class="enddate" title="End Date">2020-10-15</span>
                      <span class="days" title="Total Days">15 Days</span>
                      <span class="blocking"></span>
                    </div>
                    <div class="tasklist-widget idle">
                      
                    </div>
                    <div class="tasklist-widget working">
                      
                    </div>
                    <div class="tasklist-widget dispute">
                      
                    </div>

                  </div>
              </div>  

              <div class="resource-body-accountlist-widget color-sc">
                  <div class="step acc">
                    <span class="name"><i class="fas fa-bars" status="closed"></i>Somesh Sri</span>
                    <span class="type">Hours</span>
                    <span class="hours">100 Hours</span>
                    <span class="sdate">2020-01-01</span>
                    <span class="edate">2020-12-25</span>
                    <span class="days">365 Days</span>
                    <i class="fas fa-user-clock"></i>
                  </div>
                  <div class="step tasklist">

                    <div class="tasklist-widget done">
                      <span class="title">Task Name</span>
                      <span class="hours">20 Hours</span>
                      <span class="startdate" title="Start Date">2020-10-01</span>
                      <span class="enddate" title="End Date">2020-10-15</span>
                      <span class="days" title="Total Days">15 Days</span>
                      <span class="blocking"></span>
                    </div>
                    <div class="tasklist-widget idle">
                      
                    </div>
                    <div class="tasklist-widget working">
                      
                    </div>
                    <div class="tasklist-widget dispute">
                      
                    </div>

                  </div>
              </div>

            </div>
          </div>
          <div class="resource-calendar">
            <div class="resource-calendar-widget ">
              <span class="title">Monday<br>Nov 2, 2020</span>
              <div class="resource-calendar-widget-con mon">

                <!-- <div class="resource-calendar-widget-time">
                  <span class="name" title="Noel Santillan Homaghad">Noel Santillan Homaghad</span>
                  <span class="hours">2 Hours</span>
                </div> -->

              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
            <div class="resource-calendar-widget ">
              <span class="title">Tuesday<br>Nov 3, 2020</span>
              <div class="resource-calendar-widget-con tue">

              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
            <div class="resource-calendar-widget ">
              <span class="title">Wednesday<br>Nov 4, 2020</span>
              <div class="resource-calendar-widget-con wed">
              
              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
            <div class="resource-calendar-widget ">
              <span class="title">Thursday<br>Nov 5, 2020</span>
              <div class="resource-calendar-widget-con thu">
              
              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
            <div class="resource-calendar-widget ">
              <span class="title">Friday<br>Nov 6, 2020</span>
              <div class="resource-calendar-widget-con fri">
              
              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
            <div class="resource-calendar-widget ">
              <span class="title">Saturday<br>Nov 7, 2020</span>
              <div class="resource-calendar-widget-con sat">
              
              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
            <div class="resource-calendar-widget ">
              <span class="title">Sunday<br>Nov 8, 2020</span>
              <div class="resource-calendar-widget-con sun">
              
              </div>
              <span class="footer">Actual Hours<br>200 Hrs</span>
            </div>
          </div>
          <div class="resource-footer color-sc">
            <div class="top">
              <div class="footer-widget" title="Total hours alloted to Users Tasks including T&M.">
                <span>Total Hours</span>
                <input id="resource-footer-hours-total" type="text" placeholder="Total Hours" value="200" disabled>
              </div>
              <div class="footer-widget" title="Earliest Date from Tasks">
                <span>Earliest Date</span>
                <input id="resource-footer-hours-startdate" type="date" placeholder="Earliest Date" value="2020-01-01" disabled>
              </div>
              <div class="footer-widget" title="Latest Date from Tasks">
                <span>Latest Date</span>
                <input id="resource-footer-hours-enddate" type="date" placeholder="Latest Date" value="2020-12-31" disabled>
              </div>
              <div class="footer-widget" title="Total hours alloted to Users Tasks excluding T&M">
                <span>User Hours</span>
                <input id="resource-footer-hours-user" type="text" placeholder="User Hours" value="User Hours" disabled>
              </div>
              <div class="footer-widget" title="Computed Total Hours after a User clicks on 'Done' on the Task.">
                <span>Completed Hours</span>
                <input id="resource-footer-hours-completed" type="text" placeholder="Completed Hours" value="Completed Hours" disabled>
              </div>
              <div class="footer-widget" title="Difference Between Total Hours and Completed Hours">
                <span>Hour Variance</span>
                <input id="resource-footer-hours-variance" type="text" placeholder="Hour Variance" value="Hour Variance" disabled>
              </div>
            </div>
            <div class="bottom">
              <div class="resource-footer-progress"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="map-con hidden nav-maincontainer schedule-map-con">
        <div class="nav-content-">
          <div class="map-header">
            <div class="title color-sc">
              <span id="map-header-projectname" class="name">Project Name</span>
              <span id="map-header-projectid" class="id">Project Id</span>
              <span id="map-header-ownername" class="owner">Noel Santillan</span>
              
            </div>
            <div class="map-panel">
              <div class="map-navigation color-sc">

              </div>
              <div class="map-mods">

                <div class="map-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="map-mods-refresh">Refresh Data</span>
                </div>

                <div class="map-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="map-mods-dashboard">Dashboard</span>
                </div>

                <div class="map-mods-widget btn-shadow">
                  <i class="fas fa-shapes" title="Map Accounts"></i>
                  <span id="map-mods-resource">Map Accounts</span>
                </div>

                <div class="map-mods-widget btn-shadow">
                  <i class="fas fa-shapes" title="Map Suppliers"></i>
                  <span id="map-mods-suppliers">Map Suppliers</span>
                </div>

                <div class="map-mods-widget btn-shadow">
                  <i class="fas fa-file-alt" title="Map Documents"></i>
                  <span id="map-mods-document">Map Documents</span>
                </div>

              </div>
            </div>
          </div>

          <div class="map-body">
            <div class="map-body-document hidden">
              <div class="map-body-plandoc-list color-sc">
                <input type="text" placeholder="Search Document Name or Id">
                <div class="map-body-plandoc-list-con">

                  <!-- <div class="map-body-plandoc-list-widget btn-shadow">
                    <div class="widget-details">
                      <span class="map-body-plandoc-list-widget-title">Document Title</span>
                      <span class="map-body-plandoc-list-widget-id">D-98767867685</span>
                    </div>
                    <div class="widget-map active">
                      <span class="map-body-plandoc-list-widget-mapid">Not Mapped</span>
                    </div>
                  </div>

                  <div class="map-body-plandoc-list-widget btn-shadow">
                    <div class="widget-details">
                      <span class="map-body-plandoc-list-widget-title">Document Title</span>
                      <span class="map-body-plandoc-list-widget-id">D-98767867685</span>
                    </div>
                    <div class="widget-map idle">
                      <span class="map-body-plandoc-list-widget-mapid">D-12386759</span>
                    </div>
                  </div> -->

                </div>
              </div>

              <div class="map-body-actual-list color-sc">
                <input type="text" placeholder="Search Document Name or Id">
                <div class="map-body-actual-list-con">

                  <!-- <div class="map-body-actual-list-widget btn-shadow">
                    <span class="map-body-actual-list-widget-title">Noel Santillan</span>
                    <span class="map-body-actual-list-widget-id">U-98767867685</span>
                  </div>
                  <div class="map-body-actual-list-widget btn-shadow">
                    <span class="map-body-actual-list-widget-title">Brijesh Patel</span>
                    <span class="map-body-actual-list-widget-id">U-96876876678</span>
                  </div> -->

                </div>
              </div>
            </div>
            <div class="map-body-resource hidden">
              <div class="map-body-tmpacc-list color-sc">
                <input type="text" placeholder="Search Document Name or Id">
                <div class="map-body-tmpacc-list-con">

                  <div class="map-body-tmpacc-list-widget shadow tmpacc">
                    <div class="widget-details">
                      <span class="map-body-tmpacc-list-widget-title">TmpAccount Name</span>
                      <span class="map-body-tmpacc-list-widget-id tmpacc">TA-15232513</span>
                    </div>
                    <div class="widget-map idle">
                      <span class="map-body-tmpacc-list-widget-mapid">Not Mapped</span>
                    </div>
                  </div>

                  <div class="map-body-tmpacc-list-widget shadow tmpsupp">
                    <div class="widget-details">
                      <span class="map-body-tmpacc-list-widget-title">TmpSupplier Name</span>
                      <span class="map-body-tmpacc-list-widget-id tmpsupp">SA-15232513</span>
                    </div>
                    <div class="widget-map idle">
                      <span class="map-body-tmpacc-list-widget-mapid">Not Mapped</span>
                    </div>
                  </div>

                </div>
              </div>

              <div class="map-body-actualacc-list color-sc">
                <input type="text" placeholder="Search Document Name or Id">
                <div class="map-body-actualacc-list-con">

                  <div class="map-body-actualacc-list-widget shadow tmpacc">
                    <span class="map-body-actualacc-list-widget-title">Noel Santillan</span>
                    <span class="map-body-actualacc-list-widget-id">U-98767867685</span>
                  </div>
                  <div class="map-body-actualacc-list-widget shadow tmpsupp">
                    <span class="map-body-actualacc-list-widget-title">KDA Inc</span>
                    <span class="map-body-actualacc-list-widget-id">S-874651684548</span>
                  </div>

                </div>
              </div>
            </div>

            <div class="map-body-supplier hidden">
              <div class="map-body-tmpsup-list color-sc">
                <input type="text" placeholder="Search Document Name or Id">
                <div class="map-body-tmpsup-list-con">

                  <div class="map-body-tmpsup-list-widget shadow ">
                    <div class="widget-details">
                      <span class="map-body-tmpsup-list-widget-title">TmpAccount Name</span>
                      <span class="map-body-tmpsup-list-widget-id ">TA-15232513</span>
                    </div>
                    <div class="widget-map idle">
                      <span class="map-body-tmpsup-list-widget-mapid">Not Mapped</span>
                    </div>
                  </div>

                  <div class="map-body-tmpsup-list-widget shadow ">
                    <div class="widget-details">
                      <span class="map-body-tmpsup-list-widget-title">TmpSupplier Name</span>
                      <span class="map-body-tmpsup-list-widget-id ">SA-15232513</span>
                    </div>
                    <div class="widget-map active">
                      <span class="map-body-tmpsup-list-widget-mapid">Not Mapped</span>
                    </div>
                  </div>

                </div>
              </div>

              <div class="map-body-actualsup-list color-sc">
                <input type="text" placeholder="Search Document Name or Id">
                <div class="map-body-actualsup-list-con">

                  <div class="map-body-actualsup-list-widget shadow">
                    <span class="map-body-actualsup-list-widget-title">Noel Santillan</span>
                    <span class="map-body-actualsup-list-widget-id">U-98767867685</span>
                  </div>
                  <div class="map-body-actualsup-list-widget shadow">
                    <span class="map-body-actualsup-list-widget-title">KDA Inc</span>
                    <span class="map-body-actualsup-list-widget-id">S-874651684548</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="archive-con hidden nav-maincontainer ">
        <div class="nav-content-">
          <div class="archive-header">
            <div class="title color-sc">
              <span id="archive-header-projectname" class="name">Project Archive</span>
              <span id="archive-header-projectid" class="id"></span>
              <span id="archive-header-ownername" class="owner"></span>
              
            </div>
            <div class="archive-panel">
              <div class="archive-navigation color-sc">
                <span cid="archived" class="archive-navigation-widget ">Archived Projects</span>
              </div>
              <div class="archive-mods">

                <div class="archive-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="archive-mods-refresh">Refresh Data</span>
                </div>

                <div class="archive-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="archive-mods-dashboard">Dashboard</span>
                </div>


                <input id="archive-mods-widget-browse" onchange="archive_mods_widget_browse()" type="file" style="display: none;">
                <div onclick="$('#archive-mods-widget-browse').click();" class="archive-mods-widget btn-shadow">
                  <i class="fas fa-upload" title="Upload File"></i>
                  <span id="archive-mods-upload">Upload *.proflowproject File</span>
                </div>

              </div>
            </div>
          </div>

          <div class="archive-body">
            <a id="archive-body-a-download" style="display: none;" href="" download=""></a>

            <div class="archive-projectlist-con">

              <span class="title">My Projects</span>
              <div id="archive-projectlist-content" class="content">
                <span class="widget">Project 1 <i onclick="archiveProject('P-00001')" title="Archive the Project" class="fas fa-archive"></i> </span>
                <span class="widget">Project 1 <i onclick="archiveProject('P-00001')" title="Archive the Project" class="fas fa-archive"></i> </span>
                <span class="widget">Project 1 <i onclick="archiveProject('P-00001')" title="Archive the Project" class="fas fa-archive"></i> </span>
                <span class="widget">Project 1 <i onclick="archiveProject('P-00001')" title="Archive the Project" class="fas fa-archive"></i> </span>
              </div>

            </div>

            <div class="archive-archivelist-con">
              <span class="title">My Archived Projects</span>
              <div id="archive-archivelist-content" class="content">

                <div class="widget">
                  <span>Project A</span>
                  <div class="action">
                    <button title="Permanently Deletes Project and Downloads Data" class="btn-shadow">Download & Delete</button>
                    <button title="Will Set Project Status into Inactive" class="btn-shadow">Put Back to Inactive</button>
                  </div>
                </div>

                <div class="widget">
                  <span>Project A</span>
                  <div class="action">
                    <button title="Permanently Deletes Project and Downloads Data" class="btn-shadow">Download & Delete</button>
                    <button title="Will Set Project Status into Inactive" class="btn-shadow">Put Back to Inactive</button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      <div class="status-con hidden nav-maincontainer boards-status-con">
        <div class="nav-content-">
          <div class="status-header">
            <div class="title color-sc">
              <span id="status-header-projectname" class="name">Project Name</span>
              <span id="status-header-projectid" class="id">Project Id</span>
              <span id="status-header-ownername" class="owner">Noel Santillan</span>
              
            </div>
            <div class="status-panel">
              <div class="status-navigation color-sc">
                <div class="datefilter">
                  <span>From<i id="status-header-filter-fromdate-setnow" class="fas fa-calendar-day"></i></span>
                  <input id="status-header-filter-fromdate" type="date" >
                </div>
                <div class="datefilter">
                  <span>To</span>
                  <select name="" id="statusBoard-selTime">
                    <option value="1week">1 Week</option>
                    <option value="2weeks">2 Weeks</option>
                    <option value="1month">1 Month</option>
                    <option value="4months">4 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="4years">4 Years</option>
                  </select>
                </div>
                <div class="datefilter">
                  <span>Filter</span>
                  <select name="" id="statusBoard-selFilter">
                    <option value="sd">Start Date</option>
                    <option value="ed">End Date</option>
                    <option value="stage">Stage</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
                <div class="datefilter">
                  <span>Document Type</span>
                  <select name="" id="statusBoard-selDocType">
                    <option value="actual">Actual Document</option>
                    <option value="planning">Planning Document</option>
                  </select>
                </div>
                <button id = "btnRetrieveDocumentsBoard" class="btn-shadow">Retrieve Documents</button>

              </div>
              <div class="status-mods">

                <div class="status-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="status-mods-refresh">Refresh Data</span>
                </div>

                <div class="status-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="status-mods-dashboard">Dashboard</span>
                </div>

                <div class="status-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit status"></i>
                  <span id="status-mods-exit">Exit Status Board</span>
                </div>

                <div class="status-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="status-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>

          <div class="status-body">

            <div class="status-body-widget-con">
              <span class="status-body-widget-title color-draft">Draft<i class="fas fa-sort-down"></i></span>
              <div id="draftColumnNew" class="status-body-widget-container color-draft-half">
                                
                <!-- <div class="status-body-widget ahead">
                  <span class="status-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="status-body-widget-name">
                    <span class="status-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="status-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="status-body-widget-when" >2 Days Ago</span>
                  <div class="status-body-widget-icons-con">
                    <i class="fas fa-link status-body-widget-mapid" title="Planning Document Title"></i>
                    <i class="fas fa-id-card-alt" title="U-987876876"></i>
                    <i class="fas fa-exclamation-triangle" title="Send Warning Message to User"></i>
                    <i status="id" class="fas fa-clone id-name-switch" ></i>
                  </div>
                </div> -->

              </div>
            </div>

            <div class="status-body-widget-con">
              <span class="status-body-widget-title color-review">Review<i class="fas fa-sort-down"></i></span>
              <div id="reviewColumnNew" class="status-body-widget-container color-review-half">

                <!-- <div class="status-body-widget plan">
                  <span class="status-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="status-body-widget-name">
                    <span class="status-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="status-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="status-body-widget-when" >2 Days Ago</span>
                  <div class="status-body-widget-icons-con">
                    <i class="fas fa-link status-body-widget-mapid" title="Planning Document Title"></i>
                    <i class="fas fa-id-card-alt" title="U-987876876"></i>
                    <i class="fas fa-exclamation-triangle" title="Send Warning Message to User"></i>
                    <i status="id" class="fas fa-clone id-name-switch" ></i>
                  </div>
                </div> -->
                
              </div>
            </div>

            <div class="status-body-widget-con">
              <span class="status-body-widget-title color-approve">Approve<i class="fas fa-sort-down"></i></span>
              <div id="approvalColumnNew" class="status-body-widget-container color-approve-half">
                
              </div>
            </div>

            <div class="status-body-widget-con">
              <span class="status-body-widget-title color-execution">Execution<i class="fas fa-sort-down"></i></span>
              <div id="executionColumnNew" class="status-body-widget-container color-execution-half">
                
              </div>
            </div>

            <div class="status-body-widget-con">
              <span class="status-body-widget-title color-postapprove">Post Approve<i class="fas fa-sort-down"></i></span>
              <div id="postApprovalColumnNew" class="status-body-widget-container color-postapprove-half">

              </div>
            </div>

          </div>
        </div>
      </div><!-- status board -->

      <div class="task-con hidden nav-maincontainer schedule-task-con">
        <div class="nav-content-">

          <div class="task-header">
            <div class="title color-sc">
              <span id="task-header-projectname" class="name">Project Name</span>
              <span id="task-header-projectid" class="id">Project Id</span>
              <span id="task-header-ownername" class="owner">Noel Santillan</span>
              
            </div>
            <div class="task-panel">
              <div class="task-navigation color-sc">
                
              </div>
              <div class="task-mods">

                <div class="task-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="task-mods-refresh">Refresh Data</span>
                </div>

                <div class="task-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="task-mods-dashboard">Dashboard</span>
                </div>

                <div class="task-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit task"></i>
                  <span id="task-mods-exit">Exit Schedule</span>
                </div>
                
                <div status="show" class="task-mods-widget btn-shadow">
                  <i class="fas fa-eye-slash" title="Toggle Clipboard"></i>
                  <span id="task-mods-clipboard">Toggle Clipboard</span>
                </div>

                <div class="task-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="task-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>
          
          <div class="task-body">

            <div class="task-body-tasklist">
              <div class="task-body-tasklist-legend">
                <span class="blocking color-title">
                  <i class="fas fa-plus handler-icon" msg="Add Document"></i>
                  <i id="task-body-tasklist-legend-edit" class="fas fa-edit handler-icon" msg="Edit"></i>
                  <!-- <i class="fas fa-bolt handler-icon" msg="Add Execution Stage"></i> -->
                  <i class="fas fa-link handler-icon" msg="Add Link"></i>
                  <i class="fas fa-paperclip handler-icon" msg="Add Predecessor"></i>
                  <i class="fas fa-trash handler-icon" msg="Delete Document"></i>
                </span>
                <span class="dateLegend color-sc">Draft SD</span>
                <span class="dateLegend color-sc">Draft ED</span>
                <span class="dateLegend color-sc">Review ED</span>
                <span class="dateLegend color-sc">Approval ED</span>
                <span class="dateLegend color-sc">Execution ED</span>
                <span class="dateLegend color-sc">PostApproval ED</span>
              </div>
              <div class="tasklist-widget-con">
                
                <div id="tasklist_PD-1234515" class="tasklist-widget color-sc">
                  <div status="closed"  class="tasklist-widget-title">
                    <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                    <span for="scales"><input type="checkbox" name="schedulehandler" class="tasklist-widget-title-documenthandler"><i class="far fa-star tasklist-widget-title-milestone" status="idle"></i>Title is super very very long and you cannot see it</span>
                    <input class="tasklist-widget-dates-draftsd editable first" value="" type="date" disabled>
                    <input class="tasklist-widget-dates-drafted editable" value="" type="date" disabled>
                    <input class="tasklist-widget-dates-reviewed editable" value="" type="date" disabled>
                    <input class="tasklist-widget-dates-approveed editable" value="" type="date" disabled>
                    <input class="tasklist-widget-dates-executioned uneditable" value="" type="date" disabled>
                    <input class="tasklist-widget-dates-postapproveed uneditable" value="" type="date" disabled>
                    
                  </div>

                  <div id="asdasd" planid="${taskList[i].planid}" projectid="${taskList[i].projectid}" name="${taskList[i].taskname}" class="tasklist-widget-task">
                    <input value="${taskList[i].taskname}" type="text" class="tasklist-widget-task-name-i">
                    <span class="tasklist-widget-task-name-s">Name  <div><span class="totalhours">Team 200 Hours</span><span class="counter">1</span></div></span>
                    <input class="tasklist-widget-date-start" value="" type="date" max="" disabled>
                    <input class="tasklist-widget-date-end" value="" type="date" max="" disabled>
                    <i class="fas fa-user-plus tasklist-widget-icon-resources"></i>
                    <i class="fas fa-clipboard-list tasklist-widget-icon-clipboard"></i>
                    <i status="edit" class="fas fa-edit tasklist-widget-icon-edit"></i>
                    <i class="fas fa-trash tasklist-widget-icon-delete"></i>
                  </div>
                  
                </div>

                <div id="tasklist_nst" class="tasklist-widget color-sc">
                  <div status="closed" class="tasklist-widget-title">
                    <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                    <span>Non Specified Task</span>
                  </div>
                
                </div>
                
              </div>
            </div>

            <div class="task-add-con">
                <div class="task-add-form btn-shadow">
                    <span class="title">Add New Document to Schedule</span>
                    <br>
                    <div class="name">
                        <span>Document Name</span>
                        <input id="task-add-form-title" type="text" placeholder="Document Name">
                    </div>
                    <div class="schedule">
                        <div class="fill">
                            <span>Draft SD</span>
                            <input id="task-add-form-draftsd" type="date" placeholder="Document Name">
                        </div>
                        <div class="fill">
                            <span>Draft ED</span>
                            <input id="task-add-form-drafted" type="date" placeholder="Document Name">
                        </div>
                        <div class="fill">
                            <span>Review ED</span>
                            <input id="task-add-form-reviewed" type="date" placeholder="Document Name">
                        </div>
                        <div class="fill">
                            <span>Approval ED</span>
                            <input id="task-add-form-approvaled" type="date" placeholder="Document Name">
                        </div>
                        <div class="fill">
                            <span>Execution ED</span>
                            <input id="task-add-form-executioned" type="date" placeholder="Document Name">
                        </div>
                        <div class="fill">
                            <span>Post Approval ED</span>
                            <input id="task-add-form-postapprovaled" type="date" placeholder="Document Name">
                        </div>
                    </div>
                    <button id="task-add-form-save" class="btn-shadow ">Save</button>
                    <button id="task-add-form-cancel" class="btn-shadow ">Cancel</button>
                    
                </div>
            </div>

            <div status="closed" class="task-clipboard btn-shadow">
              <i class="fas fa-clipboard-list task-clipboard-icon"></i>
              <div class="task-clipboard-form">
                <span class="task-clipboard-title">Clipboard<i class="fas fa-times"></i></span>
                <div class="task-clipboard-addtask">
                  <input type="text" placeholder="Add Task">
                  <button class="btn-shadow">Add Task</button>
                </div>
                <div class="task-clipboard-tasklist">
                  <span class="task-clipboard-tasklist-widget color-sc">Task Name <i class="fas fa-trash"></i></span>
                  <span class="task-clipboard-tasklist-widget color-sc">Task Name <i class="fas fa-trash"></i></span>
                  <span class="task-clipboard-tasklist-widget color-sc">Task Name <i class="fas fa-trash"></i></span>
                  <span class="task-clipboard-tasklist-widget color-sc">Task Name <i class="fas fa-trash"></i></span>
                  <span class="task-clipboard-tasklist-widget color-sc">Task Name <i class="fas fa-trash"></i></span>
                  <span class="task-clipboard-tasklist-widget color-sc">Task Name <i class="fas fa-trash"></i></span>
                </div>
              </div>
            </div>

            <div class="task-resources-con">
              <div class="task-resources-form btn-shadow">
                <span class="task-resources-form-title">Add Resources to Task: <span class="task-resources-form-title-taskname">Custom Task Name</span></span>
                <fieldset class="task-resources-form-type-con">
                  <legend>Select Type of Resource</legend>
                  <input class="task-resources-form-type-handle" id="task-resources-form-type-hours" type="radio" name="prefs-type" value="hours" checked>
                  <label for="task-resources-form-type-hours">Hourly</label>
                  <input class="task-resources-form-type-handle" id="task-resources-form-type-supplier" type="radio" name="prefs-type" value="supplier">
                  <label for="task-resources-form-type-supplier">Supplier</label>
                  <input class="task-resources-form-type-handle" id="task-resources-form-type-tm" type="radio" name="prefs-type" value="tm">
                  <label for="task-resources-form-type-tm">T&M</label>
                
                  <div class="task-resources-form-type-hours task-resources-form-type-container">
                    <select name="" id="task-resources-form-type-hours-select">
                      <option value="us1">User 1</option>
                      <option value="us2">User 2</option>
                      <option value="us3">User 3</option>
                    </select>
                    <input type="text" id="task-resources-form-type-hours-input" placeholder="Hours">
                    <button class="btn-shadow task-resources-form-type-submit hours">Add Resource</button>
                  </div>
                  <div class="task-resources-form-type-supplier task-resources-form-type-container">
                    <select name="" id="task-resources-form-type-supplier-select">
                      <option value="sup1">Supplier 1</option>
                      <option value="sup2">Supplier 2</option>
                      <option value="sup3">Supplier 3</option>
                    </select>
                    <input type="text" id="task-resources-form-type-supplier-input" placeholder="Add New Supplier">
                    <button class="btn-shadow task-resources-form-type-submit supplier">Add Resource</button>
                  </div>
                  <div class="task-resources-form-type-tm task-resources-form-type-container">
                    <select name="" id="task-resources-form-type-tm-select">
                      <option value="sup4">Supplier 1</option>
                      <option value="sup5">Supplier 2</option>
                      <option value="sup6">Supplier 3</option>
                    </select>
                    <input type="text" id="task-resources-form-type-tm-input" placeholder="Add New Supplier">
                    <input id="task-resources-form-type-tm-maxhours" type="text" placeholder="Hours">
                    <button class="btn-shadow task-resources-form-type-submit tm">Add Resource</button>
                  </div>
                </fieldset>

                <div class="task-resources-form-connect-list">
                  <span class="task-resources-form-connect-list-widget color-sc">Firstname Lastname 
                    <div>
                      <input type="text" placeholder="hours" value="40" disabled>
                      <i status="edit" class="fas fa-edit task-resources-form-connect-list-widget-edit"></i>
                      <i class="fas fa-trash task-resources-form-connect-list-widget-edit"></i>
                    </div>
                  </span>
                  <span class="task-resources-form-connect-list-widget color-sc">Firstname Lastname 
                    <div><input type="text" placeholder="hours" value="40" disabled><i status="edit" class="fas fa-edit task-resources-form-connect-list-widget-edit"></i><i class="fas fa-trash task-resources-form-connect-list-widget-edit"></i></div>
                  </span>
                  <span class="task-resources-form-connect-list-widget color-sc">Firstname Lastname 
                    <div><input type="text" placeholder="hours" value="40" disabled><i status="edit" class="fas fa-edit task-resources-form-connect-list-widget-edit"></i><i class="fas fa-trash task-resources-form-connect-list-widget-edit"></i></div>
                  </span>
                </div>

                <span class="task-resources-form-totalhours-con">Total Hours: <span class="task-resources-form-totalhours"></span></span>

              </div>
            </div>

            <div class="document-link-con">
              <div class="document-link-form btn-shadow">
                <span class="document-link-form-title">Add Link to <span class="document-link-form-title-documentname">Custom Document Name</span></span>
                <div class="document-link-form-stage-select">
                  <select name="" id="choose-link-stage">
                    <option value="drafted">Draft End</option>
                    <option value="reviewed">Review End</option>
                    <option value="approvaled">Approve End</option>
                    <option value="executioned">Execution End</option>
                    <option value="postapprovaled">Post Approval End</option>
                  </select>
                  <button id ="link-btn-select-stage" class="btn-shadow">Select Stage</button>
                </div>

                <div class="document-link-form-document-select">
                  <select name="" id="choose-link-document">
                    <option value="">Document Name 1</option>
                    <option value="">Document Name 2</option>
                    <option value="">Document Name 3</option>
                    <option value="">Document Name 4</option>
                  </select>
                  <button id = 'btn-link-add' class="btn-shadow">Add Link</button>
                </div>

                <div class="document-link-form-document-list">
                  <span>Document Name 1<span>2020-09-01<i class="fas fa-trash"></i></span></span>
                  <span>Document Name 2<span>2020-09-01<i class="fas fa-trash"></i></span></span>
                  <span>Document Name 3<span>2020-09-01<i class="fas fa-trash"></i></span></span>
                </div>

              </div>
            </div>

            <div class="document-preds-con">
              <div class="document-preds-form btn-shadow">
                <span class="document-preds-form-title">Add Predecessor to <span class="document-preds-form-title-documentname">Custom Document Name</span></span>
                <div class="document-preds-form-stage-select">
                  <select name="" id="choose-preds-stage">
                    <option value="drafted">Draft End</option>
                    <option value="reviewed">Review End</option>
                    <option value="approvaled">Approve End</option>
                    <option value="executioned">Execution End</option>
                    <option value="postapprovaled">Post Approval End</option>
                  </select>
                  <button id = "preds-btn-select-stage" class="btn-shadow">Select Stage</button>
                </div>

                <div class="document-preds-form-document-select">
                  <select name="" id="choose-preds-document">
                    <option value="">Document Name 1</option>
                    <option value="">Document Name 2</option>
                    <option value="">Document Name 3</option>
                    <option value="">Document Name 4</option>
                  </select>
                  <button id = 'btn-preds-add' class="btn-shadow">Add Predecessor</button>
                </div>

                <div class="document-preds-form-document-list">
                  <span>Document Name 1 <span>2020-09-01<i class="fas fa-trash"></i></span></span>
                  <span>Document Name 2 <span>2020-09-01<i class="fas fa-trash"></i></span></span>
                  <span>Document Name 3 <span>2020-09-01<i class="fas fa-trash"></i></span></span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div><!-- now called Schedule under ACTIVE DOCUMENTS -->

      <div class="taskboard-con hidden nav-maincontainer boards-task-con">
        <div class="nav-content-">

          <div class="taskboard-pmmessage-con">
            <div class="taskboard-pmmessage-form btn-shadow">
              <span>Send Message to Team Assigned to Task</span>
              <textarea id="taskboard-pmmessage-msg" maxlength="150" placeholder="Message Limit 150 characters"></textarea>
              <button id="taskboard-pmmessage-submit" class="btn-shadow">Send <i class="fas fa-reply"></i></button>
            </div>
          </div>

          <div class="taskboard-usrmessage-con">
            <div class="taskboard-usrmessage-form btn-shadow">
              <span>Viewing Message from Team Assigned to Task <i class="fas fa-times taskboard-usrmessage-close"></i></span>
              
              <div class="taskboard-usrmessage-widget shadow color-sc">
                <span class="message">Hello there this is my super long message that i have been wanting to tell you about earlier but you were too busy that i didnt get the chance to tell you but yeah here it is.</span>
                <span class="name">Noel Santillan</span>
              </div>
              
            </div>
          </div>

          <div class="taskboard-dispute-con">
            <div class="taskboard-dispute-form btn-shadow">
              <span>View Alerts sent to you by Team Assigned to this Task<i class="fas fa-times taskboard-dispute-close"></i></span>
              
              <div class="taskboard-dispute-widget shadow color-sc">
                <span class="name"><i class="fas fa-calendar-day"></i> Brijesh Patel</span>
                <span class="message">Suggests to move Tasks End Date to <input type="date" value="2020-09-30" disabled></span>
                <button class="btn-shadow taskboard-dispute-submit reject">Reject</button>
                <button class="btn-shadow taskboard-dispute-submit approve">Approve</button>
              </div>

              <div class="taskboard-dispute-widget shadow color-sc">
                <span class="name"><i class="fas fa-unlink"></i> Noel Santillan</span>
                <span class="message">Suggests to give the Task to <input type="text" value="Noel Santillan" disabled></span>
                <button class="btn-shadow taskboard-dispute-submit reject">Reject</button>
                <button class="btn-shadow taskboard-dispute-submit approve">Approve</button>
              </div>

            </div>
          </div>

          <div class="taskboard-header">
            <div class="title color-sc">
              <span id="taskboard-header-projectname" class="name">Task Board</span>
              <span id="taskboard-header-projectid" class="id">Project Name</span>
              <span id="taskboard-header-ownername" class="owner">Noel Santillan</span>
            </div>
            <div class="taskboard-panel">
              <div class="taskboard-navigation color-sc">
                <div class="taskboard-header-filter-datefrom taskboard-header-search-widget">
                  <span>Date From <i class="fas fa-calendar-day taskboard-header-filter-datefrom-reset"></i></span>
                  <input type="date" id="taskboard-header-filter-datefrom" value="">
                </div>

                <div class="taskboard-header-filter-dateto taskboard-header-search-widget">
                  <span>Date to</span>
                  <select name="" id="taskboard-header-filter-dateto">
                    <option value="1w">1 Week</option>
                    <option value="2w">2 Weeks</option>
                    <option value="1m">1 Month</option>
                    <option value="2m">2 Months</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                    <option value="1y">1 Year</option>
                    <option value="2y">2 Years</option>
                    <option value="5y">6 Years</option>
                    <option value="10y">1 Decade</option>
                  </select>
                </div>

                <button id="taskboard-header-search-submit" class="btn-shadow">Retrieve Data</button>

              </div>
              <div class="taskboard-mods">

                <div class="taskboard-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="taskboard-mods-refresh">Refresh Data</span>
                </div>

                <div class="taskboard-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="taskboard-mods-dashboard">Dashboard</span>
                </div>

                <div class="taskboard-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit Taskboard"></i>
                  <span id="taskboard-mods-exit">Exit Taskboard</span>
                </div>

                <div class="taskboard-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="taskboard-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>

          <div class="taskboard-body">
            
            <div class="taskboard-body-widget-con">
              <span class="taskboard-body-widget-title color-grey">Not Started<i class="fas fa-sync"></i></span>
              <div id="taskboard-body-widget-notstarted" class="taskboard-body-widget-container color-grey-half">
                                
                <!-- <div class="taskboard-body-widget shadow grey unassigned">
                  <span class="taskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="taskboard-body-widget-name">
                    <span class="taskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="taskboard-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="taskboard-body-widget-when" >2 Days Ago</span>
                  <div class="taskboard-body-widget-icons-con">
                    <i class="fas fa-link taskboard-body-widget-icons-link" title="Planning Document Title"></i>
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                  </div>
                </div>

                <div id="taskboard_T-123123123" class="taskboard-body-widget shadow grey assigned">
                  <span class="taskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="taskboard-body-widget-name">
                    <span class="taskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="taskboard-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="taskboard-body-widget-when" >2 Days Ago</span>
                  <div class="taskboard-body-widget-icons-con">
                    <i class="fas fa-link taskboard-body-widget-icons-link" title="Planning Document Title"></i>
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                  </div>
                </div>

                <div class="taskboard-body-widget shadow green assigned">
                  <span class="taskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="taskboard-body-widget-name">
                    <span class="taskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="taskboard-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="taskboard-body-widget-when" >2 Days Ago</span>
                  <div status="empty" class="taskboard-body-widget-icons-con">
                    <i class="fas fa-link taskboard-body-widget-icons-link" title="Planning Document Title"></i>
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                  </div>
                </div>

                <div class="taskboard-body-widget shadow orange assigned">
                  <span class="taskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="taskboard-body-widget-name">
                    <span class="taskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="taskboard-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="taskboard-body-widget-when" >2 Days Ago</span>
                  <div class="taskboard-body-widget-icons-con">
                    <i class="fas fa-link taskboard-body-widget-icons-link" title="Planning Document Title"></i>
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                  </div>
                </div>

                <div class="taskboard-body-widget shadow red assigned">
                  <span class="taskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="taskboard-body-widget-name">
                    <span class="taskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="taskboard-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="taskboard-body-widget-when" >2 Days Ago</span>
                  <div class="taskboard-body-widget-icons-con">
                    <i class="fas fa-link taskboard-body-widget-icons-link" title="Planning Document Title"></i>
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                  </div>
                </div>

                <div class="taskboard-body-widget shadow blue assigned">
                  <span class="taskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="taskboard-body-widget-name">
                    <span class="taskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="taskboard-body-widget-dates" >09.21.2020 - 09.30.2020</span>
                  <span class="taskboard-body-widget-when" >2 Days Ago</span>
                  <div class="taskboard-body-widget-icons-con">
                    <i class="fas fa-link taskboard-body-widget-icons-link" title="Planning Document Title"></i>
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                  </div>
                </div> -->


              </div>
            </div>

            <div class="taskboard-body-widget-con">
              <span class="taskboard-body-widget-title color-green">Started<i class="fas fa-sync"></i></span>
              <div id="taskboard-body-widget-started" class="taskboard-body-widget-container color-green-half">

                
              </div>
            </div>

            <div class="taskboard-body-widget-con">
              <span class="taskboard-body-widget-title color-orange">Due Today<i class="fas fa-sync"></i></span>
              <div id="taskboard-body-widget-due" class="taskboard-body-widget-container color-orange-half">
                
              </div>
            </div>

            <div class="taskboard-body-widget-con">
              <span class="taskboard-body-widget-title color-red">Past Due<i class="fas fa-sync"></i></span>
              <div id="taskboard-body-widget-pastdue" class="taskboard-body-widget-container color-red-half">
                
              </div>
            </div>

            <div class="taskboard-body-widget-con">
              <span class="taskboard-body-widget-title color-blue">Done<i class="fas fa-sync"></i></span>
              <div id="taskboard-body-widget-done" class="taskboard-body-widget-container color-blue-half">

              </div>
            </div>


          </div>

        </div>
      </div> <!-- task board -->

      <div class="project-timesheet-con hidden nav-maincontainer">
        <div class="nav-content- timesheet-con">
          
          <div class="timesheet-calendar hidden" >
            <span class="shadow">Timesheet Calendar View</span>
            <div class="timesheet-calendar-con shadow">

              <div class="timesheet-calendar-widget" sd="" ed="" tid="" start="">
                <div class="timesheet-calendar-widget-title">
                  <span class="timesheet-calendar-taskname">Task Name</span>
                  <span class="timesheet-calendar-week">Oct 10 - Oct 21</span>
                </div>
                <div class="timesheet-calendar-widget-body">
                  <button class="timesheet-calendar-prev"><i class="fas fa-caret-left"></i></button>
                  <div class="calendar">
                    <div class="top">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                      <span>Total Hours</span>
                    </div>
                    <div class="bottom">
                      <span class="timesheet-calendar-mon">0</span>
                      <span class="timesheet-calendar-tue">0</span>
                      <span class="timesheet-calendar-wed">0</span>
                      <span class="timesheet-calendar-thu">0</span>
                      <span class="timesheet-calendar-fri">0</span>
                      <span class="timesheet-calendar-sat">0</span>
                      <span class="timesheet-calendar-sun">0</span>
                      <span class="timesheet-calendar-total">0 Hours</span>
                    </div>
                  </div>
                  <button class="timesheet-calendar-next"><i class="fas fa-caret-right"></i></button>
                </div>
              </div>

            </div>
          </div>
          <div class="timesheet-week hidden" >
            <span class="ptitle shadow">All Project Calendar View</span>
            <div class="timesheet-pweek-con shadow">
              <i class="fas fa-times timesheet-pweek-con-close shadow"></i>
              <div class="timesheet-pweek-widget-con mon">
                <span class="title">Monday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con tue">
                <span class="title">Tuesday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con wed">
                <span class="title">Wednesday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con thu">
                <span class="title">Thursday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con fri">
                <span class="title">Friday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con sat">
                <span class="title">Saturday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con sun">
                <span class="title">Sunday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-pweek-widget-con total">
                <span class="title">Total Hours<br>This Week</span>
                <span class="hours">20 Hours</span>
              </div>
            </div>
            <span class="title shadow">Selected Project Calendar View</span>
            <div class="timesheet-week-con shadow">
              <!-- <i class="fas fa-times timesheet-week-con-close"></i> -->
              <div class="timesheet-week-widget-con mon">
                <span class="title">Monday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con tue">
                <span class="title">Tuesday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con wed">
                <span class="title">Wednesday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con thu">
                <span class="title">Thursday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con fri">
                <span class="title">Friday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con sat">
                <span class="title">Saturday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con sun">
                <span class="title">Sunday<br>Nov 10, 2020</span>
                <span class="hours">20 Hours</span>
              </div>
              <div class="timesheet-week-widget-con total">
                <span class="title">Total Hours<br>This Week</span>
                <span class="hours">20 Hours</span>
              </div>
            </div>

          </div>
          <div class="timesheet-header">
            <div class="title color-sc">
              <span id="timesheet-header-projectname" class="name"></span>
              <span id="timesheet-header-projectid" class="id"></span>
              <span id="timesheet-header-ownername" class="owner"></span>
              
            </div>
            <div class="timesheet-panel">
              <div class="timesheet-navigation color-sc">
                <div class="filter">
                  <span>Select Project</span>
                  <select name="" id="project-timesheet-list">
                    <option value="">Project 1</option>
                    <option value="">Project 2</option>
                    <option value="">Project 3</option>
                    <option value="">Project 4</option>
                  </select>
                </div>
                <button id="timesheet-project-submit" class="btn-shadow">Select Project</button>
              </div>
              <div class="timesheet-mods">

                <div class="timesheet-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="timesheet-mods-refresh">Refresh Data</span>
                </div>

                <div class="timesheet-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="timesheet-mods-dashboard">Dashboard</span>
                </div>

                <div class="timesheet-mods-widget btn-shadow">
                  <input id="timesheet-mods-week" type="week">
                  <span id="timesheet-mods-calendar">Calendar View</span>
                </div>

                <div class="timesheet-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit timesheet"></i>
                  <span id="timesheet-mods-exit">Exit Timesheet</span>
                </div>

                <div class="timesheet-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="timesheet-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>
          <div class="timesheet-legend">
            <div class="left">
              <span>Task Name</span>
              <span>Start Date</span>
              <span>End Date</span>
            </div>
            <div class="right">
              <span>Actual</span>
              <span>Remaining</span>
              <span>Total</span>
              <span>A</span>
            </div>
          </div>
          <div class="timesheet-body hidden">

            <div class="timesheet-body-widget color-sc">
              <div class="top part">
                <div class="leftside">
                  <span status="closed" class="project-timesheet-taskname">Task Name</span>
                  <input class="project-timesheet-startdate" type="date" value="2020-09-30" disabled>
                  <input class="project-timesheet-enddate" type="date" value="2020-10-10"disabled>
                </div>
                <div class="rightside">
                  <div class="top">
                    <span class="project-timesheet-completed">12 Hrs</span>
                    <span class="project-timesheet-remaining">6 Hrs</span>
                    <span class="project-timesheet-total">18 Hrs</span>
                    <i class="fas fa-business-time project-timesheet-add"></i>
                    <i class="fas fa-calendar-week project-timesheet-calendar"></i>
                  </div>
                  <span class="bot project-timesheet-progress">
                    Task Progress: 75%
                  </span>
                </div>
              </div>
              <div class="bottom part timesheet-body-widget-hours-con">

                <div class="timesheet-body-widget-hours btn-shadow">
                  <input class="timesheet-body-widget-date" type="date" disabled>
                  <input class="timesheet-body-widget-hours" type="text" placeholder="Hours" value="12" disabled>
                  <i status="save" class="fas fa-trash timesheet-body-widget-save"></i>
                </div>
                <div class="timesheet-body-widget-hours btn-shadow">
                  <input class="timesheet-body-widget-date" type="date">
                  <input class="timesheet-body-widget-hours" type="text" placeholder="Hours">
                  <i status="save" class="fas fa-save timesheet-body-widget-save"></i>
                </div>

              </div>
            </div>

          </div>
          <div class="timesheet-footer hidden color-sc">
            <div class="top">
              <div class="footer-widget" title="Total hours alloted to Users Tasks including T&M.">
                <span>Total Alloted Hours</span>
                <input id="timesheet-footer-hours-total" type="text" placeholder="Total Hours" value="200" disabled>
              </div>
              <div class="footer-widget" title="Earliest Date from Tasks">
                <span>Earliest Date</span>
                <input id="timesheet-footer-hours-startdate" type="text" placeholder="Earliest Date" value="2020-01-01" disabled>
              </div>
              <div class="footer-widget" title="Latest Date from Tasks">
                <span>Latest Date</span>
                <input id="timesheet-footer-hours-enddate" type="text" placeholder="Latest Date" value="2020-12-31" disabled>
              </div>
              <div class="footer-widget" title="Total hours alloted to Users Tasks excluding T&M">
                <span>User Hours</span>
                <input id="timesheet-footer-hours-user" type="text" placeholder="User Hours" value="200" disabled>
              </div>
              <div class="footer-widget" title="Computed Total Hours after a User clicks on 'Done' on the Task.">
                <span>Completed Hours</span>
                <input id="timesheet-footer-hours-completed" type="text" placeholder="Completed Hours" value="120" disabled>
              </div>
              <div class="footer-widget" title="Difference Between Total Hours and Completed Hours">
                <span>Hour Variance</span>
                <input id="timesheet-footer-hours-variance" type="text" placeholder="Hour Variance" value="+80" disabled>
              </div>
            </div>
            <div class="bottom">
              <div class="timesheet-footer-progress"></div>
            </div>
          </div>

        </div>
      </div>

      <div class="usertaskboard-con hidden nav-maincontainer boards-task-con">
        <div class="nav-content-">

          <div class="usertaskboard-usrmessage-con" tid="T-12341512" trid="TR-91982785">
            <div class="usertaskboard-usrmessage-form btn-shadow">
              <span>Send Message to Project Manager</span>
              <textarea id="usertaskboard-usrmessage-msg" id="" maxlength="150" placeholder="Message Limit 150 characters"></textarea>
              <button id="usertaskboard-usrmessage-submit" class="btn-shadow">Send <i class="fas fa-reply"></i></button>
            </div>
          </div>

          <div class="usertaskboard-pmmessage-con" tid="T-12341512" trid="TR-91982785">
            <div class="usertaskboard-pmmessage-form btn-shadow">
              <span>Viewing Message from Project Manager <i class="fas fa-times usertaskboard-pmmessage-close"></i></span>
              
              <div class="usertaskboard-pmmessage-widget shadow color-sc">
                <span class="message">Hello there this is my super long message that i have been wanting to tell you about earlier but you were too busy that i didnt get the chance to tell you but yeah here it is.</span>
                <span class="mark shadow">Mark as Read</span>
              </div>
              
            </div>
          </div>

          <div class="usertaskboard-dispute-con"  tid="T-12341512" trid="TR-91982785">
            <div class="usertaskboard-dispute-form btn-shadow">
              <span>Request a change to Project Manager<i class="fas fa-times usertaskboard-dispute-close"></i></span>
              
              <div class="usertaskboard-dispute-widget date shadow color-sc">
                <span class="message">Request a new End Date for the Task</span>
                <div class="msgdate">
                  <span></span>
                  <input id="usertaskboard-dispute-widget-suggestedenddate" type="date" value="2020-09-30">
                </div>
                <button class="btn-shadow usertaskboard-dispute-submit date">Send Request</button>
              </div>

              <div class="usertaskboard-dispute-widget assignment shadow color-sc">
                <span class="message">Suggest a new Team Member to handle Task</span>
                <select name="" id="usertaskboard-dispute-accountlist">
                  <option value="a1">Account 1</option>
                  <option value="a2">Account 2</option>
                  <option value="a3">Account 3</option>
                  <option value="a4">Account 4</option>
                </select>
                <button class="btn-shadow usertaskboard-dispute-submit assignment">Send Request</button>
              </div>

            </div>
          </div>

          <div class="usertaskboard-header">
            <div class="title color-sc">
              <span id="usertaskboard-header-projectname" class="name">User's Task Board</span>
              <span id="usertaskboard-header-projectid" class="id"></span>
              <span id="usertaskboard-header-ownername" class="owner"></span>
            </div>
            <div class="usertaskboard-panel">
              <div class="usertaskboard-navigation color-sc">
                <div class="usertaskboard-header-filter-datefrom usertaskboard-header-search-widget">
                  <span>Date From <i class="fas fa-calendar-day usertaskboard-header-filter-datefrom-reset"></i></span>
                  <input type="date" id="usertaskboard-header-filter-datefrom" value="">
                </div>

                <div class="usertaskboard-header-filter-dateto usertaskboard-header-search-widget">
                  <span>Date to</span>
                  <select name="" id="usertaskboard-header-filter-dateto">
                    <option value="1w">1 Week</option>
                    <option value="2w">2 Weeks</option>
                    <option value="1m">1 Month</option>
                    <option value="2m">2 Months</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                    <option value="1y">1 Year</option>
                    <option value="2y">2 Years</option>
                    <option value="5y">6 Years</option>
                    <option value="10y">1 Decade</option>
                  </select>
                </div>

                <div class="usertaskboard-header-filter-project usertaskboard-header-search-widget">
                  <span>Select Project</span>
                  <select name="" id="usertaskboard-header-filter-project">
                    <option value="">Project 1</option>
                    <option value="">Project 2</option>
                    <option value="">Project 3</option>
                    <option value="">Project 4</option>
                  </select>
                </div>

                <button id="usertaskboard-header-search-submit" class="btn-shadow">Retrieve Data</button>

              </div>
              <div class="usertaskboard-mods">

                <div class="usertaskboard-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="usertaskboard-mods-refresh">Refresh Data</span>
                </div>

                <div class="usertaskboard-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="usertaskboard-mods-dashboard">Dashboard</span>
                </div>

                <!-- <div class="usertaskboard-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit usertaskboard"></i>
                  <span id="usertaskboard-mods-exit">Exit usertaskboard</span>
                </div> -->

                <div class="usertaskboard-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="usertaskboard-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>

          <div class="usertaskboard-body">
            
            <div class="usertaskboard-body-widget-con">
              <span class="usertaskboard-body-widget-title color-grey">Not Started<i class="fas fa-sync"></i></span>
              <div id="usertaskboard-body-widget-notstarted" class="usertaskboard-body-widget-container color-grey-half">

                <div id="usertaskboard_T-123123123" trid="TR-123455676" class="usertaskboard-body-widget shadow grey ">
                  <span class="usertaskboard-body-widget-id" title="Document Name">D-897698789</span>
                  <div class="usertaskboard-body-widget-name">
                    <span class="usertaskboard-body-widget-name-title" >Document Name is Very Long </span>
                  </div>
                  <span class="usertaskboard-body-widget-dates" >09.21.2020 <i class="fas fa-angle-right"></i> 09.30.2020</span>
                  <span class="usertaskboard-body-widget-when" >2 Days Ago</span>
                  <div class="usertaskboard-body-widget-icons-con">
                    <i class="usertaskboard-body-widget-icons-start fas fa-briefcase" title="Start Working on this Task"></i>
                    <i class="usertaskboard-body-widget-icons-dispute fas fa-exclamation-triangle" title="Put Task under dispute"></i>
                    <i class="usertaskboard-body-widget-icons-done fas fa-gavel" title="Task is Done"></i>
                    <i class="usertaskboard-body-widget-icons-pmmsg fas fa-comment-alt" title="PM Message"></i>
                    <i class="usertaskboard-body-widget-icons-usrmsg fas fa-reply" title="Send Message to PM"></i>
                  </div>
                </div>


              </div>
            </div>

            <div class="usertaskboard-body-widget-con">
              <span class="usertaskboard-body-widget-title color-green">Started<i class="fas fa-sync"></i></span>
              <div id="usertaskboard-body-widget-started" class="usertaskboard-body-widget-container color-green-half">

                
                
              </div>
            </div>

            <div class="usertaskboard-body-widget-con">
              <span class="usertaskboard-body-widget-title color-orange">Due Today<i class="fas fa-sync"></i></span>
              <div id="usertaskboard-body-widget-due" class="usertaskboard-body-widget-container color-orange-half">
                
              </div>
            </div>

            <div class="usertaskboard-body-widget-con">
              <span class="usertaskboard-body-widget-title color-red">Past Due<i class="fas fa-sync"></i></span>
              <div id="usertaskboard-body-widget-pastdue" class="usertaskboard-body-widget-container color-red-half">
                
              </div>
            </div>

            <div class="usertaskboard-body-widget-con">
              <span class="usertaskboard-body-widget-title color-blue">Done<i class="fas fa-sync"></i></span>
              <div id="usertaskboard-body-widget-done" class="usertaskboard-body-widget-container color-blue-half">

              </div>
            </div>


          </div>

        </div>
      </div> <!-- user task board -->

      <div class="chart-con hidden nav-maincontainer">
        <div class="nav-content-">

          <div div id="piechart"></div>

        </div>
      </div>

      <div class="finance-spending-con hidden nav-maincontainer">
        <div class="nav-content-">
          <div class="spending-header">
            <div class="title color-sc">
              <span id="spending-header-projectname" class="name">Finance Spending</span>
              <span id="spending-header-projectid" class="id"></span>
            </div>
            <div class="spending-panel">
              <div class="spending-navigation color-sc">
                <span cid="dashboard" class="spending-navigation-widget ">Spend Tracking Dashboard</span>
                <span cid="opexspend" class="spending-navigation-widget ">OPEX Spend</span>
                <span cid="capexspend" class="spending-navigation-widget ">CAPEX Spend</span>
                <!-- <span cid="opexforecast" class="spending-navigation-widget ">OPEX Forecast</span> -->
                <span cid="capexforecast" class="spending-navigation-widget ">CAPEX Forecast</span>
              </div>
              <div class="spending-mods">

                <!-- <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-pencil-alt" title="View or Edit spending"></i>
                  <span id="spending-mods-prefs">View/Edit spending</span>
                </div> -->

                <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-sync-alt" title="Refresh Data"></i>
                  <span id="spending-mods-refresh">Refresh Data</span>
                </div>

                <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                  <span id="spending-mods-dashboard">Dashboard</span>
                </div>
                
                <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-building" title="Create Supplier"></i>
                  <span id="spending-mods-suppier">Create Supplier</span>
                </div>

                <!-- <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-tools" title="Request Creation Tool"></i>
                  <span id="spending-mods-create">Request Creation Tool</span>
                </div> -->

                <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-backspace" title="Exit spending"></i>
                  <span id="spending-mods-exit">Exit Spending</span>
                </div>

                <div class="spending-mods-widget btn-shadow">
                  <i class="fas fa-print" title="Print"></i>
                  <span id="spending-mods-print">Print</span>
                </div>

              </div>
            </div>
          </div>
          <div class="spending-body">
            <div class="spending-body-dashboard hidden spending-body-widget-">
              <div class="spending-itemlist-legend">
                <span>Budget Item</span>
                <span>Category</span>
                <span>CAPEX Budget</span>
                <span>CAPEX Actual Spend</span>
                <span>OPEX Budget</span>
                <span>OPEX Actual Spend</span>
                <span>Vendor</span>
                <span>Actions</span>
              </div>
              <div class="spending-itemlist-body">

                <div class="spending-itemlist-widget">
                  <input class="spending-itemlist-widget-budgetitem" type="text" placeholder="Budget Item">
                  <select class="spending-itemlist-widget-item">
                    <option value="hours">Internal</option>
                    <option value="supplier">Lumpsum</option>
                    <option value="tm">T&M</option>
                  </select>
                  <input class="spending-itemlist-widget-capexbudget" type="text" placeholder="$">
                  <input class="spending-itemlist-widget-capexactual" type="text" placeholder="$">
                  <input class="spending-itemlist-widget-opexbudget" type="text" placeholder="$">
                  <input class="spending-itemlist-widget-opexactual" type="text" placeholder="$">
                  <select class="spending-itemlist-widget-vendor">
                    <option value="">Supplier 1</option>
                    <option value="">Supplier 2</option>
                    <option value="">Supplier 3</option>
                  </select>
                  <div>
                    <!-- <input class="popup-widget-upload-get" onchange="spending_popup_widget_upload($(this))" type="file" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;"> -->
                    <i class="fas fa-cloud-upload-alt spending-itemlist-widget-upload-view" title="upload attachment"></i>
                  </div>
                </div>

              </div>
            </div>
            <div class="spending-body-opexspend hidden spending-body-widget-">
              <div class="spending-opexspend-itemlist-legend">
                <span>Team Member Name</span>
                <span>Role</span>
                <span>Rate $/Hr</span>
                <span>Alloted Hours</span>
                <span>Actual Hours</span>
                <span>Budget Amount (no tax)</span>
                <span>Actual Amount (no tax)</span>
              </div>
              <div class="spending-opexspend-itemlist-body">
                <div class="spending-opexspend-itemlist-widget">
                  <input class="name" type="text" placeholder="Team Member Name" value="Team Member Name" disabled>
                  <input class="role" type="text" placeholder="Role" disabled>
                  <input class="rate" type="text" placeholder="Rate $/hr" disabled>
                  <input class="hours" type="text" placeholder="Alloted Hours" disabled>
                  <input class="total" type="text" placeholder="Actual Hours" value="" >
                  <input class="total" type="text" placeholder="$" value="$200.00" disabled>
                  <input class="total" type="text" placeholder="$" value="$200.00" disabled>
                </div>
              </div>
            </div>
            <div class="spending-body-capexspend hidden spending-body-widget-">
              <div class="capexspend-itemlist-legend">
                <span>Supplier Name</span>
                <span>Budget Item</span>
                <span>Invoice Date</span>
                <span>Invoice Detail</span>
                <span>Invoice Number</span>
                <span>Exchange Rate</span>
                <span>Actual Spend</span>
                <span>Payment %</span>
                <span>Actions</span>
              </div>
              <div class="capexspend-itemlist-body">
                <div class="capexspend-itemlist-widget">
                  <select class="capexspend-itemlist-widget-supplierid">
                    <option value="hours">Item 1</option>
                    <option value="hours">Item 2</option>
                    <option value="hours">Item 3</option>
                    <option value="hours">Item 4</option>
                  </select>
                  <select class="capexspend-itemlist-widget-budgetid">
                    <option value="hours">Item 1</option>
                    <option value="hours">Item 2</option>
                    <option value="hours">Item 3</option>
                    <option value="hours">Item 4</option>
                  </select>
                  <input class="capexspend-itemlist-widget-invoicedate" type="date" value="">
                  <input class="capexspend-itemlist-widget-invoicedetail" type="text" placeholder="Invoice Detail">
                  <input class="capexspend-itemlist-widget-invoicenumber" type="text" placeholder="Invoice Number">
                  <input class="capexspend-itemlist-widget-exchangerate" type="text" placeholder="Exchange Rate">
                  <input class="capexspend-itemlist-widget-capexbudget" type="text" placeholder="Actual Spend">
                  <input class="capexspend-itemlist-widget-capexactual" type="text" placeholder="Payment %" disabled>
                  <div>
                    <input class="popup-widget-upload-get" onchange="popup_widget_upload($(this))" type="file" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;">
                    <i onclick="$(this).siblings('.popup-widget-upload-get').click();" class="fas fa-cloud-upload-alt" title="Upload Attachment"></i>
                    <!-- <i class="fas fa-coins capexspend-itemlist-widget-popup" title="Popups"></i> -->
                    <i class="fas fa-save capexspend-itemlist-widget-save" title="Save"></i>
                    <i class="fas fa-coins capexspend-itemlist-widget-lumpsum" title="Lumpsum Popup"></i>
                    <i class="fas fa-shapes capexspend-itemlist-widget-material" title="Material Popup"></i>
                    <i class="fas fa-people-carry capexspend-itemlist-widget-manhour" title="Manhour Popup"></i>
                    <i class="fas fa-route capexspend-itemlist-widget-expense" title="Expense Popup"></i>
                  </div>
                </div>
              </div>
              <button id="capexspend-itemlist-addrows" class="btn-shadow">Add Rows</button>
            </div>
            <div class="spending-body-opexforecast hidden spending-body-widget-">
              <h1>opexforecast</h1>
            </div>
            <div class="spending-body-capexforecast hidden spending-body-widget-">
              <div class="spending-body-capexforecast-widget">
                <div class="header shadow">
                  <span status="closed" class="spending-body-capexforecast-widget-head-btn">2020</span>
                  <div class="header-widget-con ">
                    <div class="header-annual-widget">
                      <span>Jan</span>
                      <input value="1" type="text" title="Builder 1, Builder 2" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Feb</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Mar</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Apr</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>May</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Jun</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Jul</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Aug</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Sep</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Oct</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Nov</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Dec</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                      <span>Total</span>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                      <input value="1" type="text" disabled>
                    </div>

                  </div>
                </div>
                <div class="content ">

                  <div status="closed" class="spending-body-capexforecast-widget-resource">
                    <span class="tagger">Resource Name</span>
                    <div class="spending-body-capexforecast-widget-resource-annual hidden">
                      <div class="legend">
                        <span>Month</span>
                        <span>Baseline</span>
                        <span>Forecast</span>
                        <span>Actual</span>
                      </div>
                      <div class="annual">
                        <div class="annual-widget">
                          <input value="January" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="February" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="March" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="April" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="May" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="June" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="July" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="August" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="September" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="October" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="November" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="December" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                      </div>
                      <div class="totals">
                        <input value="TOTALS" type="text" disabled>
                        <input type="text" disabled>
                        <input type="text" disabled>
                        <input type="text" disabled>
                      </div>
                      <button class="spending-body-capexforecast-widget-resource-annual-save btn-shadow">Save</button>
                      

                    </div>
                  </div>

                  
                  <div status="closed" class="spending-body-capexforecast-widget-resource hidden">
                    <span>Resource Name</span>
                    <div class="spending-body-capexforecast-widget-resource-annual">
                      <div class="legend">
                        <span>Month</span>
                        <span>Baseline</span>
                        <span>Forecast</span>
                        <span>Actual</span>
                      </div>
                      <div class="annual">
                        <div class="annual-widget">
                          <input value="January" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="February" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="March" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="April" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="May" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="June" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="July" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="August" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="September" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="October" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="November" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                        <div class="annual-widget">
                          <input value="December" type="text" disabled>
                          <input type="text">
                          <input type="text">
                          <input type="text">
                        </div>
                      </div>
                      <div class="totals">
                        <input value="TOTALS" type="text" disabled>
                        <input type="text" disabled>
                        <input type="text" disabled>
                        <input type="text" disabled>
                      </div>

                      

                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div class="popup-spending-supplier hidden">
              <div class="popup-spending-supplier-form color-sc shadow">
                <span class="title">Supplier - Milestone based (Lump Sum) Costing</span>
                <span class="suppliername">Supplier Name</span>
                <div class="legend">
                  <span>Deliverable/Milestones/Items</span>
                  <span>Payment %</span>
                  <span>Budget Amount (No Tax)</span>
                  <span>Payment % Actual</span>
                  <span>Actual Spend</span>
                </div>
                <div class="popup-spending-supplier-widget-con">

                  <!-- <div class="popup-spending-supplier-widget">
                    <input type="text" class="name" placeholder="Item Name" disabled>
                    <input type="text" class="payment popup-spending-supplier-widget-payment" placeholder="%" disabled>
                    <input type="text" class="total" plaecholder="Total Amount" disabled>
                    <input type="text" class="total" plaecholder="Payment %" disabled>
                    <input type="text" class="total" plaecholder="Actual Spend" >
                  </div> -->

                </div>
                <button id="popup-spending-supplier-form-save" class="btn-shadow">Save</button>
              </div>
            </div>

            <div class="popup-spending-tm hidden">   
              <div class="popup-spending-supplier-form color-sc shadow">
                <span class="title">Supplier - T&M(Time & Materials) Spending</span>
                <span class="suppliername">Supplier Name</span>
                <div class="createtool-container">
                  <div class="createtool-maintitle popup-spending-supplier-material">
                    <span class="crtitle btn-shadow">Material Spending (including rental)<i class="fas fa-caret-left"></i></span>
                    <div class="content hidden popup-spending-supplier-material-con">
                      <div class="legend">
                        <span>Materials Items</span>
                        <span>Unit</span>
                        <span>Quantity</span>
                        <span>Unit Price</span>
                        <span>Actual Amount</span>
                        <span>A</span>
                      </div>
                      <div class="popup-spending-supplier-material-widget-con">

                        <!-- <div class="popup-spending-supplier-material-widget">
                          <input class="name" type="text" placeholder="Item Name" disabled>
                          <input class="unit" type="text" placeholder="Unit" disabled>
                          <input class="quantity" type="text" placeholder="Qty." disabled>
                          <input class="price" type="text" placeholder="$" disabled>
                          <input class="amount" type="text" placeholder="$" >
                          <i class="fas fa-save popup-spending-supplier-material-widget-save"></i>
                        </div> -->

                      </div>
                      <span class="popup-spending-supplier-material-totals">Total Amount: $1200.00</span>
                      <!-- <button id="popup-spending-supplier-material-add" class="btn-shadow">Add Rows</button> -->
                    </div>

                  </div>
                  <div class="createtool-maintitle popup-spending-supplier-manhour">
                    <span class="crtitle btn-shadow">Manhours Spending<i class="fas fa-caret-left"></i></span>
                    <div class="content hidden popup-spending-supplier-manhour-con">
                      <div class="legend">
                        <span>Resource Name</span>
                        <span>Role</span>
                        <span>Actual Hours</span>
                        <span>Rate/hr</span>
                        <span>Actual Amount</span>
                        <span>A</span>
                      </div>
                      <div class="popup-spending-supplier-manhour-widget-con">

                        <div class="popup-spending-supplier-manhour-widget">
                          <input class="name" type="text" placeholder="Resource Name" disabled>
                          <input class="role" type="text" placeholder="Role" disabled>
                          <input class="hours" type="text" placeholder="Hours">
                          <input class="rate" type="text" placeholder="$" disabled>
                          <input class="amount" type="text" placeholder="$" disabled>
                          <i class="fas fa-save popup-spending-supplier-manhour-widget-save"></i>
                        </div>

                      </div>
                      <span class="popup-spending-supplier-manhour-totals">Total Amount: $1200.00</span>
                      <!-- <button id="popup-spending-supplier-manhour-add" class="btn-shadow">Add Rows</button> -->
                    </div>
                  </div>
                  <div class="createtool-maintitle popup-spending-supplier-milestone">
                    <span class="crtitle btn-shadow">Milestone Based Hours Calculator<i class="fas fa-caret-left"></i></span>
                    <div class="content hidden popup-spending-supplier-milestone-con">
                      <div class="legend">
                        <span class="legend-resource-name">Milestones/ Deleiverables Breakdown</span>
                        <div class="legend-resource popup-spending-supplier-milestone-legend-resource-con">
                          <span>Res 1</span>
                          <span>Res 2</span>
                          <span>Res 3</span>
                          <span>Res 4</span>
                        </div>
                        <span class="legend-resource-hours">Actual Hours</span> 
                        <span class="legend-resource-a">A</span>
                      </div>
                      <div class="popup-spending-supplier-milestone-widget-con">

                        <div class="popup-spending-supplier-milestone-widget">
                          <input class="name" type="text" placeholder="Item Name" disabled>
                          <div class="resource">
                            <input type="text" placeholder="Hours">
                            <input type="text" placeholder="Hours">
                            <input type="text" placeholder="Hours">
                            <input type="text" placeholder="Hours">
                          </div>
                          <input class="popup-spending-supplier-milestone-allotedhours" type="text" placeholder="Hrs" disabled>
                          <i class="fas fa-save popup-spending-supplier-milestone-widget-save"></i>
                        </div>

                      </div>
                      <!-- <button id="popup-spending-supplier-milestone-addrows" class="btn-shadow" style="margin-top: 5px;">Add Rows</button> -->
                    </div>

                  </div>
                  <div class="createtool-maintitle popup-spending-supplier-expense">
                    <span class="crtitle btn-shadow">Expense Spending - Travel, Mileage, Hotel<i class="fas fa-caret-left"></i></span>
                    <div class="content hidden popup-spending-supplier-expense-con">
                      <div class="legend">
                        <span>Resource Name</span>
                        <span>Total Weeks</span>
                        <span>Trips/Week</span>
                        <span>Km/Miles per Trip</span>
                        <span>Rate $/km-miles</span>
                        <span>Hours per Trip</span>
                        <span>Rate $/hr</span>
                        <span>Fixed Rate per Trip</span>
                        <span>Total Cost</span>
                        <span>A</span>
                      </div>
                      <div class="popup-spending-supplier-expense-widget-con">

                        <div class="popup-spending-supplier-expense-widget">
                          <input type="text" placeholder="Resource Name">
                          <input class="weeks" type="text" placeholder="Total Weeks">
                          <input class="trips" type="text" placeholder="Trips/Week">
                          <input class="distance" type="text" placeholder="Km/Miles">
                          <input class="distancerate" type="text" placeholder="$">
                          <input class="triphours" type="text" placeholder="hrs">
                          <input class="triphoursrate" type="text" placeholder="$">
                          <input class="fixedrate" type="text" placeholder="$">
                          <input class="total" type="text" placeholder="$" disabled>
                          <i class="fas fa-save popup-spending-supplier-expense-widget-save"></i>
                        </div>

                      </div>
                      <span class="popup-spending-supplier-expense-totals">Total Amount: $1200.00</span>
                    </div>

                  </div>
                </div>
                
                


              </div>
            </div>

            <div class="popup-spending-upload hidden">
              <div class="popup-widget hidden popup-widget-upload">
                <div class="filename">
                  <span>Filename</span>
                  <input type="text">
                </div>
                <div class="costing">
                  <span>Costing/Quotation File Number</span>
                  <input type="text">
                </div>
                <button id="popup-widget-upload-submit" class="btn-shadow">Save</button>
                <button id="popup-widget-upload-cancel" class="btn-shadow">Cancel</button>
              </div>
              <div class="popup-widget popup-widget-supplier">

              </div>
            </div>

            <div class="popup-spending-createsupplier hidden">
              <div class="popup-widget">
                <i id="popup-spending-createsupplier-close" class="fas fa-times"></i>
                <span>Add New Supplier</span>
                <input id="popup-spending-createsupplier-name" type="text" placeholder="Enter Supplier Name">
                <button id="popup-spending-createsupplier-add" class="btn-shadow">Add Supplier</button>
              </div>
            </div>


          </div>

          <div class="finance-popup hidden">
            <div class="popup-widget hidden finance-widget-upload">
              <span id="finance-widget-upload-title" class="title">Budget Name and Title</span>
              <div id="finance-widget-upload-folder" class="folder">
                <span class="finance-widget-upload-folder">File Upload 1<i class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
                <span class="finance-widget-upload-folder">File Upload 1<i class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
                <span class="finance-widget-upload-folder">File Upload 1<i class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
                <span class="finance-widget-upload-folder active">File Upload 1<i class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
                <span class="finance-widget-upload-folder">File Upload 1<i class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
                <span class="finance-widget-upload-folder">File Upload 1<i class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
              </div>
              <div class="filename">
                <span>Filename</span>
                <input id="finance-widget-upload-filename" type="text" >
              </div>
              <div class="costing">
                <span>Costing/Quotation File Number</span>
                <input id="finance-widget-upload-costing" type="text">
              </div>
              <div class="action">
                <input id="finance-widget-upload-hiddeninput" class="finance-widget-upload-get" onchange="finance_popup_widget_upload($(this))" type="file" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;">
                <button  onclick="$(this).siblings('.finance-widget-upload-get').click();" class="btn-shadow">Upload<i class="fas fa-upload"></i></button>
                <button id="finance-widget-upload-submit" class="btn-shadow">Save<i class="fas fa-save"></i></button>
                <a id="finance-widget-upload-view-h" target="_blank" href="lib/documents/budgetupload/PB-000813545/1613776091.pdf" style="display: none;" >View</a>
                <button id="finance-widget-upload-view" onclick="$('#finance-widget-upload-view-h')[0].click();" class="btn-shadow">View<i class="fas fa-eye"></i></button>
                <button id="finance-widget-upload-cancel" class="btn-shadow">Cancel</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      

    </div>


    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script> -->
    <!-- <script src="http://cdn.date-fns.org/v1.9.0/date_fns.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.0.0-alpha0/date_fns.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.0.0-alpha0/date_fns.max.js"></script> -->
    <script src="lib/js/date_fns.min.js" type="text/javascript"></script>
    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="https://smtpjs.com/v3/smtp.js"></script>

    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/js/uploaddoc.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="controllers/js/api_project.js" type="text/javascript"></script>
    <script src="controllers/js/api_docuchart.js" type="text/javascript"></script>
    <script src="controllers/js/api_document.js" type="text/javascript"></script>
    <script src="controllers/js/api_account.js" type="text/javascript"></script>
    <script src="controllers/js/api_task.js" type="text/javascript"></script>
    <script src="controllers/js/api_supplier.js" type="text/javascript"></script>
    <script src="controllers/js/api_group.js" type="text/javascript"></script>
    <script src="controllers/js/api_company.js" type="text/javascript"></script>
    <script src="controllers/js/api_department.js" type="text/javascript"></script>
    <script src="controllers/js/api_position.js" type="text/javascript"></script>
    <script src="controllers/js/api_complains.js" type="text/javascript"></script>
    
    <script src="model/classes/class_project.js" type="text/javascript"></script>
    <script src="model/classes/class_account.js" type="text/javascript"></script>
    <script src="model/classes/class_alert.js" type="text/javascript"></script>
    <script src="model/classes/class_task.js" type="text/javascript"></script>
    <script src="model/classes/class_complains.js" type="text/javascript"></script>
    <script src="model/classes/class_document.js" type="text/javascript"></script>
    <script src="model/classes/class_company.js" type="text/javascript"></script>

    <script src="lib/js/project.js" type="text/javascript"></script>
    <script src="lib/js/project_page1.js" type="text/javascript"></script>
    <script src="lib/js/project_page2.js" type="text/javascript"></script>
    <script src="lib/js/alert.js" type="text/javascript"></script>
    <script src="lib/js/complains.js" type="text/javascript"></script>
    <script src="lib/js/proflow.js" type="text/javascript"></script><!-- this should always be at the bottom -->
    <script src="lib/js/docuchat.js" type="text/javascript"></script><!-- this should always be at the bottom -->
</body>
</html>