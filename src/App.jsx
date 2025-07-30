import { useEffect, useRef, useState } from 'react'
import './App.scss'
import AnimatedRoutes from './Components/Animatedroutes/Animatedroutes';
import audio from '../src/assets/Music/bgmusic3.mp3';
import { FaVolumeOff, FaVolumeUp } from 'react-icons/fa';

function App() {
  const [paused, setPaused] = useState(0);

  const audioRef = useRef(null);


  useEffect(() => {
    const playAudio = () => {
      audioRef.current?.play();
    };

    window.addEventListener('click', playAudio, { once: true });

    return () => {
      window.removeEventListener('click', playAudio);
    };
  }, []);



  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPaused(0);
    } else {
      audio.pause();
      setPaused(1);
    }
  };





  return (
    <div className="app">
      <audio ref={audioRef} src={audio} autoPlay loop ></audio>
      <div className="audbtn">
        <button onClick={toggleAudio} > {paused ? <FaVolumeUp/> : <FaVolumeOff />} </button>
      </div>
      <AnimatedRoutes />
    </div>
  )
}

export default App
