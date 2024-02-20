import puppeteer, { Browser, Page } from 'puppeteer'
import fs from 'fs'

type Scraper={
  browser: Browser|null
  page: Page|null
  filesHref:(string|null)[]|undefined
  reference:{
    state:string|undefined,
    month:string|undefined,
    year:string|undefined,
    href:string|undefined,
  }
  referencesList:{
    state:string|undefined,
    month:string|undefined,
    year:string|undefined,
    href:string|undefined,
  }[]|undefined
  init():Promise<void>
  clickAcceptCookie():Promise<void>
  getAllFilesHref():Promise<(string | null)[] | undefined>
}

function Scraper(this:Scraper){
  this.browser
  this.page
  this.filesHref
  this.reference

  this.init = async() => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    if (process.env.SINAPI_URL) await page.goto(process.env.SINAPI_URL)
  }

  this.clickAcceptCookie = async()=>{
    await this.page?.waitForSelector('#adopt-accept-all-button')
    await this.page?.click('#adopt-accept-all-button')
  }

  this.getAllFilesHref = async()=>{
    await this.page?.waitForSelector('::-p-text(SINAPI – a partir Jul/2009)')
    const statesSelectors = await this.page?.$$eval(
      '::-p-text(SINAPI – a partir Jul/2009)',
      (states) => states.map((state) => state.id),
    )

    if (statesSelectors)
    for (const state of statesSelectors) {
      await this.page?.click(`#${state}`)
      await this.page?.waitForSelector('::-p-text(SINAPI_ref_Insumos_Composicoes)')
      this.filesHref = await this.page?.$$eval(
        '::-p-text(SINAPI_ref_Insumos_Composicoes)',
        (stateFilesElements) =>
          stateFilesElements.map((stateFileElement) =>
            stateFileElement.getAttribute('href'),
          ),
      )
      this.referencesList?.push(this.filesHref?.map(href=>{
        this.reference={
          state:href?.slice(94,95),
          month:href?.slice(101,102),
          year:href?.slice(97,100),
          href:href?
        }
      }))
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    return this.referencesList

    
  }

}



export async function GET() {

  content.
  content.join("\n")
  if (typeof content=="string"){
    fs.writeFile('sinapi.txt', content, 'utf-8', (error) => console.error(error))
  }

  return Response.json('Sinapi works!')
}
