import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

// Define TypeScript interface for student data
interface StudentsData {
  id: string;
  name: string;
  date_of_birth: string;
  email: string;
  student_type: string;
  course_name: string;
  course_code: string;
}

function ViewStudents() {
  // State to store the list of students and the current student index
  const [formData, setFormData] = useState<StudentsData[]>([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  // Hook for navigation to other pages
  const navigate = useNavigate();

  // Function to handle input changes (though not used here for editable fields)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch the list of students when the component loads
  useEffect(() => {
    loadStudents();
  }, []);

  // Function to load students from the API
  const loadStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setFormData(data); // Update the formData with fetched data
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  // Function to handle form submission (POST request to add a new student)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student added successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Get the current student based on the index
  const currentStudentIs = formData[currentStudent];

  // Navigate to the next student (increase index)
  const handleNext = () => {
    if (currentStudent < formData.length - 1) {
      setCurrentStudent(currentStudent + 1);
    }
  };

  // Navigate to the previous student (decrease index)
  const handlePrevious = () => {
    if (currentStudent > 0) {
      setCurrentStudent(currentStudent - 1);
    }
  };

  // Function to delete the current student from the list
  const deleteStudent = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/student/${currentStudentIs.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("Student Deleted");
        const updatedStudents = formData.filter(
          (student) => student.id !== currentStudentIs.id
        );
        setFormData(updatedStudents);

        // Update the current student index after deletion
        if (currentStudent >= updatedStudents.length) {
          setCurrentStudent(Math.max(0, updatedStudents.length - 1));
        }
      } else {
        alert("Issue Deleting Student");
      }
    } catch (error) {
      console.error("Error Deleting Student:", error);
    }
  };

  // If no students exist, show a message indicating there are no students stored
  if (formData.length === 0) {
    return (
      <div className="content-container">
        <h2 className="update-no-students-heading">
          There are no Students Currently Stored
        </h2>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h1 className="page-headings">Add Student</h1>
      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={currentStudentIs.name}
            onChange={handleChange}

          />
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="date"
            name="date_of_birth"
            value={currentStudentIs.date_of_birth}
            onChange={handleChange}

          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="text"
            name="email"
            placeholder="Enter email"
            value={currentStudentIs.email}
            onChange={handleChange}

          />
        </Form.Group>

        <Form.Group controlId="formStudentType">
          <Form.Label>Student Type</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            as="select"
            name="student_type"
            value={currentStudentIs.student_type || ""}
            onChange={handleChange}

          >
            <option value="">Select Type</option>
            <option value="Student">Student</option>
            <option value="Mature Student">Mature Student</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="text"
            name="course_name"
            placeholder="Enter course name"
            value={currentStudentIs.course_name}
            onChange={handleChange}

          />
        </Form.Group>

        <Form.Group controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="text"
            name="course_code"
            placeholder="Enter course code"
            value={currentStudentIs.course_code}
            onChange={handleChange}

          />
        </Form.Group>

        {/* Button to navigate to the Update page for this student */}
        <Button
          onClick={() => navigate(`/update/${currentStudentIs.id}`)}
          className="create-submit-button"
        >
          Update Student
        </Button>

        {/* Button to go to the previous student */}
        <Button onClick={handlePrevious} className="create-submit-button">
          Previous Student
        </Button>

        {/* Button to go to the next student */}
        <Button onClick={handleNext} className="create-submit-button">
          Next Student 
        </Button>

        {/* Button to delete of the current student */}
        <Button onClick={deleteStudent} className="cancel-update-button">
          Delete Student
        </Button>
      </Form>
    </div>
  );
}

export default ViewStudents;
