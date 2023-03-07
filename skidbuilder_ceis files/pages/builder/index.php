<html lang="en">
<?php
  include "../../controllers/defaults.php";
  // allow_rl_include;
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skid Builder - Builder</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/default.css" rel="stylesheet" /> 
    <link href="lib/css/newskidbuilder.css" rel="stylesheet" /> 
    <link href="lib/css/skidbuilder.css" rel="stylesheet" /> 
    <link href="lib/css/builder.css" rel="stylesheet" /> 
    <link href="lib/css/builderprintpreview.css" rel="stylesheet" /> 

</head>
<body>
  
    <div id="builder-content">
        <?php
            include "../../views/toast.html";
            include "../../views/action.html";
            include '../../views/report.html';
        ?>
        <div id="builder-header">
            <a id="builder-header-home" href="<?php echo $rootLocation ?>">Home</a>
            <span id="builder-header-my" class="builder-header-state-init">My Skids</span>
            <span id="builder-header-create" class="builder-header-state-init">Create New</span>
            <span id="builder-header-open"  class="builder-header-state-init" onclick="$('#importComponent').click()">Open</span>
            <input id="importComponent" style="display: none;" onchange="importComponent()" type="file" accept="*.kms">
            <span id="builder-header-file" class="hidden builder-header-state-open">File Options</span>
            <!-- <span id="builder-header-props">Properties</span> -->
            <span id="builder-header-page" class="hidden builder-header-state-open">Page Setup</span>
            <span id="builder-header-print" class="hidden builder-header-state-open">Print</span>
            <span id="builder-header-report" class="hidden builder-header-state-open">Report</span>
            <span id="builder-header-close" class="hidden builder-header-state-open">Close</span>
            <i id="builder-header-lock" state="locked" class="hidden builder-header-state-open fas fa-lock"></i>
            
            <span class="title">SKID BUILDER - BUILD COMPONENTS</span>
            
        </div>
        <div id="builder-area" class="hidden">

            <!-- <div id="builder-area-page" class="builder-area-page">
                <svg id="builder-area-page-svg" class="unit-svg">
                    <defs id="builder-area-page-svg-defs">
                    </defs>
                </svg>
            </div> -->
            <div id="list-dragg-unit" class="list-dragg ">
                <div class="title">
                    <i class="fas fa-vector-square"></i>
                    <span class="hidden">UNIT</span>
                </div>
                <div class="search hidden">
                    <input id="list-dragg-unit-search-field" type="text" placeholder="Search">
                    <i id="list-dragg-unit-search-submit" class="fas fa-search"></i>
                </div>

                <div id="list-dragg-unit-content-wrapper" class="content-wrapper hidden">
                    <div class="content-widget">
                        <span class="title content-widget-subs-h">Filtration</span>
                        <div class="subs hidden">
                            <span id="SU-00001" class="list-dragg-subs-w unit">Tangential Flow Filtration</span>
                            <span id="SU-00002" class="list-dragg-subs-w unit">Normal Flow Filtration</span>
                            <span id="SU-00003" class="list-dragg-subs-w unit">Depth Filtration</span>
                            <span id="SU-00004" class="list-dragg-subs-w unit">Activated Carbon Filter</span>
                            <span id="SU-00005" class="list-dragg-subs-w unit">Nutsche Filtration</span>
                            <span id="SU-00006" class="list-dragg-subs-w unit">Vacuum Drum Filtration</span>
                            <span id="SU-00007" class="list-dragg-subs-w unit">Nanofiltration</span>
                            <span id="SU-00008" class="list-dragg-subs-w unit">Reverse Osmosis</span>
                        </div>
                    </div>
                    <div class="content-widget">
                        <span class="title content-widget-subs-h">Centrifugation</span>
                        <div class="subs hidden">
                            <span id="SU-00009" class="list-dragg-subs-w unit">Batch Centrifugation</span>
                            <span id="SU-00010" class="list-dragg-subs-w unit">Continuous Centrifugation</span>
                        </div>
                    </div>
                    <div class="content-widget">
                        <span class="title content-widget-subs-h">Mixing</span>
                        <div class="subs hidden">
                            <span id="SU-00011" class="list-dragg-subs-w unit">Inline</span>
                            <span id="SU-00012" class="list-dragg-subs-w unit">Batch -Top driven</span>
                            <span id="SU-00013" class="list-dragg-subs-w unit">Batch -Bottom driven</span>
                            <span id="SU-00014" class="list-dragg-subs-w unit">Batch -Pump driven</span>
                            <span id="SU-00015" class="list-dragg-subs-w unit">Solid Liquid </span>
                            <span id="SU-00016" class="list-dragg-subs-w unit">Special agitator driven</span>
                            <span id="SU-00017" class="list-dragg-subs-w unit">External mixer driven</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="list-dragg-equipment" class="list-dragg ">
                <div class="title">
                    <i class="fas fa-tools"></i>
                    <span class="hidden">EQUIPMENT</span>
                </div>
                <div class="search hidden">
                    <input id="list-dragg-equipment-search-field" type="text" placeholder="Search">
                    <i id="list-dragg-equipment-search-submit" class="fas fa-search"></i>
                </div>
                <div id="list-dragg-equipment-content-wrapper" class="content-wrapper hidden">
                    <div class="content-widget">
                        <span class="title content-widget-subs-h">Filter Vessel</span>
                        <div class="subs hidden">
                            <span id="SE-00001" class="list-dragg-subs-w equipment">Bag Filter Vessel</span>
                            <span id="SE-00002" class="list-dragg-subs-w equipment">Cartridge Filter Vessel</span>
                            <span id="SE-00003" class="list-dragg-subs-w equipment">Bag Stainer Vessel</span>
                            <span id="SE-00004" class="list-dragg-subs-w equipment">Charcoal Filter Vessel</span>
                        </div>
                    </div>
                    <div class="content-widget">
                        <span class="title content-widget-subs-h">Filter Media</span>
                        <div class="subs hidden">
                            <span id="SE-00005" class="list-dragg-subs-w equipment">Coalescing Element</span>
                            <span id="SE-00006" class="list-dragg-subs-w equipment">Filter Bags</span>
                            <span id="SE-00007" class="list-dragg-subs-w equipment">Filter Separator Elements</span>
                        </div>
                    </div>
                    <div class="content-widget">
                        <span class="title content-widget-subs-h">Filtration System</span>
                        <div class="subs hidden">
                            <span id="SE-00009" class="list-dragg-subs-w equipment">Tangential Flow</span>
                            <span id="SE-00010" class="list-dragg-subs-w equipment">Self Cleaning</span>
                            <span id="SE-00011" class="list-dragg-subs-w equipment">Nanofiltration</span>
                            <span id="SE-00012" class="list-dragg-subs-w equipment">Filter Housing</span>
                        </div>
                    </div>
                </div>
            </div>
            <i id="builder-area-addpage" class="fas fa-plus"></i>
            <div id="builder-component-watcher" class="" >
                <i status="closed" id="builder-component-watcher-h" class="fas fa-sort"></i>
                <span class="hideui hidden">Component Heirarchy</span>
                <div class="builder-component-watcher-con hideui hidden" id="builder-component-watcher-con">

                    <!-- <div compid="CU-76978696" class="builder-component-watcher-widget">
                        <img src="lib/images/skidicons/default.png" alt="">
                        <span>Subunit 1</span>
                    </div> -->

                </div>
            </div>

            <i id="builder-area-compare" class="fas fa-exchange-alt"></i>
            <?php include '../../views/builder_compprops.html' ?>
            <div id="builder-pagesetup" class="hidden">
                <div class="container">
                    <span class="title">PAGE SETUP</span>
                    <div class="widget">
                        <span class="title">Gridlines</span>
                        <div class="actions">
                            <input id="builder-pagesetup-gridline-show" type="radio" name="builder-pagesetup-gridline" checked>
                            <label for="builder-pagesetup-gridline-show">Show</label>
                        </div>
                        <div class="actions">
                            <input id="builder-pagesetup-gridline-hide" type="radio" name="builder-pagesetup-gridline">
                            <label for="builder-pagesetup-gridline-hide">Hide</label>
                        </div>
                    </div>
                    <div class="widget">
                        <span class="title">Orientation</span>
                        <div class="actions">
                            <input id="builder-pagesetup-orientation-portrait" type="radio" name="builder-pagesetup-orientation" checked>
                            <label for="builder-pagesetup-orientation-portrait">Portrait</label>
                        </div>
                        <div class="actions">
                            <input id="builder-pagesetup-orientation-landscape" type="radio" name="builder-pagesetup-orientation" >
                            <label for="builder-pagesetup-orientation-landscape">Landscape</label>
                        </div>
                    </div>
                    <div class="widget">
                        <span class="title">Page Scrolling</span>
                        <div class="actions">
                            <input id="builder-pagesetup-scroll-vertical" type="radio" name="builder-pagesetup-scroll" checked>
                            <label for="builder-pagesetup-scroll-vertical">Vertical</label>
                        </div>
                        <div class="actions">
                            <input id="builder-pagesetup-scroll-horizontal" type="radio" name="builder-pagesetup-scroll" >
                            <label for="builder-pagesetup-scroll-horizontal">Horizontal</label>
                        </div>
                    </div>
                    <div class="widget">
                        <span class="title">Page Size</span>
                        <div class="actions">
                            <input id="builder-pagesetup-pagesize-letter" type="radio" name="builder-pagesetup-pagesize" checked>
                            <label for="builder-pagesetup-pagesize-letter">Letter 8.5 x 11</label>
                        </div>
                        <div class="actions">
                            <input id="builder-pagesetup-pagesize-afour" type="radio" name="builder-pagesetup-pagesize" >
                            <label for="builder-pagesetup-pagesize-afour">A4 8.25 x 11.75</label>
                        </div>
                        <div class="actions">
                            <input id="builder-pagesetup-pagesize-legal" type="radio" name="builder-pagesetup-pagesize" >
                            <label for="builder-pagesetup-pagesize-legal">Legal 8.5 x 17</label>
                        </div>
                    </div>
                    <button id="builder-pagesetup-submit">Save</button>

                </div>
            </div>
            <div id="builder-transferparameter" class="hidden">
                <div class="container">
                    <span class="title">TRANSFER PARAMETER</span>
                    <div class="widget">
                        <span class="title">Name</span>
                        <input id="builder-transferparameter-name" type="text">
                    </div>
                    <div class="widget">
                        <span class="title">Type</span>
                        <select name="" id="builder-transferparameter-type">
                            <option value="single">Single Arrow</option>
                            <option value="double">Double Arrow</option>
                        </select>
                    </div>
                    <div id="builder-transferparameter-container" class="subcontainer">
                        <!-- <div class="widget">
                            <span class="title">Label</span>
                            <input class="label" type="text">
                            <span class="title">Value</span>
                            <input class="value" type="text">
                        </div>
                        <div class="widget">
                            <span class="title">Label</span>
                            <input class="label" type="text">
                            <span class="title">Value</span>
                            <input class="value" type="text">
                        </div> -->
                    </div>
                    <button id="builder-transferparameter-add">Add Property</button>
                    <button id="builder-transferparameter-submit" class="hidden">Save</button>
                    <button id="builder-transferparameter-update" class="hidden">Update</button>
                </div>
            </div>
            <?php include '../../views/builder_datasheet.html' ?>
            <div id="builder-fileoptions" class="hidden">
                <div class="container">
                    <i id="builder-fileoptions-close" class="fas fa-times"></i>
                    <a id="builder-fileoptions-a-download" style="display: none;" href="" download=""></a>
                    <span class="title">File Options</span>

                    <span class="label">Filename</span>
                    <input id="builder-fileoptions-filename" type="text" placeholder="Filename">

                    <button id="builder-fileoptions-download">Download</button>
                    <button id="builder-fileoptions-save">Save</button>
                </div>
            </div>
            <div id="builder-component-view" class="" >
                <i status="closed" id="builder-component-view-h" class="fas fa-eye"></i>
                <span class="hideui hidden">Component View</span>
                <div class="builder-component-view-con hideui hidden" id="builder-component-view-con">
                    <div class="widget">
                        <input class="builder-component-view-a-h" name="builder-component-view-a" id="builder-component-view-default" type="radio" checked>
                        <label for="builder-component-view-default">Default View</label>
                    </div>
                    <div class="widget">
                        <input class="builder-component-view-a-h" name="builder-component-view-a" id="builder-component-view-icon" type="radio">
                        <label for="builder-component-view-icon">Icon Only</label>
                    </div>
                    <hr class="hideui hidden">
                    <div class="widget hideui hidden">
                        <input name="builder-component-view-b" id="builder-component-view-comp-all" type="radio" checked>
                        <label for="builder-component-view-comp-all">Show Unit and Equipment</label>
                    </div>
                    <div class="widget hideui hidden">
                        <input name="builder-component-view-b" id="builder-component-view-comp-unit" type="radio">
                        <label for="builder-component-view-comp-unit">Show Unit Only</label>
                    </div>
                    <div class="widget hideui hidden">
                        <input name="builder-component-view-b" id="builder-component-view-comp-equipment" type="radio">
                        <label for="builder-component-view-comp-equipment">Show Equipment Only</label>
                    </div>
                    <hr class="hideui hidden">
                    <div class="widget hideui hidden">
                        <input id="builder-component-view-datasheet" type="checkbox">
                        <label for="builder-component-view-datasheet">Show Datasheet</label>
                    </div>

                </div>
            </div>
            <div id="builder-print" class="hidden">
                <div class="container">
                    <div class="builder-print-settings">
                        <div class="header">
                            <span class="builder-print-settings-header-h active">Header</span>
                            <hr>
                            <span class="builder-print-settings-header-h">Footer</span>
                        </div>
                        <div class="builder-print-settings-body body header ">
                            <div class="props">
                                <div class="image">
                                    <input id="builder-print-header-browse1" onchange="builder_print_browse(`header-browse1`)" type="file" accept="image/x-png,image/jpeg" style="display: none;">
                                    <img onclick="$('#builder-print-header-browse1').click();" id="builder-print-settings-header-img1" src="https://via.placeholder.com/150x70.png?text=No+Image+Selected" alt="">
                                    <input id="builder-print-header-browse2" onchange="builder_print_browse(`header-browse2`)" type="file" accept="image/x-png,image/jpeg" style="display: none;">
                                    <img onclick="$('#builder-print-header-browse2').click();" id="builder-print-settings-header-img2" src="https://via.placeholder.com/150x70.png?text=No+Image+Selected" alt="">
                                </div>
                                <span class="subtitle">Title</span>
                                <input id="builder-print-settings-header-title" type="text" placeholder="Title">
                                <span class="subtitle">Subtitle</span>
                                <input id="builder-print-settings-header-subtitle" type="text" placeholder="Subtitle">
                                <span class="subtitle">Min Title</span>
                                <input id="builder-print-settings-header-mintitle" type="text" placeholder="Min Title">
                                <span class="subtitle">Layout</span>
                            </div>
                            <div class="layout">
                                <div class="widget">
                                    <input tid="1" type="radio" name="builder-print-settings-layout" checked>
                                    <img onclick="builder_print_settings_layout_image_h(this);" src="lib/images/printlayouts/header1.png" alt="">
                                </div>
                                <div class="widget">
                                    <input tid="2" type="radio" name="builder-print-settings-layout" >
                                    <img onclick="builder_print_settings_layout_image_h(this);" src="lib/images/printlayouts/header2.png" alt="">
                                </div>
                                <div class="widget">
                                    <input tid="3" type="radio" name="builder-print-settings-layout" >
                                    <img onclick="builder_print_settings_layout_image_h(this);" src="lib/images/printlayouts/header3.png" alt="">
                                </div>
                                <div class="widget">
                                    <input tid="4" type="radio" name="builder-print-settings-layout" >
                                    <img onclick="builder_print_settings_layout_image_h(this);" src="lib/images/printlayouts/header4.png" alt="">
                                </div>
                                <div class="widget">
                                    <input tid="5" type="radio" name="builder-print-settings-layout" >
                                    <img onclick="builder_print_settings_layout_image_h(this);" src="lib/images/printlayouts/header5.png" alt="">
                                </div>
                            </div>
                            <button id="builder-print-header-save" >Save</button>
                        </div>
                        <div class="builder-print-settings-body body footer hidden">
                            <div class="props">
                                <div class="image">
                                    <input id="builder-print-footer-browse1" onchange="builder_print_browse(`footer-browse1`)" type="file" accept="image/x-png,image/jpeg" style="display: none;">
                                    <img onclick="$('#builder-print-footer-browse1').click();" id="builder-print-settings-footer-img1" src="https://via.placeholder.com/150x70.png?text=No+Image+Selected" alt="">
                                </div>
                                <span class="subtitle">Title</span>
                                <input id="builder-print-settings-footer-title" type="text" placeholder="Title">
                            </div>
                            <div class="layout">
                                <div class="widget">
                                    <input tid="1" type="radio" name="builder-print-settings-layout-f" checked>
                                    <img onclick="builder_print_settings_layout_image_f(this);" src="lib/images/printlayouts/footer1.png" alt="">
                                </div>
                                <div class="widget">
                                    <input tid="2" type="radio" name="builder-print-settings-layout-f" >
                                    <img onclick="builder_print_settings_layout_image_f(this);" src="lib/images/printlayouts/footer2.png" alt="">
                                </div>
                            </div>
                            <button id="builder-print-footer-save">Save</button>
                        </div>
                    </div>
                    <div class="builder-print-preview">
                        <div class="header">
                            <input id="builder-print-preview-header-visibility" type="checkbox">
                            <label for="builder-print-preview-header-visibility">Show Header</label>
                            <input id="builder-print-preview-footer-visibility" type="checkbox">
                            <label for="builder-print-preview-footer-visibility">Show Footer</label>
                        </div>
                        <div id="builder-print-preview-container" class="builder-area-page-print-preview">

                        </div>
                        <button id="builder-print-preview-print" >Print</button>
                    </div>
                </div>
            </div>
            <i id="builder-forms" class="fab fa-wpforms"></i>
            
            
            
            

            

            <!-- <div class="unit-widget" >
                <i id="${zid}-arrow-top" class="unit-widget-arrow-h top far fa-circle"></i>
                <i id="${zid}-arrow-bottom" class="unit-widget-arrow-h bottom far fa-circle"></i>
                <i id="${zid}-arrow-left" class="unit-widget-arrow-h left far fa-circle"></i>
                <i id="${zid}-arrow-right" class="unit-widget-arrow-h right far fa-circle"></i>
                <img class="unit-widget-action-maximize hidden" src="lib/images/avatardefault.png" alt="">
                <div class="actions">
                    <i class="unit-widget-action-minimize fas fa-window-minimize"></i>
                    <i class="unit-widget-action-delete fas fa-trash"></i>
                    <i class="unit-widget-action-save fas fa-save"></i>
                    <i class="unit-widget-action-details fas fa-sliders-h"></i>
                </div>
                <legend>Sub Unit 1 is too long</legend>
                <div id="${zid}" class="equipment-widget">
                    <span class="title"><img src="lib/images/avatardefault.png" alt="">${text}</span>
                    <div class="params">
                        <span class="title">Volume</span>
                        <span class="content">45 L</span>
                    </div>
                    <div class="params">
                        <span class="title">Area</span>
                        <span class="content">462 sqft</span>
                    </div>
                    <div class="params">
                        <span class="title">Circumference</span>
                        <span class="content">4.2 Rad</span>
                    </div>
                    <i id="${zid}-arrow-top" class="equipment-widget-arrow-h top far fa-circle"></i>
                    <i id="${zid}-arrow-bottom" class="equipment-widget-arrow-h bottom far fa-circle"></i>
                    <i id="${zid}-arrow-left" class="equipment-widget-arrow-h left far fa-circle"></i>
                    <i id="${zid}-arrow-right" class="equipment-widget-arrow-h right far fa-circle"></i>
                </div>
                <div id="${zid}" class="equipment-widget">
                    <span class="title"><img src="lib/images/avatardefault.png" alt="">${text}</span>
                    <div class="params">
                        <span class="title">Volume</span>
                        <span class="content">45 L</span>
                    </div>
                    <div class="params">
                        <span class="title">Area</span>
                        <span class="content">462 sqft</span>
                    </div>
                    <div class="params">
                        <span class="title">Circumference</span>
                        <span class="content">4.2 Rad</span>
                    </div>
                    <i id="${zid}-arrow-top" class="equipment-widget-arrow-h top far fa-circle"></i>
                    <i id="${zid}-arrow-bottom" class="equipment-widget-arrow-h bottom far fa-circle"></i>
                    <i id="${zid}-arrow-left" class="equipment-widget-arrow-h left far fa-circle"></i>
                    <i id="${zid}-arrow-right" class="equipment-widget-arrow-h right far fa-circle"></i>
                </div>
                <div class="params ">
                    <div class="params-widget">
                        <span class="title">Process</span>
                        <span class="content">${zprocess}</span>
                    </div>
                    <div class="params-widget">
                        <span class="title">Tag</span>
                        <span class="content">${tag}</span>
                    </div>
                </div>
            </div> -->

            

        </div>
        <div id="builder-my" class="hidden">
            <div class="container">
                <i id="builder-my-close" class="fas fa-times"></i>
                <span class="title">My Skids</span>
                <div id="builder-my-widget-con">
                    <div class="widget builder-my-widget">
                        <span>Filename</span>
                        <div class="actions">
                            <i class="builder-my-widget-open fas fa-external-link-alt" title="Open File"></i>
                            <i class="builder-my-widget-delete fas fa-trash" title="Delete File"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="builder-form-con" class="hidden">
            <div class="container list">
                <div class="header">
                    <span class="title">FORMS
                        <!-- <label class="btn-shadow"> <input type="checkbox" chekced> Show Tags </label> -->
                        <!-- <label class="btn-shadow"> <input type="checkbox"> Show Connections </label> -->
                    </span>
                    <div class="actions">
                        <span id="builder-form-a-close" class="hidden btn-shadow">Close</span>
                        <span id="builder-form-a-done" class="hidden btn-shadow">Done</span>
                        <span id="builder-form-a-create" class="hidden btn-shadow">Create Forms</span>
                        <!-- <span class="hidden btn-shadow">Form Connect</span> -->
                        <span id="builder-form-a-view" class="hidden btn-shadow">View Forms</span>
                        <span id="builder-form-a-save" class="hidden btn-shadow super">Save</span>
                    </div>
                </div>
                <div class="content">

                    <div class="builder-form-comp builder-form-comp-view hidden list super forms">
                        <span class="title">Form List &nbsp; <label><input type="checkbox" ftype="datasheet" class="builder-form-comp-view-header-options" checked>Datasheets</label> <label><input type="checkbox" ftype="protocol" class="builder-form-comp-view-header-options" checked>Protocols</label> </span>
                        <div class="search-filter">
                            <label><input type="checkbox" checked >Filename</label>
                            <label><input type="checkbox" checked >Creator</label>
                            <label><input type="checkbox" checked >Names</label>
                            <label><input type="checkbox" checked >Properties</label>
                            <label><input type="checkbox" checked >DS Labels</label>
                        </div>
                        <div class="search">
                            <input type="text" placeholder="Search Datasheet or Protocol">
                            <button class="btn-shadow">Go</button>
                        </div>
                        <div id="builder-form-comp-view-formlist" class="widget-con">

                            <div class="builder-form-list-widget">
                                <span class="title">Document Name</span>
                                <div class="wcontent ">
                                    <span>Doc 1</span>
                                    <span>Doc 2</span>
                                    <span>Doc 3</span>
                                    <span>Doc 4</span>
                                    <span>Doc 5</span>
                                </div>
                            </div>
                            <div class="builder-form-list-widget">
                                <span class="title">Document Name</span>
                                <div class="wcontent ">
                                    <span>Doc 1</span>
                                    <span>Doc 2</span>
                                    <span>Doc 3</span>
                                    <span>Doc 4</span>
                                    <span>Doc 5</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="builder-form-comp builder-form-comp-view hidden list properties">
                        <span class="title">Properties</span>
                        <div id="builder-form-comp-view-properties" class="widget-con">

                            <div class="builder-form-props-widget">
                                <span class="label">Label</span>
                                <div class="value">
                                    <span>Value</span>
                                </div>
                            </div>
                            <div class="builder-form-props-widget">
                                <span class="label">Label</span>
                                <div class="value">
                                    <span>Value is too long and what the heck is wrong with this keybvoard idk man it seems like it was broken due to some conflicts with the driver</span>
                                </div>
                            </div>
                            <div class="builder-form-props-widget">
                                <span class="label">Label</span>
                                <div class="value">
                                    <span>Value1</span>
                                    <span>Value2</span>
                                    <span>Value3</span>
                                </div>
                            </div>
                            <button class="btn-shadow">OPEN FORM</button>

                        </div>

                    </div>
                    <div class="builder-form-comp builder-form-comp-view hidden columncontainer super">

                        <div class="builder-form-comp-connect  list-collapse w100 fconnect">
                            <span class="title">Relations</span>
                            <div id="builder-form-comp-connect-relations" class="widget-con type1">
                                <!-- <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-17687</span>
                                <span>CU-1768769</span>
                                <span>CU-176876978</span>
                                <span>CU-1768778</span>
                                <span>CU-17687978</span>
                                <span>CU-176876978</span>
                                <span>CU-17687978</span>
                                <span>CU-6978</span>
                                <span>CU-176878</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span> -->
                            </div>
                        </div>
                        <div class="builder-form-comp-connect  list-collapse w100 fconnect">
                            <span class="title">Connections</span>
                            <div id="builder-form-comp-connect-connections" class="widget-con type1">
                                <!-- <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-17687</span>
                                <span>CU-1768769</span>
                                <span>CU-176876978</span>
                                <span>CU-1768778</span>
                                <span>CU-17687978</span>
                                <span>CU-176876978</span>
                                <span>CU-17687978</span>
                                <span>CU-6978</span>
                                <span>CU-176878</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span> -->
                            </div>
                        </div>
                        <div class="builder-form-comp-connect  list-collapse w100 fconnect">
                            <span class="title">Tags</span>
                            <div id="builder-form-comp-connect-tags" class="widget-con type1">
                                <!-- <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-17687</span>
                                <span>CU-1768769</span>
                                <span>CU-176876978</span>
                                <span>CU-1768778</span>
                                <span>CU-17687978</span>
                                <span>CU-176876978</span>
                                <span>CU-17687978</span>
                                <span>CU-6978</span>
                                <span>CU-176878</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span>
                                <span>CU-176876978</span> -->
                            </div>
                        </div>
                        
                    
                    </div>

                    <div class="builder-form-comp builder-form-comp-create hidden builder-form-widget">

                        <div class="header">
                            <div class="header-widget w50">
                                <span>Filename</span>
                                <input id="builder-form-comp-create-filename" type="text" placeholder="Filename">
                            </div>
                            <div class="header-widget">
                                <span>Type</span>
                                <div>
                                    <label message="Clicking this will reset the form into a datasheet type." ><input type="radio" ftype="datasheet" name="builder-form-header-type" checked>Datasheet</label>
                                    <label message="Clicking this will reset the form into a protocol type."><input type="radio" ftype="protocol" name="builder-form-header-type">Protocol</label>
                                </div>
                            </div>
                            <div class="header-widget">
                                <span>Columns</span>
                                <div>
                                    <i id="builder-form-comp-create-removecolumn" class="fas fa-minus"></i>
                                    <input id="builder-form-comp-create-columncount" mem="num" type="text" value="2" disabled>
                                    <i id="builder-form-comp-create-addcolumn" class="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                        <div class="container builder-form-comp-create-view"> 

                            <div id="builder-form-comp-create-view-widget-container" class="content ">

                                <div class="content-widget">
                                    <div class="header">
                                        <span class="builder-form-comp-create-view-widget-header-h">Documentation</span>
                                        <i class="builder-form-comp-create-view-widget-header-a fas fa-eye"></i>
                                    </div>
                                    <div class="values-con hidden">
                                        <div class="values-widget-header">
                                            <input class="builder-form-comp-create-content-header" />
                                            <input class="builder-form-comp-create-content-header" />
                                            <input class="builder-form-comp-create-content-header" />
                                            <input class="builder-form-comp-create-content-header" />
                                            <i></i>
                                        </div>
                                        <div class="values-widget">
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>
                                        <div class="values-widget">
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>
                                        <div class="values-widget">
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>
                                        <div class="values-widget">
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <span class="builder-form-comp-create-content-cell"></span>
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>

                                    </div>
                                </div>

                                <div class="content-widget">
                                    <div class="header">
                                        <span class="builder-form-comp-create-view-widget-header-h">Specification</span>
                                        <i class="builder-form-comp-create-view-widget-header-a fas fa-eye"></i>
                                    </div>
                                    <div class="values-con hidden">
                                        <div class="values-widget">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>
                                        <div class="values-widget">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>
                                        <div class="values-widget">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>
                                        <div class="values-widget">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <input type="text" value="">
                                            <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                                        </div>

                                    </div>
                                </div>

                                <div class="content-widget-notes">
                                    <span class="subtitle">Notes</span>
                                    <textarea id="builder-form-comp-create-notes"  placeholder="Notes"></textarea>
                                </div>

                                <div class="content-add-widget">
                                    <input type="text" placeholder="Add Custom Sheet">
                                    <button id="builder-form-comp-create-view-widget-add" class="btn-shadow">Add</button>
                                </div>

                            </div>
                            <div class="connect">
                                <div class="header">
                                    <span class="active builder-form-comp-create-view-connect-h" ts="search" >Search</span>
                                    <span class="builder-form-comp-create-view-connect-h" ts="relations" >Relations</span>
                                    <span class="builder-form-comp-create-view-connect-h" ts="connections" >Connections</span>
                                    <span class="builder-form-comp-create-view-connect-h" ts="tags" >Tags</span>
                                </div>
                                <div class="builder-form-comp-create-view-connect-content content hidden search hidden">
                                    <div class="header">
                                        <div class="search-filter">
                                            <label><input id="builder-form-comp-create-view-connect-search-filename" type="checkbox" checked >Filename</label>
                                            <label><input id="builder-form-comp-create-view-connect-search-creator" type="checkbox" checked >Creator</label>
                                            <label><input id="builder-form-comp-create-view-connect-search-names" type="checkbox" checked >Sheet Names</label>
                                            <label><input id="builder-form-comp-create-view-connect-search-properties" type="checkbox" checked >Values</label>
                                            <label><input id="builder-form-comp-create-view-connect-search-headers" type="checkbox" checked >Headers</label>
                                            <label><input id="builder-form-comp-create-view-connect-search-tags" type="checkbox" checked >Tags</label>
                                        </div>
                                        <div class="search">
                                            <input type="text" placeholder="Search Datasheet or Protocol">
                                            <button id="builder-form-comp-create-view-connect-search-s" class="btn-shadow">Go</button>
                                        </div>
                                    </div>
                                    <div id="builder-form-comp-create-view-connect-search-container" class="content">

                                        <div class="widget">
                                            <label class="title"><input type="checkbox"> Title</label>
                                            <div class="wcontent">
                                                <span>this is awesome</span>
                                            </div>
                                        </div>
                                        <div class="widget">
                                            <label class="title"><input type="checkbox"> Title</label>
                                            <div class="wcontent">
                                                <span>this is awesome</span>
                                            </div>
                                        </div>

                                    </div>
                                    <button id="builder-form-comp-create-view-connect-search-submit" class="btn-shadow">Add Relations</button>

                                </div>
                                <div id="builder-form-comp-create-view-connect-relation-container" class="builder-form-comp-create-view-connect-content content relations hidden">
                                    <!-- <div class="widget">
                                        <span>Filename 1</span>
                                        <button fid="AAAAA" class="btn-shadow builder-form-comp-create-view-connect-openf">Open</button>
                                    </div>
                                    <div class="widget">
                                        <span>Filename 3</span>
                                        <button fid="BBBBB" class="btn-shadow builder-form-comp-create-view-connect-openf">Open</button>
                                    </div>
                                    <div class="widget">
                                        <span>Filename 3</span>
                                        <button fid="CCCCC" class="btn-shadow builder-form-comp-create-view-connect-openf">Open</button>
                                    </div>
                                    <div class="widget">
                                        <span>Filename 4</span>
                                        <button fid="DDDDD" class="btn-shadow builder-form-comp-create-view-connect-openf">Open</button>
                                    </div> -->
                                </div>
                                <div class="builder-form-comp-create-view-connect-content content open hidden">
                                    <div class="header">
                                        <span id="builder-form-comp-create-view-connect-searchopen-filename" class="filename">Filename 1</span>
                                        <div class="actions">
                                            <i id="builder-form-comp-create-view-connect-searchopen-refresh" data-descr="Will Fetch Current Content from Database and Refresh UI." class="fas fa-sync-alt"></i>
                                            <i data-descr="&ldquo;Select and Drag&rdquo; a property and &ldquo;Drop&rdquo; to the green colored sheets on the left. Click on this icon for more help." class="fas fa-info-circle"></i>
                                            <i id="builder-form-comp-create-view-connect-searchopen-close" class="fas fa-times"></i>
                                        </div>
                                    </div>
                                    <div id="builder-form-comp-create-view-connect-searchopen-container" class="values">
                                        <div class="builder-form-comp-create-view-connect-open-widget widget">
                                            <span>Value 1</span>
                                            <span>Value 2</span>
                                            <span>Value 3</span>
                                            <span>Value 4</span>
                                        </div>
                                        <div class="builder-form-comp-create-view-connect-open-widget widget">
                                            <span>Value 1</span>
                                            <span>Value 2</span>
                                            <span>Value 3</span>
                                            <span>Value 4</span>
                                        </div>
                                        <div class="builder-form-comp-create-view-connect-open-widget widget">
                                            <span>Value 1</span>
                                            <span>Value 2</span>
                                        </div>
                                        <div class="builder-form-comp-create-view-connect-open-widget widget">
                                            <span>Value 1</span>
                                            <span>Value 2</span>
                                            <span>Value 3</span>
                                        </div>
                                        <div class="builder-form-comp-create-view-connect-open-widget widget">
                                            <span>Value 1</span>
                                            <span>Value 2</span>
                                            <span>Value 3</span>
                                            <span>Value 4</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="builder-form-comp-create-view-connect-content content connections ">
                                    <div class="visibility">
                                        <label><input id="builder-form-comp-create-view-connect-connections-view-unit" type="checkbox" checked> Show Units</label>
                                        <label><input id="builder-form-comp-create-view-connect-connections-view-equipment" type="checkbox" checked> Show Equipments</label>
                                        <i data-descr="Form is currently not linked to the Component. Click to Add " class="fas fa-link"></i>
                                        <i data-descr="Form is currently linked to the Component. Click to Remove" class="fas fa-unlink"></i>
                                    </div>
                                    <div class="search">
                                        <input type="text" placeholder="Search Units and Equipments">
                                        <button class="btn-shadow">Go</button>
                                    </div>
                                    <div id="builder-form-comp-create-view-connect-connections-widgetcon" class="widget-container">
                                        
                                        <div class="widget">
                                            <img src="lib/images/skidicons/1.png">
                                            <span class="title">Unit Title</span>
                                            <i class="fas fa-link"></i>
                                        </div>
                                        <div class="widget">
                                            <img src="lib/images/skidicons/1.png">
                                            <span class="title">Unit Title</span>
                                            <i class="fas fa-link"></i>
                                        </div>

                                    </div>
                                </div>
                                <div class="builder-form-comp-create-view-connect-content content tags hidden">
                                    <div class="addtag">
                                        <input type="text" placeholder="Tag Name">
                                        <button id="builder-form-comp-create-view-tag-add" class="btn-shadow">Add Tag</button>
                                    </div>
                                    <div id="builder-form-comp-create-view-tag-container" class="tag-container">
                                        <div class="widget">
                                            <span>Tagname</span>
                                            <i class="fas fa-trash" onclick="tagRemoveParent(this);" ></i>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div id="builder-form-comp-create-cellpopup" class="cellpopup hidden">
                            <div class="form">
                                <i class="fas fa-times"></i>
                                <br>
                                <span class="subtitle">Type</span>
                                <select id="builder-form-comp-create-cellpopup-type">
                                    <option value="text" selected>Text</option>
                                    <option value="numeric">Numeric</option>
                                </select>
                                <span class="subtitle">Name (Optional)</span>
                                <input id="builder-form-comp-create-cellpopup-name" type="text" placeholder="Name">

                                <div id="builder-form-comp-create-cellpopup-type-text" class="cellpopup-con text-con ">
                                    <span class="subtitle">Value</span>
                                    <input id="builder-form-comp-create-cellpopup-text" type="text" placeholder="Value">
                                </div>

                                <div id="builder-form-comp-create-cellpopup-type-numeric" class="cellpopup-con numeric-con hidden">
                                    <span class="subtitle">Measurement</span>
                                    <input id="builder-form-comp-create-cellpopup-measurement" type="text" placeholder="Measurement">
                                    <span class="subtitle">Min Value</span>
                                    <input id="builder-form-comp-create-cellpopup-min" type="text" placeholder="Min Value">
                                    <span class="subtitle">Max Value</span>
                                    <input id="builder-form-comp-create-cellpopup-max" type="text" placeholder="Max Value">
                                    <span class="subtitle">Set Point</span>
                                    <input id="builder-form-comp-create-cellpopup-setpoint" type="text" placeholder="Set Point">
                                </div>
                                <button id="builder-form-comp-create-cellpopup-submit" class="btn-shadow">Save</button>
                                <button id="builder-form-comp-create-cellpopup-delete" class="btn-shadow">Delete</button>



                            </div>
                        </div>

                    </div>


                </div>

                

            </div>
        </div>
        <div id="builder-area-forms" class="hidden">
            <div class="container">
                <i id="builder-area-forms-close" class="fas fa-times"></i>
                <!-- <i data-descr="awesome" class="far fa-question-circle"></i> -->
                <div class="header">
                    <img src="lib/images/skidicons/1.png" alt="">
                    <span class="title">Sub Unit 1 (framework only - under construction)</span>
                </div>
                <div id="builder-area-forms-formlist" class="formlist">
                    <span formid="${value}" class="builder-area-forms-formlist-h form active">Form 1</span>
                    <span class="builder-area-forms-formlist-h form">Form 1</span>
                    <span class="builder-area-forms-formlist-h form">Form 1</span>
                    <span class="builder-area-forms-formlist-h form">Form 1</span>
                    <span id="builder-area-forms-formlist-addform" class="addform">Add Form <i class="fas fa-plus"></i> </span>
                </div>
                <div id="builder-area-forms-formvalues" class="formvalues">

                    <div class="widget">
                        <span class="title">MODIFICATION</span>
                        <div class="content">
                            <div class="row header">
                                <span>Header</span>
                                <span>Header</span>
                                <span>Header</span>
                                <span>Header</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                        </div>
                    </div>
                    <div class="widget">
                        <span class="title">IDENTIFICATION</span>
                        <div class="content">
                            <div class="row header">
                                <span>Header</span>
                                <span>Header</span>
                                <span>Header</span>
                                <span>Header</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                            <div class="row">
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                                <span>Hello</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button id="builder-area-forms-edit" class="btn-shadow">Edit Form</button>
                    <button class="btn-shadow">Remove Connection</button>
                </div>
            </div>
        </div>
        <div id="builder-report" class="hidden">
            <div class="container">
                <div class="header">
                    <span class="title">Skid File Report</span>
                    <div class="actions">
                        <i id="builder-report-print" fcolor="green" message="Prints all the Report. You may save the file as pdf from here." class="fas fa-print"></i>
                        <i id="builder-report-close" message="Close the UI." class="fas fa-times"></i>
                    </div>
                </div>
                <div id="builder-report-container" class="content">
                    <!-- <div class="properties">
                        <div class="widget">
                            <span class="filename">Kaminari</span>
                            <span class="fileid">LAg8yabs98aoi</span>
                        </div>
                        <div class="widget">
                            <span class="label">Creator</span>
                            <span class="value">C-768716512</span>
                        </div>
                        <div class="widget">
                            <span class="label">Version</span>
                            <span class="value">V.15691876</span>
                        </div>
                        <div class="widget">
                            <span class="label">Last Modified</span>
                            <span class="value">2021-51-52</span>
                        </div>
                        <div class="widget">
                            <span class="label">Lock Status</span>
                            <span class="value">locked</span>
                        </div>
                    </div> -->
                    <!-- <span class="title">Units</span>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>SubUnit2</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>id</span></td>
                                <td><span>CU-653852346</span></td>
                            </tr>
                            <tr>
                                <td><span>subunitid</span></td>
                                <td><span>SSU-561211507</span></td>
                            </tr>
                            <tr>
                                <td><span>unitid</span></td>
                                <td><span>SU-753340582</span></td>
                            </tr>
                            <tr>
                                <td><span>Label</span></td>
                                <td><span>Value</span></td>
                            </tr>
                            <tr>
                                <th colspan="2" class="center">Properties</th>
                            </tr>
                            <tr>
                                <td><span>name</span></td>
                                <td><span>Volume</span></td>
                            </tr>
                            <tr>
                                <td><span>type</span></td>
                                <td><span>numeric</span></td>
                            </tr>
                            <tr>
                                <td><span>content</span></td>
                                <td><span>min: 10, max:20, setpoint: 30</span></td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <br>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>SubUnit2</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>id</span></td>
                                <td><span>CU-653852346</span></td>
                            </tr>
                            <tr>
                                <td><span>subunitid</span></td>
                                <td><span>SSU-561211507</span></td>
                            </tr>
                            <tr>
                                <td><span>unitid</span></td>
                                <td><span>SU-753340582</span></td>
                            </tr>
                            <tr>
                                <td><span>Label</span></td>
                                <td><span>Value</span></td>
                            </tr>
                            <tr>
                                <th colspan="2">Properties</th>
                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>name</span></td>
                                            <td><span>Volume</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>type</span></td>
                                            <td><span>numeric</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>content</span></td>
                                            <td><span>min: 10, max:20, setpoint: 30</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>name</span></td>
                                            <td><span>Volume</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>type</span></td>
                                            <td><span>numeric</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>content</span></td>
                                            <td><span>min: 10, max:20, setpoint: 30</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>name</span></td>
                                            <td><span>Volume</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>type</span></td>
                                            <td><span>numeric</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>content</span></td>
                                            <td><span>min: 10, max:20, setpoint: 30</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>name</span></td>
                                            <td><span>Volume</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>type</span></td>
                                            <td><span>numeric</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>content</span></td>
                                            <td><span>min: 10, max:20, setpoint: 30</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                        </tbody>
                    </table>
                    <br> -->
                    <!-- <span class="title">Unit Transfer Parameters</span>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2" class="title center">
                                    <span>Q</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>id</span></td>
                                <td><span>CUT-650642676</span></td>
                            </tr>
                            <tr>
                                <td><span>origin</span></td>
                                <td><span>CU-210773544-arrow-bottom</span></td>
                            </tr>
                            <tr>
                                <td><span>destination</span></td>
                                <td><span>CU-653852346-arrow-top</span></td>
                            </tr>
                            <tr>
                                <td><span>type</span></td>
                                <td><span>single arrow</span></td>
                            </tr>
                            <tr>
                                <th colspan="2" class="center bold">Properties</th>
                            </tr>
                            <tr>
                                <td><span>name</span></td>
                                <td><span>Volume</span></td>
                            </tr>
                            <tr>
                                <td><span>content</span></td>
                                <td><span>Extra Long Text</span></td>
                            </tr>
                        </tbody>
                    </table> -->
                    <!-- <span class="title">Component Heirarchy</span>
                    <table>
                        <thead>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>Sub Unit 1</span>
                                </th>
                            </tr>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>Sub Unit 1</span>
                                </th>
                            </tr>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>Sub Equipment 1</span>
                                </th>
                            </tr>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>Sub Unit 1</span>
                                </th>
                            </tr>
                            <tr>
                                <th colspan=2>
                                    <img src="lib/images/skidicons/1.png" alt="">
                                    <span>Sub Unit 1</span>
                                </th>
                            </tr>
                        </thead>
                    </table> -->
                    <!-- <span class="title">Datasheet Forms</span>
                    <table>
                        <thead>
                            <tr>
                                <td colspan=2 class="title center">
                                    <span>Shotoroki</span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>id</span></td>
                                <td><span>yz1WM0Kgfm43ksU</span></td>
                            </tr>
                            <tr>
                                <td><span>creator</span></td>
                                <td><span>noel</span></td>
                            </tr>
                            <tr>
                                <td><span>createdate</span></td>
                                <td><span>2021-08-04 01:22:44</span></td>
                            </tr>
                            <tr>
                                <td><span>modifydate</span></td>
                                <td><span>2021-08-04 10:58:47</span></td>
                            </tr>
                            <tr>
                                <td><span>columncount</span></td>
                                <td><span>2</span></td>
                            </tr>
                            
                            <tr>
                                
                                <table class="border">
                                    <thead>
                                        <tr>
                                            <td colspan="2" class="subtitle center">Tags</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span>Tags 1, Tags 2, Tags 3, Tags 3, Tags 3</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <thead>
                                        <tr>
                                            <td colspan="2" class="subtitle center">Connections</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span>CU-210773544-1, CU-210773544-2, CU-210773544-3, CU-210773544-3, CU-210773544-3</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            

                            <tr>
                                
                                <table class="border">
                                    <thead>
                                        <tr>
                                            <td colspan="2" class="subtitle center">Relations</td>
                                        </tr>
                                    </thead>
                                </table>
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>Filename</span></td>
                                            <td><span>Optimus</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Formid</span></td>
                                            <td><span>LXt8249s50saOEj</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Fileid</span></td>
                                            <td><span>lQNc4Yyni4PM1ao</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>Filename</span></td>
                                            <td><span>Optimus</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Formid</span></td>
                                            <td><span>LXt8249s50saOEj</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Fileid</span></td>
                                            <td><span>lQNc4Yyni4PM1ao</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <tbody>
                                        <tr>
                                            <td><span>Filename</span></td>
                                            <td><span>Optimus</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Formid</span></td>
                                            <td><span>LXt8249s50saOEj</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Fileid</span></td>
                                            <td><span>lQNc4Yyni4PM1ao</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <thead>
                                        <tr>
                                            <td colspan="2" class="subtitle center">IDENTIFICATION</td>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <td class="center bold"><span>AAA Header 1</span></td>
                                            <td class="center bold"><span>AAA Header 2</span></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <thead>
                                        <tr>
                                            <td colspan="2" class="subtitle center">SPECIFICATION</td>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <td class="center bold"><span>AAA Header 1</span></td>
                                            <td class="center bold"><span>AAA Header 2</span></td>
                                            <td class="center bold"><span>AAA Header 2</span></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                        <tr>
                                            <td class="center"><span>Value 1</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                            <td class="center"><span>Value 2</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                            <tr>
                                
                                <table class="border">
                                    <thead>
                                        <tr>
                                            <td colspan="2" class="subtitle center">NOTES</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="2" class="regular start" ><span>SKid Notes is really awesome</span></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </tr>
                           
                        </tbody>
                    </table> -->
              
                    

                </div>
            </div>
        </div>


        <?php 
            include '../../views/builder_compare.html';
        ?>

    </div>
    



    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/jquery.drawsvg.js" type="text/javascript"></script>

    <!-- <script src="https://cdn.jsdelivr.net/npm/jstat@1.9.2/dist/jstat.min.js"></script> 
    <script src="https://cdn.jsdelivr.net/gh/formulajs/formulajs@2.5.0/dist/formula.min.js"></script> -->


    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="lib/js/builder.js" type="text/javascript"></script>


    <!-- <script src="<?php echo $controlLocation ?>controllers/js/api_account.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>controllers/js/api_complains.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>controllers/js/api_project.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>lib/js/alert.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>model/classes/class_account.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>model/classes/class_company.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>model/classes/class_complains.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>model/classes/class_alert.js" type="text/javascript"></script>
    <script src="<?php echo $controlLocation ?>model/classes/class_project.js" type="text/javascript"></script> -->


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
    <script src="lib/js/date_fns.min.js" type="text/javascript"></script>

</body>
</html>