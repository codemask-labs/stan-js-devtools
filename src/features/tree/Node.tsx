import React, { Fragment, FunctionComponent } from 'react'
import { NodeRendererProps } from 'react-arborist'
import { InlineEditInput } from './InlineEditInput'
import { PrimitiveValue } from './PrimitiveValue'
import { Primitive, TreeNode } from './utils'

export const Node: FunctionComponent<NodeRendererProps<TreeNode>> = ({ node, style, tree }) => (
    <pre style={style} className="text-gray-800">
        {node.children ? (
            <Fragment>
                <span className="cursor-pointer" onClick={() => tree.toggle(node.id)}>
                    {node.isOpen ? "▼" : "▶"} {node.data.key}:{' '}
                </span>
                {node.isEditing ? (
                    <InlineEditInput node={node} value={node.data.value} />
                ) : (
                    <span
                        onDoubleClick={() => node.edit()}
                        className="text-ellipsis overflow-hidden whitespace-nowrap align-middle max-w-24 inline-block text-gray-400 text-xs"
                    >
                        {JSON.stringify(node.data.value)}
                    </span>
                )}
            </Fragment>
        ) : (
            <Fragment>
                {node.data.key}:{' '}
                <PrimitiveValue value={node.data.value as Primitive} node={node} />
            </Fragment>
        )}
    </pre>
)
