import React, { useState } from 'react'

const Counter = () => {


   const [count, setCount] = useState(0);

   const increment =()=>{
      setCount(count+1);
      if(count >= 15){
        setCount(count - 1)
      }
      else
      {
        setCount(count +1 )
      }

   }


  return (
    <div>

      <button onClick={increment}>click</button>

 <h1>{count}</h1>

    </div>
  )
}

export default Counter