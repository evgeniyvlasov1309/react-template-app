import React from 'react'
import * as style from './test.module.scss'

const Test = () => {
    console.log(style)

    return <div className={style.root}>component</div>
}

export { Test }
