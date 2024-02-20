import puppeteer, { Browser, Page } from 'puppeteer'
import fs from 'fs'

interface Scraper{
  browser: Browser|null
  page: Page|null
  referencesList:({
    state:string,
    month:string,
    year:string,
    href:string,
  }|undefined)[]|undefined
  init():Promise<void>
  clickAcceptCookie():Promise<void>
  getAllFilesHref():Promise<({ state: string; month: string; year: string; href: string; } | undefined)[] | undefined>
}

class Scraper(){
  this.browser:null
  this.page:null
  this.referencesList:[]

  this.init = async() => {
    this.browser = await puppeteer.launch({ headless: false })
    this.page = await this.browser.newPage()
    if (process.env.SINAPI_URL) await this.page.goto(process.env.SINAPI_URL)
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
      const filesHref = await this.page?.$$eval(
        '::-p-text(SINAPI_ref_Insumos_Composicoes)',
        (stateFilesElements) =>
          stateFilesElements.map((stateFileElement) =>
            stateFileElement.getAttribute('href'),
          ),
      )
      this.referencesList=filesHref?.map((fileHref)=>{
        if(typeof fileHref=="string"){
          const reference={
            state:fileHref.slice(94,95),
            month:fileHref.slice(101,102),
            year:fileHref.slice(97,100),
            href:fileHref
          }
          return reference
        }
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    return this.referencesList
  }
}

export async function GET() {
  const scraper=new Scraper:Scraper()
  content.join("\n")
  if (typeof content=="string"){
    fs.writeFile('sinapi.txt', content, 'utf-8', (error) => console.error(error))
  }

  return Response.json('Sinapi works!')
}
