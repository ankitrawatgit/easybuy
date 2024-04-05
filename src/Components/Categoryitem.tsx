import React, { ReactNode } from 'react'

type Props = {
    title: string,
    icon: ReactNode,
    classname: string
}

const Categoryitem = (props: Props) => {
    return (
        <div className={props.classname}>
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