import { cva } from 'class-variance-authority'

export const button = cva(
  [
    'rounded-md inline-flex items-center justify-center',
    'focus:outline-none focus:ring focus:ring-opacity-50',
    'font-sans',
    'transition-colors transition-500',
    'disabled:opacity-50',
  ],
  {
    variants: {
      intent: {
        //@ts-ignore
        primary: [
          'border-primary-300 bg-primary-100 hover:bg-primary-0 text-on-primary focus:bg-primary-200 focus:ring-primary-300',
        ],
        neutral: ['text-base-100 bg-base-content hover:bg-opacity-95 focus:text-base-300 focus:ring-neutral-focus'],
        'neutral-revert': [
          'bg-base-100 hover:bg-base-200 focus:bg-base-300 text-accent-content border-neutral focus:border-neutral-focus focus:ring-neutral-focus',
        ],
        danger: [
          'border-negative-200 bg-negative-100 hover:bg-negative-0 text-on-negative focus:bg-negative-200 focus:ring-negative-300',
        ],
      },
      aspect: {
        default: 'border',
        'no-outline': 'border-none',
      },
      scale: {
        xs: ['text-2xs', 'px-3 py-1', 'font-bold'],
        sm: ['text-xs', 'px-3 py-1.5', 'font-bold'],
        default: ['text-xs', 'py-2 px-3', 'font-bold'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      scale: 'default',
      aspect: 'default',
    },
  },
)

export default button
