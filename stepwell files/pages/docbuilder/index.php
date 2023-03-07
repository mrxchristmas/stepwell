<html lang="en">
<?php
  include "../../controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doc Builder</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/default.css" rel="stylesheet" /> 
    <link href="lib/css/docbuilder.css" rel="stylesheet" /> 


</head>
<body onload="init()">
    <?php
        include "../../views/bodydefaults.html";
    ?>

    <?php
        include "../../views/docbuildernav.html";
    ?>

    <div id="content">
        <?php
            include "../../views/contentdefaults.html";
        ?>

        <div class="dashboard-con hidden nav-maincontainer">
            <div class="nav-content-">
                <h1 class="color-title">Doc Builder Placeholder Dashboard</h1>
            </div>
        </div>
        
        
        
        

    </div>



    <!-- <script src="http://cdn.date-fns.org/v1.9.0/date_fns.min.js"></script> -->
    
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.0.0-alpha0/date_fns.min.js"></script> -->
    <script src="lib/js/date_fns.min.js" type="text/javascript"></script>
    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/js/docbuilder_timer.js" type="text/javascript"></script>
    <script src="controllers/js/api_project.js" type="text/javascript"></script>
    <script src="controllers/js/api_login.js" type="text/javascript"></script>
    <script src="controllers/js/api_account.js" type="text/javascript"></script>
    <script src="controllers/js/api_document_category.js" type="text/javascript"></script>
    <script src="controllers/js/api_document.js" type="text/javascript"></script>
    <script src="controllers/js/api_document_connect.js" type="text/javascript"></script>
    <script src="controllers/js/api_company.js" type="text/javascript"></script>
    <script src="controllers/js/uploaddoc.js" type="text/javascript"></script>
    <script src="lib/js/dashboard.js" type="text/javascript"></script>
    <script src="lib/js/docbuilder.js" type="text/javascript"></script>
</body>
</html>