const puppeteer = require('puppeteer');

/**
 * example for connecting to game and world overview side
 * using the game client doesn't work cause it is not documented how to use it
 */
(async function() {
    console.log('start');
    const browser = await puppeteer.launch({ headless: false }); // default is true
    const page = await browser.newPage();
    console.log('page');


    const worldOverviewURL = 'https://gamecdnorigin.alliances.commandandconquer.com/WebWorldBrowser/index.aspx';
    const gameURL = 'https://cncapp03.alliances.commandandconquer.com/286/index.aspx?langPreferred=de_DE';
    page.once('load', () => console.log('PAGE loaded!'));

    page.on('response', response => {
        const status = response.status();
        const headers = response.headers();
        const cookies = response.cookies;
        if ((status >= 300) && (status <= 399)) {
            console.log(`Redirect ${status} .---------------------.`);
            const from = response.url();
            console.log('from', from);
            const to = response.headers()['location'];
            console.log('to', to);
            console.log('cookies', cookies);
        } else if (status === 200) {
            console.log('response', status, cookies);
        } else console.warn('unhandled response', status);

    });

    await page.setCookie({
        'name': 'sessionId',
        'value': '0d3a2010-9402-489e-ab8c-9e10b0a7b16c',
        domain: '.alliances.commandandconquer.com',
        httpOnly: true,
    },{
        'name': 'sid',
        'value': 'U3VJU2pCYmkxNWJOcDc4MHRsUTJCMU8wc2twNGFUekI3ZjlBcnM3YzFRdWFUSG5qZEtKTlY4VTRockpkVA',
        domain: '.alliances.commandandconquer.com',
        httpOnly: true,
    },
    );
    const response = await page.goto(gameURL);

//    const cookiesSet = await page.cookies(url);
//    console.log({ cookiesSet });


    const chain = response.request().redirectChain();
    console.log(chain.length); // 1
    // console.log(chain); // 'http://example.com'


    await page.waitForTimeout(2000);
    // const input = await page.waitForSelector('email');
    // console.log({ input });


    const worlds = await page.$$('.qx-button-world');
    console.log('worlds', worlds.length);
    worlds[0] && await worlds[0].click();
    // await page.evaluate(() => worlds[0].click())
    // worlds.forEach(async link => {
    //     await page.evaluate(() => link.click())
    // })


    await page.screenshot({ path: 'example.png' });

    const dimensions = await page.evaluate(async (e) => {
        console.log('evaluate', e);
        console.log('doc', { document });
        // const email = document.getElementById('email-login-panel')
        // const email = document.getElementById('email');
        // console.log(email);
        let elements = document.getElementsByClassName('qx-button-world');

        console.log({ elements });

        elements[0] && await elements[0].click();

        return {
            // test: email,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        };
    });

    console.log('Dimensions:', dimensions);

    // await browser.close();
})();
