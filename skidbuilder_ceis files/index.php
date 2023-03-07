<html lang="en">
<?php
  include "./controllers/defaults.php";
  // allow_url_include;
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
<body onload="init()">
    <?php
        include "./views/bodydefaults.html";
        include "./views/toast.html";
    ?>
    
    <?php
        include "./views/skidbuildernav.html";
    ?>

    <div id="content">
        
        <div class="dashboard-con hidden nav-maincontainer">
            <div class="nav-content">
                <h1 class="color-title">Dashboard</h1>
            </div>
        </div>

        <div class="skid-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="skid-header">
                    <div class="title color-sc">
                        <span id="skid-header-projectname" class="name">Skids</span>
                        <span id="skid-header-projectid" class="id"></span>
                    </div>
                    <div class="skid-panel">
                        <div class="skid-navigation color-sc">
                            <span cid="my" class="skid-navigation-widget ">My Skids</span>
                            <span cid="company" class="skid-navigation-widget ">Search Skids</span>
                            <span cid="archive" class="skid-navigation-widget ">Archive Skids</span>
                        </div>
                        <div class="skid-mods">

                            <!-- <div class="skid-mods-widget btn-shadow">
                            <i class="fas fa-pencil-alt" title="View or Edit skid"></i>
                            <span id="skid-mods-prefs">View/Edit skid</span>
                            </div> -->

                            <div class="skid-mods-widget btn-shadow">
                                <i class="fas fa-sync-alt" title="Refresh skid"></i>
                                <span id="skid-mods-refresh">Refresh Data</span>
                            </div>

                            <div class="skid-mods-widget btn-shadow">
                                <i class="fas fa-solar-panel" title="Go to Dashboard"></i>
                                <span id="skid-mods-dashboard">Dashboard</span>
                            </div>

                            <div class="skid-mods-widget hidden btn-shadow">
                                <i class="fas fa-solar-panel" title="Connect to Pro Flow Project"></i>
                                <span id="skid-mods-connect">Connect to ProFlow Projects</span>
                            </div>

                            <div class="skid-mods-widget hidden btn-shadow">
                                <i class="fas fa-solar-panel" title="Connect to Pro Flow Project"></i>
                                <span id="skid-mods-back">Back to My Skids</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="skid-body">
                    <div class="skid-body-my hidden skid-body-widget">
                        <div class="list-widget">
                            <div class="search">
                                <input type="text" placeholder="Search Skids">
                                <button>GO</button>
                            </div>
                            <div id="skid-body-my-projectlist" class="widget-con">
                                <span class="widget skid-body-my-projectlist-h">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                            </div>
                        </div>
                        <div class="skid-body-my-details hidden">
                            <div class="list-con">
                                <span class="title">Access List</span>
                                <div class="list-widget">
                                    <div class="search">
                                        <input type="text" placeholder="Search Accounts">
                                        <button>GO</button>
                                    </div>
                                    <div id="skid-body-my-accountlist" class="widget-con">
                                        <span class="skid-body-my-accountlist-h widget">Account 1 <i class="skid-body-my-accountlist-d fas fa-trash"></i> </span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                    </div>
                                </div>
                            </div>
                            <div id="skid-body-my-details-propscon" class="props-con ">
                                <div id="skid-body-company-header-qr"></div>
                                <span class="title filename">Filename <i class="fas fa-lock"></i></span>
                                <br>
                                <span class="subtitle owner">Creator: Noel U-8768768767</span>
                                <span class="subtitle pages">Pages: 20</span>
                                <span class="subtitle component">Components: 20</span>
                                <span class="subtitle transfer">Transfer Parameter: 20</span>
                                <span class="subtitle modify">Last Modified: 2020-08-20</span>
                                <br>
                                <a id="skid-body-my-a-download" style="display: none;" href="" download=""></a>
                                <button id="skid-body-my-download">Download</button>
                                <br>
                                <!-- <button id="skid-body-my-open">Open</button> -->
                                <div class="access">
                                    <input type="text" placeholder="Enter Account ID">
                                    <button id="skid-body-my-access-submit">Give Access</button>
                                </div>
                                <br>
                                <span class="title">Access Requests</span>
                                <div id="skid-body-my-fileaccessrequest" class="grant-access">
                                    <span class="skid-body-my-fileaccessrequest-h widget">TEST <div><button>Grant Access</button> <i class="fas fa-trash"></i></div></span>
                                    <span class="widget">TEST <div><button>Grant Access</button> <i class="fas fa-trash"></i></div></span>
                                    <span class="widget">TEST <div><button>Grant Access</button> <i class="fas fa-trash"></i></div></span>
                                    <span class="widget">TEST <div><button>Grant Access</button> <i class="fas fa-trash"></i></div></span>
                                    <span class="widget">TEST <div><button>Grant Access</button> <i class="fas fa-trash"></i></div></span>
                                
                                </div>
                                <!-- <span class="report ok">Account Added!</span> -->
                            </div>
                        </div>
                        <div class="skid-body-my-connect">
                            <div class="list-con">
                                <span class="title">Connect List</span>
                                <div class="list-widget">
                                    <!-- <div class="search">
                                        <input type="text" placeholder="Search Projects">
                                        <button>GO</button>
                                    </div> -->
                                    <div id="skid-body-my-pfprojectconnectlist" class="widget-con">
                                        <span class="skid-body-my-accountlist-h widget">Project 1 <i class="skid-body-my-accountlist-d fas fa-trash"></i> </span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                    </div>
                                </div>
                            </div>
                            <div class="props-con ">
                                <span class="title">Pro Flow Project List</span>
                                <div class="list-widget">
                                    <div class="search">
                                        <input type="text" placeholder="Search Projects">
                                        <button>GO</button>
                                    </div>
                                    <div id="skid-body-my-pfprojectlist" class="widget-con">
                                        <span class="skid-body-my-accountlist-h widget">Project 1 <i class="skid-body-my-accountlist-d fas fa-plus"></i> </span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                        <span class="widget">Project 1</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="skid-body-company hidden skid-body-widget-">
                        <div class="skid-body-company-header">
                            
                            <div class="header-filter">
                                <input checked type="checkbox" id="skid-body-company-header-filename">
                                <label for="skid-body-company-header-filename">Filename</label>
                            </div>
                            <div class="header-filter">
                                <input checked type="checkbox" id="skid-body-company-header-creator">
                                <label for="skid-body-company-header-creator">Creator</label>
                            </div>
                            <div class="header-filter">
                                <input checked type="checkbox" id="skid-body-company-header-names">
                                <label for="skid-body-company-header-names">Names</label>
                            </div>
                            <div class="header-filter">
                                <input checked type="checkbox" id="skid-body-company-header-headers">
                                <label for="skid-body-company-header-headers">Headers</label>
                            </div>
                            <div class="header-filter">
                                <input checked type="checkbox" id="skid-body-company-header-properties">
                                <label for="skid-body-company-header-properties">Properties</label>
                            </div>
                            <div class="header-filter">
                                <input checked type="checkbox" id="skid-body-company-header-tags">
                                <label for="skid-body-company-header-tags">Tags</label>
                            </div>
                            <div class="header-search">
                                <input type="text" placeholder="Enter Keyword">
                                <button id="skid-body-company-header-search">Search</button>
                            </div>
                        </div>
                        <div class="skid-body-company-content hidden">
                            <div class="list-con">
                                <span class="title">Found Skids</span>
                                <div class="list-widget">
                                    <!-- <div class="search">
                                        <input type="text" placeholder="Search Accounts">
                                        <button>GO</button>
                                    </div> -->
                                    <div id="skid-body-company-content-found" class="widget-con">
                                        <span class="skid-body-company-content-found-h widget">Account 1  </span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                        <span class="widget">Account 1</span>
                                    </div>
                                </div>
                            </div>
                            <div id="skid-body-company-details-propscon" class="props-con ">
                                <div class="skid-body-company-content-report"></div>
                                

                                <span class="skid-body-company-content-hv title filename">Filename <i class="fas fa-lock"></i></span>
                                <br>
                                <span class="skid-body-company-content-hv subtitle owner">Creator: Noel U-8768768767</span>
                                <span class="skid-body-company-content-hv subtitle pages">Pages: 20</span>
                                <span class="skid-body-company-content-hv subtitle component">Components: 20</span>
                                <span class="skid-body-company-content-hv subtitle transfer">Transfer Parameter: 20</span>
                                <span class="skid-body-company-content-hv subtitle modify">Last Modified: 2020-08-20</span>
                                <br>
                                <a id="skid-body-company-content-download-a" style="display: none;" href="" download=""></a>
                                <button class="skid-body-company-content-hv" id="skid-body-company-content-download">Download</button>
                                <button class="skid-body-company-content-hv" id="skid-body-company-content-access-request">Request Access</button>
                                <!-- <span class="report ok">Account Added!</span> -->
                            </div>
                        </div>
                    </div>
                    <div class="skid-body-archive  skid-body-widget">
                        <div class="list-widget">
                            <div class="search">
                                <input type="text" placeholder="Search Skids">
                                <button>GO</button>
                            </div>
                            <div id="skid-body-archive-projectlist" class="widget-con">
                                <span class="widget skid-body-archive-projectlist-h">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                                <span class="widget">Project 1</span>
                            </div>
                        </div>
                        
                        <div id="skid-body-archive-propscon" class="skid-body-archive-props">
                            <div id="skid-body-company-header-qr"></div>
                            <span class="title filename">Filename <i class="fas fa-lock"></i></span>
                            <br>
                            <span class="subtitle owner"><b>Creator:</b> Noel U-8768768767</span>
                            <span class="subtitle pages"><b>Pages:</b> 20</span>
                            <span class="subtitle component"><b>Components:</b> 20</span>
                            <span class="subtitle transfer"><b>Transfer Parameter:</b> 20</span>
                            <span class="subtitle modify"><b>Last Modified:</b> 2020-08-20</span>
                            <br>
                            <button id="skid-body-archive-submit">Archive</button>
                        </div>
                        


                    </div>

                </div>

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
                        <span cid="file" class="data-navigation-widget ">File</span>
                        <span cid="unit" class="data-navigation-widget ">Unit</span>
                        <span cid="equipment" class="data-navigation-widget ">Equipment</span>
                        <span cid="icon" class="data-navigation-widget ">Icons</span>
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
                            <div class="search">
                                <input id="data-body-unit-search-field" type="text" placeholder="Search SubUnits">
                                <button id="data-body-unit-search-submit">Go</button>
                            </div>
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
                            <input class="inputmini" id="data-body-unit-createsub-uid" type="text" placeholder="Unit ID" disabled>
                            <span class="subtitle">SubUnit ID</span>
                            <input class="inputmini" id="data-body-unit-createsub-id" type="text" placeholder="SubUnit ID" disabled>
                            <span class="subtitle">SubUnit Name</span>
                            <input id="data-body-unit-createsub-name" type="text" placeholder="SubUnit Name">
                            <div class="propcon">

                                <div class="widget" type="text">
                                    <span class="subtitle">Process</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Process">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Tag</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Tag">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <!-- <div class="widget" type="numeric">
                                    <span class="subtitle">Volume</span>
                                    <div class="inputholder">
                                        <input class="min" type="text" placeholder="Min">
                                        <input class="max" type="text" placeholder="Max">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div> -->

                            </div>
                            <span class="subtitle">Icon</span>
                            <img id="data-body-unit-createsub-icon" onclick="iconSelect($(this))" src="lib/images/skidicons/1.png" alt="">
                            <div class="doubleaction">
                                <button id="data-body-unit-createsub-rngid" class="btn-shadow">Generate Random SubUnit ID</button>
                                <button id="data-body-unit-createsub-save" class="btn-shadow">Save</button>
                            </div>
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
                            <input id="data-body-unit-updatesub-uid" class="inputmini" type="text" placeholder="Unit ID" disabled>
                            <span class="subtitle">SubUnit ID</span>
                            <input id="data-body-unit-updatesub-suid" class="inputmini" type="text" placeholder="SubUnit ID" disabled>

                            <span class="subtitle">SubUnit Name</span>
                            <input id="data-body-unit-updatesub-name" type="text" placeholder="SubUnit Name">

                            <div class="propcon">
                                <!-- <span class="subtitle">Process</span>
                                <input id="data-body-unit-updatesub-process" type="text" placeholder="Process">
                                <span class="subtitle">Tag</span>
                                <input id="data-body-unit-updatesub-tag" type="text" placeholder="Tag"> -->

                                <div class="widget" type="text">
                                    <span class="subtitle">Process</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Process">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Tag</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Tag">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="numeric">
                                    <span class="subtitle">Volume</span>
                                    <div class="inputholder">
                                        <input class="min" type="text" placeholder="Min">
                                        <input class="max" type="text" placeholder="Max">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>

                            </div>

                            <span class="subtitle">Icon</span>
                            <img id="data-body-unit-updatesub-icon" onclick="iconSelect($(this))" src="lib/images/skidicons/1.png" alt="">
                            

                            <div class="doubleaction">
                                <button id="data-body-unit-updatesub-update" class="btn-shadow">Update</button>
                                <button id="data-body-unit-updatesub-delete" class="btn-shadow">Delete</button>
                            </div>
                        </div>
                        <div class="data-body-unit-ui data-body-unit-addprop hidden color-sc">
                            <span class="title">Add Property</span>
                            <span class="subtitle">Property Type</span>
                            <select id="data-body-unit-addprop-type">
                                <option value="text" selected>Text</option>
                                <option value="numeric">Numeric</option>
                            </select>
                            <span class="subtitle">Property Name</span>
                            <input id="data-body-unit-addprop-name" type="text">
                            <span class="subtitle typetext">Property Value</span>
                            <input class="typetext" id="data-body-unit-addprop-text" type="text">

                            <span class="subtitle typenumeric hidden">Measurement Unit</span>
                            <input id="data-body-unit-addprop-measurement" class="text typenumeric hidden" placeholder="Measurement Unit">
                            <span class="subtitle typenumeric hidden">Property Value</span>
                            <div class="doubleaction typenumeric hidden">
                                <input id="data-body-unit-addprop-min" class="min" type="text" placeholder="Min ">
                                <input id="data-body-unit-addprop-max" class="max" type="text" placeholder="Max ">
                                <input id="data-body-unit-addprop-setpoint" class="setpoint" type="text" placeholder="Set Point ">
                            </div>
                            <button id="data-body-unit-addprop-submit" class="btn-shadow">Add</button>

                        </div>

                    </div>
                    <div class="data-body-equipment hidden data-body-widget">
                        <div class="data-body-equipment-list color-sc">
                            <div class="search">
                                <input id="data-body-equipment-search-field" type="text" placeholder="Search SubEquipments">
                                <button id="data-body-equipment-search-submit">Go</button>
                            </div>
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
                            <input id="data-body-equipment-createsub-eid" class="inputmini" type="text" placeholder="Equipment ID" disabled>
                            <span class="subtitle">SubEquipment ID</span>
                            <input id="data-body-equipment-createsub-seid" class="inputmini" type="text" placeholder="SubEquipment ID" disabled>
                            <span class="subtitle">SubEquipment Name</span>
                            <input id="data-body-equipment-createsub-name" type="text" placeholder="SubEquipment Name">

                            <div class="propcon">
                                <div class="widget" type="text">
                                    <span class="subtitle">Process</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Process">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Tag</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Tag">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Quantity</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Quantity">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Capacity</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Capacity">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Tank</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Tank">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Room</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Room">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Dimensions</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Dimensions">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Cost</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Cost">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <div class="widget" type="text">
                                    <span class="subtitle">Budget</span>
                                    <div class="inputholder">
                                        <input class="text" type="text" placeholder="Budget">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div>
                                <!-- <div class="widget" type="numeric">
                                    <span class="subtitle">Volume</span>
                                    <div class="inputholder">
                                        <input class="min" type="text" placeholder="Min">
                                        <input class="max" type="text" placeholder="Max">
                                        <i onclick="removeProp(this);" class="fas fa-trash"></i>
                                    </div>
                                </div> -->

                            
                            </div>
                            <!-- 
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
                            <input id="data-body-equipment-createsub-budget" type="text" placeholder="Budget"> -->

                            <span class="subtitle">Icon</span>
                            <img id="data-body-equipment-createsub-icon" onclick="iconSelect($(this))" src="lib/images/skidicons/1.png" alt="">
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
                            <input id="data-body-equipment-updatesub-eid" class="inputmini" type="text" placeholder="Equipment ID" disabled>
                            <span class="subtitle">SubEquipment ID</span>
                            <input id="data-body-equipment-updatesub-seid" class="inputmini" type="text" placeholder="SubEquipment ID" disabled>
                            <span class="subtitle">SubEquipment Name</span>
                            <input id="data-body-equipment-updatesub-name" type="text" placeholder="SubEquipment Name">

                            <div class="propcon">

                            </div>
                            <!-- <span class="subtitle">Process</span>
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
                            <input id="data-body-equipment-updatesub-budget" type="text" placeholder="Budget"> -->
                            <span class="subtitle">Icon</span>
                            <img id="data-body-equipment-updatesub-icon" onclick="iconSelect($(this))" src="lib/images/skidicons/1.png" alt="">
                            <button id="data-body-equipment-updatesub-update" class="btn-shadow">Update</button>
                            <button id="data-body-equipment-updatesub-delete" class="btn-shadow">Delete</button>
                        </div>
                        <div class="data-body-equipment-ui data-body-equipment-addprop hidden color-sc">
                            <span class="title">Add Property</span>
                            <span class="subtitle">Property Type</span>
                            <select id="data-body-equipment-addprop-type">
                                <option value="text" selected>Text</option>
                                <option value="numeric">Numeric</option>
                            </select>
                            <span class="subtitle">Property Name</span>
                            <input id="data-body-equipment-addprop-name" type="text">
                            <span class="subtitle typetext">Property Value</span>
                            <input class="typetext" id="data-body-equipment-addprop-text" type="text">

                            <span class="subtitle typenumeric hidden">Measurement equipment</span>
                            <input id="data-body-equipment-addprop-measurement" class="text typenumeric hidden" placeholder="Measurement Unit">
                            <span class="subtitle typenumeric hidden">Property Value</span>
                            <div class="doubleaction typenumeric hidden">
                                <input id="data-body-equipment-addprop-min" class="min" type="text" placeholder="Min ">
                                <input id="data-body-equipment-addprop-max" class="max" type="text" placeholder="Max ">
                                <input id="data-body-equipment-addprop-setpoint" class="setpoint" type="text" placeholder="Set Point ">
                            </div>
                            <button id="data-body-equipment-addprop-submit" class="btn-shadow">Add</button>

                        </div>

                    </div>
                    <div class="data-body-file hidden data-body-widget-">
                        <button class="btn-shadow" id="data-body-file-save">Save Data</button>
                        <button class="btn-shadow" id="data-body-file-import">Import Data</button>
                        <button class="btn-shadow" id="data-body-file-export">Export Data</button>

                        <a id="data-body-file-export-h" href="" ></a>
                    </div>
                    <div class="data-body-icon  data-body-widget">
                        <div class="data-body-icon-unit-con data-body-icon-container color-sc">
                            <span class="title">Unit Icons List</span>
                            <div id="data-body-icon-unit-widgetcon" class="data-body-icon-container-widgetcon">
                                <div class="widget">
                                    <img src="./lib/images/skidicons/1.png" alt="">
                                    <i class="fas fa-trash" onclick="deleteIcon(this);" ></i>
                                </div>
                                <div class="widget">
                                    <img src="./lib/images/skidicons/1.png" alt="">
                                    <i class="fas fa-trash" onclick="deleteIcon(this);" ></i>
                                </div>
                                <div class="widget">
                                    <img src="./lib/images/skidicons/1.png" alt="">
                                    <i class="fas fa-trash" onclick="deleteIcon(this);" ></i>
                                </div>
                            </div>
                            <span class="subtitle">Enter Short Description</span>
                            <div class="duo">
                                <input id="data-body-icon-text-unit" type="text">
                                <input id="data-body-icon-browse-unit" onchange="data_body_icon_browse_unit()" type="file" accept="image/x-png,image/gif,image/jpeg" style="display: none;">
                                <button onclick="$('#data-body-icon-browse-unit').click();">Select Icon</button>
                            </div>
                            <button id="data-body-icon-addunit" class="btn-shadow">Add Icon</button>

                        </div>
                        <div class="data-body-icon-equipment-con data-body-icon-container color-sc">
                            <span class="title">Equipment Icons List</span>
                            <div id="data-body-icon-equipment-widgetcon" class="data-body-icon-container-widgetcon">
                                <div class="widget">
                                    <img src="./lib/images/skidicons/1.png" alt="">
                                    <i class="fas fa-trash" onclick="deleteIcon(this);" ></i>
                                </div>
                                <div class="widget">
                                    <img src="./lib/images/skidicons/1.png" alt="">
                                    <i class="fas fa-trash" onclick="deleteIcon(this);" ></i>
                                </div>
                                <div class="widget">
                                    <img src="./lib/images/skidicons/1.png" alt="">
                                    <i class="fas fa-trash" onclick="deleteIcon(this);" ></i>
                                </div>
                            </div>
                            <span class="subtitle">Enter Short Description</span>
                            <div class="duo">
                                <input id="data-body-icon-text-equipment" type="text">
                                <input id="data-body-icon-browse-equipment" onchange="data_body_icon_browse_equipment()" type="file" accept="image/x-png,image/gif,image/jpeg" style="display: none;">
                                <button onclick="$('#data-body-icon-browse-equipment').click();">Select Icon</button>
                            </div>
                            <button id="data-body-icon-addequipment" class="btn-shadow">Add Icon</button>
                        </div>
                    </div>

                    <div class="data-body-iconselect hidden">
                        <div class="container">
                            <span class="title">Select Icon</span>
                            <input id="data-body-iconselect-search" class="icon-search" type="text" placeholder="Search Icons">
                            <div class="data-body-iconselect-icontainer">
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/1.png" alt="" class="active">
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/2.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/3.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/4.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/5.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/6.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/7.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/8.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/9.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/10.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/11.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/12.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/13.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/14.png" alt="" >
                                <img class="data-body-iconselect-iconwidget" src="lib/images/skidicons/15.png" alt="" >
                            </div>
                            <button id="data-body-iconselect-submit" >Set Icon</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <!-- <script src="<?php echo $controlLocation ?>controllers/js/api_login.js" type="text/javascript"></script> -->
    

    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>


    
    
    <!-- <script src="<?php echo $controlLocation ?>controllers/js/api_account.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>controllers/js/api_complains.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>controllers/js/api_project.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>lib/js/alert.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>model/classes/class_account.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>model/classes/class_company.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>model/classes/class_complains.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>model/classes/class_alert.js" type="text/javascript"></script> -->
    <!-- <script src="<?php echo $controlLocation ?>model/classes/class_project.js" type="text/javascript"></script> -->

    
    <script src="import/js/api_account.js" type="text/javascript"></script>
    <script src="import/js/api_complains.js" type="text/javascript"></script>
    <script src="import/js/api_project.js" type="text/javascript"></script>
    <script src="import/js/alert.js" type="text/javascript"></script>
    <script src="import/js/class_account.js" type="text/javascript"></script>
    <script src="import/js/class_company.js" type="text/javascript"></script>
    <script src="import/js/class_complains.js" type="text/javascript"></script>
    <script src="import/js/class_alert.js" type="text/javascript"></script>
    <script src="import/js/class_project.js" type="text/javascript"></script>


    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="controllers/js/api_skidbuilder.js" type="text/javascript"></script>
    <script src="model/classes/class_skid.js" type="text/javascript"></script>
    <script src="lib/js/skidbuilder.js" type="text/javascript"></script>
    
    

    <!-- <script src="http://localhost:8080/stepwell/controllers/js/api_login.js" type="text/javascript"></script> -->

    <!-- <script src="lib/js/complains.js" type="text/javascript"></script> -->
    
    <!-- <script src="model/classes/class_company.js" type="text/javascript"></script> -->
    <!-- <script src="model/classes/class_complains.js" type="text/javascript"></script> -->
    <!-- <script src="model/classes/class_project.js" type="text/javascript"></script> -->

    <!-- <script src="controllers/js/api_company.js" type="text/javascript"></script> -->
    <!-- <script src="controllers/js/api_complains.js" type="text/javascript"></script> -->
    <!-- <script src="controllers/js/api_account.js" type="text/javascript"></script> -->
    <!-- <script src="controllers/js/api_admin.js" type="text/javascript"></script> -->

</body>
</html>