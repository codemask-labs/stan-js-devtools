import { useDevToolsPluginClient } from 'expo/devtools'
import React, { useEffect } from 'react'
import { Devtools } from 'stan-js-devtools'

const App = () => {
    const client = useDevToolsPluginClient('expo-stan-js-devtools')

    useEffect(() => {
        const subscription = client?.addMessageListener('refresh-stores', data => {
            console.log(`New stores ${data}`)
        })

        return () => {
            subscription?.remove()
        }
    }, [client])

    return <Devtools />
}

export default App
