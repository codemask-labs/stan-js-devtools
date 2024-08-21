import { StateTree } from 'features/tree'
import { Button } from 'lib/components'
import { StoreEntry } from 'lib/types'
import { equal, numberToEmoji } from 'lib/utils'
import { CircleX, RefreshCcw } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type EditorProps = {
    storeNumber: number
    close: VoidFunction
    storeEntry: StoreEntry
}

export const Editor: React.FunctionComponent<EditorProps> = ({
    storeNumber,
    close,
    storeEntry,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number | undefined>(0)
    const [state, setState] = useState({ ...storeEntry.store })
    const isEqual = equal(state, storeEntry.store)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(([entry]) => {
            setHeight((entry?.contentRect.height ?? 0) - 72)
        })

        resizeObserver.observe(containerRef.current!)
    }, [])

    return (
        <div className="px-4 pb-4 h-full">
            <div className="w-full h-full rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-black">
                        Store {numberToEmoji(storeNumber)}
                    </span>
                    <div className="flex items-center gap-2">
                        {!isEqual && (
                            <RefreshCcw
                                className="w-4 h-4 cursor-pointer stroke-black"
                                onClick={() => setState({ ...storeEntry.store })}
                            />
                        )}
                        <CircleX className="w-4 h-4 cursor-pointer stroke-black" onClick={close} />
                    </div>
                </div>
                <div ref={containerRef} className="pt-4 flex flex-col h-full">
                    <StateTree height={height ?? 0} state={state} onStateChange={setState} getters={storeEntry.getters} />
                    <Button disabled={isEqual} className="mt-4" onClick={() => storeEntry.updateStore(state)}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
