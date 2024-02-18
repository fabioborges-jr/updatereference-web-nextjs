import puppeteer, { Page } from 'puppeteer'

type url = {
  sinapi?: string
  sudecap?: string
  setop?: string
  sicro?: string
}

const url: url = {
  sinapi: process.env.SINAPI_URL,
  sudecap: process.env.SINAPI_URL,
  setop: process.env.SINAPI_URL,
  sicro: process.env.SINAPI_URL,
}

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
  }
  console.log(`A quantidade de elementos é: ${statesSelectors}`)
  const contentPage = await page.content()
  return contentPage
}

async function getAllAElements(page: Page) {
  await page.waitForSelector('::-p-text(SINAPI_ref_Insumos_Composicoes)')
}

export async function GET() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.caixa.gov.br/site/Paginas/downloads.aspx')
  await clickAcceptCookie(page)
  const listSinapiAC = await clickAllSinapiState(page)

  return Response.json(listSinapiAC)
}
