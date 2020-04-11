var startPoint
const parents = { };
const weight = {};
var storage = new Storage();
var allowed = /[A-Ra-r]/
var calculated = false;
const height= window.innerHeight;
const width = window.innerWidth;
    
    var linjastot = storage.getLines();

    var points = storage.getPoints();
    var laskeBtn = document.getElementById("calculateBtn")
    laskeBtn.addEventListener("click", calculate)
    let guideList = document.getElementById("guidelist")

    var graphics= new Graphics()
    //var showMapBtn = document.getElementById("showMapBtn")
    //showMapBtn.onclick =graphics.drawPlainMap
    
    function calculate(){
       // showMapBtn.hidden = true;
    const graph = storage.getGraph()
    const parents = {};
    const weight = {};
    var visited = []
       startPoint = document.getElementById("startPoint").value.toUpperCase()
        let endPoint = document.getElementById("endPoint").value.toUpperCase()
        let tulos = document.getElementById("tulos")

       if(document.querySelector("h4") !==null) {
           document.querySelectorAll("button").forEach((btn) => {if(btn.className !== "constant") btn.parentNode.removeChild(btn)})
           document.querySelectorAll("h4").forEach((e1) => e1.parentNode.removeChild(e1))
           document.querySelectorAll("li").forEach((e1) => e1.parentNode.removeChild(e1)) }

        if(!allowed.test(startPoint) || startPoint.length >1 || !allowed.test(endPoint) || endPoint.length>1){
            alert("Varmista, että lähtö- ja päätepiste ovat kirjaimia väliltä A-R")
        }
        else if(startPoint === endPoint){
     alert('Ruotsalainen astui Globenin edestä taksiin ja sanoi kuskille:\n-Viekää minut Globeniin\n-Olemme siellä, kuski ihmetteli\n Ruotsalainen kaivoi taskustaan sadan kruunun setelin, antoi sen kuskille ja sanoi:\n-Kiitos, pitäkäkää loput. Mutta älkää ajako ensi kerralla näin kovaa.')
            tulos.innerHTML = "Kävellen olisit jo perillä"
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
       
        
        var reittiDiv = document.getElementById("reittihaku")
        var toReturn = [];
        var key = startPoint;
        result.shift()
        result.unshift(startPoint)
        result.pop()
        

          for(let i =0; i < result.length-1; i++){
              var ohje = document.createElement("h3")
               // ohje.innerHTML = "Valitse "+ colorList[i-1]+" linja ja matkusta kohteeseen " + result[i]
                let time = graph[result[i]][result[i+1]];
                var str = "Valitse "+ colorList[i]+" linja ja matkusta kohteesta "+ key + " kohteeseen " + result[i+1] +". Matkan kesto " + time  + " aikayksikköä. "
                    toReturn.push(str)
                    key = result[i+1]
          }
          
          
         if(window.innerWidth > 600){
            guideList.hidden = true;
         }
          
          for(let i = 0; i < toReturn.length; i++){
            var ohje = document.createElement("h4")
            var button = document.createElement("button")
            button.innerHTML = "Näytä kartalla"
            button.onclick= function(){ if (document.getElementById("mySidenav").style.width==="0px" || document.getElementById("mySidenav").style.width === undefined){openNav()}animator(toReturn,colorList[i],points[result[i]]["width"],points[result[i]]["height"],points[result[i+1]]["width"],points[result[i+1]]["height"])}
            ohje.innerHTML = toReturn[i]
            reittiDiv.appendChild(ohje)
            reittiDiv.appendChild(button)
            
            var listButton = document.createElement("button")
            var listOhje = document.createElement('label')
            var listItem = document.createElement("li")
        
            listButton.innerHTML = "Näytä kartalla"
           
            listButton.onclick= function(){ if (document.getElementById("mySidenav").style.width==="0px" || document.getElementById("mySidenav").style.width === undefined){openNav()}animator(toReturn,colorList[i],points[result[i]]["width"],points[result[i]]["height"],points[result[i+1]]["width"],points[result[i+1]]["height"])}
            listOhje.innerHTML = toReturn[i]
            listItem.appendChild(listOhje)
            listItem.appendChild(listButton)
            
            guideList.appendChild(listItem)
    
            
           


          }
          var animator = graphics.drawImage(result,startPoint,points,colorList,toReturn)
        calculated = true;

        openNav();
    }
  function drawResult(graphics,result,startPoint,points,colorList){
    
  }

  
    }
    function openNav() {
        
        var size = window.innerWidth >600 ? window.innerWidth/2 : window.innerWidth;
        document.getElementById("mySidenav").style.width = size+"px"
        //document.getElementById("main").style.marginLeft = "250px";
        calculated ? null: new Graphics().drawPlainMap();
        window.addEventListener('resize', resizeSideNav, false);
        function resizeSideNav() {
            if(window.innerWidth > 600){
            newSize = window.innerWidth/2;
            guideList.hidden = true;
            reSizeLarge(newSize);
            }
            else{
                if(width !== window.innerWidth){
              newSize = window.innerWidth;
              guideList.hidden =false;
            reSizeSmall(newSize);
                }
                else{
                return null;
            }}
        }
        function reSizeLarge(newSize){
        document.getElementById("mySidenav").style.width = newSize+"px"
        }
        function reSizeSmall(newSize){
        document.getElementById("mySidenav").style.width = newSize+"px"
        }

      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
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
    function drawPlainMap(){
        console.log("moi")
        
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
//Dijkstra’s algorithm
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

