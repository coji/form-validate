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

  const handleSubmit: Parameters<typeof useForm>[0]['onSubmit'] = async (
    event,
    { submission },
  ) => {
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
    } else {
      toast.error(`There was an error: ${res.statusText}`)
    }
    setIsLoading(false)
  }

  const [form, fields] = useForm({
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
    defaultValue: { email: 'foobar@example.com' },
    onSubmit: handleSubmit,
  })

  return (
    <form {...getFormProps(form)} className="grid gap-4">
      <div className="grid gap-1">
        <Label htmlFor={fields.email.id}>Email</Label>
        <Input
          placeholder="email"
          {...getInputProps(fields.email, { type: 'email' })}
        />
        {fields.email.errors ? (
          <p className="text-red-500">{fields.email.errors}</p>
        ) : null}
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
