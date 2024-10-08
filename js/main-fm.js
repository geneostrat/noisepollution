/**
	STUDIO POINT - Parallax Responsive Retina Ready
 	Copyright (c) 2013, Subramanian 

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/
	
    Version: 1.0.0
	Release Date: February 2013
	
	Built using: jQuery 		version:1.6.2	http://jquery.com/
								jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	
**/


(function( $ ){	
	
	function mainFm(selector, params){
		
		var defaults = $.extend({}, {
				
				// default variables
				
				onePage : true,						// Set whether this template will work as one page or separate page 				
				
				currentPage : "",					// Set the current page

				animationSpeed : 1000,				// Default animation speed
				
				slideshowSpeed : 5000				// Flexslider slideshow delaytime on porfolio detail page 
				
			} , params);

			
// Initialize required variables and objects
			var self = this;
			self.pageHolderHeight_desktop = self.pgHigDesk = "100%";
			self.pageHolderHeight_ipad = self.pgHigIpad = "100%";
			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();
			self.IE_old = $.browser.msie;
			self.mobile = $(window).width() <= 959;
			self.midMobile = $(window).width() <= 767 && $(window).width() > 479;
			self.minMobile = $(window).width() <= 480;
			self.mobileDevice = screen.width < 1024 && screen.height < 1024;
			ipad = ($(window).width() == 768 || $(window).height() == 768) && ($(window).width() == 1024 || $(window).height() == 1024) ;
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.navTop = $(window).width() <= 959;	
			self.aniSpeed = defaults.animationSpeed;
			self.flxDelay =  defaults.slideshowSpeed;
			
			self.isoAniFin = false;
			
			self.onePage = defaults.onePage;
			if(!(self.onePage && !self.mobile)){
				$("body").css({"overflow-y":"auto"});
			}
			
			$("body").css({"overflow-x":"hidden"});
			$("html").css({"overflow-x":"hidden"});
			
			if(!self.onePage){
				siteStartOpen = true;
			}
			
			self.bdy = $("body");
			self.lCon = $(".logo");
			self.tCon = $(".header");
			self.bCon = $(".footer .container");
			self.foot = $(".footer");		
			self.navUl = $('.header .nav ul');
			self.backPage  = $('#backArea');
			
			self.bdy.data("width", Number($(window).width()));
			self.bdy.data("height", Number($(window).height()))

			self.pageLoaded = false;
			self.homePage = defaults.currentPage;
			self.pageLoadfinished = false;
			self.projFm = false;
			self.apis = [];
			self.ff = -1;
			
			self.singleBg = true;
			
			self.cM = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]').parent();
			self.cM_= $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');
			
			// create Menu fadeout layer
			self.headerFad = $(".pageFade");
			self.contClose = $(".closeBtn");
			
			self.TopMenu = $(".logo").hasClass("logoStayTop");
			self.bottomMenu =  $(".header").hasClass("stayBottom");

			self.bdy.prepend('<div id="dumDiv" style="position:absolute"> </div>');	
			self.dumDiv = self.bdy.children(':first-child');
			
			if(self.tCon.hasClass("white_nav")){
				self.dumDiv .addClass('menu_color, white_nav');
			}else{
				self.dumDiv .addClass('menu_color');
			}
			
			self.menuColor = self.dumDiv .css('color');
			self.dumDiv .toggleClass('menu_highlight_color', 'menu_color');
			
			self.menuHighlightColor = self.dumDiv .css('color');
			
			// Scroll bar added for require div
			var scroll_bar = '<div id="scrollbar_holder"> <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div> <div class="viewport"> <div class="overview" ></div> </div> </div>';		
			self.bdy.find('.add_scroll').each(function(){
				var aa = $(this).children();
				$(this).wrapInner( scroll_bar);
				$(this).find('.overview').append(aa);
			});
						
			// Initialize the site after the required time interval
			
			$("#supersized").css({"opacity":0});
			
			self.bdy.css("display","block");
			
			
			var intV = setInterval(function() {

				  if(siteStartOpen){
					  clearInterval(intV);
					  setTimeout( function(){ 
					  
						  self.initialize();
						  if($("#supersized").height() != null){
							  $("#supersized").animate({"opacity":1}, 1500, "easeInOutQuart" );
							  $("#superNav").fadeIn(1000, "easeInOutQuart" );
							  
							  if(typeof api != 'undefined'){
							  	api.min_thumb();
							  }
							  $(".supersized-nav").fadeIn(500, "easeInOutQuart" );
						  }
						  $(".header").delay(700).fadeIn(500, "easeInOutQuart" );
						  $(".homeSlider .homepage_con").fadeIn(500, "easeInOutQuart" );
						  self.nav_position();
						  self.menuUpdate();
						  setTimeout( function(){ 
							  self.menuUpdate();
						  }, 700);
						  
						  if(!self.onePage){		
							  $("body").find('.addVideo').each(function(){
								  var vid = $(this);
								  var kk = false;
								  $(this).find('img').each(function(){
									  kk = true
								  });
								  if(!kk ){
									  vid.data("added", true);
									  var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
									  var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
									  var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
									  if(H == "100%"){
										  vid.css({"height":"100%"})
									  }
									  vid.prepend('<div class="vid"></div>');
									  vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
								  }
							  });
							  
							  $("body").data("bgType",isMobileChk);

							  $("body").find('.parallax').each(function(){
								  var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
								  var imgAtt = !isTouch ? "fixed" : "scroll";
								  if(img != undefined){
									  $(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
								  }
							  });
						  }
			  
					  }, 200);
				  }

			},10);

			

// Page buttons ==================================================================
			
			
			// Page scrollUp button
			self.pgScrUp =  $(".pgScrollUp, .move_up, .goTop");
			
			self.pgScrUp.click(function(){
				if(self.url != self.homePg){
					window.location.href = "#"+self.homePg;
				}else{
					self.scrollObj.animate({ scrollTop: "0px" }, 500, "easeInOutQuart" );
				}
			});
			
			// Cache the Window object
			self.scrollObj = $("body, html");
			self.$html = $("html");
			self.$window = $("body");

			// Window scroll event
			$(window).scroll(function() {	
				self.scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();
				if(self.scrollPos > self.winHeight+50){
					$("#big-video-wrap").hide();
				}else{
					$("#big-video-wrap").show();
				}
				self.nav_position();
			});
			
			if(!self.bottomMenu){
				$(".homeSlider").css({"height":self.winHeight});
			}else{
				$(".homeSlider").css({"height":self.winHeight-self.tCon.outerHeight()});
			}
			
			var caa = $(window).height() - (self.tCon.outerHeight() + $(".contactPage .titleTop").outerHeight() + $(".footer").outerHeight() + $(".contactUsPg").outerHeight());
			caa = caa > 20 ? caa : 20;
			$(".contactPage .parallax .footer_fit").css({ "min-height": caa } );
			
			$("html").css({"overflow-y":"auto"});
			if(!isTouch){				
				$("html").niceScroll({ zindex : 90000000, cursorborder : "0px", cursorcolor : self.scrollColor, cursorwidth:"7px", scrollspeed :70, horizrailenabled:false });
				self.niceScroll_mc = $("html").getNiceScroll();				
			}
			
	}	
	
	
	mainFm.prototype = {

		// Initialize the require objects and variables 
		initialize : function(){
			
			var self = this;
			
			self.prePg = "";
			self.curPg = "";
			self.menuList = [];
			
			// Loading object added
			self.bdy.prepend('<div id="preloadImg" style="width:150px; height:150px; visibility:hidden; position:absolute; left:0; top:0; overflow:hidden"> </div>');
			self.dumDiv.addClass('email_loading');
			self.dumDiv.removeClass('email_loading');

			$(".isotope_option").show();	
			
			self.nexButton_detailPg = $("a.next_button");
			self.preButton_detailPg = $("a.previous_button");
			
// Initialize the menu navigation action
			var kk = -1;
			var qq = -1;
			self.rez = false;
			
			if( parseInt($.browser.version, 10) == 7 && $.browser.msie){
				$(".header").css({"background":"","filter":"none"});
				self.dumDiv.addClass("mobile_menuBg_ie");
				$(".header").css({"background-color": self.dumDiv.css("background-color")});
			}
			
			try {
				document.createEvent('TouchEvent');
				$(".lightStyle, .darkStyle, .contentWrapper").bind('click', function() {
				})
			} catch (e) {
				// nothing to do			
			}
			
			
			
			self.navUl.each(function() {			

				var slf = $(this);
				qq++;

				if(qq>0){
					slf.children(":first-child").find("a").addClass("first");
					slf.children(":last-child").find("a").addClass("last");
				}
				
				var uuu = slf.parent().children(":first-child");
				var vvv = slf.parent().children(":last-child");
				if(qq>0){
					if(!self.mobile){
						vvv.css({"top": uuu.outerHeight()+"px", 
						"margin-left": (uuu.outerWidth()-vvv.outerWidth())/2});
					}else{
						vvv.css({"top": "0px", 
						"margin-left": "0px"});
					}
				}
				
				if(qq==0){
					slf.children().each(function() {
						
					 	if(!self.mobile){
							$(this).find("ul").css({"opacity":0, "height":"0px"});
						}
							
						mnu = $(this).children();
						
						mnu.bind('mouseover', function() {
							if(!self.mobile){
								var tpMenu = $(this).parent().find("ul");
								tpMenu.css({"height":"auto"});
								tpMenu.stop();
								tpMenu.animate({"opacity":1},500, false, "easeInOutQuart");
								
									if(self.bottomMenu){
										if(self.scrollPos == 0){
											tpMenu.css({"top": -(tpMenu.outerHeight())-15});
										}else{
											tpMenu.css({"top": $(".header").outerHeight()-15 });
										}
									}
							}
						});
						
						mnu.bind('mouseout', function() {
							if(!self.mobile){
								var tpMenu = $(this).parent().find("ul");
								tpMenu.stop();
								tpMenu.animate({"opacity":0}, 500, "easeInOutQuart", function(){
									tpMenu.css({"height":"0px"});
								});
							}
						});
					});
				}
				
				slf.children().each(function() {
					var meu = $(this);
					kk++;
					self.menuList[kk] = $('a', meu).attr("href");
					
					meu.children(":first-child").bind('click', function() {
						
						var gg =  $(this).attr("href").split("#");
						if(gg[1] == self.url){
							self.page_position();
						}
						
						if($(this).parent().children().length<2 && !self.mobile){
							self.navUl.children().each(function() {			
								if($(this).children(":last-child").children().length>0){
									$(this).children(":last-child").css({"height":"0px", "opacity":0});
								}
							});
						}
						
					});
					
					meu.children(":first-child").bind('mouseover mouseup mouseleave', function() {
						 if(!$(this).data("act")){
							 $(this).css("color", self.menuHighlightColor);
						 }
					});
					
					meu.children(":first-child").bind('mouseout', function() {
						var gg =  $(this).attr("href").split("#");
						var gs = self.onePage ? gg[1] : gg[0];
						if(self.url != gs && !$(this).data("act")){
							 $(this).css("color", self.menuColor);
						}
					});
				});
				
			});
			
			
			$("body").find(".move_down, .move_down_white").each(function(){
				$(this).bind('click', function() {
					var gg =  $(this).attr("href").split("#");
					if(gg[1] == self.url){
						self.page_position();
					}
				});
			});

			self.homePg = self.homePage == "" ? self.menuList[0].substr(1, self.menuList[0].length): self.homePage;
			self.cM = $('.contentWrapper [data-id="'+"#"+self.menuList[0]+'"]').parent()

			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').css("visibility","visible");			
			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').hide();
			
			
			// Initialize the mobile button action
			self.navUl.data('view',false);
			
			self.navEvent = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
			
			self.bdy.find('img').each(function() {
				$(this).data("src",$(this).attr('src'));
			});
			
			
			// Initialize the video	
			self.intVideoObject(self.bdy);
			
			// Enable/disable the image scale animation
			if(isTouch){
				$(".fmSliderNode img").removeClass("enableTransition"); 
				$(".circle_large").removeClass("enableTransition");  
			}else{
				$(".fmSliderNode img").addClass("enableTransition"); 
				$(".circle_large").addClass("enableTransition"); 
			}
			
			// Initialize the window resize function
			clearInterval(self.intr);
			$(window).resize(function() {	
				clearInterval(self.intr);
				self.intr = setInterval(function(){clearInterval(self.intr); self.windowRez();},100);
			});
			
			//Initialize the mobile orientationchange function
			$(window).bind( 'orientationchange', function(){
			  self.windowRez();
			});
			
			
			// Preload the required images
			var ik = 0;
			function intImgLoad (img){
				var _im =$("<img />");
				 _im.hide();
				 _im.bind("load",function(){
						$(this).remove();	

						if(ik < preLoadImgs.length-1){
							ik = ik+1;
							intImgLoad(preLoadImgs[ik]);
						}else{
							self.history();
							self.page_setup();	
						}
						
				 
				   }).error(function () { 		 
						$(this).remove();
						if(ik < preLoadImgs.length-1){
							ik = ik+1;
							intImgLoad(preLoadImgs[ik]);
						}else{
							self.history();
							self.page_setup();	
						};							
				});
				$("#preloadImg").append(_im);
				_im.attr('src',img);	
			}
			
			var chkInt = setInterval(function() {
				clearInterval(chkInt);
				intImgLoad(preLoadImgs[ik]);
			}, 300);
			
			// display isotope item
			$('.isotope_items').show();
			
			if(self.headerFad){
				self.headerFad.delay(100).fadeOut(1000, "easeInOutQuart", function(){  self.headerFad.remove(); });
			}
			

		},

			
		// Update the menu and hightlight bar
		menuUpdate : function(e){
			
			var self = this;
			var curMenuSho = self.cM_;
			var qq = -1;
			
			var sMenu = $(".header .nav ul li ul");

			self.navUl.removeClass();
			self.navUl.css("display","block");

			
			self.navUl.each(function() {			
				var slf = $(this);
				qq++;
				
				if(qq == 0){
					slf.children().each(function() {
						if($(this).children().length>1){
							if(!self.mobile){
								$(this).children(":first-child").removeClass("arrow");
							}else{
								$(this).children(":first-child").addClass("arrow");
							}
						}	
					});	
				}
				
				if(qq>0){
					var uuu = slf.parent().children(":first-child");
					var vvv = slf.parent().children(":last-child");
					if(!self.mobile){
						var ptt = isNaN(parseInt(self.tCon.css("border-bottom"))) ? 0 : parseInt(self.tCon.css("border-bottom"))+15;
						vvv.css({"top": uuu.outerHeight()+ptt+"px", 
						"margin-left": (uuu.outerWidth()-vvv.outerWidth())/2});
						if(self.rez || !self.pageLoaded){
							vvv.css({"opacity": 0, "height":"0px"});
						}
						
					}else{
						vvv.css({"top": "0px", "margin-left": "0px", "height":"auto"});
					}
				}
			});
			
			var menuOnTop = false;
			var qs = -1;

			self.navUl.each(function() {
				
				qs++;
				if(qs == 0){
					$(this).find("li a").each(function() {
						$(this).data("act",false);
						if(self.cM_.attr("href") == $(this).attr("href")){
							curMenuSho = $(this);
							curMenuSho.css("color", self.menuHighlightColor);
							curMenuSho.data("act",true);
						};
					});
				}
					
				if(qs>0){
					$(this).find("li a").each(function() {
						$(this).data("act",false);
						if(self.cM_.attr("href") == $(this).attr("href")){
							curMenuSho = $(this).parent().parent().parent().children(":first-child");
							curMenuSho.css("color", self.menuHighlightColor);
							curMenuSho.data("act",true);
						}
					});
				}
				
				$(this).find("a").each(function() {
					if($(this).attr("href") == curMenuSho.attr("href")){
						menuOnTop = true;
					}
				});
			});

			if(!self.mobile || self.IE_old){
				self.navUl.css("display","block");
				if((curMenuSho.position()) != null && menuOnTop){
					var pdLef = isNaN(parseInt(curMenuSho.css('padding-left'))) ? 0 : parseInt(curMenuSho.css('padding-left'));
				}
				
			}else{
				self.navUl.css({"opacity":1});
				if(self.navUl.data('view')){
					self.navUl.css("display","block");
				}else{
					self.navUl.css({"display":"none"});
				}
			}
			

			
			$('.tinynav:selected', 'selected').removeAttr('selected');
			$('.tinynav').val( self.cM_.attr("href")).attr('selected', 'selected');
				
		},
		
		
		
		// Initialize video cover image
		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){		
				var addCover = false;							
				$(this).find('.video_hover').each(function(){
									
					addCover = true;			
					$(this).hover(function() {
						$(this).stop().animate({opacity:0}, 200);
					}, function() {
						$(this).stop().animate({opacity:1}, 200);
					});
									
					var vid = $(this).parent();
					vid.data("added", true);
									
					vid.click(function(){
						$("body").find('.addVideo').each(function(){
							if($(this).parent().hasClass("tabVideo")){
								return;
							}
							$(this).find('.vid').remove();
							if(!$(this).data("added")){
								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
								var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
								vid.prepend('<div class="vid" ></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
							}			
							$(this).find('img').fadeIn();
							$(this).find('.video_hover').fadeIn();
							$(this).find('.video_hover').css({"z-index":"5"});
						});
			
						$(this).prepend('<div class="vid" ></div>');
						$(this).find('.video_hover').css({"z-index":"-1"});
						$(this).find('img').fadeOut(100,function(){
							var vid = $(this).parent();
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), vid.width()+"px", vid.height()+"px", vid.width(), false);
						});			
					});
				});	
							
			});
			
		},
		
		
		
		nav_position : function(){
			var self = this;
			self.scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();	
			var nvHig = (self.winHeight - $(".header").outerHeight()) - self.scrollPos;
				nvHig = nvHig > self.winHeight-($(".header").outerHeight()+50) ? 0 : "100%";
			var tpos = !self.mobile ? 50 : 10;
			
			if(self.mobile){
				$(".header_bg, .header .nav").removeClass("enableTransition");
				$(".pgScrollUp").removeClass("pgScrollUp_animate");
				nvHig =  self.scrollPos > 0 ? 40 : 0;
			}else{
				$(".header_bg, .header .nav").addClass("enableTransition");
				$(".pgScrollUp").addClass("pgScrollUp_animate");			
			}
			
			if(self.TopMenu){
				$(".header .nav").css({"top":"0px"});
				if(!self.mobile){
					$(".header_bg").css({"height": $(".header").outerHeight()});
				}else{
					$(".header_bg").css({"height": self.lCon.height()});
				}
				self.lCon.show();
				$(".header .nav").css({"top":"0px"});
			}
			
			if(self.bottomMenu){
				$(".header .nav").css({"top":"0px"});
				if(!self.mobile){
					$(".header_bg").css({"height": $(".header").outerHeight()});
				}else{
					$(".header_bg").css({"height": self.lCon.height()});
				}
				$(".header_bg").css({"height": $(".header").outerHeight()});
				self.lCon.show();
			}
			
			if(self.onePage && !self.TopMenu && !self.bottomMenu){
				if($(".header_bg").data("height") != nvHig || $(".header_bg").data("mob") != self.mobile){
					if(nvHig == 0){
						$(".header .nav").css({"top": tpos+"px"});
						self.pgScrUp.css({"top":-50+"px"});
						$(".header_bg").css({"height": 0});
						if(self.mobile){
							self.lCon.show();
						}else{
							self.lCon.fadeIn(500);
						}
					}else{
						$(".header .nav").css({"top":"0px"});
						$(".header_bg").css({"height": $(".header").outerHeight()});
						self.pgScrUp.css({"top":"0px"});
						if(self.mobile){
							self.lCon.hide();
						}else{
							self.lCon.fadeOut(500);
						}
					}
				}
				$(".header_bg").data("mob", self.mobile);
				$(".header_bg").data("height", nvHig);
			}
		},


