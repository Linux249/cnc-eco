import World from '../model/World';
import Alliance from '../model/Alliance';

// body.worldId is unique id of all worlds
// body.allianceId is id of alliance on this world

// GET /api/v1/layout
// get a single labtop with world + coords as params
export default async (req, res, next) => {
    try {
        const { body, db } = req;
        const {
            worldId,
            allianceId,
            allianceName,
            count,
            serverName,
            currentplayerName,
            basecount,
            fraction,
        } = body;

        if (!currentplayerName) return next(new Error('Request is currently not supported'));
        console.log(
            `IngameData from: ${currentplayerName} on: ${serverName}(${worldId}) a: ${allianceName}(${allianceId}) base# ${basecount}`
        );

        /*
         *   save Alliance Information's
         */
        const aId = Number(`${allianceId}${worldId}`); // unique id combine world and ally id
        const alliance =
            (await Alliance.findOne({ allianceId: aId })) || new Alliance({ allianceId: aId });

        const members = await [...Array(Number(count))].map((_, i) => ({
            name: body[`name${i}`],
            role: body[`ro${i}`],
            playerId: body[`playerId${i}`],
        }));

        alliance.count = count;
        alliance.name = allianceName;
        alliance.members = members;

        // todo need i realy wait here?
        await alliance.save();

        // save player data
        const collection = db.collection(`players_${worldId}`);

        // read all Bases and put them into array
        let offBaseIndex = 0;

        const offbase = {
            off: 0,
            def: 0,
            rep: 0,
            maxRep: 0,
        };

        let totalTib = 0;
        let totalCris = 0;
        let totalPower = 0;
        let totalCredits = 0;

        let avargDef = 0;
        let avargSubLvl = 0;
        let avargDfLvl = 0;
        let avargDfHQLvl = 0;

        const bases = [...Array(Number(basecount))].map((_, i) => {
            // update max off base index
            const off = +body[`off${i}`];
            const def = +body[`def${i}`];
            avargDef += Math.round((def / basecount) * 100) / 100;

            const rep = +body[`availrep${i}`];
            const maxRep = +body[`repmax${i}`];
            if ((i !== offBaseIndex && off >= offbase.off) || i === 0) {
                console.log({ i, off, def, rep, maxRep });
                offBaseIndex = i;
                offbase.off = off;
                offbase.def = def;
                offbase.rep = rep;
                offbase.maxRep = maxRep;
            }

            const tib = +body[`tib${i}`];
            const cris = +body[`cris${i}`];
            const power = +body[`power${i}`];
            const cash = +body[`cash${i}`];
            totalTib += tib;
            totalCris += cris;
            totalPower += power;
            totalCredits += cash;

            const subLvl = +body[`suplvl${i}`];
            const dfLvl = +body[`dflvl${i}`];
            const dfHQLvl = +body[`dfhqlvl${i}`];
            avargSubLvl += Math.round((subLvl / basecount) * 100) / 100;
            avargDfLvl += Math.round((dfLvl / basecount) * 100) / 100;
            avargDfHQLvl += Math.round((dfHQLvl / basecount) * 100) / 100;

            return {
                fraction,
                name: body[`basename${i}`],
                layout: body[`opt${i}`],
                points: body[`punkte${i}`],
                level: body[`level${i}`],

                off,
                def,

                rep: body[`availrep${i}`],
                maxRep: body[`repmax${i}`],

                subType: body[`suptype${i}`],
                subLvl,
                cyLvl: body[`cylvl${i}`],
                dfLvl,
                dfHQLvl,

                tib,
                cris,
                power,
                cash,

                x: body[`x${i}`],
                y: body[`y${i}`],
            };
        });

        // find or create player
        // let player = await Player.findOne({name: currentplayerName}) || new Player({name: currentplayerName})

        const player = {
            playerId: body.currentplayerId,
            allianceId,
            serverName,
            name: currentplayerName,
            bases,
            basecount: body.basecount, // count bases - 1 is init
            fraction: body.fraction, // 2 is NOD und 1 GDI
            rank: body.rank, // current rank on the world
            points: body.points, // total points
            basekills: body.basekills, // total kills
            pvekills: body.pvekills, // kills only in pve
            pvpkills: body.pvpkills, // kills only in pvp
            hascode: body.hascode, // had optain a satcode
            maxcp: body.maxcp, // max cp holdable
            actcp: body.actcp, // current commando points
            funds: body.funds, // current amount of funds
            schirme: body.schirme, // schirme ????
            rPoints: body.RPoints, // amout of research points
            creditsCount: body.CreditsCount, // amount of credits
            timeToMcv: body.timeTOmcv, // time left to next mcv
            rpNeeded: body.rpNeeded, // total rp that needed - %% this

            totalTib,
            totalPower,
            totalCris,
            totalCredits,

            avargDef,
            avargSubLvl,
            avargDfLvl,
            avargDfHQLvl,

            offbase,
        };

        // set time for update
        player._updated = new Date();

        // find or create && overwrite or insert document
        await collection.update({ name: currentplayerName }, player, { upsert: true });

        // update or create world
        // TODO save the world where the plaer has a "player"
        // const index = player.worlds.findIndex(world => world.w == worldId)
        // console.log({player, index})
        // console.log(player.worlds)

        /*
        if(index !== -1) {
            player.worlds[index].bases = bases
        } else {
            player.worlds.push({
                name: serverName,
                w: worldId,
                bases
            })
        }

        */

        // save
        // const result = await player.save()
        // console.log(`UPDATE PLAYER INFO: ${result}`)
        // res.json(result)
        res.send('UPDATED');
        // check if world allready is known
        const world = await World.findOne({ worldId });
        if (!world) new World({ worldId, worldName: serverName }).save();

        // add world
    } catch (err) {
        console.log({ err });
        console.log({ body: req.body });
        console.log({ params: req.params });
        console.log({ query: req.query });
        // res.send(err);
        next(err);
    }
};

