import { useEffect } from 'react'

export function App(props: any) {
    useEffect(() => {
        console.log('test')
    }, [])

    return (
        <div>
            React App <br />
        </div>
    )
}
