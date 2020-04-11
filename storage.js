class Storage {
constructor(){}
    getGraph(){
        return {"start":{},
    "A" : {"B": 3, "C": 1, "D" : 1},
"B":{"A" : 3, "D" : 2},
"C" :{"A": 1, "D": 5, "E" : 2},
"D": {"B" : 2, "A": 1, "C" : 5, "E" :3, "R": 6},
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
    }
    getPoints(){
        return {"A" :{"width" : 0.042, "height" : 0.466},
        "B" :{"width" : 0.135, "height" : 0.466},
        "C" :{"width" : 0.042, "height" : 0.375},
        "D" :{"width" : 0.1, "height" : 0.378},
        "E" :{"width" : 0.1, "height" : 0.317},
        "F" :{"width" : 0.151, "height" : 0.259},
        "G" :{"width" : 0.222, "height" : 0.224},
        "H" :{"width" : 0.195, "height" : 0.13},
        "I" :{"width" : 0.245, "height" : 0.13},
        "J" :{"width" : 0.259, "height" : 0.047},
        "K" :{"width" : 0.419, "height" : 0.15},
        "L" :{"width" : 0.419, "height" : 0.205},
        "M" :{"width" : 0.419, "height" : 0.278},
        "N" :{"width" : 0.419, "height" : 0.36},
        "O" :{"width" : 0.419, "height" : 0.432},
        "P" :{"width" : 0.385, "height" : 0.487},
        "Q" :{"width" : 0.35, "height" : 0.432},
        "R" :{"width" : 0.232, "height" : 0.378}}
    }

    getLines(){
        return { "keltainen": ["E", "F", "G", "K", "L", "M", "N"],
      "punainen": ["C", "D", "R", "Q", "N", "O", "P"],
      "vihrea": ["D", "B", "A", "C", "E", "F", "G", "H", "I", "J"],
      "sininen": ["D", "E", "M", "N", "O"]
    }
    }
  }