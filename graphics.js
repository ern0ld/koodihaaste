//Käsitellään grafiikkapuolta.
class Graphics
{      

    constructor(){
    }

//Piirtää kartan laskettujen reittiohjeiden perusteella
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
    
           // Piirretään kartta ja seurataan ikkunan koon muutoksia
           function initialize() {
             
               window.addEventListener('resize', resizeCanvas, false);
               
               resizeCanvas();
            }
    
           //Piirtää kartan, tätä kutsutaan resizeCanvas-funktiosta, mikäli ikkunan kokoa muutetaan
            function redraw() {
                var imgWidth = parseInt(document.getElementById("mySidenav").style.width)
                //Piirretään kartta canvakselle
                ctx.drawImage(img, 0, 0, imgWidth, img.height);
                ctx.lineWidth = 3;
                //Lisätään ympyröidyt reittiohjeet canvakselle määritettyjen pisteiden perusteella (löytyvät storage.js-tiedostosta)
                for(let i = 0; i < result.length; i++){
                    if(i !== result.length-1){
                        ctx.beginPath();
                        ctx.strokeStyle = colors[colorList[i]];
                        ctx.arc((htmlCanvas.width*points[result[i]]["width"])*2, htmlCanvas.height*points[result[i]]["height"]*2, 20, 0, 2 * Math.PI, false);
                        ctx.closePath();
                        ctx.stroke();
                    }
                       
                }
                //Lisätään numerointi ja päätepiste canvakselle
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
             //Samat toiminnot kuin ylempänä reDraw-funktiossa, mutta hieman erilaisilla arvoilla ikkunan koon vuoksi
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
    
            // Kutsutaan joka kerta kun ikkunan koko muuttuu
            // Asettaa uuden koon canvakselle ja piirtää kartan ja ohjeet uudestaan niiden perusteella
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
            //Reittiohjeiden animointi kun käyttäjä painaa näytä-nappulaa
          async function animate (guides,color,startX,startY,width,height){
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
            //Viivästetään animointia hetki ja kutsutaan sen jälkeen resizeCanvas-funktiota, jolloin canvaksen sisältö piirretään uudestaan
            //ja animointi häviää
            const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
                setTimeout(() => {
                    cb();
                    resolve();
                }, timeout);
            });
             const redraw = async() => {
                  await setAsyncTimeout(() =>{
               resizeCanvas();
            },4000);
            await setAsyncTimeout(() => {
               
            }, 4000);
        }
        redraw();
      
    }
           

            //Funktio reittiohjeen nuolen piirtämiseksi
            function canvas_arrow(context, fromx, fromy, tox, toy) {
                var headlen = 20; 
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
   
//Piirtää ohjekartan ennen kuin hakuja on suoritettu, toimii samalla periaatteella kuin ylemmät
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
    
           //piirretään kartta
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
               //piirretään suuren näytön ohje
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
                 //piirretään peienen näytön ohje
                    showSmallInfo();
             }
                
            }
                
        }
         //Näytetään ohjeet käyttäjälle piirtämällä ne alemmalle canvakselle
        function showSmallInfo(){
                let infoCanvas = document.getElementById("infoCanvas");
                var infoContext = infoCanvas.getContext("2d");
                infoContext.drawImage(img,0,0,img.width,img.height);
                infoCanvas.width = window.innerWidth;
                infoCanvas.height = window.innerHeight;
                drawOk(infoContext,infoCanvas);
                infoContext.lineWidth = 3;
                
                infoContext.fillStyle = "#b6b6b6";
                const welcome ="Tervetuloa reittihakuun"
                const text2="Yllä näet esimerkin haun tuloksesta kartalla,"
                const text3 ="lähtöpisteenä H ja päätepisteenä Q."
                const text4 = "Haun tulokset tulevat näkyviin eriteltynä listana, "
                const text5 = "jossa jokaista etappia voi tarkastella erikseen."
                infoContext.beginPath();
                var yPosition = window.innerHeight/2;
                infoContext.moveTo(10,400)
                infoContext.font = "7vw Kremlin Pro Web";
                infoContext.fillText(welcome, infoCanvas.width/6, yPosition+50,infoCanvas.width-20, 0, 2 * Math.PI, false);
                infoContext.font = "5vw Kremlin Pro Web";
                infoContext.fillText(text2, 20, yPosition+100,infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.fillText(text3, 20, yPosition+130,infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
                infoContext.moveTo(10,yPosition+160)
                infoContext.fillText(text4, 20, yPosition+180,infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.fillText(text5,20,yPosition+210, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
                 
        }
        
        function showInfo(){
                var infoCanvas = document.getElementById("infoCanvas");
                var infoContext = infoCanvas.getContext("2d");
                infoContext.drawImage(img, 0 , 0, img.width, img.height);
                infoCanvas.width = window.innerWidth/2;
                infoCanvas.height = window.innerHeight/2;
                infoContext.lineWidth = 3;
               // infoContext.font = "2vw Kremlin Pro Web";
                infoContext.fillStyle = "#b6b6b6";
                const welcome = "Tervetuloa Reittihakuun"
                const text ="Yllä näet linjojen värit ja esimerkin haun tuloksesta ympyröityinä etappeina,"
                const text2 = "lähtöpisteenä H ja päätepisteenä Q."
                const text3 = "Haun tulokset tulevat näkyviin eriteltynä listana, jossa jokaista etappia voi"
                const text4 = "tarkastella erikseen painamalla listan Näytä-näppäintä."
                infoContext.beginPath();
                infoContext.moveTo(0,0)
                infoContext.font = "2vw Kremlin Pro Web";
                infoContext.fillText(welcome, infoCanvas.width/3.5, 30,infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.font = "1.5vw Kremlin Pro Web";
                infoContext.fillText(text, 20, 70,infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.moveTo(10,infoCanvas.width-50)
                infoContext.fillText(text2,20, 100, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
                infoContext.fillText(text3,20, 140, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
                infoContext.fillText(text4,20, 170, infoCanvas.width-30, 0, 2 * Math.PI, false);
                infoContext.stroke();
            
                drawOk(infoContext,infoCanvas)
        }
         

    }
    
}
//funktio päätepisteen tähden piirtämiseksi
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
  
  }
//Funktio jolla kirjoitetaan OK tai Sulje canvakselle riippuen näytön koosta
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
    //Seurataan käyttäjän toimintaa, mikäli canvasta painetaan oikeasta kohdasta, eli missä Sulje/OK-nappula sijaitsee, suljetaan sivupalkki
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
    window.innerWidth > 600 ?  infoContext.fillText('Sulje', xPos+10, yPos+okYPos) : infoContext.fillText('OK!', xPos+okXPos, yPos+okYPos);
    
}

//Seurataan käyttäjän hiiren tai napautuksen sijaintia
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
}
//Tarkastaa onko käyttäjä painanut Sulje/OK-nappulaa, eli mihin kohtaan canvasta käyttäjä painoi
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y;
}
