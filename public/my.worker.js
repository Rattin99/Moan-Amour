onmessage = (e) =>{
   const {prev,now} = e.data;
   postMessage(compare(prev,now));
}

function compare(prev,now){
   if(!prev)  return;
   let totalmotion = 0;
   for(let i =0;i<prev.length; i += 4){
      let r1 = prev[i];    //red
      let g1 = prev[i+1];  //green
      let b1 = prev[i+2];  //blue
      let r2 = now[i];
      let g2 = now[i+1];
      let b2 = now[i+2];

      totalmotion += distancesq(r1,r2,g1,g2,b1,b2);
   }

   return Math.floor(totalmotion/(prev.length/4));
}


function distancesq(r1,r2,g1,g2,b1,b2){

   return (r2-r1)*(r2-r1) + (g2-g1)*(g2-g1) + (b2-b1)*(b2-b1);
}