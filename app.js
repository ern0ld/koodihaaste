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
//Toimintoja nopeimman reitin laskemiseksi ja reittiohjeiden näyttämiseksi käyttäjälle
async function calculate(){
    //Haetaan painotettu graafi
    const graph = storage.getGraph()
    const parents = {};
    const weight = {};
    var visited = []
    //Käyttäjän syöte, helpotetaan käyttäjää hyväksymällä sekä pienet että isot kirjaimet
    startPoint = document.getElementById("startPoint").value.toUpperCase()
    let endPoint = document.getElementById("endPoint").value.toUpperCase()
    let tulos = document.getElementById("tulos")
    //Mikäli haku on jo suoritettu, poistetaan vanhat reittiohjeet
    if(document.getElementById("routeInfoDiv") !==null){
        let remove = document.getElementById("routeInfoDiv")
        remove.parentNode.removeChild(remove)
        let removeMobi = document.getElementById("mobiInfoDiv")
        removeMobi.parentNode.removeChild(removeMobi)
            
    }
    //Tarkastetaan käyttäjän syöte
    if(!allowed.test(startPoint) || startPoint.length >1 || !allowed.test(endPoint) || endPoint.length>1){
        alert("Varmista, että lähtö- ja päätepiste ovat kirjaimia väliltä A-R")
        return -1
    }
    //Väännetään vähän vitsiä
    if(startPoint === endPoint && startPoint.length > 0){
        alert('Mies astui Globenin edestä taksiin ja sanoi kuskille:\n-Viekää minut Globeniin\n-Olemme siellä, kuski ihmetteli\n Mies kaivoi taskustaan sadan kruunun setelin, antoi sen kuskille ja sanoi:\n-Kiitos, pitäkäkää loput. Mutta älkää ajako ensi kerralla näin kovaa.')
        return -1
    }
    //Mikäli syöte hyväksytään, siirrytään itse reitin laskemiseen
    else{
        //lisätään visited listaan tunniste "start" ja käyttäjän syöttämä lähtöpiste
        visited.push("start",startPoint)
        //Haetaan painotetusta painotetusta graafista lähtöpisteen kanssa suorassa yhteydessä olevat pisteet
        var keysToAdd = Object.keys(graph[startPoint])
        //Lisätään painotettuun graafiin ylempänä haetut pisteet
        for(let i = 0; i<keysToAdd.length; i++){
                graph["start"][keysToAdd[i]] = graph[startPoint][keysToAdd[i]]
        }
        //Asetetaan päätepiste avaimeksi painotettuun graafiin ja sille avain finish, jonka valueksi tulle nolla, 
        //koska matkan kesto ei enää lisäänny kun päätepiste on saavutettu
        graph[endPoint]["finish"] = 0
        //asetetaan parents objektin keyksi lähtöpiste ja sen valueksi "start"
        parents[startPoint] = "start"
        parents["finish"] = null
        weight["finish"] =Infinity;
        graph["finish"][endPoint] = 1

        //dijkstran algoritmi laskee nopeimman reitin graafin painotusten perusteella
        var calc = dijkstra(graph,weight,parents)
        //Otetaan lasketusta tuloksesta length, eli tässä tapauksessa matkan kesto
        tulos.innerHTML = "Lyhimmän matkan kesto yhteensä " + calc["length"] + " aikayksikköä"
        //Otetaan lasketusta tuloksesta path, eli reitti, jota pitkin päästään nopeiten perille
        const result = calc["path"]
        //Linjastojen värit
        const linjastoKeys = Object.keys(linjastot)
        //getColors palauttaa listan, joka sisältää reitissä käytettävien linjojen värit
        var colorList = getColors(result,linjastoKeys)
        document.createElement("h3").innerHTML = "Reittiohjeet"
        var toReturn = [];
        var key = startPoint;
        //Poistetaan lasketusta reitistä ylimääräiset start ja finish elementit
        result.shift()
        result.unshift(startPoint)
        result.pop()
       
        //Lisätään reittiohjeet listaan lasketun reitin perusteella
        for(let i =0; i < result.length-1; i++){
               // var ohje = document.createElement("h3")
               // ohje.innerHTML = "Valitse "+ colorList[i-1]+" linja ja matkusta kohteeseen " + result[i]
               //Haetaan kulloisenkin etapin kesto graafista 
                let time = graph[result[i]][result[i+1]];
                var str = "Valitse "+ colorList[i]+" linja ja matkusta kohteesta "+ key + " kohteeseen " + result[i+1] +". " + "Matkan kesto " + time  + " aikayksikköä. "
                    toReturn.push(str)
                    key = result[i+1]
          }
        let tulosStr = tulos.innerHTML;
        //Luo käyttäjälle näkyvät reittiohjeet sivulle
        createElements(toReturn,result,colorList,tulosStr)
        //Asetetaan calculated arvoksi tosi, jotta graafiikkapuoli hoituu paremmin
        calculated = true;
        //Avataan kartta
        openNav();
    }
   

}
//Luo käyttäjälle näkyvät reittiohjeet sivulle
function createElements(toReturn,result,colorList,tulos){
    if(window.innerWidth > 600){
            guideList.hidden = true;
    }
    var resultText = document.createElement("h4")
    var routeInfoDiv = document.createElement("div")
    var mobiInfoDiv = document.createElement("div")
    var uList = document.createElement("ol")
    resultText.innerHTML = tulos
    resultText.style.textAlign = "center"
    routeInfoDiv.appendChild(resultText)
    routeInfoDiv.id = "routeInfoDiv"
    mobiInfoDiv.id = "mobiInfoDiv"
    mobiInfoDiv.appendChild(resultText)
   
        for(let i = 0; i < toReturn.length; i++){
            var ohje = document.createElement("li")
            var button = document.createElement("button")
            var listButton = document.createElement("button")
            var listOhje = document.createElement('label')
            var listItem = document.createElement("li")
            button.innerHTML = "Näytä kartalla"
            button.onclick= function(){ if (document.getElementById("mySidenav").style.width==="0px" || document.getElementById("mySidenav").style.width === undefined){openNav()}animator(toReturn,colorList[i],points[result[i]]["width"],points[result[i]]["height"],points[result[i+1]]["width"],points[result[i+1]]["height"])}
            ohje.innerHTML = toReturn[i]
            ohje.appendChild(button)
            uList.appendChild(ohje) 
            uList.classList.add("mainList")
            listButton.className = "button"
            listButton.innerHTML = "Näytä >>>"
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
        reittiDiv.appendChild(routeInfoDiv)
    }
 //Avaa kartan
function openNav() {
    closedNav= false;
    //Karttapaneelin koko. Mikäli ikkunan leveys on yli 600 pikseliä, jaetaan ikkunan leveys kahdella
    var size = window.innerWidth >600 ? window.innerWidth/2 : window.innerWidth;
    //Asetetaan sivupalkin kooksi ylempänä määritetty koko
    document.getElementById("mySidenav").style.width = size+"px"

    if(window.innerWidth < 600) { 
        document.body.style.overflow = "hidden" 
    }
    //Mikäli laskenta on jo suoritettu, näytetään reittiohjeet, muussa tapauksessa näytetään sivuston ohje
    calculated ? (window.dispatchEvent(new Event('resize')),infoDiv.hidden =false, showMapBtn.innerHTML = "Näytä kartta"): (plainMap, infoDiv.hidden =true);
    //Lisätään ikkunalle kuuntelija, joka reagoi näytön koon muuttamiseen
    window.addEventListener('resize', resizeSideNav, false);
    //Mikäli näytön koko muutetaan, lasketaan uudet arvot sivupalkille
    function resizeSideNav() {
        if(window.innerWidth > 600){
            newSize = window.innerWidth/2;
            infoDiv.hidden = true;
            guideList.hidden = true
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
            }
        }
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


}
//Sulkee sivupalkin
function closeNav() {
    //Jostain syystä sivustolle jäi kummittelemaan haamunappula, joka sulki sivupalkin pelkästään tietyn divin klikkaamisen perusteella,
    //joten pakko tarkistaa mikä elementti kutsuu funktiota
    if(window.event.srcElement.id === "nappula" || window.event.srcElement.id === "karttaDiv" || window.event.srcElement.id === "infoCanvas"){
        closedNav = true;
        document.body.style.overflow = "auto";
        document.getElementById("mySidenav").style.width = "0";
        reittiDiv.classList.add("released")
    }
}

function hide(){
        if(window.innerWidth < 600){
            document.querySelector(".active").classList.remove("active")
            document.querySelector(".page").classList.add("active")
         }
                
        else{
            return -1
        }
}
//Palauttaa listan, jossa on lasketun reitin värit
function getColors(result,linjastoKeys){
        var list= [];
        for(let i = 0; i<result.length-1; i++){
            if(i === 0){
                for(let k = 0; k < linjastoKeys.length; k++) {
                    if(linjastot[linjastoKeys[k]].includes(startPoint) && linjastot[linjastoKeys[k]].includes(result[i+1])){ 
                        list.push(linjastoKeys[k])
                        break;
                    }
                } 
           }
           else{ 
               for(let j= 0; j < linjastoKeys.length; j++){
                    if(linjastot[linjastoKeys[j]].includes(result[i-1]) && linjastot[linjastoKeys[j]].includes(result[i])){ 
                        if(linjastot[list[list.length-1]].includes(result[i-1]) && linjastot[list[list.length-1]].includes(result[i])){
                            list.push(list[list.length-1])
                            break;
                }
                else{
                    list.push(linjastoKeys[j]) 
                    break;} }}
               }
            }
        return list;
}



//Etsii lyhintä kestoa solmujen välillä
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
        // Seurataan lyhintä kestoa solmujen välillä  
        const weights = Object.assign({finish: Infinity}, graph.start); 
        var lengthTest = [];
        // Seurataan reittejä
        const parents = {finish: null};  
        for (let child in graph.start) {    
          parents[child] = 'start';  
         }
         

        // Seurataan mitkä solmut ovat käsiteltyjä
        const processed = [];
        //Asetetaan alustava arvo käsiteltävälle solmulle ja aloitetaan while-loop, joka etsii jatkuvasti "kevyintä" solmua
        let node = findLowestWeightNode(weights, processed);
        while (node) {
        //Hakee nykyisen solmun painoarvon
        let weight = weights[node];
        //Hakee solmun "lapset" tai naapurit
        let children = graph[node]; 
        //Käydään naapurit läpi ja lasketaan kesto/paino naapurin saavuttamiseksi, kesto/paino päivitetään solmun painoksi weights-objektiin, jos se on alhaisin tai ainoa käytettävissä oleva
        for (let n in children) {   
            let newWeight = weight + children[n];     
             if (!weights[n] || weights[n] > newWeight) { 
              weights[n] = newWeight; 
              parents[n] = node;
                }
             }
         //Lisätään käsitelty solmun processed-listaan
         processed.push(node);
         // Toistetaan kunnes kaikki nodet ovat käsitelty    
         node = findLowestWeightNode(weights, processed);
        
        }
        

        let optimalPath = ['finish'];
    
        let parent = parents.finish;
        
    while (parent) {
        optimalPath.unshift(parent);//Lisätään löytyneet solmut optimalPath-listaan
        parent = parents[parent]; 
    }
    //Lopputuloksena kesto ja reitti
    const results = {
    length: weights.finish,
    path: optimalPath
    };
 
  return results;

};

/*
function getKesto(start,end){
    var check = tiet.filter((e1 => { if(e1["mista"] === start && e1["mihin"] === end || e1["mihin"] === start && e1["mista"] === end) return e1["kesto"]} ))
    return check
}*/


//Avataan ohjeistus käyttäjälle kun hän ensimmäisen kerran saapuu sivulle
document.addEventListener('DOMContentLoaded', function(){
    new Graphics().drawPlainMap();
    openNav();
    infoDiv.hidden =true
});