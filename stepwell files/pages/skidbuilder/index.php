<html lang="en">
<?php
  include "../../controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skid Builder</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/default.css" rel="stylesheet" /> 
    <link href="lib/css/newskidbuilder.css" rel="stylesheet" /> 
    <link href="lib/css/skidbuilder.css" rel="stylesheet" /> 

</head>
<body>
    <?php
        include "../../views/bodydefaults.html";
    ?>
    
    <?php
        include "../../views/skidbuildernav.html";
    ?>

    <div id="content">
        <div class="dashboard-con hidden nav-maincontainer">
            <div class="nav-content">
                <h1 class="color-title">Dashboard</h1>
            </div>
        </div>
        
       
        
        <div class="data-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="data-header">
                    <div class="title color-sc">
                    <span id="data-header-projectname" class="name">Data Manager</span>
                    <span id="data-header-projectid" class="id"></span>
                    </div>
                    <div class="data-panel">
                    <div class="data-navigation color-sc">
                        <span cid="unit" class="data-navigation-widget ">Unit</span>
                        <span cid="equipment" class="data-navigation-widget ">Equipment</span>
                    </div>
                    <div class="data-mods">

                        <!-- <div class="data-mods-widget btn-shadow">
                        <i class="fas fa-pencil-alt" title="View or Edit data"></i>
                        <span id="data-mods-prefs">View/Edit data</span>
                        </div> -->

                        <div class="data-mods-widget btn-shadow">
                            <i class="fas fa-sync-alt" title="Refresh Data"></i>
                            <span id="data-mods-refresh">Refresh Data</span>
                        </div>

                        <div class="data-mods-widget btn-shadow">
                            <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                            <span id="data-mods-dashboard">Dashboard</span>
                        </div>

                        <div class="data-mods-widget hidden btn-shadow">
                            <i class="fas fa-tools" title="Create Unit"></i>
                            <span id="data-mods-unit">Create Unit</span>
                        </div>

                        <div class="data-mods-widget hidden btn-shadow">
                            <i class="fas fa-tools" title="Create Sub Unit"></i>
                            <span id="data-mods-subunit">Create Sub Unit</span>
                        </div>

                        <div class="data-mods-widget hidden btn-shadow">
                            <i class="fas fa-tools" title="Create Equipment"></i>
                            <span id="data-mods-equipment">Create Equipment</span>
                        </div>

                        <div class="data-mods-widget hidden btn-shadow">
                            <i class="fas fa-tools" title="Create Sub Equipment"></i>
                            <span id="data-mods-subequipment">Create Sub Equipment</span>
                        </div>

                        <div class="data-mods-widget btn-shadow">
                            <i class="fas fa-print" title="Print"></i>
                            <span id="data-mods-print">Print</span>
                        </div>

                        <!-- <div class="data-mods-widget btn-shadow">
                        <i class="fas fa-envelope" title="Email"></i>
                        <span id="data-mods-email">Email</span>
                        </div> -->

                    </div>
                    </div>
                </div>
                <div class="data-body">
                    <div class="data-body-unit hidden data-body-widget">
                        <div class="data-body-unit-list color-sc">
                            <input type="text" placeholder="Search Units and SubUnits">
                            <div class="data-body-unit-list-widget active shadow">
                                <span class="title">Project 1</span>
                                <div class="subs">
                                    <span class="data-body-unit-list-subwidget active">Holy Crap</span>
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                </div>
                            </div>
                            
                            <div class="data-body-unit-list-widget shadow">
                                <span class="title">Project 1</span>
                                <div class="subs hidden">
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                    <span class="data-body-unit-list-subwidget">Holy Crap</span>
                                </div>
                            </div>

                        </div>

                        <div class="data-body-unit-ui data-body-unit-create hidden color-sc">
                            <span class="title">Create Unit</span>
                            <span class="subtitle">Unit ID</span>
                            <input id="data-body-unit-create-id" type="text" placeholder="Unit ID" disabled>
                            <span class="subtitle">Unit Name</span>
                            <input id="data-body-unit-create-name" type="text" placeholder="Unit Name">
                            <button id="data-body-unit-create-rngid" class="btn-shadow">Generate Random Unit ID</button>
                            <button id="data-body-unit-create-save" class="btn-shadow">Save</button>
                        </div>
                        <div class="data-body-unit-ui data-body-unit-createsub hidden color-sc">
                            <span class="title">Create Sub Unit</span>
                            <span class="subtitle">Unit ID</span>
                            <input id="data-body-unit-createsub-uid" type="text" placeholder="Unit ID" disabled>
                            <span class="subtitle">SubUnit ID</span>
                            <input id="data-body-unit-createsub-id" type="text" placeholder="SubUnit ID" disabled>
                            <span class="subtitle">SubUnit Name</span>
                            <input id="data-body-unit-createsub-name" type="text" placeholder="SubUnit Name">
                            <span class="subtitle">Process</span>
                            <input id="data-body-unit-createsub-process" type="text" placeholder="Process">
                            <span class="subtitle">Tag</span>
                            <input id="data-body-unit-createsub-tag" type="text" placeholder="Tag">
                            <button id="data-body-unit-createsub-rngid" class="btn-shadow">Generate Random SubUnit ID</button>
                            <button id="data-body-unit-createsub-save" class="btn-shadow">Save</button>
                        </div>

                        <div class="data-body-unit-ui data-body-unit-update hidden color-sc">
                            <span class="title">Update Unit</span>
                            <span class="subtitle">Unit ID</span>
                            <input id="data-body-unit-update-unitid" type="text" placeholder="Unit ID" disabled>
                            <span class="subtitle">Unit Name</span>
                            <input id="data-body-unit-update-name" type="text" placeholder="Unit Name">
                            <button id="data-body-unit-update-update" class="btn-shadow">Update</button>
                            <button id="data-body-unit-update-delete" class="btn-shadow">Delete</button>
                        </div>
                        <div class="data-body-unit-ui data-body-unit-updatesub hidden color-sc">
                            <span class="title">Update Sub Unit</span>
                            <span class="subtitle">Unit ID</span>
                            <input id="data-body-unit-updatesub-uid" type="text" placeholder="Unit ID" disabled>
                            <span class="subtitle">SubUnit ID</span>
                            <input id="data-body-unit-updatesub-suid" type="text" placeholder="SubUnit ID" disabled>
                            <span class="subtitle">SubUnit Name</span>
                            <input id="data-body-unit-updatesub-name" type="text" placeholder="SubUnit Name">
                            <span class="subtitle">Process</span>
                            <input id="data-body-unit-updatesub-process" type="text" placeholder="Process">
                            <span class="subtitle">Tag</span>
                            <input id="data-body-unit-updatesub-tag" type="text" placeholder="Tag">
                            <button id="data-body-unit-updatesub-update" class="btn-shadow">Update</button>
                            <button id="data-body-unit-updatesub-delete" class="btn-shadow">Delete</button>
                        </div>

                    </div>
                    <div class="data-body-equipment hidden data-body-widget">
                        <div class="data-body-equipment-list color-sc">
                            <input type="text" placeholder="Search Equipments and SubEquipments">
                            <div class="data-body-equipment-list-widget active shadow">
                                <span class="title">Project 1</span>
                                <div class="subs">
                                    <span class="data-body-equipment-list-subwidget active">Holy Crap</span>
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                </div>
                            </div>
                            
                            <div class="data-body-equipment-list-widget shadow">
                                <span class="title">Project 1</span>
                                <div class="subs hidden">
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                    <span class="data-body-equipment-list-subwidget">Holy Crap</span>
                                </div>
                            </div>

                        </div>

                        <div class="data-body-equipment-ui data-body-equipment-create hidden color-sc">
                            <span class="title">Create Equipment</span>
                            <span class="subtitle">Equipment ID</span>
                            <input id="data-body-equipment-create-id" type="text" placeholder="Equipment ID" disabled>
                            <span class="subtitle">Equipment Name</span>
                            <input id="data-body-equipment-create-name" type="text" placeholder="Equipment Name">
                            <button id="data-body-equipment-create-rngid" class="btn-shadow">Generate Random Equipment ID</button>
                            <button id="data-body-equipment-create-save" class="btn-shadow">Save</button>
                        </div>
                        <div class="data-body-equipment-ui data-body-equipment-createsub hidden color-sc">
                            <span class="title">Create Sub equipment</span>
                            <span class="subtitle">Equipment ID</span>
                            <input id="data-body-equipment-createsub-eid" type="text" placeholder="Equipment ID" disabled>
                            <span class="subtitle">SubEquipment ID</span>
                            <input id="data-body-equipment-createsub-seid" type="text" placeholder="SubEquipment ID" disabled>
                            <span class="subtitle">SubEquipment Name</span>
                            <input id="data-body-equipment-createsub-name" type="text" placeholder="SubEquipment Name">
                            <span class="subtitle">Process</span>
                            <input id="data-body-equipment-createsub-process" type="text" placeholder="Process">
                            <span class="subtitle">Tag</span>
                            <input id="data-body-equipment-createsub-tag" type="text" placeholder="Tag">
                            <span class="subtitle">Quantity</span>
                            <input id="data-body-equipment-createsub-quantity" type="text" placeholder="Quantity">
                            <span class="subtitle">Capacity</span>
                            <input id="data-body-equipment-createsub-capacity" type="text" placeholder="Capacity">
                            <span class="subtitle">Tank</span>
                            <input id="data-body-equipment-createsub-tank" type="text" placeholder="Tank">
                            <span class="subtitle">Room</span>
                            <input id="data-body-equipment-createsub-room" type="text" placeholder="Room">
                            <span class="subtitle">Dimensions</span>
                            <input id="data-body-equipment-createsub-dimension" type="text" placeholder="Dimensions">
                            <span class="subtitle">Cost</span>
                            <input id="data-body-equipment-createsub-cost" type="text" placeholder="Cost">
                            <span class="subtitle">Budget</span>
                            <input id="data-body-equipment-createsub-budget" type="text" placeholder="Budget">
                            <button id="data-body-equipment-createsub-rngid" class="btn-shadow">Generate Random Sub Equipment ID</button>
                            <button id="data-body-equipment-createsub-save" class="btn-shadow">Save</button>
                        </div>
                        
                        <div class="data-body-equipment-ui data-body-equipment-update hidden color-sc">
                            <span class="title">Update equipment</span>
                            <span class="subtitle">Equipment ID</span>
                            <input id="data-body-equipment-update-eid" type="text" placeholder="Equipment ID" disabled>
                            <span class="subtitle">Equipment Name</span>
                            <input id="data-body-equipment-update-name" type="text" placeholder="Equipment Name">
                            <button id="data-body-equipment-update-update" class="btn-shadow">Update</button>
                            <button id="data-body-equipment-update-delete" class="btn-shadow">Delete</button>
                        </div>
                        <div class="data-body-equipment-ui data-body-equipment-updatesub hidden color-sc">
                            <span class="title">Update Sub equipment</span>
                            <span class="subtitle">Equipment</span>
                            <input id="data-body-equipment-updatesub-eid" type="text" placeholder="Equipment ID" disabled>
                            <span class="subtitle">SubEquipment ID</span>
                            <input id="data-body-equipment-updatesub-seid" type="text" placeholder="SubEquipment ID" disabled>
                            <span class="subtitle">SubEquipment Name</span>
                            <input id="data-body-equipment-updatesub-name" type="text" placeholder="SubEquipment Name">
                            <span class="subtitle">Process</span>
                            <input id="data-body-equipment-updatesub-process" type="text" placeholder="Process">
                            <span class="subtitle">Tag</span>
                            <input id="data-body-equipment-updatesub-tag" type="text" placeholder="Tag">
                            <span class="subtitle">Quantity</span>
                            <input id="data-body-equipment-updatesub-quantity" type="text" placeholder="Quantity">
                            <span class="subtitle">Capacity</span>
                            <input id="data-body-equipment-updatesub-capacity" type="text" placeholder="Capacity">
                            <span class="subtitle">Tank</span>
                            <input id="data-body-equipment-updatesub-tank" type="text" placeholder="Tank">
                            <span class="subtitle">Room</span>
                            <input id="data-body-equipment-updatesub-room" type="text" placeholder="Room">
                            <span class="subtitle">Dimensions</span>
                            <input id="data-body-equipment-updatesub-dimension" type="text" placeholder="Dimensions">
                            <span class="subtitle">Cost</span>
                            <input id="data-body-equipment-updatesub-cost" type="text" placeholder="Cost">
                            <span class="subtitle">Budget</span>
                            <input id="data-body-equipment-updatesub-budget" type="text" placeholder="Budget">
                            <button id="data-body-equipment-updatesub-update" class="btn-shadow">Update</button>
                            <button id="data-body-equipment-updatesub-delete" class="btn-shadow">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="build-con hidden nav-maincontainer">
            <div class="nav-content">
                <div class="build-list color-sc">
                    <input type="text" placeholder="Search Skid">
                    <div class="build-widget-con">
                        <span class="build-widget btn-shadow">Skid Title<i class="fas fa-trash manage-skid-widget-delete"></i></span>
                        <span class="build-widget btn-shadow">Skid Title<i class="fas fa-trash manage-skid-widget-delete"></i></span>
                        <span class="build-widget btn-shadow">Skid Title<i class="fas fa-trash manage-skid-widget-delete"></i></span>
                        <span class="build-widget btn-shadow">Skid Title<i class="fas fa-trash manage-skid-widget-delete"></i></span>
                    </div>
                </div>
                <div class="build-prefs">
                    <div class="build-prefs-create-con color-sc ">
                        <span class="build-prefs-create-title">Create New Skid</span>
                        <input id="manage-skid-name" type="text" placeholder="Give your Skid a Name">
                        <button id="create-new-skid" class="btn-shadow">Create New Skid</button>
                    </div>
                    <div class="build-prefs-launch-con color-sc ">
                        <span class="build-prefs-launch-title">Skid Name</span>
                        <button id="launch-skid" class="build-prefs-launch-btn btn-shadow">Launch Skid<i class="fas fa-rocket"></i></button>
                    </div>

                </div>
                <div class="build-launch">
                    <div class="build-launch-unit-con color-sc">
                        <span class="build-launch-unit-title">Unit List</span>
                        <div class="build-launch-unit-widget-con">

                            <div class="build-launch-unit-widget btn-shadow">
                                <span class="build-launch-unit-widget-main">unit1</span>
                                <div class="build-launch-unit-widget-subs">
                                    <span id="SU-00000" name="SubName1" main="U-00000" class="build-launch-unit-widget-sub color-sc">subu1</span>
                                    <span id="SU-00001" name="SubName2" main="U-00001" class="build-launch-unit-widget-sub color-sc">subu2</span>
                                    <span id="SU-00002" name="SubName3" main="U-00002" class="build-launch-unit-widget-sub color-sc">subu3</span>
                                </div>
                            </div>

                            <div class="build-launch-unit-widget btn-shadow">
                                <span class="build-launch-unit-widget-main">unit2</span>
                                <div class="build-launch-unit-widget-subs">
                                    <span id="SU-00003" name="SubName4" main="U-00003" class="build-launch-unit-widget-sub color-sc">subu4</span>
                                    <span id="SU-00004" name="SubName5" main="U-00004" class="build-launch-unit-widget-sub color-sc">subu5</span>
                                    <span id="SU-00005" name="SubName6" main="U-00005" class="build-launch-unit-widget-sub color-sc">subu6</span>
                                </div>
                            </div>

                            <div class="build-launch-unit-widget btn-shadow">
                                <span class="build-launch-unit-widget-main">unit3</span>
                                <div class="build-launch-unit-widget-subs">
                                    <span id="SU-00006" name="SubName7" main="U-00006" class="build-launch-unit-widget-sub color-sc">subu7</span>
                                    <span id="SU-00007" name="SubName8" main="U-00007" class="build-launch-unit-widget-sub color-sc">subu8</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="build-launch-skid-con color-sc">
                        <span class="build-launch-skid-title">Skid Build</span>
                        <div class="build-launch-skid-widget-con"> 
                            <!-- <div class="build-launch-skid-widget btn-shadow">
                                <span class="build-launch-skid-widget">UnitOp1</span>
                                <div class="build-launch-widget-subs">
                                    <span id="SE-00000" name="SubName1" main="SU-00000" class="build-launch-equipment-widget-sub color-sc">Equipment1</span>
                                    <span id="SE-00001" name="SubName2" main="SU-00001" class="build-launch-equipment-widget-sub color-sc">Equipment2</span>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    

                    <div class="build-launch-equipment-con color-sc">
                        <span class="build-launch-equipment-title">Equipment List</span>
                        <div class="build-launch-equipment-widget-con">

                            <div class="build-launch-equipment-widget btn-shadow">
                                <span class="build-launch-equipment-widget-main">equip1</span>
                                <div class="build-launch-equipment-widget-subs">
                                    <span id="SE-00000" name="SubName1" main="E-00000" class="build-launch-equipment-widget-sub color-sc">sube1</span>
                                    <span id="SE-00001" name="SubName2" main="E-00001" class="build-launch-equipment-widget-sub color-sc">sube2</span>
                                    <span id="SE-00002" name="SubName3" main="E-00002" class="build-launch-equipment-widget-sub color-sc">sube3</span>
                                </div>
                            </div>

                            <div class="build-launch-equipment-widget btn-shadow">
                                <span class="build-launch-equipment-widget-main">equip2</span>
                                <div class="build-launch-equipment-widget-subs">
                                    <span id="SE-00003" name="SubName4" main="E-00004" class="build-launch-equipment-widget-sub color-sc">sube4</span>
                                    <span id="SE-00004" name="SubName5" main="E-00005" class="build-launch-equipment-widget-sub color-sc">sube5</span>
                                    <span id="SE-00005" name="SubName6" main="E-00006" class="build-launch-equipment-widget-sub color-sc">sube6</span>
                                </div>
                            </div>

                            <div class="build-launch-equipment-widget btn-shadow">
                                <span class="build-launch-equipment-widget-main">equip3</span>
                                <div class="build-launch-equipment-widget-subs">
                                    <span id="SE-00006" name="SubName7" main="E-00006" class="build-launch-equipment-widget-sub color-sc">sube7</span>
                                    <span id="SE-00007" name="SubName8" main="E-00007" class="build-launch-equipment-widget-sub color-sc">sube8</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        


    </div>


    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="controllers/js/api_skidbuilder.js" type="text/javascript"></script>
    <script src="lib/js/skidbuilder.js" type="text/javascript"></script>
    
    <script src="lib/js/complains.js" type="text/javascript"></script>
    <script src="lib/js/alert.js" type="text/javascript"></script>

    
    <script src="model/classes/class_account.js" type="text/javascript"></script>
    <script src="model/classes/class_company.js" type="text/javascript"></script>
    <script src="model/classes/class_complains.js" type="text/javascript"></script>
    <script src="model/classes/class_project.js" type="text/javascript"></script>
    <script src="model/classes/class_skid.js" type="text/javascript"></script>
    <script src="model/classes/class_alert.js" type="text/javascript"></script>

    <script src="controllers/js/api_company.js" type="text/javascript"></script>
    <script src="controllers/js/api_complains.js" type="text/javascript"></script>
    <script src="controllers/js/api_account.js" type="text/javascript"></script>
    <script src="controllers/js/api_admin.js" type="text/javascript"></script>
    <script src="controllers/js/api_project.js" type="text/javascript"></script>

</body>
</html>