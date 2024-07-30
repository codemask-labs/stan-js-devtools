import { CircleX, Terminal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { StateTree } from './features/tree/StateTree'
import { Alert, AlertDescription, AlertTitle, Button } from './lib/components'

type StoreProps = {
    store: object
    storeNumber: number
    updateStore: (store: object) => void
}

export const Store: React.FunctionComponent<StoreProps> = ({ store: initialStore, storeNumber, updateStore }) => {
    const [isStoreExpanded, setIsStoreExpanded] = useState(false)
    const [store, setStore] = useState(initialStore)

    useEffect(() => {
        setStore(initialStore)
    }, [initialStore])

    if (!isStoreExpanded) {
        return (
            <Alert onClick={() => setIsStoreExpanded(true)} className="cursor-pointer">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Store no. {storeNumber}</AlertTitle>
                <AlertDescription className="tracking-wider">
                    {JSON.stringify(store)}
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>
                <div className="flex items-center gap-2">
                    Store no. {storeNumber}
                    <CircleX className="w-4 h-4 cursor-pointer" onClick={() => setIsStoreExpanded(false)} />
                </div>
            </AlertTitle>
            <AlertDescription className="mt-4">
                <StateTree state={store} onStateChange={setStore} />
                <Button className="mt-4" onClick={() => updateStore(store)}>
                    Save
                </Button>
            </AlertDescription>
        </Alert>
    )
}
