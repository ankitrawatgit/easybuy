import React, { MouseEventHandler, ReactNode, RefCallback } from 'react'
import DynamicIcon from './DynamicFaicon'

type Props = {
    title: string | undefined,
    icon: string,
    iconFamily: string 
    classname: string ,
    onclick:MouseEventHandler<HTMLDivElement>
}

const Categoryitem = (props: Props) => {
 
    return (
        <div className={props.classname} onClick={props.onclick}>
            <div className=' mb-2'>
                {
                  <DynamicIcon icon={props.icon} iconFamily={props.iconFamily}/>
                }
            </div>  
            <div className=''>{props.title}</div>

        </div>
    )
}

export default Categoryitem;