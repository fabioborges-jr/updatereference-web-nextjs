import puppeteer from 'puppeteer'

const Url = {
  sinapi: process.env.SINAPI_URL,
  sudecap: process.env.SINAPI_URL,
  setop: process.env.SINAPI_URL,
  sicro: process.env.SINAPI_URL,
}

export async function searchElements() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await browser.close()
}
