// key:name
export const map = {};

/* GDI Defense Units */
const gdi = {
    GDI_Wall: 'w',
    GDI_Cannon: 'c',
    'GDI_Antitank Barrier': 't',
    GDI_Barbwire: 'b',
    GDI_Turret: 'm',
    GDI_Flak: 'f',
    'GDI_Art Inf': 'r',
    'GDI_Art Air': 'e',
    'GDI_Art Tank': 'a',
    'GDI_Def_APC Guardian': 'g',
    'GDI_Def_Missile Squad': 'q',
    GDI_Def_Pitbull: 'p',
    GDI_Def_Predator: 'd',
    GDI_Def_Sniper: 's',
    'GDI_Def_Zone Trooper': 'z',
};

/* Nod Defense Units */
const nod = {
    'NOD_Def_Antitank Barrier': 't',
    'NOD_Def_Art Air': 'e',
    'NOD_Def_Art Inf': 'r',
    'NOD_Def_Art Tank': 'a',
    'NOD_Def_Attack Bike': 'p',
    NOD_Def_Barbwire: 'b',
    'NOD_Def_Black Hand': 'z',
    NOD_Def_Cannon: 'c',
    NOD_Def_Confessor: 's',
    NOD_Def_Flak: 'f',
    'NOD_Def_MG Nest': 'm',
    'NOD_Def_Militant Rocket Soldiers': 'q',
    NOD_Def_Reckoner: 'g',
    'NOD_Def_Scorpion Tank': 'd',
    NOD_Def_Wall: 'w',
};
/* Forgotten Defense Units */
const forg = {
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
};
const keymap = {
    /* GDI Buildings */
    GDI_Accumulator: 'a',
    GDI_Refinery: 'r',
    'GDI_Trade Center': 'u',
    GDI_Silo: 's',
    'GDI_Power Plant': 'p',
    'GDI_Construction Yard': 'y',
    GDI_Airport: 'd',
    GDI_Barracks: 'b',
    GDI_Factory: 'f',
    'GDI_Defense HQ': 'q',
    'GDI_Defense Facility': 'w',
    'GDI_Command Center': 'e',
    GDI_Support_Art: 'z',
    GDI_Support_Air: 'x',
    GDI_Support_Ion: 'i',

    /* Forgotten Buildings */
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

    /* Nod Buildings */
    NOD_Refinery: 'r',
    'NOD_Power Plant': 'p',
    NOD_Harvester: 'h',
    'NOD_Construction Yard': 'y',
    NOD_Airport: 'd',
    'NOD_Trade Center': 'u',
    'NOD_Defense HQ': 'q',
    NOD_Barracks: 'b',
    NOD_Silo: 's',
    NOD_Factory: 'f',
    NOD_Harvester_Crystal: 'n',
    'NOD_Command Post': 'e',
    NOD_Support_Art: 'z',
    NOD_Support_Ion: 'i',
    NOD_Accumulator: 'a',
    NOD_Support_Air: 'x',
    'NOD_Defense Facility': 'w',
    //"NOD_Tech Lab": "",
    //"NOD_Recruitment Hub": "X",
    //"NOD_Temple of Nod": "X",

    /* GDI Offense Units */
    'GDI_APC Guardian': 'g',
    GDI_Commando: 'c',
    GDI_Firehawk: 'f',
    GDI_Juggernaut: 'j',
    GDI_Kodiak: 'k',
    GDI_Mammoth: 'm',
    'GDI_Missile Squad': 'q',
    GDI_Orca: 'o',
    GDI_Paladin: 'a',
    GDI_Pitbull: 'p',
    GDI_Predator: 'd',
    GDI_Riflemen: 'r',
    'GDI_Sniper Team': 's',
    'GDI_Zone Trooper': 'z',

    /* Nod Offense Units */
    'NOD_Attack Bike': 'b',
    NOD_Avatar: 'a',
    'NOD_Black Hand': 'z',
    NOD_Cobra: 'r',
    NOD_Commando: 'c',
    NOD_Confessor: 's',
    'NOD_Militant Rocket Soldiers': 'q',
    NOD_Militants: 'm',
    NOD_Reckoner: 'k',
    NOD_Salamander: 'l',
    'NOD_Scorpion Tank': 'o',
    'NOD_Specter Artilery': 'p',
    NOD_Venom: 'v',
    NOD_Vertigo: 't',
};

const defense_unit_map = {
    /* GDI Defense Units */
    GDI_Wall: 'w',
    GDI_Cannon: 'c',
    'GDI_Antitank Barrier': 't',
    GDI_Barbwire: 'b',
    GDI_Turret: 'm',
    GDI_Flak: 'f',
    'GDI_Art Inf': 'r',
    'GDI_Art Air': 'e',
    'GDI_Art Tank': 'a',
    'GDI_Def_APC Guardian': 'g',
    'GDI_Def_Missile Squad': 'q',
    GDI_Def_Pitbull: 'p',
    GDI_Def_Predator: 'd',
    GDI_Def_Sniper: 's',
    'GDI_Def_Zone Trooper': 'z',
    /* Nod Defense Units */
    'NOD_Def_Antitank Barrier': 't',
    'NOD_Def_Art Air': 'e',
    'NOD_Def_Art Inf': 'r',
    'NOD_Def_Art Tank': 'a',
    'NOD_Def_Attack Bike': 'p',
    NOD_Def_Barbwire: 'b',
    'NOD_Def_Black Hand': 'z',
    NOD_Def_Cannon: 'c',
    NOD_Def_Confessor: 's',
    NOD_Def_Flak: 'f',
    'NOD_Def_MG Nest': 'm',
    'NOD_Def_Militant Rocket Soldiers': 'q',
    NOD_Def_Reckoner: 'g',
    'NOD_Def_Scorpion Tank': 'd',
    NOD_Def_Wall: 'w',

    /* Forgotten Defense Units */
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
    '': '',
};

const offense_unit_map = {
    /* GDI Offense Units */
    'GDI_APC Guardian': 'g',
    GDI_Commando: 'c',
    GDI_Firehawk: 'f',
    GDI_Juggernaut: 'j',
    GDI_Kodiak: 'k',
    GDI_Mammoth: 'm',
    'GDI_Missile Squad': 'q',
    GDI_Orca: 'o',
    GDI_Paladin: 'a',
    GDI_Pitbull: 'p',
    GDI_Predator: 'd',
    GDI_Riflemen: 'r',
    'GDI_Sniper Team': 's',
    'GDI_Zone Trooper': 'z',

    /* Nod Offense Units */
    'NOD_Attack Bike': 'b',
    NOD_Avatar: 'a',
    'NOD_Black Hand': 'z',
    NOD_Cobra: 'r',
    NOD_Commando: 'c',
    NOD_Confessor: 's',
    'NOD_Militant Rocket Soldiers': 'q',
    NOD_Militants: 'm',
    NOD_Reckoner: 'k',
    NOD_Salamander: 'l',
    'NOD_Scorpion Tank': 'o',
    'NOD_Specter Artilery': 'p',
    NOD_Venom: 'v',
    NOD_Vertigo: 't',
};