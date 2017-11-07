jQuery(document).ready(function($){
	// =========================
	// Hide Header on on scroll down
	// =========================
	var didScroll;
	var lastScrollTop = 0;
	var delta = 140;
	var navbarHeight = $('.header').outerHeight();

	$(window).scroll(function(event){
	    didScroll = true;
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    
	    // Make sure they scroll more than delta
	    if(Math.abs(lastScrollTop - st) <= delta) {
	        return;
	    }
	    
	    // If they scrolled down and are past the navbar, add class .nav-up.
	    // This is necessary so you never see what is "behind" the navbar.
	    if (st > lastScrollTop && st > navbarHeight){
	        // Scroll Down
	        $('header').removeClass('nav-down').addClass('nav-up');
	    } else {
	        // Scroll Up
	        if(st + $(window).height() < $(document).height()) {
	            $('header').removeClass('nav-up').addClass('nav-down');
	        }
	    }

	    if (st < delta) {
	    	$('header').removeClass('nav-down');
	    }
	    
	    lastScrollTop = st;
	}

	// =========================
	// EFEITO DE CLICAR NA SETA PRA ROLAR A TELA
	// =========================
	try {
		$.easing.easeInOutExpo = function (x, t, b, c, d) { // definição do efeito que será posteriormente usado no animate
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}

		$('.main-menu a').click(function(e){
			if($('body.home')[0]) {
				e.preventDefault();
			}

			$('html,body').animate({scrollTop: ($(this.hash).offset().top + 1)}, {
				duration: 1400, 
				easing: 'easeInOutExpo',
				complete:  function() { $('header').removeClass('nav-down'); }
					
				});
		});
	} catch(e) {
		console.log(e);
	}

	// =========================
	// mapa
	// =========================
	try {
		if($('#mapa')[0]) {
			var image = 'img/pin.png';
			var mapOptions = {
				zoom: 17,
				center: new google.maps.LatLng(-22.9839375, -43.2224139), 
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: 
					[
					  {
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#f5f5f5"
					      }
					    ]
					  },
					  {
					    "elementType": "labels.icon",
					    "stylers": [
					      {
					        "visibility": "off"
					      }
					    ]
					  },
					  {
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#616161"
					      }
					    ]
					  },
					  {
					    "elementType": "labels.text.stroke",
					    "stylers": [
					      {
					        "color": "#f5f5f5"
					      }
					    ]
					  },
					  {
					    "featureType": "administrative.land_parcel",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#bdbdbd"
					      }
					    ]
					  },
					  {
					    "featureType": "poi",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#eeeeee"
					      }
					    ]
					  },
					  {
					    "featureType": "poi",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        // "color": "#757575"
					        "color": "#cacaca"
					      }
					    ]
					  },
					  {
					    "featureType": "poi.park",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#e5e5e5"
					      }
					    ]
					  },
					  {
					    "featureType": "poi.park",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        // "color": "#9e9e9e"
					        "color": "#cacaca"
					      }
					    ]
					  },
					  {
					    "featureType": "road",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#ffffff"
					      }
					    ]
					  },
					  {
					    "featureType": "road.arterial",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        // "color": "#757575"
					        "color": "#cacaca"
					      }
					    ]
					  },
					  {
					    "featureType": "road.highway",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#dadada"
					      }
					    ]
					  },
					  {
					    "featureType": "road.highway",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        // "color": "#616161"
					        "color": "#cacaca"
					      }
					    ]
					  },
					  {
					    "featureType": "road.local",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#9e9e9e"
					      }
					    ]
					  },
					  {
					    "featureType": "transit.line",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#e5e5e5"
					      }
					    ]
					  },
					  {
					    "featureType": "transit.station",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#eeeeee"
					      }
					    ]
					  },
					  {
					    "featureType": "water",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#c9c9c9"
					      }
					    ]
					  },
					  {
					    "featureType": "water",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#9e9e9e"
					      }
					    ]
					  }
					],
				scrollwheel: false
			}
			var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
			var myPos = new google.maps.LatLng(-22.9856375, -43.2224139); 
			var myMarker = new google.maps.Marker({position: myPos, map: map, icon: image });
		} else {
			// 
		}
	} catch(e) {
		console.log(e);
	}
});