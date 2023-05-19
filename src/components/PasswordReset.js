import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const emailRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await passwordReset(emailRef.current.value);
      console.log(error);
      console.log(data);
      setMsg(
        "Password reset email sent. Please check your inbox and follow the instructions."
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" required />
            </Form.Group>
            {msg && (
              <Alert
                variant="success"
                onClose={() => setMsg("")}
                dismissible>
                {msg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-50">
                Send Reset Link?
              </Button>
            </div>
          </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            Back to Sign In? <Link to={"/signIn"}>Sign In</Link>
          </div>
      </Card>
    </>
  );
};

export default PasswordReset;