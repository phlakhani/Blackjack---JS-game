
// ******************************************** blackjack   *******************************************************************
document.querySelector('#hit-btn').addEventListener('click',hit)
document.querySelector('#deal-btn').addEventListener('click',deal)
document.querySelector('#stand-btn').addEventListener('click',dealerlogic)

const hitsound = new Audio('sounds/swish.m4a')
const winsound = new Audio('sounds/cash.mp3')
const lostsound = new Audio('sounds/aww.mp3')

let wincounts = 0
let lostcounts = 0
let drawcounts = 0

let blackjackgame= {

  'you':{'scorespan':'your-score', 'div':'your-box','score':0},
  'dealer':{'scorespan':'dealer-score', 'div':'dealer-box','score':0},
  'cards':["2","3","4","5","6","7","8","9","10","A","K","Q","J"],
  'cardsvalue':{"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"Q":10,"J":10,"A":[1,11]}
};

const YOU = blackjackgame['you']
const DEALER = blackjackgame['dealer']







//   hit function for you player
function hit() {
  card = randomcards()
  //console.log(card)
  showcard(YOU,card)
  updatescore(YOU,card)
   //console.log(YOU['score'])
   showscore(YOU)
}


function randomcards() {
  let randomindex = Math.floor(Math.random()*13)
  return blackjackgame['cards'][randomindex]
}

function updatescore(activeplayer,card){
  
    if (card == 'A') {

      if (activeplayer['score'] + blackjackgame['cardsvalue'][card][1]<=21) {
        activeplayer['score'] += blackjackgame['cardsvalue'][card][1];
      }
      else{
        activeplayer['score'] += blackjackgame['cardsvalue'][card][0];
      }

    }
    else{
          activeplayer['score'] += blackjackgame['cardsvalue'][card]
    }
       
}


function showcard(activeplayer,card) {
  if (activeplayer['score']<=21) {
  let imgcard = document.createElement('img');
  imgcard.src = `images/cards/${card}.png`;
  //console.log(YOU['div'])
  document.getElementById(activeplayer['div']).appendChild(imgcard);
  hitsound.play()
 }
}

function showscore(activeplayer) {
    if (activeplayer['score']>21) {
      document.querySelector(`#${activeplayer['scorespan']}`).textContent = 'BUST !'
      document.querySelector(`#${activeplayer['scorespan']}`).style.color = 'red' 
    }
    else{
   document.querySelector(`#${activeplayer['scorespan']}`).textContent = activeplayer['score']
   }
}



function deal() {
  let gamewinner
  gamewinner = decidewinner()
  //console.log(gamewinner)
  showresultmsg(gamewinner)

  let yourimages = document.querySelector('#your-box').querySelectorAll('img')
  let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img')
  
  for (var i = yourimages.length - 1; i >= 0; i--) {
    yourimages[i].remove() 
  }

  for (var i = dealerimages.length - 1; i >= 0; i--) {
    dealerimages[i].remove() 
  }

  YOU['score']=0
  DEALER['score']=0
  document.querySelector('#your-score').textContent = 0
  document.querySelector('#your-score').style.color = 'white'
  document.querySelector('#dealer-score').textContent = 0
  document.querySelector('#dealer-score').style.color = 'white'
  //document.querySelector('#resultmsg').textContent = "Let's Play";

  if (gamewinner === YOU) {
      wincounts += 1;
      document.querySelector('#win-counts').textContent = wincounts;
      //console.log('you win')
  }else if (gamewinner === DEALER) {
      lostcounts += 1;
      document.querySelector('#lost-counts').textContent = lostcounts;
    //console.log('you lost')
    
  }else{
     drawcounts += 1;
     document.querySelector('#draw-counts').textContent = drawcounts;
    //console.log('game draw')
    
  }


}

// delerlogic function for dealer logic
function dealerlogic(){

card = randomcards()
showcard(DEALER,card)
updatescore(DEALER,card)
showscore(DEALER)
}

function decidewinner() {
  let winner;
  if (YOU['score']<=21) {
    if (YOU['score']>DEALER['score']  || DEALER['score']>21) {
      winner=YOU
      //console.log('you win')
    }else if (YOU['score']<DEALER['score']) {
      winner = DEALER
      //console.log('you lost')
      
    }else if (YOU['score'] === DEALER['score']) {

      //console.log('Game Draw !!')
    }
  
  }else if (YOU['score']>21 && DEALER['score']<=21) {
     winner = DEALER
     //console.log('you lost')

    }else if (YOU['score']>21 && DEALER['score']>21) {
    //console.log('Game Draw !!')
    
    }

//console.log('winner is :',winner)
return winner

}

function showresultmsg(gamewinner) {
  let msg, msgcolor

   if (gamewinner==YOU) {
    msg = 'Great, You Won !!';
    msgcolor = 'green';
    winsound.play()
   }else if (gamewinner == DEALER) {
    msg = 'You Lost, Try Again!';
    msgcolor = 'red';
    lostsound.play()
  }else{
    msg = 'Game Draw!'
    msgcolor = 'black'
  }

  document.querySelector('#resultmsg').textContent = msg;
  document.querySelector('#resultmsg').style.color = msgcolor;

}


