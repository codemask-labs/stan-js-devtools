import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { StoreEntry } from './types'

declare global {
    interface Window {
        '__stan-js__': Record<number, StoreEntry>
    }
}

export const cn = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))

export const getStores = () => ({ ...window['__stan-js__'] })
