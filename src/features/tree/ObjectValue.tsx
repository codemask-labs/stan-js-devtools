import React, { FunctionComponent } from 'react'
import { NodeApi } from 'react-arborist'
import { cn } from '../../lib/utils'
import { DateValue } from './DateValue'
import { InlineEditInput } from './InlineEditInput'
import { TreeNode } from './utils'

type ObjectValueProps = {
    node: NodeApi<TreeNode>
}

export const ObjectValue: FunctionComponent<ObjectValueProps> = ({ node }) => {
    if (node.data.value instanceof Date) {
        return <DateValue node={node as NodeApi<TreeNode<Date>>} />
    }

    return node.isEditing ? <InlineEditInput node={node} value={node.data.value} /> : (
        <span
            onClick={() => node.isEditable && node.edit()}
            className={cn('text-ellipsis overflow-hidden whitespace-nowrap align-middle max-w-48 inline-block text-gray-400 text-xs', {
                ['hover:bg-gray-100 transition-colors p-1 rounded-md cursor-pointer']: node.isEditable,
            })}
        >
            {JSON.stringify(node.data.value)}
        </span>
    )
}
