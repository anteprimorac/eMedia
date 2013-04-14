<?php
global $smcFunc, $db_prefix;

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

if(file_exists(dirname(__FILE__) . '/SSI.php') && !defined('SMF')) require_once(dirname(__FILE__) . '/SSI.php');
elseif(!defined('SMF')) die('<b>Error:</b> Cannot install - please verify you put this in the same place as SMF\'s index.php.');

foreach($mod_settings as $k => $v)
	$result = $smcFunc['db_insert']('ignore', $db_prefix.'settings', array('variable' => 'string', 'value' => 'string'), array($k, $v), array());
		
if($result === false) echo '<b>Error:</b> Database modifications failed!';
?>
