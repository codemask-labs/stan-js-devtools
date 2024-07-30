import React, { useEffect, useRef, useState } from 'react'
import { Input, Label } from './lib/components'
import { cn } from './lib/utils'

type StoreItemProps = {
    label: string
    value: any
    update: (value: any) => void
    setDisableSave: (value: boolean) => void
}

export const StoreItem: React.FunctionComponent<StoreItemProps> = ({
    label,
    value: initialValue,
    update,
    setDisableSave,
}) => {
    const isMounted = useRef(false)
    const [value, setValue] = useState(JSON.stringify(initialValue))
    const [isInvalid, setIsInvalid] = useState(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true

            return
        }

        try {
            update(JSON.parse(value))
            setIsInvalid(false)
            setDisableSave(false)
        } catch {
            setIsInvalid(true)
            setDisableSave(true)
        }
    }, [value])

    useEffect(() => {
        if (!isMounted.current) {
            return
        }

        setValue(JSON.stringify(initialValue))
    }, [initialValue])

    return (
        <div>
            <Label htmlFor={label}>
                {label}
            </Label>
            <br />
            <Input
                className={cn({
                    ['border-red-500']: isInvalid,
                    ['focus-visible:ring-red-500']: isInvalid,
                })}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    )
}
