
//JQuery Stuff
$(document).ready(function (curProb) {
    var color = $("#curPiece").text();
	var curpiece = $("#curPiece")[0].innerHTML;
	var rowno = 1;
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
       //alert(event.target.innerHTML);
		$("#solutionA").show();
		$("#solutionB").show();
		$("#solutionC").show();
		$("#solutionD").show();
		$("#NewGame").show();
    });
	
	//handle a click on the new game cell to load new game
	 $("#NewGame").click(function (event) {
		var solution = loadProblem();
		var solutionspan = textToSpan(solution);
		$("#solutionA")[0].innerHTML = solutionspan[0];
		$("#solutionB")[0].innerHTML = solutionspan[1];
		$("#solutionC")[0].innerHTML = solutionspan[2];
		$("#solutionD")[0].innerHTML = solutionspan[3];

		$("#solutionA").hide();
		$("#solutionB").hide();
		$("#solutionC").hide();
		$("#solutionD").hide();
		$("#NewGame").hide();
		
		$(".a").empty();
		$(".b").empty();
		$(".c").empty();
		$(".d").empty();
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
		//alert("Ive been clicked");
		if(event.target.id == "answer" + rowno){
			//make sure all four pieces are added
			var myrow = $("#row" + rowno);
			var error = 0;
			myrow.children('td').each(function(index, element){
				if($.trim($(element).text()) == ""){
					$(element).css("backgroundColor", "yellow");
					error = error +1;
				}
				else { 
					$(element).css("backgroundColor", "");
				}
			});
			if(error == 0){
				var colors = [];
				myrow.children('td').each(function(index, element){
					if (element.className != "guide"){
						colors.push(element);
					};
				});
				rowno = rowno +1;
				if (testRow(spanToText2(colors), solution)){
					alert("You are correct!");
				}
				else {
					alert("You're wrong. You hoser. Try again.");
				}
			}
			else {
				alert("Please fill out all cells");
			}
		}
	}); 

	
	
	
    $("#back").click(function () {
        //load new questions
        $(".answer").hide();
        $("#answer").hide();
        $(".question").show();
        $fileNo = parseInt($("#count").text());
        $("#count").text($fileNo - 1);
        loadNewProb(fileNo);
        event.preventDefault();
    })

    $("#showanswer").click(function () {
        //load new questions
        //alert("I was clciked");
        $("#answer").show();
    })
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
		alert(typeof(html[i]));
		text[i] = html[0].classList[0];
		alert(text[i]);
	}
	alert(text);
	return text;
}

function spanToText2(span){
	var text = [];
	var el = document.createElement('html');
	for (i=0; i < span.length; i++){
		el.innerHTML = span[i];
		text = el.className;
	};
	return text;
}


