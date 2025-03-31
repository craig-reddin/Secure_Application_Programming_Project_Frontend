import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

// Define TypeScript interface for form data
interface StudentData {
  name: string;
  date_of_birth: string;
  student_type: string;
  course_name: string;
  course_code: string;
}

function StudentUpdateForm() {
  const navigate = useNavigate();
  // Extract the ID from the URL
  const { id } = useParams<{ id: string }>();

  // State for managing form data
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    date_of_birth: "",
    student_type: "",
    course_name: "",
    course_code: "",
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch student data
    const loadStudent = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/student/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setFormData({
          name: data.name,
          date_of_birth: data.date_of_birth,
          student_type: data.student_type,
          course_name: data.course_name,
          course_code: data.course_code,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading student data:", err);
        setLoading(false);
      }
    };

    if (id) {
      loadStudent();
    }
  }, [id]);

  const cancelUpdate = () => {
    navigate("/view_all");
  };

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
    try {
      const response = await fetch(`http://127.0.0.1:5000/student/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student updated successfully!");
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
      <div>
        <h2>Entered Information:</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Date of Birth:</strong> ${formData.date_of_birth}</p>
              <p><strong>Student Type:</strong> ${formData.student_type}</p>
              <p><strong>Course Name:</strong> ${formData.course_name}</p>
              <p><strong>Course Code:</strong> ${formData.course_code}</p>
            `,
          }}
        />
      </div>
    );
  };

  return (
    <div className="content-container">
      <h1 className="page-headings">Update Student</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form className="create-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <br />
            <Form.Control
              className="create-form-components"
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}

            />
          </Form.Group>

          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <br />
            <Form.Control
              className="create-form-components"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}

            />
          </Form.Group>

          <Form.Group controlId="formStudentType">
            <Form.Label>Student Type</Form.Label>
            <br />
            <Form.Control
              className="create-form-components"
              as="select"
              name="student_type"
              value={formData.student_type}
              onChange={handleChange}

            >
              <option value="">Select Type</option>
              <option value="Student">Student</option>
              <option value="Mature Student">Mature Student</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formCourseName">
            <Form.Label>Course Name</Form.Label>
            <br />
            <Form.Control
              className="create-form-components"
              type="text"
              name="course_name"
              placeholder="Enter course name"
              value={formData.course_name}
              onChange={handleChange}

            />
          </Form.Group>

          <Form.Group controlId="formCourseCode">
            <Form.Label>Course Code</Form.Label>
            <br />
            <Form.Control
              className="create-form-components"
              type="text"
              name="course_code"
              placeholder="Enter course code"
              value={formData.course_code}
              onChange={handleChange}

            />
          </Form.Group>
          <br />
          <Button type="submit" className="create-submit-button">
            Update Student
          </Button>

          <Button onClick={cancelUpdate} className="cancel-update-button">
            Cancel Update
          </Button>
        </Form>
      )}

    </div>
  );
}

export default StudentUpdateForm;
