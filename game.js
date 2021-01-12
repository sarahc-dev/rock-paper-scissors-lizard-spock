const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const widthQuery = window.matchMedia("(min-width: 750px)");

const options = ["rock", "paper", "scissors", "lizard", "spock"];
let userChoice = "";
let gameChoice = "";

let score = sessionStorage.getItem("score");

if (score == null) {
    $("h2").innerHTML = 0;
} else {
    $("h2").innerHTML = score;
}

$$(".btn-outer").forEach((button) => {
    button.addEventListener("click", () => {
        userChoice = button.getAttribute("value");
        newGame();
    })
})

function newGame() {
    $(".game-pentagon").style.background = "none";
    $(".btn-container:nth-child(1)").classList.add("hidden");
    $(".btn-container:nth-child(4)").classList.add("hidden");
    $(".btn-container:nth-child(5)").classList.add("hidden");
    $(".btn-container:nth-child(3)").classList.add("transparent-circle");
    $(".btn-container:nth-child(3) .btn-outer-shadow").classList.add("hidden");

    let userBtn = userChoice + "-outer";
    let newImg = "./images/icon-" + userChoice + ".svg";
    const youPicked = document.createElement("h3");
    youPicked.textContent = "You picked";
    const housePicked = document.createElement("h3");
    housePicked.textContent = "The house picked";
    
    $("[value='spock']").classList.replace("spock-outer", userBtn);
    $("[value='spock'] img").classList.replace("spock", userChoice);
    $("[value='spock'] img").setAttribute("src", newImg);
    $("[value='spock'] img").setAttribute("alt", userChoice);
    $("[value='spock']").disabled = true;
    $("[value='paper']").disabled = true;

   if (widthQuery.matches === false) {
    $("[value='spock']").classList.add("medium-outer");
    $("[value='spock'] div").classList.add("medium-inner");
    $("[value='spock'] img").classList.add(userChoice + "-med");
    $(".btn-container:nth-child(2)").appendChild(youPicked);
    $(".btn-container:nth-child(3)").appendChild(housePicked);
   } else {
    $("[value='spock']").classList.add("lrg-outer");
    $("[value='spock'] div").classList.add("lrg-inner");
    $("[value='spock'] img").classList.add(userChoice + "-lrg");
    $(".btn-container:nth-child(2)").prepend(youPicked);
    $(".transparent-circle").prepend(housePicked);
    // $(".game-pentagon").style.transform = "translateX(-20%)";
   }
    
   setTimeout(() => {
    housePicks();
}, 1000);
}

function housePicks() {
    let randomNumber = Math.floor(Math.random() * 5);
    gameChoice = options[randomNumber];

    let houseBtn = gameChoice + "-outer";
    let houseImg = "./images/icon-" + gameChoice + ".svg";

    $(".btn-container:nth-child(3)").classList.remove("transparent-circle");
    $(".btn-container:nth-child(3) h3").style.transform = "translateX(0px)";
    $(".btn-container:nth-child(3) .btn-outer-shadow").classList.remove("hidden");
    $("[value='paper']").classList.replace("paper-outer", houseBtn);
    $("[value='paper'] img").classList.replace("paper", gameChoice);
    $("[value='paper'] img").setAttribute("src", houseImg);
    $("[value='paper'] img").setAttribute("alt", gameChoice);

    if (widthQuery.matches === false) {
        $("[value='paper']").classList.add("medium-outer");
        $("[value='paper'] div").classList.add("medium-inner");
        $("[value='paper'] img").classList.add(gameChoice + "-med"); 
    } else {
        $(".btn-container:nth-child(3) h3").style.margin = "2.5rem 0 2rem 3rem";
        $("[value='paper']").classList.add("lrg-outer");
        $("[value='paper'] div").classList.add("lrg-inner");
        $("[value='paper'] img").classList.add(gameChoice + "-lrg"); 
        
        $(".game-pentagon").style.maxWidth = "600px";
        
    }

    setTimeout(() => {
        whoWins();
    }, 1000);
}

function whoWins() {
    let newScore = 0;

    $(".game-result").classList.remove("hidden");

    if (userChoice == gameChoice) {
        $("h1").innerHTML = "Draw";
    } else if ((userChoice == "paper" && gameChoice == "rock") || (userChoice == "spock" && gameChoice == "rock") || (userChoice == "rock" && gameChoice == "scissors") || (userChoice == "rock" && gameChoice == "lizard") || (userChoice == "lizard" && gameChoice == "spock") || (userChoice == "lizard" && gameChoice == "paper") || (userChoice == "spock" && gameChoice == "scissors") || (userChoice == "spock" && gameChoice == "rock") || (userChoice == "scissors" && gameChoice == "paper") || (userChoice == "scissors" && gameChoice == "lizard")) {
        $("h1").innerHTML = "You win";
        
        if (score == null) {
            sessionStorage.setItem("score", "1");
            newScore = 1;
        } else {
            newScore = parseInt(sessionStorage.getItem("score"), 10);
            newScore++; 
        } 
    } else {
        if (score == null) {
            sessionStorage.setItem("score", "-1");
            newScore = -1;
        } else {
            newScore = parseInt(sessionStorage.getItem("score"), 10);
            newScore--;
        }
    }

    if (window.screen.width > "1000") {
        $(".game-pentagon").style.maxWidth = "939px";
    }

    sessionStorage.setItem("score", JSON.stringify(newScore));
            
    $("h2").innerHTML = newScore;

    $(".play-again").addEventListener("click", () => {
        location.reload();
    })
}



$(".rules").addEventListener("click", () => {
    $(".rules-background").classList.remove("hidden");
    // $("main").classList.add("hidden");

    $("button").addEventListener("click", () => {
        $(".rules-background").classList.add("hidden");
        // $("main").classList.remove("hidden");
    })
})