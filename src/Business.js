 import { useEffect, useRef} from "react";
 import {ReactComponent as Vagina} from "./img/vagina-svgrepo-com.svg";
 import {Howl, Howler} from 'howler';
 import MOAN from './audio/MOAN1.mp4';
 import MOAN2 from './audio/MOAN1.webm';

 const height = window.innerHeight;
 const width = window.innerWidth;
 const roi = 150;
 
 
 const moan = new Howl({
     src:[MOAN,MOAN2],
     pool:10,
     loop: true
 })


 
const Business = () => {
    const bal = true;
    const videoElement = useRef(null);
    const canvasEl = useRef(null);
    const prevFrame = useRef(null);
    const totalmotion = useRef(0);
    const pinik  = useRef(0);
    moan.play();
    moan.pause();

  

    useEffect( () =>{

        let ctx = canvasEl.current.getContext('2d');
        let w = width/2 - 75;
        let h = height/2 - 75;
        async function initCamara(){
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true
                })
                videoElement.current.srcObject = stream

                videoElement.current.onloadeddata = () => {
                    ctx.drawImage(videoElement.current,0,0,width,height);
                    prevFrame.current = ctx.getImageData(0,0,width,height).data;
                }

                return new Promise((resolve) =>{
                    
                    videoElement.current.onloadedmetadata = () =>{
                        resolve(videoElement.current)
                    }
                })
            }

            const errorMessage = 'this browser does not support video capture, or this devices does not have a camera'
            alert(errorMessage)

            return Promise.reject(errorMessage)
        }

        async function load() {
            const videoLoaded = await initCamara()
            videoLoaded.play()

            
            return videoLoaded
        }
        load()
       
        const myworker = new Worker('/my.worker.js');
        const FPS = 30;
        function ProcessVideo(){
            let begin = Date.now();

            if(!videoElement.current) return;
            ctx.clearRect(0,0,width,height);
            ctx.drawImage(videoElement.current,0,0,width,height);
            const now = ctx.getImageData(w,h,roi,roi).data;
           

            const payload = { 'prev': prevFrame.current, 'now': now }

           if(prevFrame) { myworker.postMessage(payload);}


           prevFrame.current = now;
            myworker.onmessage = e =>{
               if(e.data) totalmotion.current = e.data;
                if(e.data > 1000) pinik.current +=e.data;
            }

            Gen2_Moan(pinik.current);

            if(pinik.current > 0){
                pinik.current -= 400;
            }
            if(pinik.current > 200000){
                pinik.current = 170000;
            }

            let delay =  1000/FPS - (Date.now() - begin);

            setTimeout(ProcessVideo,delay);
        }

       ProcessVideo();

    },[]);

    

    function Gen2_Moan(p){
        if(p>150000){
            if(!moan.playing()){
             moan.seek();
             moan.play();

            }
        }else{
            if(moan.playing()){
                moan.fade(1,0.5,20000);


            }
        }
        
    }

    moan.on('end',()=>{
        pinik.current = 0;
    });
    moan.on('fade',()=>{
        moan.pause();
    });
    moan.on('pause',()=>{
        moan.volume(1);
    } );

    return ( 
        <div className="business">
            <video ref={videoElement} id = "video_input" hidden ></video>
            <canvas className = "canvas_output"  ref ={canvasEl} id = "canvas_output"
             height= {height}
             width={width}></canvas>
             <Vagina className="vagina"></Vagina>
        </div>
     );
}
 
export default Business;

