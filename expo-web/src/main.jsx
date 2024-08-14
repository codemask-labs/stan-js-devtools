import { useDevToolsPluginClient } from 'expo/devtools'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Devtools } from '../../src/Devtools'

const App = () => {
    const client = useDevToolsPluginClient('expo-stan-js')

    useEffect(() => {
        if (!client) {
            return
        }

        client.sendMessage('loaded', true)
        client.addMessageListener('load', data => {
            const stores = JSON.parse(data)

            globalThis['__stan-js__'] = stores.map(({ store, getters }, index) => ({
                store,
                getters,
                updateStore: state => {
                    client.sendMessage('update', JSON.stringify({ store: state, index }))
                },
                listen: callback => {
                    client.addMessageListener('listen', data => {
                        const { store, index } = JSON.parse(data)

                        globalThis['__stan-js__'][index].store = store

                        callback()
                    })
                },
            }))
        })
    }, [client])

    return <Devtools />
}

createRoot(document.getElementById('root')).render(<App />)
