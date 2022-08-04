import { cva } from 'class-variance-authority'

export const callout = cva([' border border-solid '], {
  variants: {
    intent: {
      //@ts-ignore
      attention: ['text-brand-pink bg-brand-pink bg-opacity-10 border-opacity-10 border-brand-pink'],
      //@ts-ignore
      neutral: ['text-white border-white border-opacity-10 bg-white bg-opacity-5'],
      //@ts-ignore
      dark: ['text-white border-white border-opacity-10 bg-black'],
    },

    scale: {
      //@ts-ignore
      default: ['p-3 rounded-md'],
    },
  },
  defaultVariants: {
    //@ts-ignore
    intent: 'attention',
    //@ts-ignore
    scale: 'default',
  },
})

export default callout
