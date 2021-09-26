class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./allSouunds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-acoustic02.wav";
    this.currentHihat = "./allSounds/hihat-acoustic02.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hiHatSound = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 1000;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.mutes = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    console.log(step);
    //console.log(this.playBtn);
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hiHatSound.currentTime = 0;
          this.hiHatSound.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this, (this.isPlaying = null);
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(event) {
    //console.log(event);
    const selectionName = event.target.name;
    const selectionValue = event.target.value;
    console.log(selectionName, "  ", selectionValue);
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareSound.src = selectionValue;
        break;
      case "hihat-select":
        this.hiHatSound.src = selectionValue;
        break;
    }
  }
  mute(event) {
    const muteIndex = event.target.getAttribute("data-track");
    event.target.classList.toggle("active");
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hiHatSound.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hiHatSound.volume = 1;
          break;
      }
    }
  }

  changeTempo(event) {
    console.log(event);
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = event.target.value;
    tempoText.innerHTML = event.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumkit = new DrumKit();

//drumkit.start();

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.playBtn.addEventListener("click", function () {
  drumkit.start();
  drumkit.updateBtn();
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (event) {
    drumkit.changeSound(event);
  });
});

drumkit.mutes.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    drumkit.mute(event);
  });
});

drumkit.tempoSlider.addEventListener("input", function (event) {
  drumkit.changeTempo(event);
});

drumkit.tempoSlider.addEventListener("change", function (event) {
  drumkit.updateTempo();
});
