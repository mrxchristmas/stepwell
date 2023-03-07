<html lang="en">
<?php
  include "../../controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doc Flow</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/default.css" rel="stylesheet" /> 
    <link href="lib/css/docflow.css" rel="stylesheet" /> 


</head>
<body onload="init()">
    <?php
        include "../../views/bodydefaults.html";
    ?>

    <?php
        include "../../views/docflownav.html";
    ?>
    
    <div id="content">
        <?php
            include "../../views/contentdefaults.html";
        ?>
        <div class="dashboard-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="dashboard-header">

                    <div name="document-proofread-con" status="idle" class="dashboard-header-widget color-proofread">
                        <span class="dashboard-header-widget-title">Docs for Proofreading</span>
                        <div class="dashboard-header-widget-content">
                            <!-- <span>Active: 1</span>
                            <span>Inactive: 12</span> -->
                            <i class="fas fa-spinner"></i>
                        </div>
                    </div>
                    <div name="document-review-con" status="idle" class="dashboard-header-widget color-review">
                        <span class="dashboard-header-widget-title">Docs for Review</span>
                        <div class="dashboard-header-widget-content">
                            <!-- <span>Active: 1</span>
                            <span>Inactive: 12</span> -->
                            <i class="fas fa-spinner"></i>
                        </div>
                    </div>
                    <div name="document-approve-con" status="idle" class="dashboard-header-widget color-approve">
                        <span class="dashboard-header-widget-title">Docs for Approval</span>
                        <div class="dashboard-header-widget-content">
                            <!-- <span>Active: 1</span>
                            <span>Inactive: 12</span> -->
                            <i class="fas fa-spinner"></i>
                        </div>
                    </div>
                    <div name="document-postapprove-con" status="idle" class="dashboard-header-widget color-postapprove">
                        <span class="dashboard-header-widget-title">Docs for Post Approval</span>
                        <div class="dashboard-header-widget-content">
                            <!-- <span>Active: 1</span>
                            <span>Inactive: 12</span> -->
                            <i class="fas fa-spinner"></i>
                        </div>
                    </div>

                </div>
                <div class="dashboard-body">
                    <div class="documents-content">
                        <div class="documents-body">
                            <div class="documents-list color-sc">
                                <div class="documents-list-searchbox">
                                    <input id="documents-list-searchbox-tbox" type="text" placeholder="Search Doc Name" >
                                </div>
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
                                        <i class="fas fa-times documents-prefs-close"></i>
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
                                <div class="documents-prefs-edits">
                                    <a id="documents-prefs-edits-download" href="" style="display: none;" download></a>
                                        
                                    <div id="documents-prefs-edits-properties" class="documents-prefs-edits-widget color-sc">
                                        <span class="documents-prefs-edits-widget-icon"><i class="fas fa-file-signature"></i></span>
                                        <span class="documents-prefs-edits-widget-title">Edit Properties</span>
                                    </div>
                                    
                                    <div id="documents-prefs-edits-checkout" class="documents-prefs-edits-widget color-sc">
                                        <span class="documents-prefs-edits-widget-icon"><i class="fas fa-file-download"></i></span>
                                        <span class="documents-prefs-edits-widget-title">Checkout</span>
                                    </div>
                                    
                                    <div id="documents-prefs-edits-docflow" class="documents-prefs-edits-widget color-sc">
                                        <span class="documents-prefs-edits-widget-icon"><i class="fas fa-share"></i></span>
                                        <span class="documents-prefs-edits-widget-title">Send to Docflow</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dashboard-con-documents-edit documents-edit">
            <div class="documents-edit-header-con color-sc">
                <span class="documents-edit-title">Document Edit Properties</span>
                <span class="documents-edit-showid">D-1276512512</span>
                <span class="documents-edit-version">version 0.1</span>
                <i class="fas fa-times dashboard-con-documents-edit-close"></i>
            </div>
            <div class="documents-edit-title-con color-sc">
                <input id="documents-edit-title" type="text" placeholder="Please Enter a Meaningful Document Title">
                <button id="documents-edit-title-submit" class="btn-shadow">Update</button>
            </div>
            <div class="documents-edit-reference-con color-sc">
                <input id="documents-edit-reference" type="text" placeholder="Please Enter a Correct Reference Number (optional)">
                <button id="documents-edit-reference-submit" class="btn-shadow">Update</button>
            </div>
            <div class="documents-edit-category-con color-sc">
                <div class="documents-edit-category-widget">
                    <select name="" id="documents-edit-cat1">
                        <option value="0">Category 1</option>
                        <option value="0">Category 2</option>
                        <option value="0">Category 3</option>
                    </select>
                    <select name="" id="documents-edit-cat2">
                        <option value="0">Category 1</option>
                        <option value="0">Category 2</option>
                        <option value="0">Category 3</option>
                    </select>
                    <select name="" id="documents-edit-cat3">
                        <option value="0">Category 1</option>
                        <option value="0">Category 2</option>
                        <option value="0">Category 3</option>
                    </select>
                    <select name="" id="documents-edit-cat4">
                        <option value="0">Category 1</option>
                        <option value="0">Category 2</option>
                        <option value="0">Category 3</option>
                    </select>
                </div>

                <button id="documents-edit-category-submit" class="btn-shadow">Update Document Categories</button>
            </div>

            <!-- // START OF documents-edit-connect-con -->
            <span class="documents-edit-connect-title color-sc">Update Document Directors<i class="fas fa-minus-circle hide"></i><i class="fas fa-question-circle question" title="Select accounts who will be handling this Document on its different stages." ></i></span>
            <button class="documents-edit-connect-show btn-shadow">View</button>
            <div class="documents-edit-connect-con">
                <div class="documents-edit-connect-list color-sc">
                    <input type="text" placeholder="Search Users">
                    <div class="documents-edit-connect-list-widget-con">

                        <div class="documents-edit-connect-list-widget btn-shadow">
                            <span class="documents-edit-connect-list-widget-name">Sample Name1</span>
                            <span class="documents-edit-connect-list-widget-id">U-187655461</span>
                        </div>



                    </div>
                </div>
                <div class="documents-edit-director-con">
                    <div class="documents-edit-director-widget color-sc">
                        <span class="documents-edit-director-widget-title">Draft Creator</span>

                        <div id="documents-edit-director-widget-draft" class="documents-edit-director-widget-list-con">

                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name1</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>
                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name2</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>

                        </div>

                    </div>
                    <div class="documents-edit-director-widget color-sc">
                        <span class="documents-edit-director-widget-title">Proofreader</span>

                        <div id="documents-edit-director-widget-proofread" class="documents-edit-director-widget-list-con">

                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name1</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>
                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name2</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>

                        </div>

                    </div>
                    <div class="documents-edit-director-widget color-sc">
                        <span class="documents-edit-director-widget-title">Reviewer</span>

                        <div id="documents-edit-director-widget-review" class="documents-edit-director-widget-list-con">

                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name1</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>
                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name2</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>

                        </div>

                    </div>
                    <div class="documents-edit-director-widget color-sc">
                        <span class="documents-edit-director-widget-title">Approver</span>

                        <div id="documents-edit-director-widget-approve" class="documents-edit-director-widget-list-con">

                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name1</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>
                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name2</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>

                        </div>

                    </div>
                    <div class="documents-edit-director-widget color-sc">
                        <span class="documents-edit-director-widget-title">Post Approver</span>

                        <div id="documents-edit-director-widget-postapprove" class="documents-edit-director-widget-list-con">

                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name1</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>
                            <div class="documents-edit-director-widget-list btn-shadow">
                                <span class="documents-edit-director-widget-list-name">Sample Name2</span>
                                <span class="documents-edit-director-widget-list-id">U-187655461</span>
                                <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                            </div>

                        </div>

                    </div>
                </div>
            </div><!-- // END OF documents-edit-connect-con -->

            <span class="documents-edit-coowner-title color-sc">Add or Remove Co Author/Owner of Document<i class="fas fa-minus-circle hide"></i><i class="fas fa-question-circle question " title=" Admin can Change the owner of the Document once original Owner of Document is not in the Company for any reason. " ></i></span>
            <button class="documents-edit-coowner-show btn-shadow">View</button>
            <div class="documents-edit-coowner-con">
                <div class="documents-edit-coowner-list color-sc">
                    <input type="text" placeholder="Search Accounts">
                    <div class="documents-edit-coowner-list-widget-con">

                        <div class="documents-edit-coowner-list-widget btn-shadow">
                            <span class="documents-edit-coowner-list-widget-name">Sample Name1</span>
                            <span class="documents-edit-coowner-list-widget-id">U-187655461</span>
                        </div>

                    </div>
                </div>

                <div class="documents-edit-coowner-widget color-sc">
                    <span class="documents-edit-coowner-widget-title">Current Co Author/Owner of Document</span>

                    <div class="documents-edit-coowner-widget-list-con">

                        <div class="documents-edit-coowner-widget-list btn-shadow">
                            <span class="documents-edit-coowner-widget-list-name">Sample Name1</span>
                            <span class="documents-edit-coowner-widget-list-id">U-187655461</span>
                            <i class="documents-edit-coowner-widget-list-remove fas fa-trash"></i>
                        </div>
                        <div class="documents-edit-coowner-widget-list btn-shadow">
                            <span class="documents-edit-coowner-widget-list-name">Sample Name2</span>
                            <span class="documents-edit-coowner-widget-list-id">U-187655461</span>
                            <i class="documents-edit-coowner-widget-list-remove fas fa-trash"></i>
                        </div>

                    </div>

                </div>
            </div><!-- // END OF documents-edit-coowner-con -->

        </div>

        <div htid="document-handle-con" class="document-handle-con hidden nav-maincontainer">
            <div class="nav-content-">
                <span class="document-header color-proofread">Documents for Proofreading</span>
                <div class="document-body">
                    <div class="document-list-con color-sc">
                        <input type="text" placeholder="Search Documents" title="Hello this is a test">
                        <select class="document-list-select">
                            <option value="active">Active Documents</option>
                            <option value="inactive">Inactive Documents</option>
                        </select>
                        <div class="document-list-widget-con">
                            <div class="document-list-widget btn-shadow">
                                <span class="document-list-widget-title">Document Title1</span>
                                <span class="document-list-widget-id">D-1234asdasd</span>
                            </div>
                            <div class="document-list-widget btn-shadow">
                                <span class="document-list-widget-title">Document Title2</span>
                                <span class="document-list-widget-id">D-123gasddg</span>
                            </div>
                        </div>
                    </div>
                    <div class="document-prefs-con">
                        <div class="document-prefs-properties color-sc">
                            <span id="selected-document" docid="D-0000000000" version="0.1" hidden></span>
                            <span class="document-prefs-properties-title">Document Title</span>
                            <span class="document-prefs-properties-id">D-000000000</span>
                            <span class="document-prefs-properties-version">version 0.1</span>
                            <br>
                            <span class="document-prefs-properties-owner"><b>Owner ID: </b> U-127398712897</span>
                            <span class="document-prefs-properties-reference"><b>Reference ID: </b> U-127398712897</span>
                            
                            <div class="document-prefs-properties-timestamps">
                                <span class="document-prefs-properties-timestamps-title">Timestamps</span>
                                <span class="document-prefs-properties-timestamps-date"><b>Draft: </b> July 2 2020</span>
                                <span class="document-prefs-properties-timestamps-date"><b>Proofread: </b> July 2 2020</span> 
                            </div>
                        </div>
                        <div class="document-prefs-properties-history color-sc">
                            <span class="document-prefs-properties-history-title">Document History</span>

                            <!-- <span class="document-prefs-properties-history-event"><b>Checkin: </b> U-876726626 &nbsp;<i class="fas fa-comment-alt document-prefs-properties-history-comments"></i><i class="fas fa-download" ></i></span> 
                            <span class="document-prefs-properties-history-event"><b>Action: </b> Rejected &nbsp;<i class="fas fa-comment-alt document-prefs-properties-history-comments"></i></span>  -->
                        </div>
                        <button status="hide" class="document-prefs-properties-history-show btn-shadow">View</button>

                        <div class="document-prefs-edits">
                            <a id="document-prefs-edits-download" href="" style="display: none;" download></a>
                            
                            <div id="document-prefs-download" class="document-prefs-edits-widget color-sc">
                                <span>Checkout <i class="fas fa-download"></i></span>
                            </div>
                            <div id="document-prefs-upload" class="document-prefs-edits-widget color-sc">
                                <span>Checkin <i class="fas fa-upload"></i></span>
                            </div>
                            <div id="document-prefs-approve" class="document-prefs-edits-widget color-sc">
                                <span>Approve <i class="fas fa-thumbs-up"></i></span>
                            </div>
                            <div id="document-prefs-reject" class="document-prefs-edits-widget color-sc">
                                <span>Reject <i class="fas fa-paper-plane"></i></span>
                            </div>
                        </div>
                        <div class="docflowbrowse-prefs color-sc">
                            <i class="fas fa-times docflowbrowse-prefs-close"></i>
                            <input id="docflowbrowse" onchange="docflowbrowse()" type="file" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;">
                            <div class="docflowbrowse-upload-con">
                                <button onclick="$('#docflowbrowse').click();" class="btn-shadow">Upload Document</button>
                                <input class="docflowbrowse-upload-filename" type="text" placeholder="Upload you Document" disabled>
                            </div>
                            <textarea class="docflowbrowse-upload-notes" maxlength="250" placeholder="Maximum of 250 characters"></textarea>
                            <button class="docflowbrowse-upload-submit btn-shadow">Confirm Checkin</button>
                        </div>
                        <div class="document-prefs-handling color-sc">
                            <i class="fas fa-times document-prefs-handling-close"></i>
                            <span class="document-prefs-handling-title">Give a short reason for your Decision to <b>Reject</b> the Document</span>
                            <br>
                            <textarea class="document-prefs-handling-reason" maxlength="250" placeholder="Maximum of 250 characters"></textarea>
                            <button class="document-prefs-handling-submit btn-shadow">Confirm <span>Reject</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div htid="me-con" class="me-con hidden nav-maincontainer">
            <div class="me-container">
                <div class="me-header">
                    <i class="fas fa-search btn-shadow"></i>
                    <input class="me-header-searchbar shadow" type="text" placeholder="Search Documents" >
                </div>
                <div class="me-body">

                    <div class="me-body-widget color-sc">
                        <i class="fas fa-sync-alt me-body-widget-refresh"></i>
                        <a href="" download="" class="me-body-widget-download" style="color: white;" ><i class="fas fa-file-download"></i></a>
                        <div class="me-body-widget-title-con">
                            <span class="me-body-widget-title">Document Name</span>&nbsp;
                            <span class="me-body-widget-version">v0.1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="me-body-widget-showid">D-0000012545</span>
                        </div>
                        <div class="me-body-widget-stage-con">
                            <div class="stage-con-widget color-draft wdidle">
                                <span class="stage-con-widget-title">Draft</span>
                                <span class="stage-con-widget-content">3 days ago</span>
                            </div>
                            <div class="stage-con-widget color-proofread wdactive">
                                <span class="stage-con-widget-title">Proofread</span>
                                <span class="stage-con-widget-content">ongoing</span>
                            </div>
                            <div class="stage-con-widget color-review wdidle">
                                <span class="stage-con-widget-title">Review</span>
                                <i class="fas fa-times-circle stage-con-widget-content"></i>
                            </div>
                            <div class="stage-con-widget color-approve wdidle">
                                <span class="stage-con-widget-title">Approve</span>
                                <i class="fas fa-times-circle stage-con-widget-content"></i>
                            </div>
                            <div class="stage-con-widget color-postapprove wdidle">
                                <span class="stage-con-widget-title">Post Approve</span>
                                <i class="fas fa-times-circle stage-con-widget-content"></i>
                            </div>
                        </div>
                        <br>
                        <span class="me-body-widget-director-title"></span>
                        <div class="me-body-widget-director-con">

                            <div class="director-con-widget color-red">
                                <span class="director-con-widget-accid">D-12345678899</span>
                                <span class="director-con-widget-status">Rejected <i class="fas fa-eye"></i></span>
                            </div>
                            
                            <div class="director-con-widget color-yellow">
                                <span class="director-con-widget-accid">D-12345678899</span>
                                <span class="director-con-widget-status">Waiting <i class="fas fa-exclamation-circle"></i> </i></span>
                            </div>
                            <div class="director-con-widget color-green">
                                <span class="director-con-widget-accid">D-12345678899</span>
                                <span class="director-con-widget-status">Approved <i class="fas fa-eye director-con-widget-view-history"></i></span>
                            </div>
                            <div class="director-con-widget color-yellow">
                                <span class="director-con-widget-accid">D-12345678899</span>
                                <span class="director-con-widget-status">Waiting<i class="fas fa-exclamation-circle"></i> </span>
                            </div>
                            
                        </div>
                        <div class="me-body-widget-history-con">
                            <span class="me-body-widget-history-title">Document History</span>

                            <span class="me-body-widget-history-event">
                                <b>Checkin: </b> U-9182378676 &nbsp;
                            <i title="test" class="fas fa-comment-alt .me-body-widget-history-notes"></i>
                            <a style="color: white;" href="" download=""><i class="fas fa-download"></i></a>
                            </span>

                            <span class="me-body-widget-history-event"><b>Action: </b>U-976876876 APPROVE @3days ago&nbsp;
                            <i title="asdasd" class="fas fa-comment-alt me-body-widget-history-reason"></i></span> 
                        </div>
                        
                        <div class="me-body-widget-btn-con">
                            <button class="me-body-widget-nextstage btn-shadow color-font">Go to Next Stage of Document</button>
                            <button class="me-body-widget-revision btn-shadow color-font">Upload a new Revision of the Document</button>
                            <button class="me-body-widget-effective btn-shadow color-font">Make Effective</button>
                            <button class="me-body-widget-execution btn-shadow color-font">Put Document on Execution</button>
                            <button class="me-body-widget-postapprove btn-shadow color-font">Go to Post Approval Stage</button>
                        </div>
                        
                    </div>

                    <div class="me-body-widget color-sc">

                    </div>
                </div>
            </div>
        </div>

        <div class="bank-con hidden nav-maincontainer">
            <div class="nav-content-">
                <span class="bank-title">Document Bank</span>
            </div>
        </div>

        <div class="upload-con hidden nav-maincontainer">
            <div class="nav-content-">
                <div class="create-upload-con1-project-select color-sc">
                    <select id="create-upload-con1-project-select">
                        <option value="">Project 1</option>
                        <option value="">Project 2</option>
                        <option value="">Project 3</option>
                    </select>
                    <button id="create-upload-con1-project-btn" class="btn-shadow">Select</button>
                    <span class="create-upload-con1-selected-project">Selected Project: &nbsp;<span class="create-upload-con1-selected-project-title"></span></span>
                </div>

                <div class="create-upload-con1 color-sc">
                    <!-- <h2>Upload your Document</h2> -->
                    <span class="docbuilderbrowse-text" onclick="$('#docbuilderbrowse').click();">Upload your Document<i class="fas fa-upload docbuilderbrowse-icon btn-shadow" ></i></span>
                    <input id="docbuilderbrowse" onchange="docbuilderbrowse()" type="file" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;">
                    
                    <div class="create-upload-details-con">
                        <i class="fas fa-file create-upload-details-filetype color-font"></i>
                        <div class="docbuilder-sameline width70">
                            <input class="create-upload-details-filename" type="text" placeholder="Please upload your document" disabled>
                            <i class="fas fa-check-circle color-font create-upload-details-filename-icon"></i>
                        </div>
                    </div>
                    
                </div>
                <div class="create-upload-con2 color-sc">
                    <h2>Select Category</h2>
                    <div class="create-upload-category-con">
                        <select id="create-upload-cat1">
                            <option>opt1</option>
                            <option>opt2</option>
                            <option>opt3</option>
                            <option>opt4</option>
                            <option>opt5</option>
                        </select>
                        <select id="create-upload-cat2">
                            <option>opt1</option>
                            <option>opt2</option>
                            <option>opt3</option>
                            <option>opt4</option>
                            <option>opt5</option>
                        </select>
                        <select id="create-upload-cat3">
                            <option>opt1</option>
                            <option>opt2</option>
                            <option>opt3</option>
                            <option>opt4</option>
                            <option>opt5</option>
                        </select>
                        <select id="create-upload-cat4">
                            <option>opt1</option>
                            <option>opt2</option>
                            <option>opt3</option>
                            <option>opt4</option>
                            <option>opt5</option>
                        </select>
                    </div>
                    <br>
                    <h2>Give your Document a Title</h2>
                    <input id="create-upload-title" type="text" placeholder="Enter Title">
                    <br>
                    <h2>Reference Number</h2>
                    <input id="create-upload-refid" type="text" placeholder="Reference Number (optional)">
                    <br>
                    <h2>Document ID</h2>
                    <input id="create-upload-docid" type="text" placeholder="Custom Document ID" disabled>
                    
                    <h2>Version 0.1</h2>
                    <button id="create-upload-submit" class="btn-shadow">Edit Document Properties</button>
                    <br>
                </div>
                <div class="create-upload-con3">
                    <div class="create-upload-con3-acclist-con color-sc">
                        <span>Drag Accounts to the Right</span>
                        <input id="create-upload-con3-acclist-search" type="text" placeholder="Search Name, ID or Email">
                        <select id="create-upload-con3-acclist-userlevel">
                            <option value="na" >All Account Levels</option>
                            <option value="1">Admin</option>
                            <option value="2">Super User</option>
                            <option value="3">User</option>
                        </select>
                        <div class="create-upload-con3-acclist-widget-con">
                            <!-- <div zid="hasayo1" fn="Yasuo1" em="yas1@ceis.com" class="create-upload-con3-acclist-widget btn-shadow">
                                <span class="create-upload-con3-acclist-widget-name">Firstname</span>
                                <span class="create-upload-con3-acclist-widget-email">Email</span>
                            </div>
                            <div zid="hasayo2" fn="Yasuo2" em="yas2@ceis.com" class="create-upload-con3-acclist-widget btn-shadow">
                                <span class="create-upload-con3-acclist-widget-name">Firstname</span>
                                <span class="create-upload-con3-acclist-widget-email">Email</span>
                            </div>
                            <div zid="hasayo3" fn="Yasuo3" em="yas3@ceis.com" class="create-upload-con3-acclist-widget btn-shadow">
                                <span class="create-upload-con3-acclist-widget-name">Firstname</span>
                                <span class="create-upload-con3-acclist-widget-email">Email</span>
                            </div>
                            <div zid="hasayo4" fn="Yasuo4" em="yas4@ceis.com" class="create-upload-con3-acclist-widget btn-shadow">
                                <span class="create-upload-con3-acclist-widget-name">Firstname</span>
                                <span class="create-upload-con3-acclist-widget-email">Email</span>
                            </div> -->
                        </div>
                    </div>
                    <div class="create-upload-con3-connectList-con ">
                        <span class="create-upload-con3-connectList-con-title color-title">Please put atleast one account per column with * sign    .</span>
                        
                        <div id="connectList-draft" class="create-upload-con3-connectList-widget color-sc">
                            <span class="create-upload-con3-connectList-widget-title">Drop Accounts here to add as Draft Creator *</span>
                            <div class="create-upload-con3-connectList-widget-con">
                                <!-- <div class="create-upload-con3-connectList-widget-item btn-shadow">
                                    <span class="create-upload-con3-connectList-widget-item-name">Yasuo1</span>
                                    <span class="create-upload-con3-connectList-widget-item-email">yas1@ceis.com</span>
                                    <i id="hasayo1" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                                </div> -->


                            </div>
                        </div>

                        <div id="connectList-proofread" class="create-upload-con3-connectList-widget color-sc">
                            <span class="create-upload-con3-connectList-widget-title">Drop Accounts here to add as Proofreader *</span>
                            <div class="create-upload-con3-connectList-widget-con">
                                <!-- <div class="create-upload-con3-connectList-widget-item btn-shadow">
                                    <span class="create-upload-con3-connectList-widget-item-name">Yasuo1</span>
                                    <span class="create-upload-con3-connectList-widget-item-email">yas1@ceis.com</span>
                                    <i id="hasayo1" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                                </div> -->


                            </div>
                        </div>

                        <div id="connectList-review" class="create-upload-con3-connectList-widget color-sc">
                            <span class="create-upload-con3-connectList-widget-title">Drop Accounts here to add as Reviewer *</span>
                            <div class="create-upload-con3-connectList-widget-con">
                                <!-- <div class="create-upload-con3-connectList-widget-item btn-shadow">
                                    <span class="create-upload-con3-connectList-widget-item-name">Yasuo2</span>
                                    <span class="create-upload-con3-connectList-widget-item-email">yas2@ceis.com</span>
                                    <i id="hasayo2" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                                </div> -->


                            </div>
                        </div>

                        <div id="connectList-approve" class="create-upload-con3-connectList-widget color-sc">
                            <span class="create-upload-con3-connectList-widget-title">Drop Accounts here to add as Approver *</span>
                            <div class="create-upload-con3-connectList-widget-con">
                                <!-- <div class="create-upload-con3-connectList-widget-item btn-shadow">
                                    <span class="create-upload-con3-connectList-widget-item-name">Yasuo3</span>
                                    <span class="create-upload-con3-connectList-widget-item-email">yas3@ceis.com</span>
                                    <i id="hasayo3" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                                </div> -->


                            </div>
                        </div>

                        <div id="connectList-postapprove" class="create-upload-con3-connectList-widget color-sc">
                            <span class="create-upload-con3-connectList-widget-title">Drop Accounts here to add as Post Approver (optional)</span>
                            <div class="create-upload-con3-connectList-widget-con">
                                <!-- <div class="create-upload-con3-connectList-widget-item btn-shadow">
                                    <span class="create-upload-con3-connectList-widget-item-name">Yasuo3</span>
                                    <span class="create-upload-con3-connectList-widget-item-email">yas3@ceis.com</span>
                                    <i id="hasayo3" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                                </div> -->


                            </div>
                        </div>

                    </div>
                    <div class="create-upload-con3-footer">
                        <button id="create-upload-checkin" class="btn-shadow">Check In<i class="fas fa-upload"></i></button>
                    </div>
                </div>
            </div>
        </div><!-- Create Upload from doc builder -->
        

    </div>



    <!-- <script src="http://cdn.date-fns.org/v2.0.0/date_fns.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.0.0-alpha0/date_fns.min.js"></script> -->
    <script src="lib/js/date_fns.min.js" type="text/javascript"></script>
    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="controllers/js/api_project.js" type="text/javascript"></script>
    <script src="controllers/js/api_account.js" type="text/javascript"></script>
    <script src="controllers/js/api_document.js" type="text/javascript"></script>
    <script src="controllers/js/api_document_connect.js" type="text/javascript"></script>
    <script src="controllers/js/api_document_category.js" type="text/javascript"></script>
    <script src="controllers/js/uploaddoc.js" type="text/javascript"></script>
    <script src="controllers/js/api_company.js" type="text/javascript"></script>
    <script src="lib/js/dashboard.js" type="text/javascript"></script>
    <script src="lib/js/docflow.js" type="text/javascript"></script>


    
    
    <script src="model/classes/class_project.js" type="text/javascript"></script>
    <script src="model/classes/class_account.js" type="text/javascript"></script>
    <script src="model/classes/class_alert.js" type="text/javascript"></script>
    <script src="model/classes/class_task.js" type="text/javascript"></script>
    <script src="model/classes/class_complains.js" type="text/javascript"></script>
    <script src="model/classes/class_document.js" type="text/javascript"></script>
    <script src="model/classes/class_company.js" type="text/javascript"></script>
    
    <script src="lib/js/alert.js" type="text/javascript"></script>
    <script src="lib/js/complains.js" type="text/javascript"></script>
    
</body>
</html>