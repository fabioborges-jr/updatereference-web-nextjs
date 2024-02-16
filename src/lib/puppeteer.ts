import puppeteer from 'puppeteer'

export async function searchElements() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await browser.close()
}
