window.addEventListener('load', main)
window.addEventListener('resize', horzScrollbarDetect);
// document.getElementById('scoreTable').addEventListener('scroll', scrollTableShadow);

function main() {
    vaildateCacheIfOnline().then(_ => {});

    horzScrollbarDetect();
}

function vaildateCacheIfOnline() {

    return new Promise((resolve, reject) => {

        fetch(`config.json?cacheBust=${new Date().getTime()}`)
            .then(response => { return response.json() })
            .then(config => {

                let installedVersion = Settings.getVersion()
                if (installedVersion == 0) {
                    Settings.setVersion(config.version)
                    document.querySelector('#version').innerHTML = `version ${config.version}`;
                    return resolve();
                } else if (installedVersion != config.version) {
                    console.log('Cache Version mismatch')
                    fetch(`config.json?clean-cache=true&cacheBust=${new Date().getTime()}`).then(_ => {
                        //actually cleans the cache
                        Settings.setVersion(config.version);
                        window.location.reload();

                        return resolve(); // unnecessary
                    });

                } else {
                    // already updated
                    console.log('Cache Updated')
                    return resolve();
                }
            }).catch(err => {
                console.log(err);
                return resolve();
                //handle offline here 
            })
    })

}


function horzScrollbarDetect() {

    var scrollable = document.querySelector('.scrollable');
    var innerDiv = document.querySelector('.scrollable > div');

    if (innerDiv.clientWidth < innerDiv.scrollWidth) {
        scrollable.classList.add('is-scrollable');
        // console.log('Scrollbar, WOOT!')
    } else {
        scrollable.classList.remove('is-scrollable');
        // console.log('There is no scrollbar, only Zuul');
    }
}

var currentPlayerSelected;
var player1 = document.getElementById("player1CurrentScore");
var player2 = document.getElementById("player2CurrentScore");
var player3 = document.getElementById("player3CurrentScore");
var player1Table = document.getElementById("tablePlayer1");
var player2Table = document.getElementById("tablePlayer2");
var player3Table = document.getElementById("tablePlayer3");
var buttons = document.querySelector('.currentPlayerScore');

function selectPlayer(idPlayer) {

    buttons.classList.remove("grey", "yellow", "red", "blue");

    switch (idPlayer) {
        case 0:
            currentPlayerSelected = player1;
            buttons.classList.add("yellow");
            break;
        case 1:
            currentPlayerSelected = player2;
            buttons.classList.add("red");
            break;
        case 2:
            currentPlayerSelected = player3;
            buttons.classList.add("blue");
            break;
    }
}

function addScoreToPlayer(scoreValue) {
    if (currentPlayerSelected == null) {
        return
    }

    currentPlayerSelected.innerHTML = parseInt(currentPlayerSelected.innerHTML) + scoreValue;

}

function submitPlayerScore(submitType) {
    if (currentPlayerSelected == null) {
        return
    }

    buttons.classList.remove("yellow", "red", "blue");
    buttons.classList.add("grey");

    switch (submitType) {
        case 0:
            currentPlayerSelected.innerHTML = currentPlayerSelected.innerHTML * -1;
            currentPlayerSelected = undefined;
            break;
        case 1:
            currentPlayerSelected.innerHTML = 0;
            currentPlayerSelected = undefined;
            break;
        case 2:
            currentPlayerSelected.innerHTML = currentPlayerSelected.innerHTML * 1;
            currentPlayerSelected = undefined;
            break;
    }
}

function submitRound() {
    let player1RoundScore = document.createElement('td');
    let player2RoundScore = document.createElement('td');
    let player3RoundScore = document.createElement('td');

    buttons.classList.remove("yellow", "red", "blue");
    buttons.classList.add("grey");

    player1RoundScore.innerHTML = parseInt(player1.innerHTML) + parseInt(player1Table.lastElementChild.textContent);
    player1.innerHTML = 0;
    player1Table.appendChild(player1RoundScore);

    player2RoundScore.innerHTML = parseInt(player2.innerHTML) + parseInt(player2Table.lastElementChild.textContent);
    player2.innerHTML = 0;
    player2Table.appendChild(player2RoundScore);

    player3RoundScore.innerHTML = parseInt(player3.innerHTML) + parseInt(player3Table.lastElementChild.textContent);
    player3.innerHTML = 0;
    player3Table.appendChild(player3RoundScore);
}


/* Try to get shadows on both sides */
// function scrollTableShadow() {

// //poor code here
// let table = document.getElementById('scoreTable')
// let scrollCurrent = table.scrollLeft;
// let scrollMax = table.scrollWidth - table.clientWidth;
// let scrollable = document.querySelector('.scrollable');



// console.log(table.scrollWidth + "scrollwidth")
// console.log(table.scrollLeft + "scrollLeft")
// console.log(table.clientWidth + "clientWidth")
// console.log(scrollCurrent + "scrollCurrent")
// console.log(scrollMax + "scrollMax")
// if (scrollCurrent == 0) {
//     scrollable.id = "shadowLeft"
// } else if (scrollCurrent >= scrollMax) {
//     scrollable.id = "shadowRight"
// } else {
//     scrollable.id = "shadowBoth"
// }

// if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     // document.getElementById("myP").className = "test";
//     console.log('hey')
// } else {
//     document.getElementById("myP").className = "";
//     console.log('heeeey')
// }
// }