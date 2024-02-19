'use client'

import Link from 'next/link'

type ReferenceProps = {
  data: string[]
}

export default function Reference(props: ReferenceProps) {
  return (
    <div className="break-all container mt-8 flex flex-col bg-red-300 w-1/4 mx-3">
      <h1>SINAPI</h1>
      {props.data.map((reference: string) => (
        <Link
          key={reference}
          href={reference}
          className="break-all mt-2 h-auto"
        >
          <p className="break-words">{reference.slice(94)}</p>
        </Link>
      ))}
    </div>
  )
}
