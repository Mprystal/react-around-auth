import React, {useState} from 'react';
import {register} from './Auth';
import InfoTooltip from './InfoTooltip'
import check from '../images/Unionchk.svg';
import x from '../images/Unionx.svg';


function Register({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [message, setMessage] = useState('');
    const [image, setImage]= useState(x)
   
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setIsInfoTooltipOpen(true)
        }, 500);
        register(email, password)
        .then((res) => {
            if( !res || res.statusCode === 400){  
                setImage(x)
                setMessage('Oops, something went wrong! Please try again.') 
                throw new Error( 'Error!')
            } else {
                return res
            }    
        })
        .then(()=> {
                setImage(check)
                setMessage('Success! You have now been registered.')
        })
        .then(()=> {
            setEmail('');
            setPassword('');
            setTimeout(() => {
                setImage('')
                history.push('/signin')
            }, 1500);
        })
        .catch((err) => {
            console.log(err)
                setImage(x)
                setMessage('Oops, something went wrong! Please try again.') 
        })
    }



    return (
        <>
        <div className='register'>
           
            <h2 className='register__heading'>Sign up</h2>
           
            <form onSubmit={handleSubmit} className='register__form'>
                <input id='email' name='email' type='email' className='register__input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />

                <input id='password' name='password' type='password' value={password} className='register__input' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>

                <button type='submit' className='register__button'>Sign up</button>
                
            </form>
          
            <p className='register__paragraph'><a href="/signin" style={{textDecoration:'none', color: 'white'}}>Already a member? Log in here!</a> </p>

        </div>
        <InfoTooltip image={image} message={message} open={isInfoTooltipOpen} onClose={()=>setIsInfoTooltipOpen(false)}/>
        </>
    )
}

export default Register;