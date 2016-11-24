
//JQuery Stuff
$(document).ready(function (curProb) {
    var color = $("#curPiece").text();
	var rowno = 1;
	//alert(color);
	
	//handle click of a piece to change selected COLOR
	 $(".piece").click(function (event) {
       //alert(event.target.innerHTML);
	   $("#curPiece").text(event.target.innerHTML);
		color = event.target.innerHTML;
    });

	//handle row class clicks to ADD PEG
	$(".row").click(function (event) {
		//alert($(this)[0].id);
		if($(event.target).attr('class') != "guide") {
			if($(this)[0].id == "row" + rowno){
				event.target.innerText = color;
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
				rowno = rowno +1;
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


function loadNewProb($num){
    // get the fileNo to figure which problem to load.

    if ($num === 1){
        myproblem = q1;
    }
    else if ($num === 2){
        myproblem = q2;
    }
    else if ($num === 3){
        myproblem = q3;
    }
    else if ($num === 4){
        myproblem = q4;
    }
    else if ($num === 5){
        myproblem = q5;
    }
    else if ($num === 6){
        myproblem = q6;
    }

    //document.getElementById("problemID").innerHTML = "Problem #" + sudokuXMLfileNo;


    for (var x in myproblem) {
        var mytd = document.getElementById(x);
        for (var i = 0; i < mytd.childNodes.length; i++) {
            if (mytd.childNodes[i].className == "answer") {
                mytd.childNodes[i].innerText = myproblem[x];
                break;
            }
        }

        if (x == 'answer') {
            //alert(document.getElementById("answer").innerText);
            document.getElementById("answer").innerText = myproblem[x];
        }
    }

}





