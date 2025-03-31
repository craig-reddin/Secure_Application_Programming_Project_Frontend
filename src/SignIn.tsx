import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  interface AdminData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<AdminData>({
    email: "patrick012@ncistaff.com",
    password: "password",
  });

  // Handles input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.email);
    console.log(formData.password);


    displayUserInput();
    try {
      const response = await fetch("http://127.0.0.1:5000/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sign In was Successful!");

        // Store in sessionStorage without sanitizing the value
        sessionStorage.setItem("SignedIn", "true");

        navigate("/create");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // XSS Vulnerability: Directly rendering user input in the UI without escaping
  const displayUserInput = () => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `
              <p id ="injection"><strong>Email:</strong> ${formData.email}</p>
              <p id ="injection"><strong>Password:</strong> ${formData.password}</p>

            `,
        }}
      />
    );
  };

  return (
    <div className="content-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="labels">Email address</label>
          <br />
          <input
            type="text"
            placeholder="Enter email"
            className="create-form-components"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <br />
          <small className="labels">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="mb-3">
          <label className="labels">Password</label>
          <br />
          <input
            type="text"
            placeholder="Password"
            className="create-form-components"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </div>

        <button className="create-submit-button" type="submit">
          Submit
        </button>
      </form>
      {displayUserInput()}
    </div>
  );
}

export default SignIn;
