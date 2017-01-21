

$(document).ready(function(){
	var imageWidth = 0; // hur bred en bild kommer vara - JF
	var numLi; // hur många bilder som är i bildspelet - JF
	var intervalTime = 5000; // hur ofta bildspelet automatiskt ska byta bild - JF
	var pos = 0; // vilken plats i bildsplet man är i, allså vilken bild som visas just nu - JF
	
	
	// initialiserar bildspelet, kollar hur många bilder som finns totalt och 
	// räknar ut hur brett bildspelet måste vara beroende på hur bred fönstret är - JF
	function initSlider(){
		// räknar hur många bilder som är med i mitt bildspel - JF
		numLi = $('#imageSlider ul li').length;
		
		// hämtar bredden på diven där bilden ska visas, detta kommer vara bredden på en bild - JF
		imageWidth = $('#imageSlider').width();

		
		// räknar ut totala bredden min UL i bildspelet - JF
		var ulWidth = imageWidth * numLi;
		
		// sätter bredden på min UL - JF 
		$('#imageSlider ul').css('width', ulWidth);
		
		// sätter bredden på varje li (alltså som bilderna ligger i) till samma som min UL - JF
		$('#imageSlider ul li').css('width', imageWidth);
		
		var test = $('#imageSlider ul').width();
		
	}
	
	initSlider(); // initialiserar bildspelet när man går in på sidan
	
	
	// varje gång man ändrar bredd på sitt fönster ska även bredden på bildspelet ändras så då körs initSlider igen - JF
	$(window).resize(function(){
		initSlider();
		slideImage(pos); // rättar till positionen i bildspelet efter man ändrat storleken på den - JF
	});
	
	// BYTA BILDER PÅ BILDSPELET - JF			
	
	// denna metod ska automatiskt bya bild i bildspelet, körs med interval - JF
	function autoChangeImage()
	{
		pos++; // ökar positionen med 1 - JF
		
		
		slideImage(pos); // applicerar den nya positionen
		

	}
	
	
	var sliderInterval = setInterval(autoChangeImage, intervalTime); // gör så att funktionen 'autoChangeImage' loopas - JF
	
	// funktion för att byta bild, 'newPos' är den nya positionen i bildspelet
	function slideImage(newPos){
		
		// kollar om den nya positionen i bildspelet överstrider hur många bilder som finns,
		// i så fall går bildspelet tillbaka till första bildet - JF
		if(newPos >= numLi) {
			pos = 0;
			newPos = 0;
		}
		// om man är på första bilden och klickar till vänster blir positionen negativ,
		// då går man längst bak i bildspelet - JF
		else if (newPos < 0) {
			pos = numLi-1;
			newPos = numLi-1;
		}
		
		var posPX = imageWidth * newPos; // räknar ut den nya positionen  - JF
		
		var marginpx = {'margin-left' : -posPX}; // css raden för att sätta margin  - JF
		
		$('#imageSlider ul').stop(true, false); // stoppar alla tidigare animationer
		$('#imageSlider ul').animate(marginpx, 3000); // applicerar marginen - JF
		
	}
	
	$('#sliderButtonLeft').click(function() {		
		pos--; // går bakåt i bildspelet
		
		slideImage(pos); // applicerar den nya positionen
		
		// återställer intervallen
		clearInterval(sliderInterval);
		sliderInterval = setInterval(autoChangeImage, intervalTime);
		
	});
	
	// om kan klickar på höger pilen
	$('#sliderButtonRight').click(function() {			
		pos++; // går fram ett steg i bildspelet
		
		slideImage(pos); // aplicerar den nya positionen
		
		// återställer intervallen
		clearInterval(sliderInterval);
		sliderInterval = setInterval(autoChangeImage, intervalTime);
	});				
});				