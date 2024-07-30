export type Actions = Record<string, (value: any) => void>

export type StoreEntry = {
    store: object
    listen: (callback: VoidFunction) => void
    actions: Actions
}
