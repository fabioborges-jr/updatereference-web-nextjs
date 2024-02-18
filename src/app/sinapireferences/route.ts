import puppeteer, { Page } from 'puppeteer'

type Url = {
  sinapi?: string
  sudecap?: string
  setop?: string
  sicro?: string
}

const url: Url = {
  sinapi: process.env.SINAPI_URL,
  sudecap: process.env.SINAPI_URL,
  setop: process.env.SINAPI_URL,
  sicro: process.env.SINAPI_URL,
}

let sinapiHrefList: (string | null)[] = []

async function clickAcceptCookie(page: Page) {
  await page.waitForSelector('#adopt-accept-all-button')
  await page.click('#adopt-accept-all-button')
}

async function clickAllSinapiState(page: Page) {
  await page.waitForSelector('::-p-text(SINAPI – a partir Jul/2009)')
  const statesSelectors = await page.$$eval(
    '::-p-text(SINAPI – a partir Jul/2009)',
    (states) => states.map((state) => state.id),
  )
  for (const state of statesSelectors) {
    await page.click(`#${state}`)
    await getAllAElements(page)
    await new Promise((resolve) => setTimeout(resolve, 1500))
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
  if (url.sinapi) await page.goto(url.sinapi)
  await clickAcceptCookie(page)
  await clickAllSinapiState(page)

  return Response.json(sinapiHrefList)
}
