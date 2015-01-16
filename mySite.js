window.onload = function() {
	var prevOpen = false;
	var currOpen;
	var currButton;

	$('body').hide().fadeIn(2000);

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
