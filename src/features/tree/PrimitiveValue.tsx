import { cn } from 'lib/utils'
import React, { FunctionComponent } from 'react'
import { NodeApi } from 'react-arborist'
import { InlineEditInput } from './InlineEditInput'
import { Primitive, TreeNode } from './utils'

type PrimitiveValueProps = {
    value: Primitive
    node: NodeApi<TreeNode>
}

export const PrimitiveValue: FunctionComponent<PrimitiveValueProps> = ({ node, value }) =>
    node.isEditing ? <InlineEditInput node={node} value={value} /> : (
        <span
            className={cn({
                ['text-emerald-500']: typeof value === 'string',
                ['text-blue-500']: typeof value === 'number',
                ['text-red-500']: typeof value === 'boolean',
                ['text-yellow-500']: typeof value === 'undefined' || value === null,
            })}
            onDoubleClick={() => node.isEditable && node.edit()}
        >
            {typeof value === 'string' && `"${value}"`}
            {typeof value === 'number' && value.toString()}
            {typeof value === 'boolean' && String(value)}
            {(typeof value === 'undefined' || value === null) && String(value)}
        </span>
    )
