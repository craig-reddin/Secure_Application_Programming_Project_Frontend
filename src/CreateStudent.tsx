import { useState } from "react";

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
  // Initialise form state with type
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    date_of_birth: "",
    email: "",
    student_type: "",
    course_name: "",
    course_code: "",
  });

  // Handles input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const displayUserInput = () => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Student Type:</strong> ${formData.student_type}</p>
              <p><strong>Course Name:</strong> ${formData.course_name}</p>
              <p><strong>Course Code:</strong> ${formData.course_code}</p>
            `,
        }}
      />
    );
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    displayUserInput();
    try {
      console.log(formData);
      const response = await fetch("http://127.0.0.1:5000/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student added successfully!");

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
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Here i use user input to create an XSS vulnerability

  return (
    <div className="content-container">
      <h1 className="page-headings">Add Student</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="formName">Full Name</label>
          <br></br>
          <input
            className="create-form-components"
            type="text"
            id="formName"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="formDateOfBirth">Date of Birth</label>
          <br></br>
          <input
            className="create-form-components"
            placeholder="Enter date of birth"
            type="text"
            id="formDateOfBirth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="formEmail">Email Address</label>
          <br></br>
          <input
            className="create-form-components"
            type="text"
            id="formEmail"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="formStudentType">Student Type</label>
          <br></br>
          <select
            className="create-form-components"
            id="formStudentType"
            name="student_type"
            value={formData.student_type}
            onChange={handleChange}
          >
            <option>Select Type</option>
            <option value="Student">Student</option>
            <option value="Mature Student">Mature Student</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="formCourseName">Course Name</label>
          <br></br>
          <input
            className="create-form-components"
            type="text"
            id="formCourseName"
            name="course_name"
            placeholder="Enter course name"
            value={formData.course_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="formCourseCode">Course Code</label>
          <br></br>
          <input
            className="create-form-components"
            type="text"
            id="formCourseCode"
            name="course_code"
            placeholder="Enter course code"
            value={formData.course_code}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
