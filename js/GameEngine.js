

colorList = ["black", "blue", "yellow", "green", "red", "orange"];
function randomProblem(){
	//create a random list of 4 colors
	//list = Math.floor((Math.random() * 6) + 1);
	list = [];
	for (i=0; i < 4; i++){
		list[i] = colorList[Math.floor((Math.random() * 5))];
	}
	//alert(list);
	return list;
}

function loadProblem() {
	return randomProblem();
	
}

function testRow(colors, solution) {
	if (colors.toString() == solution.toString()) {
		return true;
	} else {
		return false;
	}
	
}

//dummy placeholder until real results calculated
function randomResult(){
	/* Randomly Generate a number between
	0-2
	*/
	list = [];
	for (i=0; i < 4; i++){
		list[i] = Math.floor((Math.random() * 3));
	}
	orderResult(list);
	return list;
}

//order result so that good pegs are added first
function orderResult(list){
	//sort descending
	list.sort(function(a, b){return b-a});
	return list;
}

//Copied Matts Code to check and review guess here.
function checkGuess(guess, answer){
  
	var scoreArray = [];
	
	for (i=0; i < guess.length; i++){
		if(guess[i] === answer[i]){
			scoreArray.push(2); //add a 2 = red peg
			//remove these from further comparison
			guess[i] = null;
			answer[i] = null;
		}
	}
	if(scoreArray.length == 4) //all 2s = Success
	{
	   return scoreArray; //game won. do not continue
	}
	else {
		for (i=0; i < guess.length; i++){
			if(guess[i] != null) {
				for (ii=0; ii < guess.length; ii++){
					if(guess[i] === answer[ii]){
						scoreArray.push(1);
						guess[i] = null;
						answer[ii] = null;
					}
				}
			}
		}
	}
	//add 0s on to end
	while(scoreArray.length < 4){
		scoreArray.push(0);
	}
	//alert(scoreArray);
	return scoreArray;
}