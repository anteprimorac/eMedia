/*
	Filename: apimage.js
	Description: Javascript of APImage mod for SMF 2.x.x and SMF 1.1.x
	
	Mod: APImage
	Mod demo: http://smf.anteprimorac.from.hr/index.php?topic=2.0
	Mod version: 0.3.1
	Compatible: SMF 2.x.x and SMF 1.1.x
	
	Author: Ante Primorac
	Author URI: http://anteprimorac.from.hr
*/
var apStorage={_createObject:function(b){b=0<(b+"").length&&"undefined"!=typeof b?b:"images";return"object"!=typeof apStorage[b]?(apStorage[b]={},!0):!1},_getLastID:function(b){b=0<(b+"").length&&"undefined"!=typeof b?b:"images";if("object"==typeof apStorage[b]){var f=0;for(i in apStorage[b])apStorage[b][i].id>f&&(f=apStorage[b][i].id);return parseInt(f)}apStorage._createObject(b);return 0},_getPrevImgID:function(b,f){f="object"==typeof f?f:apStorage.images;if("object"==typeof f){var o=!1,c=!1,h=!0;for(i in f)if(apStorage.images[i].id==b&&(h=!1),!0==h&&!1==f[i].isFailed&&(o=f[i].id),!1==f[i].isFailed)c=f[i].id;!1==o&&!1!=c&&(o=c);return o}return!1},_getNextImgID:function(b,f){f="object"==typeof f?f:apStorage.images;if("object"==typeof f){var o=!1,c=!1,h=!1;for(i in f)!1==c&&!1==f[i].isFailed&&(c=f[i].id),!0==h&&!1==f[i].isFailed&&(o=f[i].id,h=!1),f[i].id==b&&(h=!0);!1==o&&!1!=c&&(o=c);return o}return!1}};(function(b){function f(f,c){var h,r,m;function l(a){var p=parseInt(n.obj.css(s),10);h=t?a.pageX:a.pageY;r="auto"==p?0:p;u?(document.ontouchmove=function(a){a.preventDefault();e(a.touches[0])},document.ontouchend=k):(b(document).bind("mousemove",e),b(document).bind("mouseup",k),n.obj.bind("mouseup",k))}function q(d){if(1>a.ratio&&(d=d||window.event,j-=(d.wheelDelta?d.wheelDelta/120:-d.detail/3)*c.wheel,j=Math.min(a[c.axis]-g[c.axis],Math.max(0,j)),n.obj.css(s,j/p.ratio),a.obj.css(s,-j),c.lockscroll||j!==a[c.axis]-g[c.axis]&&0!==j))d=b.event.fix(d),d.preventDefault()}function e(b){console.log(b);console.dir(a);1>a.ratio&&(m=u?Math.min(d[c.axis]-n[c.axis],Math.max(0,r+(h-(t?b.pageX:b.pageY)))):Math.min(d[c.axis]-n[c.axis],Math.max(0,r+((t?b.pageX:b.pageY)-h))),j=m*p.ratio,a.obj.css(s,-j),n.obj.css(s,m))}function k(){b(document).unbind("mousemove",e);b(document).unbind("mouseup",k);n.obj.unbind("mouseup",k);document.ontouchmove=document.ontouchend=null}var g={obj:b(f).find(".viewport")},a={obj:b(f).find(".overview")},p={obj:b(f).find(".scrollbar")},d={obj:b(p.obj).find(".track")},n={obj:b(p.obj).find(".thumb")},t="x"===c.axis,s=t?"left":"top",v=t?"Width":"Height",j=0;m=r=0;h=void 0;var u="ontouchstart"in document.documentElement?!0:!1;console.dir(a.obj);this.update=function(b){g[c.axis]=g.obj[0]["offset"+v];a[c.axis]=a.obj[0]["scroll"+v];a.ratio=g[c.axis]/a[c.axis];p.obj.toggleClass("disable",1<=a.ratio);d[c.axis]="auto"===c.size?g[c.axis]:c.size;n[c.axis]=Math.min(d[c.axis],Math.max(0,"auto"===c.sizethumb?d[c.axis]*a.ratio:c.sizethumb));p.ratio="auto"===c.sizethumb?a[c.axis]/d[c.axis]:(a[c.axis]-g[c.axis])/(d[c.axis]-n[c.axis]);j="relative"===b&&1>=a.ratio?Math.min(a[c.axis]-g[c.axis],Math.max(0,j)):0;j="bottom"===b&&1>=a.ratio?a[c.axis]-g[c.axis]:isNaN(parseInt(b,10))?j:parseInt(b,10);b=v.toLowerCase();n.obj.css(s,j/p.ratio);a.obj.css(s,-j);h=n.obj.offset()[s];p.obj.css(b,d[c.axis]);d.obj.css(b,d[c.axis]);n.obj.css(b,n[c.axis])};this.update();u?g.obj[0].ontouchstart=function(a){1===a.touches.length&&(l(a.touches[0]),a.stopPropagation())}:(n.obj.bind("mousedown",l),d.obj.bind("mouseup",e));c.scroll&&window.addEventListener?(f[0].addEventListener("DOMMouseScroll",q,!1),f[0].addEventListener("mousewheel",q,!1)):c.scroll&&(f[0].onmousewheel=q);return this}b.tiny=b.tiny||{};b.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:!0,lockscroll:!0,size:"auto",sizethumb:"auto"}};b.fn.tinyscrollbar=function(o){var c=b.extend({},b.tiny.scrollbar.options,o);this.each(function(){b(this).data("tsb",new f(b(this),c))});return this};b.fn.tinyscrollbar_update=function(f){return b(this).data("tsb").update(f)};b.fn.APImage=function(){function f(a,b,d,c,e){var g=0,h=0,j=0,k=0,a=0<parseInt(a)?parseInt(a):!1,b=0<parseInt(b)?parseInt(b):!1,d=0<=parseInt(d)?parseInt(d):!1,c=0<=parseInt(c)?parseInt(c):!1,e="string"==typeof e?e:!1;if(!1===a||!1===b||!1===d||!1===c)return!1;if(!1===e||"crop"!=e&&"resize"!=e&&"resize and crop"!=e)e="resize";"resize"==e?a<d&&b<c||0==d&&0==c?(g=a,h=b):(j=0==d?c/b:0==c?d/a:d/a<c/b?d/a:c/b,g=a*j,h=b*j):"crop"==e?a<d&&b<c||0==d&&0==c?(g=a,h=b):(g=0==d?a:d,h=0==c?b:c,j=-(a-g),k=-(b-h)):"resize and crop"==e&&(a<d&&b<c||0==d&&0==c?(g=a,h=b):(d=0==d?a:d,c=0==c?b:c,j=a<b||d<c?d/a:c/b,g=a*j,h=b*j,j=g>d?-(g-d):0,k=h>c?-(h-c):0));return{width:g,height:h,right:j,bottom:k}}function c(a){a.length&&b(a).each(function(){b(this).closest(".apimage-gallery").length?b(this).closest(".apimage-gallery").before(b('<img src="'+b(this).attr("data-image")+'" width="'+b(this).attr("data-width")+'" height="'+b(this).attr("data-height")+'" />')):b(this).before(b('<img src="'+b(this).attr("data-image")+'" width="'+b(this).attr("data-width")+'" height="'+b(this).attr("data-height")+'" />'));b(this).remove()})}var h=apStorage,r="#modernizr{overflow: scroll; width: 40px }#"+["","-webkit-","-moz-","-o-","-ms-"].join("scrollbar{width:0px} #modernizr::").split("#").slice(1).join("#")+"scrollbar{width:0px}",m=document.createElement("div"),l=document.body,q=l?l:document.createElement("body"),r=['&#173;<style id="smodernizr">',r,"</style>"].join("");m.id="modernizr";(l?m:q).innerHTML+=r;q.appendChild(m);l||(q.style.background="",docElement.appendChild(q));h.custom_scrollbars="scrollWidth"in m&&40==m.scrollWidth;"object"==typeof APImage_options?(APImage_options.enabled=1==APImage_options.enabled?!0:!1,APImage_options.thumb_max_width=0<(APImage_options.thumb_max_width+"").length&&0<parseInt(APImage_options.thumb_max_width)?parseInt(APImage_options.thumb_max_width):0,APImage_options.thumb_max_height=0<(APImage_options.thumb_max_height+"").length&&0<parseInt(APImage_options.thumb_max_height)?parseInt(APImage_options.thumb_max_height):0,APImage_options.gallery_viewer_max_height=0<(APImage_options.gallery_viewer_max_height+"").length&&0<parseInt(APImage_options.gallery_viewer_max_height)?parseInt(APImage_options.gallery_viewer_max_height):0,APImage_options.gallery_thumb_max_width=0<(APImage_options.gallery_thumb_max_width+"").length&&0<parseInt(APImage_options.gallery_thumb_max_width)?parseInt(APImage_options.gallery_thumb_max_width):0,APImage_options.gallery_thumb_max_height=0<(APImage_options.gallery_thumb_max_height+"").length&&0<parseInt(APImage_options.gallery_thumb_max_height)?parseInt(APImage_options.gallery_thumb_max_height):0,APImage_options.show_max_width=0<(APImage_options.show_max_width+"").length&&0<parseInt(APImage_options.show_max_width)?parseInt(APImage_options.show_max_width):0,APImage_options.show_max_height=0<(APImage_options.show_max_height+"").length&&0<parseInt(APImage_options.show_max_height)?parseInt(APImage_options.show_max_height):0):APImage_options=!1;var e=function(a){this.theight=this.twidth=this.tmaxheight=this.tmaxwidth=this.src=this.element=this.id=false;this.tpadding=0;this.imageDisplayed=this.isFailed=this.isLoaded=this.isLoading=false;this.onLoading=function(){};this.onLoaded=function(){};this.onFailed=function(){};this.onClick=function(){};this.onInit=function(){};this._setID();this._addToStorage();this._setMode(a.mode);this._setTMaxSize(a.tmaxwidth,a.tmaxheight);this._setElement(a.element);this._setCallbacks(a.onLoading,a.onLoaded,a.onFailed,a.onClick,a.onInit);this.onInit();this._loadImage();b(this).bind({apLoading:this.onLoading,apLoaded:this.onLoaded,apFailed:this.onFailed,apClick:this.onClick});var c=this;b(this.element).live({click:function(){b(c).triggerHandler("apClick")}})};e.prototype._setMode=function(a){this.mode=typeof a=="string"?a=="gallery"?"gallery":"normall":"normall"};e.prototype._setID=function(a){this.id=(parseInt(a)+"").length>0&&a!=void 0?parseInt(a):apStorage._getLastID()+1};e.prototype._setSrc=function(a){this.src=(a+"").length>0?a:false};e.prototype._setTMaxWidth=function(a){if(typeof a!="undefined"&&parseInt(a)>=0)this.tmaxwidth=parseInt(a)};e.prototype._setTMaxHeight=function(a){if(typeof a!="undefined"&&parseInt(a)>=0)this.tmaxheight=parseInt(a)};e.prototype._setTwidth=function(a){var b=this.tmaxwidth==false?0:this.tmaxwidth;this.twidth=parseInt((parseInt(a)+"").length>0&&parseInt(a)<(b!=0?b:9999)?parseInt(a):b)};e.prototype._setTheight=function(a){var b=this.tmaxheight==false?0:this.tmaxheight;this.theight=parseInt((parseInt(a)+"").length>0&&parseInt(a)<(b!=0?b:9999)?parseInt(a):b)};e.prototype._setTsize=function(a,b){this._setTwidth(a);this._setTheight(b)};e.prototype._setTMaxSize=function(a,b){this._setTMaxWidth(a);this._setTMaxHeight(b)};e.prototype._setElement=function(a){this.element=b(a);this._setSrc(b(a).attr("data-image"));this._setTsize(b(a).attr("data-width"),b(a).attr("data-height"));b(this.element).css({width:this.twidth-this.tpadding*2+"px",height:this.theight-this.tpadding*2+"px"}).attr("data-apimage-id",this.id).addClass("host-"+this.src.match(/^(?:f|ht)tp(?:s)?\:\/\/(?:www.)?([^\/]*)/)[1]+" name-"+this.src.match(/[^\/]*(?=\.[\w]+$)/)[0]+" type-"+this.src.match(/[^\/\.]*$/)[0])};e.prototype._setIsLoading=function(a){if(a==true){this.isLoading=true;this.isFailed=this.isLoaded=false;b(this).triggerHandler("apLoading")}else this.isLoading=false};e.prototype._setIsLoaded=function(a){if(a==true){this.isLoaded=true;this.isFailed=this.isLoading=false;b(this).triggerHandler("apLoaded")}else this.isLoaded=false};e.prototype._setIsFailed=function(a){if(a==true){this.isFailed=true;this.isLoading=this.isLoaded=false;b(this).triggerHandler("apFailed")}else this.isFailed=false};e.prototype._setImageDisplayed=function(a){this.imageDisplayed=a==true?true:false};e.prototype._setOnLoading=function(a){if(typeof a=="function")this.onLoading=a};e.prototype._setOnLoaded=function(a){if(typeof a=="function")this.onLoaded=a};e.prototype._setOnFailed=function(a){if(typeof a=="function")this.onFailed=a};e.prototype._setOnClick=function(a){if(typeof a=="function")this.onClick=a};e.prototype._setOnInit=function(a){if(typeof a=="function")this.onInit=a};e.prototype._setCallbacks=function(a,b,d,c,e){this._setOnLoading(a);this._setOnLoaded(b);this._setOnFailed(d);this._setOnClick(c);this._setOnInit(e)};e.prototype._setImgParms=function(a){this.width=a.naturalWidth>0?a.naturalWidth:a.width;this.height=a.naturalHeight>0?a.naturalHeight:a.height};e.prototype._addToStorage=function(){if(typeof apStorage=="object"){apStorage._createObject();apStorage.images[this.id]=this}};e.prototype._loadImage=function(){var a=new Image,b=this;this._setIsLoading(true);a.onload=function(){b._setImgParms(this);b._setIsLoaded(true)};a.onerror=function(){b._setIsFailed(true)};a.src=this.src};e.prototype._displayImage=function(){if(this.isLoaded==true){b(this.element).html(b('<div class="hover"></div><div class="watermark"><div></div></div><div class="image"><img src="'+this.src+'" /></div>'));this._setImageDisplayed(true)}else if(this.isLoading==true)b(this).bind("apLoaded",function(){this._ba=0;this._ba==0&&this._displayImage();this._ba=this._ba+1});else{this._loadImage();b(this).bind("apLoaded",function(){this._bb=0;this._bb==0&&this._displayImage();this._bb=this._bb+1})}};e.prototype._resizeImage=function(){var a=f(this.width,this.height,this.twidth-this.tpadding*2,this.theight-this.tpadding*2,"resize and crop"),c=a.width+a.right,d=a.height+a.bottom;if(this.imageDisplayed==true){b(this.element).css({width:c+"px",height:d+"px"}).find(".image").css({width:c+"px",height:d+"px"}).find("img").attr({width:a.width,height:a.height}).css({"margin-right":a.right+"px","margin-bottom":a.bottom+"px"});b(this.element).find(".hover").css({width:c+"px",height:d+"px","margin-bottom":-d+"px"});b(this.element).find(".watermark").css({width:c+"px",height:d+"px","margin-bottom":"-"+d+"px"})}};var k=function(a){var c=sg=this;this.element=this.mode=false;this.maxHeight=600;this.onEmpty=function(){b(this.element).remove()};this.images={};this._setID();this.viewer={_init:function(a){b(a).has(".viewer")&&this._setElement(b(a).find(".viewer")[0])},_setElement:function(a){this.element=b(a);this.e_watermark=b(a).has(".watermark")?b(a).find(".watermark")[0]:false;this.e_image=b(a).has(".image")?b(a).find(".image")[0]:false;this.e_left=b(a).has(".left")?b(a).find(".left")[0]:false;this.e_right=b(a).has(".right")?b(a).find(".right")[0]:false;this._setEvents()},_setEvents:function(){this.e_left!=false&&b(this.e_left).live("click",function(){var a=b(this).closest(".apimage-gallery").attr("data-apimage-id");apStorage.gallery[a]._prev()});this.e_right!=false&&b(this.e_right).live("click",function(){var a=b(this).closest(".apimage-gallery").attr("data-apimage-id");apStorage.gallery[a]._next()})},_setImage:function(a){var e,g,f,h;if(self.pageYOffset){f=self.pageXOffset;h=self.pageYOffset}else if(document.documentElement&&document.documentElement.scrollTop){f=document.documentElement.scrollLeft;h=document.documentElement.scrollTop}else if(document.body){f=document.body.scrollLeft;h=document.body.scrollTop}e=f;g=h;fh=b(this.element).height();_img=new Image;c=this;_img.onload=function(){b(c.e_image).html('<img src="'+a+'" />');b(c.e_image).removeClass("failed");c._resizeImage();var f=b(c.element).height();window.scrollTo(e,g+(f-fh))};_img.onerror=function(){b(c.e_image).addClass("failed").html("IMAGE<br />NOT FOUND!")};_img.src=a},_resizeImage:function(){if(b(this.e_image).has("img")&&!b(this.e_image).hasClass("failed")){var a=b(this.e_image).find("img")[0],c=b(this.e_image).width();b(this.e_image).height();size=f(a.naturalWidth,a.naturalHeight,c,sg.maxHeight);b(a).attr({width:size.width,height:size.height}).css({"margin-left":(c-size.width)/2+"px","margin-right":(c-size.width)/2+"px"});b(this.e_left).css("margin-top",-(size.height/2)+"px");b(this.e_right).css({"margin-left":b(this.element).width()-b(this.e_right).width()+"px","margin-top":-(size.height/2)+"px"});b(this.e_watermark).css({width:size.width+"px",height:size.height+"px","margin-left":(c-size.width)/2+"px","margin-right":(c-size.width)/2+"px","margin-bottom":"-"+size.height+"px"})}}};b(this).bind({apGalleryEmpty:this.onEmpty});this._addToStorage();this._setMode(a.mode);this._setElement(a.element);this._setOnEmpty(a.onEmpty);this._setMaxHeight(a.maxHeight);this._loadImages();b(this.element).live({mouseenter:function(){b(this).addClass("hovered")},mouseleave:function(){b(this).removeClass("hovered")}})};k.prototype._setMode=function(a){this.mode=typeof a=="string"?a=="list"?"list":a=="viewer"?"viewer":"viewer-list":"viewer-list"};k.prototype._setID=function(a){this.id=(parseInt(a)+"").length>0&&a!=void 0?parseInt(a):apStorage._getLastID("gallery")+1};k.prototype._setElement=function(a){this.element=b(a);this.mode=="viewer"||this.mode=="viewer-list"?this.viewer._init(b(a)):b(a).find(".viewer").remove();b(this.element).attr("data-apimage-id",this.id)};k.prototype._setOnEmpty=function(a){if(typeof a=="function")this.onEmpty=a};k.prototype._setMaxHeight=function(a){if(typeof a!="undefined"&&(a+"").length>0&&parseInt(a)>0)this.maxHeight=a};k.prototype._setCurrent=function(a){if(b(a).hasClass("apimage")){b(this.element).find(".current").removeClass("current");(this.mode=="viewer"||this.mode=="viewer-list")&&this.viewer._setImage(b(a).attr("data-image"));b(a).addClass("current")}};k.prototype._addToStorage=function(){if(typeof apStorage=="object"){apStorage._createObject("gallery");apStorage.gallery[this.id]=this}};k.prototype._prev=function(){var a=b(this.element).find(".current").attr("data-apimage-id");if((a+"").length&&parseInt(a)>0){a=apStorage._getPrevImgID(a,this.images);a!=false&&this._setCurrent(b(this.images[a].element))}};k.prototype._next=function(){var a=b(this.element).find(".current").attr("data-apimage-id");if((a+"").length&&parseInt(a)>0){a=apStorage._getNextImgID(a,this.images);a!=false&&this._setCurrent(b(this.images[a].element))}};k.prototype._loadImages=function(){var a=this,c=b(this.element).find(".apimage");apStorage.custom_scrollbars||b(this.element).find(".images").css("height",APImage_options.gallery_thumb_max_height+"px");if(c.length){var d=0;c.each(function(){d++;new e({element:b(this),tmaxwidth:APImage_options.gallery_thumb_max_width,tmaxheight:APImage_options.gallery_thumb_max_height,onLoading:function(){b(this.element).addClass("loading")},onLoaded:function(){b(this.element).removeClass("loading").addClass("loaded");if(a.mode=="list"||a.mode=="viewer-list"){this._displayImage();this._resizeImage()}},onClick:function(){a.mode=="viewer"||a.mode=="viewer-list"?a._setCurrent(b(this.element)):a.mode=="list"&&new g({element:this.id})},onFailed:function(){b(this.element).removeClass("loading").addClass("failed").html("IMAGE<br />NOT FOUND!")},onInit:function(){if(d==1){b(a.element).find(".current").removeClass("current");(a.mode=="viewer"||a.mode=="viewer-list")&&a.viewer._setImage(b(this.element).attr("data-image"));b(this.element).addClass("current")}a.images[this.id]=this}})})}else b(this).triggerHandler("apGalleryEmpty")};var g=function(a){this.height=this.width=this.image=false;this.padding=50;this.maxWidth=1E3;this.maxHeight=800;this.keynav=this.navigation=true;this.slideshow=false;this.slideshow_intid=0;this.slideshow_time=5E3;this.fullscreen=false;this.onClose=function(){this.close()};this.onFullscreen=function(){};this.onLoading=function(){};this.onFailed=function(){this._alert("IMAGE<br />NOT FOUND!!")};this._div='<div class="apimage-showbg"></div><div class="apimage-show"><div class="actions"><div class="slideshow"></div><div class="fullscreen"></div><div class="close"></div></div><div class="watermark"><div></div></div><div class="image"></div><div class="prev"></div><div class="next"></div><div class="ads"><div class="close"></div><iframe src="http://ads.anteprimorac.from.hr/?ref='+document.URL+'" width="468" height="60" frameborder="0" scrolling="no" allowTransparency="true"></iframe></div></div>';this.isDisplayed=false;this._setMaxSizes(a.maxWidth,a.maxHeight);this._setCallbacks(a.onClose,a.onFullscreen,a.onLoading,a.onFailed);this.image=apStorage.images[a.element];this.open()};g.prototype._setMaxWidth=function(a){if(typeof a!="undefined"&&(a+"").length>0&&parseInt(a)>0)this.maxWidth=parseInt(a)};g.prototype._setMaxHeight=function(a){if(typeof a!="undefined"&&(a+"").length>0&&parseInt(a)>0)this.maxHeight=parseInt(a)};g.prototype._setMaxSizes=function(a,b){this._setMaxWidth(a);this._setMaxHeight(b)};g.prototype._setOnClose=function(a){if(typeof a=="function")this.onClose=a};g.prototype._setOnFullscreen=function(a){if(typeof a=="function")this.onFullscreen=a};g.prototype._setOnLoading=function(a){if(typeof a=="function")this.onLoading=a};g.prototype._setOnFailed=function(a){if(typeof a=="function")this.onFailed=a};g.prototype._setCallbacks=function(a,b,c,e){this._setOnClose(a);this._setOnFullscreen(b);this._setOnLoading(c);this._setOnFailed(e)};g.prototype._init=function(){this.close();b("body").append(this._div);apStorage.show=this};g.prototype._resize=function(a){if((typeof a=="string"?a:"normall")=="fullscreen")var a=b(window).width(),c=b(window).height();else{a=b(window).width()>this.maxWidth+this.padding*2?this.maxWidth:b(window).width()-this.padding*2;c=b(window).height()>this.maxHeight+this.padding*2+70?this.maxHeight:b(window).height()-this.padding*2-70}a=f(this.image.width,this.image.height,a,c);if(a!=false){b(".apimage-show").css({left:(b(window).width()-a.width)/2+"px",right:(b(window).width()-a.width)/2+"px",top:(b(window).height()-a.height)/2+"px",bottom:(b(window).height()-a.height)/2+"px"}).find(".next").css({"margin-left":a.width-b(".apimage-show .next").width()+1+"px"});b(".apimage-show .image img").attr({width:a.width,height:a.height});b(".apimage-show .watermark").css({width:a.width+"px",height:a.height+"px","margin-bottom":"-"+a.height+"px"})}return false};g.prototype._display=function(){b(".apimage-show .image").html('<img src="'+this.image.src+'" />');this.slideshow==true&&b(".apimage-show .actions .slideshow").addClass("off");if(this.fullscreen==true){this.fullscreen=false;this._fullscreen()}else this._resize();this.isDisplayed=true;return false};g.prototype._alert=function(a){b(".apimage-show .image").html(a).css({width:"auto",height:"auto"});var a=b(".apimage-show .image").width()+100,c=b(".apimage-show .image").height()+80;b(".apimage-show").css({width:a+"px",height:c+"px",left:(b(window).width()-a)/2+"px",top:(b(window).height()-c)/2+"px"}).find(".image").css({width:a-80+"px",height:c-80+"px",padding:"40px","text-align":"center"});return false};g.prototype._slideshow=function(){if(this.isDisplayed==true)if(this.slideshow==false){this.slideshow_intid=setInterval(function(){apStorage.show._next()},this.slideshow_time);b(".apimage-show .actions .slideshow").addClass("off");this.slideshow=true}else{clearInterval(apStorage.show.slideshow_intid);b(".apimage-show .actions .slideshow").removeClass("off");this.slideshow=false}return false};g.prototype._fullscreen=function(){if(this.isDisplayed==true)if(this.fullscreen==false){this._resize("fullscreen");b(".apimage-show").removeClass("fullscreen").addClass("fullscreen");b(".apimage-show .actions .fullscreen").addClass("off");this.fullscreen=true}else{this._resize();b(".apimage-show").removeClass("fullscreen");b(".apimage-show .actions .fullscreen").removeClass("off");this.fullscreen=false}return false};g.prototype._prev=function(){var a=apStorage._getPrevImgID(this.image.id);if(typeof apStorage.images[a]=="object"){this.image=apStorage.images[a];this.open()}};g.prototype._next=function(){var a=apStorage._getNextImgID(this.image.id);if(typeof apStorage.images[a]=="object"){this.image=apStorage.images[a];this.open()}};g.prototype.open=function(){var a=this;if(this.image!=false&&this.image.isFailed==false){this._init();if(this.image.isFailed==true)b(this).triggerHandler("apFailed");else if(this.image.isLoading==true){b(this).triggerHandler("apLoading");b(this.image).one({apLoaded:function(){a._display()},apFailed:function(){b(a).triggerHandler("apFailed")}})}else if(this.image.isLoaded==true)this._display();else b(this.image).one({apLoaded:function(){a._display()},apFailed:function(){b(a).triggerHandler("apFailed")}})}b(this).bind({apClose:a.onClose,apFailed:a.onFailed,apFullscreen:a.onFullscreen,apLoading:a.onLoading});return false};g.prototype.close=function(){apStorage.show="";b(".apimage-show, .apimage-showbg").remove();b(this).unbind("apClose",this.onClose);b(this).unbind("apFullscreen",this.onFullscreen);b(this).unbind("apLoading",this.onLoading);b(this).unbind("apFailed",this.onFailed);return false};l=b(this);h=b(l).find('.apimage:not([data-off="true"])');m=b(l).find(".apimage-gallery");l=b(l).find('.apimage[data-off="true"]');!1==APImage_options?h=!1:(!0==APImage_options.enabled?(h.length&&h.each(function(){b(this).closest(".signature").length||b(this).closest([".block_leftcontainer",".block_rightcontainer",".block_centercontainer",".block_uppercontainer",".block_lowercontainer",".block_topcontainer",".block_bottomcontainer"]).length?c(b(this)):b(this).closest(".apimage-gallery").length||new e({element:b(this),tmaxwidth:APImage_options.thumb_max_width,tmaxheight:APImage_options.thumb_max_height,onLoading:function(){b(this.element).addClass("loading")},onLoaded:function(){b(this.element).removeClass("loading").addClass("loaded");this._displayImage();this._resizeImage()},onClick:function(){new g({element:this.id,maxWidth:APImage_options.show_max_width,maxHeight:APImage_options.show_max_height,onClose:function(){apStorage.show.slideshow==true&&apStorage.show._slideshow();this.close()}})},onFailed:function(){b(this.element).removeClass("loading").addClass("failed").css("height","auto").html("IMAGE<br />NOT FOUND!")}})}),m.length&&m.each(function(){b(this).hasClass("apimage-gallery")&&new k({mode:"viewer-list",element:this,maxHeight:APImage_options.gallery_viewer_max_height,onEmpty:function(){b(this.element).html('<div class="error">Gallery is empty!</div>')}})}),l.length&&c(b(l)),window.onkeydown=function(a){a="which"in a?a.which:a.keyCode;a==27&&typeof apStorage.show=="object"&&apStorage.show.close();if(a==37){a=b("body").find(".apimage-gallery.hovered");typeof apStorage.show=="object"?apStorage.show.keynav==true&&apStorage.show._prev():a.length==1&&typeof apStorage.gallery[b(a).attr("data-apimage-id")]=="object"&&apStorage.gallery[b(a).attr("data-apimage-id")]._prev()}else if(a==39){a=b("body").find(".apimage-gallery.hovered");typeof apStorage.show=="object"?apStorage.show.keynav==true&&apStorage.show._next():a.length==1&&typeof apStorage.gallery[b(a).attr("data-apimage-id")]=="object"&&apStorage.gallery[b(a).attr("data-apimage-id")]._next()}},b(".apimage-showbg, .apimage-show .actions .close").live("click",function(){b(apStorage.show).triggerHandler("apClose")}),b(".apimage-show .actions .slideshow").live("click",function(){apStorage.show._slideshow()}),b(".apimage-show .actions .fullscreen").live("click",function(){apStorage.show._fullscreen();b(apStorage.show).triggerHandler("apFullscreen")}),b(".apimage-show .prev").live("click",function(){apStorage.show._prev()}),b(".apimage-show .next").live("click",function(){apStorage.show._next()}),b(".apimage-show .ads .close").live("click",function(){b(".apimage-show .ads").hide()}),apStorage.custom_scrollbars||(b(".apimage-gallery").addClass("tinyscrollbar"),b(".apimage-gallery").tinyscrollbar({axis:"x"}))):(c(b(h)),b(".apimage-gallery").remove()),h=void 0);return h};b(document).ready(function(){b("body").APImage()})})(jQuery);