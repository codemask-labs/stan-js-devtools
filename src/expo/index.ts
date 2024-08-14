import { useDevToolsPluginClient } from 'expo/devtools'
import { useEffect } from 'react'

export const Devtools = () => {
    const client = useDevToolsPluginClient('expo-stan-js-devtools')

    useEffect(() => {
        const intervalId = setInterval(() => {
            // @ts-expect-error type not found
            const stores = (globalThis['__stan-js__'] ?? []) as Array<StoreEntry>

            client?.sendMessage('refresh-stores', { stores: stores.map(store => JSON.stringify(store.store)) })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [client])

    return null
}
