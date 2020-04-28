
class Graphics
{      

    constructor(){
    }


    drawImage(result,startPoint,points,colorList,guides){
       let colors = {"vihrea" : "#22b14c", "keltainen" : "yellow", "sininen" : "blue", "punainen" : "red"}
        var img = new Image(640,480)
        img.onload = initialize;
        img.src = "karttaVariton.png"
        
          
            // Obtain a reference to the canvas element using its id.
            var htmlCanvas = document.getElementById("myCanvas");
            htmlCanvas.hidden=false;
            document.getElementById("infoMapCanvas").hidden = true;
            document.getElementById("infoCanvas").hidden = true;
            // Obtain a graphics context on the canvas element for drawing.
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
              /*  ctx.beginPath();
                ctx.strokeStyle = colors[colorList[0]];
               
           ctx.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"]*2, 20, 0, 2 * Math.PI, false);
           ctx.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"]*2)
           ctx.stroke();
ctx.closePath();*/
     for(let i = 0; i < result.length; i++){
         ctx.beginPath();
        ctx.strokeStyle = colors[colorList[i]];
        ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
        
        
        if(result[i+1] !== undefined){
            ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"]*2)

        }
       
        ctx.closePath();
        ctx.stroke();
    }
    
    ctx.beginPath();
            
            for(let i = 0; i < result.length; i++){
                ctx.font = "2vw Comic Sans MS";
               // ctx.fillStyle = colors[colorList[i]];
                ctx.textAlign = "center";
                var str = (i+1).toString();
                ctx.fillText(str,(htmlCanvas.width*points[result[i]]["width"])*2+30, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
                
                if(result[i+1] !== undefined){
                    ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+30, htmlCanvas.height*points[result[i+1]]["height"]*2)
        
                }
                
                ctx.stroke();
                
            }

            }
            function redrawSmall() {
                ctx.drawImage(img,0 , 0, img.width, img.height);
                ctx.lineWidth = 3;
              /*  ctx.beginPath();
                ctx.strokeStyle = colors[colorList[0]];
                
                ctx.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"], 20, 0, 2 * Math.PI, false);
                ctx.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"])
                ctx.stroke();
                ctx.closePath();*/
         for(let i = 0; i < result.length; i++){
             ctx.beginPath();
            ctx.strokeStyle = colors[colorList[i]];

            ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"], 20, 0, 2 * Math.PI, false);
            if(result[i+1] !== undefined){
                ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"])
    
            }
            ctx.closePath();
            ctx.stroke();
        }
        
                
                // To use the custom size we'll have to specify the scale parameters 
                // using the element's width and height properties - lets draw one 
                // on top in the corner:
           
               
               
                
        
                ctx.lineWidth = 3;
               /* ctx.strokeStyle = '#00ff00';
                ctx.stroke();*/
                for(let i = 0; i < result.length; i++){
                    ctx.font = "24px Comic Sans MS";
                  //  ctx.fillStyle = colors[colorList[i]];
                    ctx.textAlign = "center";
                    var str = (i+1).toString();
                    if(i === 0){
                        ctx.fillText("Lähtö",(htmlCanvas.width*points[result[i]]["width"])*2+25, htmlCanvas.height*points[result[i]]["height"], 40, 0, 2 * Math.PI, false);

                    }
                    else if(i === result.length-1){
                        ctx.fillText("Määränpää",(htmlCanvas.width*points[result[i]]["width"])*2+25, htmlCanvas.height*points[result[i]]["height"], 50, 0, 2 * Math.PI, false);

                    }
                    else{
                    ctx.fillText(str,(htmlCanvas.width*points[result[i]]["width"])*2+20, htmlCanvas.height*points[result[i]]["height"], 20, 0, 2 * Math.PI, false);
                    }
                    if(result[i+1] !== undefined){
                        ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"])
            
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
           var animate = function(guides,color,startX,startY,width,height){
           

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
    //ctx.strokeStyle = 'white';
   
            
    context.stroke();
    }else{
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
//ctx.strokeStyle = 'white';
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
        img.src = "ohjekarttapieni.png"
     
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
           /* function drawCircles(){
                var infoMapCanvas = document.getElementById("infoMapCanvas");
                
                var context = infoMapCanvas.getContext("2d"); 
                 
                var points =storage.getPoints();
                const result = ["A","D","R"];
                const colorList = ["vihrea", "punainen", "punainen"]
                const colors = storage.getColors();
            
            for(let i = 0; i < result.length; i++){
            context.beginPath();
            context.strokeStyle = colors[colorList[i]];
            context.arc((infoMapCanvas.width*points[result[i]]["width"])*2, infoMapCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
            
            
            if(result[i+1] !== undefined){
            context.moveTo(infoMapCanvas.width*points[result[i+1]]["width"]*2+20, infoMapCanvas.height*points[result[i+1]]["height"]*2)
            
            }
            
            context.closePath();
            context.stroke();
            }
            for(let i = 0; i < result.length; i++){
            context.font = "2vw Comic Sans MS";
            // ctx.fillStyle = colors[colorList[i]];
            context.textAlign = "center";
            var str = (i+1).toString();
            context.fillText(str,(infoMapCanvas.width*points[result[i]]["width"])*2+30, infoMapCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
            
            if(result[i+1] !== undefined){
            context.moveTo(infoMapCanvas.width*points[result[i+1]]["width"]*2+30, infoMapCanvas.height*points[result[i+1]]["height"]*2)
            
            }
            
            context.stroke();
            
            }
            }*/
            function showSmallInfo(){
                
                let infoCanvas = document.getElementById("infoCanvas");
           
                var infoContext = infoCanvas.getContext("2d");
                infoContext.drawImage(img,0,0,img.width,img.height)
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
                   // drawCircles();


                    //Function to get the mouse position



//The rectangle should have x,y,width,height properties


               // Context.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"], 20, 0, 2 * Math.PI, false);
                //context.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"])
                
                      /*  setTimeout(function () {
                        // return the canvas to the state right after we show the arrow
                        infoContext.clearRect(0,0,infoCanvas.width,infoCanvas.height);
                        infotime = false;
                        resizeCanvas()  
                        
                        }, 10000);*/
            }
            function showInfo(){
                
                var infoCanvas = document.getElementById("infoCanvas");
           
                var infoContext = infoCanvas.getContext("2d");
               infoContext.drawImage(img, 0 , 0, img.width, img.height);
                //canvas_arrow(infoContext,htmlCanvas.width/2, 0,htmlCanvas.width/2-100,200);
           
                infoCanvas.width = window.innerWidth/2;
               infoCanvas.height = window.innerHeight/2;
            
                infoContext.lineWidth = 3;
                
                   infoContext.font = "2.5vw Kremlin Pro Web";
                   infoContext.fillStyle = 'white';
         
                  const text ="Yllä näet linjojen värit ja esimerkin haun tuloksesta,"
                  const text2 = "lähtöpisteenä A ja päätepisteenä R."
                  const text3 = "Haun tulokset tulevat näkyviin eriteltynä listana,"
                  const text4 = "jossa jokaista etappia voi tarkastella erikseen"
                  //  infoContext.textAlign = "center";
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
               // Context.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"], 20, 0, 2 * Math.PI, false);
                //context.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"])
                
                       drawOk(infoContext,infoCanvas)
            }
           /* function drawCircles(){
                var infoMapCanvas = document.getElementById("infoMapCanvas");
                
                var context = infoMapCanvas.getContext("2d"); 
                 
                var points =storage.getPoints();
                const result = ["A","D","R"];
                const colorList = ["vihrea", "punainen", "punainen"]
                const colors = storage.getColors();
        
     /*for(let i = 0; i < result.length; i++){
         context.beginPath();
        context.strokeStyle = colors[colorList[i]];
        context.arc((infoMapCanvas.width*points[result[i]]["width"])*2, infoMapCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
        
        
        if(result[i+1] !== undefined){
            context.moveTo(infoMapCanvas.width*points[result[i+1]]["width"]*2+20, infoMapCanvas.height*points[result[i+1]]["height"]*2)

        }
       
        context.closePath();
        context.stroke();
    }*/
   /* for(let i = 0; i < result.length; i++){
        context.font = "2vw Comic Sans MS";
       // ctx.fillStyle = colors[colorList[i]];
        context.textAlign = "center";
        var str = (i+1).toString();
       context.fillText(str,(infoMapCanvas.width*points[result[i]]["width"])*2+30, infoMapCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
        
        if(result[i+1] !== undefined){
            context.moveTo(infoMapCanvas.width*points[result[i+1]]["width"]*2+30, infoMapCanvas.height*points[result[i+1]]["height"]*2)

        }
        
        context.stroke();
        
    }


    }*/
        

    }
    
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
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}
function closeeNav() {
    console.log("täällä")
    closedNav = true;
    document.body.style.overflow = "auto";
  document.getElementById("mySidenav").style.width = "0";
  document.removeEventListener("click",followClick)
 // document.getElementById("main").style.marginLeft= "0";
}
function hide(){
  if(window.innerWidth < 600){
      document.querySelector(".active").classList.remove("active")
  setTimeout(function () {
     document.querySelector(".page").classList.add("active")
      },5000);
      
          }
       
     
  }