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
          /* ctx.arc(htmlCanvas.width*points[startPoint]["width"]*2, htmlCanvas.height*points[startPoint]["height"]*2, 20, 0, 2 * Math.PI, false);
            ctx.moveTo(htmlCanvas.width*points[result[1]]["width"]*2+20, htmlCanvas.height*points[result[1]]["height"]*2)
            ctx.stroke();
     for(let i = 1; i < result.length; i++){
        

        ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
        
        if(result[i+1] !== undefined){
            ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"]*2)

        }
        
        ctx.stroke();
    }*/
        
    
            ctx.drawImage(img, 0, 0, imgWidth, img.height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#00ff00';
            ctx.stroke();
            for(let i = 0; i < result.length; i++){
                ctx.font = "30px Comic Sans MS";
                ctx.fillStyle = colors[colorList[i]];
                ctx.textAlign = "center";
                var str = (i+1).toString();
                ctx.fillText(str,(htmlCanvas.width*points[result[i]]["width"])*2+20, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
                
                if(result[i+1] !== undefined){
                    ctx.moveTo(htmlCanvas.width*points[result[i+1]]["width"]*2+20, htmlCanvas.height*points[result[i+1]]["height"]*2)
        
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
                    ctx.font = "30px Comic Sans MS";
                    ctx.fillStyle = colors[colorList[i]];
                    ctx.textAlign = "center";
                    var str = (i+1).toString();
                    ctx.fillText(str,(htmlCanvas.width*points[result[i]]["width"])*2+20, htmlCanvas.height*points[result[i]]["height"], 20, 0, 2 * Math.PI, false);

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
         
            return animate
       
    }
    drawPlainMap(){
        var img = new Image(640,480)
        img.onload = initialize;
        img.src = "varikartta.png"
        
            var htmlCanvas = document.getElementById("myCanvas");
            var ctx = htmlCanvas.getContext("2d");
    
           
           function initialize() {
               window.addEventListener('resize', resizeCanvas, false);
               window.addEventListener()
               resizeCanvas();
            }
    
           
            function redraw() {
    
            ctx.drawImage(img, 0, 0, img.width, img.height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#00ff00';
            ctx.stroke();
            }
            function redrawSmall() {
               
                ctx.drawImage(img, 0, 0, img.width, img.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#00ff00';
                ctx.stroke();
                }
    
            function resizeCanvas() {
                if(window.innerWidth > 600){
                htmlCanvas.width = window.innerWidth/2;
                htmlCanvas.height = window.innerHeight/2;
                img.width = window.innerWidth/2
                img.height = window.innerHeight/2
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
            
    }
    
}