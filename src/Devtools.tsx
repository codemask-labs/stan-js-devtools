import './index.css'
import { Editor } from 'features/editor/Editor'
import { Button, Favicon, Label, ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'lib/components'
import { getStores } from 'lib/utils'
import { Minus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { TooltipProvider } from './lib/components/ui/tooltip'
import { Store } from './Store'

export const Devtools: React.FunctionComponent = () => {
    const [isOpened, setIsOpened] = useState(false)
    const [stores, setStores] = useState(getStores())
    const resizeRef = useRef<HTMLDivElement>(null)
    const [activeStore, setActiveStore] = useState<number>()
    const editor = activeStore !== undefined ? stores[activeStore] : undefined

    useEffect(() => {
        Object.values(stores).forEach(store =>
            store.listen(() => {
                setStores(getStores())
            })
        )

        setInterval(() => {
            setStores(getStores())
        }, 1000)
    }, [])

    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
        mouseDownEvent,
    ) => {
        if (!resizeRef.current) {
            return
        }

        const startY = mouseDownEvent.clientY
        const { height } = resizeRef.current.getBoundingClientRect()
        const updateDimensions = (event: MouseEvent) => {
            if (!resizeRef.current) {
                return
            }

            event.preventDefault()
            const nextHeight = height + startY - event.clientY
            resizeRef.current.style.height = `${nextHeight}px`
        }

        const unsub = () => {
            document.removeEventListener('mousemove', updateDimensions, false)
            document.removeEventListener('mouseUp', unsub, false)
        }

        document.addEventListener('mousemove', updateDimensions, false)
        document.addEventListener('mouseup', unsub, false)
    }

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
                            <div className="devtools-resizable flex flex-col rounded-xl bg-background" ref={resizeRef}>
                                <div onMouseDown={handleMouseDown} className="w-full -translate-y-2 h-4 cursor-ns-resize" />
                                <div className="flex items-center px-4 pb-4 justify-between">
                                    <div className="flex items-center gap-2">
                                        <Favicon className="w-8 h-8" />
                                        <Label className="text-black text-xl">
                                            stan-js devtools
                                        </Label>
                                    </div>
                                    <Button size="icon" onClick={() => setIsOpened(false)}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <ResizablePanelGroup className="resize flex-grow" direction="horizontal">
                                    <ResizablePanel className="px-4 pb-4 grid grid-cols-1 gap-4">
                                        {Object.values(stores).map((store, index) => (
                                            <Store
                                                key={index}
                                                storeNumber={index}
                                                open={() => setActiveStore(index)}
                                                isActive={activeStore === index}
                                                store={{ ...store }}
                                            />
                                        ))}
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel>
                                        {editor && (
                                            <Editor
                                                storeEntry={editor}
                                                close={() => setActiveStore(undefined)}
                                                storeNumber={activeStore ?? 0}
                                            />
                                        )}
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>
                        </React.Fragment>
                    )}
            </div>
        </TooltipProvider>
    )
}
