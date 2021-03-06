
//JQuery Stuff
$(document).ready(function (curProb) {
    var color = $("#curPiece").text();
	var curpiece = $("#curPiece")[0].innerHTML;
	var rowno = 1;
	var numofRows = 8;
	//alert(color);

	//load solution
	var solution = loadProblem();
	var solutionspan = textToSpan(solution);
	
	//spanToText(solutionspan);
	$("#solutionA")[0].innerHTML = solutionspan[0];
	$("#solutionB")[0].innerHTML = solutionspan[1];
	$("#solutionC")[0].innerHTML = solutionspan[2];
	$("#solutionD")[0].innerHTML = solutionspan[3];
	
	$("#solutionA").hide();
	$("#solutionB").hide();
	$("#solutionC").hide();
	$("#solutionD").hide();
	$("#NewGame").hide();
	
	//handle a click on the answer cell to show answer
	 $("#answercell").click(function (event) {
		$("#solutionA").show();
		$("#solutionB").show();
		$("#solutionC").show();
		$("#solutionD").show();
		$("#NewGame").show();
    });
	
	
	//handle a click on the new game cell to load new game
	 $("#NewGame").click(function (event) {
		$("#solutionA").hide();
		$("#solutionB").hide();
		$("#solutionC").hide();
		$("#solutionD").hide();
		$("#NewGame").hide();
		
		$(".a").empty();
		$(".b").empty();
		$(".c").empty();
		$(".d").empty();
		
		$(".rank1").empty();
		$(".rank2").empty();
		$(".rank3").empty();
		$(".rank4").empty();
		
		var solution = loadProblem();
		var solutionspan = textToSpan(solution);
		
		$("#solutionA")[0].innerHTML = solutionspan[0];
		$("#solutionB")[0].innerHTML = solutionspan[1];
		$("#solutionC")[0].innerHTML = solutionspan[2];
		$("#solutionD")[0].innerHTML = solutionspan[3];
		
		
		$('#GameOver').text("");
		rowno = 1;
    });
	
	//handle click of a piece to change selected COLOR
	 $(".piece").click(function (event) {
	   $("#curPiece")[0].innerHTML = this.innerHTML;
    });

	//handle row class clicks to ADD PEG
	$(".row").click(function (event) {
		//alert($(this)[0].id);
		if($(event.target).attr('class') != "guide") {
			if($(this)[0].id == "row" + rowno){
				event.target.innerHTML = $("#curPiece")[0].innerHTML;
			}
		}
	});
	
	//Click to test Guess
   $(".guide").click(function (event) {
		if(event.target.id == "answer" + rowno){
			//make sure all four pieces are added
			var myrow = $("#row" + rowno);
			var error = 0;
			myrow.children('td').each(function(index, element){
				if($.trim($(element).text()) == "" && element.className.startsWith('rank') == false &&  element.className != 'guide'){
					$(element).css("backgroundColor", "yellow");
					error = error +1;
				}
				else { 
					$(element).css("backgroundColor", "");
				}
			});
			if(error != 0){
				alert("Please fill out all cells");
				return;
			}
			
			var colors = [];
			myrow.children('td').each(function(index, element){
				if (element.className != "guide"){
					colors.push($(element).children(0)[0].className);
				};
			});

		
			//Evaluate Guess to solution!
			//need to make COPY of array, rather than pass byRef!
			var solutionCopy = solution.slice();
			var colorsCopy = colors.slice();
			var result = checkGuess(colorsCopy, solutionCopy);
			displayFeedback(result, rowno);
			
			//GAME WON?
			if (testRow(colors, solution)){
				$('#GameOver').text("Congratulatons, You win!");
				$("#solutionA").show();
				$("#solutionB").show();
				$("#solutionC").show();
				$("#solutionD").show();
				$("#NewGame").show();
				
				return;
			}
			//GAME OVER:
			else if (rowno == numofRows) {
				$('#GameOver').text("Game Over. You Lose. You Sad, sad loser you.");
				$("#solutionA").show();
				$("#solutionB").show();
				$("#solutionC").show();
				$("#solutionD").show();
				$("#NewGame").show();
			}		
			
			$("#row" + rowno).find(".rank");
			rowno = rowno +1;	
			
		}
	}); 

});

function textToSpan(text){
	
	var span = [];
	for (i=0; i < text.length; i++){
		span[i] = "<span class='" + text[i] + "'>&#9679;</span>";
	}
	return span;
	
	
}

function spanToText(span){
	var text = [];
	for (i=0; i < span.length; i++){
		var html = $.parseHTML( span[i]);
		//alert(typeof(html[i]));
		text[i] = html[0].classList[0];
		//alert(text[i]);
	}
	//alert(text);
	return text;
}

function spanToText2(span){
	var text = [];
	var el = document.createElement('html');
	for (i=0; i < span.length; i++){
		el.innerHTML = span[i];
		//alert(el);
		text.push(el.class);
	};
	return text;
}

function resultNoToSpan(num){
	if (num == 0){
		return null;
	}
	else if(num == 1){
		//return "white"
		return "<span class='white'>o</span>";
	}
	else if (num == 2){
		//return "red";
		return "<span class='red'>&#9679;</span>";
	}
	else {
		return "error";
	}
}

function displayFeedback(result, rowno) {
	for (i=1; i < 5; i++){
		$( "#row" + rowno).find( 
				".rank" + i)[0].innerHTML = resultNoToSpan(result[i-1]); 
	}
}

