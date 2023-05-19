import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      return setErrorMsg("Please fill all the fields!");
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setErrorMsg("Passwords do not match!");
    }
    try {
      setLoading(true);
      setErrorMsg("");
      const { data, error } = await signUp(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!error && data) {
        setMsg(
          "Registration Successful"
        );
      } 
    } catch (error) {
      setErrorMsg("Error creating account");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" required />
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" required />
            </Form.Group>
            <Form.Group id="confirm-password" className="mt-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control ref={confirmPasswordRef} type="password" required />
            </Form.Group>
            {errorMsg && (
              <Alert 
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible>
                {errorMsg}
              </Alert>
            )}
            {msg && (
              <Alert
                variant="success"
                onClose={() => setMsg("")}
                dismissible>
                {msg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} className="w-50" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signIn">Sign In</Link>
      </div>
    </>
  );
};

export default SignUp;