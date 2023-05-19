import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export function SignIn() {
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(event) {
    event.preventDefault()

    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input type="email" id="input-email" ref={emailRef} required />

        <label htmlFor="input-password">Password</label>
        <input type="password" id="input-password" ref={passwordRef} required />
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signUp">Sign Up</Link>
      </p>
    </>
  )
}