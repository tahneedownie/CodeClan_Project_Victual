playSound = function() {
    let soundURL = "https://s3.eu-central-1.amazonaws.com/project-vittel/vittel1.wav";
    const randomNumber = Math.random();
    if(randomNumber >= 0.5 && randomNumber <= 0.9){
      soundURL = "https://s3.eu-central-1.amazonaws.com/project-vittel/vittel2.wav";
    } else if(randomNumber > 0.9){
      soundURL = "https://s3.eu-central-1.amazonaws.com/project-vittel/vittel3.wav";
    }
    var sound = document.getElementById("audio");
    sound.setAttribute("src", soundURL);
    sound.play();
  }
