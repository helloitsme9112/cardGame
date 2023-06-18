(() => {
  let arr = [];
  let pairNumber; //default
  let card;

  const btn = document.querySelectorAll('.btn');
  const menu = document.querySelector('.menu');
  const gameField = document.querySelector('.game-field');
  const timer = document.querySelector('.display');

  function createShuffledArray(pairNumber) {

    for (let i = 1; i <= (pairNumber ** 2 / 2); i++) {
      arr.push(i);
      arr.push(i);
    };

    //fisher-yets
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    return arr;
  }

  function createCardField(arr, pairNumber) {
    const container = document.getElementById('container');
    if (container.hasChildNodes()) {
      while(container.hasChildNodes()) {
        container.removeChild(container.lastChild)
      }
    }

    for (let i = 0; i < pairNumber ** 2; i++) {
      card = document.createElement('button');
      card.classList.add('game-card');
      card.textContent = arr[i];
      container.append(card);
    };

    let cards = document.querySelectorAll('.game-card');

    if (pairNumber == 2) {
      for (each of cards) {
        each.classList.add('width2')
      }
    } else if (pairNumber == 4) {
      for (each of cards) {
        each.classList.add('width4')
      }
    } else if (pairNumber == 6) {
      for (each of cards) {
        each.classList.add('width6')
      }
    } else if (pairNumber == 8) {
      for (each of cards) {
        each.classList.add('width8')
      }
    } else if (pairNumber == 10) {
      for (each of cards) {
        each.classList.add('width10')
      }
    }

    return {
      container,
      card,
      cards,
    };
  };

  const endGame = document.querySelector('.end-game');

  function win() {
    document.querySelector('.end-game-descr').textContent = 'Вы победили!';
    endGame.classList.toggle('is-closed');
    document.body.classList.toggle('stop-scroll');
    return;
  };

  function gameOver() {
    const totalCards = document.querySelectorAll('.game-card');
    totalCards.forEach(e => {
      e.classList.add('match')
    })
    document.querySelector('.end-game-descr').textContent = 'Вы проиграли! :(';
    endGame.classList.toggle('is-closed');
    document.body.classList.toggle('stop-scroll');
    return;
  };

  function cardGame() {
    const field = createCardField(arr, pairNumber);

    const backToMenu = document.querySelector('.back-to-menu');

    backToMenu.addEventListener('click', () => {
      // location.reload(); //ленивый вариант
      endGame.classList.toggle('is-closed');
      gameField.classList.toggle('is-closed');
      menu.classList.toggle('is-closed');
      document.body.classList.toggle('stop-scroll');
      document.querySelectorAll('.solved').forEach(e => e.remove());
      console.log('prev arr = ', arr);
      arr = [];
      console.log('new arr = ', arr);
    });

    btn.forEach((el) => {
      el.addEventListener('click', () => {

        pairNumber = el.id;

        menu.classList.toggle('is-closed');

        gameField.classList.toggle('is-closed');

        timer.textContent = '59'

        let timerInterval = setInterval(function() {
          if (timer.textContent !== '0') {
            timer.textContent -= 1;
          } else {
            gameOver();
            clearInterval(timerInterval);
            return;
          }
        }, 1000);

        createShuffledArray(pairNumber);

        createCardField(arr, pairNumber);

        const totalCards = document.querySelectorAll('.game-card');

        totalCards.forEach((e) =>
          e.addEventListener('click', () => {

            e.classList.add('match');

            const matchedCards = document.querySelectorAll('.match');

            if (matchedCards.length === 2) {
              setTimeout(function () {
                if (matchedCards[0].textContent === matchedCards[1].textContent) {
                  matchedCards.forEach(e => e.classList.add('solved'));
                  let timerNumber = parseInt(timer.textContent);
                  timerNumber += 10;
                  timer.textContent = timerNumber;
                };

                matchedCards.forEach(e => e.classList.remove('match'));

                let solvedPairs = document.querySelectorAll('.solved');

                if (totalCards.length === solvedPairs.length) {
                  win();
                  clearInterval(timerInterval);
                };
              }, 1000);
            } else if (matchedCards.length > 2) {
              matchedCards.forEach(e => e.classList.remove('match'));
            }
          }));
      });
    });
  };
  window.cardGame = cardGame;
})()


