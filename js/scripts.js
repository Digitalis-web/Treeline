
// Ajego design script 
$(document).ready(function() {
	"use strict";
	jQuery.fx.interval = 45; /* Ju lägre denna är desto högre kvalitet blir det på animationer men ju lägre den är desto mer tar den på CPU. - JF */
	
	init_page();
	
	var body_width = $("body").width();
	
	/* Desktop only*/
	if(body_width > 992){
		// jQuery to collapse the navbar on scroll
		$(window).scroll(function() {
			if ($(".navbar").offset().top > 50) {
				if(!$(".navbar-fixed-top").hasClass("top-nav-collapse")) {
					
					$(".navbar-fixed-top").addClass("top-nav-collapse");
					$(".nav-text").css("color", "black");
					/* Byter färg på loggan */
					$("#logo-dark").css("visibility", "visible");
					$("#logo-white").css("visibility", "hidden");
				}
			}
			else 
			{
				if($(".navbar-fixed-top").hasClass("top-nav-collapse")) 
				{		
					$(".navbar-fixed-top").removeClass("top-nav-collapse");
					$(".nav-text").css("color", "white");
					/* Byter färg på loggan */
					$("#logo-dark").css("visibility", "hidden");
					$("#logo-white").css("visibility", "visible");		
				}
			}
		});
	}
	
	
	prepare_for_fade(".chat-bubble-fade");
	
	// Gör så att när man håller på klockan så studsar den samt gör så att chat rutan kommer upp J-F
	$(".proposal-btn").mouseenter(function(){
		
		$(".proposal-btn-img").stop();
		/* Gör så klockan studsar*/
		$(".proposal-btn-img").animate({ top: -50 }, {duration: 200});	
		$(".proposal-btn-img").animate({ top: 0 }, {duration: 1000, easing: 'easeOutBounce'});
		
		fade_in_object(".chat-bubble-fade");
	});
	
	$(".proposal-btn").mouseleave(function()
	{
		fade_out_object(".chat-bubble-fade",0);
	});
	
	// Förbereder ett element så att det kan användas i funktionen fade_in_object
	function prepare_for_fade(element){
		$(element).animate({ opacity: 0 }, {duration: 0});	
		$(element).css("position","relative");
		$(element).animate({ top: 50 }, {duration: 0});	
	}
	
	/* Gör så att elementet fadas in, för att denna ska funka måste elementet först köras i prepare_for_fade() JF*/
	function fade_in_object(element, delay){		
		setTimeout(function()
		{
			$(element).stop();
			$(element).animate({ top: 0 }, {duration: 500, queue:false});	
			$(element).animate({ opacity: 1 }, {duration: 1000, queue:false});	
		}
		, delay);
		
	}
	/* Fadar ut ett  element */
	function fade_out_object(element,delay){
		setTimeout(function()
		{
			$(element).stop();
			$(element).animate({ top: 50 }, {duration: 1000, queue:false});	
			$(element).animate({ opacity: 0 }, {duration: 1000, queue:false});	
			
		}
		, delay);
	}
	
	$(".half-margin-left").each(function(index) {
		var margin = $(this).css("margin-left");
		margin = parseInt(margin.replace("px", "")); // tar bort px
		margin = margin / 2;
		$(this).css("margin-left", margin);
	});
	
	$(".half-margin-right").each(function(index) {
		var margin = $(this).css("margin-right");
		margin = parseInt(margin.replace("px", "")); // tar bort px
		margin = margin / 2;
		$(this).css("margin-right", margin);
	});
	
	function init_center_vertical(){
		/* centererar alla objekt med denna klassen verikalt j-F */
		$( ".center-vertical" ).each(function(index) 
		{
			var parent_height = $(this).parent().height();
			var element_height = $(this).height();
			var pos = parent_height / 2 - (element_height/2);
			$(this).css("margin-top", pos);
			
		});
	}
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	function bind_scroll_effect()
	{
		$(function() {
			$('a.page-scroll').bind('click', function(event) {
				var $anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
					//	}, 800, 'easeInOutExpo');				
				}, 1000, 'easeOutCubic');				
				event.preventDefault();
			});
		});
	}
	
	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
		$('.navbar-togg le:visible').click();
	});
	
	// körs varje gång rutans storlek förändras
	$(window).resize(function(){
		init_page_dots();
		init_grid();
	});
	/* När man scollar på sidan */
	$(document).scroll(function() {		
		update_dots(); // när man skrollar så uppdateras prickarna på sidan
		fade_out_object(".chat-bubble-fade", 0);
		//var scroll_offset = $(window).scrollTop();
	});
	
	/* initialiserar allt som behövs på sidan, detta ska köras en gång när man går in på sidan för att ladda in allt som behöver J-F */
	function init_page(){
		init_page_dots();
		bind_scroll_effect();
		init_grid();
		init_center_vertical();
		load_components();
		
	}
	/*
		function isScrolledIntoView(elem)
		{
		var $elem = $(elem);
		var $window = $(window);
		
		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();
		
		var elemTop = $elem.offset().top;
		var elemBottom = elemTop + $elem.height();
		
		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}*/
	
	function load_components(){
		//$("nav").load("nav.html");
	}
	
	
	
	/*  Initialiserar grid J-F*/
	function init_grid(){
		var body_height = $("body").height();
		var body_width = $("body").width();
		
		var width = $(window).width(); 
		
		var device = "";
		/* if mobile J-F*/
		if ((width <= 767)) {
			device = "mobile-";
		}
		// tablet J-F
		else if (width > 767 && width < 992) {
			device = "tablet-";
		}
		
		for(var i = 5; i <= 100; i = i + 5) {
			var width = body_width * (i/100);
			var height = body_height * (i/100);
			
			$("." + device + "height-" + i).css("height", height);
			$("." + device + "height-push-" + i).css("margin-top", height);
			$("." + device + "width-" + i).css("width", width);
			$("." + device + "width-push-" + i).css("margin-left", width);
			$(".all-height-" + i).css("height", height);
			$(".all-height-push-" + i).css("margin-top", height);
			$(".all-width-" + i).css("width", width);
			$(".all-width-push-" + i).css("margin-left", width);
		}
	}
	
	
	/*<======================== START PÅ JS FÖR PRICKARNA PÅ SIDAN SOM VISAR VILKEN PAGE MAN ÄR PÅ ============================>*/	
	
	/* Dessa varibler måste deklareras här så att de finns kvar hela tiden J-F */
	var body_height; // hur hög bodyn är, alltså hur hög varje page är
	var dots_div_height; // höjden på diven med prickarna som visar var på sidan man är
	var num_pages; // hur många 'sidor' det finns
	var dots_margin_bottom = 15; // avståndet mellan varje prick
	
	
	// initialiserar allt som behöver för prickarna på sidan som visar vilken sida man är på J-F
	function init_page_dots(){
		num_pages =  $('body section').length; // hur många 'sidor' det finns
		dots_margin_bottom = 15; // avståndet mellan varje prick
		var dot_height = 20;
		var margin_offset = (num_pages * dots_margin_bottom) / 2;
		
		body_height = $("body").height(); // hämtar bodys höjd, detta är höjden på en 'sida'
		//dots_div_height = body_height * 0.12;  // räknar ut vad höjden av dots-diven ska vara, detta gör att dessa höjd blir relativ mot hela sidans höjd
		dots_div_height = dot_height * num_pages;  // räknar ut vad höjden av dots-diven ska vara, detta gör att dessa höjd blir relativ mot hela sidans höjd
		$('.page-dots-div').css('height', dots_div_height); // sätter bredden på diven
		
		var dots_div_y = body_height / 2 - dots_div_height / 2 - margin_offset; // räknar ut var diven ska sitta för att centreras på y-led
		$('.page-dots-div').css('top', dots_div_y); // centrerar diven
		update_dots(); // uppdaterar hur prickarna ser ut nu
	}
	
	
	
	// uppdaterar prickarna som visar vilken page man är på, detta kommer köras när sidan startas och när man scrollar osv J-F
	// Varje gång denna funktion körs så tas alla prickar bort och sedan läggs till och när dom läggs till så kollas det vilken 'sida' 
	// man är på och pricket som motsvarar den sidan får en annan färg än de andra
	function update_dots()
	{
		var scroll_offset = $(".navbar").offset().top; // hämtar hur långt ner på sidan man har scrollat
		var current_page = Math.floor((scroll_offset+body_height / 2) / body_height); // räknar ut vilken sida man är på
		
		$(".page-dot").remove(); // tar bort alla prickar
		$(".page-dots-div a").remove(); // tar bort alla länkar
		
		var dot_height = dots_div_height / num_pages; // räknar ut hur hög varje plupp ska vara
		
		/* det finns lika många prickar som det finns sidor totalt så denna loop körs lika många gånger som det finns
		sidor och lägger till en prick för varje sida.  J-F*/
		for (var i = 0; i < num_pages; i++) {
			// kollar om den pricken som ska läggas till nu motsvarar den sidan man är på och i så fall ska den ha en till css-klass
			var page_dot_element = "";
			if(i === current_page) {
				page_dot_element = "<div class = 'page-dot selected-dot'></div>";
				} else {
				var link = "#page" + i;	
				page_dot_element = "<a class = 'page-scroll' href = '"+link+"'><div class = 'page-dot'></div></a>";
			}
			$(".page-dots-div").append(page_dot_element); // lägger till pricken till containern
		}
		
		bind_scroll_effect();  // eftersom länkarna alltid tas bort varje gång de uppdateras måste scroll-effeckten bindas om J-F
		
		// sätter in storleken på prickarna
		$('.page-dot').css('height', dot_height);  // sätter höjden på varje div
		$('.page-dot').css('width', dot_height);  // sätter bredd till samma som höjden så att cirkeln blir cirkulär
		$('.page-dot').css('margin-bottom', dots_margin_bottom);  // sätter avståndet mellan prickarna
	}
	
	
	/*<=================================SLUT PÅ JS FÖR PRICKARNA PÅ SIDAN =================================================> */
	
	/*------------------------------------------ START FOR SHOWING AND HIDING TABLET NAV ------------------------------------------*/
	var nav_visible = false;
	
	// When the button to open nav on tablet/mobile is pressed JF
	$("#tablet-menu-button").click(function(){
		//$(".nav-tablet").toggle();
		toggle_tablet_nav();
	});
	// When the cross to exit the tablet/mobile nav is pressed JF
	$(".nav-x-tablet").click(function(){
		//$(".nav-tablet").toggle();
		toggle_tablet_nav();
	});
	
	function toggle_tablet_nav(){
		if(nav_visible === false)
		{
			$(".nav-tablet").stop();
			$(".nav-tablet").animate({ top: 0 }, {duration: 1000, queue:false});	
			nav_visible = true;
		}
		else{
			$(".nav-tablet").stop();
			$(".nav-tablet").animate({ top: "-150%" }, {duration: 1000, queue:false});	
			nav_visible = false;
		}
		//					$(element).animate({ top: 50 }, {duration: 1000, queue:false});	
	}
	
	/*------------------------------------------------ END OF NAV TABLET CODE ----------------------------------------------------------*/	
	
	
	var form_visible = false;
	
	
	$(".proposal-btn, .proposal-btn-tablet").click(function(){
		//$(".nav-tablet").toggle();
		toggle_form();
		toggle_tablet_nav();	//hides the menu when the form has been clicked
		
	});
	// When the cross to exit the tablet/mobile nav is pressed JF
	$(".proposal-x").click(function(){
		//$(".nav-tablet").toggle();
		toggle_form();
		toggle_tablet_nav();	//shows the menu when the form has been closed
	});
	
	$(".proposal-bg").click(function(){
		//	toggle_form();
	});
	
	function toggle_form(){
		if(form_visible === false){
			$(".proposal-container").toggle();	
			$(".proposal-container").stop();
			$(".proposal-container").animate({ top: 0 }, {duration: 1000, queue:false});	
			form_visible = true;
		} 
		else
		{
			
			$(".proposal-container").stop();
			$(".proposal-container").animate({ top: "-100%" }, {duration: 1000, complete: function(){ 
				$(".proposal-container").toggle();	 /* Hides the contaner once the animation completes */
			}
			});	
			
			form_visible = false;
		}
	}
	
	console.log(window.location.href.search("feedback=Please%20fill%20out%20all%20the%20fields"));
	
	if(window.location.href.search("feedback=Please%20fill%20out%20all%20the%20fields") != -1){	//opens the form if the user failed with input validation
		toggle_form();
	}

});																																																																																						