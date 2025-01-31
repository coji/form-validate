import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
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
          <li>
            <Link href="/rhf_oldstyle">React Hook Form / Old Style + API</Link>
          </li>
          <li>
            <Link href="/rhf_form">React Hook Form / Form + API</Link>
          </li>
          <li>
            <Link href="/rhf_serveractions">
              React Hook Form / Form + useActionState + Server Actions
            </Link>
          </li>
        </ul>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/techtalkjp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          coji
        </a>
      </footer>
    </div>
  )
}
