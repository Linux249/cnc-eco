#Todo:
- Login system
- Payment system
  - credits for money (List to choose)

Ingame cliackable List of saved games (mini preview of layout)
- list is sorted: newest + saved bases
- save Bases to account 
  - api: GET /user/base get list of bases 
  - api: POST /user/base/    save the Base to a list (max 100, new first)
  - api: GET /user/base/:id  get single base
  - api: PUT /user/base/:id  save single base (first of list)   

- create Base from url-param
  - api:/getBaseFromGame get Base from server 
  
## Credit system
- report interactions 
  - Document interaktion points
  
  
## own webservice for saving layouts
- memberstats script cleaning
- replace url
  - Origin: https://prodgame08.alliances.commandandconquer.com
  - to: POST layout.php?pl=linux249&w=379&a=122
  - `
      { 233:334: {
        
  `
#### Mongoose Model: Layout
```javascript 
  { 
    alliance: Number,
    distance: Number,
    failCount: Number,      //what is this?
    id: Number,             // gebraucht?
    layout: String
    level: Number,             // gebraucht?
    name: String,             // gebraucht?
    player: String,
    selectedBaseID: Number,             // gebraucht?
    world: Number,  //index             // gebraucht?
    x: Number,  //index
    y: Number,  //index,
    tib: Number,
    cris: Number
  }
```



//There should be different collections for the worlds
export only schema - make model from schema in route handler

1. get world id from url 
2. create model with world id 
3. const layouts = req.body //parse or something? 
3. für jedes Object (key) in 'layouts: 
  - versuche layout zu finden
  - falls gefunden, schauen ob url neu ist -> updaten
  - falls nicht -> neues Layout erstellen
  - ref zu Layout in player speichern, 

#### Mongoose Model: Layout
```javascript 
  { 
    name: String,
    worlds: [{
      world: Number,
      layouts: [Layout]
    }]
    
  }
```
  
- Login system
- Payment system
  - credits for money (List to choose)

Ingame cliackable List of saved games (mini preview of layout)
- list is sorted: newest + saved bases
- save Bases to account 
  - api: GET /user/base get list of bases 
  - api: POST /user/base/    save the Base to a list (max 100, new first)
  - api: GET /user/base/:id  get single base
  - api: PUT /user/base/:id  save single base (first of list)   

- create Base from url-param
  - api:/getBaseFromGame get Base from server 
  
## Credit system
- report interactions 
  - Document interaktion points
  
  idee: 
  
  - gebäude classe 
    - methoden:
       - cunstructor(url || empty )  
       - replaceBuilding(building)
       - removeBuilding(index)
       - lvlBuildingUp(index)
       - lvlBuildingDown(index)
       - setBuildingLvl(index, lvl)
       - switchBuildings(i1, i2) //i2 empty means is
       - production()
       -  
       
       
### API: 
 - calcFutureProd(base/buildings)
 - 