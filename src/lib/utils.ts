import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { StoreEntry } from './types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getStores = (): Array<StoreEntry> => {
    // @ts-ignore
    return { ...window['__stan-js__'] }
}

export const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const getActionKey = (key: string) => `set${capitalize(key)}`
