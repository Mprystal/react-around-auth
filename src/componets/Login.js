import React, {useState} from "react";
import {authorize} from './Auth'


function Login ({handleLogin, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();   
        if(!email || !password){
            return
        }
        authorize(email, password)
        .then((data) => {
            console.log(data)
            if(!data){
                throw new Error('error!')
            }
            if(data.token){
                setEmail('');
                setPassword(''); 
                handleLogin();
                history.push('/')
                return
            }
        })
        .catch(err => console.log(err) 
        // setMessage(err.message)
        )
    }


    return (
        <div className='login'>
           
            <h2 className='login__heading'>Sign in</h2>
           
            <form onSubmit={handleSubmit} className='login__form'>
                <input id='email' name='email' type='email' className='login__input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />

                <input id='password' name='password' type='password' value={password} className='login__input' placeholder='Password' onChange={e=>setPassword(e.target.value)} />

                <button type='submit' className='login__button'>Log in</button>
                
            </form>
          
            <p className='login__paragraph'> Not a member? Sign up here!</p>

        </div>
    )
}

export default Login;