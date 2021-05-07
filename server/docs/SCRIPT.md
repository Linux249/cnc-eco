


## Request
List of Request the [Script](https://greasyfork.org/en/scripts/33978-cnc-cnc-eco) can performe 

### Ingame Script on start (auto) @cnc-eco.herokuapp.com/api/v1
- OPTIONS  /ingameData?name=linux249&alli=126&world=373
- OPTIONS  /ingameData?name=linux249&token=1914&alli=126&world=373
- OPTIONS  /ingameData?version=4.7.5
- POST     /ingameData?update=1
  - body: see "send BaseData"
  
### Ingame Script on Index Interaction @cnc-eco.herokuapp.com/api/v1

#### scan layouts
- POST /layouts?pl=linux249&world=373&a=126
  - body:  `{"295:390":{"x":295,"y":390,"level":37,"id":10341396,"distance":9.899494936611665,"selectedBaseID":6392344,"alliance":126,"world":373,"player":"linux249","failCount":3,"layout":".....c......t.c.............ccc...t......t........t.t....t...t...................l.jjj.hh..............hh.j.k......j....lll.........j....kk....h","name":"Base"},"307:390":{"x":307,"y":390,"level":37,"id":12136132,"distance":8.602325267042627,"selectedBaseID":6392344,"alliance":126,"world":373,"player":"linux249","failCount":19,"layout":"..........t.t.c.t......c..........t..c.c..........c.....cc...t..........l.........j.j.k.....h........h..j..l.l..h.......l..hh.h........h..h...ll","name":"Base"}}`
- End of scanning: 
  - Open in new Tab  https://www.member-stats.de/?link=layout&worldid=373
  

#### send BaseData @cnc-eco.herokuapp.com/api/v1
- OPTIONS /ingameData?version=4.7.5
- POST    /ingameData?update=1
  - body `_data_=UPDATE&version=4.7.5&worldId=373&serverName=World+Championship+2017&allianceId=126&allianceName=SchMaraffa&count=44&playerId0=6&name0=seven0404&ro0=Member&playerId1=28&name1=XXPowerateXXX&ro1=Member&playerId2=115&name2=imjustnorm&ro2=Veteran&playerId3=120&name3=v3ritas_a3quitas&ro3=Inactive&playerId4=160&name4=ScottBrannen&ro4=Inactive&playerId5=190&name5=DerLillie&ro5=Member&playerId6=191&name6=_Nod1212&ro6=Inactive&playerId7=194&name7=RedSebbi&ro7=Member&playerId8=198&name8=E1drago&ro8=Inactive&playerId9=208&name9=Derdiablo82&ro9=Inactive&playerId10=238&name10=DieFilzlaus&ro10=Inactive&playerId11=248&name11=rockavie&ro11=Inactive&playerId12=249&name12=braunfelserpc2&ro12=Member&playerId13=271&name13=Workzone&ro13=Inactive&playerId14=317&name14=MostDeath&ro14=Member&playerId15=326&name15=PabloDeLamadrid&ro15=Member&playerId16=344&name16=siegberth666&ro16=Member&playerId17=404&name17=Odinthoor&ro17=Inactive&playerId18=407&name18=dress011&ro18=Member&playerId19=411&name19=cedy1at&ro19=Member&playerId20=509&name20=WELT32&ro20=Leader&playerId21=614&name21=edenna30&ro21=Inactive&playerId22=622&name22=MickyB503&ro22=Leader&playerId23=631&name23=Sszakallx&ro23=Inactive&playerId24=667&name24=abwaschbear&ro24=Member&playerId25=679&name25=SunTzu1109&ro25=Member&playerId26=775&name26=04031984&ro26=Member&playerId27=887&name27=Paulj2005&ro27=Inactive&playerId28=979&name28=pad3000&ro28=Inactive&playerId29=1009&name29=dinetauewzue&ro29=Member&playerId30=1031&name30=takacy2016&ro30=Member&playerId31=1124&name31=Schneckenfloh&ro31=Inactive&playerId32=1289&name32=mmsths&ro32=Member&playerId33=1367&name33=sasa26111984&ro33=Second+Commander&playerId34=1436&name34=fackelnichtlang&ro34=Member&playerId35=1504&name35=viajes1969&ro35=Veteran&playerId36=1546&name36=AminChristian&ro36=Inactive&playerId37=1566&name37=moeff80&ro37=Member&playerId38=1599&name38=Dobvica&ro38=Inactive&playerId39=1632&name39=Yurecmolodec&ro39=Member&playerId40=1664&name40=nh2712&ro40=Inactive&playerId41=1702&name41=Bonzi619&ro41=Member&playerId42=1914&name42=linux249&ro42=Veteran&playerId43=1992&name43=don7047&ro43=Inactive&currentplayerId=1914&accountId=126671&cic=622%2C509&sc=1367&currentplayerName=linux249&basecount=9&fraction=2&basekills=55&pvekills=54&pvpkills=1&points=22343080&rank=201&hascode=true&maxcp=100&actcp=300&funds=5123&schirme=2000&RPoints=136098579218&CreditsCount=90631925257&timeTOmcv=Infinity&rpNeeded=124000000000&basename0=-+TuX+HQ+-&punkte0=7642133&level0=50.41&off0=49.71&def0=43.75&repinf0=0&repveh0=0&repair0=76747&repmax0=43200&availrep0=189163&suptype0=&suplvl0=0&cylvl0=46&dflvl0=0&dfhqlvl0=44&power0=29490700&tib0=197047628&cris0=1573274&cash0=0&x0=298&y0=378&opt0=http%3A%2F%2Fcncopt.com%2F%3Fmap%3D3%7CN%7CN%7C-+TuX+HQ+-%7C31p31p31p31p31p31p31p46y.31p58a31p57a31p58a31p52h.35p35p35p53h31p31p60s54h50d45bc.44q49s56h59s54h..31n31n..54h52s..48f.31s55e...31n...31n31n..............j44q44q44s44z44s44q44qh.h43c43fj43f43c43s44q..44q44zj44z44shhjj44z44q44qkk44z44q..44sk44s4Show more`


#### open Memberstats.de
- Options /ingameData?new_check=linux249
