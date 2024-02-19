'use client'

import { Button } from '../ui/button'

type ReferenceProps = {
  data: string[]
}

export default function Reference(props: ReferenceProps) {
  return (
    <>
      <h1>Reference Works</h1>
      {props.data.map((reference: string) => (
        <a key={reference} href={reference}>
          <Button>SINAPI</Button>
        </a>
      ))}
    </>
  )
}
