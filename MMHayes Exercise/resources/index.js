/* index.js */

$(document).ready(function() {

	// phone number autocomplete
	$("#phoneNumber").keydown(function(e) {

		var input = e.which;
		console.log(input);
		var curVal = $(this).val();
		console.log(curVal);

		// backspace
		if (input == 8 && curVal.length > 0) {
			e.preventDefault();

			// first digit, remove '('
			if (curVal.length == 2) {
				$(this).val('');
			}

			// first digit after area code, remove ') '
			else if (curVal.length == 7) {
				var splicedVal = curVal.slice(0, 4);
				$(this).val(splicedVal);
			}

			// first digit after dash, remove '-'
			else if (curVal.length == 11) {
				var splicedVal = curVal.slice(0, 9);
				$(this).val(splicedVal);
			}

			// standard backspace
			else {
				
				var splicedVal = curVal.slice(0, (curVal.length - 1));
				$(this).val(splicedVal);
				
				
			}
			
		
		}
		else if (e.key.length == 1){
			e.preventDefault();
			

			// not a number
			if (input >= 48 && input <= 57) {
				var mostRecentKey = String.fromCharCode(input);

				

				// length 0, append '(' to beginning
				if (curVal.length == 0) {
					var buildVal = "(" + mostRecentKey;
					$(this).val(buildVal);
				}

				// format (XXX, add ') ' before new val
				else if (curVal.length == 4) {
					var buildVal = curVal + ") " + mostRecentKey;
					$(this).val(buildVal);
				}

				// format (XXX) XXX, add '-' before new val
				else if (curVal.length == 9) {
					var buildVal = curVal + "-" + mostRecentKey;
					$(this).val(buildVal);
				}

				// at 14 characters, string is completed
				else if (curVal.length < 14) {
					var buildVal = curVal + mostRecentKey;
					$(this).val(buildVal);
				}

				
			}

		}

		
	});

	// on form submit
	$("#submitButton").click(function() {

		// error checking for all fields filled
		$(".inputField").each(function() {
			if ($(this).val() == "") {
				if ($("#blankMessage").is(":hidden")) {
					$("#blankMessage").removeAttr("hidden");
				}
				
				$(this).addClass("redBorder");
			}
		});

		// new object with information
		var dataToSend = {
			employeeName: $("#employeeName").val(),
			employeeNumber: $("#employeeNumber").val(),
			phoneNumber: $("#phoneNumber").val(),
			address: $("#address").val(),
			city: $("#city").val(),
			state: $("#state").val(),
			zip: $("#zipcode").val(),
			currentEmployee: $("#currentEmployee").val()
		};

		var dataAsJSON = JSON.stringify(dataToSend);

		$.ajax({
			method: "POST",
			url: "https://www.mmhayes.com",
			data: dataAsJSON,
			dataType: "JSON"
		}).done(function() {
			$("#blankMessage").attr("hidden", "true");
			$("#errorMessage").attr("hidden", "true");
			$(".inputField").each(function() {
				if ($(this).hasClass("redBorder")) {
					$(this).removeClass("redBorder");
				}
			});
			if ($("#dataReceived").is(":hidden")) {
				$("#dataReceived").removeAttr("hidden");
			}
		}).fail(function() {
			$("#blankMessage").attr("hidden", "true");
			$("#dataReceived").attr("hidden", "true");
			$(".inputField").each(function() {
				if ($(this).hasClass("redBorder")) {
					$(this).removeClass("redBorder");
				}
			});
			if ($("#errorMessage").is(":hidden")) {
				$("#errorMessage").removeAttr("hidden");
			}
		});


	});

});

