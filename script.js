//Ian Draves Copyright 2017 (C)

//Function for image drop
function processImage(image) {
    var songChoice = document.getElementById("song");
    var img = document.getElementById('image');

    //Unhiding elements
    img.className = 'unhiddenimg';
    songChoice.className = 'unhidden';

    img.src = URL.createObjectURL(image);

    //Making sure the slected file is an image
    if (!image.name.match(/.(jpg|jpeg|png|gif)$/i)) {
        alert('The selected file is not an image!');
        img.className = 'hidden';
        return;
    }

    img.onload = function() {
        //Defining variables
        var song;

        var rgb = getAverageColor(img);
        var rgbStr = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        console.log(rgb);

        //Calculating best song
        const totalRGB = rgb.r + rgb.g + rgb.b;
        if (rgb.r >= 208 && rgb.g >= 208 && rgb.b <= 55) { //If brightish-yellow (Happy)
            song = "<a href='https://www.youtube.com/watch?v=ZbZSe6N_BXs'>\"Happy\", Pharrell Williams</a>";
        }
        else if (rgb.r <= 40 && rgb.g <= 50 && rgb.b <= 170) { //If darkish-blue (Sad)
            song = "<a href='https://www.youtube.com/watch?v=IXdNnw99-Ic'>\"Wish You Were Here\", Pink Floyd</a>";
        }
        else if (rgb.r <= 90 && rgb.r >= 40 && rgb.g <= 75 &&
                 rgb.g >= 25 && rgb.b <= 50 && rgb.b >= 0) { //If brownish (Neautral)
            song = "<a href='https://www.youtube.com/watch?v=6E1pImAgers'>\"Forever And A Day\", Ian Brown</a>";
        }
        else if (rgb.r >= 200 && rgb.r <= 255 || rgb.g >= 200 &&
                 rgb.g <= 255 || rgb.b >= 200 && rgb.b <= 255) { //If bright colors (Happy/Excited)
            song = "<a href='https://www.youtube.com/watch?v=nEt1bKGlCpM'>\"Idols\", Virtual Riot</a>";
        }
        else if (rgb.r <= 160 && rgb.r >= 100 && rgb.g <= 125 && rgb.g >= 70 && rgb.b <= 115 && rgb.b >= 70) { //If the image has lots of different colors (Colorful Song)
            song = "<a href='https://www.youtube.com/watch?v=5wu7u9vjjY8'>\"Skinnamarink\", The Elephant Show</a>";
        }
        else if (totalRGB >= 0 && totalRGB <= 225) { //If darker colors (Dark song)
            song = "<a href='https://www.youtube.com/watch?v=PoeEMHSUVxE'>\"Cry Little Sister\", The Lost Boys</a>";
        }
        else if (totalRGB >= 226 && totalRGB <= 345) { //If slightly brighter than dark colors
            song = "<a href='https://www.youtube.com/watch?v=OKRJfIPiJGY'>\"Bela Lugosi's Dead\", Bauhaus</a>";
        }
        else { //If no good song was detected
            //Getting random number for random generic song
            var gensong = Math.floor((Math.random() * 4) + 1);

            if (gensong == 1) {
                song = "<a href='https://www.youtube.com/watch?v=0vo23H9J8o8'>\"Pride And Joy\", Stevie Ray Vaughan</a>";
            }
            if (gensong == 2) {
                song = "<a href='https://www.youtube.com/watch?v=57RIlznOpDM'>\"Late in the Evening\", Paul Simon</a>";
            }
            if (gensong == 3) {
                song = "<a href='https://www.youtube.com/watch?v=KbuGWgYLqWk'>\"Asleep\", The Smiths</a>";
            }
            if (gensong == 4) {
                song = "<a href='https://www.youtube.com/watch?v=zzjQg-JdwTg'>\"To Let Myself Go\", Ane Brun</a>";
            }
        }

        //Showing user song
        songChoice.innerHTML = "<b>Suggested Song: </b>" + song;
    };
}

//Function to get average rgb
function getAverageColor(img) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = img.naturalWidth;
    var height = canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    var r = 0;
    var g = 0;
    var b = 0;

    for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i+1];
    b += data[i+2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));

    return { r: r, g: g, b: b };
}

//When user hovers over page with image
document.ondragover = function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
};

//When user drops image on page
document.ondrop = function(event) {
    event.preventDefault();
    var images = event.dataTransfer.files;
    for (var i = 0; i < images.length; i++) {
        processImage(images[i]);
    }
};
