import Reference from '@/components/Reference/Reference'
import { promises as fs } from 'fs'

export default async function Home() {
  const dataFile = (await fs.readFile('src/data/sinapi.txt', 'utf-8')).split(
    '\n',
  )

  return <Reference data={dataFile} />
}
