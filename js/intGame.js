
var btn = document.getElementById('resetBtn');

btn.onclick = function() {
    for (var i = 0; i < imgArray.length; i++) {
        var image_x = document.getElementById(imgArray[i]);
        image_x.parentNode.removeChild(image_x);
    }
    trys = 0;
    match = 0;
    nstars = 3;
    stars = '&#10022 &#10022 &#10022';
    intGame();
    document.getElementById('trys').innerHTML = 'Moves: '+trys +'&nbsp &nbsp Matches: '
    + match +'&nbsp &nbsp Rating:'+stars;
}

intGame();
