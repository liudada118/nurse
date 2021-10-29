import React, { useEffect, useState } from 'react'
let timer
export default function TwoContent() {
    
    const [num , setNum] = useState(5)
    useEffect(() =>{
        if(num > 0){
            setTimeout(()=>{
                setNum(num - 1)
            },1000)
        }
    },[num] )
    return (
            num
    )
}
