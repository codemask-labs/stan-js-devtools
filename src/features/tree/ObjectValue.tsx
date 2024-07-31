import React, { FunctionComponent } from 'react'
import { NodeApi } from 'react-arborist'
import { InlineEditInput } from './InlineEditInput'
import { TreeNode } from './utils'

type ObjectValueProps = {
    node: NodeApi<TreeNode>
}

export const ObjectValue: FunctionComponent<ObjectValueProps> = ({ node }) =>
    node.isEditing ? <InlineEditInput node={node} value={node.data.value} /> : (
        <span
            onDoubleClick={() => node.edit()}
            className="text-ellipsis overflow-hidden whitespace-nowrap align-middle max-w-48 inline-block text-gray-400 text-xs"
        >
            {JSON.stringify(node.data.value)}
        </span>
    )
