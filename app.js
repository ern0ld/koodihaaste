var startPoint;
    var pysakit = [ "A","B",  "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"]
    var tiet = [ { "mista": "A", "mihin": "B", "kesto": 3 },{ "mista": "B","mihin": "D","kesto": 2},{ "mista": "D", "mihin": "A", "kesto": 1},
    {"mista": "A", "mihin": "C", "kesto": 1},{ "mista": "C","mihin": "D", "kesto": 5},{ "mista": "C", "mihin": "E", "kesto": 2},
    {"mista": "E", "mihin": "D", "kesto": 3 }, { "mista": "E","mihin": "F", "kesto": 1},{ "mista": "F", "mihin": "G", "kesto": 1},
     {"mista": "G", "mihin": "H", "kesto": 2},{ "mista": "H", "mihin": "I", "kesto": 2},{ "mista": "I", "mihin": "J", "kesto": 1},
     {"mista": "I", "mihin": "G", "kesto": 1}, {"mista": "G","mihin": "K","kesto": 8},{ "mista": "K","mihin": "L", "kesto": 1},
    {"mista": "L","mihin": "M","kesto": 1},{ "mista": "E","mihin": "M", "kesto": 10},{ "mista": "M","mihin": "N","kesto": 2 },
    {"mista": "N", "mihin": "O", "kesto": 2},{"mista": "O", "mihin": "P","kesto": 2},{"mista": "O","mihin": "Q","kesto": 1},
    { "mista": "P","mihin": "Q", "kesto": 2},{"mista": "N","mihin": "Q","kesto": 1},{"mista": "Q","mihin": "R","kesto": 5},
    {"mista": "R", "mihin": "N", "kesto": 3},{"mista": "D", "mihin": "R","kesto": 6 }]
