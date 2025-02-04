'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { z } from 'zod'
import { formSchema } from './schema'

type FormData = z.infer<typeof formSchema>

export default function TestPage() {
  const [lastResult, setLastResult] = useState<FormData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [form, { email }] = useForm({
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
    defaultValue: { email: 'foobar@example.com' },
    onSubmit: async (event, { submission }) => {
      event.preventDefault()
      if (submission?.status !== 'success') {
        return
      }

      setIsLoading(true)
      const res = await fetch('/conform_fetch/api', {
        method: 'POST',
        body: JSON.stringify(submission.value),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        const result = await res.json()
        setLastResult(result)
        toast.success(`success!: ${JSON.stringify(result)}`)
        form.update({ name: email.name, value: '', validated: false })
      } else {
        toast.error(`There was an error: ${res.statusText}`)
      }
      setIsLoading(false)
    },
  })

  return (
    <form {...getFormProps(form)} method="post" className="grid gap-4">
      <div className="grid gap-1">
        <Label htmlFor={email.id}>Email</Label>
        <Input
          placeholder="email"
          {...getInputProps(email, { type: 'email' })}
          key={email.key}
        />
        {email.errors && (
          <p id={email.errorId} className="text-sm text-red-500">
            {email.errors}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <LoaderIcon className="animate-spin" />} Submit
      </Button>

      {lastResult && (
        <div>
          <Badge variant="secondary">Last Result</Badge> Post created:{' '}
          {lastResult.email}
        </div>
      )}
    </form>
  )
}
