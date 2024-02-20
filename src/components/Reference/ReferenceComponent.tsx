'use client'

import { Reference } from '@/types/Reference'
import Link from 'next/link'

type ReferenceProps = {
  referenceName: string
  data: string
}

export default function ReferenceComponent(props: ReferenceProps) {
  const data = JSON.parse(props.data)
  return (
    <div className="break-all container mt-8 flex flex-col bg-color-3 w-1/4 mx-3">
      <h1 className="text-xl">{props.referenceName}</h1>
      {data.map((reference: Reference) => (
        <Link
          key={reference.href}
          href={reference.href}
          className="mt-2 bg-color-1 "
        >
          <p className="text-color-4 p-1">{`${reference.state}`}</p>
          <p className="text-color-4 p-1">{`${reference.description}`}</p>
          <p className="text-color-4 p-1">{`${reference.published}`}</p>
        </Link>
      ))}
    </div>
  )
}
