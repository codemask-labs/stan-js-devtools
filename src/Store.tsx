import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from './lib/components'
import { StoreEntry } from './lib/types'
import { cn } from './lib/utils'

type StoreProps = {
    store: StoreEntry
    storeNumber: number
    open: VoidFunction
    isActive: boolean
}

export const Store: React.FunctionComponent<StoreProps> = ({ store, storeNumber, open, isActive }) => {
    const [state, setState] = useState(store.store)

    useEffect(() => {
        setState(store.store)
    }, [store])

    return (
        <Alert
            className={cn('w-full overflow-scroll', {
                'bg-gray-100': isActive,
            })}
        >
            <AlertTitle className="text-left">
                Store no. {storeNumber}
            </AlertTitle>
            <AlertDescription className="tracking-wider px-4 pt-4">
                <pre
                    className="cursor-pointer text-ellipsis overflow-hidden hover:bg-gray-100 transition-colors p-2 rounded-md text-left"
                    onClick={open}
                >
                    {JSON.stringify(state, null, 2)}
                </pre>
            </AlertDescription>
        </Alert>
    )
}
