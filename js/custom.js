(function($) {

	"use strict"; 

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video.paused !== true && video.ended !== true) {
			video.pause();
		}
		$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	}

	$(document).ready(function() {

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
        /* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}

		/* ----------------------------------------------------------- */
		/*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */
		function checkSize() {
			if ($( document ).width() > 992) {
				var btn_hover = "";
				$(".btn").each(function() {
					var btn_text = $(this).text();
					$(this).addClass(btn_hover).empty().append("<span data-hover='" + btn_text + "'>" + btn_text + "</span>");
				});
			}
		}
		checkSize();
		window.addEventListener('resize', function () {
			checkSize();
		});

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

		$(".contactform").on("submit", function() {
			$(".output_message").text("Thank you for contact us. As early as possible we will contact you");

			var form = $(this);
			$.ajax({
				url: form.attr("action"),
				method: form.attr("method"),
				data: form.serialize(),
				success: function(result) {
					if (result == "success") {
						$(".form-inputs").css("display", "none");
						$(".box p").css("display", "none");
						$(".contactform").find(".output_message").addClass("success");
						$(".output_message").text("Thank you for contact us. As early as possible we will contact you");
					} 

					// else {
					// 	$(".tabs-container").css("height", "440px");

					// 	$(".contactform").find(".output_message").addClass("error");
					// 	$(".output_message").text("Error Sending!");
					// }
				}
			});

			return false;
		});

	});

	$(document).keyup(function(e) {

		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$("#navbar-collapse-toggle").removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});


})(jQuery);

 


window.addEventListener('load',function(){
  initSlider(
    'slider', //id
    ['SHAIFUL','DEVELOPER','DESIGNER'], 
    100, //duration
    1000 //delay
  );
});

//just copy and paste below
var createText = function(text,id,duration){
  document.getElementById(id).innerHTML = '';
  for(let i = 0; i < text.length; i++){
    setTimeout(()=>{
      let newText = text.substr(0,(i+1));
      document.getElementById(id).innerHTML = newText;
    },duration*i);
  }
}
var clearText = function(id,duration){
  let text = document.getElementById(id).innerHTML;
  for(let i = text.length; i > 0; i--){
    setTimeout(()=>{
      let newText = text.substr(0,text.length-i);
      document.getElementById(id).innerHTML = newText;
    },duration*i);
  } 
}
var initSlider = function(id,texts,duration,delay){
  let durs = [];
  for(let i = 0; i < texts.length-1; i++){
    let beforeDur;
    if(i==0){
      beforeDur = 0;
    }
    else{
      beforeDur=durs[i-1];
    }
    durs.push((texts[i].length*duration*2) + (2*delay) + beforeDur);
  }
   
  let allTime = 0;
  for (let i = 0; i < texts.length; i++){
    allTime += (texts[i].length*duration*2) + (2*delay);
  }
  let mainSlider = function(){
    for(let i = 0; i < texts.length; i++){
      setTimeout(()=>{
        createText(texts[i],id,duration);
        setTimeout(()=>{
          clearText(id,duration);
        },texts[i].length*duration + delay);
      },i === 0 ? 0 : durs[i-1]);
    }
  }
  mainSlider();
  setInterval(()=>{
    mainSlider();
  },allTime);  
}
