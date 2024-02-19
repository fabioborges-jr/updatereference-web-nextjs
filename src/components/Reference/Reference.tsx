'use client'

import { Button } from '../ui/button'

type ReferenceProps = {
  data: string[]
}

export default function Reference(props: ReferenceProps) {
  return (
    <div className='container mt-8 flex flex-col bg-red-300 mx-2'>
      <h1>SINAPI</h1>
      {props.data.map((reference: string) => (
        <Button asChild>
          <a key={reference} href={reference} className='mt-2'>{reference.slice(94)}</a>
        </Button>
      ))}
    </div>
  )
}
