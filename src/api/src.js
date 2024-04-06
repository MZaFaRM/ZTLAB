// const puppeteer = require('puppeteer');

const api = async () => {
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  // await page.goto('https://kmctce.etlab.app');
  return null;
};

const updateHeaders = (headerName, headerValue) => {
  api.defaults.headers.common[headerName] = headerValue;
};

export {api, updateHeaders};
