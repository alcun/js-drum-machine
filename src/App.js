import "./App.scss";
import React, { useEffect, useState } from "react";

const kit = [
  {
    id: "Kick 1",
    keyTrigger: "Q",
    keyCode: 81,
    src: require("./audio/kick1.mp3"),
  },
  {
    id: "Kick 2",
    keyTrigger: "W",
    keyCode: 87,
    src: require("./audio/kick2.mp3"),
  },
  {
    id: "Bass 808",
    keyTrigger: "E",
    keyCode: 69,
    src: require("./audio/bass808.mp3"),
  },
  {
    id: "Snare",
    keyTrigger: "A",
    keyCode: 65,
    src: require("./audio/snare.mp3"),
  },
  {
    id: "Clap",
    keyTrigger: "S",
    keyCode: 83,
    src: require("./audio/clap.mp3"),
  },
  {
    id: "Cowbell",
    keyTrigger: "D",
    keyCode: 68,
    src: require("./audio/cowbell.mp3"),
  },
  {
    id: "Closed Hat",
    keyTrigger: "Z",
    keyCode: 90,
    src: require("./audio/hat closed.mp3"),
  },
  {
    id: "Open Hat",
    keyTrigger: "X",
    keyCode: 88,
    src: require("./audio/hat open.mp3"),
  },
  {
    id: "Scifi 808",
    keyTrigger: "C",
    keyCode: 67,
    src: require("./audio/scifi808.mp3"),
  },
];

function App() {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState(" ");
  const [speed, setSpeed] = React.useState(0.5);
  const [display, setDisplay] = React.useState("Alcun's Drum Machine");

  const playRecording = () => {
    let i = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[i]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      i += 1;
    }, speed * 600);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArray.length - 1
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div class="container" id="drum-machine">
          <div class="row">
            <br />
            <div className="col pad-container">
              <div className="row grid">
                {kit.map((clip) => (
                  <Pad
                    clip={clip}
                    volume={volume}
                    setRecording={setRecording}
                    setDisplay={setDisplay}
                  />
                ))}
              </div>
            </div>
            <br />
            <div class="col">
              <div id="display" className="display">
                <u>{display}</u>
              </div>

              <br />

              <div className="row">
                <div className="col nobCol">
                  <h4 className="nobLabel">
                    
                      Playback
                      <br /> Speed
                    
                  </h4>
                  <input
                    id="reversedRange"
                    type="range"
                    step="0.01"
                    onChange={(e) => setSpeed(e.target.value)}
                    value={speed}
                    max="1.2"
                    min="0.1"
                    className="w-30 slider"
                  />
                </div>
                <div className="col nobCol">
                  <h4 className="nobLabel">
                    
                      Master <br /> Volume
                    
                  </h4>
                  <input
                    type="range"
                    step="0.01"
                    onChange={(e) => setVolume(e.target.value)}
                    value={volume}
                    max="1"
                    min="0"
                    className="w-30 slider"
                  />
                </div>
              </div>

              <section id="sequenceScreen" className="display">
                <h3 className="w-30 sequence">
                  {" "}
                  <p>
                    <u>SEQUENCE:</u>
                  </p>{" "}
                  {recording}
                </h3>
              </section>
              <br />
              <section className="sequence-btn">
                <button
                  onClick={() => setRecording("")}
                  className="btn btn-danger "
                >
                  clear
                </button>
                <button onClick={playRecording} className="btn btn-success">
                  play
                </button>
              </section>
            </div>
          </div>
        </div>
        <footer>
          © 2022-
          <a href="https://alcun.github.io/Alcun-Personal-Portfolio/">alcun</a>
        </footer>
      </header>
    </div>
  );
}

export default App;

function Pad({ clip, volume, setRecording, setDisplay }) {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + clip.keyTrigger + " ");
    setDisplay(clip.id);
  };

  return (
    <div
      onClick={playSound}
      id={clip.id}
      className={`btn btn-secondary drum-pad ${active && "btn-warning"}`}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.src} />
      {clip.keyTrigger}
    </div>
  );
}
