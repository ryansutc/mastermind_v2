

colorList = ["Black", "Blue", "Yellow", "Green", "Red", "Orange"];
function randomProblem(){
	//create a random list of 4 colors
	//list = Math.floor((Math.random() * 6) + 1);
	list = [];
	for (i=0; i < 4; i++){
		list += colorList[Math.floor((Math.random() * 6) + 1)];
	}
	//alert(list);
	return list;
}

function loadProblem() {
	return randomProblem();
	
}