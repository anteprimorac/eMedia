/*
	Filename: apimage.js
	Description: Javascript of APImage mod for SMF 2.x.x and SMF 1.1.x
	
	Mod: APImage
	Mod demo: http://smf.anteprimorac.from.hr/index.php?topic=2.0
	Mod version: 0.3
	Compatible: SMF 2.x.x and SMF 1.1.x
	
	Author: Ante Primorac
	Author URI: http://anteprimorac.from.hr
*/

/*		TODO:
	-design URAĐENO
	- turn off APImage on single image URAĐENO
	- facebook parse URAĐENO
	- turn off APImage in signature URAĐENO
	- watermark URAĐENO
	- turn off in TinyPortal blocks URAĐENO
	- slideshow URAĐENO
	- gallery tag button URAĐENO
*/

var apStorage = {
	/*
		Function: _createObject
		Description: Dodaje images || gallerys objekt u apStorage
	*/
	"_createObject": function(m) {
		var o = (m+"").length > 0 && typeof m != "undefined" ? m : "images";
		if(typeof apStorage[o] != "object") {
			apStorage[o] = {};
			return true;
		}
		else return false;
	},
	
	/*
		Function: _getLastID
		Description: Vraća zadnji ID u images
	*/
	"_getLastID": function(m) {
		/*if(is_array(apStorage.images)) return apStorage.images[apStorage.images.length - 1];
		else {
			apStorage._createImages();
			return 0;
		}*/
		var o = (m+"").length > 0 && typeof m != "undefined" ? m : "images";
		if(typeof apStorage[o] == "object") {
			var last = 0;
			for(i in apStorage[o]) {
				if(apStorage[o][i].id > last) last = apStorage[o][i].id;
			}
			return parseInt(last);
		}
		else {
			apStorage._createObject(o);
			return 0;
		}
	},
	"_getPrevImgID": function(id, o) {
		var o = typeof o == "object" ? o : apStorage.images;
		if(typeof o == "object") {
			var
				prev_id = false,
				last_id = false,
				is_prev = true;
			for(i in o) {
				if(apStorage.images[i].id == id) is_prev = false;
				if(is_prev == true && o[i].isFailed == false) prev_id = o[i].id;
				if(o[i].isFailed == false) last_id = o[i].id;
			}
			if(prev_id == false) {
				if(last_id != false) prev_id = last_id;
			}
			
			return prev_id;
		}
		else return false;
	},
	"_getNextImgID": function(id, o) {
		var o = typeof o == "object" ? o : apStorage.images;
		if(typeof o == "object") {
			var
				next_id = false,
				first_id = false,
				is_next = false;
			for(i in o) {
				if(first_id == false && o[i].isFailed == false) first_id = o[i].id;
				if(is_next == true && o[i].isFailed == false) next_id = o[i].id, is_next = false;
				if(o[i].id == id) is_next = true;
			}
			if(next_id == false) {
				if(first_id != false) next_id = first_id;
			}
			
			return next_id;
		}
		else return false;
	}
};

