var GAME_DATA = require("../GAME_DATA"),
    fs = require('fs'),
    request = require('request');

console.log("Bilder Donwloader gestartet");


var url = "https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/";

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);
        if (!err && res.statusCode === 200) {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        } else if (err) {
            console.error(err);
        } else {
            console.log(res.statusCode);
        }



    });
};




for (var building in GAME_DATA.GAME_DATA.Tech) {
    //getting named! url to png
    building = GAME_DATA.GAME_DATA.Tech[building]
    var filename = building.n + ".png",
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

    filename = "../img/buildings/" + filename;

    console.log(filename);
    console.log(png_link);

    download(png_link, filename, function () {
        console.log('done: ' + filename);
    });

    //console.log(GAME_DATA.GAME_DATA.Archives[0].F[png_link].h);
}
//Downlaod manuel
//Tib ground
url = 'https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/4bc5605149c6f6330630e31706b2975d.png';
filename = '../img/buildings/res_tiberium_01.png';
download(url, filename, function () {
    console.log('done: ' + filename);
});

url = 'https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/c97fc957d031547a131c7730a11b09d2.png';
filename = '../img/buildings/crystal01.png';
download(url, filename, function () {
    console.log('done: ' + filename);
});