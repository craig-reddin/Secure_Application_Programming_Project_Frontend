import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { validateAge } from "./Validation";
import { getStudent, updateStudent } from "./Services";

// Interface for form data
interface StudentData {
  name: string;
  date_of_birth: string;
  student_type: string;
  course_name: string;
  course_code: string;
}

function StudentUpdateForm() {
  const { id } = useParams<{ id: string }>();
  const url = `https://devopssecca1.site/student/${id}`;
  const navigate = useNavigate();
  // Extract the Id from the URL

  // Hook for managing the student form data
  const [formData, setFormData] = useState<StudentData>({
    // set initially to empty string values
    name: "",
    date_of_birth: "",
    student_type: "",
    course_name: "",
    course_code: "",
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  //Hook to execute when the comomnent mounts
  useEffect(() => {
    // Function to fetch student data
    const loadStudent = async () => {
      try {
        // call get student method to retrieve Student data to upadate

        const response = await getStudent(url);

        //ensure there is a reponse
        if (response) {
          //check if the response is not ok
          if (!response.ok) {
            //Throw an error to the user
            alert("Error Loading User");
            return;
          }

          //get the response and allocate variable to formData
          const data = await response.json();
          setFormData({
            name: data.name,
            date_of_birth: data.date_of_birth,
            student_type: data.student_type,
            course_name: data.course_name,
            course_code: data.course_code,
          });
        }
        // Data is loaded in so we set loading to fals to remove loading message
        setLoading(false);
      } catch (err) {
        //if an error occurs 
        alert("Error Loading User");
        setLoading(false);
      }
    };
    // ensure an id is provided before calling loadStudent function
    if (id) {
      loadStudent();
    }
  }, [id]);

  // called when the cancelled button is clicked
  const cancelUpdate = () => {
    //navigate to view_all students page
    navigate("/view_all");
  };

  // Handles input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     // takes the value updated name and new value, in the form  
     //update theprevious data to the new data
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //Ensure the page does not reload
    e.preventDefault();
    //ensure the correct student type is selected for data of birth or if an age too young for college is selected - i chose the age of 16 for this project
    if (!validateAge(formData.date_of_birth, formData.student_type)) {
      return;
    }
    try {

      
      const response = await updateStudent(url, formData);
      // check if response is a valid
      if (response) {
        //allocate the JSON response
        const data = await response.json();
        if (response.ok) {
          //if the response is ok - alrert the user
          alert("Student updated successfully!");
        } else {
          //alert the error sent back from the back end - user friendly
          alert(`Error: ${data.error}`);
        }
      }
    } catch (error) {
      alert("Error Updating User");
    }
  };

  return (
    <div className="content-container">
      <h1 className="page-headings">Update Student</h1>
      {/* Loading to prompt user if data had */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form className="create-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <br></br>
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
          <br></br>
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
