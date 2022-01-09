import React,{useEffect} from 'react'
import useSound from 'use-sound';
export default function Sound({ counter,sound }) {
    const [play,{stop }] = useSound(sound, { interrupt: true });
    useEffect(() => {
      play();
      return ()=>{

       let timer =  setTimeout(
          () => {
            stop()
            clearTimeout(timer);
        }
    , 1000);
         
     
      }
    }, [counter, play]);
    return null;
  }