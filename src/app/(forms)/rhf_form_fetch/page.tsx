'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { formSchema, type FormSchema } from './schema'

type FormData = z.infer<typeof formSchema>

export default function TestPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: 'foobar@example.com' },
    progressive: true,
  })
  const [lastResult, setLastResult] = useState<FormData | null>(null)

  const handleSuccess = async ({ response }: { response: Response }) => {
    const result: FormData = await response.json()
    setLastResult(result)
    toast.success(`success!: ${JSON.stringify(result)}`)
    form.reset({ email: '' })
  }

  return (
    <Form
      control={form.control}
      action="/rhf_form_fetch/api"
      method="post"
      onSuccess={handleSuccess}
      className="grid gap-4"
    >
      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email"
          {...form.register('email', { required: 'Email is required' })}
        />
        {form.formState.errors.email && (
          <p className="text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && <LoaderIcon className="animate-spin" />}
        Submit
      </Button>

      {lastResult && (
        <div>
          <Badge variant="secondary">Last Result</Badge> Post created:{' '}
          {lastResult.email}
        </div>
      )}
    </Form>
  )
}
