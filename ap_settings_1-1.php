<?php
global $db_prefix;

$mod_settings = array(
	'apimage_enabled' => '1',
	'apimage_watermark_enabled' => '1',
	'apimage_thumb_maxwidth' => '200',
	'apimage_thumb_maxheight' => '200',
	'apimage_thumb_watermark' => '1',
	'apimage_gallery_viewer_maxheight' => '600',
	'apimage_gallery_viewer_watermark' => '1',
	'apimage_gallery_thumb_maxwidth' => '80',
	'apimage_gallery_thumb_maxheight' => '80',
	'apimage_gallery_thumb_watermark' => '1',
	'apimage_show_maxwidth' => '1000',
	'apimage_show_maxheight' => '800',
	'apimage_show_watermark' => '1'
);


if(file_exists(dirname(__FILE__) . '/Source/Subs.php') && !defined('SMF')) require_once(dirname(__FILE__) . '/Source/Subs.php');
elseif(!defined('SMF')) die('<b>Error:</b> Cannot install - please verify you put this in the same place as SMF\'s index.php.');

foreach($mod_settings as $k => $v)
	$result = db_query("INSERT IGNORE INTO ".$db_prefix."settings (variable,value) VALUES ('".$k."', '".$v."')", __FILE__, __LINE__);
		
if($result === false) echo '<b>Error:</b> Database modifications failed!';
?>
