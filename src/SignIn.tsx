import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { signIn } from "./Services";

function SignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Get authentication state
  interface AdminData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<AdminData>({
    email: "",
    password: "",
  });

  // Handles input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);

      if (response) {
        const data = await response.json();
        if (response.ok) {
          alert("Sign In was Successful!");
          sessionStorage.setItem("SignedIn", "true");
          setIsAuthenticated(true);
          // Store authentication data in sessionStorage
          navigate("/create");
        } else {
          alert(`Error: ${data.error}`);
        }
      }
    } catch (error) {
      alert("Error while Signing In")
    }
  };

  return (
    <div className="content-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="labels">Email address</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="create-form-components"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <br />
          <Form.Text className="labels">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="labels">Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            className="create-form-components"
            onChange={handleChange}
            name="password"
            value={formData.password}
            required
          />
        </Form.Group>

        <Button className="create-submit-button" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;
