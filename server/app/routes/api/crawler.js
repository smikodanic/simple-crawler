const os = require('os');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const crawledData_model = require('../../models/crawledData');


const devices = require('puppeteer/DeviceDescriptors');
const devicesExpanded = [
  {
    name: 'Desktop 1920x1080',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1920,
      height: 1080
    }
  },
  {
    name: 'Desktop 1920x1080',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
    viewport: {
      width: 1920,
      height: 1080
    }
  },
  {
    name: 'Desktop 1024x768',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1024,
      height: 768
    }
  },
  {
    name: 'Laptop 1280x800',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1280,
      height: 800
    }
  },
  devices['iPad'],
  devices['iPad landscape']
];
const device = devicesExpanded[0];



// define chrome executable path
const osPlatform = os.platform(); //Possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
console.log('\nScraper running on platform: ', osPlatform);
let executablePath;
if (/^win/i.test(osPlatform)) {
  executablePath = '';
} else if (/^linux/i.test(osPlatform)) {
  executablePath = '/usr/bin/google-chrome';
}


/*** START CRAWLER */
module.exports.start = async (req, res, next) => {
  const url = req.body.url;

  const pConfig = {
    executablePath: executablePath,
    headless: false,
    devtools: false,  // Open Chrome devtools at the beginning of the test
    dumpio: false,
    slowMo: 25,  // Wait 250 ms each step of execution, for example chars typing
    args: ['--ash-host-window-bounds=1350x1100', '--window-size=1350,1100', '--window-position=700,20']
  };
  const browser = await puppeteer.launch(pConfig);

  try {
    const page = await browser.newPage();
    page.emulate(device);
    await page.bringToFront();
    await page.setViewport({width: 1350, height: 1100});
    await page.goto(url);
    await new Promise(resolve => setTimeout(resolve, 1300));

    // extract URL data
    const bodyHTML = await page.evaluate(() => {
      return document.body.innerHTML; // extract HTML
    });

    const $ = cheerio.load(bodyHTML);
    const h1 = $('h1').text();
    const h2 = $('h2').text();
    const h3 = $('h3').text();

    // extract link hrefs
    const links = [];
    $('a').each((ind, elem) => {
      const url_a = $(elem).attr('href');
      links.push(url_a);
    });


    const jsonResp = {url, h1, h2, h3, links};
    console.log(jsonResp);
    res.json(jsonResp);

    await crawledData_model.add(jsonResp);

    await new Promise(resolve => setTimeout(resolve, 3400));
    browser.close();

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    browser.close();
  }

};





/*** GET DATA */
module.exports.getdata = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const sort = req.query.sort;

  crawledData_model.list({}, limit, skip, sort)
    .then(results => res.json(results))
    .catch(next);
};
