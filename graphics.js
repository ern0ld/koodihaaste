
class Graphics
{      

    constructor(){
    }


    drawImage(result,startPoint,points,colorList,guides){
       let colors = {"vihrea" : "#22b14c", "keltainen" : "yellow", "sininen" : "blue", "punainen" : "red"}
        var img = new Image(640,480)
        img.onload = initialize;
        img.src = "varikartta.png"
        
          
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
                ctx.beginPath();
                ctx.strokeStyle = colors[colorList[0]];
               
           ctx.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"]*2, 20, 0, 2 * Math.PI, false);
           ctx.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"]*2)
           ctx.stroke();
ctx.closePath();
     for(let i = 1; i < result.length; i++){
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
               
                
              /*  ctx.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"], 20, 0, 2 * Math.PI, false);
                ctx.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"])
                ctx.stroke();
         for(let i = 1; i < result.length; i++){
            
            ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"], 20, 0, 2 * Math.PI, false);
            if(result[i+1] !== undefined){
                ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"])
    
            }
            ctx.stroke();
        }*/
        
                
                // To use the custom size we'll have to specify the scale parameters 
                // using the element's width and height properties - lets draw one 
                // on top in the corner:
           
                ctx.drawImage(img,0 , 0, img.width, img.height);
               
                
        
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#00ff00';
                ctx.stroke();
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
        }, 2000);
        
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
        img.src = "varikartta.png"
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
                drawCircles()}
                }
                else{
                    infoMapCanvas.width = window.innerWidth;
                infoMapCanvas.height = window.innerHeight/2;
                img.width = window.innerWidth
                img.height = window.innerHeight/2
                redrawSmall();
                if(infotime){
                    showSmallInfo();
                    drawCircles()}
                    }
                
            }
            function showSmallInfo(){
                
                let infoCanvas = document.getElementById("infoCanvas");
           
                var infoContext = infoCanvas.getContext("2d");
                
                infoCanvas.width = window.innerWidth;
               infoCanvas.height = window.innerHeight;
    

var rect = {
	x:infoCanvas.width-90,
	y:infoCanvas.height-100,
	width:75,
	heigth:50
};

document.addEventListener('click', function(evt) {
	var mousePos = getMousePos(infoCanvas, evt);
	if (isInside(mousePos,rect)) {
		closeNav()
    }	
}, false);

infoContext.beginPath();
infoContext.rect(infoCanvas.width-90, infoCanvas.height-90, 75, 50); 
infoContext.fillStyle = '#FFFFFF'; 
infoContext.fillStyle = 'rgba(225,225,225,0.5)';
infoContext.fillRect(infoCanvas.width-90,infoCanvas.height-90,75,50);
infoContext.fill(); 
infoContext.lineWidth = 2;
infoContext.strokeStyle = '#000000'; 
infoContext.stroke();
infoContext.closePath();
infoContext.font = '20pt Kremlin Pro Web';
infoContext.fillStyle = '#000000';
infoContext.fillText('OK!', infoCanvas.width-75, infoCanvas.height-57);
               
        
     
                infoContext.lineWidth = 3;
                
                infoContext.font = "5vw Times New Roman";
                infoContext.fillStyle = 'white';
              
               var text ="Tervetuloa reittihakuun."
               var text2="Yllä näet esimerkin haun tuloksesta kartalla,"
               var text3 ="lähtöpisteenä A ja päätepisteenä R."
               var text4 = "Haun tulokset tulevat näkyviin eriteltynä listana, "
               var text5 = "joista jokaista etappia voi tarkastella erikseen"
          infoContext.beginPath();
                 infoContext.moveTo(10,400)
                 infoContext.fillText(text, 10, 400,infoCanvas.width-20, 0, 2 * Math.PI, false);
                 infoContext.fillText(text2, 10, 430,infoCanvas.width-20, 0, 2 * Math.PI, false);
                 infoContext.fillText(text3, 10, 460,infoCanvas.width-20, 0, 2 * Math.PI, false);
                 infoContext.fillText(text4, 10, 520,infoCanvas.width-20, 0, 2 * Math.PI, false);
                 infoContext.moveTo(0,0)
            
                 infoContext.stroke();
                 infoContext.fillText(text5,10,550, infoCanvas.width-20, 0, 2 * Math.PI, false);

                 infoContext.stroke();
                    drawCircles();

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
                
                //canvas_arrow(infoContext,htmlCanvas.width/2, 0,htmlCanvas.width/2-100,200);
           
                infoCanvas.width = window.innerWidth/2;
               infoCanvas.height = window.innerHeight/4;
                infoContext.lineWidth = 3;
                
                   infoContext.font = "2vw Times New Roman";
                   infoContext.fillStyle = 'white';
         
                  var text ="Tervetuloa reittihakuun. Yllä näet esimerkin haun tuloksesta kartalla. Lähtöpisteenä A ja päätepisteenä R."
                  var text2 = "Haun tulokset tulevat näkyviin eriteltynä listana, joista jokaista etappia voi tarkastella erikseen"
                  //  infoContext.textAlign = "center";
                  infoContext.beginPath();
                    infoContext.moveTo(0,0)
                    infoContext.fillText(text, 10, 50,infoCanvas.width-20, 0, 2 * Math.PI, false);
                    infoContext.moveTo(10,infoCanvas.width-100)
                   
                    infoContext.stroke();
                    infoContext.fillText(text2,10, 100, infoCanvas.width-20, 0, 2 * Math.PI, false);

                    infoContext.stroke();
                    drawCircles();

               // Context.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"], 20, 0, 2 * Math.PI, false);
                //context.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"])
                
                        setTimeout(function () {
                        // return the canvas to the state right after we show the arrow
                        infoContext.clearRect(0,0,infoCanvas.width,infoCanvas.height);
                        infotime = false;
                        resizeCanvas()  
                        
                        }, 10000);
            }
            function drawCircles(){
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
           
        return context;
    }
        

            function canvas_arrow(context, fromx, fromy, tox, toy) {
                var headlen = 30; // length of head in pixels
                var dx = tox - fromx;
                var dy = toy - fromy;
                var angle = Math.atan2(dy, dx);
                context.moveTo(fromx, fromy);
                context.lineTo(tox, toy);
                context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
                context.moveTo(tox, toy);
                context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
              }
            
    }
    
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
function closeNav() {
    closedNav = true;
    document.body.style.overflow = "auto";
  document.getElementById("mySidenav").style.width = "0";
  document.removeEventListener("click")
 // document.getElementById("main").style.marginLeft= "0";
}
function hide(){
  if(window.innerWidth < 600){
      document.querySelector(".active").classList.remove("active")
  setTimeout(function () {
      // return the canvas to the state right after we drew the blue rect
     document.querySelector(".page").classList.add("active")
      },5000);
      
          }
       
     
  }