import { TooltipPortal } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from 'lib/components'
import { cn } from 'lib/utils'
import { InfoIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent } from 'react'
import { NodeRendererProps } from 'react-arborist'
import { ObjectValue } from './ObjectValue'
import { PrimitiveValue } from './PrimitiveValue'
import { Primitive, TreeNode } from './utils'

export const Node: FunctionComponent<NodeRendererProps<TreeNode>> = ({ node, style, tree }) => {
    const hasSomeChildren = node.children && node.children.length > 0

    return (
        <pre style={style} className={cn('text-gray-800 text-left', { ['opacity-50']: node.data.isReadonly })}>
            {node.data.isReadonly && (
                <Tooltip delayDuration={200}>
                    <TooltipPortal>
                        <TooltipContent>
                            This value is read-only
                        </TooltipContent>
                    </TooltipPortal>
                    <TooltipTrigger asChild>
                        <InfoIcon className="inline-block mr-2 size-4 align-middle" />
                    </TooltipTrigger>
                </Tooltip>
            )}
            {node.children ? (
                <Fragment>
                    <span className={cn({'cursor-pointer': hasSomeChildren})} onClick={() => tree.toggle(node.id)}>
                        {hasSomeChildren && (node.isOpen ? "▼ " : "▶ ")}{node.data.key}:{' '}
                    </span>
                    <ObjectValue node={node} />
                </Fragment>
            ) : (
                <Fragment>
                    {node.data.key}:{' '}
                    <PrimitiveValue value={node.data.value as Primitive} node={node} />
                </Fragment>
            )}
        </pre>
    )
}
