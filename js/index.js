

function genRand(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

var nstars = 3;
var stars = '&#10022 &#10022 &#10022';
// star rating (from 1-3) that reflects the player's performance.
//  After 10 moves, changes from a 3 to a 2 star rating. After 14 moves, to a 1 star rating.
//TODO:  increase moves to 12 and 16: if first 4 moves uncovered unique 8 cards, then with perfect
// retention the score would be 12.

var id1 = [];
var id2 = [];
var img1 = [];
var img2 = [];
var match = 0;
var trys = 0;
var imgArray = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
    'img7.png',
    'img8.png',
];


function intGame() {
    start = 0;

    // Add duplicates to image array
    var Images = imgArray;
    Images = Images.concat(Images);
    deck = [];
    for (var i = 1; i <= Images.length; i++) {
       deck.push(i);
    }

    // Random sampling of deck without replacement
    var imgIndex = [];
    var ii=0;
    for (var i = 1; i <= 222; i++) {
        var num = genRand(1,Images.length+1);
        if (deck.indexOf(num)>-1) {
            imgIndex[ii] = num;
            ii++;
            deck.splice(deck.indexOf(num),1);
        }
    }

    // create 16 divs with respective hidden image
    for (var i = 1; i <= Images.length; i++) {

      var x = document.createElement('DIV');
      x.setAttribute('id', Images[imgIndex[i-1]-1]);
      x.setAttribute('name', i);
      x.setAttribute('onclick', 'imgBlock(this)');
      x.setAttribute('class', 'div1');
      document.body.appendChild(x);

      var y = document.createElement('IMG');
      y.setAttribute('id', 'card');
      y.setAttribute('src', 'images/'+Images[imgIndex[i-1]-1]);
      y.setAttribute('alt', 'image');

      x.appendChild(y);
    }
}

// update display of moves, matches and rating
function moveMatch() {
    document.getElementById('trys').innerHTML = 'Moves: '+trys
    +'&nbsp &nbsp Matches: '+ match
    +'&nbsp &nbsp Rating:'+ stars;
}

var count = 0;
var date1= new Date();
var date2= date1;
var min1 = date1.getMinutes();
var sec1 = date1.getSeconds();
var min2 = min1;
var sec2 = sec1;
var seconds = 0;
var start = 0;

// Start timer. Every 2 selections (count 1,2): reveal image, check match,
// end game when all match and present replay option
function imgBlock(e){
    count++;
    if (count<3) {
        if (count===1) {
            // start timer
            if (start===0) {
                date1 = new Date();
                min1 = date1.getMinutes();
                sec1 = date1.getSeconds();
                start = 1;
            }
            // reveal first selection
            id1 = e.id;
            img1 = e.firstElementChild;
            img1.style.display = 'block';
            e.style.opacity = 1;
            moveMatch();
        }
        if (count===2) {
            // update star rating
            trys += 1;
            if (trys > 10) {
                stars = '&#10022 &#10022';
                nstars = 2;
            }
            if (trys > 14) {
                stars = '&#10022';
                nstars = 1;
            }
            // reveal second selection
            id2 = e.id;
            img2 = e.firstElementChild;
            img2.style.display = 'block';
            e.style.opacity = 1;
            // check match
            if (id1==id2) {
                match++;
                count = 0;
                moveMatch();
                // end game when all match and present replay option
                if (match==(imgArray.length)) {
                    // calculate game time
                    date2 = new Date();
                    min2 = date2.getMinutes();
                    sec2 = date2.getSeconds();
                    seconds = (60*(min2-min1))+(sec2-sec1);

                    // display end game modal
                    document.getElementById('divEnd').style.display = 'block';
                    moveMatch();
                    document.getElementById('divText').innerHTML = 'Congratulations!<br>'+
                    'Time:&nbsp'+seconds+'sec'+'<br>Rating: '+stars+
                    '<button id="restartBtn" class="button">play again</button>';

                    // restart button
                    var btn1 = document.getElementById('restartBtn');
                    btn1.onclick = function() {
                        document.getElementById('divEnd').style.display = 'none';
                        for (var i = 0; i < imgArray.length; i++) {
                            var image_x = document.getElementById(imgArray[i]);
                            image_x.parentNode.removeChild(image_x);
                            image_x = document.getElementById(imgArray[i]);
                            image_x.parentNode.removeChild(image_x);
                        }
                        trys = 0;
                        match = 0;
                        count = 0;
                        nstars = 3;
                        stars = '&#10022 &#10022 &#10022';
                        intGame();
                        moveMatch();
                    }
                }
            } else {
                // hide selections if no match
                setTimeout(function(){img1.style.display = 'none'; }, 600);
                setTimeout(function(){img2.style.display = 'none'; }, 600);
                count = 0;
                moveMatch();
                return;
            }
        }
    }
}
