export type StoreEntry = {
    store: object
    listen: (callback: VoidFunction) => void
    updateStore: (store: object) => void
}
