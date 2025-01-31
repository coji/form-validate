'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { formSchema } from './schema'

export default function TestPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch('/rhf_oldstyle/api', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      toast.error('An error occurred', {
        description: response.statusText,
      })
      return
    }
    toast.success('Form submitted', {
      description: JSON.stringify(data),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <p className="text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
