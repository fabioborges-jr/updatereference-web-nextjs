import fs from 'fs'
import ScraperSinapi from '@/class/ScraperSinapi'

export async function GET() {
  const scraper = new ScraperSinapi()
  await scraper.init()
  await scraper.clickAcceptCookie()
  const list = JSON.stringify(await scraper.getAllFilesHref())

  fs.writeFile('src/data/sinapi.txt', list, 'utf-8', (error) => {
    if (error) throw error
  })

  return Response.json('Sinapi works!')
}
