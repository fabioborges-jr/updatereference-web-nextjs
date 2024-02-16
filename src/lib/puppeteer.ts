import puppeteer from 'puppeteer'

async function openPage() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await browser.close()
}
