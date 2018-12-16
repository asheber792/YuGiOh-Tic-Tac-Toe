const gameBoard = document.querySelector('.game_board'); 
const turnMessage = document.querySelector('.turn_message'); 
const clrBrdBtn = document.querySelector('.clrBrdBtn');
let turnChecker = 0; 
let gamePiece;

//set piece to play and change turn message
const checkTurn = () => {
	if(turnChecker % 2 == 0){
		gamePiece.src = 'images/yugi.png';
		gamePiece.classList.add('yugi');
		turnMessage.textContent = `It's Player 2's Turn`;

	}
	else{
		gamePiece.src = 'images/marik.png';
		gamePiece.classList.add('marik');
		turnMessage.textContent = `It's Player 1's Turn`;
	}
};

const winRowOrColumn = (groupName, classIndex) => {
	const gameBlocks = document.getElementsByClassName('game_block'); 

	let matchingBlocks1 = []; 
	let matchingBlocks2 = []; 

	for(const block of gameBlocks){
		if(block.classList[classIndex] == groupName && block.classList[3] == 'piecePlayed' && block.firstChild.classList[0] == 'yugi'){
			matchingBlocks1.push(block);
		}
		else if(block.classList[classIndex] == groupName && block.classList[3] == 'piecePlayed' && block.firstChild.classList[0] == 'marik'){
			matchingBlocks2.push(block);
		}
	}

	if(matchingBlocks1.length == 3 || matchingBlocks2.length == 3){
		if(turnChecker % 2 == 0){
			turnMessage.textContent = 'Player 2 Wins!!!';
		}
		else{
			turnMessage.textContent = 'Player 1 Wins!!!';
		}
		gameBoard.removeEventListener('click', playPiece, false);
	}
}

const checkForWinner = (e) => {
	const gameBlocks = document.getElementsByClassName('game_block'); 

	winRowOrColumn('groupA', 1);	
	winRowOrColumn('groupB', 1);
	winRowOrColumn('groupC', 1);
	winRowOrColumn('group1', 2);
	winRowOrColumn('group2', 2);
	winRowOrColumn('group3', 2);
}

const playPiece = (e) => {
	gamePiece = document.createElement('img');

	//only play game piece if one hasn't already been played in selected block
	if(!e.target.contains(gamePiece) && e.target.tagName != 'IMG'){
		checkTurn(); 
		
		console.log(e.target); 
		e.target.classList.add('piecePlayed');
		e.target.append(gamePiece);
		
		turnChecker++; 
		console.log(turnChecker);

		checkForWinner(e);
	}
} 

const playerGo = () => {
	gameBoard.addEventListener('click', playPiece, false); 
}; 

//clear the board
clrBrdBtn.addEventListener('click', () =>{
	location.reload(); 
});

playerGo();