// Page Background load function
		
		site_display : function(){
			
			var self = this;

			self.menuUpdate();
			

			if(!self.IE_old){
				$(".isotope_items .item a .img_text").css("visibility","visible");
			}

			$("body").data("bgType",isMobileChk);

			$("body").find('.parallax').each(function(){
				var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
				var imgAtt = !isTouch ? "fixed" : "scroll";
				if(img != undefined){
					$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
				}
			});
			
			$(".contentWrapper").find('#mapWrapper').each(function(){
				if(!self.IE_old){
					$(this).parent().prepend($(this).data('map'));
					$(this).parent().children(":first-child").addClass('mapStyle');
					$(this).remove();
				}
			});

			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") == self.url){
					isInCont = $(this);
				}
			});
		},
		
		
		page_position : function (e){
			var self = this;
			
			self.kko = self.kko == undefined ? 1 : self.kko+1

			if(self.rez){
				self.page_setup();
			}

			self.openYes = true;

			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") == self.url){
					isInCont = $(this);
				}
			});
			
			$("body").find('.addVideo').each(function(){
				$(this).find('.vid').each(function(){
					$(this).remove();
				});
				$(this).find('img').show();
				$(this).find('.video_hover').show();
				$(this).find('.video_hover').css({"z-index":"5"});
			});
			

			$("body").find('.addVideo').each(function(){
				var vid = $(this);
				var kk = false;
				$(this).find('img').each(function(){
					kk = true
				});
				if(!kk ){
					vid.data("added", true);
					var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
					var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
					var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
					if(H == "100%"){
						vid.css({"height":"100%"})
					}
					vid.prepend('<div class="vid"></div>');
					vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
				}
			});
					
			self.scrollObj.stop();

			if($("#supersized").height() != null && typeof api != 'undefined'){
				if(self.url == self.homePg){
					if($.supersized.vars.is_paused){
						api.playToggle();
					}
				}else{		
					if(!$.supersized.vars.is_paused){
						api.playToggle();
					}
				}
			}
			
			var posT = 0;
			var ddm = self.winWidth < 768 ? 38 : 68;
			posT = isInCont != undefined ? parseInt(isInCont.position().top)-ddm : 0;

			self.scrollObj.animate({ scrollTop: posT }, self.aniSpeed, "easeInOutQuart");
			
			$( '.nav li a' ).css({"color":self.menuColor});
			
			if(self.mobile){
				self.navUl.data('view',false);
				self.navUl.css({"display":"none"});
			}
			
			self.menuUpdate();
			
			setTimeout(function(){  
				self.nav_position();
			},20);
		},


