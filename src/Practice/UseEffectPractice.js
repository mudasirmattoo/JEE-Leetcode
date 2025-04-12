import React, { useEffect, useState } from 'react'

const UseEffectPractice = () => {

    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
        const timer = setInterval( () => {
            setSeconds(prevSeconds => prevSeconds+1);
        }, 1000000);
        
        return  () => {
            clearInterval(timer);
        }

    },[]);


  return (
    <div>
    <p> Seconds : {seconds} </p>
    </div>
  )
}

export default UseEffectPractice


/*
import React, { useEffect, useState } from 'react'

const UseEffectPractice = () => {

    const [loading, setLoading] = useState(true);
    const [joke, setJoke] = useState('');

    useEffect(()=>{
        const fetchJoke = async () =>{
            try{
                const response = await fetch('https://api.chucknorris.io/jokes/random');
                const data = await response.json();
                setJoke(data.value);
                setLoading(false);
            }
            catch(error){
                console.log('Error Loading', error);
                setLoading(false);
            }
        }
        fetchJoke();
    },[]);

  return (
    <div>
    {loading ? <p>loading...</p> : <p>{joke}</p>}
    </div>
  )
}

export default UseEffectPractice
*/