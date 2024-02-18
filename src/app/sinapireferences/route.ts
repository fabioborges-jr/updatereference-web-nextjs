import puppeteer, { Page } from 'puppeteer'
import fs from 'fs'

let sinapiHrefList: (string | null)[] = []

async function clickAcceptCookie(page: Page) {
  await page.waitForSelector('#adopt-accept-all-button')
  await page.click('#adopt-accept-all-button')
}

async function getAllElementsList(page: Page) {
  await page.waitForSelector('::-p-text(SINAPI – a partir Jul/2009)')
  const statesSelectors = await page.$$eval(
    '::-p-text(SINAPI – a partir Jul/2009)',
    (states) => states.map((state) => state.id),
  )
  for (const state of statesSelectors) {
    await page.click(`#${state}`)
    await getAllAElements(page)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

async function getAllAElements(page: Page) {
  await page.waitForSelector('::-p-text(SINAPI_ref_Insumos_Composicoes)')
  sinapiHrefList = await page.$$eval(
    '::-p-text(SINAPI_ref_Insumos_Composicoes)',
    (stateFilesElements) =>
      stateFilesElements.map((stateFileElement) =>
        stateFileElement.getAttribute('href'),
      ),
  )
}

export async function GET() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  if (process.env.SINAPI_URL) await page.goto(process.env.SINAPI_URL)
  await clickAcceptCookie(page)
  await getAllElementsList(page)
  const content = await sinapiHrefList.join('\n')
  fs.writeFile('sinapi.txt', content, 'utf-8', (error) => console.error(error))

  return Response.json('Sinapi works!')
}
