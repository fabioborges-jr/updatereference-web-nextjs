import Reference from '@/components/Reference/Reference'
import { promises as fs } from 'fs'

export default async function Home() {
  const sinapiFile = (await fs.readFile('src/data/sinapi.txt', 'utf-8')).split(
    '\n',
  )
  // const setopFile = (await fs.readFile('src/data/setop.txt', 'utf-8')).split(
  //   '\n',
  // )
  // const sudecapFile = (await fs.readFile('src/data/sudecap.txt', 'utf-8')).split(
  //   '\n',
  // )
  // const sicroFile = (await fs.readFile('src/data/sicro.txt', 'utf-8')).split(
  //   '\n',
  // )

  return (
    <>
      <header>
        <h1 className="text-3xl">REFERÊNCIAS ATUALIZADAS</h1>
      </header>
      <main className="flex w-full">
        <Reference data={sinapiFile} />
        <Reference data={["Breve"]} />
        <Reference data={["Breve"]} />
        <Reference data={["Breve"]} />
      </main>
    </>
  )
}
