import { CircleX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../lib/components'
import { StoreEntry } from '../../lib/types'
import { StateTree } from '../tree/StateTree'

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
    const [state, setState] = useState(storeEntry.store)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(([entry]) => {
            setHeight((entry?.contentRect.height ?? 0) - 72)
        })

        resizeObserver.observe(containerRef.current!)
    }, [])

    useEffect(() => {
        setState(storeEntry.store)
    }, [storeEntry])

    return (
        <div className="px-4 pb-4 h-full">
            <div className="w-full h-full rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-black">
                        Store no. {storeNumber}
                    </span>
                    <CircleX className="w-4 h-4 cursor-pointer stroke-black" onClick={close} />
                </div>
                <div ref={containerRef} className="pt-4 flex flex-col h-full">
                    <StateTree height={height ?? 0} state={state} onStateChange={setState} getters={storeEntry.getters} />
                    <Button className="mt-4" onClick={() => storeEntry.updateStore(state)}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
