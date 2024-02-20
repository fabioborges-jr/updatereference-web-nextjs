import { Reference } from '@/types/Reference'
import puppeteer, { Browser, Page } from 'puppeteer'

export default class Scraper {
  browser?: Browser
  page?: Page
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
        const description = await this.page?.$$eval(
          '.description',
          (descriptions) =>
            descriptions.map((description) => description.textContent),
        )

        const published = await this.page?.$$eval(
          '::-p-text(Publicado em)',
          (publishedItems) =>
            publishedItems.map((publishedItem) => publishedItem.textContent),
        )
        console.log(Date.now(), 'filesHref', filesHref)
        this.referencesList = filesHref?.map((fileHref, index) => {
          if (fileHref && description && published) {
            const reference: Reference = {
              state: fileHref.slice(94, 96),
              description: description[index],
              published: published[index],
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
