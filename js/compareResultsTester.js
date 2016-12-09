function compareResults()
{
    var myGuess = [1,2,3,4]; //TO-BE-REMOVED this will be replaced with whatever the user's guess actually is
    var realResult = [6,5,3,4];//TO-BE-REMOVED this will be replaced with what the actual answer will be

    var correctPiece = 0;// this will be a correct guess in the right place
    var partiallyCorrectPiece = 0; // this will be a correct color but in the incorrect spot
    for(guess_slot = 0, guess_slot < 4, guess_slot++)//guess_slot will be the current color we're comparing (4 because there are four spots to compare)
    {
        for(results_slot = 0, results_slot < 4, results_slot++)
        //HERE IS WHERE WE WILL COMPARE THE SELECTED ANSWER WITH EACH COLOR IN THE RESULTS
        {
            if(myGuess[guess_slot] === realResult[results_slot] && guess_slot === results_slot)
            // If the guess is the same as the item in the results AND the slots are the same (position) then add correct
            {
                correctPiece += 1;
                //CORRECT MATCH FOUND (BLACK PEGS)
            }
            else if(myGuess[guess_slot] === realResult[results_slot])
            //IF ALL REQUIREMENTS ABOVE AREN'T MET THEN TRY THIS
                //IF GUESS IS CORRECT AND ASSOCIATED WITH A RESULT BUT NOT IN THE CORRECT SLOT
            {
                partiallyCorrectPiece += 1;
                //ADD 1 TO THE PARTIALLY CORRECT SECTION (WHITE PEGS)
            }
        }
    }
}
