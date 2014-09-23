<!doctype html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>jQuery twCarousel - Example</title>
	<link href='http://fonts.googleapis.com/css?family=Quattrocento' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="jq.twCarousel.js"></script>

	<style>

		.wrapper{overflow:hidden;border:1px dotted #aaa;position:relative;margin-bottom:15px;}
		html{padding:0;margin:0;font-family:Arial,sans-serif;}
		li{list-style-type:none;float:left;border:1px solid #000;margin:5px;}
		.example{height:170px;padding:0;margin:0;}
		.slider-wrapper{float:left;height:170px;margin:0 50px;border:1px solid #aaa;}
		a{text-decoration:none;float:left;margin-top:50px;border:30px solid transparent;}
		.direction-next{border-left:30px solid #555;}
		.direction-prev{border-right:30px solid #555;}
		i{font-style:normal;font-size:6rem;color:#555;}
	</style>

	<script>

		$(document).ready(function(){

			$("#example0").twCarousel({
				pulse : 3000,
				sizeWindow : 4,
				shift : 4,
				speed : 600,
				direction : '>',
				bTnext : $("#next0"),
				bTprev : $("#prev0")
			});

			$("#example1").twCarousel({
				pulse : 3000,
				sizeWindow : 4,
				shift : 1,
				speed : 700,
				bTnext : $("#next1"),
				bTprev : $("#prev1")
			});

			$("#example2").twCarousel({
				pulse : 6000,
				speed : 800,
				sizeWindow : 4,
				shift : 4,
				bTnext : $("#next2"),
				bTprev : $("#prev2")
			});

			$("#example3").twCarousel({
				pulse : 4000,
				sizeWindow : 2,
				shift : 1,
				speed : 600,
				bTnext : $("#next3"),
				bTprev : $("#prev3"),
				addFunctionOnClick : function(){alert("Vous avez cliqué !");}
			});

			$("#example4").twCarousel({
				pulse : 7000,
				sizeWindow : 3,
				shift : 2,
				speed : 1000,
				bTnext : $("#next4"),
				bTprev : $("#prev4"),
				addFunctionAfterSlide : function(direction,numeroItem){console.log(direction,numeroItem);}
			});

			$("#example5").twCarousel({
				launch : 5000,
				pulse : 500,
				sizeWindow : 3,
				shift : 1,
				speed : 1000,
				bTnext : $("#next5"),
				bTprev : $("#prev5")
			});


		})

	</script>

</head>
<body>
	<h1>jQuery twCarousel</h1>

	<?php

	$pic = array(
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/zalando.png" width="216" height="156" alt="Zalando" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/otto-office.png" width="216" height="156" alt="Otto office" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/webdistrib.png" width="216" height="156" alt="Webdistrib.com" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/cdiscount.png" width="216" height="156" alt="Cdiscount" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/mistergooddeal.png" width="216" height="156" alt="Mister good deal" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/lafayette.png" width="216" height="156" alt="La Fayette" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/laredoute.png" width="216" height="156" alt="La Redoute" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/delamaison.png" width="216" height="156" alt="Delamaison.fr" /></li>',
    	'<li><img src="http://www.twenga-solutions.com/assets/img/home/carousel/fr/rueducommerce.png" width="216" height="156" alt="Rue du commerce" /></li>'
    );

	$nbrItems = array(5,9,7,4,9,7);//Nombre d'items dans les carousels d'exemple

	for($b=0;$b<count($nbrItems);$b++){

			echo "<div class='wrapper'>";
			echo '<a href="#" id="prev'.$b.'" class="direction direction-prev"><i class="fa fa-angle-left"></i></a>';
			echo 	'<div class="slider-wrapper">';
		    echo 		'<ul class="example" id="example'.$b.'">';
			for($a=0;$a<$nbrItems[$b];$a++){
				echo $pic[$a];
			}
			echo 		'</ul>';
			echo 	'</div>';
			echo '<a href="#" id="next'.$b.'" class="direction direction-next"><i class="fa fa-angle-left"></i></a>';
			echo "</div>";

	}

	?>



</body>
</html>
