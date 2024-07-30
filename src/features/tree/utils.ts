export type Primitive = string | number | boolean | undefined | null

export type TreeNode = {
    id: string
    key: string
    value: object | Primitive | Array<Primitive>
    children?: Array<TreeNode>
}

export const treeify = (
    data: object,
    id = 'root',
    key: string = 'root',
): TreeNode => {
    const children = (typeof data === 'object' && data !== null)
        ? Object.entries(data).map(([itemKey, value]) => {
            if (typeof value === 'object' && value !== null) {
                return treeify(value as object, `${id}-${itemKey}`, itemKey)
            }

            return {
                id: `${id}-${itemKey}`,
                key: itemKey,
                value,
            }
        })
        : undefined

    return {
        id,
        key,
        value: data,
        children,
    }
}
