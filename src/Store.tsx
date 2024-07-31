import { Alert, AlertDescription, AlertTitle, Button } from 'lib/components'
import { CircleX, Terminal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { StateTree } from './features/tree/StateTree'
import { StoreEntry } from './lib/types'

type StoreProps = {
    store: StoreEntry
    storeNumber: number
}

export const Store: React.FunctionComponent<StoreProps> = ({ store, storeNumber }) => {
    const [isStoreExpanded, setIsStoreExpanded] = useState(false)
    const [state, setState] = useState(store.store)

    useEffect(() => {
        setState(store.store)
    }, [store])

    if (!isStoreExpanded) {
        return (
            <Alert className="max-w-md">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Store no. {storeNumber}</AlertTitle>
                <AlertDescription className="tracking-wider px-4 pt-4">
                    <pre
                        className="cursor-pointer text-ellipsis overflow-hidden hover:bg-gray-100 transition-colors p-2 rounded-md"
                        onClick={() => setIsStoreExpanded(true)}
                    >
                        {JSON.stringify(state, null, 2)}
                    </pre>
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <Alert className="max-w-xl">
            <Terminal className="h-4 w-4" />
            <AlertTitle>
                <div className="flex items-center gap-2">
                    Store no. {storeNumber}
                    <CircleX className="w-4 h-4 cursor-pointer" onClick={() => setIsStoreExpanded(false)} />
                </div>
            </AlertTitle>
            <AlertDescription className="mt-4">
                <StateTree state={state} onStateChange={setState} getters={store.getters} />
                <Button className="mt-4" onClick={() => store.updateStore(state)}>
                    Save
                </Button>
            </AlertDescription>
        </Alert>
    )
}
