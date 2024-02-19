'use client'

import { Link } from 'lucide-react'
import { Button } from '../ui/button'

type ReferenceProps = {
  data: string[]
}

export default function Reference(props: ReferenceProps) {
  return (
    <div className='container mt-8 flex flex-col w-1/4'>
      {props.data.map((reference: string) => (
        <Button asChild>
          <a key={reference} href={reference} className='mt-2'>SINAPI</a>
        </Button>
      ))}
    </div>
  )
}
