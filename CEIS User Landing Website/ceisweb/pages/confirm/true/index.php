<html lang="en">
<?php
  include "../../../controller/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMAIL CONFIRM SUCCESS</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/index.css" rel="stylesheet" />
    <link href="lib/css/defaults.css" rel="stylesheet" />


    
</head>
<body>
    <?php
      include "../../../views/defaults.php";
    ?>

    <div id="content">
      
    <?php
      include "../../../views/nav.html";
      // include "../../../views/gallery.html";
    //   include "views/dividermobile.html";
    //   include "views/plans.html";
    //   include "views/contact.html";
    //   include "views/footer.html";
    ?>

      <h1>SUCCESS</h1>
      <h2 id="confirm-true-email"><?php echo $_GET['email']?></h2>
      <h2>We have received your Email Confirmation. You may now proceed to login.</h2>
      <h3>If you experience any trouble signing in, You may reach us at <a href="mailto:info@ceisweb.com">info@ceisweb.com</a></h3>
      
    
    </div>
    
    







    
    <?php
      include "../../../helper/defaultjsincludes.php";
    ?>
    
    <script src="./controller/js/api_company.js" type="text/javascript"></script>
    <script src="lib/js/createCompany.js" type="text/javascript"></script>
</body>
</html>