var linjastot =  { "keltainen": ["E", "F", "G", "K", "L", "M", "N"],
      "punainen": ["C", "D", "R", "Q", "N", "O", "P"],
      "vihrea": ["D", "B", "A", "C", "E", "F", "G", "H", "I", "J"],
      "sininen": ["D", "E", "M", "N", "O"]
    }

    const graph = {"start":{},
        "A" : {"B": 3, "C": 1, "D" : 1},
    "B":{"A" : 3, "D" : 2},
"C" :{"A": 1, "D": 5, "E" : 2},
"D": {"B" : 2, "A": 1, "C" : 5, "E" :3, "R": 6},
"E": {"C": 2, "D" : 3, "F": 1, "M":10},
"F": {"E": 1, "G": 1},
"G": {"F": 1, "H":2, "I": 1, "K": 8},
"H": {"G":2, "I": 2},
"I" : {"H": 2, "J": 1, "G": 1},
"K": {"G": 8, "L": 1},
"L": {"K": 1, "M" : 1},
"M": {"L":1, "E": 10, "N": 2},
"N": {"M": 2, "O":2, "Q":1, "R":3},
"O": {"N":2, "P": 2, "Q":1},
"P": {"O": 2, "Q": 2},
"Q": {"O": 1, "P": 2, "N": 1, "R":5},
"R": {"Q": 5, "N":3, "D": 6},
"finish": {}}
const parents = { };
  const weight = {};

    var allowed = /[A-Ra-r]/
    var visited = []

    var laskeBtn = document.getElementById("laskeReittiBtn")
    laskeBtn.addEventListener("click", calculate)
    
    function setStartPoint(startPoint){
        this.startPoint = startPoint;
    }
    function getStartPoint(){
        return this.startPoint
    }

    function calculate(){
        const graph = {"start":{},
        "A" : {"B": 3, "C": 1, "D" : 1},
    "B":{"A" : 3, "D" : 2},
"C" :{"A": 1, "D": 5, "E" : 2},
"D": {"B" : 2, "A": 1, "C" : 2, "E" :3, "R": 6},
"E": {"C": 2, "D" : 3, "F": 1, "M":10},
"F": {"E": 1, "G": 1},
"G": {"F": 1, "H":2, "I": 1, "K": 8},
"H": {"G":2, "I": 2},
"I" : {"H": 2, "J": 1, "G": 1},
"J" : {"I" :1 },
"K": {"G": 8, "L": 1},
"L": {"K": 1, "M" : 1},
"M": {"L":1, "E": 10, "N": 2},
"N": {"M": 2, "O":2, "Q":1, "R":3},
"O": {"N":2, "P": 2, "Q":1},
"P": {"O": 2, "Q": 2},
"Q": {"O": 1, "P": 2, "N": 1, "R":5},
"R": {"Q": 5, "N":3, "D": 6},
"finish": {}}
const parents = { };
  const weight = {};

    var allowed = /[A-Ra-r]/
    var visited = []
        startPoint = document.getElementById("startPoint").value
        setStartPoint(startPoint)
        let endPoint = document.getElementById("endPoint").value
        let tulos = document.getElementById("tulos")
        var check;
        

        if(!allowed.test(startPoint) || !allowed.test(endPoint)){
            document.getElementById("invalidInput").hidden = false;
        }
      
        else{
            document.getElementById("invalidInput").hidden = true;
            tiet.filter(e1 => { if(e1["mista"] === startPoint||e1["mihin"] === startPoint)console.log(e1)})
           check = getKesto(startPoint,endPoint)
          
        
     if(check.length > 0){
         tulos.innerHTML = "Lyhimmän matkan kesto " + check[0]["kesto"] + " aikayksikköä"
        }
        else{
            visited.push("start",startPoint)
            var keysToAdd = Object.keys(graph[startPoint])
        
            
        for(let i = 0; i<keysToAdd.length; i++){
            //weight[keysToAdd[i]] = graph[startPoint][keysToAdd[i]]
            //visited.push(keysToAdd[i])
            graph["start"][keysToAdd[i]] = graph[startPoint][keysToAdd[i]]
        }
        graph[endPoint]["finish"] = 0
        parents[startPoint] = "start"
        parents["finish"] = null
        weight["finish"] =Infinity;
        graph["finish"][endPoint] = 1
      var test = dijkstra(graph,weight,parents)

          tulos.innerHTML = "Lyhimmän matkan kesto " + test["distance"] + " aikayksikköä"
          var result = test["path"]
          var linjastoKeys = Object.keys(linjastot)
          document.createElement("h3").innerHTML = "Reittiohjeet"
          console.log(linjastot["keltainen"])
        var list= [];
            for(let i = 1; i<result.length-1; i++){
                if(i === 1){
                    linjastoKeys.forEach((e1) => {if(linjastot[e1].includes(startPoint) && linjastot[e1].includes(result[i])) list.push(e1)} )
                }
                else{
            
                        linjastoKeys.forEach((e1) => {if(linjastot[e1].includes(result[i-1]) && linjastot[e1].includes(result[i])) list.push(e1)} )
                    }
                }
            

                    var reittiDiv = document.getElementById("reittihaku")
          for(let i =1; i < result.length-1; i++){
              var ohje = document.createElement("h3")
                ohje.innerHTML = "Valitse "+ list[i-1]+" linja ja matkusta kohteeseen " + result[i]
                reittiDiv.appendChild(ohje)
          }
 
        }
    }
    
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

     const dijkstra = (graph) => {
   
        // track lowest cost to reach each node  
        const weights = Object.assign({finish: Infinity}, graph.start); 
          
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


  function notStraight(){
    switch (getStartPoint()) {
        
        case "A":
        
        break;
        case "B":
        
        break;
        
        
        case "C":

        break;
           
        case "D":

        break;
             
        case "E":

        break;
               
        case "F":

        break;
                 
        case "G":
    
        break;
                   
        case "H":
    
        break;
                     
        case "I":
     
        break;
                       
        case "J":

        break;
                         
        case "K":
                   
        break;
                           
        case "L":
                   
        break;

        case "M":

        break;
        case "N":
        
        break;
          
        case "O":
      
        break;
           
        case "P":
      
        break;
             
        case "Q":
      
        break;
               
        case "R":
      
        break;
        
        default:
        console.log("moi")
      }}