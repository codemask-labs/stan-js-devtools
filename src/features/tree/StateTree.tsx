import * as objectPath from 'object-path-immutable'
import React, { FunctionComponent } from 'react'
import { NodeApi, Tree } from 'react-arborist'
import { Node } from './Node'
import { treeify, TreeNode } from './utils'

type StateTreeProps = {
    state: object
    onStateChange: (state: object) => void
}

type HandleDataChangeProps = {
    id: string
    name: string
    node: NodeApi<TreeNode>
}

export const StateTree: FunctionComponent<StateTreeProps> = ({ state, onStateChange }) => {
    const handleDataChange = ({
        id,
        name,
    }: HandleDataChangeProps) => {
        const path = id.split('-').slice(1)
        const newValue = name === '' ? undefined : JSON.parse(name)

        onStateChange(objectPath.set(state, path, newValue))
    }

    return (
        <Tree width={512} data={treeify(state).children} onRename={handleDataChange}>
            {Node}
        </Tree>
    )
}
