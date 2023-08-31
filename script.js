const keyboard = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guessesText b");
const wordDisplay = document.querySelector(".wordDisplay");
const hangmanImg = document.querySelector(".hangmanBox img");
const gameModal = document.querySelector(".gameModal");
let currentWord , wrongCount = 0, correctGuess = [] ;
const maxWrong = 4;

const getRandomWord = () => {
    const { word , hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hintText b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictorious) => {
    setTimeout(() => {
        const modalText = isVictorious ? `You guessed the word:` : `The correct word was:`;
        gameModal.querySelector("h2").innerText = `${isVictorious ? 'Congratulations!' : 'You Lost!'}`; 
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b>`;
        gameModal.classList.add("active");
    }, 500)
}

const initGame = (button, clickedWord) => {
    if(currentWord.includes(clickedWord)){
        [...currentWord].forEach((letter , index) => {
            if(letter === clickedWord){
                correctGuess.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else{
            wrongCount++;
            hangmanImg.src = `images/${wrongCount}.jpeg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongCount} / ${maxWrong}`;
    
    if(wrongCount === maxWrong){
        return gameOver(false);
    }
    if(correctGuess.length === currentWord.length){
        return gameOver(true);
    }
}

// Create the keyboard
for(let i = 97; i <=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener('click' , e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();