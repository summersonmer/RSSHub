const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const config = require('../../config');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'http://www.yingjiesheng.com/commend-fulltime-2.html',
        headers: {
            'User-Agent': config.ua,
        },
    });

    const data = response.data;

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
                        description: `titel：${item.find('a').text()}<br>href：${item.find('a').attr('href')}<br><img referrerpolicy="no-referrer" src="https:${item.find('.img-blur').data('echo')}">`,
                        pubDate: new Date(item.find('.time').data('shared-at')).toUTCString(),
                        link: `https://www.jianshu.com${item.find('.title').attr('href')}`,
                    };
                })
                .get(),
    };
};
