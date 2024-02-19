import Reference from '@/components/Reference/Reference'
import { promises as fs } from 'fs'

export default async function Home() {
  const dataFile = (await fs.readFile('src/data/sinapi.txt', 'utf-8')).split(
    '\n',
  )

  return (
  <>
    <h1>Referências atualizadas</h1>
    <div className='container flex bg-orange-200'>
      <Reference data={dataFile} />
      <Reference data={dataFile} />
      <Reference data={dataFile} />
      <Reference data={dataFile} />
    </div>
  </>
  )
}
