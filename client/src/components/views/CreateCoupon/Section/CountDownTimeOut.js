import React, { useEffect, useState } from 'react'

function CountDownTimeOut(props) {
    const [days, setdays] = useState(0)
    const [hours, sethours] = useState(0)
    const [minutes, setminutes] = useState(0)
    const [days1, setdays1] = useState("")
    const [hours1, sethours1] = useState("")
    const [minutes1, setminutes1] = useState("")

    console.log(days1);

    useEffect(( ) => {
        getTimeUntil(props.deadline)
        
    }, [])
    useEffect(( ) => {
        setInterval(getTimeUntil(props.deadline),1000)
    }, [])

    const  leading0 =(num)=>{
      
        return num < 10 ? "0" + num : num;

    }
      const getTimeUntil = (deadline) => {
        let time = Date.parse(deadline) - Date.parse(new Date());
        if (time < 0) {
          setdays(0)
          sethours(0)
          setminutes(0)
        } else {
          let minutes = Math.floor((time / 1000 / 60) % 60);
          let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
          let days = Math.floor(time / (1000 * 60 * 60 * 24));
          setdays(days)
          sethours(hours)
          setminutes(minutes)
          }
        }  
  return (
    <div>
        <p>{leading0(days)} วัน {leading0(hours)} ชั่วโมง {leading0(minutes)} นาที</p>
    </div>

  )
}

export default CountDownTimeOut