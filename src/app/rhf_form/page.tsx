'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { formSchema, type FormSchema } from './schema'

export default function TestPage() {
  const {
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    progressive: true,
  })

  return (
    <Form
      control={control}
      action="/rhf_form/api"
      method="post"
      onSubmit={(data) => {
        console.log('onSubmit', data)
      }}
      onSuccess={async ({ response }) => {
        console.log('success!', await response.json())
        reset()
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>React Hook Form / Form Component</CardTitle>
          <CardDescription>
            This is a Form component using React Hook Form
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="title"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Form>
  )
}
