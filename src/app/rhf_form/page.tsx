'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { formSchema, type FormSchema } from './schema'

export default function TestPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    progressive: true,
    defaultValues: {
      name: 'foobar',
      email: 'foobar@example.com',
    },
  })
  const [lastResult, setLastResult] = useState<object | null>(null)

  const handleSuccess = async ({ response }: { response: Response }) => {
    const result = (await response.json()) as object
    setLastResult(result)
    toast.success(`success!: ${JSON.stringify(result)}`)
    form.reset({ email: '', name: '' })
  }

  return (
    <Form
      control={form.control}
      action="/rhf_form/api"
      method="post"
      onSuccess={handleSuccess}
      className="grid gap-4"
    >
      <div className="grid gap-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="title"
          {...form.register('name', { required: 'Name is required' })}
        />
        {form.formState.errors.name && (
          <p className="text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

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
        Submit
      </Button>

      {lastResult && <div>last result: {JSON.stringify(lastResult)}</div>}
    </Form>
  )
}
