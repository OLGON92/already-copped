import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
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
      const { data, error } = await updatePassword(
        passwordRef.current.value
      );
      //Maybe add this to the line below && data
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("Error updating password");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm New Password</Form.Label>
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
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-50">
                Update Password
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpdatePassword;