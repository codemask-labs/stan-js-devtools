import { CircleX, Terminal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle, Button } from './lib/components'
import { Actions } from './lib/types'
import { getActionKey } from './lib/utils'
import { StoreItem } from './StoreItem'

type StoreProps = {
    store: object
    storeNumber: number
    actions: Actions
}

export const Store: React.FunctionComponent<StoreProps> = ({ store: initialStore, storeNumber, actions }) => {
    const [isStoreExpanded, setIsStoreExpanded] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)
    const [store, setStore] = useState(initialStore)
    const [edited, setEdited] = useState<Array<string>>([])

    useEffect(() => {
        setStore(initialStore)
    }, [initialStore])

    const handleSave = () => {
        actions[getActionKey('setStore')]?.(store)
        setEdited([])
    }

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
            <AlertDescription>
                {Object.entries(store).map(([key, value]) => (
                    <StoreItem
                        key={key}
                        label={key}
                        value={value}
                        update={value => {
                            setStore(prev => ({ ...prev, [key]: value }))
                            setEdited(prev => [...prev, key])
                        }}
                        setDisableSave={setIsInvalid}
                    />
                ))}
                <Button disabled={isInvalid} className="mt-4" onClick={handleSave}>
                    Save
                </Button>
            </AlertDescription>
        </Alert>
    )
}