// The entire page can be reposition, resize and modified by page_setup function
		page_setup : function (){
			
			var self = this;

			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();
			
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.mobile = self.winWidth <= 959 && !self.ipadPort;
			self.midMobile = self.winWidth <= 767 && self.winWidth > 479;
			self.minMobile = self.winWidth <= 480;
			isMobileChk = self.winWidth < 768;
			self.navTop = true;	
			
			// Reset the required variable
			
			self.pgHeight = "100%";
			self.pgHeight =  "100%";
			
			$("#bodyContent").css({"width": "100%"});
			
			// Change the default image in img tag, if mobile version(data-src-small) image is assign on the img tag
			self.bdy.find('img').each(function() {
				if($(this).attr('data-src-small')){
					if(!self.mobile || !$(this).attr('data-src-small')){
						var img_Src = $(this).data('src').split(".");
						var iimg = $(this).attr('data-retina') == "yes" && retinaDevice ? img_Src[0]+"@2x."+ img_Src[1] : $(this).data('src');	
							if(String($(this).attr('src')) != iimg){
								$(this).attr("src", iimg);
								$(this).data("i_src",$(this).data('src'));
							}			
					}else{
						if($(this).attr('data-src-small')){
							img_Src = $(this).attr('data-src-small').split(".");
							iimg = $(this).attr('data-retina') == "yes" && retinaDevice ? img_Src[0]+"@2x."+ img_Src[1] : $(this).attr('data-src-small');
							if(String($(this).attr('src')) != String($(this).attr('data-src-small')) && String($(this).attr('src')) != iimg){
								$(this).attr("src",iimg);
								$(this).data("i_src",$(this).attr('data-src-small'));
							}
						}
					}
				}
			});
			
			self.menuUpdate();
			
			
			// Resize the portfolio
			$("body").find('.isotope_items').each(function(){
				if(!self.IE_old){
					var gaIt = $('.isotope_items .item');
					if(self.midMobile){
						gaIt.removeClass('large');
						gaIt.removeClass('small');
						gaIt.addClass('medium');
					}else if(self.minMobile){
						gaIt.removeClass('medium');
						gaIt.removeClass('large');
						gaIt.addClass('small');
					}else{
						gaIt.removeClass('medium');
						gaIt.removeClass('small');
						gaIt.addClass('large');
					}
				}
				$(this).isotope( {itemSelector : '.item', layoutMode : 'fitRows',
						animationOptions: {
							complete: function() { 
								if(!self.isoAniFin){ 
									self.isoAniFin = true;
									self.page_position();  
								}}
							}
						}, 'reLayout' );						 
			});
			
			if(!self.mobile){
				self.navUl.find("ul").css({"z-index":"inherit"});
			}else{
				self.navUl.find("ul").css({"z-index":1000});
			}
			
			if(self.rez){
				$(self.contClose.attr("data-content")).css({"top":"0px"});
				self.contClose.children(":first-child").children(":first-child").css({"right" : "-40px"});
			}
			
			if(self.rez && $("body").data("bgType") != isMobileChk && $("body").data("bgType") != undefined){
				$("body").data("bgType",isMobileChk);
				$("body").find('.parallax').each(function(){
					var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
					var imgAtt = !isTouch ? "fixed" : "scroll";
					if(img != undefined){
						$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
					}
				});
			}
			
			self.nav_position();
			var tppp = !self.onePage ? self.tCon.outerHeight() : 0;
				$("body").css({"padding-top":tppp });

			setTimeout(function(){  
				self.mrgTop = self.isFsGal? self.winHeight : 0;
				self.mrgTop = 0;
				if(!isMobileChk){ 
					var ptt = isNaN(parseInt(self.tCon.css("border-bottom"))) ? 0 : parseInt(self.tCon.css("border-bottom"));
					self.mrgTop = self.tCon.outerHeight()- ptt;
					self.nav_position();
				}
				
				tppp = !self.onePage ? self.tCon.outerHeight() : 0;
				$("body").css({"padding-top": tppp });
			},100);
			
			if(!self.bottomMenu){
				$(".homeSlider").css({"height":self.winHeight});
			}else{
				$(".homeSlider").css({"height":self.winHeight-self.tCon.outerHeight()});
			}
			var caa = $(window).height() - (self.tCon.outerHeight() + $(".contactPage .titleTop").outerHeight() + $(".footer").outerHeight() + $(".contactUsPg").outerHeight());
			caa = caa > 20 ? caa : 20;
			$(".contactPage .parallax .footer_fit").css({ "min-height": caa } );

		},
		
		
		
