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
  