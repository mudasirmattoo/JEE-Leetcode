import React, {useState} from 'react'

const UseStatePractice = () => {
    const[count, setCount] = useState(0);
    const handleMinus = (event) => {
        //count = event.target.count.value;
        //count = count - 1; 
        setCount(count-1);
    }
    const handlePlus = (event) => {
        //count = event.target.count.value;
        //count = count + 1; 
        setCount(count+1);
    }
  return (
    <div>
      <button onClick={handleMinus}>
        minus
      </button>


    <p>{count}</p>


      <button onClick={handlePlus}>
        plus
      </button>
    </div>
  )
}

export default UseStatePractice
