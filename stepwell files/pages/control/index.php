<html lang="en">
<?php
  include "../../controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/default.css" rel="stylesheet" />
    <link href="lib/css/admin.css" rel="stylesheet" />
    <link href="lib/css/project.css" rel="stylesheet" /> 
    <link href="lib/css/group.css" rel="stylesheet" /> 
    <link href="lib/css/uac.css" rel="stylesheet" /> 
    <link href="lib/css/moduleman.css" rel="stylesheet" /> 
    <link href="lib/css/docbuilder.css" rel="stylesheet" /> 

</head>
<body onload="init()">
    <?php
        include "../../views/bodydefaults.html";
    ?>
   
    <?php
        include "../../views/nav.html";
    ?>
    
    <div id="content">
        <?php
            include "../../views/contentdefaults.html";
        ?>

        <!-- // DASHBOARDS -->
        <div class="dashboard-con hidden nav-maincontainer">
            <div class="nav-content-">
                <h1 class="color-title">Control Dashboard</h1>
                <!-- <div id="dashboard-task-container">
                    <span>Tasks</span>
                </div> -->

                <!-- <fieldset id="dashboard-task-container">
                    <legend>Tasks</legend>
                    
                    <div class="dashboard-task-widget-con">

                    
                    <div class="dashboard-task-widget status-done">
                            <div class="task-title-con">
                                <span class="task-title">Task Title is very Long Super Long</span>
                            </div>
                            <span class="task-dates">2020-09-01 - 2020-09-05</span>
                            <div class="task-icons-con">
                                <i class="fas fa-briefcase" title="Start Working on the Task"></i>
                                <i class="fas fa-check-square" title="Task Done"></i>
                                <i class="fas fa-exclamation-triangle" title="put Task into Dispute"></i>
                                <i class="fas fa-comments" title="Input a message to show to PM"></i>
                                <i class="fas fa-comment-alt" title="Message from PM" ></i>
                            </div>
                        </div>

                        <div class="dashboard-task-widget status-working">
                            <div class="task-title-con">
                                <span class="task-title">Task Title is very Long Super Long</span>
                            </div>
                            <span class="task-dates">2020-09-01 - 2020-09-05</span>
                            <div class="task-icons-con">
                                <i class="fas fa-briefcase" title="Start Working on the Task"></i>
                                <i class="fas fa-check-square" title="Task Done"></i>
                                <i class="fas fa-exclamation-triangle" title="put Task into Dispute"></i>
                                <i class="fas fa-comments" title="Input a message to show to PM"></i>
                                <i class="fas fa-comment-alt" title="Message from PM" ></i>
                            </div>
                        </div>

                        <div class="dashboard-task-widget status-dispute">
                            <div class="task-title-con">
                                <span class="task-title">Task Title is very Long Super Long</span>
                            </div>
                            <span class="task-dates">2020-09-01 - 2020-09-05</span>
                            <div class="task-icons-con">
                                <i class="fas fa-briefcase" title="Start Working on the Task"></i>
                                <i class="fas fa-check-square" title="Task Done"></i>
                                <i class="fas fa-exclamation-triangle" title="put Task into Dispute"></i>
                                <i class="fas fa-comments" title="Input a message to show to PM"></i>
                                <i class="fas fa-comment-alt" title="Message from PM" ></i>
                            </div>
                        </div>
                        
                        <div class="dashboard-task-widget status-done">
                            <div class="task-title-con">
                                <span class="task-title">Task Title is very Long Super Long</span>
                            </div>
                            <span class="task-dates">2020-09-01 - 2020-09-05</span>
                            <div class="task-icons-con">
                                <i class="fas fa-briefcase" title="Start Working on the Task"></i>
                                <i class="fas fa-check-square" title="Task Done"></i>
                                <i class="fas fa-exclamation-triangle" title="put Task into Dispute"></i>
                                <i class="fas fa-comments" title="Input a message to show to PM"></i>
                                <i class="fas fa-comment-alt" title="Message from PM" ></i>
                            </div>
                        </div>

                        <div class="dashboard-task-widget status-working">
                            <div class="task-title-con">
                                <span class="task-title">Task Title is very Long Super Long</span>
                            </div>
                            <span class="task-dates">2020-09-01 - 2020-09-05</span>
                            <div class="task-icons-con">
                                <i class="fas fa-briefcase" title="Start Working on the Task"></i>
                                <i class="fas fa-check-square" title="Task Done"></i>
                                <i class="fas fa-exclamation-triangle" title="put Task into Dispute"></i>
                                <i class="fas fa-comments" title="Input a message to show to PM"></i>
                                <i class="fas fa-comment-alt" title="Message from PM" ></i>
                            </div>
                        </div>

                        <div class="dashboard-task-widget status-dispute">
                            <div class="task-title-con">
                                <span class="task-title">Task Title is very Long Super Long</span>
                            </div>
                            <span class="task-dates">2020-09-01 - 2020-09-05</span>
                            <div class="task-icons-con">
                                <i class="fas fa-briefcase" title="Start Working on the Task"></i>
                                <i class="fas fa-check-square" title="Task Done"></i>
                                <i class="fas fa-exclamation-triangle" title="put Task into Dispute"></i>
                                <i class="fas fa-comments" title="Input a message to show to PM"></i>
                                <i class="fas fa-comment-alt" title="Message from PM" ></i>
                            </div>
                        </div>

                    </div>
                    
                    
                </fieldset> -->

            </div>
        </div>

        <!-- NEW ADMINISTRATION -->
        <div class="administration-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="administration-header">
                    <div class="title color-sc">
                        <span id="administration-header-projectname" class="name">Control</span>
                        <span id="administration-header-projectid" class="id"></span>
                    </div>
                    <div class="administration-panel">
                        <div class="administration-navigation color-sc">
                            <span id="administration-navigation-widget-department" cid="department" class="administration-navigation-widget ">Department</span>
                            <span id="administration-navigation-widget-position" cid="position" class="administration-navigation-widget">Position</span>
                            <span id="administration-navigation-widget-account" cid="account" class="administration-navigation-widget ">Account</span>
                            <span id="administration-navigation-widget-group" cid="group" class="administration-navigation-widget">Project Groups</span>
                            <span id="administration-navigation-widget-system" cid="system" class="administration-navigation-widget">Doc System</span>
                            <span id="administration-navigation-widget-control" cid="control" class="administration-navigation-widget">Access Control</span>
                        </div>
                        <div class="administration-mods">
                            <!-- <i class="fas fa-backspace administration-header-close" ></i> -->

                            <div class="administration-mods-widget hidden btn-shadow">
                                <i class="fas fa-sync-alt" title="Refresh Data"></i>
                                <span id="administration-mods-refresh">Refresh Data</span>
                            </div>

                            <div class="administration-mods-widget btn-shadow">
                                <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                                <span id="administration-mods-dashboard">Dashboard</span>
                            </div>
                            
                            <div class="administration-mods-widget hidden btn-shadow">
                                <i class="fas fa-user-plus" title="Create Group"></i>
                                <span id="administration-mods-create-group">Create Group</span>
                            </div>
                            
                            <div class="administration-mods-widget hidden btn-shadow">
                                <i class="fas fa-user-plus" title="Create Group"></i>
                                <span id="administration-mods-add-project">Add Project to Group</span>
                            </div>

                            <div class="administration-mods-widget hidden btn-shadow">
                                <i class="fas fa-times" title="Go to Dashboard"></i>
                                <span id="administration-mods-close-group">Close Group</span>
                            </div>

                            <div class="administration-mods-widget hidden btn-shadow">
                                <i class="fas fa-user-plus" title="Create Account"></i>
                                <span id="administration-mods-create-account">Create Account</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="administration-body">

                    <div class="administration-body-department hidden administration-body-widget">
                        <!-- <h1 class="color-title">department</h1> -->
                        <div class="department-emailList email-list color-sc">
                            <form action="" id="department-create" class="department-create-tbox-con" autocomplete="off">
                                <input id="department-create-tbox" class="email-list-searchbox" type="text" placeholder="Create Department">
                            </form>
                            <div id="department-list" class="email-list-lister">
                                <span class="btn-shadow department-list-widget">name1@ceis.com</span>
                            </div>
                        </div>
                        <div class="department-update color-sc">
                            <h2>Update and Delete Departments</h2>
                            <input id="department-title-con" type="text" placeholder="Department Name">
                            <br><br><br><br><br>
                            <button id="department-update" class="btn-shadow">Update Department</button>
                            <button id="department-delete" class="btn-shadow">Delete Department</button>
                        </div>
                    </div>

                    <div class="administration-body-position hidden administration-body-widget">
                        <!-- <h1 class="color-title">position</h1> -->
                        <div class="position-emailList email-list color-sc">
                            <form action="" id="position-create" class="position-create-tbox-con" autocomplete="off">
                                <input id="position-create-tbox" class="email-list-searchbox" type="text" placeholder="Create Position">
                                <select id="position-search-department">
                                    <option value="null">All Positions</option>
                                    <option value="na">Unassigned Position</option>
                                    <option value="78134">Information Tech</option>
                                    <option value="32421">Medical Staff</option>
                                    <option>Select Department</option>
                                </select>
                            </form>
                            <div id="position-list" class="email-list-lister">
                                <span class="btn-shadow position-list-widget">name1@ceis.com</span>
                            </div>
                        </div>
                        <div class="position-update color-sc">
                            <h2>Update and Delete Positions</h2>
                            <input id="position-title-con" type="text" placeholder="Position Name">
                            <br>
                            <button id="position-update" class="btn-shadow">Update Position</button>
                            <button id="position-delete" class="btn-shadow">Delete Position</button>

                            <br><br>
                            <div class="position-update-assign">
                                <span>Assign Position to Department</span>
                                <select id="position-assign-department">
                                    <!-- <option value="">Department1</option>
                                    <option>Department1</option>
                                    <option>Department1</option> -->
                                </select>
                                <button id="position-update-department" class="btn-shadow">Assign</button>
                            </div>
                        </div>
                    </div>

                    <div class="administration-body-account hidden administration-body-widget">
                        <!-- <h1 class="color-title">account</h1> -->
                        <div class="suuser-emailList email-list suuser-sc color-sc">
                            <input class="admin-emailList-searchbox" type="text" placeholder="Search Email">
                            <select id="suuser-search-userlevel">
                                <option value="na">All Users</option>
                                <option value="1">Admin</option>
                                <option value="2">Super User</option>
                                <option value="3">User</option>
                            </select>
                            <div id="suuser-search-list" class="email-list-lister">
                                <span class="btn-shadow">name1@ceis.com</span>
                                <span class="btn-shadow">name2@ceis.com</span>
                                <span class="btn-shadow">name3@ceis.com</span>
                                <span class="btn-shadow">name4@ceis.com</span>
                                <span class="btn-shadow">name5@ceis.com</span>
                                <span class="btn-shadow">name6@ceis.com</span>
                                <span class="btn-shadow">name7@ceis.com</span>
                            </div>
                        </div>
                        <div class="suuser-userprofile suuser-sc hidden color-sc">
                            <h1 style="text-align: center; text-shadow: 2px 2px #000000;">View Update Delete<br>Users within Company</h1>
                            <span id="suuser-view-id">CEO-00000</span>
                            <div>
                                
                            </div>
                            <div class="suuser-userprofile-widget-dual">
                                <div class="suuser-userprofile-widget">
                                    <span>Firstname</span>
                                    <input id="suuser-view-firstname" type="text" placeholder="Firstname" >
                                </div>
                                <div class="suuser-userprofile-widget">
                                    <span>Lastname</span>
                                    <input id="suuser-view-lastname" type="text" placeholder="Lastname" >
                                </div>
                            </div>
                            <div class="suuser-userprofile-widget-dual">
                                <div class="suuser-userprofile-widget">
                                    <span>Birthdate</span>
                                    <input id="suuser-view-birthdate" type="date" min="1950-01-01" max="2020-01-01" placeholder="Birthdate" >
                                </div>
                                <div class="suuser-userprofile-widget">
                                    <span>Phone Number</span>
                                    <input id="suuser-view-phone" type="text" placeholder="Phone Number" >
                                </div>
                            </div>

                            <div class="suuser-userprofile-widget">
                                <span>Email Address</span>
                                <input id="suuser-view-email" type="text" placeholder="Email Address" >
                            </div>

                            <div class="suuser-userprofile-widget-dual">
                                <div class="suuser-userprofile-widget">
                                    <span>Department</span>
                                    <select id="suuser-view-department">
                                        <!-- <option>Department1</option>
                                        <option>Department2</option>
                                        <option>Department3</option>
                                        <option>Department4</option> -->
                                    </select>
                                </div>
                                <div class="suuser-userprofile-widget">
                                    <span>Position</span>
                                    <select id="suuser-view-position">
                                        <!-- <option>Position1</option>
                                        <option>Position2</option>
                                        <option>Position3</option>
                                        <option>Position4</option> -->
                                    </select>
                                </div>
                            </div>

                            <div class="suuser-userprofile-widget">
                                <span>User Level</span>
                                <select id="suuser-view-userlevel">
                                    <option value="1" disabled>Admin</option>
                                    <option value="2">Super User</option>
                                    <option value="3">User</option>
                                </select>
                            </div>

                            <div class="suuser-userprofile-widget">
                                <span>Supervisor</span>
                                <select id="suuser-view-supervisor">
                                    <option value="1">Name 1</option>
                                    <option value="2">Name 2</option>
                                    <option value="3">Name 3</option>
                                </select>
                            </div>

                            <div class="suuser-userprofile-footer">
                                <!-- <button id="suuser-create-user-new" class="btn-shadow hidden">Create User</button> -->
                                <button id="suuser-profile-update" class="btn-shadow">Update Information</button>
                                <button id="suuser-profile-reset-password" class="btn-shadow">Reset Password</button>
                                <button id="suuser-profile-reset-photo" class="btn-shadow">Reset Profile Picture</button>
                                <!-- <button id="suuser-btn-create" class="btn-shadow">Create User</button> -->
                                <button id="suuser-profile-delete" class="btn-shadow">Delete User</button>
                            </div>
                        </div>

                        <div id="account-create-container" class="suuser-createprofile color-sc hidden">
                            <i id="account-create-container-close" class="fas fa-times"></i>
                            <h1 style="text-align: center; text-shadow: 2px 2px #000000;">Create Users<br>within Company</h1>
                            <span id="suuser-create-id">CEO-00000</span>
                                <span id="conf-report">Please Provide a Valid Email</span>

                            <div class="suuser-userprofile-widget-dual">
                                <div class="suuser-userprofile-widget">
                                    <span>Firstname</span>
                                    <input id="suuser-create-firstname" type="text" placeholder="Firstname" >
                                </div>
                                <div class="suuser-userprofile-widget">
                                    <span>Lastname</span>
                                    <input id="suuser-create-lastname" type="text" placeholder="Lastname" >
                                </div>
                            </div>
                            <div class="suuser-userprofile-widget-dual">
                                <div class="suuser-userprofile-widget">
                                    <span>Birthdate</span>
                                    <input id="suuser-create-birthdate" type="date" min="1950-01-01" max="2020-01-01" placeholder="Birthdate" >
                                </div>
                                <div class="suuser-userprofile-widget">
                                    <span>Phone Number</span>
                                    <input id="suuser-create-phone" type="text" placeholder="Phone Number" >
                                </div>
                            </div>
                            <div class="suuser-userprofile-widget">
                                <span>Email Address</span>
                                <input id="suuser-create-email" type="text" placeholder="Email Address" >
                            </div>
                            <div class="suuser-userprofile-widget-dual">
                                <div class="suuser-userprofile-widget">
                                    <span>Department</span>
                                    <select id="suuser-create-department">
                                        <!-- <option value="id">Department Title</option> -->
                                    </select>
                                </div>
                                <div class="suuser-userprofile-widget">
                                    <span>Position</span>
                                    <select id="suuser-create-position">
                                        <!-- <option value="id">Position Title</option> -->
                                    </select>
                                </div>
                            </div>
                            <div class="suuser-userprofile-widget">
                                <span>User Level</span>
                                <select id="suuser-create-userlevel">
                                    <option value="1">Admin</option>
                                    <option value="2">Super User</option>
                                    <option value="3">User</option>
                                </select>
                            </div>
                            <div class="suuser-userprofile-widget">
                                <span>Assign Supervisor</span>
                                <select id="suuser-create-supervisor">
                                    <option value="1">Name 1</option>
                                    <option value="1">Name 2</option>
                                    <option value="1">Name 3</option>
                                    <option value="1">Name 4</option>
                                </select>
                            </div>
                            <div class="suuser-userprofile-widget">
                                <span>Password</span>
                                <input id="suuser-create-password" type="password" placeholder="Password" >
                            </div>
                            <div class="suuser-userprofile-widget conf-password">
                                <span>Confirm Password</span>
                                <input id="suuser-create-conf-password" type="password" placeholder="Password Confirmation" >
                            </div>
                            <span id="conf-password-report">Passwords Do Not Match</span>

                            <div class="suuser-userprofile-footer">
                                <button id="suuser-btn-generate-password" class="btn-shadow">Generate Random Password</button>
                                <button id="suuser-btn-generate-id" class="btn-shadow">Generate Random ID</button>
                                <button id="suuser-create-confirm" class="btn-shadow">Confirm Create User</button>
                            </div>
                        </div>
                    </div>

                    <div class="administration-body-group hidden administration-body-widget">
                        <!-- <h1 class="color-title">group</h1> -->
                        <div class="group-manage-list-con color-sc groups-con">
                            <input id="group-manage-search" type="text" placeholder="Search Groups">
                            <div id="group-manage-list" class="group-manage-list">
                                <span class="group-manage-list-widget btn-shadow">G-123456789</span>
                                <span class="group-manage-list-widget btn-shadow">G-123456789</span>
                                <span class="group-manage-list-widget btn-shadow">G-123456789</span>
                                <span class="group-manage-list-widget btn-shadow">G-123456789</span>
                            </div>
                        </div>
                        <div class="group-manage-view-content hidden groups-con">
                            <div class="group-create-widget-con hidden color-sc">
                                <h2>Create a new Group</h2>
                                <input id="groups-create-id" type="text" placeholder="Group Id" disabled>
                                <input id="groups-create-name"  type="text" placeholder="Group Name">
                                <div class="group-create-widget-footer">
                                    <button id="group-create-rngid" class="btn-shadow">Generate Random Group ID</button>
                                    <button id="group-create-submit" class="btn-shadow">Create Project Group</button>
                                </div>
                            </div>
                            <div class="group-manage-view-con hidden color-sc">
                                <div class="group-view-owner">
                                    <img id="group-view-ownerphoto" src="lib/images/avatardefault.png">
                                    <span id="group-view-ownername">Owners Name</span>
                                </div>
                                <span id="group-view-name">Group Name</span>
                                <div class="group-view-id-con">
                                    <span id="group-view-id">G-123456789</span>
                                    <i id="group-view-id-copy" class="fas fa-clipboard"></i>
                                </div>
                                <button id="group-view-launch" class="btn-shadow">View Your Group<i class="fas fa-caret-right"></i></button>
                            </div>
                            <div class="group-manage-connect-con hidden color-sc">
                                <span id="group-connect-title">Add Projects to Group</span>
                                <div id="group-connect-search-con" class="group-sameline">
                                    <input id="group-connect-search-id" type="text" placeholder="Enter Project Name or ID">
                                    <button id="group-connect-search" class="btn-shadow">Search</button>
                                </div>
                                <div class="group-connect-search-list">
                                    <select name="" id="group-connect-search-select">
                                        <option value="">Test 1</option>
                                        <option value="">Test 2</option>
                                    </select>
                                    <button id="group-connect-submitzz" class="btn-shadow">Connect</button>
                                </div>
                            </div>
                        </div>
                        <div class="group-launch-list-con hidden color-sc groups-launch-con">
                            <input id="group-launch-search" type="text" placeholder="Search Group Members">
                            <div id="group-launch-list" class="group-launch-list">
                                <span class="group-launch-list-widget btn-shadow">Name Lastname 1</span>
                                <span class="group-launch-list-widget btn-shadow">Name Lastname 2</span>
                                <span class="group-launch-list-widget btn-shadow">Name Lastname 3</span>
                                <span class="group-launch-list-widget btn-shadow">Name Lastname 4</span>
                            </div>
                        </div>
                        <div class="group-launch-view-content hidden groups-launch-con">
                            <div class="group-launch-delete-con color-sc">
                                <h2>Permanently Delete Group</h2>
                                <span id="group-launch-delete-name">GroupName</span>
                                <span id="group-launch-delete-id">G-000000000</span>
                                <br>
                                <span>This Action Cannot be Undone</span>
                                <button id="group-launch-delete-confirm" class="btn-shadow">Confirm Action</button>
                            </div>
                            <div class="group-launch-remove-con color-sc">
                                <h2 class="group-launch-remove-title">Permanently Remove Group Member</h2>
                                <div class="group-launch-member">
                                    <img id="group-launch-memberphoto" src="lib/images/avatardefault.png">
                                    <span id="group-launch-membername">Owners Name</span>
                                </div>
                                <button id="group-launch-remove-member" class="btn-shadow">Remove</button>
                            </div>
                        </div>

                        <div class="group-manage-view-projects groups-con-pr hidden">
                            <div class="group-manage-view-projects-widget">
                                <span class="projectname">The 100 Tribu Del Cato</span>
                                <span class="status">PENDING</span>
                                <span class="projectid">P-9876865765</span>
                                <span class="owner">Bellamy Blake</span>
                                <div class="action">
                                    <button class="group-manage-view-projects-widget-reject btn-shadow">Reject</button>
                                    <button class="group-manage-view-projects-widget-approve btn-shadow">Approve</button>
                                </div>
                            </div>
                        </div>

                        <div class="group-manage-add-project groups-con-pr hidden">
                            <div class="form">
                                <i id="group-manage-add-project-close" class="fas fa-times-circle"></i>
                                <span class="legend">Filter</span>
                                <input id="group-manage-add-project-filter" type="text">
                                <span class="legend">Select Project</span>
                                <select name="" id="group-manage-add-project-projectid">
                                    <option value="">Project 1</option>
                                    <option value="">Project 2</option>
                                    <option value="">Project 3</option>
                                </select>
                                <button id="group-manage-add-project-submit" class="btn-shadow">Request to Add Project</button>
                            </div>
                        </div>


                    </div>

                    <div class="administration-body-system hidden administration-body-widget-">
                        <!-- <h1 class="color-title">system</h1> -->
                        <div class="define-con-header">
                            <button id="define-header-widget1" class="btn-shadow">Category1</button>
                            <button id="define-header-widget2" class="btn-shadow">Category2</button>
                            <button id="define-header-widget3" class="btn-shadow">Category3</button>
                            <button id="define-header-widget4" class="btn-shadow">Category4</button>
                        </div>
                        <div class="catlist color-sc">
                            <span>Category 1</span>
                            <div class="catlist-widget-form">
                                <div id="catlist1" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">1</span>
                                    <input type="text" placeholder="Sub Category 1" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist2" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">2</span>
                                    <input type="text" placeholder="Sub Category 2" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist3" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">3</span>
                                    <input type="text" placeholder="Sub Category 3" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist4" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">4</span>
                                    <input type="text" placeholder="Sub Category 4" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist5" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">5</span>
                                    <input type="text" placeholder="Sub Category 5" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist6" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">6</span>
                                    <input type="text" placeholder="Sub Category 6" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist7" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">7</span>
                                    <input type="text" placeholder="Sub Category 7" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist8" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">8</span>
                                    <input type="text" placeholder="Sub Category 8" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                                <div id="catlist9" class="catlist-widget-con">
                                    <span class="btn-shadow catlist-widget-num">9</span>
                                    <input type="text" placeholder="Sub Category 9" >
                                    <button class="btn-shadow catlist-widget-update">insert</button>
                                    <i class="fas fa-trash catlist-widget-delete font-color-red"></i>
                                </div>
                            </div>
                            <br>
                        </div>
                    </div>

                    <div class="administration-body-control hidden administration-body-widget">
                        <!-- <h1 class="color-title">control</h1> -->
                        <div class="uac-user-list color-sc">
                            <input type="text" placeholder="Search Users">
                            <div class="uac-user-widget-con">
                                <!-- <span class="uac-user-widget btn-shadow">User 1</span>
                                <span class="uac-user-widget btn-shadow">User 2</span>
                                <span class="uac-user-widget btn-shadow">User 3</span>
                                <span class="uac-user-widget btn-shadow">User 4</span> -->
                            </div>
                        </div>
                        <div class="uac-user-modules btn-shadow">
                            <h4 id="uac-user-modules-title">Please Select a User</h4>
                            <span>Double Click to Remove Modules</span>
                            <div class="uac-user-modules-widget-con">
                                <!-- <span ui="nav-modules-docbuilderzz" class="uac-user-modules-widget btn-shadow">Module 1</span>
                                <span ui="m2test" class="uac-user-modules-widget btn-shadow">Module 2</span>
                                <span ui="nav-modules-docbuilder" class="uac-user-modules-widget btn-shadow">Module 3</span>
                                <span ui="m4test" class="uac-user-modules-widget btn-shadow">Module 4</span>
                                <span ui="m5test" class="uac-user-modules-widget btn-shadow">Module 5</span> -->
                            </div>
                        </div>
                        <div class="uac-module-list color-sc">
                            <h4>Drag and Drop Modules to the left</h4>
                            <div class="uac-module-list-widget-con">
                                <!-- <span class="uac-module-list-widget btn-shadow">Module 1</span>
                                <span class="uac-module-list-widget btn-shadow">Module 1</span>
                                <span class="uac-module-list-widget btn-shadow">Module 1</span>
                                <span class="uac-module-list-widget btn-shadow">Module 1</span>
                                <span class="uac-module-list-widget btn-shadow">Module 1</span> -->
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>


        


        <!-- //SUPER ADMIN STUFF -->
        <div class="company-create-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="admincontrol-ui-header">
                    <div class="title color-sc">
                        <span id="admincontrol-ui-header-projectname" class="name">Company</span>
                        <span id="admincontrol-ui-header-projectid" class="id"></span>
                    </div>
                    <div class="admincontrol-ui-panel">
                        <div class="admincontrol-ui-navigation color-sc">
                            <span cid="create-company" class="admincontrol-ui-navigation-widget">Manage Company</span>
                            <span cid="license" class="admincontrol-ui-navigation-widget ">Company License</span>
                            <span cid="modules" class="admincontrol-ui-navigation-widget">Company Modules</span>
                            <span cid="admins" class="admincontrol-ui-navigation-widget ">Company Admins</span>
                            <span cid="request" class="admincontrol-ui-navigation-widget ">Company Create Request</span>
                        </div>
                        <div class="admincontrol-ui-mods">
                            <!-- <i class="fas fa-backspace admincontrol-ui-header-close" ></i> -->

                            <div class="admincontrol-ui-mods-widget  btn-shadow">
                                <i class="fas fa-sync-alt" title="Refresh Data"></i>
                                <span id="admincontrol-ui-mods-refresh">Refresh Data</span>
                            </div>

                            <div class="admincontrol-ui-mods-widget btn-shadow">
                                <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                                <span id="admincontrol-ui-mods-dashboard">Dashboard</span>
                            </div>
                            
                            <div class="admincontrol-ui-mods-widget hidden btn-shadow">
                                <i class="fas fa-user-plus" title="Create Company"></i>
                                <span id="admincontrol-ui-mods-create-company">Create Company</span>
                            </div>
                            
                            <div class="admincontrol-ui-mods-widget hidden btn-shadow">
                                <i class="fas fa-user-plus" title="Create Admin Account"></i>
                                <span id="admincontrol-ui-mods-create-admin">Create Admin Account</span>
                            </div>
                            
                            <div class="admincontrol-ui-mods-widget  btn-shadow">
                                <i class="fas fa-server" title="Go to Server Website"></i>
                                <span id="admincontrol-ui-mods-create-server" ><a target="_blank" href="https://a2nwvpweb116.shr.prod.iad2.secureserver.net:8443/login">Go to Server</a></span>
                            </div>

                            

                        </div>
                    </div>
                </div>

                <div class="admincontrol-ui-body">
                    <div class="admincontrol-ui-body-modules hidden admincontrol-ui-body-widget">
                        <div id="moduleman-wrapper" class="nav-content">
                            <!-- <h2 class="color-title">Module Manager</h2> -->
                            <div class="moduleman-company-list color-sc">
                                <input type="text" placeholder="Search Company">
                                <div class="moduleman-company-widget-con">
                                    <span class="moduleman-company-widget btn-shadow">Company 1</span>
                                    <span class="moduleman-company-widget btn-shadow">Company 1</span>
                                    <span class="moduleman-company-widget btn-shadow">Company 1</span>
                                    <span class="moduleman-company-widget btn-shadow">Company 1</span>
                                </div>
                            </div>
                            <div class="moduleman-company-modules color-sc">
                                <h4 id="moduleman-company-modules-title">Active Modules of Company</h4>
                                <span>Double Click to Remove Modules</span>
                                <div class="moduleman-company-modules-widget-con">
                                    <span ui="nav-modules-docbuilderzz" class="moduleman-company-modules-widget btn-shadow">Module 1</span>
                                    <span ui="m2test" class="moduleman-company-modules-widget btn-shadow">Module 2</span>
                                    <span ui="m4test" class="moduleman-company-modules-widget btn-shadow">Module 4</span>
                                    <span ui="m5test" class="moduleman-company-modules-widget btn-shadow">Module 5</span>
                                </div>
                            </div>
                            <div class="moduleman-module-list color-sc">
                                <h4>Drag and Drop Modules to the left</h4>
                                <div class="moduleman-module-list-widget-con ">
                                    <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                                    <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                                    <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                                    <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                                    <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="admincontrol-ui-body-admins hidden admincontrol-ui-body-widget">
                        <div id="admincontrol-ui-admin-wrapper" class="nav-content">
                            <div class="admincontrol-ui-admin-list color-sc">
                                <input type="text" placeholder="Search Company">
                                <div class="admincontrol-ui-admin-widget-con">
                                    <span class="admincontrol-ui-admin-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-admin-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-admin-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-admin-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-admin-widget btn-shadow">Company 1</span>
                                </div>
                            </div>
                            <div class="admincontrol-ui-admin-manage hidden color-sc">
                                <span id="admincontrol-ui-admin-company-title"><b>Company Name</b></span>
                                <span>Admin Account List</span>
                                <div class="admincontrol-ui-admin-manage-widget-con">
                                    <span class="admincontrol-ui-admin-manage-widget btn-shadow">Company 1 <i class="fas fa-trash"></i></span>
                                    <span class="admincontrol-ui-admin-manage-widget btn-shadow">Company 1 <i class="fas fa-trash"></i></span>
                                    <span class="admincontrol-ui-admin-manage-widget btn-shadow">Company 1 <i class="fas fa-trash"></i></span>
                                    <span class="admincontrol-ui-admin-manage-widget btn-shadow">Company 1 <i class="fas fa-trash"></i></span>
                                    <span class="admincontrol-ui-admin-manage-widget btn-shadow">Company 1 <i class="fas fa-trash"></i></span>
                                </div>
                            </div>
                            <div class="admincontrol-ui-admin-create hidden color-sc">
                                <span id="admincontrol-ui-admin-create-title"><b>Stepwell Inc</b></span>
                                <span>Create Admin Account</span>
                                <input id="admincontrol-ui-admin-create-comid" type="text" placeholder="Company ID" disabled>
                                <input id="admincontrol-ui-admin-create-accid" type="text" placeholder="Account ID" disabled>
                                <input id="admincontrol-ui-admin-create-fname" type="text" placeholder="Firstname">
                                <input id="admincontrol-ui-admin-create-lname" type="text" placeholder="Lastname">
                                <input id="admincontrol-ui-admin-create-email" type="text" placeholder="Email">
                                <input id="admincontrol-ui-admin-create-pword" type="password" placeholder="Password">
                                <button onclick="$('#admincontrol-ui-admin-create-accid').val(rngId(1))" class="btn-shadow">Generate Random Account ID</button>
                                <button onclick="$('#admincontrol-ui-admin-create-pword').val(rngPassword())" class="btn-shadow">Generate Random Password</button>
                                <button id="admincontrol-ui-admin-create-submit" class="btn-shadow">Create Admin Account</button>
                                
                            </div>
                        </div>
                    </div>
                    <div class="admincontrol-ui-body-license hidden admincontrol-ui-body-widget">
                        <div id="admincontrol-ui-license-wrapper" class="nav-content">
                            <div class="admincontrol-ui-license-list color-sc">
                                <input type="text" placeholder="Search Company">
                                <div class="admincontrol-ui-license-widget-con">
                                    <span class="admincontrol-ui-license-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-license-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-license-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-license-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-license-widget btn-shadow">Company 1</span>
                                </div>
                            </div>
                            <div class="admincontrol-ui-license-current color-sc">

                                <div class="admincontrol-ui-license-current-key">
                                    <div class="details">
                                        <span class="">Jn45Fas74Sas &bull; 6 Months &bull; Pro Flow </span>
                                        <span class="">2020-03-23 &bull; 2021-03-23</span>
                                    </div>
                                    <div class="action">
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </div>

                            </div>
                            <div class="admincontrol-ui-license-add color-sc ">
                                <span>ADD LICENSE to Company1</span>
                                <div class="form">
                                    <input id="admincontrol-ui-license-add-key" type="text" placeholder="Paste License Here">
                                    <button id="admincontrol-ui-license-add-submit">Confirm</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="admincontrol-ui-body-create-company hidden admincontrol-ui-body-widget">
                        <div id="admincontrol-ui-ccreate-wrapper" class="nav-content">
                            <div class="admincontrol-ui-ccreate-list color-sc">
                                <input type="text" placeholder="Search Company">
                                <div class="admincontrol-ui-ccreate-widget-con">
                                    <span class="admincontrol-ui-ccreate-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-ccreate-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-ccreate-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-ccreate-widget btn-shadow">Company 1</span>
                                    <span class="admincontrol-ui-ccreate-widget btn-shadow">Company 1</span>
                                </div>
                            </div>
                            <div class="admincontrol-ui-ccreate-update  color-sc">
                                <span id="admincontrol-ui-ccreate-update-comname" class="comname">Stepwell Inc</span>
                                <img src="lib/images/companydefault.png" alt="">
                                <div class="info">
                                    <span class="label">ID: </span>
                                    <b><span id="admincontrol-ui-ccreate-update-comid">C-87687686754</span></b>
                                </div>
                                <div class="info">
                                    <span class="label">DBID: </span>
                                    <b><span id="admincontrol-ui-ccreate-update-dtid">kg6a0Ts<i id="admincontrol-ui-ccreate-create-copy" dtid="kg6a0Ts" class="fas fa-clipboard"></i></span></b>
                                </div>
                                <div class="info">
                                    <span class="label">Status: </span>
                                    <b><span id="admincontrol-ui-ccreate-update-stat">active<i status="active" comid="C-987987789897" id="admincontrol-ui-ccreate-create-update" class="fas fa-toggle-on"></i></span></b>
                                </div>
                                
                            </div>
                            <div class="admincontrol-ui-ccreate-create hidden color-sc">
                                <span>Create Company</span>
                                <input id="admincontrol-ui-ccreate-create-comid" type="text" placeholder="Company ID" disabled>
                                <input id="admincontrol-ui-ccreate-create-dtid" type="text" placeholder="Database ID" disabled>
                                <input id="admincontrol-ui-ccreate-create-name" type="text" placeholder="Company Name">
                                <button onclick="$('#admincontrol-ui-ccreate-create-comid').val(rngCompanyId())" class="btn-shadow">Generate Random Company ID</button>
                                <button onclick="$('#admincontrol-ui-ccreate-create-dtid').val(rngDatabaseId())" class="btn-shadow">Generate Random Database ID</button>
                                <button id="admincontrol-ui-ccreate-create-submit" class="btn-shadow">Create Company</button>
                            </div>
                        </div>
                    </div>
                    <div class="admincontrol-ui-body-request hidden admincontrol-ui-body-widget">
                        <div class="admincontrol-request-widget-con">
                            <div class="widget">
                                <span class="title">s42.xmas@gmail.com</span>
                                <span class="company">C-875465768 &bull; Kamisato Inc</span>
                                <div class="lickeys">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="license-create-con hidden nav-maincontainer">
            <div class="nav-content license-create-body">
                <div class="license-create-module-list">
                    <span class="license-create-module-list-widget" mui="proflow" >Pro Flow</span>
                    <span class="license-create-module-list-widget" mui="proflow" >Pro Flow</span>
                    <span class="license-create-module-list-widget" mui="proflow" >Pro Flow</span>
                    <span class="license-create-module-list-widget" mui="proflow" >Pro Flow</span>
                    <span class="license-create-module-list-widget" mui="proflow" >Pro Flow</span>
                    <span class="license-create-module-list-widget" mui="proflow" >Pro Flow</span>
                </div>
                <div class="license-create-form">
                    <span class="title">LICENSE CREATION TAB</span>
                    <span mui="proflow" class="modulename">Pro Flow</span>
                    <span class="durationtext">Duration</span>
                    <div class="duration">
                        <span class="active license-create-form-duration">1 Month</span>
                        <span class="license-create-form-duration">6 Months</span>
                        <span class="license-create-form-duration">1 Year</span>
                        <span class="license-create-form-duration">2 Year</span>
                    </div>
                    <div class="bottom">
                        <br><br>
                        <span class="license-title">Pro Flow Free Trial Subscription</span>
                        <br>
                        <ul>
                            <li>1 Free Admin Account</li>
                            <li>2 Projects</li>
                            <li>200Mb Storage</li>
                            <li>Limited Basic Support</li>
                        </ul>
                        <br><br>
                        <span class="price">$99<span class="subprice">.99</span> </span>
                        <br><br>
                        <button class="submit">Create License</button>
                    </div>
                </div>
                <div class="license-create-list">
                    <span class="title">License List</span>
                    <div class="license-create-list-widget-con">
                        
                        <div class="license-create-list-widget">
                            <i status="closed" class="license-create-list-widget-toggle fas fa-eye"></i>
                            <span class="companyname">Pro Flow Priyanka Chopani is the best</span>
                            <span class="modulename">1 Month &bull; Pro Flow</span>
                            <span class="modulename">6 Month &bull; Doc Builder</span>
                            <div class="admincontrol-ui-license-current ">

                                <div class="license-create-list-widget-current-key">
                                    <div class="details">
                                        <span class="">Jn45Fas74Sas &bull; 6M &bull; proflow </span>
                                        <span class="">2020-03-23 &bull; 2021-03-23</span>
                                    </div>
                                    <div class="action">
                                        <i class="fas fa-clipboard"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="license-create-list-widget-current-key">
                                    <div class="details">
                                        <span class="">Jn45Fas74Sas &bull; 6M &bull; proflow </span>
                                        <span class="">2020-03-23 &bull; 2021-03-23</span>
                                    </div>
                                    <div class="action">
                                        <i class="fas fa-clipboard"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="license-create-list-widget-current-key">
                                    <div class="details">
                                        <span class="">Jn45Fas74Sas &bull; 6M &bull; proflow </span>
                                        <span class="">2020-03-23 &bull; 2021-03-23</span>
                                    </div>
                                    <div class="action">
                                        <i class="fas fa-clipboard"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="moduleman-con hidden nav-maincontainer">
            <div id="moduleman-wrapper" class="nav-content">
                <!-- <h2 class="color-title">Module Manager</h2> -->
                <div class="moduleman-company-list color-sc">
                    <input type="text" placeholder="Search Company">
                    <div class="moduleman-company-widget-con">
                        <span class="moduleman-company-widget btn-shadow">Company 1</span>
                        <span class="moduleman-company-widget btn-shadow">Company 1</span>
                        <span class="moduleman-company-widget btn-shadow">Company 1</span>
                        <span class="moduleman-company-widget btn-shadow">Company 1</span>
                    </div>
                </div>
                <div class="moduleman-company-modules color-sc">
                    <h4 id="moduleman-company-modules-title">Active Modules of Company</h4>
                    <span>Double Click to Remove Modules</span>
                    <div class="moduleman-company-modules-widget-con">
                        <span ui="nav-modules-docbuilderzz" class="moduleman-company-modules-widget btn-shadow">Module 1</span>
                        <span ui="m2test" class="moduleman-company-modules-widget btn-shadow">Module 2</span>
                        <!-- <span ui="nav-modules-docbuilder" class="moduleman-company-modules-widget btn-shadow">Module 3</span> -->
                        <span ui="m4test" class="moduleman-company-modules-widget btn-shadow">Module 4</span>
                        <span ui="m5test" class="moduleman-company-modules-widget btn-shadow">Module 5</span>
                    </div>
                </div>
                <div class="moduleman-module-list color-sc">
                    <h4>Drag and Drop Modules to the left</h4>
                    <div class="moduleman-module-list-widget-con">
                        <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                        <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                        <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                        <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                        <span class="moduleman-module-list-widget btn-shadow">Module 1</span>
                    </div>
                </div>
            </div>

            <!-- i think this is it -->
        </div>
        <div class="complain-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="admincontrol-ui-header">
                    <div class="title color-sc">
                        <span id="admincontrol-ui-header-projectname" class="name">Complains</span>
                        <span id="admincontrol-ui-header-projectid" class="id"></span>
                    </div>
                    <div class="admincontrol-ui-panel">
                        <div class="admincontrol-ui-navigation color-sc">
                            <span cid="complain-manage" class="admincontrol-ui-navigation-widget">Manage Complains</span>
                            <!-- <span cid="complain-archived" class="admincontrol-ui-navigation-widget ">Archived Complains</span> -->
                        </div>
                        <div class="admincontrol-ui-mods">
                            <!-- <i class="fas fa-backspace admincontrol-ui-header-close" ></i> -->

                            <div class="admincontrol-ui-mods-widget  btn-shadow">
                                <i class="fas fa-sync-alt" title="Refresh Data"></i>
                                <span id="admincontrol-ui-mods-compfresh">Refresh Data</span>
                            </div>

                            <div class="admincontrol-ui-mods-widget btn-shadow">
                                <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                                <span id="admincontrol-ui-mods-dashboard">Dashboard</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="admincontrol-ui-body">

                    <div class="admincontrol-ui-body-complain-manage hidden admincontrol-ui-body-widget">
                        <div class="nav-content complain-manage-body">
                            <div class="complain-manage-widget-con">

                                <div class="complain-manage-widget">
                                    <span>Stark Industries &nbsp;&bull;&nbsp; Jason</span>
                                    <span>technical &nbsp;&bull;&nbsp; 2020-17-12 24:00:00</span>
                                </div>

                            </div>
                            <div class="complain-details-widget-con">
                                <div class="sender">
                                    <span>Stark Industries</span>
                                    <span>Tony Stark</span>
                                </div>
                                <span class="info">technical &nbsp;&bull;&nbsp; 2020-17-12 24:00:00</span>
                                <span class="context">Message</span>
                                <span class="message">
                                    this is  aakj hlkah kjhasdkjh aksdal ksjlaksh asjk kjas hdkljas diqwd had ilugas8dt akdg ialdlia liasudy liau liasu dilasy dliuasyd
                                </span>
                                <hr>
                                <textarea name="" id="" class="reply" maxlength="500" placeholder="Maximum 500 Characters"></textarea>
                                <button class="submit">Send a Reply</button>
                                <button class="archive">Archive Ticket</button>
                            </div>
                        </div>
                    </div>
                    <div class="admincontrol-ui-body-complain-archived hidden admincontrol-ui-body-widget">
                        <div class="nav-content">
                            <span>ARCHIVED COMPLAIN</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div class="other-con hidden nav-maincontainer">
            <div class="nav-content">
                <h2 class="color-title">Other Functions</h2>
            </div>
        </div>
        <div class="webmsg-con hidden nav-maincontainer">
            <div class="nav-content webmsg-container">
                <div id="webmsg-envelope-list" class="webmsg-list">
                    <span class="webmsg-list-widget active unread">s42.email@gmail.com<i class="fas fa-circle"></i></span>
                    <span class="webmsg-list-widget unread">s42.email@gmail.com<i class="fas fa-circle"></i></span>
                    <span class="webmsg-list-widget read">s42.email@gmail.com<i class="fas fa-circle"></i></span>
                    <span class="webmsg-list-widget read">s42.email@gmail.com<i class="fas fa-circle"></i></span>
                </div>
                <div class="webmsg-chatbox-con">
                    <div id="webmsg-envelope-chatbox" class="chatbox">
                        
                        <div class="widget user">
                            <i class="fas fa-user"></i>
                            <span>Hello there!</span>
                            <span>I'd Like to inquire about Pro Flow!</span>
                            <span class="timestamp">2020-04-08 17:04:00</span>
                        </div>
                        <div class="widget system">
                            <i class="fas fa-user-astronaut"></i>
                            <span>Hi Tony, Proflow Manuals and Materials are on the Website. Please Navigate to <a href="">Set Up Guide</a> Section. If you need more assistance please dont hesitate to contact us further. Thank you.</span>
                            <span class="timestamp">2020-04-08 17:04:00</span>
                        </div>    
                        <div class="widget system">
                            <i class="fas fa-user-astronaut"></i>
                            <span>Hi Tony, Proflow Manuals and Materials</span>
                            <span class="timestamp">2020-04-08 17:04:00</span>
                        </div>    

                    </div>
                    <textarea id="webmsg-envelope-message" name="" id="" placeholder="Maximum Length 500. You May include links and special buttons" title="Only Letters, Numbers and thse characters .,?!@() are allowed"></textarea>
                    <button owner="" id="webmsg-envelope-submit" class="default-button">Send Message<i class="fab fa-telegram-plane"></i></button>
                </div>
            </div>
        </div>

        
        <!-- FROM DOCBUILDER -->
        <div  class="docsys-con hidden nav-maincontainer">
            <div class="nav-content-">
                <!-- Now in DOCSYS <h1 class="color-title">Define Document</h1> -->
                


            </div>
        </div><!-- define document from doc builder -->
        <div class="document-bank-con hidden nav-maincontainer">
            <div class="documents-content">
                <div class="documents-header color-sc">
                    <div class="documents-header-category">
                        <select id="documents-header-category-select1" cat="cat1" class="documents-header-category-select">
                            <option>Cat1</option>
                            <option>Cat2</option>
                            <option>Cat1</option>
                        </select>
                        <select id="documents-header-category-select2" cat="cat2" class="documents-header-category-select">
                            <option>Cat1</option>
                            <option>Cat2</option>
                            <option>Cat1</option>
                        </select>
                        <select id="documents-header-category-select3" cat="cat3" class="documents-header-category-select">
                            <option>Cat1</option>
                            <option>Cat2</option>
                            <option>Cat1</option>
                        </select>
                        <select id="documents-header-category-select4" cat="cat4" class="documents-header-category-select">
                            <option>Cat1</option>
                            <option>Cat2</option>
                            <option>Cat1</option>
                        </select>
                    </div>
                    <button class="documents-header-category-btn btn-shadow">Search By Category</button>
                    <div class="documents-header-category-options">
                        <input type="radio" name="category-options" id="documents-header-category-options-single">
                        <label class="color-font" for="documents-header-category-options-single">Search By Single Category</label>
                        <input type="radio" name="category-options" id="documents-header-category-options-multi" checked>
                        <label class="color-font" for="documents-header-category-options-multi">Search By Category Combination</label>
                    </div>
                </div>
                <div class="documents-body">
                    <div id="documents-list-advanced-search-con">
                        <div class="advanced-search-con color-sc btn-shadow">
                            <span class="advanced-search-con-title">Advanced Search Options</span>

                            <div class="advanced-search-con-widget">
                                <input type="radio" name="search_options" value="Document ID" id="advanced-search-con-widget-docid" checked>
                                <label for="advanced-search-con-widget-docid">Document ID</label>
                            </div>
                            <div class="advanced-search-con-widget">
                                <input type="radio" name="search_options" value="Document Title" id="advanced-search-con-widget-doctitle">
                                <label for="advanced-search-con-widget-doctitle">Document Title</label>
                            </div>
                            <div class="advanced-search-con-widget">
                                <input type="radio" name="search_options" value="Project ID" id="advanced-search-con-widget-projectid">
                                <label for="advanced-search-con-widget-projectid">Project ID</label>
                            </div>
                            <div class="advanced-search-con-widget">
                                <input type="radio" name="search_options" value="Group ID" id="advanced-search-con-widget-groupid">
                                <label for="advanced-search-con-widget-groupid">Group ID</label>
                            </div>
                            <div class="advanced-search-con-widget">
                                <input type="radio" name="search_options" value="Owner ID" id="advanced-search-con-widget-ownerid">
                                <label for="advanced-search-con-widget-ownerid">Owner ID</label>
                            </div>
                            <br>
                            <button id="advanced-search-con-submit" class="btn-shadow">Apply</button>

                            <!-- Document ID
                            Project ID
                            Group ID
                            Owner ID -->
                        </div>
                    </div>
                    <div class="documents-list color-sc">
                        <div class="documents-list-searchbox">
                            <input id="documents-list-searchbox-tbox" type="text" placeholder="Search Name or Owner" >
                            <button class="btn-shadow">Go</button>
                        </div>
                        <span class="documents-list-advanced-search">Advanced Search</span>
                        <div class="documents-list-widget-con">
                            
                            <!-- <div class="documents-list-widget btn-shadow">
                                <span class="documents-list-widget-title">Document Title</span>
                                <span class="documents-list-widget-id">D-123456789</span>
                            </div> -->

                        </div>
                    </div>
                    <div class="documents-prefs">
                        <div class="documents-prefs-status color-sc">
                            <div class="documents-prefs-status-header">
                                <span class="documents-prefs-status-doctitle">Document Title</span>
                                <span class="documents-prefs-status-docid">D-12346567789</span>
                            </div>
                            <div class="documents-prefs-status-board">
                                <div id="documents-prefs-status-draft" class="documents-prefs-status-board-widget color-draft">
                                    <span class="documents-prefs-status-board-widget-title">Draft</span>
                                    <i class="fas fa-check-square"></i>
                                </div>
                                <div id="documents-prefs-status-proofread" class="documents-prefs-status-board-widget color-proofread">
                                    <span class="documents-prefs-status-board-widget-title">Proofread</span>
                                    <i class="fas fa-check-square"></i>
                                </div>
                                <div id="documents-prefs-status-review" class="documents-prefs-status-board-widget color-review">
                                    <span class="documents-prefs-status-board-widget-title">Review</span>
                                    <i class="fas fa-spinner"></i>
                                </div>
                                <div id="documents-prefs-status-approve" class="documents-prefs-status-board-widget color-approve">
                                    <span class="documents-prefs-status-board-widget-title">Approve</span>
                                    <i class="fas fa-spinner"></i>
                                </div>
                                <div id="documents-prefs-status-postapprove" class="documents-prefs-status-board-widget color-postapprove">
                                    <span class="documents-prefs-status-board-widget-title">Post Approve</span>
                                    <i class="fas fa-spinner"></i>
                                </div>
                            </div>
                            <div class="documents-prefs-status-timestamp">
                                <span class="documents-prefs-status-timestamp-title">Timestamps</span>
                                <!-- <span class="documents-prefs-status-timestamp-widget"><b>Draft:</b> July 20, 2020</span>
                                <span class="documents-prefs-status-timestamp-widget"><b>Proofread:</b> July 22, 2020</span> -->
                            </div>
                            <br>
                            <div class="documents-prefs-status-handlers">
                                <span class="documents-prefs-status-handlers-title">Handlers</span>
                                <!-- <span class="documents-prefs-status-handlers-widget"><b>Proofreader:</b> Noel Santillan</span>
                                <span class="documents-prefs-status-handlers-widget"><b>Proofreader:</b> Brijesh Patel</span>
                                <span class="documents-prefs-status-handlers-widget"><b>Proofreader:</b> Javeria Ahmed</span>
                                <span class="documents-prefs-status-handlers-widget"><b>Proofreader:</b> Brijesh Patel</span>
                                <span class="documents-prefs-status-handlers-widget"><b>Proofreader:</b> Javeria Ahmed</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- documents Search from doc builder -->


    </div>


    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.0.0-alpha0/date_fns.min.js"></script> -->
    <script src="lib/js/date_fns.min.js" type="text/javascript"></script>
    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="lib/js/alert.js" type="text/javascript"></script>
    <script src="controllers/js/uploaddoc.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/admin.js" type="text/javascript"></script>
    <script src="controllers/js/api_admin.js" type="text/javascript"></script>
    <script src="controllers/js/api_position.js" type="text/javascript"></script>
    <script src="controllers/js/api_project.js" type="text/javascript"></script>
    <script src="controllers/js/api_department.js" type="text/javascript"></script>
    <script src="controllers/js/api_account.js" type="text/javascript"></script>
    <script src="controllers/js/api_group.js" type="text/javascript"></script>
    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="controllers/js/api_document.js" type="text/javascript"></script>
    <script src="controllers/js/api_company.js" type="text/javascript"></script>
    <script src="controllers/js/api_license.js" type="text/javascript"></script>
    <script src="controllers/js/api_complains.js" type="text/javascript"></script>
    <script src="lib/js/admin.js" type="text/javascript"></script>
    <script src="lib/js/project.js" type="text/javascript"></script>
    <script src="lib/js/group.js" type="text/javascript"></script>
    <script src="lib/js/uac.js" type="text/javascript"></script>
    <script src="lib/js/moduleman.js" type="text/javascript"></script>
    <script src="lib/js/dashboard.js" type="text/javascript"></script>
    <script src="lib/js/license.js" type="text/javascript"></script>
    <script src="lib/js/complains.js" type="text/javascript"></script>

    <script src="model/classes/class_company.js" type="text/javascript"></script>
    <script src="model/classes/class_department.js" type="text/javascript"></script>
    <script src="model/classes/class_position.js" type="text/javascript"></script>
    <script src="model/classes/class_account.js" type="text/javascript"></script>
    <script src="model/classes/class_project.js" type="text/javascript"></script>
    <script src="model/classes/class_group.js" type="text/javascript"></script>
    <script src="model/classes/class_admin.js" type="text/javascript"></script>
    <script src="model/classes/class_license.js" type="text/javascript"></script>
    <script src="model/classes/class_complains.js" type="text/javascript"></script>
    <script src="model/classes/class_alert.js" type="text/javascript"></script>

    <!-- Additional Links from Doc Builder -->
    <script src="controllers/js/api_document_category.js" type="text/javascript"></script>
    <script src="controllers/js/api_document_connect.js" type="text/javascript"></script>

</body>
</html>