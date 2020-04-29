
class Graphics
{      

    constructor(){
    }


    drawImage(result,startPoint,points,colorList,guides){
        const colors = {"vihrea" : "#22b14c", "keltainen" : "yellow", "sininen" : "blue", "punainen" : "red"}
        var img = new Image(640,480)
        img.onload = initialize;
        img.src = "karttaVariton.png"
        var htmlCanvas = document.getElementById("myCanvas");
        htmlCanvas.hidden=false;
        document.getElementById("infoMapCanvas").hidden = true;
        document.getElementById("infoCanvas").hidden = true;
        var ctx = htmlCanvas.getContext("2d");
    
           // Start listening to resize events and draw canvas.
           function initialize() {
               // Register an event listener to call the resizeCanvas() function 
               // each time the window is resized.
               window.addEventListener('resize', resizeCanvas, false);
               // Draw canvas border for the first time.
               resizeCanvas();
            }
    
           
            function redraw() {
                var imgWidth = parseInt(document.getElementById("mySidenav").style.width)
                ctx.drawImage(img, 0, 0, imgWidth, img.height);
                ctx.lineWidth = 3;
          
                for(let i = 0; i < result.length; i++){
                    if(i !== result.length-1){
                        ctx.beginPath();
                        ctx.strokeStyle = colors[colorList[i]];
                        ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
                        ctx.closePath();
                        ctx.stroke();
                    }
                       
                }
    
                for(let i = 0; i < result.length; i++){
                        ctx.beginPath();
                        ctx.font = "2vw Kremlin Pro Web";
                        ctx.textAlign = "center";
                        var str = (i+1).toString();
                        if(i === result.length-1){
                            drawStar((htmlCanvas.width*points[result[i]]["width"]*2), htmlCanvas.height*points[result[i]]["height"]*2,25,12,ctx,colors[colorList[i]])

                            //ctx.fillText("Määränpää",(htmlCanvas.width*points[result[i]]["width"])*2+50, htmlCanvas.height*points[result[i]]["height"]*2-10, 60, 0, 2 * Math.PI, false);
                        }
                        else{
                            ctx.fillText(str,(htmlCanvas.width*points[result[i]]["width"])*2+30, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
                        }
                        if(result[i+1] !== undefined){
                            ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+30, htmlCanvas.height*points[result[i+1]]["height"]*2)
                        }
                        ctx.stroke();
                }

             }
            function redrawSmall() {
                ctx.drawImage(img,0 , 0, img.width, img.height);
                ctx.lineWidth = 3;
              
                for(let i = 0; i < result.length; i++){
                    if(i !== result.length-1){
                    ctx.beginPath();
                    ctx.strokeStyle = colors[colorList[i]];
                    ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"], 20, 0, 2 * Math.PI, false);
                    
                        ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"])
                    
                    ctx.closePath();
                    ctx.stroke();
                    }
                }
                ctx.lineWidth = 3;
            
                for(let i = 0; i < result.length; i++){
                    ctx.font = "5vw Kremlin Pro Web";
                    ctx.textAlign = "center";
                    var str = (i+1).toString();
                    if(i === result.length-1){
                        drawStar((htmlCanvas.width*points[result[i]]["width"]*2), htmlCanvas.height*points[result[i]]["height"],25,12,ctx,colors[colorList[i]])
                        //ctx.fillText("Määränpää",(htmlCanvas.width*points[result[i]]["width"])*2+45, htmlCanvas.height*points[result[i]]["height"], 60, 0, 2 * Math.PI, false);
                    }
                    else{
                        ctx.fillText(str,(htmlCanvas.width*points[result[i]]["width"])*2+30, htmlCanvas.height*points[result[i]]["height"], 20, 0, 2 * Math.PI, false);
                    }
                    if(result[i+1] !== undefined){
                        ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+30, htmlCanvas.height*points[result[i+1]]["height"])
                    }
                    ctx.stroke();
                }
            }
    
