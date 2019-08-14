const request = require('request');
const Game_Data = require('./GAME_DATA.js');
const fs = require('fs');
const http = require('http');
const Stream = require('stream').Transform;

console.log('Bilder Donwloader gestartet');

var url = 'https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/';

var downloadOld = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);
        if (!err && res.statusCode === 200) {
            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on('close', callback);
        } else if (err) {
            console.error(err);
        } else {
            console.log(res.statusCode);
        }
    });
};

for (var building in GAME_DATA.GAME_DATA.Tech) {
    //getting named! url to png
    building = GAME_DATA.GAME_DATA.Tech[building];
    var filename = building.n + '.png',
        png_link = building.di,
        png_link_detail = building.ddi;

    //chance to hash url
    if (GAME_DATA.GAME_DATA.Archives[0].F[png_link]) {
        png_link = GAME_DATA.GAME_DATA.Archives[0].F[png_link].h;
    } else {
        png_link === false;
    }

    //URL zusammensetzten
    png_link = url + png_link;

    filename = '../img/buildings/' + filename;

    console.log(filename);
    console.log(png_link);

    downloadOld(png_link, filename, function() {
        console.log('done: ' + filename);
    });

    //console.log(GAME_DATA.GAME_DATA.Archives[0].F[png_link].h);
}
//Download manuel
//Tib ground
url =
    'https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/4bc5605149c6f6330630e31706b2975d.png';
filename = '../img/buildings/tiberium.png';
// downloadOld(url, filename, function() {
//     console.log('done: ' + filename);
// });

url =
    'https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/c97fc957d031547a131c7730a11b09d2.png';
filename = '../img/buildings/crystal.png';
// downloadOld(url, filename, function() {
//     console.log('done: ' + filename);
// });

const units = {
    // For_Defense
    def: {
        FOR_Wall: 'w',
        FOR_Barbwire_VS_Inf: 'b',
        FOR_Barrier_VS_Veh: 't',
        FOR_Inf_VS_Inf: 'g',
        FOR_Inf_VS_Veh: 'r',
        FOR_Inf_VS_Air: 'q',
        FOR_Sniper: 'n',
        FOR_Mammoth: 'y',
        FOR_Veh_VS_Inf: 'o',
        FOR_Veh_VS_Veh: 's',
        FOR_Veh_VS_Air: 'u',
        FOR_Turret_VS_Inf: 'm',
        FOR_Turret_VS_Inf_ranged: 'a',
        FOR_Turret_VS_Veh: 'v',
        FOR_Turret_VS_Veh_ranged: 'd',
        FOR_Turret_VS_Air: 'f',
        FOR_Turret_VS_Air_ranged: 'e',
    },
    building: {
        // for_buildings
        FOR_Silo: 's',
        FOR_Refinery: 'r',
        'FOR_Tiberium Booster': 'b',
        'FOR_Crystal Booster': 'v',
        'FOR_Trade Center': 'u',
        'FOR_Defense Facility': 'w',
        'FOR_Construction Yard': 'y',
        FOR_Harvester_Tiberium: 'h',
        'FOR_Defense HQ': 'q',
        FOR_Harvester_Crystal: 'n',
    },
};

const baseUrl = 'http://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/';

function download(url, file, cb) {
    http.request(url, function(response) {
        const data = new Stream();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            fs.writeFileSync(file, data.read());
            cb();
        });
    }).end();
}

console.log('start');

function downloadFORBuildings() {
    console.log('===== ALL TECH =====');
    Object.values(Game_Data.Tech).map(({ n, di }) => {
        if (n in units.building) {
            console.log('Building', units.building[n], n, di);
            const file = './img/buildings/' + units.building[n] + '.png';
            const url = baseUrl + Game_Data.Archives[0].F[di].h;
            download(url, file, () => console.log('saved: ' + file));
        }
    });
}

function downloadFORUnits() {
    console.log('===== ALL UNITS =====');
    Object.values(Game_Data.units).map(({ n, bi }) => {
        if (n in units.def) {
            console.log('Defends', units.def[n], n, bi);
            const file = './img/defens/' + units.def[n] + '.png';
            const url = baseUrl + Game_Data.Archives[0].F[bi].h;
            download(url, file, () => console.log('saved: ' + file));
        }
    });
}

// what are npcTechIds ?? => nothing useful
Game_Data.npcTechIds.map(id => {
    console.log(Game_Data.Tech[id].n);
});

// check all npcUnitIds
Game_Data.npcUnitIds.map(id => {
    const unit = Game_Data.units[id];
    const { n, bi } = unit;
    // all of 247 GroundBlocker_Own have bi
    if (bi && Game_Data.Archives[0].F[bi]) {
        const t = Game_Data.Archives[0].F[bi].h;
        console.log(id, n, bi, t);
        const url = baseUrl + t;
        const file = './img/' + n + '.png';
        download(url, file, () => console.log('saved: ' + file));
    } else if (bi) {
        console.warn('\t', id, n, bi);
    }
});
