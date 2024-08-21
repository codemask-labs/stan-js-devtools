import './index.css'
import { Editor } from 'features/editor'
import { Button, Favicon, Label, ResizableHandle, ResizablePanel, ResizablePanelGroup, TooltipProvider } from 'lib/components'
import { cn, getStores } from 'lib/utils'
import { Minus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Store } from './Store'

export const Devtools: React.FunctionComponent = ({ isFullscreen }: { isFullscreen?: boolean }) => {
    const [isOpened, setIsOpened] = useState(Boolean(isFullscreen))
    const [stores, setStores] = useState(getStores())
    const resizeRef = useRef<HTMLDivElement>(null)
    const [activeStore, setActiveStore] = useState<number>()
    const editor = activeStore !== undefined ? stores[activeStore] : undefined

    useEffect(() => {
        const intervalId = setInterval(() => {
            const stores = Object.values(getStores())

            stores.forEach(store => {
                store.listen(() => {
                    setStores(getStores())
                })
            })

            setStores(stores)

            if (stores.length !== 0) {
                clearInterval(intervalId)
            }
        }, 500)
    }, [])

    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
        mouseDownEvent,
    ) => {
        if (!resizeRef.current || isFullscreen) {
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
                        <div key="favicon" className="cursor-pointer" onClick={() => setIsOpened(true)}>
                            <Favicon />
                        </div>
                    )
                    : (
                        <React.Fragment>
                            <div
                                key="devtools"
                                className={cn('devtools-resizable flex flex-col rounded-xl bg-background', {
                                    'devtools-fullscreen': isFullscreen,
                                })}
                                ref={resizeRef}
                            >
                                <div
                                    onMouseDown={handleMouseDown}
                                    className={cn('w-full -translate-y-2 h-4', {
                                        'cursor-ns-resize': !isFullscreen,
                                    })}
                                />
                                <div className="flex items-center px-4 pb-4 justify-between">
                                    <div className="flex items-center gap-2">
                                        <Favicon className="w-8 h-8" />
                                        <Label className="text-black text-xl">
                                            stan-js devtools
                                        </Label>
                                    </div>
                                    {!isFullscreen && (
                                        <Button size="icon" onClick={() => setIsOpened(false)}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <ResizablePanelGroup className="resize flex-grow" direction="horizontal">
                                    <ResizablePanel className="px-4 pb-4 flex flex-col gap-4" style={{ overflow: 'auto' }}>
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
                                                storeEntry={{ ...editor }}
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
