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


	// =========================
	// SCROLL SPY
	// =========================
	// try {
	// 	var lastId,
	// 		topMenu = $(".main-menu ul"),
	// 		topMenuHeight = $('header').outerHeight()-110,
	// 		// All list items
	// 		menuItems = topMenu.find("a"),
	// 		// Anchors corresponding to menu items
	// 		scrollItems = menuItems.map(function(){
	// 			var item = $($(this).attr("href"));
	// 			if (item.length) { return item; }
	// 		});

	// 	// Bind click handler to menu items
	// 	// so we can get a fancy scroll animation
	// 	menuItems.click(function(e){
	// 		var href = $(this).attr("href"),
	// 		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	// 		$('html, body').stop().animate({ 
	// 			scrollTop: offsetTop
	// 		}, 300);
	// 		e.preventDefault();
	// 	});

	// 	// Bind to scroll
	// 	$(window).scroll(function(){
	// 		// Get container scroll position
	// 		var fromTop = $(this).scrollTop()+topMenuHeight;
			
	// 		// Get id of current scroll item
	// 		var cur = scrollItems.map(function(){
	// 			if ($(this).offset().top < fromTop)
	// 				return this;
	// 		});
	// 		// Get the id of the current element
	// 		cur = cur[cur.length-1];
	// 		var id = cur && cur.length ? cur[0].id : "";

	// 		if (lastId !== id) {
	// 			lastId = id;
	// 			// Set/remove active class
	// 			menuItems
	// 			.parent().removeClass("current_menu_item")
	// 			.end().filter("[href=#"+id+"]").parent().addClass("current_menu_item");
	// 		}
	// 	});
	// } catch(e) {
	// 	console.log(e);
	// }

	// =========================
	// APLICANDO FUNDO MAIS ESCURO QUANDO PASSAR PELA SESSAO SERVICES
	// =========================
	try {
		$(window).scroll(function(){
			about = $('.section#about').position().top;
			jobs = $('.section#jobs').position().top;
			contact = $('.section#contato').position().top;
			currentPos = $(window).scrollTop();

			if (currentPos > 20 && currentPos < about) {
				$('.main-menu ul li:first-child').addClass('current-menu-item');
			} else {
				$('.main-menu ul li:first-child').removeClass('current-menu-item');
			}

			if (currentPos > about && currentPos < jobs) {
				$('.main-menu ul li:nth-child(2)').addClass('current-menu-item');
			} else {
				$('.main-menu ul li:nth-child(2)').removeClass('current-menu-item');
			}

			if (currentPos > jobs - 1 && currentPos < contact) {
				$('.main-menu ul li:nth-child(3)').addClass('current-menu-item');
			} else {
				$('.main-menu ul li:nth-child(3)').removeClass('current-menu-item');
			}

			if (currentPos > contact - 1) {
				$('.main-menu ul li:nth-child(4)').addClass('current-menu-item');
			} else {
				$('.main-menu ul li:nth-child(4)').removeClass('current-menu-item');
			}

			// console.log(about + " Jobs: " + jobs + " Current: " + currentPos);
		});
	} catch(e) {
		console.log(e);
	}
});