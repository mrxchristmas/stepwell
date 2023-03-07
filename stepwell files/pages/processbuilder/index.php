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
    <link href="lib/css/processbuilder.css" rel="stylesheet" /> 


</head>
<body onload="init();">
    <?php
        include "../../views/bodydefaults.html";
    ?>

    <?php
        include "../../views/processbuildernav.html";
    ?>
    
    <div id="content">

        <div class="dashboard-con hidden nav-maincontainer">
            <div class="nav-content">
                <h1 class="color-title">Dashboard</h1>
            </div>
        </div>
        <div class="build-con hidden nav-maincontainer">
            <div class="nav-content">
                <h1 class="color-title">Build Process</h1>
            </div>
        </div>

        <div class="manage-unit-con hidden nav-maincontainer">
            <div class="nav-content">
                <h1 class="color-title">UnitS</h1>
            </div>
        </div>
        <div class="manage-equipment-con hidden nav-maincontainer">
            <div class="nav-content">
                <h1 class="color-title">EquipmentS</h1>
            </div>
        </div>





    </div>



    <script src="http://cdn.date-fns.org/v1.9.0/date_fns.min.js"></script>
    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="lib/js/processbuilder.js" type="text/javascript"></script>
</body>
</html>