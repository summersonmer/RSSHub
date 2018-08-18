const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const config = require('../../config');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'https://http://www.yingjiesheng.com/commend-fulltime-2.html',
        headers: {
            'User-Agent': config.ua,
            Referer: 'http://www.yingjiesheng.com',
        },
    });
