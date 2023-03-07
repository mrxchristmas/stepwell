<html lang="en">
<?php
  include "../../controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super Admin Page</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/suadmin.css" rel="stylesheet" />

</head>
<body>
    <div id="header">
        <i class="fas fa-sliders-h header-settings header-widget"></i>
        <i class="fas fa-user-circle header-profile header-widget"></i>
    </div>
    <div id="nav">
        <span id="nav-suadmin" class="nav-widget"><i class="fas fa-user-astronaut nav-widget-icon"></i>Super Admin</span>
        <span id="nav-admin" class="nav-widget"><i class="fas fa-user-tie nav-widget-icon"></i>Admin</span>
        <span id="nav-user" class="nav-widget"><i class="fas fa-user nav-widget-icon"></i>User</span>
        <span id="nav-group" class="nav-widget"><i class="fas fa-users nav-widget-icon"></i>Groups</span>
        <span id="nav-company" class="nav-widget"><i class="fas fa-building nav-widget-icon"></i>Company</span>
        <span id="nav-document" class="nav-widget"><i class="fas fa-file-alt nav-widget-icon"></i>Documents</span>
    </div>

    <div id="content">
        <div id="home">
            <h1 class="color-title">Welcome to Super Admin's Page</h1>
        </div>
        <div class="suadmin-con hidden nav-maincontainer">
            <div class="nav-mininav-con">
                <span class="nav-mininav-con-widget btn-shadow">View Super Admin Accounts</span>
                <span class="nav-mininav-con-widget btn-shadow">Create Super Admin Accounts</span>
                <span class="nav-mininav-con-widget btn-shadow">Update Super Admin Accounts</span>
                <span class="nav-mininav-con-widget btn-shadow">Delete Super Admin Accounts</span>
            </div>
            <div class="nav-content">
                <div class="suadmin-emailList">
                    <input class="suadmin-emailList-searchbox" type="text" placeholder="Search Email">
                    <div class="suadmin-emailList-list">
                        <span class="suadmin-emailList-list-widget btn-shadow">name1@ceis.com</span>
                        <span class="suadmin-emailList-list-widget btn-shadow">name2@ceis.com</span>
                        <span class="suadmin-emailList-list-widget btn-shadow">name3@ceis.com</span>
                        <span class="suadmin-emailList-list-widget btn-shadow">name4@ceis.com</span>
                        <span class="suadmin-emailList-list-widget btn-shadow">name5@ceis.com</span>
                        <span class="suadmin-emailList-list-widget btn-shadow">name6@ceis.com</span>
                        <span class="suadmin-emailList-list-widget btn-shadow">name7@ceis.com</span>
                    </div>
                </div>

            </div>
        </div><!-- ////////////////////////suadmin-con//////////////////////// -->
        
    </div>





    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/suadmin.js" type="text/javascript"></script>
    <script src="lib/js/suadmin.js" type="text/javascript"></script>
</body>
</html>