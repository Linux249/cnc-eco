//const mongoose = require('mongoose');
import UrlShorten from '../model/UrlShorten';
import { Router } from 'express';

const router = Router();
const shortid = require('shortid');
const shortUrl = 'www.cnc-eco.de/s';

//GET API for redirecting to Original URL
router.get('/urlToBase/:code', async (req, res, next) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
        return res.json(item);
    } else {
        next(new Error('wrong URL'));
    }
});

//POST API for creating short url from Original URL
router.post('/baseToUrl', async (req, res) => {
    const { url } = req.body;
    const { faction, name } = req.body;
    if (!faction || !name || !url) return res.status(402).json('Missing name or faction');
    // todo test the url

    const urlCode = shortid.generate();

    // TODO build own id for
    try {
        const item = await UrlShorten.findOne({ url: url });
        if (item) {
            console.log('find old one');
            res.status(200).json(item);
        } else {
            const item = new UrlShorten({
                url: url,
                shortUrl: shortUrl + '/' + urlCode,
                urlCode,
                faction,
                name
            });
            await item.save();
            console.log('saved new one');
            console.log(item)
            res.status(200).json(item);
        }
    } catch (err) {
        console.log('error');
        console.log(err);
        res.status(405).json(err);
    }

    // TODO if player premium, save the url to his account
});

export default router;