// The page_load function is used to load the current page inside the pageHolder div
		page_load : function (e){
				
			var self = this;
			self.url = e  ? e : self.homePg;
			self.cM = $('a[href$="#'+self.url+'"]').parent();
			self.cM_= !self.onePage ? $('a[href="'+self.url+'"]') : $('a[href$="#'+self.url+'"]');
			self.pgViewed = false;

			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") == self.url){
					isInCont = $(this);
				}
			});
			
			if(isInCont != undefined ){
				if(self.curPg == ""){
					self.curPg = self.prePg = self.url;	
					if(self.pgSub == undefined && self.onePage){
						window.location.href = "#"+self.url;	
					}
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
					self.site_display();
					self.page_position();
					
				}else{
					self.page_position();	
				}
				self.menuUpdate();
				return;
			}
			
			self.firstScrol = true;
			
			// Check the previous and current page
			
			
			
			if(self.prePg == self.curPg){
				
				try { self.fflod.remove(); } catch (e) { }
								
				// Initialize to load the opening page as per history
				if(self.curPg == "" ){						
					self.curPg = self.prePg = self.url;	
					if(self.pgSub == undefined && self.onePage){
						window.location.href = "#"+self.url;	
					}
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
					self.scrollObj.animate({ scrollTop: "0px" }, 0, "easeInOutQuart");	
				}else{	
					// Initialize to load current page, background and animate to left side			
					self.curPg = self.url;
					self.scrollObj.stop();
					var pagScrl_Speed = window.pageYOffset != 0 ? self.aniSpeed : 50;
					var con_Speed = 0;
					if(self.prePg != self.url){
						$(".dynamicLoad").find("a.next_btn, a.previous_btn").each(function(){
							if($(this).css("visibility")){
								$(this).fadeOut("1000", function(){ $(this).css({"visibility":"hidden"})});
							}
						});
						self.scrollObj.stop();
						self.scrollObj.animate({ scrollTop: "0px" }, pagScrl_Speed, "easeInOutQuart" ,function(){ });
					}else{
						if(isInCont != undefined || self.openYes){
							self.page_position();
						}
						self.scrollObj.animate({ scrollTop: 0 }, 500, "easeInOutQuart" );
					}
				}
			}
				
			// Change menu color and position the menu highlight
			$( '.nav li a' ).css({"color":self.menuColor});
			
			if(self.mobile){
				self.navUl.data('view',false);
				self.navUl.css({"display":"none"});
			}
			
			self.menuUpdate();
		},
		
		