(function($) {
	/*
	 * Tiny Scrollbar 1.8
	 * http://www.baijs.nl/tinyscrollbar/
	 *
	 * Copyright 2012, Maarten Baijs
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.opensource.org/licenses/gpl-2.0.php
	 *
	 * Date: 26 / 07 / 2012
	 * Depends on library: jQuery
	 *
	 */
	
	$.tiny = $.tiny || { };

	$.tiny.scrollbar = {
		options: {
			axis       : 'y'    // vertical or horizontal scrollbar? ( x || y ).
			,   wheel      : 40     // how many pixels must the mouswheel scroll at a time.
			,   scroll     : true   // enable or disable the mousewheel.
			,   lockscroll : true   // return scrollwheel to browser if there is no more content.
			,   size       : 'auto' // set the size of the scrollbar to auto or a fixed number.
			,   sizethumb  : 'auto' // set the size of the thumb to auto or a fixed number.
		}
	};

	$.fn.tinyscrollbar = function( params ) {
		var options = $.extend( {}, $.tiny.scrollbar.options, params );

		this.each( function()
		{ 
			$( this ).data('tsb', new Scrollbar( $( this ), options ) );
		});

		return this;
	};

	$.fn.tinyscrollbar_update = function(sScroll)
	{
		return $( this ).data( 'tsb' ).update( sScroll );
	};

	function Scrollbar( root, options )
	{
		var oSelf       = this
		,   oWrapper    = root
		,   oViewport   = { obj: $(root).find('.viewport') }
		,   oContent    = { obj: $(root).find('.overview') }
		,   oScrollbar  = { obj: $(root).find('.scrollbar') }
		,   oTrack      = { obj: $(oScrollbar.obj).find('.track') }
		,   oThumb      = { obj: $(oScrollbar.obj).find('.thumb') }
		,   sAxis       = options.axis === 'x'
		,   sDirection  = sAxis ? 'left' : 'top'
		,   sSize       = sAxis ? 'Width' : 'Height'
		,   iScroll     = 0
		,   iPosition   = { start: 0, now: 0 }
		,   iMouse      = {}
		,   touchEvents = ( 'ontouchstart' in document.documentElement ) ? true : false
		;

		console.dir(oContent.obj);

		function initialize()
		{
			oSelf.update();
			setEvents();

			return oSelf;
		}

		this.update = function( sScroll )
		{
			oViewport[ options.axis ] = oViewport.obj[0][ 'offset'+ sSize ];
			oContent[ options.axis ]  = oContent.obj[0][ 'scroll'+ sSize ];
			oContent.ratio = oViewport[ options.axis ] / oContent[ options.axis ];

			oScrollbar.obj.toggleClass( 'disable', oContent.ratio >= 1 );

			oTrack[ options.axis ] = options.size === 'auto' ? oViewport[ options.axis ] : options.size;
			oThumb[ options.axis ] = Math.min( oTrack[ options.axis ], Math.max( 0, ( options.sizethumb === 'auto' ? ( oTrack[ options.axis ] * oContent.ratio ) : options.sizethumb ) ) );
		
			oScrollbar.ratio = options.sizethumb === 'auto' ? ( oContent[ options.axis ] / oTrack[ options.axis ] ) : ( oContent[ options.axis ] - oViewport[ options.axis ] ) / ( oTrack[ options.axis ] - oThumb[ options.axis ] );
			
			iScroll = ( sScroll === 'relative' && oContent.ratio <= 1 ) ? Math.min( ( oContent[ options.axis ] - oViewport[ options.axis ] ), Math.max( 0, iScroll )) : 0;
			iScroll = ( sScroll === 'bottom' && oContent.ratio <= 1 ) ? ( oContent[ options.axis ] - oViewport[ options.axis ] ) : isNaN( parseInt( sScroll, 10 ) ) ? iScroll : parseInt( sScroll, 10 );
			
			setSize();
		};

		function setSize()
		{
			var sCssSize = sSize.toLowerCase();

			oThumb.obj.css( sDirection, iScroll / oScrollbar.ratio );
			oContent.obj.css( sDirection, -iScroll );
			iMouse.start = oThumb.obj.offset()[ sDirection ];

			oScrollbar.obj.css( sCssSize, oTrack[ options.axis ] );
			oTrack.obj.css( sCssSize, oTrack[ options.axis ] );
			oThumb.obj.css( sCssSize, oThumb[ options.axis ] );
		}

		function setEvents()
		{
			if( ! touchEvents )
			{
				oThumb.obj.bind( 'mousedown', start );
				oTrack.obj.bind( 'mouseup', drag );
			}
			else
			{
				oViewport.obj[0].ontouchstart = function( event )
				{   
					if( 1 === event.touches.length )
					{
						start( event.touches[ 0 ] );
						event.stopPropagation();
					}
				};
			}

			if( options.scroll && window.addEventListener )
			{
				oWrapper[0].addEventListener( 'DOMMouseScroll', wheel, false );
				oWrapper[0].addEventListener( 'mousewheel', wheel, false );
			}
			else if( options.scroll )
			{
				oWrapper[0].onmousewheel = wheel;
			}
		}

		function start( event )
		{
			var oThumbDir = parseInt( oThumb.obj.css( sDirection ), 10 );
			iMouse.start = sAxis ? event.pageX : event.pageY;
			iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
			
			if( ! touchEvents )
			{
				$( document ).bind( 'mousemove', drag );
				$( document ).bind( 'mouseup', end );
				oThumb.obj.bind( 'mouseup', end );
			}
			else
			{
				document.ontouchmove = function( event )
				{
					event.preventDefault();
					drag( event.touches[ 0 ] );
				};
				document.ontouchend = end;
			}
		}

		function wheel( event )
		{
			if( oContent.ratio < 1 )
			{
				var oEvent = event || window.event
				,   iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3
				;

				iScroll -= iDelta * options.wheel;
				iScroll = Math.min( ( oContent[ options.axis ] - oViewport[ options.axis ] ), Math.max( 0, iScroll ));

				oThumb.obj.css( sDirection, iScroll / oScrollbar.ratio );
				oContent.obj.css( sDirection, -iScroll );

				if( options.lockscroll || ( iScroll !== ( oContent[ options.axis ] - oViewport[ options.axis ] ) && iScroll !== 0 ) )
				{
					oEvent = $.event.fix( oEvent );
					oEvent.preventDefault();
				}
			}
		}

		function drag( event )
		{
			console.log(event);
			console.dir(oContent);
			if( oContent.ratio < 1 )
			{
				if( ! touchEvents )
				{
					iPosition.now = Math.min( ( oTrack[ options.axis ] - oThumb[ options.axis ] ), Math.max( 0, ( iPosition.start + ( ( sAxis ? event.pageX : event.pageY ) - iMouse.start))));
				}
				else
				{
					iPosition.now = Math.min( ( oTrack[ options.axis ] - oThumb[ options.axis ] ), Math.max( 0, ( iPosition.start + ( iMouse.start - ( sAxis ? event.pageX : event.pageY ) ))));
				}

				iScroll = iPosition.now * oScrollbar.ratio;
				oContent.obj.css( sDirection, -iScroll );
				oThumb.obj.css( sDirection, iPosition.now );
			}
		}
		
		function end()
		{
			$( document ).unbind( 'mousemove', drag );
			$( document ).unbind( 'mouseup', end );
			oThumb.obj.unbind( 'mouseup', end );
			document.ontouchmove = document.ontouchend = null;
		}

		return initialize();
	}


	$.fn.APImage = function() {
		/*
			Function: support_scrollbars
			Description: Provjerava da li browser podržava custom style scrollbars PS: stolen from modernizr
			Arguments:
				---
		*/
		function support_scrollbars() {
			var prefixes = ' -webkit- -moz- -o- -ms- '.split(' '), mod = "modernizr", rule = "#modernizr{overflow: scroll; width: 40px }#" + prefixes .join("scrollbar{width:0px}"+' #modernizr::').split('#').slice(1).join('#') + "scrollbar{width:0px}", style, ret, node,
				div = document.createElement('div'),
				docElement = document.documentElement,
				body = document.body,
				fakeBody = body ? body : document.createElement('body');

			style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
			div.id = mod;
			(body ? div : fakeBody).innerHTML += style;
			fakeBody.appendChild(div);
			if( !body ) {
				fakeBody.style.background = "";
				docElement.appendChild(fakeBody);
			}
			return 'scrollWidth' in div && div.scrollWidth == 40;
		}

		/* Kao neka globalna varijabla za provjeru da li browser podržava custom style scrollbars */
		apStorage.custom_scrollbars = support_scrollbars();

		/*
			Function: is_array
			Description: Vraća true ako je typeof argument array jednak array
			Arguments:
				array - object
		*/
		function is_array(array) {
						
			/*
			if(typeof array == "object") {
				if(array.length) return true;
				else return false;
			}
			else return false;
			*/
						
			return typeof array == "object" ? (array.length ? true : false) : false;
		};
		
		function vpD() {
			var w, h, l, t;
			if(self.innerHeight) w = self.innerWidth, h = self.innerHeight;
			else if(document.documentElement && document.documentElement.clientHeight) w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
			else if(document.body) w = document.body.clientWidth, w = document.body.clientHeight;
			
			if(self.pageYOffset) l = self.pageXOffset, t = self.pageYOffset;
			else if(document.documentElement && document.documentElement.scrollTop) l = document.documentElement.scrollLeft, t = document.documentElement.scrollTop;
			else if(document.body) l = document.body.scrollLeft, t = document.body.scrollTop;
			return {"w" : w, "h" : h, "l" : l, "t" : t};
		};
		
		/*
			Function: APgetSize
			Description: Algoritam za dobivanje smanjene veličine slika
			Arguments:
				width - int
				height - int
				maxwidth - int
				maxheight -int
				mode - string
					resize - Smanjiva po manjoj veličini
					crop - Otkida gornji lijevi ugao
					resize and crop - Smanjiva po manjoj veličini i otkida gornji lijevi ugao
		*/
		
		function APgetSize(width, height, maxwidth, maxheight, mode) {
			var
				w = 0,
				h = 0,
				r = 0,
				b = 0;
			width = parseInt(width) > 0 ? parseInt(width) : false;
			height = parseInt(height) > 0 ? parseInt(height) : false;
			maxwidth = parseInt(maxwidth) >= 0 ? parseInt(maxwidth) : false;
			maxheight = parseInt(maxheight) >= 0 ? parseInt(maxheight) : false;
			mode = typeof mode == "string" ? mode : false;
			
			if(width === false || height === false || maxwidth === false || maxheight === false) return false;
			if(mode === false || (mode != "crop" && mode != "resize" && mode != "resize and crop")) mode = "resize";
			
			if(mode == "resize") {
				if((width < maxwidth && height < maxheight) || (maxwidth == 0 && maxheight == 0)) w = width, h = height
				else {
					var r = 0;
					if(maxwidth == 0)
						r = maxheight / height;
					else if(maxheight == 0)
						r = maxwidth / width;
					else
						r = (maxwidth / width) < (maxheight / height) ? maxwidth / width : maxheight / height;
					w = width * r;
					h = height * r;
				}
			}
			else if(mode == "crop") {
				if((width < maxwidth && height < maxheight) || (maxwidth == 0 && maxheight == 0)) w = width, h = height
				else {
					w = maxwidth == 0 ? width : maxwidth;
					h = maxheight == 0 ? height : maxheight;
					r = -(width - w);
					b = -(height - h);
				}
			}
			else if(mode == "resize and crop") {
				if((width < maxwidth && height < maxheight) || (maxwidth == 0 && maxheight == 0)) w = width, h = height
				else {
					maxwidth = maxwidth == 0 ? width : maxwidth;
					maxheight = maxheight == 0 ? height : maxheight;
					
					var r = (width < height || maxwidth < maxheight) ? maxwidth / width : maxheight / height;
					w = width * r;
					h = height * r;
					r = w > maxwidth ? -(w - maxwidth) : 0;
					b = h > maxheight ? -(h - maxheight) : 0;
				}
			}
			
			return {"width": w, "height": h, "right": r, "bottom": b};
		};
		
		/*
			Function: load_options
			Description: Učitava opcije moda
			Arguments:
				---
		*/
		function load_options() {
			if(typeof APImage_options == "object") {
				APImage_options['enabled'] = APImage_options['enabled'] == 1 ? true : false;
				APImage_options['thumb_max_width'] = (APImage_options['thumb_max_width'] + '').length > 0 && parseInt(APImage_options['thumb_max_width']) > 0 ? parseInt(APImage_options['thumb_max_width']) : 0;
				APImage_options['thumb_max_height'] = (APImage_options['thumb_max_height'] + '').length > 0 && parseInt(APImage_options['thumb_max_height']) > 0 ? parseInt(APImage_options['thumb_max_height']) : 0;
				APImage_options['gallery_viewer_max_height'] = (APImage_options['gallery_viewer_max_height'] + '').length > 0 && parseInt(APImage_options['gallery_viewer_max_height']) > 0 ? parseInt(APImage_options['gallery_viewer_max_height']) : 0;
				APImage_options['gallery_thumb_max_width'] = (APImage_options['gallery_thumb_max_width'] + '').length > 0 && parseInt(APImage_options['gallery_thumb_max_width']) > 0 ? parseInt(APImage_options['gallery_thumb_max_width']) : 0;
				APImage_options['gallery_thumb_max_height'] = (APImage_options['gallery_thumb_max_height'] + '').length > 0 && parseInt(APImage_options['gallery_thumb_max_height']) > 0 ? parseInt(APImage_options['gallery_thumb_max_height']) : 0;
				APImage_options['show_max_width'] = (APImage_options['show_max_width'] + '').length > 0 && parseInt(APImage_options['show_max_width']) > 0 ? parseInt(APImage_options['show_max_width']) : 0;
				APImage_options['show_max_height'] = (APImage_options['show_max_height'] + '').length > 0 && parseInt(APImage_options['show_max_height']) > 0 ? parseInt(APImage_options['show_max_height']) : 0;
			}
			else APImage_options = false;
		};
		load_options();
		
		/* OBJECTS */
		/*
			Object: image
			Arguments:
				//e - jquery || dom object - element
				o - object {
					element: jquery element,
					tmaxwidth: number,
					tmaxheight: number,
					onFailed: function(event) {//some code},
					onLoaded: function(event) {//some code},
					onLoading: function(event) {//some code},
					onClick: function(event) {//some code},
					onInit: function(event) {//some code},
			}
		*/
		
		var image = function(o) {
			this.id = false;
			this.element = false;
			this.src = false;
			this.tmaxwidth = false;
			this.tmaxheight = false;
			this.twidth = false;
			this.theight = false;
			this.tpadding = 0;
			this.isLoading = false;
			this.isLoaded = false;
			this.isFailed = false;
			this.imageDisplayed = false;
			this.onLoading = function(event) {};
			this.onLoaded = function(event) {};
			this.onFailed = function(event) {};
			this.onClick = function(event) {};
			this.onInit = function() {};
			
			this._setID(); // Set new ID
			this._addToStorage(); // Add to apStorage
			
			this._setMode(o.mode);
			this._setTMaxSize(o.tmaxwidth, o.tmaxheight); // Set thumbnail max width & max height
			this._setElement(o.element); // Set image element
			this._setCallbacks(o.onLoading, o.onLoaded, o.onFailed, o.onClick, o.onInit);
			
			this.onInit();
			
			this._loadImage(); // Load this image
			
			/* EVENTS */
			$(this).bind({
				"apLoading": this.onLoading,
				"apLoaded": this.onLoaded,
				"apFailed": this.onFailed,
				"apClick": this.onClick
			});
			
			var self = this;
			
			$(this.element).live({
				"click": function() {
					$(self).triggerHandler("apClick");
				}
			});
		};
				
			/* METHODS */
			
			/* SET */
			
			/*
				Function: _setMode
				Description: Postavlja mod slike tj this.mode
				Arguments:
				mode - string - mod slike - normall(undefined) || gallery
			*/
			image.prototype._setMode = function(mode) {
				/*
				if(typeof mode == "string") {
					if(mode == "gallery") this.mode = "gallery";
					else this.mode = "normall";
				}
				else this.mode = "normall";
				*/
				this.mode = (typeof mode == "string") ? (mode == "gallery" ? "gallery" : "normall") : "normall";
			};
					
			/*
				Function: _setID
				Description: Postavlja id slike tj. this.id
				Arguments:
				id - number - id slike
			*/
			image.prototype._setID = function(id) {
				this.id = (parseInt(id)+"").length > 0 && id != undefined ? parseInt(id) : apStorage._getLastID() + 1;
			};
			
			/*
				Function: _setSrc
				Description: Postavlja link slike tj. this.src
				Arguments:
				src - string - link slike
			*/
			image.prototype._setSrc = function(src) {
				this.src = (src+"").length > 0 ? src : false;
			};
			
			/*
				Function: _setTMaxWidth
				Description: Postavlja max width thumba slike tj. this.tmaxwidth
				Arguments:
					width - thumbnail max width
			*/
			image.prototype._setTMaxWidth = function(width) {
				if(typeof width != "undefined" && parseInt(width) >= 0)
					this.tmaxwidth = parseInt(width);
			};
			
			/*
				Function: _setTMaxHeight
				Description: Postavlja max height thumba slike tj. this.tmaxheight
				Arguments:
					width - thumbnail max height
			*/
			image.prototype._setTMaxHeight = function(height) {
				if(typeof height != "undefined" && parseInt(height) >= 0)
					this.tmaxheight = parseInt(height);
			};
						
			/*
				Function: _setTwidth
				Description: Postavlja width thumba slike tj. this.twidth
				Arguments:
					width - thumbnail width
			*/
			image.prototype._setTwidth = function(width) {
				var _max = this.tmaxwidth == false ? 0 : this.tmaxwidth;
				this.twidth = parseInt((parseInt(width)+"").length > 0 && parseInt(width) < (_max != 0 ? _max : 9999) ? parseInt(width) : _max);
			};
			
			/*
				Function: _setTheight
				Description: Postavlja height thumba slike tj. this.theight
				Arguments:
				height - thumbnail height
			*/
			image.prototype._setTheight = function(height) {
				var _max = this.tmaxheight == false ? 0 : this.tmaxheight;
				this.theight = parseInt((parseInt(height)+"").length > 0 && parseInt(height) < (_max != 0 ? _max : 9999) ? parseInt(height) : _max);
			};
			
			/*
				Function: _setTsize
				Description: Postavlja width i height thumba slike tj. this.twidth i this.theight
				Arguments:
				width - thumbnail width
				height - thumbnail height
			*/
			image.prototype._setTsize = function(width, height) {
				this._setTwidth(width);
				this._setTheight(height);
			};
			
			/*
				Function: _setTMaxSize
				Description: Postavlja max width i max height thumba slike tj. this.tmaxwidth i this.tmaxheight
				Arguments:
				width - thumbnail max width
				height - thumbnail max height
			*/
			image.prototype._setTMaxSize = function(width, height) {
				this._setTMaxWidth(width);
				this._setTMaxHeight(height);
			};
			
			/*
				Function: _setElement
				Description: Postavlja element, src, twidth i theight
				Arguments:
				e - jquery || dom object
			*/
			image.prototype._setElement = function(e) {
				this.element = $(e);
				this._setSrc($(e).attr("data-image")); // Set new src
				this._setTsize($(e).attr("data-width"), $(e).attr("data-height")); // Set thumbnail width & height
				$(this.element).css({
					"width": (this.twidth - (this.tpadding * 2))+"px",
					"height": (this.theight - (this.tpadding * 2))+"px"
				}).attr("data-apimage-id", this.id).addClass("host-" + this.src.match(/^(?:f|ht)tp(?:s)?\:\/\/(?:www.)?([^\/]*)/)[1] +" name-" + this.src.match(/[^\/]*(?=\.[\w]+$)/)[0] + " type-" + this.src.match(/[^\/\.]*$/)[0]);
			};
			
			/*
				Function: _setIsLoading
				Description: Postavlja var isLoaded i isLoading i isFailed
				Arguments:
				state - boolean
			*/
			image.prototype._setIsLoading = function(state) {
				if(state == true) this.isLoading = true, this.isLoaded = false, this.isFailed = false, $(this).triggerHandler("apLoading");
				else if(state == false) this.isLoading = false;
				else this.isLoading = false;
			};
			
			/*
				Function: _setIsLoaded
				Description: Postavlja var isLoaded i isLoading i isFailed
				Arguments:
				state - boolean
			*/
			image.prototype._setIsLoaded = function(state) {
				if(state == true) this.isLoaded = true, this.isLoading = false, this.isFailed = false, $(this).triggerHandler("apLoaded");
				else if(state == false) this.isLoaded = false;
				else this.isLoaded = false;
			};
			
			/*
				Function: _setIsFailed
				Description: Postavlja var isLoaded i isLoading i isFailed
				Arguments:
				state - boolean
			*/
			image.prototype._setIsFailed = function(state) {
				if(state == true) this.isFailed = true, this.isLoaded = false, this.isLoading = false, $(this).triggerHandler("apFailed");
				else if(state == false) this.isFailed = false;
				else this.isFailed = false;
			};
			
			/*
				Function: _setImageDisplayed
				Description: Postavlja var imageDisplayed
				Arguments:
				state - boolean
			*/
			image.prototype._setImageDisplayed = function(state) {
				if(state == true) this.imageDisplayed = true;
				else if(state == false) this.imageDisplayed = false;
				else this.imageDisplayed = false;
			};
			
			/*
				Function: _setOnLoading
				Description: Postavlja var onLoading
				Arguments:
				f - function
			*/
			image.prototype._setOnLoading = function(f) {
				if(typeof f == "function") this.onLoading = f;
			};
			
			/*
				Function: _setOnLoaded
				Description: Postavlja var onLoaded
				Arguments:
				f - function
			*/
			image.prototype._setOnLoaded = function(f) {
				if(typeof f == "function") this.onLoaded = f;
			};
			
			/*
				Function: _setOnFailed
				Description: Postavlja var onFailed
				Arguments:
				f - function
			*/
			image.prototype._setOnFailed = function(f) {
				if(typeof f == "function") this.onFailed = f;
			};
			
			/*
				Function: _setOnClick
				Description: Postavlja var onClick
				Arguments:
				f - function
			*/
			image.prototype._setOnClick = function(f) {
				if(typeof f == "function") this.onClick = f;
			};
			
			/*
				Function: _setOnInit
				Description: Postavlja var onInit
				Arguments:
				f - function
			*/
			image.prototype._setOnInit = function(f) {
				if(typeof f == "function") this.onInit = f;
			};
			
			/*
				Function: _setCallbacks
				Description: Postavlja var onLoading, onLoaded i onFailed
				Arguments:
				onLoading - function
				onLoaded - function
				onFailed - function
			*/
			image.prototype._setCallbacks = function(onLoading, onLoaded, onFailed, onClick, onInit) {
				this._setOnLoading(onLoading);
				this._setOnLoaded(onLoaded);
				this._setOnFailed(onFailed);
				this._setOnClick(onClick);
				this._setOnInit(onInit);
			};
			
			/*
				Function: _setImgParms
				Description: Postavlja parametre u objekt
				Arguments:
					img - image object
			*/
			image.prototype._setImgParms = function(img) {
				this.width = img.naturalWidth > 0 ? img.naturalWidth : img.width;
				this.height = img.naturalHeight > 0 ? img.naturalHeight : img.height;
			};
			
			/* END SET */
			
			/*
				Function: _addToStorage
				Description: Dodaje objekt u storage i njegov id u images array
				Arguments:
					---
			*/
			image.prototype._addToStorage = function() {
				if(typeof apStorage == "object") {
					apStorage._createObject();
					apStorage.images[this.id] = this;
				}
			};
			
			/*
				Function: _loadImage
				Description: Učitava sliku i sprema njezine podatke u podatke od image objekta
				Arguments:
					---
			*/
			image.prototype._loadImage = function() {
				var _img = new Image(), self = this;
				this._setIsLoading(true);
				_img.onload = function(e) {
					self._setImgParms(this);
					self._setIsLoaded(true);
				};
				_img.onerror = function(e) {
					self._setIsFailed(true);
				};
				
				_img.src = this.src;
			};
			
			/*
				Function: _displayImage
				Description: Prikaziva sliku unutar elementa
				Arguments:
					---
			*/
			image.prototype._displayImage = function() {
				if(this.isLoaded == true) {
					$(this.element).html($("<div class=\"hover\"></div><div class=\"watermark\"><div></div></div><div class=\"image\"><img src=\""+this.src+"\" /></div>"));
					this._setImageDisplayed(true);
				}
				else {
					if(this.isLoading == true) {
						$(this).bind("apLoaded", function(e) {
							this._ba = 0;
							if(this._ba == 0) this._displayImage();
							this._ba += 1;
						});
					}
					else {
						this._loadImage();
						$(this).bind("apLoaded", function(e) {
							this._bb = 0;
							if(this._bb == 0) this._displayImage();
							this._bb += 1;
						});
					}
				}
			};
			
			/*
				Function: _resizeImage
				Description: Resize prikazanu sliku
				Arguments:
					---
			*/
			image.prototype._resizeImage = function() {
				var
					_width = this.twidth - (this.tpadding * 2),
					_height = this.theight - (this.tpadding * 2),
					size = APgetSize(this.width, this.height, _width, _height, "resize and crop"),
					e_width = size.width + size.right,
					e_height = size.height + size.bottom;
					//e_width = size.width > _width ? _width : size.width,
					//e_height = size.height > _height ? _height : size.height;

				if(this.imageDisplayed == true) {
					$(this.element).css({
						"width": e_width+"px",
						"height": e_height+"px"
					}).find(".image").css({
						"width": e_width+"px",
						"height": e_height+"px"
					}).find("img").attr({
						"width": size.width,
						"height": size.height
					}).css({
						"margin-right": size.right+"px",
						"margin-bottom": size.bottom+"px"
					});
					$(this.element).find(".hover").css({
						"width": e_width + "px",
						"height": e_height + "px",
						"margin-bottom": -e_height + "px"
					});
					$(this.element).find(".watermark").css({
						"width": e_width + "px",
						"height": e_height + "px",
						"margin-bottom": "-" + e_height + "px"
					});
				}
			};
			
			/* END METHODS */
		/* END IMAGE */
		
		/*
			Object: gallery
			Arguments:
				o - object {
					mode: string - list, viewer, viewer-list
					maxHeight: int - gallery viewer maxHeight, only if mode is viewer or viewer-list
					element: jquery element,
					onEmpty: function(event) {some code},
			}
		*/
		
		var gallery = function(o) {
			var self = sg = this;
			this.mode = false;
			this.element = false;
			this.maxHeight = 600;
			this.onEmpty = function(event) {$(this.element).remove();};
			this.images = {};
			this._setID();
			this.viewer = {
				"_init" : function(e) {
					if($(e).has(".viewer")) this._setElement($(e).find(".viewer")[0]);
				},
				"_setElement": function(e) {
					this.element = $(e);
					this.e_watermark = $(e).has(".watermark") ? $(e).find(".watermark")[0] : false;
					this.e_image = $(e).has(".image") ? $(e).find(".image")[0] : false;
					this.e_left = $(e).has(".left") ? $(e).find(".left")[0] : false;
					this.e_right = $(e).has(".right") ? $(e).find(".right")[0] : false;
					
					this._setEvents();
				},
				"_setEvents": function() {
					if(this.e_left != false) $(this.e_left).live("click", function() {
						var id = $(this).closest(".apimage-gallery").attr("data-apimage-id");
						apStorage.gallery[id]._prev();
					});
					if(this.e_right != false) $(this.e_right).live("click", function() {
						var id = $(this).closest(".apimage-gallery").attr("data-apimage-id");
						apStorage.gallery[id]._next();
					});
				},
				"_setImage": function(s) {
					var
						vp_d = vpD();
						fh = $(this.element).height(),
						_img = new Image(),
						self = this;
					_img.onload = function(e) {
						$(self.e_image).html("<img src=\""+s+"\" />");
						$(self.e_image).removeClass("failed")
						self._resizeImage();
						var lh = $(self.element).height();
						window.scrollTo(vp_d.l, vp_d.t + (lh - fh));
					};
					_img.onerror = function(e) {
						$(self.e_image).addClass("failed").html("IMAGE<br />NOT FOUND!");
					};
					
					_img.src = s;
				},
				"_resizeImage": function() {
					if($(this.e_image).has("img") && !$(this.e_image).hasClass("failed")) {
						var
							_img = $(this.e_image).find("img")[0],
							width = $(this.e_image).width(),
							height = $(this.e_image).height();
							size = APgetSize(_img.naturalWidth, _img.naturalHeight, width, sg.maxHeight);
						$(_img).attr({
							"width": size.width,
							"height": size.height
						}).css({
							"margin-left": (width - size.width) / 2 + "px",
							"margin-right": (width - size.width) / 2 + "px"
						});
						$(this.e_left).css("margin-top",  - (size.height / 2) + "px");
						$(this.e_right).css({
							"margin-left": $(this.element).width() - $(this.e_right).width() + "px",
							"margin-top": - (size.height / 2) + "px",
						});

						$(this.e_watermark).css({
							"width": size.width + "px",
							"height": size.height + "px",
							"margin-left": (width - size.width) / 2 + "px",
							"margin-right": (width - size.width) / 2 + "px",
							"margin-bottom": "-" + size.height + "px"
						});
					}
				}
			};
			
			/* EVENTS */
			$(this).bind({
				"apGalleryEmpty": this.onEmpty
			});
			
			this._addToStorage();
			
			this._setMode(o.mode);
			this._setElement(o.element);
			this._setOnEmpty(o.onEmpty);
			this._setMaxHeight(o.maxHeight);
			
			this._loadImages();
			
			/* HOVER EVENTS */
			$(this.element).live({
				"mouseenter": function() {
					$(this).addClass("hovered");
				},
				"mouseleave": function() {
					$(this).removeClass("hovered");
				}
			});
		};
		
			/* METHODS */
			
			/* SET */
			
			/*
				Function: _setMode
				Description: Postavlja mod galerije tj this.mode
				Arguments:
				mode - string - mod galerije - list || viewer || viewer-list(default)
			*/
			gallery.prototype._setMode = function(mode) {
				if(typeof mode == "string") {
					if(mode == "list") this.mode = "list";
					else if(mode == "viewer") this.mode = "viewer";
					else this.mode = "viewer-list";
				}
				else this.mode = "viewer-list";
			};
			
			/*
				Function: _setID
				Description: Postavlja id galerije tj. this.id
				Arguments:
				id - number - id galerije
			*/
			gallery.prototype._setID = function(id) {
				this.id = (parseInt(id)+"").length > 0 && id != undefined ? parseInt(id) : apStorage._getLastID("gallery") + 1;
			};
			
			/*
				Function: _setElement
				Description: Postavlja element
				Arguments:
				e - jquery || dom object
			*/
			gallery.prototype._setElement = function(e) {
				this.element = $(e);
				if(this.mode == "viewer" || this.mode == "viewer-list")
					this.viewer._init($(e));
				else $(e).find(".viewer").remove();
				$(this.element).attr("data-apimage-id", this.id);
			};
		
			/*
				Function: _setOnEmpty
				Description: Postavlja this.onEmpty
				Arguments:
				f - function
			*/
			gallery.prototype._setOnEmpty = function(f) {
				if(typeof f == "function") this.onEmpty = f;
			};
			
			/*
				Function: _setMaxHeight
				Description: Postavlja this.maxHeight
				Arguments:
					maxHeight - int
			*/
			gallery.prototype._setMaxHeight = function(maxHeight) {
				if(typeof maxHeight != "undefined") {
					if((maxHeight + "").length > 0 && parseInt(maxHeight) > 0) {
						this.maxHeight = maxHeight;
					}
				}
			};
			
			/*
				Function: _setCurrent
				Description: Postavlja sliku u viewer, ...
				Arguments:
				e - element - .apimage
			*/
			gallery.prototype._setCurrent = function(e) {
				if($(e).hasClass("apimage")) {
					$(this.element).find(".current").removeClass("current");
					if(this.mode == "viewer" || this.mode == "viewer-list") this.viewer._setImage($(e).attr("data-image"));
					/*if(this.mode == "list" || this.mode == "viewer-list") {
						var
							list = $(this.element).find(".images"),
							last = $(list).find(".apimage").last();
							offset = $(e).offset(),
							last_offset = $(last).offset(),
							left = offset.left - (last_offset.left - list[0].scrollWidth + $(e).width() + $(e).css("margin-left") + $(e).css("margin-right"));
						if((left - $(list).scrollLeft()) > ($(list).width() - $(e).width() + $(e).css("margin-left") + $(e).css("margin-right")))
							$(list).scrollLeft(left);
					}*/
					$(e).addClass("current");
				}
			};
			
			/* END SET */
			
			/*
				Function: _addToStorage
				Description: Dodaje objekt u storage
				Arguments:
					---
			*/
			gallery.prototype._addToStorage = function() {
				if(typeof apStorage == "object") {
					apStorage._createObject("gallery");
					apStorage.gallery[this.id] = this;
				}
			};
			
			/* NAVIGATION */
			/*
				Function: _prev
				Description: navigaciono nazad
				Arguments:
					---
			*/
			gallery.prototype._prev = function() {
				var current_id = $(this.element).find(".current").attr("data-apimage-id");
				if((current_id+"").length && parseInt(current_id) > 0) {
					var prev_id = apStorage._getPrevImgID(current_id, this.images);
					if(prev_id != false) this._setCurrent($(this.images[prev_id].element));
				}
			};
			
			/*
				Function: _next
				Description: navigaciono naprijed
				Arguments:
					---
			*/
			gallery.prototype._next = function() {
				var current_id = $(this.element).find(".current").attr("data-apimage-id");
				if((current_id+"").length && parseInt(current_id) > 0) {
					var next_id = apStorage._getNextImgID(current_id, this.images);
					if(next_id != false) this._setCurrent($(this.images[next_id].element));
				}
			};
			
			/*
				Function: _loadImages
				Description: učitava slike 
			*/
			gallery.prototype._loadImages = function() {
				var self = this, imgs = $(this.element).find(".apimage");
				if(!apStorage.custom_scrollbars) $(this.element).find(".images").css("height", APImage_options["gallery_thumb_max_height"] + "px");
				if(imgs.length) {
					var b = 0;
					imgs.each(function() {
						b++;
						new image({
							element: $(this),
							tmaxwidth: APImage_options["gallery_thumb_max_width"],
							tmaxheight: APImage_options["gallery_thumb_max_height"],
							onLoading: function(e) {
								$(this.element).addClass("loading");
							},
							onLoaded: function(e) {
								$(this.element).removeClass("loading").addClass("loaded");
								if(self.mode == "list" || self.mode == "viewer-list") {
									this._displayImage();
									this._resizeImage();
								}
							},
							onClick: function(e) {
								if(self.mode == "viewer" || self.mode == "viewer-list")
									self._setCurrent($(this.element));
									//self.viewer._setImage($(this.element).attr("data-image"));
								else if(self.mode == "list") {
									new show({
										element: this.id
									});
								}
							},
							onFailed: function(e) {
								$(this.element).removeClass("loading").addClass("failed").html("IMAGE<br />NOT FOUND!");
							},
							onInit: function() {
								if(b == 1) {
									$(self.element).find(".current").removeClass("current");
									if(self.mode == "viewer" || self.mode == "viewer-list")
										self.viewer._setImage($(this.element).attr("data-image"));
									$(this.element).addClass("current");
								}
								self.images[this.id] = this;
							}
						});
					});
				}
				else $(this).triggerHandler("apGalleryEmpty");
			};
			
			/* END METHODS */
		/* END GALLERY */
		
		/*
			Object: show
			Arguments:
				o - object {
					element - jquery element
					navigation - boolean
					key-navigation - boolean
					onClose - function
					onFullscreen - function
			}
		*/
		
		var show = function(o) {
			this.image = false;
			this.width = false;
			this.height = false;
			this.padding = 50;
			this.maxWidth = 1000;
			this.maxHeight = 800;
			this.navigation = true;
			this.keynav = true;
			this.slideshow = false;
			this.slideshow_intid = 0;
			this.slideshow_time = 5000;
			this.fullscreen = false;
			this.onClose = function(event) {this.close();};
			this.onFullscreen = function(event) {};
			this.onLoading = function(event) {};
			this.onFailed = function(event) {this._alert("IMAGE<br />NOT FOUND!!");};
			this._div = "<div class=\"apimage-showbg\"></div><div class=\"apimage-show\"><div class=\"actions\"><div class=\"slideshow\"></div><div class=\"fullscreen\"></div><div class=\"close\"></div></div><div class=\"watermark\"><div></div></div><div class=\"image\"></div><div class=\"prev\"></div><div class=\"next\"></div><div class=\"ads\"><div class=\"close\"></div><iframe src=\"http://ads.anteprimorac.from.hr/?ref=" + document.URL + "\" width=\"468\" height=\"60\" frameborder=\"0\" scrolling=\"no\" allowTransparency=\"true\"></iframe></div></div>";
			this.isDisplayed = false;
			
			this._setMaxSizes(o.maxWidth, o.maxHeight);
			this._setCallbacks(o.onClose, o.onFullscreen, o.onLoading, o.onFailed);
			
			this.image = apStorage.images[o.element];
			this.open();
		}
		
			/* METHODS*/
			
			/* SET */
			/*
				Function: _setMaxWidth
				Description: Postavlja varijablu maxWidth
				Arguments:
					maxWidth - int
			*/
			show.prototype._setMaxWidth = function(maxWidth) {
				if(typeof maxWidth != "undefined") {
					if((maxWidth + "").length > 0 && parseInt(maxWidth) > 0) {
						this.maxWidth = parseInt(maxWidth);
					}
				}
			};
			
			/*
				Function: _setMaxHeight
				Description: Postavlja varijablu maxHeight
				Arguments:
					maxHeight - int
			*/
			show.prototype._setMaxHeight = function(maxHeight) {
				if(typeof maxHeight != "undefined") {
					if((maxHeight + "").length > 0 && parseInt(maxHeight) > 0) {
						this.maxHeight = parseInt(maxHeight);
					}
				}
			};
			
			/*
				Function: _setMaxSizes
				Description: Postavlja varijable maxWidth i maxHeight
				Arguments:
					maxWidth - int
					maxHeight - int
			*/
			show.prototype._setMaxSizes = function(maxWidth, maxHeight) {
				this._setMaxWidth(maxWidth);
				this._setMaxHeight(maxHeight);
			};
			
			/*
				Function: _setOnClose
				Description: Postavlja varijablu onClose
				Arguments:
					f - function
			*/
			show.prototype._setOnClose = function(f) {
				if(typeof f == "function") {
					this.onClose = f;
				}
			};
			
			/*
				Function: _setOnFullscreen
				Description: Postavlja varijablu onFullscreen
				Arguments:
					f - function
			*/
			show.prototype._setOnFullscreen = function(f) {
				if(typeof f == "function") {
					this.onFullscreen = f;
				}
			};
			
			/*
				Function: _setOnLoading
				Description: Postavlja varijablu onLoading
				Arguments:
					f - function
			*/
			show.prototype._setOnLoading = function(f) {
				if(typeof f == "function") {
					this.onLoading = f;
				}
			};
			
			/*
				Function: _setOnFailed
				Description: Postavlja varijablu onFailed
				Arguments:
					f - function
			*/
			show.prototype._setOnFailed = function(f) {
				if(typeof f == "function") {
					this.onFailed = f;
				}
			};
			
			/*
				Function: _setCallbacks
				Description: Postavlja varijable onClose, onFullscreen, onLoading i onFailed
				Arguments:
					f - function
			*/
			show.prototype._setCallbacks = function(onClose, onFullscreen, onLoading, onFailed) {
				this._setOnClose(onClose);
				this._setOnFullscreen(onFullscreen);
				this._setOnLoading(onLoading);
				this._setOnFailed(onFailed);
			};
			
						
			/*
				Function: _init
				Description: Postavlja elemente u body
				Arguments:
					---
			*/
			show.prototype._init = function() {
				this.close();
				$("body").append(this._div);
				apStorage.show = this;
			};
			
			/*
				Function: _resize
				Description: Određuje veličinu slike
				Arguments:
					mode - normall or fullscreen
			*/
			show.prototype._resize = function(mode) {
				mode = typeof mode == "string" ? mode : "normall";
				if(mode == "fullscreen")
					var
						maxwidth = $(window).width(),
						maxheight = $(window).height();
				else 
					var
						maxwidth = $(window).width() > (this.maxWidth + (this.padding * 2)) ? this.maxWidth : $(window).width() - (this.padding * 2),
						maxheight = $(window).height() > (this.maxHeight + (this.padding * 2) + 70) ? this.maxHeight : $(window).height() - (this.padding * 2) - 70;
				
				var size = APgetSize(this.image.width, this.image.height, maxwidth, maxheight);
				if(size != false) {
					$(".apimage-show").css({
						"left": ($(window).width() - size.width) / 2 + "px",
						"right": ($(window).width() - size.width) / 2 + "px",
						"top": ($(window).height() - size.height) / 2 + "px",
						"bottom": ($(window).height() - size.height) / 2 + "px"
					}).find(".next").css({
						"margin-left": size.width - $(".apimage-show .next").width() + 1 + "px"
					});
					
					$(".apimage-show .image img").attr({
						"width": size.width,
						"height": size.height
					});

					$(".apimage-show .watermark").css({
						"width": size.width + "px",
						"height": size.height + "px",
						"margin-bottom": "-" + size.height + "px"
					});
				}
				return false;
			};
			
			/*
				Function: _display
				Description: Prikazuje sliku
				Arguments:
					---
			*/
			show.prototype._display = function() {
				$(".apimage-show .image").html("<img src=\""+this.image.src+"\" />");
				if(this.slideshow == true)
					$(".apimage-show .actions .slideshow").addClass("off");
				if(this.fullscreen == true) {
					this.fullscreen = false;
					this._fullscreen();
				}
				else {
					this._resize();
				}
				this.isDisplayed = true;
				return false;
			};
			
			/*
				Function: _alert
				Description: Obavještava korisnika
				Arguments:
					---
			*/
			show.prototype._alert = function(t) {
				$(".apimage-show .image").html(t).css({
					"width": "auto",
					"height": "auto"
				});
				var
					width = $(".apimage-show .image").width() + 100,
					height = $(".apimage-show .image").height() + 80;
				$(".apimage-show").css({
					"width": width + "px",
					"height": height + "px",
					"left": ($(window).width() - width) / 2 + "px",
					"top": ($(window).height() - height) / 2 + "px"
				}).find(".image").css({
					"width": width - 80 + "px",
					"height": height - 80 + "px",
					"padding": 40 + "px",
					"text-align": "center"
				});
				return false;
			};

			/*
				Function: _slideshow
				Description: Rotira slike
				Arguments:
					---

			*/
			show.prototype._slideshow = function() {
				if(this.isDisplayed == true) {
					if(this.slideshow == false) {
						this.slideshow_intid = setInterval(function() {
							apStorage.show._next();
						}, this.slideshow_time);
						$(".apimage-show .actions .slideshow").addClass("off");
						this.slideshow = true;
					}
					else {
						clearInterval(apStorage.show.slideshow_intid);
						$(".apimage-show .actions .slideshow").removeClass("off");
						this.slideshow = false;
					}
				}
				return false;
			};
			/*
				Function: _fullscreen
				Description: Prikazuje sliku u fullscreenu
				Arguments:
					---

			*/
			show.prototype._fullscreen = function() {
				if(this.isDisplayed == true) {
					if(this.fullscreen == false) {
						this._resize("fullscreen");
						$(".apimage-show").removeClass("fullscreen").addClass("fullscreen");
						$(".apimage-show .actions .fullscreen").addClass("off");
						this.fullscreen = true;
					}
					else {
						this._resize();
						$(".apimage-show").removeClass("fullscreen");
						$(".apimage-show .actions .fullscreen").removeClass("off");
						this.fullscreen = false;
					}
				}
				return false;
			};
			/*
				Function: _prev
				Description: Navigacijsko natrag
				Arguments:
					---
			*/
			show.prototype._prev = function() {
				var prev_id = apStorage._getPrevImgID(this.image.id);
				if(typeof apStorage.images[prev_id] == "object") {
					this.image = apStorage.images[prev_id];
					this.open();
				}
				/*var
					e = $(".apimage[data-apimage-id=\"" + this.image.id + "\"]"),
					imgs = $("body").find(".apimage:not(.failed)");
				if(e.length == 1) {
					var
						prev = $(e).prevAll(".apimage").last(),
						last = imgs.last(),
						id = false;
					if(prev.length) {
						id = $(prev).attr("data-apimage-id");
					}
					else if(last.length) {
						id = $(last).attr("data-apimage-id");
					}
					
					if(id != false) {
						this.image = apStorage.images[id];
						this.open();
					}
				}*/
			}
			
			/*
				Function: _next
				Description: Navigacijsko naprijed
				Arguments:
					---
			*/
			show.prototype._next = function() {
				var next_id = apStorage._getNextImgID(this.image.id);
				if(typeof apStorage.images[next_id] == "object") {
					this.image = apStorage.images[next_id];
					this.open();
				}
				/*var
					e = $(".apimage[data-apimage-id=\"" + this.image.id + "\"]"),
					imgs = $("body").find(".apimage:not(.failed)");
				if(e.length == 1) {
					var
						next = $(e).nextAll(".apimage").eq(0),
						first = imgs.first(),
						id = false;
					if(next.length) {
						id = $(next).attr("data-apimage-id");
					}
					else if(first.length) {
						id = $(first).attr("data-apimage-id");
					}
					
					if(id != false) {
						this.image = apStorage.images[id];
						this.open();
					}
				}*/
			}
			
			/*
				Function: open
				Description: Prikazuje show
				Arguments:
					---
			*/
			show.prototype.open = function() {
				var self = this;
				if(this.image != false && this.image.isFailed == false) {
					this._init();
					if(this.image.isFailed == true)
						$(this).triggerHandler("apFailed");
					else if(this.image.isLoading == true) {
						$(this).triggerHandler("apLoading");
						$(this.image).one({
							"apLoaded": function() {
								self._display();
							},
							"apFailed": function() {
								$(self).triggerHandler("apFailed");
							}
						});
					}
					else if(this.image.isLoaded == true)
						this._display();
					else {
						$(this.image).one({
							"apLoaded": function() {
								self._display();
							},
							"apFailed": function() {
								$(self).triggerHandler("apFailed");
							}
						});
					}
				}
				$(this).bind({
					"apClose": self.onClose,
					"apFailed": self.onFailed,
					"apFullscreen": self.onFullscreen,
					"apLoading": self.onLoading
				});
				return false;
			};
			
			/*
				Function: close
				Description: Zatvara show
				Arguments:
					---
			*/
			show.prototype.close = function() {
				apStorage.show = "";
				$(".apimage-show, .apimage-showbg").remove();
				$(this).unbind("apClose", this.onClose);
				$(this).unbind("apFullscreen", this.onFullscreen);
				$(this).unbind("apLoading", this.onLoading);
				$(this).unbind("apFailed", this.onFailed);
				return false;
			};
			/* END METHODS */
		/* END OBJECTS */

		function remove_apimage(e) {
			if(e.length) {
				$(e).each(function() {
					if($(this).closest(".apimage-gallery").length) {
						$(this).closest(".apimage-gallery").before($("<img src=\""+$(this).attr("data-image")+"\" width=\""+$(this).attr("data-width")+"\" height=\""+$(this).attr("data-height")+"\" />"));

						$(this).remove();
					}
					else {
						$(this).before($("<img src=\""+$(this).attr("data-image")+"\" width=\""+$(this).attr("data-width")+"\" height=\""+$(this).attr("data-height")+"\" />"));
						$(this).remove();
					}
				});
			}
		}

		function main(b) {
			var e = $(b).find(".apimage:not([data-off=\"true\"])"), g = $(b).find(".apimage-gallery"), off = $(b).find(".apimage[data-off=\"true\"]");
			if(APImage_options == false) return false;
			if(APImage_options["enabled"] == true) {
				// Standalone images
				if(e.length) {
					e.each(function() {
						if($(this).closest(".signature").length || $(this).closest([".block_leftcontainer", ".block_rightcontainer", ".block_centercontainer", ".block_uppercontainer", ".block_lowercontainer", ".block_topcontainer", ".block_bottomcontainer"]).length) {
							remove_apimage($(this));
						}
						else if(!$(this).closest(".apimage-gallery").length) {
							new image({
								element: $(this),
								tmaxwidth: APImage_options["thumb_max_width"],
								tmaxheight: APImage_options["thumb_max_height"],
								onLoading: function(e) {
									$(this.element).addClass("loading");
								},
								onLoaded: function(e) {
									$(this.element).removeClass("loading").addClass("loaded");
									this._displayImage();
									this._resizeImage();
								},
								onClick: function(e) {
									new show({
										element: this.id,
										maxWidth: APImage_options["show_max_width"],
										maxHeight: APImage_options["show_max_height"],
										onClose: function() {
											if(apStorage.show.slideshow == true)
												apStorage.show._slideshow();
											this.close();
										}
									});
								},
								onFailed: function(e) {
									$(this.element).removeClass("loading").addClass("failed").css("height", "auto").html("IMAGE<br />NOT FOUND!");
								}
							});
						}
					});
				}
				
				// Gallery
				if(g.length) {
					g.each(function() {
						if($(this).hasClass("apimage-gallery")) {
							var self = this;
							new gallery({
								mode: "viewer-list",
								element: self,
								maxHeight: APImage_options["gallery_viewer_max_height"],
								onEmpty: function(e) {
									$(this.element).html("<div class=\"error\">Gallery is empty!</div>");
								}
							});
						}
					});
				}

				// Turn off elements with attribute off
				if(off.length) {
					remove_apimage($(off));
				}
				
				// Events
				window.onkeydown = function(event) {
					var key= ("which" in event) ? event.which : event.keyCode;
					if(key == 27) {
						if(typeof apStorage.show == "object") {
							apStorage.show.close();
						}
					}
					if(key == 37) {
						var g = $("body").find(".apimage-gallery.hovered");
						if(typeof apStorage.show == "object") {
							if(apStorage.show.keynav == true)
								apStorage.show._prev();
						}
						else if(g.length == 1) {
							if(typeof apStorage.gallery[$(g).attr("data-apimage-id")] == "object") {
								apStorage.gallery[$(g).attr("data-apimage-id")]._prev();
							}
						}
					}
					else if(key == 39) {
						var g = $("body").find(".apimage-gallery.hovered");
						if(typeof apStorage.show == "object") {
							if(apStorage.show.keynav == true)
								apStorage.show._next();
						}
						else if(g.length == 1) {
							if(typeof apStorage.gallery[$(g).attr("data-apimage-id")] == "object") {
								apStorage.gallery[$(g).attr("data-apimage-id")]._next();
							}
						}
					}
				};
				$(".apimage-showbg, .apimage-show .actions .close").live("click", function() {
					$(apStorage.show).triggerHandler("apClose");
				});
				$(".apimage-show .actions .slideshow").live("click", function() {
					apStorage.show._slideshow();
				});
				$(".apimage-show .actions .fullscreen").live("click", function() {
					apStorage.show._fullscreen();
					$(apStorage.show).triggerHandler("apFullscreen");
				});
				$(".apimage-show .prev").live("click", function() {
					apStorage.show._prev();
				});
				$(".apimage-show .next").live("click", function() {
					apStorage.show._next();
				});
				$(".apimage-show .ads .close").live("click", function() {
					$(".apimage-show .ads").hide();
				})

				// Scrollbars
				if(!apStorage.custom_scrollbars) {
						$(".apimage-gallery").addClass("tinyscrollbar");
						$(".apimage-gallery").tinyscrollbar({"axis": "x"});
				}
			}
			else {
				remove_apimage($(e));
				$(".apimage-gallery").remove();
			}
		};
		
		return main($(this));
	};
	
	$(document).ready(function() {
		$("body").APImage();
		/*$('input[type="submit"]').live("click", function() {
			$("body").not(".ap-image, .ap-image-gallery, .ap-image-viewer, .ap-image-viewer-bg").bind("DOMNodeInserted", function() {
				$("body").APImage();
			});
		});*/
	});
})(jQuery);
