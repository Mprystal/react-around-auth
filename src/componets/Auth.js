const BASE_URL = 'https://register.nomoreparties.co'

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`,{
        method: 'POST',
        headers: {         
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then((response => {
        console.log(response)
        try {
            if (response.status === 200 || 201){
              return response.json();
            }
          } catch(e){
              return (e)
          }
    })).then((res)=> res)
    .catch((err) => console.log(err))
}

export const authorize = (email , password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(((response) => {
        console.log(response)
        return response.json()
    }))
    .then((data)=>{
        if(data.token){
            localStorage.setItem('jwt', data.token);
            return data
        } else {
            return
        }
    })
    .catch(err => console.log(err))
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`,{
        method: 'GET',
        headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
        }
    })
    .then( res => {
        console.log(res)
       return res.json()
    })
    .then(data => data)
    .catch((err) => console.log(err))
}