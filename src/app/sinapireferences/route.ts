import puppeteer, { Browser, Page } from 'puppeteer'
import fs from 'fs'

type Reference = {
  state: string
  month: string
  year: string
  href: string
}

class Scraper {
  browser?: Browser | null
  page?: Page | null
  referencesList?: (Reference | undefined)[] | undefined

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: true })
    this.page = await this.browser.newPage()
    if (process.env.SINAPI_URL) await this.page.goto(process.env.SINAPI_URL)
  }

  async clickAcceptCookie(): Promise<void> {
    await this.page?.waitForSelector('#adopt-accept-all-button')
    await this.page?.click('#adopt-accept-all-button')
  }

  async getAllFilesHref(): Promise<(Reference | undefined)[] | undefined> {
    await this.page?.waitForSelector('::-p-text(SINAPI – a partir Jul/2009)')
    const statesSelectors = await this.page?.$$eval(
      '::-p-text(SINAPI – a partir Jul/2009)',
      (states) => states.map((state) => state.id),
    )

    if (statesSelectors)
      for (const state of statesSelectors) {
        await this.page?.click(`#${state}`)
        await this.page?.waitForSelector(
          '::-p-text(SINAPI_ref_Insumos_Composicoes)',
        )
        const filesHref = await this.page?.$$eval(
          '::-p-text(SINAPI_ref_Insumos_Composicoes)',
          (stateFilesElements) =>
            stateFilesElements.map((stateFileElement) =>
              stateFileElement.getAttribute('href'),
            ),
        )
        console.log(Date.now(), 'filesHref', filesHref)
        this.referencesList = filesHref?.map((fileHref) => {
          if (typeof fileHref === 'string') {
            const reference: Reference = {
              state: fileHref.slice(94, 95),
              month: fileHref.slice(101, 102),
              year: fileHref.slice(97, 100),
              href: fileHref,
            }
            console.log(Date.now(), 'reference:', reference)
            return reference
          }
          return undefined
        })
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    console.log('referenceList:', this.referencesList)
    return this.referencesList
  }
}

export async function GET() {
  const scraper = new Scraper()
  await scraper.init()
  await scraper.clickAcceptCookie()
  const list = JSON.stringify(await scraper.getAllFilesHref())

  fs.writeFile('src/data/sinapi.txt', list, 'utf-8', (error) =>
    console.error(error),
  )

  return Response.json('Sinapi works!')
}
