import { cva } from 'class-variance-authority'

// textual inputs (like textarea and text/number/url input)
export const input = cva(
  [
    'focus:outline-none',
    'appearance-none',
    'border-solid',
    'placeholder:text-opacity-30',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      intent: {
        default: [
          //@ts-ignore
          'placeholder:text-neutral bg-transparent text-base-content border-base-300 focus:bg-base-200 hover:bg-base-200 hover:bg-opacity-10 focus:bg-opacity-25',
        ],
        error: [
          //@ts-ignore
          'input--invalid',
        ],
      },
      scale: {
        //@ts-ignore
        default: ['px-3 py-1.5 text-xs', 'border'],
        //@ts-ignore
        sm: ['px-3 py-0.5 text-xs', 'border'],
        //@ts-ignore
        md: ['px-4 py-1.5 text-sm', 'border'],
      },
      appearance: {
        //@ts-ignore
        square: 'rounded-md',
        //@ts-ignore
        'square-addon-start': 'rounded-md rounded-is-none',
        //@ts-ignore
        'square-addon-end': 'rounded-md rounded-ie-none',
        //@ts-ignore
        'square-block': 'rounded-none',
      },
    },
    defaultVariants: {
      //@ts-ignore
      intent: 'default',
      //@ts-ignore
      scale: 'default',
      //@ts-ignore
      appearance: 'square',
    },
  },
)

export const addon = cva(['border-solid border-opacity-20'], {
  variants: {
    intent: {
      default: [
        //@ts-ignore
        'text-neutral-400 border-white bg-opacity-10 bg-white',
      ],
      error: [
        //@ts-ignore
        'addon--invalid',
      ],
    },
    scale: {
      //@ts-ignore
      default: ['px-1ex py-1.5 text-xs', 'border focus:border-2'],
      //@ts-ignore
      sm: ['px-1ex py-0.5 text-xs', 'border focus:border-2'],
      //@ts-ignore
      md: ['px-1ex py-1.5 text-sm', 'border focus:border-2'],
    },
    appearance: {
      //@ts-ignore
      'square-start': 'rounded-is-md border-ie-0',
      //@ts-ignore
      'square-end': 'rounded-ie-md border-is-0',
    },
  },
  defaultVariants: {
    //@ts-ignore
    intent: 'default',
    //@ts-ignore
    scale: 'default',
    //@ts-ignore
    appearance: 'square-start',
  },
})

export default input
