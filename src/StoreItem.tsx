import React from 'react'
import { Input, Label } from './lib/components'

type StoreItemProps = {
    label: string
    value: any
}

export const StoreItem: React.FunctionComponent<StoreItemProps> = ({
    label,
    value,
}) => {
    return (
        <div>
            <Label htmlFor={label}>
                {label}
            </Label>
            <br />
            <Input value={value} />
        </div>
    )
}
