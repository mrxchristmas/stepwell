<html lang="en">
<?php
  include "../../controller/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prodocuflow - About</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/index.css" rel="stylesheet" />
    <link href="lib/css/defaults.css" rel="stylesheet" />


    
</head>
<body>
    <?php
      include "../../views/defaults.php";
    ?>

    <div id="content">
      
    <?php
      include "../../views/nav.html";
    //   include "views/gallery.html";
    //   include "views/dividermobile.html";
      include "../../views/company.html";
    //   include "../../views/contact.html";
      include "../../views/footer.html";
    ?>
      
      
      
    
    </div>
    
    







    

    <?php
      include "../../helper/defaultjsincludes.php";
    ?>
    
    <script src="./controller/js/api_company.js" type="text/javascript"></script>
    
</body>
</html>