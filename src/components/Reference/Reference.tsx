'use client'

import Link from 'next/link'

type ReferenceProps = {
  referenceName: string
  data: string[]
}

export default function Reference(props: ReferenceProps) {
  return (
    <div className="break-all container mt-8 flex flex-col bg-color-3 w-1/4 mx-3">
      <h1 className="text-xl">{props.referenceName}</h1>
      {props.data.map((reference: string) => (
        <Link
          key={reference}
          href={reference}
          className="break-all mt-2 bg-color-1 "
        >
          <p className="text-color-4 p-5">{reference.slice(94)}</p>
        </Link>
      ))}
    </div>
  )
}