            // Runs each time the DOM window resize event fires.
            // Resets the canvas dimensions to match window,
            // then draws the new borders accordingly.
            function resizeCanvas() {
                if(window.innerWidth > 600){
                    htmlCanvas.width = window.innerWidth/2;
                    htmlCanvas.height = window.innerHeight/2;
                    img.width = window.innerWidth/2;
                    img.height = window.innerHeight/2;
                    redraw();
                }
                else{
                    htmlCanvas.width = window.innerWidth;
                    htmlCanvas.height = window.innerHeight;
                    img.width = window.innerWidth
                    img.height = window.innerHeight/2
                    redrawSmall();
                }
            }
           function animate (guides,color,startX,startY,width,height){
           
                if(window.innerWidth <600){ 
                    height /=2
                    startY /=2;
                    var canvas = document.querySelector('canvas'),
                    context = canvas.getContext('2d');
                    context.beginPath();
                    context.moveTo(htmlCanvas.width*width*2+20, htmlCanvas.height*height*2)
                    context.arc(canvas.width*width*2, canvas.height*height*2, 25, 0, 2 * Math.PI, false);
                    context.lineWidth = 4;
                    context.strokeStyle = colors[color];
                    context.stroke();
                    context.beginPath();
                    canvas_arrow(context, htmlCanvas.width*startX*2, htmlCanvas.height*startY*2, htmlCanvas.width*width*2, htmlCanvas.height*height*2);
                    context.stroke();
                }
                 else{
                    var canvas = document.querySelector('canvas'),
                    context = canvas.getContext('2d');
                    context.beginPath();
                    context.moveTo(htmlCanvas.width*width*2+35, htmlCanvas.height*height*2)
                    context.arc(canvas.width*width*2, canvas.height*height*2, 35, 0, 2 * Math.PI, false);
                    context.lineWidth = 5;
                    context.strokeStyle = colors[color];
                    context.stroke();
                    context.beginPath();
                    canvas_arrow(context, htmlCanvas.width*startX*2, htmlCanvas.height*startY*2, htmlCanvas.width*width*2, htmlCanvas.height*height*2);
                    context.stroke();
                }
                setTimeout(function () {
            // return the canvas to the state right after we show the arrow
                    resizeCanvas()  
                }, 3000);
        
            }
            function canvas_arrow(context, fromx, fromy, tox, toy) {
                var headlen = 20; // length of head in pixels
                var dx = tox - fromx;
                var dy = toy - fromy;
                var angle = Math.atan2(dy, dx);
                context.moveTo(fromx, fromy);
                context.lineTo(tox, toy);
                context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
                context.moveTo(tox, toy);
                context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
            }
         
