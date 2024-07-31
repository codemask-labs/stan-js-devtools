import './index.css'
import { Favicon } from 'lib/components'
import { getStores } from 'lib/utils'
import { CircleX } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { TooltipProvider } from './lib/components/ui/tooltip'
import { Store } from './Store'

export const Devtools: React.FunctionComponent = () => {
    const [isOpened, setIsOpened] = useState(true)
    const [stores, setStores] = useState(getStores())

    useEffect(() => {
        Object.values(stores).forEach(store =>
            store.listen(() => {
                setStores(getStores())
            })
        )
    }, [])

    return (
        <TooltipProvider>
            <div className="fixed bottom-4 left-4">
                {!isOpened
                    ? (
                        <div className="cursor-pointer" onClick={() => setIsOpened(true)}>
                            <Favicon />
                        </div>
                    )
                    : (
                        <React.Fragment>
                            <CircleX className="ml-auto translate-x-6 cursor-pointer" onClick={() => setIsOpened(false)} />
                            {Object.values(stores).map((store, index) => (
                                <Store
                                    key={index}
                                    storeNumber={index}
                                    store={{ ...store }}
                                />
                            ))}
                        </React.Fragment>
                    )}
            </div>
        </TooltipProvider>
    )
}
