let score = JSON.parse(localStorage.getItem('score'));

      if (score === null){
        score = {
        wins: 0,
        losses: 0,
        ties: 0
        

        };
        
      }
      updateScoreElement();

      let isAutoPlaying = false;

      let intervalId;

      function autoPlay(){
        if(!isAutoPlaying){
          intervalId = setInterval(function(){
          const  playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
         isAutoPlaying = true;
      } else {
         clearInterval(intervalId);
         isAutoPlaying = false;
      }


        }
      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r'){
            playGame('Rock');
        }else if(event.key === 'p'){
           playGame('Paper');
        }else if(event.key === 's'){
          playGame('Scissors');
        }

      });
          
      function playGame(playerMove)
      {
        const computerMove = pickComputerMove();
    
    
          let result = '';

          if (playerMove === 'Rock'){

            if(computerMove === 'Rock'){
                result = 'You Tie';
              }else if(computerMove === 'Paper'){
                result = 'You Lose';
              }else if(computerMove === 'Scissors'){
                result = 'You Win';
              }
            }

          else if(playerMove === 'Paper'){

            if(computerMove === 'Rock'){
                result = 'You Win';
              }else if(computerMove === 'Paper'){
                result = 'You Tie';
              }else if(computerMove === 'Scissors'){
                result = 'You Lose';
              }
            }

          else if(playerMove === 'Scissors'){

            if(computerMove === 'Rock'){
              result = 'You Lose';
            }else if(computerMove === 'Paper'){
              result = 'You Win';
            }else if(computerMove === 'Scissors'){
              result = 'You Tie';
            }
          }
         
          if(result === 'You Win'){
            score.wins += 1;
          }else if(result === 'You Lose'){
            score.losses += 1;
          }else if(result  === 'You Tie'){
            score.ties += 1;
          }

          localStorage.setItem('score',JSON.stringify(score));
          
          updateScoreElement();

          document.querySelector('.js-result')
          .innerHTML = result;

          document.querySelector('.js-moves').innerHTML 
          =  `You 
        <img src="images/${playerMove}.svg" 
        class="first-move">
        <img src="images/${computerMove}.svg" 
        class="second-move">
        Computer`;

      }

      function updateScoreElement(){
        document.querySelector('.js-score')
         .innerHTML = `wins: ${score.wins} losses: ${score.losses} ties: ${score.ties}`
      }

      function pickComputerMove(){
        const randomNumber = Math.random();

        let computerMove = '';

            if (randomNumber >= 0 && randomNumber < 1/3){
                computerMove = 'Rock';
            }else if(randomNumber >= 1/3 && randomNumber < 2/3){
              computerMove = 'Paper';
            }else if(randomNumber >= 2/3 && randomNumber < 1){
              computerMove = 'Scissors';
            }
        return computerMove;
          }