import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { deleteStudentApi } from "./Services";

// Define TypeScript interface for form data
interface StudentsData {
  id: string;
  name: string;
  date_of_birth: string;
  email: string;
  student_type: string;
  course_name: string;
  course_code: string;
}

function AllStudents() {
  // Initialise form state with type
  const [formData, setFormData] = useState<StudentsData[]>([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  //Used to navigate to the update page
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  // Function to load students.
  const loadStudents = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch("https://127.0.0.1:5000/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        return;
      }
      setFormData(data);
    } catch (error) {
      alert("Error fetching Students");
    }
  };

  const currentStudentIs = formData[currentStudent];

  //increases the currentStudent Index
  const handleNext = () => {
    if (currentStudent === formData.length - 1) {
      alert("There are no more next students");
    }
    if (currentStudent < formData.length - 1) {
      setCurrentStudent(currentStudent + 1);
    }
  };

  const deleteStudent = async () => {
    const url = `https://127.0.0.1:5000/student/${currentStudentIs.id}`;
    try {
      const response = await deleteStudentApi(url);

      if (window.confirm("Are you sure you want to delete your account?")) {
        if (response) {
          if (response.ok) {
            alert("Student Deleted");

            const updatedStudents = formData.filter(
              (student) => student.id !== currentStudentIs.id
            );
            setFormData(updatedStudents);

            // Update the current student index
            if (currentStudent >= updatedStudents.length) {
              setCurrentStudent(Math.max(0, updatedStudents.length - 1));
            }
          } else {
            alert("Issue Deleting Student");
          }
        }
      }
    } catch (error) {
      console.error("Error Deleting Student:", error);
    }
  };

  //decreses the currentStudent Index
  const handlePrevious = () => {
    if (currentStudent == 0) {
      alert("There are no more previous students");
    }
    if (currentStudent > 0) {
      setCurrentStudent(currentStudent - 1);
    }
  };

  //Check number of recipes, if zero recipes are stored a message is returned
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
      <h1 className="page-headings">Navigate to View all Students</h1>
      <Form className="create-form">
        <Form.Group controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={currentStudentIs.name}
            readOnly
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
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="email"
            name="email"
            placeholder="Enter email"
            value={currentStudentIs.email}
            readOnly
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
            readOnly
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
            readOnly
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
            readOnly
          />
        </Form.Group>

        <Button
          onClick={() => navigate(`/update/${currentStudentIs.id}`)}
          className="create-submit-button"
        >
          Update Student
        </Button>
        <br></br>
        <Button onClick={handlePrevious} className="create-submit-button">
          Previous Student
        </Button>
        <Button onClick={handleNext} className="create-submit-button">
          Next Student
        </Button>
        <br></br>
        <Button
          onClick={deleteStudent}
          name="delete-button"
          className="cancel-update-button"
        >
          Delete Student
        </Button>
      </Form>
    </div>
  );
}

export default AllStudents;
