(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 
	
	/* Preloader Effect */
	$window.on( "load", function(){
		$(".preloader").fadeOut(600);
    });
	
	/* Sticky header */
	$window.scroll(function(){
    	if ($window.scrollTop() > 200) {
			$('.navbar').addClass('sticky-header');
		} else {
			$('.navbar').removeClass('sticky-header');
		}
	});
	
	/* slick nav */
	$('#main-menu').slicknav({prependTo:'#responsive-menu',label:'', closeOnClick:true});
		
	/* Top Menu */
	$(document).on('click','.navbar-nav li a, #responsive-menu ul li a',function(){
		
		if($(this).hasClass("has-popup")) return false;
		var id = $(this).attr('href');
		if($(id).length) {
			var h = parseFloat($(id).offset().top);
			$('body,html').stop().animate({
				scrollTop: h - 70
			}, 800);
			return false;
		}
		
	});
	
	/* Add active class to tab panel */
	var $card = $(".card"); 
	if($card.length){
		$card.on("show.bs.collapse hide.bs.collapse", function(e){
			if (e.type=='show'){
			  $(this).addClass('active');
			}else{
			  $(this).removeClass('active');
			}
		 });  
	}
	 
	/* Pop up page*/
	var $haspopup = $(".has-popup"); 
	if($haspopup.length){
		$haspopup.magnificPopup({
			type: 'inline',
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			removalDelay: 300,
			mainClass: 'mfp-zoom-in',
			callbacks: {
				open: function() {
					$('html').css('margin-right', 0);
					$('html').css('overflow', 'auto');
				}
			}
		});
	}
	
	/* Testimonial slider */
	var testimonial_slider = new Swiper('.author-skill-slider',{
		slidesPerView: 4,
		spaceBetween: 30,
		pagination: {
			el: '.author-skill-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			991: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			575: {
				slidesPerView: 1,
				spaceBetween: 20
			}
		}
    });
	
	/* Popup video */
	var	$popupvideo = $('.popup-video');
	if($popupvideo.length){
		$popupvideo.magnificPopup({
			type: 'iframe',
			preloader: true,
		});
	}
	
	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $("#contactForm").serialize(),
			success : function(text){
				if (text == "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center mt-4 text-success";
		} else {
			var msgClasses = "h3 text-center mt-4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */
	
	/* Animate with wow js */
    new WOW({mobile:false}).init(); 
	
	
	/*Portfolio (filtering) */
	
	/* Set initial filtering */
	$window.load( function() {

		if( $(".portfolio-boxes").length ) {
				
			/* Init Isotope */
			var $portfolio = $(".portfolio-boxes").isotope({
				itemSelector: ".portfolio-box",
				layoutMode: "masonry",
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: 1,
				}
			});
				
			/* Filter items on click */
			var $portfolionav=$(".portfolio-nav li a");
				$portfolionav.on('click', function (e) { 
			
				var filterValue = $(this).attr('data-filter');
				$portfolio.isotope({
					filter: filterValue
				}); 
				
				$portfolionav.removeClass("active-portfolio"); 
				$(this).addClass("active-portfolio");
				e.preventDefault();
			});
		
			$portfolio.isotope({ filter: "*" });
			}
			
		});
		
	/* Init Counter */
    $('.counter').counterUp({ delay: 4, time: 1000 });
	
})(jQuery);