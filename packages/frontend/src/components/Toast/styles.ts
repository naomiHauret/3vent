import { cva } from 'class-variance-authority'

export const toastLayer = cva(['max-w-screen-xs font-medium rounded-md relative border'], {
  variants: {
    intent: {
      info: 'border-info-200 bg-info-100 text-on-info',
      loading: 'border-base-200 bg-base-100 text-neutral-300',
      success: 'border-positive-200 bg-positive-100 text-on-positive',
      error: 'border-negative-200 bg-negative-100 text-on-negative',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export const toastIcon = cva('', {
  variants: {
    intent: {
      info: 'text-on-info',
      loading: 'text-base-300',
      success: 'text-on-positive',
      error: 'text-on-negative',
    },
  },
})
