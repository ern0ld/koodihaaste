var startPoint;
const parents = {};
const weight = {};
const storage = new Storage();
const allowed = /[A-Ra-r]/
var calculated = false;
var closedNav = true;
var height= window.innerHeight;
var width = window.innerWidth;
var animator;
var reittiDiv = document.getElementById("reittihaku")
const linjastot = storage.getLines();
const points = storage.getPoints();
var laskeBtn = document.getElementById("calculateBtn")
laskeBtn.addEventListener("click", calculate)
var guideList = document.getElementById("guidelist")
var infoDiv = document.getElementById("infoDiv")
const graphics= new Graphics()
var showMapBtn = document.getElementById("showMap")
var infoDivResultHeader= document.getElementById("infoDivResultHeader")
const plainMap = new Graphics().drawPlainMap();

function init(){
   
}

async function calculate(){
    const graph = storage.getGraph()
    const parents = {};
    const weight = {};
    var visited = []
    startPoint = document.getElementById("startPoint").value.toUpperCase()
    let endPoint = document.getElementById("endPoint").value.toUpperCase()
    let tulos = document.getElementById("tulos")

        if(document.getElementById("routeInfoDiv") !==null){
            let remove = document.getElementById("routeInfoDiv")
            remove.parentNode.removeChild(remove)
            let removeMobi = document.getElementById("mobiInfoDiv")
            removeMobi.parentNode.removeChild(removeMobi)
            
           }

        if(!allowed.test(startPoint) || startPoint.length >1 || !allowed.test(endPoint) || endPoint.length>1){
            alert("Varmista, että lähtö- ja päätepiste ovat kirjaimia väliltä A-R")
            return -1
        }
         if(startPoint === endPoint && startPoint.length > 0){
            alert('Mies astui Globenin edestä taksiin ja sanoi kuskille:\n-Viekää minut Globeniin\n-Olemme siellä, kuski ihmetteli\n Mies kaivoi taskustaan sadan kruunun setelin, antoi sen kuskille ja sanoi:\n-Kiitos, pitäkäkää loput. Mutta älkää ajako ensi kerralla näin kovaa.')
           // tulos.innerHTML = "Kävellen olisit jo perillä"
           return -1
        }
      
        else{
            visited.push("start",startPoint)
            var keysToAdd = Object.keys(graph[startPoint])
        
            for(let i = 0; i<keysToAdd.length; i++){
                graph["start"][keysToAdd[i]] = graph[startPoint][keysToAdd[i]]
        }
        graph[endPoint]["finish"] = 0
        parents[startPoint] = "start"
        parents["finish"] = null
        weight["finish"] =Infinity;
        graph["finish"][endPoint] = 1

        //dijkstran algoritmi laskee nopeimman reitin graafin painotusten perusteella
        var calc = dijkstra(graph,weight,parents)
        
        tulos.innerHTML = "Lyhimmän matkan kesto yhteensä " + calc["distance"] + " aikayksikköä"
        var result = calc["path"]
        var linjastoKeys = Object.keys(linjastot)
        var colorList = getColors(result,linjastoKeys)
        document.createElement("h3").innerHTML = "Reittiohjeet"
        var toReturn = [];
        var key = startPoint;
        result.shift()
        result.unshift(startPoint)
        result.pop()
       

          for(let i =0; i < result.length-1; i++){
              var ohje = document.createElement("h3")
               // ohje.innerHTML = "Valitse "+ colorList[i-1]+" linja ja matkusta kohteeseen " + result[i]
                let time = graph[result[i]][result[i+1]];
                var str = "Valitse "+ colorList[i]+" linja ja matkusta kohteesta "+ key + " kohteeseen " + result[i+1] +". " + "Matkan kesto " + time  + " aikayksikköä. "
                    toReturn.push(str)
                    key = result[i+1]
          }
          let tulosStr = tulos.innerHTML;
      createElements(toReturn,result,colorList,tulosStr)
         
        calculated = true;
        openNav();
    }
   

    }

    function createElements(toReturn,result,colorList,tulos){
        if(window.innerWidth > 600){
            guideList.hidden = true;
         }
         var resultText = document.createElement("h4")
         resultText.innerHTML = tulos
       
        
         resultText.style.textAlign = "center"
        
        // guideList.innerHTML =tulos.innerHTML;
         let routeInfoDiv = document.createElement("div")
         routeInfoDiv.appendChild(resultText)
         routeInfoDiv.id = "routeInfoDiv"
         let mobiInfoDiv = document.createElement("div")
         mobiInfoDiv.id = "mobiInfoDiv"
         mobiInfoDiv.appendChild(resultText)

         let uList = document.createElement("ol")
        // uList.appendChild(tulos)
          for(let i = 0; i < toReturn.length; i++){
            var ohje = document.createElement("li")
            var button = document.createElement("button")
            button.innerHTML = "Näytä kartalla"
            button.onclick= function(){ if (document.getElementById("mySidenav").style.width==="0px" || document.getElementById("mySidenav").style.width === undefined){openNav()}animator(toReturn,colorList[i],points[result[i]]["width"],points[result[i]]["height"],points[result[i+1]]["width"],points[result[i+1]]["height"])}
            ohje.innerHTML = toReturn[i]
          
            ohje.appendChild(button)
            uList.appendChild(ohje) 
            uList.classList.add("mainList")
            //uList.appendChild(button)
           
            //guideList.appendChild(ohje)
            var listButton = document.createElement("button")
            listButton.className = "button"
            var listOhje = document.createElement('label')
            var listItem = document.createElement("li")
            
            listButton.innerHTML = "Näytä >>>"
          // listItem.style.paddingBottom = "10px"
            listButton.onclick= function(){ if (document.getElementById("mySidenav").style.width==="0px" || document.getElementById("mySidenav").style.width === undefined){openNav()}animator(toReturn,colorList[i],points[result[i]]["width"],points[result[i]]["height"],points[result[i+1]]["width"],points[result[i+1]]["height"])}
            listOhje.innerHTML = toReturn[i]
            listItem.appendChild(listOhje)
            listItem.appendChild(listButton)
            
            mobiInfoDiv.appendChild(listItem)

    
          }
          guideList.appendChild(mobiInfoDiv)
          guideList.classList.add("mobiList")
          animator = graphics.drawImage(result,startPoint,points,colorList,toReturn)

          routeInfoDiv.appendChild(uList)
       // infoDiv.appendChild(routeInfoDiv)
          reittiDiv.appendChild(routeInfoDiv)
    }
 
    function openNav() {
        closedNav= false;
        var size = window.innerWidth >600 ? window.innerWidth/2 : window.innerWidth;
        document.getElementById("mySidenav").style.width = size+"px"
     if(window.innerWidth < 600) { document.body.style.overflow = "hidden" }
      


        //document.getElementById("main").style.marginLeft = "250px";
        calculated ? (window.dispatchEvent(new Event('resize')),infoDiv.hidden =false, showMapBtn.innerHTML = "Näytä kartta"): (plainMap, infoDiv.hidden =true);
        window.addEventListener('resize', resizeSideNav, false);
        function resizeSideNav() {
            if(window.innerWidth > 600){
          
            //    ;
              //  document.getElementById("reittihaku").style.marginRight = window.innerWidth/2+"px";

            newSize = window.innerWidth/2;
            infoDiv.hidden = true;
            guideList.hidden = true
            console.log("klikattu ja täällä")
            reSizeLarge(newSize);
           
            }
            else{
                
                document.body.style.overflow = "hidden";
                
                if(width !== window.innerWidth){
              newSize = window.innerWidth;
                   guideList.hidden = false;
             infoDiv.hidden =false;
            reSizeSmall(newSize);
                }
                else{
                return -1;
            }}
        }
        function reSizeLarge(newSize){
            if(!closedNav){
        document.getElementById("mySidenav").style.width = newSize+"px"
       // reittiDiv.style.marginRight = newSize+50+"px"
    }
        
        else{
            document.body.style.overflow = "auto"
        }

        }
        
        function reSizeSmall(newSize){
            if(!closedNav){
        document.getElementById("mySidenav").style.width = newSize+"px"
    }
    else{
        document.body.style.overflow = "auto"

    }

      

        }


      };
     
      function closeNav() {
         
        if(window.event.srcElement.id === "nappula" || window.event.srcElement.id === "karttaDiv" || window.event.srcElement.id === "infoCanvas"){
            closedNav = true;
            document.body.style.overflow = "auto";
           document.getElementById("mySidenav").style.width = "0";
           reittiDiv.classList.add("released")
          // document.getElementById("main").style.marginLeft= "0";
         }}
       function hide(){
           if(window.innerWidth < 600){
               document.querySelector(".active").classList.remove("active")
      
               
              document.querySelector(".page").classList.add("active")
         
              
               
                   }
                
              
           
            
        
else{
    return -1
}
}
    function getColors(result,linjastoKeys){
        var list= [];
        for(let i = 0; i<result.length-1; i++){
            if(i === 0){

                for(let k = 0; k < linjastoKeys.length; k++) {if(linjastot[linjastoKeys[k]].includes(startPoint) && linjastot[linjastoKeys[k]].includes(result[i+1])){ list.push(linjastoKeys[k])
                    break;}} 
           }
           else{ for(let j= 0; j < linjastoKeys.length; j++){
            
            if(linjastot[linjastoKeys[j]].includes(result[i-1]) && linjastot[linjastoKeys[j]].includes(result[i])){ 
                if(linjastot[list[list.length-1]].includes(result[i-1]) && linjastot[list[list.length-1]].includes(result[i])){
                    list.push(list[list.length-1])
                    break
                }
                else{
                    list.push(linjastoKeys[j]) 
                    break;} }}
               
        }
            }
            return list;
    }




    const findLowestWeightNode = (weights, processed) => {
        const knownNodes = Object.keys(weights)
        
        const lowestWeightNode = knownNodes.reduce((lowest, node) => {
        if (lowest === null && !processed.includes(node)) {
         lowest = node;
         }
       if (weights[node] < weights[lowest] && !processed.includes(node)) {    
       lowest = node;
        }
       return lowest;
       }, null);
       
      return lowestWeightNode
     };
