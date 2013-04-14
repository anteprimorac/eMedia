[center][b][size=18pt]APImage[/size][/b][/center]

[size=14pt]Info[/size]

[b]Mod:[/b] APImage
[b]Mod version:[/b] 0.3.1
[b]Mod demo:[/b] http://smf.anteprimorac.from.hr/index.php?topic=2.0
[b]Compatible:[/b] SMF 1.1.x and 2.x.x

[b]License:[/b] MPL 2.0
[quote]This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file,
You can obtain one at http://mozilla.org/MPL/2.0/.[/quote]

[b]Author:[/b] Ante Primorac
[b]Author URI:[/b] http://anteprimorac.from.hr

The orginal code is http://custom.simplemachines.org/mods/index.php?mod=3388

[size=14pt]BBcodes:[/size]
img - parameters: [i]alt[/i], [i]width[/i] i [i]height[/i]
gallery - require children: [i]img[/i]

[size=14pt]Features:[/size]
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
- free advertising, submit your ad [url=http://anteprimorac.from.hr/advertising]here[/url]

[size=14pt]Languages:[/size]
- English/English UTF-8
- Croatian/Croatian UTF-8

[size=14pt]Changes log[/size]

[b]Version 0.3.1[/b]
[color=red]![/color] Fixed gallery button description bug in SMF 2.x.x - thx [url=http://www.simplemachines.org/community/index.php?action=profile;u=337784]rambomambo[/url]
[color=green]+[/color] Added mod description in css file

[b]Version 0.3[/b]
[color=red]![/color] APImage is turned off in signatures and Tinyportal blocks
[color=green]+[/color] New design
[color=green]+[/color] Custom scrollbar in gallery
[color=green]+[/color] Turn off APImage on a single image
[color=green]+[/color] Watermarks
[color=green]+[/color] Slideshow
[color=green]+[/color] Gallery tag button
[color=green]+[/color] Free advertising, submit your ad [url=http://anteprimorac.from.hr/advertising]here[/url]

[b]Version 0.2.0.1:[/b]
[color=red]![/color] Fixed no defined maximum size bug
[color=green]+[/color] Improved image resizing algorithm

[b]Version 0.2:[/b]
[color=green]+[/color] Javascript - recoded, object orinted, minimized
[color=green]+[/color] Better image resizing
[color=green]+[/color] Navigation and key-navigation
[color=green]+[/color] Speeded up javascript loading after modify/preview post
[color=blue]*[/color] Options:
       [color=green]+[/color] Gallery viewer height
       [color=green]+[/color] Show width and height
[color=red]![/color] Changed CSS

[b]Version 0.1.8:[/b]
[color=green]+[/color] Added support for SMF 1.1.x
[color=red]![/color] Fixed loading jQuery bug

[b]Version 0.1.7.1:[/b]
[color=red]![/color] Fixed post modify/preview bug

[b]Version 0.1.7:[/b]
[color=red]![/color] Fixed encoding problem

[b]Version 0.1.6:[/b]
[color=green]+[/color] Added redirection after installation
[color=green]+[/color] Added default values of mod settings

[b]Version 0.1.5:[/b]
[color=red]![/color] Fixed some bugs

[b]Version 0.1.4:[/b]
[color=red]![/color] Fixed linking bug

[b]Version 0.1.3:[/b]
[color=red]![/color] Fixed small images bug

[b]Version 0.1.2:[/b]
[color=red]![/color] Fixed installation bug

[b]Version 0.1.1:[/b]
[color=blue]*[/color] First public version :)
[color=red]![/color] Fixed some bugs

[b]Version 0.1:[/b]
[color=blue]*[/color] First version, only private ;)

[b]FAQ:[/b]

[b]1. Mod isn't working[/b]
Clear browser cache(CTRL + R or CTRL + F5) and clear SMF cache (Admin -> Forum Maintenance -> Empty the file cache).
If you have version 1.7.1 or earlier, then check jQuery version (Google Chrome: In Console(CTRL + SHIFT + J) type $().jquery). If you haven't jQuery version 1.7.2 or later, then update jQuery.

[b]2. How to change thumb style?[/b]
(Version 0.1.x and 0.2.x) Find in Themes/YOUR THEME/css/[b]index.css[/b] or Themes/YOUR THEME/[b]style.css[/b]:
[code]
.apimage {
   background: #000;
   margin: 5px;
   padding: 10px;
}
[/code]
and change it!

(Version 0.3.x) Find Themes/YOUR THEME/css/[b]apimage.css[/b] and change it!

[b]3. How to remove scrollbar in gallery mode?[/b]
(Version 0.1.x and 0.2.x)
Find in Themes/YOUR THEME/css/[b]index.css[/b] or Themes/YOUR THEME/[b]style.css[/b]:
[code]
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
[/code]

replace with:
[code]
.apimage-gallery .images {
	margin-top: 5px;
	overflow: none;
}
.apimage-gallery .images .apimage {
	float: left;
	margin: 5px 5px;
}
[/code]

[b]4. How to use APImage in [url=http://custom.simplemachines.org/mods/index.php?mod=473]SMF Gallery[/url]?[/b]
Find in Themes/YOUR THEME/[b]Gallery2.template.php[/b]: Lines 915, 916 and 917
[code]			<tr class="windowbg2">
				<td align="center"><img height="' . $context['gallery_pic']['height']  . '" width="' . $context['gallery_pic']['width']  . '" src="' . $modSettings['gallery_url'] . $context['gallery_pic']['filename']  . '" alt="" /></td>
			</tr>[/code]

replace with:
[code]			<tr class="windowbg2">
				<td align="center"><div class="apimage loading" data-image="' . $modSettings['gallery_url'] . $context['gallery_pic']['filename']  . '"></div></td>
			</tr>[/code]

[b]5. How to parse and show APImage images on Facebook?[/b]
Find in Themes/YOUR THEME/[b]index.template.php[/b]:
[code]echo $context['html_headers'];[/code]
add after:
[code]if(!empty($modSettings['apimage_enabled']) && function_exists($context['get_message'])) {
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
	}[/code]

[b]6. How to turn off APImage on a single image?[/b]
Set "off" parameter to "true":
[code][img off=true width=200 height=200]http://image.com/link.jpg[/img][/code]
