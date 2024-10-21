import React, { useContext, useEffect, useState } from 'react';
import Form from '../components/Form';
import axios from 'axios';
import {useRouter } from 'expo-router';
import { AuthContext } from '../components/Contexto';


function Login (){
    const [resposta,setResposta] = useState("")
    const {storeToken} = useContext(AuthContext);

    const titulo = "Login";
    
    const router = useRouter();

    const submitUser = async(nome,senha)=>{
        const response =  await axios.post('http://192.168.3.3:8000/check_user', {nome:nome,senha:senha});
        setResposta(response.data.message)

        if(response.data.token){
            await storeToken(response.data.token)
            router.push('/')
        }

    }


    return(
       <>
        <Form titulo={titulo} submitUser={submitUser} resposta={resposta}></Form>
       </>
    );

}

export default Login