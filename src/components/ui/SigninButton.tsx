"use client";
import React from 'react'
import { Button } from './button'
import { signIn } from 'next-auth/react'

type Props = {
  text : string;
}

const SigninButton = (props: Props) => {
  return (
    <Button onClick={()=>{
        signIn('google').catch(console.error);
    }}>
        {props.text}
    </Button>
  )
}

export default SigninButton