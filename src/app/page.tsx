import Image from 'next/image'
import Link from 'next/link'
import { RouteTitles } from './constants'

export default function Home() {
  return (
    <div className="grid place-items-center p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ul className="list-decimal">
          {RouteTitles.map((route) => (
            <li key={route.pathname}>
              <Link href={route.pathname} className="hover:underline">
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
