const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const config = require('../../config');
const iconv = require("iconv-lite");

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'http://www.yingjiesheng.com/commend-fulltime-2.html',
        headers: {
            'User-Agent': config.ua,
        },
    });

    const data = iconv.decode(response.data,'GBK');

    const $ = cheerio.load(data);
    const list = $('.jobList tr');

    ctx.state.data = {
        title: '应届生',
        link: 'http://www.yingjiesheng.com/commend-fulltime-2.html',
        description: $('meta[name="description"]').attr('content'),
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('.title').text(),
                        description: `titel：${item.find('a').text()}<br><img referrerpolicy="no-referrer" src="https:${item.find('.img-blur').data('echo')}">`,
                        pubDate: new Date(item.find('.time').data('shared-at')).toUTCString(),
                        link: `${item.find('a').attr('href')}`,
                    };
                })
                .get(),
    };
};