// 2017-10-16T10:04:43.127252+00:00 app[web.1]: { _data_: 'UPDATE',
// 2017-10-16T10:04:43.127268+00:00 app[web.1]:   version: '4.7.5',
// 2017-10-16T10:04:43.127269+00:00 app[web.1]:   worldId: '379',
// 2017-10-16T10:04:43.127270+00:00 app[web.1]:   serverName: 'Wrath 18',
// 2017-10-16T10:04:43.127271+00:00 app[web.1]:   allianceId: '122',
// 2017-10-16T10:04:43.127272+00:00 app[web.1]:   allianceName: 'Irrenanstalt',
// 2017-10-16T10:04:43.127273+00:00 app[web.1]:   count: '49',
// 2017-10-16T10:04:43.127274+00:00 app[web.1]:   playerId0: '6',
// 2017-10-16T10:04:43.127274+00:00 app[web.1]:   name0: 'SUN_FCH_65',
// 2017-10-16T10:04:43.127275+00:00 app[web.1]:   ro0: 'Member',
// 2017-10-16T10:04:43.127276+00:00 app[web.1]:   playerId1: '12',
// 2017-10-16T10:04:43.127276+00:00 app[web.1]:   name1: 'Clix17',
// 2017-10-16T10:04:43.127277+00:00 app[web.1]:   ro1: 'Member',
// 2017-10-16T10:04:43.127277+00:00 app[web.1]:   playerId2: '19',
// 2017-10-16T10:04:43.127278+00:00 app[web.1]:   name2: 'LordEliran',
// 2017-10-16T10:04:43.127279+00:00 app[web.1]:   ro2: 'Member',
// 2017-10-16T10:04:43.127279+00:00 app[web.1]:   playerId3: '23',
// 2017-10-16T10:04:43.127280+00:00 app[web.1]:   name3: 'AdmiralGraafSpee',
// 2017-10-16T10:04:43.127280+00:00 app[web.1]:   ro3: 'Member',
// 2017-10-16T10:04:43.127281+00:00 app[web.1]:   playerId4: '47',
// 2017-10-16T10:04:43.127282+00:00 app[web.1]:   name4: 'cauliflower1978',
// 2017-10-16T10:04:43.127283+00:00 app[web.1]:   ro4: 'Member',
// 2017-10-16T10:04:43.127283+00:00 app[web.1]:   playerId5: '55',
// 2017-10-16T10:04:43.127284+00:00 app[web.1]:   name5: 'xxxRIDDICKxxxx',
// 2017-10-16T10:04:43.127285+00:00 app[web.1]:   ro5: 'Member',
// 2017-10-16T10:04:43.127285+00:00 app[web.1]:   playerId6: '64',
// 2017-10-16T10:04:43.127286+00:00 app[web.1]:   name6: 'XL78',
// 2017-10-16T10:04:43.127286+00:00 app[web.1]:   ro6: 'Member',
// 2017-10-16T10:04:43.127287+00:00 app[web.1]:   playerId7: '68',
// 2017-10-16T10:04:43.127288+00:00 app[web.1]:   name7: 'Barnebee',
// 2017-10-16T10:04:43.127288+00:00 app[web.1]:   ro7: 'Officer',
// 2017-10-16T10:04:43.127289+00:00 app[web.1]:   playerId8: '74',
// 2017-10-16T10:04:43.127289+00:00 app[web.1]:   name8: 'dre84',
// 2017-10-16T10:04:43.127290+00:00 app[web.1]:   ro8: 'Member',
// 2017-10-16T10:04:43.127290+00:00 app[web.1]:   playerId9: '76',
// 2017-10-16T10:04:43.127291+00:00 app[web.1]:   name9: 'Yolo_Maser1337',
// 2017-10-16T10:04:43.127291+00:00 app[web.1]:   ro9: 'Newbie',
// 2017-10-16T10:04:43.127291+00:00 app[web.1]:   playerId10: '85',
// 2017-10-16T10:04:43.127292+00:00 app[web.1]:   name10: 'Vespin70',
// 2017-10-16T10:04:43.127292+00:00 app[web.1]:   ro10: 'Member',
// 2017-10-16T10:04:43.127293+00:00 app[web.1]:   playerId11: '87',
// 2017-10-16T10:04:43.127293+00:00 app[web.1]:   name11: 'AvalonAle',
// 2017-10-16T10:04:43.127293+00:00 app[web.1]:   ro11: 'Member',
// 2017-10-16T10:04:43.127294+00:00 app[web.1]:   playerId12: '101',
// 2017-10-16T10:04:43.127294+00:00 app[web.1]:   name12: 'Daikyu80',
// 2017-10-16T10:04:43.127295+00:00 app[web.1]:   ro12: 'Leader',
// 2017-10-16T10:04:43.127295+00:00 app[web.1]:   playerId13: '128',
// 2017-10-16T10:04:43.127296+00:00 app[web.1]:   name13: 'Diggaaa90',
// 2017-10-16T10:04:43.127296+00:00 app[web.1]:   ro13: 'Second Commander',
// 2017-10-16T10:04:43.127297+00:00 app[web.1]:   playerId14: '140',
// 2017-10-16T10:04:43.127297+00:00 app[web.1]:   name14: 'Monacor45',
// 2017-10-16T10:04:43.127298+00:00 app[web.1]:   ro14: 'Member',
// 2017-10-16T10:04:43.127298+00:00 app[web.1]:   playerId15: '142',
// 2017-10-16T10:04:43.127299+00:00 app[web.1]:   name15: 'Techzhen',
// 2017-10-16T10:04:43.127299+00:00 app[web.1]:   ro15: 'Second Commander',
// 2017-10-16T10:04:43.127300+00:00 app[web.1]:   playerId16: '148',
// 2017-10-16T10:04:43.127300+00:00 app[web.1]:   name16: 'Beos123',
// 2017-10-16T10:04:43.127301+00:00 app[web.1]:   ro16: 'Member',
// 2017-10-16T10:04:43.127301+00:00 app[web.1]:   playerId17: '158',
// 2017-10-16T10:04:43.127302+00:00 app[web.1]:   name17: 'odmholzitech',
// 2017-10-16T10:04:43.127303+00:00 app[web.1]:   ro17: 'Member',
// 2017-10-16T10:04:43.127304+00:00 app[web.1]:   playerId18: '164',
// 2017-10-16T10:04:43.127304+00:00 app[web.1]:   name18: 'dummdidummdi',
// 2017-10-16T10:04:43.127305+00:00 app[web.1]:   ro18: 'Member',
// 2017-10-16T10:04:43.127305+00:00 app[web.1]:   playerId19: '165',
// 2017-10-16T10:04:43.127306+00:00 app[web.1]:   name19: 'Losbude',
// 2017-10-16T10:04:43.127306+00:00 app[web.1]:   ro19: 'Member',
// 2017-10-16T10:04:43.127307+00:00 app[web.1]:   playerId20: '195',
// 2017-10-16T10:04:43.127308+00:00 app[web.1]:   name20: 'oluja77',
// 2017-10-16T10:04:43.127308+00:00 app[web.1]:   ro20: 'Member',
// 2017-10-16T10:04:43.127309+00:00 app[web.1]:   playerId21: '201',
// 2017-10-16T10:04:43.127310+00:00 app[web.1]:   name21: 'Myscara',
// 2017-10-16T10:04:43.127310+00:00 app[web.1]:   ro21: 'Member',
// 2017-10-16T10:04:43.127311+00:00 app[web.1]:   playerId22: '226',
// 2017-10-16T10:04:43.127311+00:00 app[web.1]:   name22: 'MaxiSabsi',
// 2017-10-16T10:04:43.127312+00:00 app[web.1]:   ro22: 'Member',
// 2017-10-16T10:04:43.127312+00:00 app[web.1]:   playerId23: '229',
// 2017-10-16T10:04:43.127313+00:00 app[web.1]:   name23: 'Dopix666',
// 2017-10-16T10:04:43.127313+00:00 app[web.1]:   ro23: 'Leader',
// 2017-10-16T10:04:43.127314+00:00 app[web.1]:   playerId24: '323',
// 2017-10-16T10:04:43.127314+00:00 app[web.1]:   name24: 'Emeroach',
// 2017-10-16T10:04:43.127315+00:00 app[web.1]:   ro24: 'Member',
// 2017-10-16T10:04:43.127315+00:00 app[web.1]:   playerId25: '326',
// 2017-10-16T10:04:43.127316+00:00 app[web.1]:   name25: 'WillianLin',
// 2017-10-16T10:04:43.127316+00:00 app[web.1]:   ro25: 'Member',
// 2017-10-16T10:04:43.127317+00:00 app[web.1]:   playerId26: '349',
// 2017-10-16T10:04:43.127325+00:00 app[web.1]:   name26: 'ericnate',
// 2017-10-16T10:04:43.127325+00:00 app[web.1]:   ro26: 'Member',
// 2017-10-16T10:04:43.127326+00:00 app[web.1]:   playerId27: '426',
// 2017-10-16T10:04:43.127326+00:00 app[web.1]:   name27: '0Anthology0',
// 2017-10-16T10:04:43.127327+00:00 app[web.1]:   ro27: 'Member',
// 2017-10-16T10:04:43.127327+00:00 app[web.1]:   playerId28: '434',
// 2017-10-16T10:04:43.127327+00:00 app[web.1]:   name28: 'TeejLUFC3',
// 2017-10-16T10:04:43.127328+00:00 app[web.1]:   ro28: 'Member',
// 2017-10-16T10:04:43.127329+00:00 app[web.1]:   playerId29: '479',
// 2017-10-16T10:04:43.127329+00:00 app[web.1]:   name29: 'Partyagain',
// 2017-10-16T10:04:43.127329+00:00 app[web.1]:   ro29: 'Member',
// 2017-10-16T10:04:43.127330+00:00 app[web.1]:   playerId30: '527',
// 2017-10-16T10:04:43.127330+00:00 app[web.1]:   name30: 'masowymord',
// 2017-10-16T10:04:43.127331+00:00 app[web.1]:   ro30: 'Member',
// 2017-10-16T10:04:43.127331+00:00 app[web.1]:   playerId31: '540',
// 2017-10-16T10:04:43.127331+00:00 app[web.1]:   name31: 'NsemGzal',
// 2017-10-16T10:04:43.127332+00:00 app[web.1]:   ro31: 'Member',
// 2017-10-16T10:04:43.127332+00:00 app[web.1]:   playerId32: '582',
// 2017-10-16T10:04:43.127333+00:00 app[web.1]:   name32: 'Markus036',
// 2017-10-16T10:04:43.127333+00:00 app[web.1]:   ro32: 'Second Commander',
// 2017-10-16T10:04:43.127334+00:00 app[web.1]:   playerId33: '605',
// 2017-10-16T10:04:43.127334+00:00 app[web.1]:   name33: 'goran2310',
// 2017-10-16T10:04:43.127338+00:00 app[web.1]:   ro33: 'Member',
// 2017-10-16T10:04:43.127339+00:00 app[web.1]:   playerId34: '686',
// 2017-10-16T10:04:43.127339+00:00 app[web.1]:   name34: 'Beo1234',
// 2017-10-16T10:04:43.127339+00:00 app[web.1]:   ro34: 'Member',
// 2017-10-16T10:04:43.127340+00:00 app[web.1]:   playerId35: '688',
// 2017-10-16T10:04:43.127340+00:00 app[web.1]:   name35: 'Gigantenbix',
// 2017-10-16T10:04:43.127341+00:00 app[web.1]:   ro35: 'Member',
// 2017-10-16T10:04:43.127341+00:00 app[web.1]:   playerId36: '716',
// 2017-10-16T10:04:43.127341+00:00 app[web.1]:   name36: 'Nebula2013',
// 2017-10-16T10:04:43.127342+00:00 app[web.1]:   ro36: 'Member',
// 2017-10-16T10:04:43.127342+00:00 app[web.1]:   playerId37: '720',
// 2017-10-16T10:04:43.127343+00:00 app[web.1]:   name37: 'leszek261',
// 2017-10-16T10:04:43.127343+00:00 app[web.1]:   ro37: 'Member',
// 2017-10-16T10:04:43.127344+00:00 app[web.1]:   playerId38: '728',
// 2017-10-16T10:04:43.127344+00:00 app[web.1]:   name38: 'MeNoWoRe',
// 2017-10-16T10:04:43.127344+00:00 app[web.1]:   ro38: 'Member',
// 2017-10-16T10:04:43.127345+00:00 app[web.1]:   playerId39: '842',
// 2017-10-16T10:04:43.127345+00:00 app[web.1]:   name39: 'Jimmy8511',
// 2017-10-16T10:04:43.127346+00:00 app[web.1]:   ro39: 'Member',
// 2017-10-16T10:04:43.127346+00:00 app[web.1]:   playerId40: '896',
// 2017-10-16T10:04:43.127347+00:00 app[web.1]:   name40: 'SCHWERLAST',
// 2017-10-16T10:04:43.127347+00:00 app[web.1]:   ro40: 'Newbie',
// 2017-10-16T10:04:43.127347+00:00 app[web.1]:   playerId41: '1066',
// 2017-10-16T10:04:43.127348+00:00 app[web.1]:   name41: 'SuperRichie66',
// 2017-10-16T10:04:43.127348+00:00 app[web.1]:   ro41: 'Member',
// 2017-10-16T10:04:43.127349+00:00 app[web.1]:   playerId42: '1099',
// 2017-10-16T10:04:43.127349+00:00 app[web.1]:   name42: 'lalelu2711',
// 2017-10-16T10:04:43.127350+00:00 app[web.1]:   ro42: 'Member',
// 2017-10-16T10:04:43.127350+00:00 app[web.1]:   playerId43: '1132',
// 2017-10-16T10:04:43.127350+00:00 app[web.1]:   name43: 'linux249',
// 2017-10-16T10:04:43.127351+00:00 app[web.1]:   ro43: 'Member',
// 2017-10-16T10:04:43.127351+00:00 app[web.1]:   playerId44: '1256',
// 2017-10-16T10:04:43.127352+00:00 app[web.1]:   name44: 'E1drago',
// 2017-10-16T10:04:43.127352+00:00 app[web.1]:   ro44: 'Officer',
// 2017-10-16T10:04:43.127353+00:00 app[web.1]:   playerId45: '1386',
// 2017-10-16T10:04:43.127353+00:00 app[web.1]:   name45: 'XLeGaNdRy-TaNkX',
// 2017-10-16T10:04:43.127353+00:00 app[web.1]:   ro45: 'Member',
// 2017-10-16T10:04:43.127354+00:00 app[web.1]:   playerId46: '1553',
// 2017-10-16T10:04:43.127354+00:00 app[web.1]:   name46: 'bb_blitzkrieg',
// 2017-10-16T10:04:43.127355+00:00 app[web.1]:   ro46: 'Member',
// 2017-10-16T10:04:43.127355+00:00 app[web.1]:   playerId47: '1821',
// 2017-10-16T10:04:43.127355+00:00 app[web.1]:   name47: 'BadDecimus',
// 2017-10-16T10:04:43.127356+00:00 app[web.1]:   ro47: 'Member',
// 2017-10-16T10:04:43.127356+00:00 app[web.1]:   playerId48: '1897',
// 2017-10-16T10:04:43.127357+00:00 app[web.1]:   name48: 'Miko19r',
// 2017-10-16T10:04:43.127357+00:00 app[web.1]:   ro48: 'Member',
// 2017-10-16T10:04:43.127358+00:00 app[web.1]:   currentplayerId: '1132',
// 2017-10-16T10:04:43.127358+00:00 app[web.1]:   accountId: '126671',
// 2017-10-16T10:04:43.127358+00:00 app[web.1]:   cic: '229,101',
// 2017-10-16T10:04:43.127359+00:00 app[web.1]:   sc: '142,128,582',
// 2017-10-16T10:04:43.127360+00:00 app[web.1]:   currentplayerName: 'linux249',
// 2017-10-16T10:04:43.127361+00:00 app[web.1]:   basecount: '6',
// 2017-10-16T10:04:43.127361+00:00 app[web.1]:   fraction: '2',
// 2017-10-16T10:04:43.127361+00:00 app[web.1]:   basekills: '126',
// 2017-10-16T10:04:43.127362+00:00 app[web.1]:   pvekills: '124',
// 2017-10-16T10:04:43.127362+00:00 app[web.1]:   pvpkills: '2',
// 2017-10-16T10:04:43.127363+00:00 app[web.1]:   points: '691566',
// 2017-10-16T10:04:43.127363+00:00 app[web.1]:   rank: '1',
// 2017-10-16T10:04:43.127364+00:00 app[web.1]:   hascode: 'false',
// 2017-10-16T10:04:43.127364+00:00 app[web.1]:   maxcp: '300',
// 2017-10-16T10:04:43.127365+00:00 app[web.1]:   actcp: '228',
// 2017-10-16T10:04:43.127365+00:00 app[web.1]:   funds: '8912',
// 2017-10-16T10:04:43.127365+00:00 app[web.1]:   schirme: '16',
// 2017-10-16T10:04:43.127370+00:00 app[web.1]:   RPoints: '710949519',
// 2017-10-16T10:04:43.127370+00:00 app[web.1]:   CreditsCount: '490211659',
// 2017-10-16T10:04:43.127371+00:00 app[web.1]:   timeTOmcv: '2697628',
// 2017-10-16T10:04:43.127371+00:00 app[web.1]:   rpNeeded: '2670000000',
// 2017-10-16T10:04:43.127372+00:00 app[web.1]:   basename0: '- Tux 1 -',
// 2017-10-16T10:04:43.127372+00:00 app[web.1]:   punkte0: '86759',
// 2017-10-16T10:04:43.127373+00:00 app[web.1]:   level0: '28.66',
// 2017-10-16T10:04:43.127373+00:00 app[web.1]:   off0: '0.00',
// 2017-10-16T10:04:43.127373+00:00 app[web.1]:   def0: '13.25',
// 2017-10-16T10:04:43.127374+00:00 app[web.1]:   repinf0: '0',
// 2017-10-16T10:04:43.127374+00:00 app[web.1]:   repveh0: '0',
// 2017-10-16T10:04:43.127375+00:00 app[web.1]:   repair0: '0',
// 2017-10-16T10:04:43.127375+00:00 app[web.1]:   repmax0: '0',
// 2017-10-16T10:04:43.127376+00:00 app[web.1]:   availrep0: '0',
// 2017-10-16T10:04:43.127376+00:00 app[web.1]:   suptype0: '',
// 2017-10-16T10:04:43.127376+00:00 app[web.1]:   suplvl0: '0',
// 2017-10-16T10:04:43.127377+00:00 app[web.1]:   cylvl0: '25',
// 2017-10-16T10:04:43.127377+00:00 app[web.1]:   dflvl0: '0',
// 2017-10-16T10:04:43.127378+00:00 app[web.1]:   dfhqlvl0: '0',
// 2017-10-16T10:04:43.127378+00:00 app[web.1]:   power0: '1527833',
// 2017-10-16T10:04:43.127378+00:00 app[web.1]:   tib0: '3104116',
// 2017-10-16T10:04:43.127379+00:00 app[web.1]:   cris0: '2020936',
// 2017-10-16T10:04:43.127379+00:00 app[web.1]:   cash0: '868101',
// 2017-10-16T10:04:43.127380+00:00 app[web.1]:   x0: '365',
// 2017-10-16T10:04:43.127380+00:00 app[web.1]:   y0: '661',
// 2017-10-16T10:04:43.127391+00:00 app[web.1]:   opt0: 'http://cncopt.com/?map=3|N|N|- Tux 1 -|..25y..........29n.26s29n..28r33h34s30n31s29n29n.12p12p33h31s29n....12p33a12p28r28r26s28r12p.12p12p12p12p33h33h31r34h.12p35a12p.31r33h27s..12p12p12p......k12d12d12d12d12d12d12dk.12d12d12d12d12d12d12d.l12dk12dh12dl12d.........j.k.j.kk.j..............j...hh..h..hh....................................|640000|520000|520000|120|120|116|120|newEconomy',
// 2017-10-16T10:04:43.127392+00:00 app[web.1]:   basename1: '- Tux 2 -',
// 2017-10-16T10:04:43.127392+00:00 app[web.1]:   punkte1: '93136',
// 2017-10-16T10:04:43.127392+00:00 app[web.1]:   level1: '29.16',
// 2017-10-16T10:04:43.127393+00:00 app[web.1]:   off1: '0.00',
// 2017-10-16T10:04:43.127393+00:00 app[web.1]:   def1: '13.29',
// 2017-10-16T10:04:43.127394+00:00 app[web.1]:   repinf1: '0',
// 2017-10-16T10:04:43.127394+00:00 app[web.1]:   repveh1: '0',
// 2017-10-16T10:04:43.127394+00:00 app[web.1]:   repair1: '0',
// 2017-10-16T10:04:43.127395+00:00 app[web.1]:   repmax1: '0',
// 2017-10-16T10:04:43.127395+00:00 app[web.1]:   availrep1: '0',
// 2017-10-16T10:04:43.127396+00:00 app[web.1]:   suptype1: '',
// 2017-10-16T10:04:43.127396+00:00 app[web.1]:   suplvl1: '0',
// 2017-10-16T10:04:43.127397+00:00 app[web.1]:   cylvl1: '25',
// 2017-10-16T10:04:43.127397+00:00 app[web.1]:   dflvl1: '0',
// 2017-10-16T10:04:43.127398+00:00 app[web.1]:   dfhqlvl1: '0',
// 2017-10-16T10:04:43.127398+00:00 app[web.1]:   power1: '1769935',
// 2017-10-16T10:04:43.127398+00:00 app[web.1]:   tib1: '3729846',
// 2017-10-16T10:04:43.127399+00:00 app[web.1]:   cris1: '1708796',
// 2017-10-16T10:04:43.127399+00:00 app[web.1]:   cash1: '1037976',
// 2017-10-16T10:04:43.127400+00:00 app[web.1]:   x1: '361',
// 2017-10-16T10:04:43.127400+00:00 app[web.1]:   y1: '659',
// 2017-10-16T10:04:43.127401+00:00 app[web.1]:   opt1: 'http://cncopt.com/?map=3|N|N|- Tux 2 -|..25y28r14p24r12p12p12p..33h28r33h24r12p38a12p...25s..12p12p12p.27n30s27n..28r33h28r.27n33s27n30s.33s33h31r...27n30s33h33s33h12p....28r33h31r.......12p...12d12d12d12d12d12d12d12d..12d12dk12dlll...12dk12d13d12d12dh.jj.12d12d..h....j...h.......k...kk.....jj...j..k....................................|640000|520000|520000|120|120|116|120|newEconomy',
// 2017-10-16T10:04:43.127401+00:00 app[web.1]:   basename2: '- Tux HQ -',
// 2017-10-16T10:04:43.127402+00:00 app[web.1]:   punkte2: '244237',
// 2017-10-16T10:04:43.127402+00:00 app[web.1]:   level2: '30.17',
// 2017-10-16T10:04:43.127403+00:00 app[web.1]:   off2: '33.10',
// 2017-10-16T10:04:43.127403+00:00 app[web.1]:   def2: '13.25',
// 2017-10-16T10:04:43.127403+00:00 app[web.1]:   repinf2: '14892',
// 2017-10-16T10:04:43.127404+00:00 app[web.1]:   repveh2: '14131',
// 2017-10-16T10:04:43.127404+00:00 app[web.1]:   repair2: '29192',
// 2017-10-16T10:04:43.127405+00:00 app[web.1]:   repmax2: '280800',
// 2017-10-16T10:04:43.127406+00:00 app[web.1]:   availrep2: '266430',
// 2017-10-16T10:04:43.127406+00:00 app[web.1]:   suptype2: '',
// 2017-10-16T10:04:43.127407+00:00 app[web.1]:   suplvl2: '0',
// 2017-10-16T10:04:43.127407+00:00 app[web.1]:   cylvl2: '23',
// 2017-10-16T10:04:43.127408+00:00 app[web.1]:   dflvl2: '0',
// 2017-10-16T10:04:43.127408+00:00 app[web.1]:   dfhqlvl2: '0',
// 2017-10-16T10:04:43.127408+00:00 app[web.1]:   power2: '9942416',
// 2017-10-16T10:04:43.127409+00:00 app[web.1]:   tib2: '640000',
// 2017-10-16T10:04:43.127410+00:00 app[web.1]:   cris2: '520000',
// 2017-10-16T10:04:43.127410+00:00 app[web.1]:   cash2: '152775',
// 2017-10-16T10:04:43.127411+00:00 app[web.1]:   x2: '382',
// 2017-10-16T10:04:43.127411+00:00 app[web.1]:   y2: '663',
// 2017-10-16T10:04:43.127413+00:00 app[web.1]:   opt2: 'http://cncopt.com/?map=3|N|N|- Tux HQ -|12p12p12p12p12p12p12p23y.12p41a12p40a17p39a17p..12p12p12p12p21pc22pt36ett18p39a27pc29rt.12p12p22pc28pc.t.12p40a24pc34d.32b.31f12p12p21pc..t...........h....12d12d12d12dh.j..j12d12d12d..j.k12d12d12djj..12d12d12d12d12djj...12d12dll12dj...j.....h..j..j.l........36r36r34r...qls36v29r.......36t.32k30o33o33b30p32s.36t26t35c.30m32m34m35m34q|640000|520000|520000|120|120|116|120|newEconomy',
// 2017-10-16T10:04:43.127413+00:00 app[web.1]:   basename3: '- Tux 4 -',
// 2017-10-16T10:04:43.127414+00:00 app[web.1]:   punkte3: '87555',
// 2017-10-16T10:04:43.127414+00:00 app[web.1]:   level3: '28.77',
// 2017-10-16T10:04:43.127415+00:00 app[web.1]:   off3: '0.00',
// 2017-10-16T10:04:43.127415+00:00 app[web.1]:   def3: '13.25',
// 2017-10-16T10:04:43.127416+00:00 app[web.1]:   repinf3: '0',
// 2017-10-16T10:04:43.127416+00:00 app[web.1]:   repveh3: '0',
// 2017-10-16T10:04:43.127417+00:00 app[web.1]:   repair3: '0',
// 2017-10-16T10:04:43.127417+00:00 app[web.1]:   repmax3: '0',
// 2017-10-16T10:04:43.127418+00:00 app[web.1]:   availrep3: '0',
// 2017-10-16T10:04:43.127418+00:00 app[web.1]:   suptype3: '',
// 2017-10-16T10:04:43.127419+00:00 app[web.1]:   suplvl3: '0',
// 2017-10-16T10:04:43.127420+00:00 app[web.1]:   cylvl3: '25',
// 2017-10-16T10:04:43.127420+00:00 app[web.1]:   dflvl3: '0',
// 2017-10-16T10:04:43.127421+00:00 app[web.1]:   dfhqlvl3: '0',
// 2017-10-16T10:04:43.127421+00:00 app[web.1]:   power3: '1620104',
// 2017-10-16T10:04:43.127426+00:00 app[web.1]:   tib3: '3634934',
// 2017-10-16T10:04:43.127426+00:00 app[web.1]:   cris3: '1539209',
// 2017-10-16T10:04:43.127427+00:00 app[web.1]:   cash3: '838347',
// 2017-10-16T10:04:43.127427+00:00 app[web.1]:   x3: '363',
// 2017-10-16T10:04:43.127428+00:00 app[web.1]:   y3: '661',
// 2017-10-16T10:04:43.127429+00:00 app[web.1]:   opt3: 'http://cncopt.com/?map=3|N|N|- Tux 4 -|..25y28r28r28r31r12p...33h33h15p33h33h33h...27s27s28r31s34s31s..29n12p12p29n.28n28n..12p34a13p28r31s....12p12p12p33h33h....12p35a12p28r..c..12p12p12p.....j12d12d12d12d12d12d12d12d.hh12d12djj12d..12d12d12d12d12d12d12d.jjj.ll.l..................hlll.....h...jj........................................|640000|520000|520000|120|120|116|120|newEconomy',
// 2017-10-16T10:04:43.127429+00:00 app[web.1]:   basename4: '- Tux 5 -',
// 2017-10-16T10:04:43.127430+00:00 app[web.1]:   punkte4: '85627',
// 2017-10-16T10:04:43.127430+00:00 app[web.1]:   level4: '28.55',
// 2017-10-16T10:04:43.127431+00:00 app[web.1]:   off4: '0.00',
// 2017-10-16T10:04:43.127431+00:00 app[web.1]:   def4: '11.72',
// 2017-10-16T10:04:43.127432+00:00 app[web.1]:   repinf4: '0',
// 2017-10-16T10:04:43.127433+00:00 app[web.1]:   repveh4: '0',
// 2017-10-16T10:04:43.127433+00:00 app[web.1]:   repair4: '0',
// 2017-10-16T10:04:43.127433+00:00 app[web.1]:   repmax4: '0',
// 2017-10-16T10:04:43.127434+00:00 app[web.1]:   availrep4: '0',
// 2017-10-16T10:04:43.127434+00:00 app[web.1]:   suptype4: '',
// 2017-10-16T10:04:43.127435+00:00 app[web.1]:   suplvl4: '0',
// 2017-10-16T10:04:43.127435+00:00 app[web.1]:   cylvl4: '25',
// 2017-10-16T10:04:43.127436+00:00 app[web.1]:   dflvl4: '0',
// 2017-10-16T10:04:43.127436+00:00 app[web.1]:   dfhqlvl4: '0',
// 2017-10-16T10:04:43.127437+00:00 app[web.1]:   power4: '1530076',
// 2017-10-16T10:04:43.127437+00:00 app[web.1]:   tib4: '3089346',
// 2017-10-16T10:04:43.127438+00:00 app[web.1]:   cris4: '1795284',
// 2017-10-16T10:04:43.127438+00:00 app[web.1]:   cash4: '845102',
// 2017-10-16T10:04:43.127439+00:00 app[web.1]:   x4: '367',
// 2017-10-16T10:04:43.127439+00:00 app[web.1]:   y4: '662',
// 2017-10-16T10:04:43.127440+00:00 app[web.1]:   opt4: 'http://cncopt.com/?map=3|N|N|- Tux 5 -|....25y.......12p28r33h26s29n.12p12p12p29n31s33h28r..12p37a12p30n31s28r12p..12p12p12p12p31s33h28r29n.28r33h28r29n28r33h31s..28r33h25s....29n.25r12p.......l12d2d12d12d12d12d12d12d12d12dkk12djjj12d12dj..h...h....h..........k.l.....l....h.k.l..k.h...........................................|640000|520000|520000|120|120|116|120|newEconomy',
// 2017-10-16T10:04:43.127441+00:00 app[web.1]:   basename5: '- Tux 6 -',
// 2017-10-16T10:04:43.127441+00:00 app[web.1]:   punkte5: '94252',
// 2017-10-16T10:04:43.127442+00:00 app[web.1]:   level5: '29.39',
// 2017-10-16T10:04:43.127442+00:00 app[web.1]:   off5: '0.00',
// 2017-10-16T10:04:43.127443+00:00 app[web.1]:   def5: '0.00',
// 2017-10-16T10:04:43.127443+00:00 app[web.1]:   repinf5: '0',
// 2017-10-16T10:04:43.127444+00:00 app[web.1]:   repveh5: '0',
// 2017-10-16T10:04:43.127444+00:00 app[web.1]:   repair5: '0',
// 2017-10-16T10:04:43.127445+00:00 app[web.1]:   repmax5: '0',
// 2017-10-16T10:04:43.127446+00:00 app[web.1]:   availrep5: '0',
// 2017-10-16T10:04:43.127446+00:00 app[web.1]:   suptype5: '',
// 2017-10-16T10:04:43.127447+00:00 app[web.1]:   suplvl5: '0',
// 2017-10-16T10:04:43.127447+00:00 app[web.1]:   cylvl5: '25',
// 2017-10-16T10:04:43.127448+00:00 app[web.1]:   dflvl5: '0',
// 2017-10-16T10:04:43.127448+00:00 app[web.1]:   dfhqlvl5: '0',
// 2017-10-16T10:04:43.127449+00:00 app[web.1]:   power5: '2957780',
// 2017-10-16T10:04:43.127449+00:00 app[web.1]:   tib5: '3960874',
// 2017-10-16T10:04:43.127450+00:00 app[web.1]:   cris5: '1440460',
// 2017-10-16T10:04:43.127450+00:00 app[web.1]:   cash5: '808082',
// 2017-10-16T10:04:43.127451+00:00 app[web.1]:   x5: '388',
// 2017-10-16T10:04:43.127451+00:00 app[web.1]:   y5: '670',
// 2017-10-16T10:04:43.127457+00:00 app[web.1]:   opt5: 'http://cncopt.com/?map=3|N|N|- Tux 6 -|....25y.....29n...29n29n....23s12p28r.21s...29n27r33h33s33h27r29n29n..27r33h36s33h32s11p20s21p12p12p12p31r33h31r33h.12p39a12p37a12p....12p12p12p12p12p...............j........j..l...l..hh.....j.....j.....kk.j.jj..........lll.hh....................................|640000|520000|520000|120|120|116|120|newEconomy' }

