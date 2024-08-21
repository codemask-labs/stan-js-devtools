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

export const numberToEmoji = (num: number) => {
    const emojiMap = {
        0: '0️⃣',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
    } as Record<number, string>

    return num < 10 ? emojiMap[num] : `${emojiMap[Math.trunc(num / 10)]}${emojiMap[num % 10]}`
}

export const equal = <T>(a: T, b: T) => {
    if (Object.is(a, b)) {
        return true
    }

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
    }

    if (
        typeof a !== 'object'
        || a === null
        || typeof b !== 'object'
        || b === null
    ) {
        return false
    }

    const keysA = Object.keys(a) as Array<keyof T>

    if (keysA.length !== Object.keys(b).length) {
        return false
    }

    return keysA.every(key => Object.is(a[key], b[key]) && Object.prototype.hasOwnProperty.call(b, key))
}
