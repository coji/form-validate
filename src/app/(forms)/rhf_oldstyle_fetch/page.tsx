'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { formSchema } from './schema'

type FormData = z.infer<typeof formSchema>

export default function TestPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: 'foobar@example.com' },
  })
  const [lastResult, setLastResult] = useState<FormData | null>(null)
  const onSubmit = async (data: FormData) => {
    const response = await fetch('/rhf_oldstyle_fetch/api', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      setLastResult(null)
      toast.error('An error occurred', {
        description: response.statusText,
      })
      return
    }
    const result: FormData = await response.json()
    setLastResult(result)
    toast.success(`success!: ${JSON.stringify(result)}`)
    form.reset({ email: '' })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email"
            {...form.register('email', { required: 'Email is required' })}
          />
          {form.formState.errors.email && (
            <p className="text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>

        {lastResult && (
          <div>
            <Badge variant="secondary">Last Result</Badge>
            Post created: {lastResult.email}
          </div>
        )}
      </form>
    </Form>
  )
}
