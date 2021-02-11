import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {register} from './Auth';


function Register({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
   
  
    const handleSubmit = (e) => {
        e.preventDefault();
        
        register(email, password)
        .then((res) => {
            console.log(res)
            if( !res || res.statusCode === 400){
                throw new Error( 'Error!')
            } else {
                setEmail('');
                setPassword('');
                history.push('/signin')
            }    
        })
        .catch((err) => {
            console.log(err)

            // setMessage(err.message)
        })
    }



    return (
        <div className='register'>
           
            <h2 className='register__heading'>Sign up</h2>
           
            <form onSubmit={handleSubmit} className='register__form'>
                <input id='email' name='email' type='email' className='register__input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />

                <input id='password' name='password' type='password' value={password} className='register__input' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>

                <button type='submit' className='register__button'>Sign up</button>
                
            </form>
          
            <p className='register__paragraph'><a href="/signin">Already a member? Log in here!</a> </p>

        </div>
    )
}

export default Register;