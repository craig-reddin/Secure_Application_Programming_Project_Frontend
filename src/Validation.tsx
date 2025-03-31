//https://gist.github.com/bmodena/559107976f2a7b394cf3c06be3027fd5
export const validateAge = (date: string, student_type: string) => {
  var today = new Date(),
    birthDate = new Date(date),
    age = today.getFullYear() - birthDate.getFullYear(),
    m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  //if age is lowerthan 16 prompt admin the person is too young to be a student
  if (age < 16) {
    alert("Student must be older than 16 to be a student");
    return false;
  }
  //if the age is less than 23 and mature student is selected then inform the admin a mature student must be over 23
  if (age < 23 && student_type == "Mature Student") {
    alert(
      "Student must be older than 22 to be a Mature Student, Please Select Student"
    );
    return false;
    //if the age is above 23 and Student is selected prompt the admin a student aged 23 or more must be a mature student
  }
  if (age > 22 && student_type == "Student") {
    alert(
      "Student must be younger than 23 to be a Student, Please select Mature Student"
    );
    return false;
  }

  return true;
};
