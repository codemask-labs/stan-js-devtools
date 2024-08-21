import { Input } from 'lib/components'
import React, { FunctionComponent, useRef } from 'react'
import { NodeApi } from 'react-arborist'
import { TreeNode } from './utils'

type InlineEditInputProps = {
    node: NodeApi<TreeNode>
    value: TreeNode['value']
}

export const InlineEditInput: FunctionComponent<InlineEditInputProps> = ({ node, value }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleValueEdit = () => {
        const newValue = inputRef.current?.value ?? ''

        // If the input is empty, submit the value as an undefined
        if (newValue === '') {
            return node.submit(newValue)
        }

        try {
            JSON.parse(newValue)
            node.submit(newValue)
        } catch (error) {
            node.reset()
        }
    }

    return (
        <Input
            className="inline-block h-6 w-auto"
            ref={inputRef}
            type="text"
            defaultValue={JSON.stringify(value)}
            onKeyDown={(event) => {
                event.key === 'Enter' && handleValueEdit()
                event.key === 'Escape' && node.reset()
            }}
            onBlur={handleValueEdit}
            autoFocus
        />
    )
}
