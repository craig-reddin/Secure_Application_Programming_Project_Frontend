import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validateAge } from "./Validation";
import { createStudent } from "./Services";

// interface for form data
interface StudentData {
  name: string;
  date_of_birth: string;
  email: string;
  student_type: string;
  course_name: string;
  course_code: string;
}

function StudentForm() {
  // Initialise form wuth empty string values
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    date_of_birth: "",
    email: "",
    student_type: "",
    course_name: "",
    course_code: "",
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
    //prevent paghe from reloading
    e.preventDefault();
    //validate age, description given in validate age method Validation.tsx and on updateStudent.tsx
    if (!validateAge(formData.date_of_birth, formData.student_type)) {
      return;
    }

    try {
      const response = await createStudent(formData);

      if (response) {
        const data = await response.json();
        if (response.ok) {
          alert("Student added successfully!");
          // If the creation was succesful clear all fields to empty strings
          setFormData({
            name: "",
            date_of_birth: "",
            email: "",
            student_type: "",
            course_name: "",
            course_code: "",
          });
        } else {
          alert(`Error: ${data.error}`);
        }
      }
    } catch (error) {
      alert("Error Creating Student");
    }
  };

  return (
    //content container for all pages
    <div className="content-container">
      <h1 className="page-headings">Add Student</h1>
      {/* Bootstrap form used, offers XSS vulnerabiitly prevention*/}
      {/* WHen the form is submited call the handle submit function */}
      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <br></br>
          {/* form control is used to allocate class names, tpyes, name, a value associuation, function to call if any changes are made to this form field
           ensuring the field is filled in before submission and allocating a max length, ensuring to not save more data than required and to 
           overcome potential SQLite max character issues - seems SQLight does not follow the Table format defined upoin creation,
           All VARCHARS are set to text values no matter the size allocated to that field eg, VARCHAR (50), VARCHAR (100) will remain as TEXT datatype. */}
          <Form.Control
            className="create-form-components"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
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
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={75}
          />
        </Form.Group>

        <Form.Group controlId="formStudentType">
          <Form.Label>Student Type</Form.Label>
          <br></br>
          <Form.Control
            className="create-form-components"
            as="select"
            name="student_type"
            value={formData.student_type}
            onChange={handleChange}
            required
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
            value={formData.course_name}
            onChange={handleChange}
            required
            maxLength={50}
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
            value={formData.course_code}
            onChange={handleChange}
            required
            maxLength={10}
          />
        </Form.Group>

        {/* Submission button to submit form */}
        <Button type="submit" className="create-submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default StudentForm;
