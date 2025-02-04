'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useActionState, useEffect, useTransition } from 'react'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { createPost } from './action'
import { formSchema } from './schema'

type FormData = z.infer<typeof formSchema>

export default function TestPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: 'foobar@example.com' },
    progressive: true,
  })
  const [lastResult, action, isPending] = useActionState(createPost, null)
  const [, startTransition] = useTransition()

  // Show toast message when state changes
  useEffect(() => {
    if (lastResult) {
      form.reset({ email: '' })
      toast.success(`Post created: ${lastResult.email}`)
    }
  }, [lastResult, form])

  return (
    <Form
      control={form.control}
      onSubmit={({ formData }) =>
        startTransition(async () => {
          action(formData)
        })
      }
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
          <p className="text-accent-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending && <LoaderIcon className="animate-spin" />}
        Submit
      </Button>

      {lastResult && (
        <div className="flex gap-2">
          <Badge variant="secondary">Last Result</Badge> Post created:{' '}
          {lastResult.email}
        </div>
      )}
    </Form>
  )
}