            return animate
       
    }


    drawPlainMap(){
            var img = new Image(640,480)
            const storage = new Storage(); 
            img.onload = initialize;
            img.src = "varikartta.png";
            var infoMapCanvas = document.getElementById("infoMapCanvas");
            var ctx = infoMapCanvas.getContext("2d");
            var infotime = true;
           
        function initialize() {
            window.addEventListener('resize', resizeCanvas, false);
            resizeCanvas();
        }
    
           
        function redraw() {
                ctx.beginPath();
                ctx.drawImage(img, 0, 0, img.width, img.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#00ff00';
                ctx.stroke();
        }
        function redrawSmall() {
                ctx.beginPath();
                ctx.drawImage(img, 0, 0, img.width, img.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#00ff00';
                ctx.stroke();
        }
    
        function resizeCanvas() {
            if(window.innerWidth > 600){
                infoMapCanvas.width = window.innerWidth/2;
                infoMapCanvas.height = window.innerHeight/2;
                img.width = window.innerWidth/2
                img.height = window.innerHeight/2
                redraw();
            if(infotime){
                showInfo();
              
            }
            }
            else{
                infoMapCanvas.width = window.innerWidth;
                infoMapCanvas.height = window.innerHeight/2;
                img.width = window.innerWidth
                img.height = window.innerHeight/2
                redrawSmall();
                if(infotime){
                    showSmallInfo();
         
                }
            }
                
        }
         
        function showSmallInfo(){
                let infoCanvas = document.getElementById("infoCanvas");
                var infoContext = infoCanvas.getContext("2d");
                infoContext.drawImage(img,0,0,img.width,img.height);
                infoCanvas.width = window.innerWidth;
                infoCanvas.height = window.innerHeight;
                drawOk(infoContext,infoCanvas);
                infoContext.lineWidth = 3;
                infoContext.font = "5vw Kremlin Pro Web";
                infoContext.fillStyle = 'white';
                const text ="Tervetuloa reittihakuun."
                const text2="Yllä näet esimerkin haun tuloksesta kartalla,"
                const text3 ="lähtöpisteenä A ja päätepisteenä R."
                const text4 = "Haun tulokset tulevat näkyviin eriteltynä listana, "
                const text5 = "jossa jokaista etappia voi tarkastella erikseen."
                infoContext.beginPath();
                var yPosition = window.innerHeight/2;
                infoContext.moveTo(10,400)
                infoContext.fillText(text, 10, yPosition+50,infoCanvas.width-20, 0, 2 * Math.PI, false);
                infoContext.fillText(text2, 10, yPosition+80,infoCanvas.width-20, 0, 2 * Math.PI, false);
                infoContext.fillText(text3, 10, yPosition+110,infoCanvas.width-20, 0, 2 * Math.PI, false);
                infoContext.stroke();
                infoContext.moveTo(10,yPosition+160)
                infoContext.fillText(text4, 10, yPosition+160,infoCanvas.width-20, 0, 2 * Math.PI, false);
                infoContext.fillText(text5,10,yPosition+190, infoCanvas.width-20, 0, 2 * Math.PI, false);
                infoContext.stroke();
                 
        }
        function showInfo(){
                var infoCanvas = document.getElementById("infoCanvas");
                var infoContext = infoCanvas.getContext("2d");
                infoContext.drawImage(img, 0 , 0, img.width, img.height);
                infoCanvas.width = window.innerWidth/2;
                infoCanvas.height = window.innerHeight/2;
                infoContext.lineWidth = 3;
                infoContext.font = "2.5vw Kremlin Pro Web";
                infoContext.fillStyle = 'white';
                const text ="Yllä näet linjojen värit ja esimerkin haun tuloksesta,"
                const text2 = "lähtöpisteenä A ja päätepisteenä R."
                const text3 = "Haun tulokset tulevat näkyviin eriteltynä listana,"
                const text4 = "jossa jokaista etappia voi tarkastella erikseen"
                infoContext.beginPath();
                infoContext.moveTo(0,0)
                infoContext.fillText(text, 10, 50,infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.moveTo(10,infoCanvas.width-50)
                infoContext.fillText(text2,10, 85, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
                infoContext.fillText(text3,10, 125, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
                infoContext.fillText(text4,10, 160, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
            
                drawOk(infoContext,infoCanvas)
        }
         

    }
    
}
function drawStar(cx,cy,outerRadius,innerRadius,ctx,color){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var spikes = 5;
    var step=Math.PI/spikes;

    ctx.beginPath();
    ctx.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y)
      rot+=step
    }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=3;
    ctx.strokeStyle=color;
    ctx.stroke();
   // ctx.fillStyle='skyblue';
    //ctx.fill();
  }

function drawOk(infoContext,infoCanvas){
    var yPos = window.innerWidth > 600 ? infoCanvas.height-150: infoCanvas.height-100;
    var xPos =  infoCanvas.width/2-37 
    var okYPos = 33
    var okXPos = 15
    var rect = {
        x:xPos,
        y:yPos,
        width:75,
        heigth:50
    };
    
    document.addEventListener('click', followClick = function(evt) {
        var mousePos = getMousePos(infoCanvas, evt);
        if (isInside(mousePos,rect)) {
            closeNav()
        }	
    }, false);
 
    infoContext.beginPath();
    infoContext.rect(xPos, yPos, 75, 50); 
    infoContext.fillStyle = '#FFFFFF'; 
    infoContext.fillStyle = 'rgba(225,225,225,0.5)';
    infoContext.fillRect(xPos,yPos,75,50);
    infoContext.fill(); 
    infoContext.lineWidth = 2;
    infoContext.strokeStyle = '#000000'; 
    infoContext.stroke();
    infoContext.closePath();
    infoContext.font = '20pt Kremlin Pro Web';
    infoContext.fillStyle = '#000000';
    infoContext.fillText('OK!', xPos+okXPos, yPos+okYPos);
}

//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	    return {
		    x: event.clientX - rect.left,
		    y: event.clientY - rect.top
	    };
}
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y;
}
/*function closeeNav() {
    closedNav = true;
    document.body.style.overflow = "auto";
    document.getElementById("mySidenav").style.width = "0";
    document.removeEventListener("click",followClick)
}
function hide(){
  if(window.innerWidth < 600){
      document.querySelector(".active").classList.remove("active")
  setTimeout(function () {
     document.querySelector(".page").classList.add("active")
      },5000);
      
          }
       
     
  }*/