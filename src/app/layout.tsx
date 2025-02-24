import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next.js Form Validation Examples',
  description:
    'Examples of form validation in Next.js, using React Hook Form and Conform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors />

        <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
          <header className="border-b px-4 py-2">
            <h1 className="text-2xl font-bold">
              <Link href="/">Next.js Form Validation Examples</Link>
            </h1>
          </header>

          <main className="px-4 py-2">{children}</main>

          <footer className="p-4 text-center">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://x.com/techtalkjp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                TechTalk Inc. / coji
              </a>
            </p>

            <p>
              <a
                href="https://github.com/coji/form-validate"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-1 mr-2 inline-block h-4 w-4"
                >
                  <title>github</title>
                  <path d="m12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 4.801-1.574 8.236-6.074 8.236-11.369 0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
