const { TaClient } = require('@cncta/client');

const sessionID = '0d3a2010-9402-489e-ab8c-9e10b0a7b16c'
async function start() {

    // todo request sessionID via tradition al login
    console.log('start');
    const client = TaClient.fromSessionId(sessionID);
    console.log('client', client);
    /** Login and open a world instance */
    const world = await client.open(286);
    console.log(world);

    const player = await world.player;
    console.log(player.Name);

    // todo generate a token with username, email und token value
    const username = 'test user name'
    const token = 'nob23u45g234ou'
    const message = `Hi ${username},

    to connect your ingame account to your cnc-eco account please click this link:
    [url]cnc-eco.de/user?token=${token}[/url]

    for any problems please use github issue?

    Regards,
    cnc-eco.de`
    await world.sendMail('linux249', 'cnc-eco: add account request', message);

}

start()
