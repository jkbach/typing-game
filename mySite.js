//function () {
$('body').hide().fadeIn(2000);
window.onload = function() {
	var prevOpen = false;
	var currOpen;
	var currButton;
	
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0) {
		alert("It appears that you are using Internet Explorer.  Please note that this website has not been tested with Internet Explorer and may not function correctly.")
	}
	
	$('.topics').on('click', function() {
		var toggleSpeed = 0;

		if (this == currButton || prevOpen && currButton != document.getElementById("typeGame")) {
			$(currButton).toggleClass("highlight");
		}
		if (this != currButton && this != document.getElementById("typeGame")) {
			$(this).toggleClass("highlight");
		}

		if (prevOpen && !(this == currButton)) {
			$('#' + currOpen).hide();
		} else {
			prevOpen = !prevOpen;
			toggleSpeed = 300;
		}

		currButton = this;
		currOpen = $(this).attr("click-field");

		$('#' + currOpen).slideToggle(toggleSpeed);
		console.log(prevOpen);
		console.log(currOpen);
	});

	$('#secretPikaButton').on('click', function() {
		$('#secretPika').toggle(300);
	});
}
//}();
