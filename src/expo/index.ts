import { useDevToolsPluginClient } from 'expo/devtools'
import { StoreEntry } from 'lib/types'
import { useEffect } from 'react'

export const Devtools = () => {
    const client = useDevToolsPluginClient('expo-stan-js-devtools')

    useEffect(() => {
        if (!client) {
            return
        }

        // @ts-expect-error type not found
        const stores = (globalThis['__stan-js__'] ?? []) as Array<StoreEntry>

        client.addMessageListener('loaded', () => {
            client.sendMessage(
                'load',
                JSON.stringify(stores.map((storeEntry, index) => {
                    storeEntry.listen(() => {
                        client.sendMessage('listen', JSON.stringify({ store: storeEntry.store, index }))
                    })

                    return {
                        store: storeEntry.store,
                        getters: storeEntry.getters,
                    }
                })),
            )
        })

        client.addMessageListener('update', (data: string) => {
            const { store, index } = JSON.parse(data) as { store: object; index: number }

            stores[index]?.updateStore(store)
        })
    }, [client])

    return null
}
