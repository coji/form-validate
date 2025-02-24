'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { RouteTitles } from '../constants'

export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const currentRoute = RouteTitles.find((route) => route.pathname === pathname)

  if (!currentRoute) {
    return <></>
  }

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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {currentRoute.title} <ChevronDownIcon className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {RouteTitles.map((route) => (
                  <DropdownMenuItem
                    key={route.pathname}
                    onSelect={() => {
                      router.push(route.pathname)
                    }}
                  >
                    {route.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mx-auto w-full md:w-[350px]">
        <CardHeader>
          <CardTitle>{currentRoute.title}</CardTitle>
          <CardDescription>{currentRoute.description}</CardDescription>
          {currentRoute.warning && (
            <div className="text-sm font-semibold text-red-500">
              {currentRoute.warning}
            </div>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>

      <div className="mx-auto text-xs text-muted-foreground">
        <a
          href={`https://github.com/coji/form-validate/tree/main/src/app/(forms)${currentRoute.pathname}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          ソースコード
        </a>
      </div>
    </div>
  )
}
