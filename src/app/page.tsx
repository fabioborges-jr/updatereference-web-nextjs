import Reference from '@/components/Reference/Reference'
import fs from 'fs'

fs.readFile('src/data/sinapi.txt', 'utf-8', (error, data) => {
  try {
    const dataFile = data.split('\n')
    console.log(dataFile)
  } catch {
    console.error(error)
  }
})
export default function Home() {
  return <Reference />
}
