import { useDevToolsPluginClient } from 'expo/devtools'
import { StoreEntry } from 'lib/types'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Devtools } from '../../src/Devtools'

declare global {
    interface Window {
        '__stan-js__': Record<number, StoreEntry>
    }
}

const App = () => {
    const client = useDevToolsPluginClient('expo-stan-js')

    useEffect(() => {
        if (!client) {
            return
        }

        client.sendMessage('loaded', true)
        client.addMessageListener('load', data => {
            const stores = JSON.parse(data) as Array<StoreEntry>

            window['__stan-js__'] = stores.map(({ store, getters }, index) => ({
                store,
                getters,
                updateStore: state => {
                    client.sendMessage('update', JSON.stringify({ store: state, index }))
                },
                listen: callback => {
                    client.addMessageListener('listen', data => {
                        const { store, index } = JSON.parse(data)
                        const storeEntry = window['__stan-js__'][index]

                        if (!storeEntry) {
                            return
                        }

                        storeEntry.store = store
                        callback()
                    })
                },
            }))
        })
    }, [client])

    return <Devtools />
}

createRoot(document.getElementById('root')!).render(<App />)
