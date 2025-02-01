'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
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
    <div className="grid gap-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{route?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mx-auto w-[30rem]">
        <CardHeader>
          <CardTitle>{route?.title}</CardTitle>
          <CardDescription>{route?.description ?? 'Unknown'}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
