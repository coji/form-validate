'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { usePathname } from 'next/navigation'
import { RouteTitles } from '../constants'

export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const route = RouteTitles.find((route) => route.pathname === pathname)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{route?.title ?? 'Unknown'}</CardTitle>
        <CardDescription>{route?.description ?? 'Unknown'}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
