(function(){
  const overlay = document.getElementById('eye-overlay');
  const canvas  = document.getElementById('eye-canvas');
  const ctx     = canvas.getContext('2d');
  const W = 560, H = 320, CX = W/2, CY = H/2;

  let blinkT = 0, blinkOpen = 1;
  let jitterX = 0, jitterY = 0, jitterTimer = 0;
  let running = false;

  function drawEye(open) {
    ctx.clearRect(0,0,W,H);

    const bg = ctx.createRadialGradient(CX,CY,10,CX,CY,200);
    bg.addColorStop(0,'rgba(140,0,0,0.18)');
    bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,W,H);

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(CX, CY, 185, 85 * open, 0, 0, Math.PI*2);
    ctx.clip();

    const scl = ctx.createRadialGradient(CX,CY,60,CX,CY,185);
    scl.addColorStop(0,'#0a0000');
    scl.addColorStop(1,'#000');
    ctx.fillStyle = scl;
    ctx.fillRect(0,0,W,H);

    const veins = [
      [20,CY,130,CY-8],[22,CY-28,118,CY-6],[24,CY+28,116,CY+8],
      [40,CY-55,120,CY-14],[42,CY+55,118,CY+16],
      [W-20,CY,W-130,CY-8],[W-22,CY-28,W-118,CY-6],[W-24,CY+28,W-116,CY+8],
      [W-40,CY-55,W-120,CY-14],[W-42,CY+55,W-118,CY+16],
    ];
    ctx.strokeStyle='#6a0000'; ctx.lineWidth=1.1;
    veins.forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });

    const iris = ctx.createRadialGradient(CX,CY,5,CX,CY,76);
    iris.addColorStop(0,'#0a0000');
    iris.addColorStop(0.28,'#7a0000');
    iris.addColorStop(0.58,'#cc1100');
    iris.addColorStop(0.82,'#800000');
    iris.addColorStop(1,'#2a0000');
    ctx.fillStyle = iris;
    ctx.beginPath(); ctx.arc(CX,CY,76,0,Math.PI*2); ctx.fill();

    ctx.strokeStyle='rgba(255,30,0,0.45)'; ctx.lineWidth=0.8;
    for(let a=0;a<Math.PI*2;a+=Math.PI/8){
      ctx.beginPath();
      ctx.moveTo(CX+30*Math.cos(a),CY+30*Math.sin(a));
      ctx.lineTo(CX+74*Math.cos(a),CY+74*Math.sin(a));
      ctx.stroke();
    }

    const pup = ctx.createRadialGradient(CX,CY,0,CX,CY,34);
    pup.addColorStop(0,'#000'); pup.addColorStop(1,'#0a0000');
    ctx.fillStyle=pup;
    ctx.beginPath(); ctx.arc(CX,CY,34,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000';
    ctx.beginPath(); ctx.arc(CX,CY,26,0,Math.PI*2); ctx.fill();

    ctx.fillStyle='rgba(255,255,255,0.13)';
    ctx.beginPath(); ctx.ellipse(CX+14,CY-12,7,4,-0.4,0,Math.PI*2); ctx.fill();

    ctx.restore();

    ctx.fillStyle='#000';
    ctx.beginPath();
    ctx.moveTo(CX-185,CY);
    ctx.quadraticCurveTo(CX, CY - 90*open - (1-open)*10, CX+185, CY);
    ctx.lineTo(CX+185, 0); ctx.lineTo(CX-185, 0); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(CX-185,CY);
    ctx.quadraticCurveTo(CX, CY + 90*open + (1-open)*10, CX+185, CY);
    ctx.lineTo(CX+185, H); ctx.lineTo(CX-185, H); ctx.closePath(); ctx.fill();

    if(open > 0.3){
      const lashX = [75,105,140,170,200,230,260,295,325,355,385];
      const lashA = [-0.5,-0.35,-0.2,-0.1,0,0.1,0.2,0.35,0.5,0.6,0.7];
      ctx.strokeStyle='rgba(20,20,20,0.9)'; ctx.lineWidth=2.5;
      lashX.forEach((x,i)=>{
        const eyeTop = CY - 85*open * Math.sin(Math.acos((x-CX)/185));
        ctx.beginPath();
        ctx.moveTo(x, eyeTop);
        ctx.lineTo(x + Math.sin(lashA[i])*14*open, eyeTop - 18*open);
        ctx.stroke();
      });
    }
  }

  function loop() {
    if(!running) return;
    blinkT += 0.012;
    if(blinkT > 1){ blinkT=0; }
    if(blinkT < 0.85)       { blinkOpen = 1; }
    else if(blinkT < 0.9)   { blinkOpen = 1 - (blinkT-0.85)/0.05; }
    else if(blinkT < 0.93)  { blinkOpen = 0; }
    else                    { blinkOpen = (blinkT-0.93)/0.07; }

    jitterTimer--;
    if(jitterTimer < 0){ jitterX=(Math.random()-0.5)*6; jitterY=(Math.random()-0.5)*3; jitterTimer=Math.random()*40+10; }
    else { jitterX*=0.85; jitterY*=0.85; }

    canvas.style.transform = `translate(${jitterX}px,${jitterY}px)`;
    drawEye(blinkOpen);
    requestAnimationFrame(loop);
  }

  function openEye(){
    overlay.style.display='flex';
    running=true; blinkT=0;
    loop();
  }
  function closeEye(){
    overlay.style.display='none';
    running=false;
  }

  document.addEventListener('keydown', e=>{
    if((e.key==='f'||e.key==='F') && document.activeElement.tagName!=='INPUT') openEye();
    if(e.key==='Escape') closeEye();
  });
  overlay.addEventListener('click', closeEye);
})();
