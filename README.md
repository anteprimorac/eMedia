eMedia
======

Resize the media on the specified size, click to zoom and view in gallery mode.

APImage
======

Info

Mod: APImage
Mod version: 0.3.1
Mod demo: http://smf.anteprimorac.from.hr/index.php?topic=2.0
Compatible: SMF 1.1.x and 2.x.x

License: MPL 2.0
Citat:
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file,
You can obtain one at http://mozilla.org/MPL/2.0/.

Author: Ante Primorac
Author URI: http://anteprimorac.from.hr

The orginal code is http://custom.simplemachines.org/mods/index.php?mod=3388

BBcodes:
img - parameters: alt, width i height
gallery - require children: img

Features:
- plugin on/off
- resize the image on the specified size
- klick to zoom
- view in gallery mode
- fullscreen view
- navigation
- key navigation
- slideshow
- watermarks
- turn off mod on a single image
- free advertising, submit your ad here

Languages:
- English/English UTF-8
- Croatian/Croatian UTF-8
- Portuguese/Portuguese UTF-8 - here - Thanks @Costa

Changes log

Version 0.3.1
! Fixed gallery button description bug in SMF 2.x.x - thx rambomambo
+ Added mod description in css file

Version 0.3
! APImage is turned off in signatures and Tinyportal blocks
+ New design
+ Custom scrollbar in gallery
+ Turn off APImage on a single image
+ Watermarks
+ Slideshow
+ Gallery tag button
+ Free advertising, submit your ad here

Version 0.2.0.1:
! Fixed no defined maximum size bug
+ Improved image resizing algorithm

Version 0.2:
+ Javascript - recoded, object orinted, minimized
+ Better image resizing
+ Navigation and key-navigation
+ Speeded up javascript loading after modify/preview post
* Options:
       + Gallery viewer height
       + Show width and height
! Changed CSS

Version 0.1.8:
+ Added support for SMF 1.1.x
! Fixed loading jQuery bug

Version 0.1.7.1:
! Fixed post modify/preview bug

Version 0.1.7:
! Fixed encoding problem

Version 0.1.6:
+ Added redirection after installation
+ Added default values of mod settings

Version 0.1.5:
! Fixed some bugs

Version 0.1.4:
! Fixed linking bug

Version 0.1.3:
! Fixed small images bug

Version 0.1.2:
! Fixed installation bug

Version 0.1.1:
* First public version 
! Fixed some bugs

Version 0.1:
* First version, only private 

FAQ:

1. Mod isn't working
Clear browser cache(CTRL + R or CTRL + F5) and clear SMF cache (Admin -> Forum Maintenance -> Empty the file cache).
If you have version 1.7.1 or earlier, then check jQuery version (Google Chrome: In Console(CTRL + SHIFT + J) type $().jquery). If you haven't jQuery version 1.7.2 or later, then update jQuery.

2. How to change thumb style?
(Version 0.1.x and 0.2.x) Find in Themes/YOUR THEME/css/index.css or Themes/YOUR THEME/style.css:
.apimage {
   background: #000;
   margin: 5px;
   padding: 10px;
}
and change it!

(Version 0.3.x) Find Themes/YOUR THEME/css/apimage.css and change it!

3. How to remove scrollbar in gallery mode?
(Version 0.1.x and 0.2.x)
Find in Themes/YOUR THEME/css/index.css or Themes/YOUR THEME/style.css:
.apimage-gallery .images {
  margin-top: 10px;
	overflow: auto;
}
.apimage-gallery .images .list {
	width: auto;
	white-space: nowrap;
}
.apimage-gallery .images .apimage {
	display: inline-block;
	margin: 0 5px;
}

replace with:
.apimage-gallery .images {
	margin-top: 5px;
	overflow: none;
}
.apimage-gallery .images .apimage {
	float: left;
	margin: 5px 5px;
}

4. How to use APImage in SMF Gallery?
Find in Themes/YOUR THEME/Gallery2.template.php: Lines 915, 916 and 917
			<tr class="windowbg2">
				<td align="center"><img height="' . $context['gallery_pic']['height']  . '" width="' . $context['gallery_pic']['width']  . '" src="' . $modSettings['gallery_url'] . $context['gallery_pic']['filename']  . '" alt="" /></td>
			</tr>

replace with:
			<tr class="windowbg2">
				<td align="center"><div class="apimage loading" data-image="' . $modSettings['gallery_url'] . $context['gallery_pic']['filename']  . '"></div></td>
			</tr>

5. How to parse and show APImage images on Facebook?
Find in Themes/YOUR THEME/index.template.php:
echo $context['html_headers'];
add after:
if(!empty($modSettings['apimage_enabled']) && function_exists($context['get_message'])) {
		$context['get_message'](true);
		global $messages_request;
		$context['messages_request'] = $messages_request;
		while($post = $context['get_message']()) {
			$apimages = array();
			preg_match_all("/(?<=\<div class\=\"apimage loading\" data\-image\=\")[^\">]*(?=\")/", $post["body"], $apimages);
			for($nj=0; $nj < count($apimages[0]); $nj++) {
				echo '<meta property="og:image" content="' . $apimages[0][$nj] . '" />';
			}
		}
		$context['get_message'](true);
		$messages_request = $context['messages_request'];
	}

6. How to turn off APImage on a single image?
Set "off" parameter to "true":
[img off=true width=200 height=200]http://image.com/link.jpg[/img]
