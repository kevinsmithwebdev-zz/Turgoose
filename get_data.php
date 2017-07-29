<?php
$jsonp_callback = $_GET['jsonp_callback'];

$str = file_get_contents('http://www.rachelturgoose.com/img/gallery/gallery.json');

$json = json_decode($str, true);

echo $jsonp_callback . '('.json_encode($json).');';
?>