//Dijkstran algoritmi hoitaa raskaan työn
     const dijkstra = (graph) => {
   
        // track lowest cost to reach each node  
        const weights = Object.assign({finish: Infinity}, graph.start); 
        var lengthTest = [];
          
        // track paths  
        const parents = {finish: null};  
        for (let child in graph.start) {    
          parents[child] = 'start';  
         }
           
        // track nodes that have already been processed  
        const processed = [];
        //Next, we’ll set the initial value of the node being processed //using the lowestCostNode function. Then, we’ll begin a while loop, //which will continuously look for the cheapest node.
        let node = findLowestWeightNode(weights, processed);
           
        while (node) {
        //Get the weight of the current node
        let weight = weights[node];
        //Get all the neighbors of current node
        let children = graph[node]; 
        //Loop through each of the children, and calculate the weight to reach that child node. We'll update the weight of that node in the weights object if it is lowest or the ONLY weight available
        for (let n in children) {   
            let newWeight = weight + children[n];     
             if (!weights[n] || weights[n] > newWeight) { 
              weights[n] = newWeight; 
              parents[n] = node;
                }
             }
         //push processed data into its data structure
         processed.push(node);
         // repeat until we processed all of our nodes.    
         node = findLowestWeightNode(weights, processed);
        
        }
        let optimalPath = ['finish'];
let parent = parents.finish;
while (parent) {
    optimalPath.unshift(parent);
    parent = parents[parent]; // add parent to start of path array
  }
  
  const results = {
    distance: weights.finish,
    path: optimalPath
  };
 
  return results;

};


function getKesto(start,end){
   var check = tiet.filter((e1 => { if(e1["mista"] === start && e1["mihin"] === end || e1["mihin"] === start && e1["mista"] === end) return e1["kesto"]} ))
return check
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("kutsutaan")
    new Graphics().drawPlainMap();
    openNav();
    infoDiv.hidden =true
});