// Initialize the History 
		history : function(){
			var self = this;

			(function($){
				var origContent = "";			
				function loadContent(hash2) {
					window.location.href.substr(0, window.location.href.indexOf('#'));
					var splt = hash2.split("?");
					var hash = !self.onePage ? self.homePg : splt[0];
					self.pgSub = splt[1];

					if(hash != "") {
						if(origContent == ""  && self.curPg == "") {
							origContent = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');
						}
						if(self.hisPath != hash ){
							self.hisPath = hash;
							self.page_load(hash);
						}else{
							
							if(self.pgSub != undefined && self.projFm){
								var p2 = self.pgSub.split("=");
								if((Number(p2[1]) != self.curSlide)){
									self.curFmSlider = $(".pageHolder .fmSlides").data("sArry");
									self.curSlide = Number(p2[1]);
									self.showDetailPage(self.curFmSlider[Number(p2[1])]);
								}
							}
						}
					} else {

						if(origContent != "" && self.curPg == "") {
							if(self.hisPath != hash ){
								self.hisPath = hash;
								self.page_load(self.homePg);
							}
						}else{
							if(!self.onePage){
								if(self.pgSub != undefined && self.projFm){
									var p2 = self.pgSub.split("=");
									
									if((Number(p2[1]) != self.curSlide)){
										self.curFmSlider = $(".pageHolder .fmSlides").data("sArry");
										self.curSlide = Number(p2[1]);
										self.showDetailPage(self.curFmSlider[Number(p2[1])]);
									}
								}
							}
						}
					}
					
					if(hash == "" && self.curPg == ""){
						self.page_load(self.homePg);
					}
					
					
				}

				$(document).ready(function() {
				  	$.history.init(loadContent);
				  	$('#navigation a').not('.external-link').click(function() {
						  var url = $(this).attr('href');
						  url = url.replace(/^.*#/, '');
						  $.history.load(url);
						  return false;
					});
				});
				
			})(jQuery);
			
		},

		
// Graph display function
		graph_display : function (e){
			e.find('li').each(function() {
				$(this).each(function() {
					  $(this).children(':first-child').css("width","0px");
					  $(this).children(':first-child').stop();
					  $(this).children(':first-child').animate( { width: $(this).attr('data-level') },  1500, "easeInOutQuart");
				  });
			});
		},
		
// Window Resize function
		windowRez : function (){			
			var self = this;
			if(Number(self.bdy.data("width")) != Number($(window).width()) || Number(self.bdy.data("height")) != Number($(window).height())){
				self.bdy.data("width", Number($(window).width()));
				self.bdy.data("height", Number($(window).height()));
				self.rez = true;
				self.page_setup();
				self.rez = false;
			}
		}
	};
	

		
// Initizlize and create the main plug-in
	$.fn.mainFm = function(params) {
	var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new mainFm($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	
})( jQuery );