import React, { MouseEventHandler, ReactNode, RefCallback } from 'react'

type Props = {
    title: string | undefined,
    icon: ReactNode | undefined,
    classname: string ,
    onclick:MouseEventHandler<HTMLDivElement>
}

const Categoryitem = (props: Props) => {
    return (
        <div className={props.classname} onClick={props.onclick}>
            <div className=' mb-2'>
                {
                    props.icon
                }
            </div>
            <span className=''>{props.title}</span>

        </div>
    )
}

export default Categoryitem;