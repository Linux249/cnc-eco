var fs = require('fs');

var nod_buildings = {
    "NOD_Refinery": "r",
    "NOD_Power Plant": "p",
    "NOD_Harvester": "h",
    "NOD_Construction Yard": "y",
    "NOD_Airport": "d",
    //    "NOD_Trade Center": "u",
    "NOD_Defense HQ": "q",
    "NOD_Barracks": "b",
    "NOD_Silo": "s",
    "NOD_Factory": "f",
    "NOD_Harvester_Crystal": "n",
    "NOD_Command Post": "e",
    "NOD_Support_Art": "z",
    "NOD_Support_Ion": "i",
    "NOD_Accumulator": "a",
    "NOD_Support_Air": "x",
    "NOD_Defense Facility": "w"
};


//test für node
/*
for (var building in nod_buildings) {
    console.log(building);
    var path = '../img/buildings/'+ building + '.png';
    console.log(path);
    fs.exists(path, 
        function (exists) {
            console.log(exists);
        });
}
*/