/*


    _data_	UPDATE
    version	4.7.5
    worldId	379
    serverName	Wrath+18
    allianceId	122
    allianceName	Irrenanstalt
    count	50
    playerId0	6
    name0	SUN_FCH_65
    ro0	Member
    playerId1	12
    name1	Clix17
    ro1	Member
    playerId2	19
    name2	LordEliran
    ro2	Member
    playerId3	23
    name3	AdmiralGraafSpee
    ro3	Member
    playerId4	47
    name4	cauliflower1978
    ro4	Member
    playerId5	55
    name5	xxxRIDDICKxxxx
    ro5	Member
    playerId6	64
    name6	XL78
    ro6	Member
    playerId7	66
    name7	Timdom93
    ro7	Newbie
    playerId8	68
    name8	Barnebee
    ro8	Officer
    playerId9	74
    name9	dre84
    ro9	Member
    playerId10	85
    name10	Vespin70
    ro10	Member
    playerId11	87
    name11	AvalonAle
    ro11	Member
    playerId12	101
    name12	Daikyu80
    ro12	Leader
    playerId13	128
    name13	Diggaaa90
    ro13	Second+Commander
    playerId14	140
    name14	Monacor45
    ro14	Member
    playerId15	142
    name15	Techzhen
    ro15	Second+Commander
    playerId16	148
    name16	Beos123
    ro16	Member
    playerId17	158
    name17	odmholzitech
    ro17	Member
    playerId18	164
    name18	dummdidummdi
    ro18	Member
    playerId19	165
    name19	Losbude
    ro19	Member
    playerId20	195
    name20	oluja77
    ro20	Member
    playerId21	201
    name21	Myscara
    ro21	Member
    playerId22	226
    name22	MaxiSabsi
    ro22	Member
    playerId23	229
    name23	Dopix666
    ro23	Leader
    playerId24	323
    name24	Emeroach
    ro24	Member
    playerId25	326
    name25	WillianLin
    ro25	Member
    playerId26	349
    name26	ericnate
    ro26	Member
    playerId27	426
    name27	0Anthology0
    ro27	Member
    playerId28	434
    name28	TeejLUFC3
    ro28	Member
    playerId29	479
    name29	Partyagain
    ro29	Member
    playerId30	527
    name30	masowymord
    ro30	Member
    playerId31	540
    name31	NsemGzal
    ro31	Member
    playerId32	582
    name32	Markus036
    ro32	Second+Commander
    playerId33	605
    name33	goran2310
    ro33	Member
    playerId34	686
    name34	Beo1234
    ro34	Member
    playerId35	688
    name35	Gigantenbix
    ro35	Member
    playerId36	716
    name36	Nebula2013
    ro36	Member
    playerId37	720
    name37	leszek261
    ro37	Member
    playerId38	728
    name38	MeNoWoRe
    ro38	Member
    playerId39	842
    name39	Jimmy8511
    ro39	Member
    playerId40	896
    name40	SCHWERLAST
    ro40	Newbie
    playerId41	1066
    name41	SuperRichie66
    ro41	Member
    playerId42	1099
    name42	lalelu2711
    ro42	Inactive
    playerId43	1132
    name43	linux249
    ro43	Member
    playerId44	1256
    name44	E1drago
    ro44	Officer
    playerId45	1386
    name45	XLeGaNdRy-TaNkX
    ro45	Member
    playerId46	1553
    name46	bb_blitzkrieg
    ro46	Member
    playerId47	1821
    name47	BadDecimus
    ro47	Member
    playerId48	1897
    name48	Miko19r
    ro48	Member
    playerId49	3244
    name49	Radlermann
    ro49	Member
    currentplayerId	1132
    accountId	126671
    cic	229,101
    sc	142,128,582
    currentplayerName	linux249
    basecount	8
    fraction	2
    basekills	299
    pvekills	297
    pvpkills	2
    points	4096678
    rank	6
    hascode	true
    maxcp	300
    actcp	123
    funds	483
    schirme	1600
    RPoints	14862873288
    CreditsCount	7782842673
    timeTOmcv	6740830
    rpNeeded	35000000000
    basename0	-+Tux+1+-
    punkte0	351744
    level0	36.36
    off0	0.00
    def0	13.25
    repinf0	0
    repveh0	0
    repair0	0
    repmax0	0
    availrep0	0
    suptype0
    suplvl0	0
    cylvl0	25
    dflvl0	0
    dfhqlvl0	0
    power0	11913178
    tib0	21860028
    cris0	15605885
    cash0	4117056
    x0	465
    y0	550
    opt0	http://cncopt.com/?map=3|N|N|-+Tux+1+-|..25y..........38n.33s38n..34r41h42s38n38s38n38n.12p12p42h38s39n....12p40a12p34r35r34s34r12p.12p12p12p14p41h41h39r41h.12p42a12p.38r41h36s..12p12p12p......k12d12d12d12d12d12d12dk.12d12d12d12d12d12d12d.l12dk12dh12dl12d.........j.k.j.kk.j..............j...hh..h..hh....................................|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename1	-+Tux+2+-
    punkte1	407474
    level1	37.32
    off1	0.00
    def1	14.91
    repinf1	0
    repveh1	0
    repair1	0
    repmax1	0
    availrep1	0
    suptype1
    suplvl1	0
    cylvl1	25
    dflvl1	0
    dfhqlvl1	0
    power1	13090173
    tib1	25905006
    cris1	18457578
    cash1	3848687
    x1	466
    y1	554
    opt1	http://cncopt.com/?map=3|N|N|-+Tux+2+-|..25y34r16p28r12p12p12p..41h34r41h28r12p45a12p...34s..13p13p12p.39n38s39n..34r41h34r.39n43s39n40s.41s41h37r...39n39s41h41s41h12p....34r41h37r.......12p....13q13s.13z13q13s12q...13qk13zlll...13qk13q13q12q.h.jj13s13z13s12q.h.13q13z13qj13q12z12qh.13q13q13s13q13s12qk..13qkk13z13q12q..jj13q13q13qj12q.k....................................|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename2	-+Tux+HQ+-
    punkte2	1554793
    level2	40.71
    off2	43.15
    def2	13.25
    repinf2	18981
    repveh2	13985
    repair2	40646
    repmax2	216000
    availrep2	64105
    suptype2
    suplvl2	0
    cylvl2	25
    dflvl2	0
    dfhqlvl2	0
    power2	113403546
    tib2	7200000
    cris2	5800000
    cash2	2509375
    x2	472
    y2	543
    opt2	http://cncopt.com/?map=3|N|N|-+Tux+HQ+-|21p21p21p21p21p21p21p25y.21p52a21p51a24p50a24p..21p21p21p21p27pc27pt21ptt24p50a34pc39rt38r21p21p27pc34pc.t.21p51a31pc44d.40b.40f21p21p27pc..t......46e....h....12d12d12d12dh.j..j12d12d12d..j.k12d12d12djj..12d12d12d12d12djj...12d12dll12dj...j.....h..j..j.l........45l46r45r...pql46v43r41r......46t..41o40a41b36p41s.46t43c...42m43m45m41q|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename3	-+Tux+4+-
    punkte3	381206
    level3	36.90
    off3	0.00
    def3	13.25
    repinf3	0
    repveh3	0
    repair3	0
    repmax3	0
    availrep3	0
    suptype3
    suplvl3	0
    cylvl3	25
    dflvl3	0
    dfhqlvl3	0
    power3	11917135
    tib3	26865679
    cris3	14731593
    cash3	3877157
    x3	467
    y3	549
    opt3	http://cncopt.com/?map=3|N|N|-+Tux+4+-|..25y34r35r35r38r12p...41h42h16p41h41h41h...34s35s35r40s43s40s..39n12p12p39n.39n39n..12p40a13p35r40s....12p12p12p41h42h....12p42a12p35r..c..12p12p12p.....j12d12d12d12d12d12d12d12d.hh12d12djj12d..12d12d12d12d12d12d12d.jjj.ll.l..................hlll.....h...jj........................................|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename4	-+Tux+5+-
    punkte4	344613
    level4	36.22
    off4	0.00
    def4	11.72
    repinf4	0
    repveh4	0
    repair4	0
    repmax4	0
    availrep4	0
    suptype4
    suplvl4	0
    cylvl4	25
    dflvl4	0
    dfhqlvl4	0
    power4	11946257
    tib4	22635263
    cris4	15042190
    cash4	2584340
    x4	484
    y4	555
    opt4	http://cncopt.com/?map=3|N|N|-+Tux+5+-|....25y.......12p33r42h33s38n.12p12p18p38n39s42h33r..12p44a18p38n39s33r12p..12p12p18p12p39s41h33r39n.33r41h33r39n34r41h38s..33r41h33s....39n.27r12p.......l12d2d12d12d12d12d12d12d12d12dkk12djjj12d12dj..h...h....h..........k.l.....l....h.k.l..k.h...........................................|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename5	-+Tux+6+-
    punkte5	423164
    level5	37.61
    off5	0.00
    def5	0.00
    repinf5	0
    repveh5	0
    repair5	0
    repmax5	0
    availrep5	0
    suptype5
    suplvl5	0
    cylvl5	25
    dflvl5	0
    dfhqlvl5	0
    power5	14563911
    tib5	30926621
    cris5	15557452
    cash5	4402433
    x5	486
    y5	556
    opt5	http://cncopt.com/?map=3|N|N|-+Tux+6+-|....25y.....39n...39n39n....35s12p35r.39s...39n35r41h42s41h35r39n39n..35r41h45s41h43s14p36s21p12p12p12p38r42h39r41h.12p44a12p42a12p....12p12p12p12p12p...............j........j..l...l..hh.....j.....j.....kk.j.jj..........lll.hh....................................|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename6	-+Tux+7+-
    punkte6	384387
    level6	37.04
    off6	0.00
    def6	0.00
    repinf6	0
    repveh6	0
    repair6	0
    repmax6	0
    availrep6	0
    suptype6
    suplvl6	0
    cylvl6	25
    dflvl6	0
    dfhqlvl6	0
    power6	12501913
    tib6	26579509
    cris6	17719793
    cash6	2194453
    x6	478
    y6	540
    opt6	http://cncopt.com/?map=3|N|N|-+Tux+7+-|..34r25y35r.....42h42h14p41h41h14p....39s42s39s35r35r41h...39n39n39n..24s...40s43s.34s38n....41h41h14p14p38n14p14p...34r14p42a14p42a14p....14p14p14p14p14p........j...hhh.....k......j..ll.kkkj.........ll...ll.........h....h........................................|7200000|5800000|7200000|168|168|168|164|newEconomy
    basename7	-+Tux+8+-
    punkte7	249297
    level7	34.85
    off7	0.00
    def7	0.00
    repinf7	0
    repveh7	0
    repair7	0
    repmax7	0
    availrep7	0
    suptype7
    suplvl7	0
    cylvl7	25
    dflvl7	0
    dfhqlvl7	0
    power7	15566820
    tib7	23082116
    cris7	6897077
    cash7	81062
    x7	481
    y7	553
opt7	http://cncopt.com/?map=3|N|N|-+Tux+8+-|...25y20p20p20p20p20p...20s24n44a20p44a20p..40h20r20p20p20p24n20p.30s30s30s20r20r20r20s..28n28n28n.41h40h...30s30s30s35s40s40s...41h.40h.40h41h...................jhh..k.h.j...l..h.....l...llkk..........j........j.ll.....j.........................................|7200000|5800000|7200000|168|168|168|164|newEconomy
 */
