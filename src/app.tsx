import { useEffect, useState } from 'react'
import { Test } from './components/test'

export function App(props: any) {
    const [state, setState] = useState(0)

    useEffect(() => {
        console.log('test', state)
    }, [])

    return (
        <div>
            <Test />
        </div>
    )
}
