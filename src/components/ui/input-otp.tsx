'use client'

import { OTPInput, OTPInputContext } from 'input-otp'
import { Minus } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const InputOTP = ({
  className,
  containerClassName,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof OTPInput>) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName,
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
)
InputOTP.displayName = 'InputOTP'

const InputOTPGroup = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
)
InputOTPGroup.displayName = 'InputOTPGroup'

const InputOTPSlot = ({
  index,
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'> & { index: number }) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-1 ring-ring',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}
InputOTPSlot.displayName = 'InputOTPSlot'

const InputOTPSeparator = ({
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => (
  <div ref={ref} {...props}>
    <Minus />
  </div>
)
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
