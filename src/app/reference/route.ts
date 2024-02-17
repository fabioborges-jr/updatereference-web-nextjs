import puppeteer from 'puppeteer'

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

export async function GET() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  if (url.sinapi) {
    await page.goto(url.sinapi)
    const content = await page.$$eval(
      '::-p-text("SINAPI – a partir Jul/2009")',
      (references) => {
        return references.map((reference) => reference.textContent)
      },
    )
    // const content = await page.content()
    browser.close()
    return Response.json(content)
  }
}
