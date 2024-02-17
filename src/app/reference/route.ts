import puppeteer, { Page } from 'puppeteer'

type url = {
  sinapi: string
  sudecap: string
  setop: string
  sicro: string
}

const url = {
  sinapi: process.env.SINAPI_URL,
  sudecap: process.env.SINAPI_URL,
  setop: process.env.SINAPI_URL,
  sicro: process.env.SINAPI_URL,
}

async function getListSinapiAllStates(page: Page) {
  if (url.sinapi) await page.goto(url.sinapi)
  await page.waitForSelector('::-p-text("SINAPI – a partir Jul/2009")')
  const listSinapiAllStates = await page.$$eval(
    '::-p-text("SINAPI – a partir Jul/2009")',
    (references) => {
      return references.map((reference) => reference.textContent)
    },
  )
  return listSinapiAllStates
}

export async function GET() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const gettedListSinapiAllStates = await getListSinapiAllStates(page)

  // listSinapiAllStates.map(async (stateSinapi) => {
  //   if (stateSinapi) {
  //     await page.click(stateSinapi)
  //     await page.waitForSelector('#btncategoria_639')
  //     const listSinapiState = await page.$$eval(
  //       '::p-text("SINAPI_ref_Insumos_Composicoes_AC")',
  //       (monthsState) => {
  //         return monthsState.map((monthState) => monthState.textContent)
  //       },
  //     )
  //   }
  // })
  return Response.json(gettedListSinapiAllStates)
}
