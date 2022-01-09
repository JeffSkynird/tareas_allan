export const  play = (playMethod,type)=>{
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

  }else{
    // false for not mobile device
    if(localStorage.getItem('sound-paused')==null){
      playMethod(type)
      let timer =  setTimeout(()=>{
        playMethod(null)
        clearTimeout(timer);
        }
        , 300);
    }

  }

  }