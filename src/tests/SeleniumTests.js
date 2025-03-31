import { Builder, By, Key, until } from "selenium-webdriver";

(async function runTests() {
  let driver = await new Builder().forBrowser("chrome").build();
  let testNumbers = 0;
  try {
    console.log("Testing: Sign In - Invalid Email");
    await driver.get("https://localhost:5174/");

    let emailInput = await driver.findElement(By.name("email"));

    // Enter invalid email (missing '@')
    await emailInput.sendKeys("patrick012ncistaff.com");

    // Check the validity state of the input field
    let isTypeMismatch = await driver.executeScript(
      "return arguments[0].validity.typeMismatch;",
      emailInput
    );

    // Verify test result
    if (isTypeMismatch) {
      console.log("Test Passed: Invalid Email Detected\n");
    } else {
      console.log("Test Failed: Invalid Email Not Detected\n");
    }
    testNumbers++;
    //
    //
    //
    console.log("Testing: Sign In - Invalid Password");
    await driver.get(" https://localhost:5174/");

    await driver
      .findElement(By.name("email"))
      .sendKeys("patrick012@ncistaff.com");
    await driver
      .findElement(By.name("password"))
      .sendKeys("password1", Key.RETURN);

    let loginInvalidPasswordAlert = await driver.wait(
      until.alertIsPresent(),
      5000
    );

    // Get the text of the alert (the success message)
    let alertTextInvalidPassword = await loginInvalidPasswordAlert.getText();
    if (alertTextInvalidPassword === "Error: Incorrect Credentials") {
      console.log("Test Passed: Invalid Pasword Detected\n");
    } else {
      console.log("Test Failed: Invalid Password Sign In\n");
    }
    // Accept the alert (clicks "OK")
    await loginInvalidPasswordAlert.accept();
    testNumbers++;
    //
    //
    //
    //
    //
    // Test 2: Sign in a User
    console.log("Testing: Sign In - Valid");
    await driver.get(" https://localhost:5174/");

    await driver
      .findElement(By.name("email"))
      .sendKeys("patrick012@ncistaff.com");
    await driver
      .findElement(By.name("password"))
      .sendKeys("password", Key.RETURN);

    let loginAlert = await driver.wait(until.alertIsPresent(), 5000);

    // Get the text of the alert (the success message)
    let alertText = await loginAlert.getText();

    if (alertText == "Sign In was Successful!") {
      console.log("Test Passed: Sign In Successful\n");
    } else {
      console.log("Test Failed: Sign In Unsuccessful\n");
    }
    await driver.switchTo().alert().accept();
    testNumbers++;
    //
    //
    //
    //
    //
    // Test 1: Create a Student
    console.log("Testing: Create Student...");
    await driver.get(" https://localhost:5174/create"); // Open create student page

    await driver.findElement(By.name("name")).sendKeys("Craig");
    await driver.findElement(By.name("date_of_birth")).sendKeys("20-05-2005");
    await driver
      .findElement(By.name("email"))
      .sendKeys("craig-reddin@hotmail.com");
    await driver.findElement(By.name("student_type")).sendKeys("Student");
    await driver
      .findElement(By.name("course_name"))
      .sendKeys("Computer Science");
    await driver.findElement(By.name("course_code")).sendKeys("CS123");

    await driver.findElement(By.className("create-submit-button")).click(); // Click submit button

    let createAlert = await driver.wait(until.alertIsPresent(), 5000);

    // Get the text of the alert (the success message)
    let createAlertText = await createAlert.getText();

    // console.log(createAlertText);
    if (createAlertText == "Student added successfully!") {
      console.log("Test Passed: Student Created\n");
    } else {
      console.log("Test Failed: Student was not created\n");
    }
    await driver.switchTo().alert().accept();
    testNumbers++;
    //
    //
    //
    //
    //
    // Test 1: Create a Student
    console.log("Testing: Create Student: Invalid Creation Empty Fields");
    await driver.get(" https://localhost:5174/create"); // Open create student page

    await driver.findElement(By.name("name")).sendKeys("");
    await driver.findElement(By.name("date_of_birth")).sendKeys("");
    await driver.findElement(By.name("email")).sendKeys("");
    await driver.findElement(By.name("student_type")).sendKeys("");
    await driver.findElement(By.name("course_name")).sendKeys("");
    await driver.findElement(By.name("course_code")).sendKeys("");

    await driver.findElement(By.className("create-submit-button")).click(); // Click submit button

    let nameInputEmptyName = await driver.findElement(By.name("name"));

    let isTypeMismatchEmptyName = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      nameInputEmptyName
    );
    if (isTypeMismatchEmptyName) {
      console.log("Test Passed: Empty Name Detected\n");
    } else {
      console.log("Test Failed: Empty Name Not Detected\n");
    }
    testNumbers++;

    let emailInputEmptyEmail = await driver.findElement(By.name("email"));

    let isTypeMismatchEmptyEmail = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      emailInputEmptyEmail
    );

    // Verify test result
    if (isTypeMismatchEmptyEmail) {
      console.log("Test Passed: Empty Email Detected\n");
    } else {
      console.log("Test Failed: Empty Email Not Detected\n");
    }
    testNumbers++;

    let inputEmptyDob = await driver.findElement(By.name("date_of_birth"));

    let isTypeMismatchEmptyDob = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      inputEmptyDob
    );

    // Verify test result
    if (isTypeMismatchEmptyDob) {
      console.log("Test Passed: Empty Date Of Birth Detected\n");
    } else {
      console.log("Test Failed: Empty Date Of Birth Not Detected\n");
    }
    testNumbers++;

    let InputEmptyStudentType = await driver.findElement(
      By.name("date_of_birth")
    );

    let isTypeMismatchEmptyStudentType = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      InputEmptyStudentType
    );

    // Verify test result
    if (isTypeMismatchEmptyStudentType) {
      console.log("Test Passed: Empty Student Type Detected\n");
    } else {
      console.log("Test Failed: Empty Student Type Not Detected\n");
    }
    testNumbers++;

    let InputEmptyCourseName = await driver.findElement(By.name("course_name"));

    let isTypeMismatchEmptyCourseName = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      InputEmptyCourseName
    );

    // Verify test result
    if (isTypeMismatchEmptyCourseName) {
      console.log("Test Passed: Empty Course Name Detected\n");
    } else {
      console.log("Test Failed: Empty Course Name Not Detected\n");
    }
    testNumbers++;

    let InputEmptyCourseCode = await driver.findElement(By.name("course_code"));

    let isTypeMismatchEmptyCourseCode = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      InputEmptyCourseCode
    );

    // Verify test result
    if (isTypeMismatchEmptyCourseCode) {
      console.log("Test Passed: Empty Course Code Detected\n");
    } else {
      console.log("Test Failed: Empty Course Code Not Detected\n");
    }
    testNumbers++;

    //
    //
    //
    // Test 3: Fetch Student Details
    console.log("Testing: View Student...");
    await driver.get("https://localhost:5174/update/1");
    let studentName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000
    );

    let studentNameText = await studentName.getAttribute("value");
    if (studentNameText === "Steven Malone") {
      console.log("Test Passed: Correct Student Returned\n");
    } else {
      console.log("Test Failed: Get Student\n");
    }
    testNumbers++;
    //
    //
    //
    //
    //
    // Test 3: Fetch Student Details
    console.log("Testing: Update Student...");
    await driver.get("https://localhost:5174/update/1");
    let studentNameCurrent = await driver.wait(
      until.elementLocated(By.name("name")),
      5000
    );
    //create-submit-button
    await driver.findElement(By.name("name")).sendKeys(" Updated");
    await driver.findElement(By.className("create-submit-button")).click();
    let updateAlert = await driver.wait(until.alertIsPresent(), 5000);

    // Get the text of the alert (the success message)
    let updateAlertText = await updateAlert.getText();

    if (updateAlertText == "Student updated successfully!") {
      console.log("Test Passed: Update Successful\n");
    } else {
      console.log("Test Failed: Update Unsuccessful\n");
    }
    await driver.switchTo().alert().accept();

    await driver.get("https://localhost:5174/update/1");
    let studentNameUpdated = await driver.wait(
      until.elementLocated(By.name("name")),
      5000
    );

    let studentNameTextUpdated = await studentNameUpdated.getAttribute("value");
    if (studentNameTextUpdated == "Steven Malone Updated") {
      console.log("Tessed Passed: Student Updated\n");
    } else {
      console.log("Test Failed: Name Did Not Update\n");
    }
    testNumbers++;

    if (studentNameText === "Steven Malone") {
      console.log("Test Passed: Correct Student Returned\n");
    } else {
      console.log("Test Failed: Get Student\n");
    }
    testNumbers++;
    //
    //
    //
    //
    console.log("Testing: Update Student - Invalid Empty Fields");
    await driver.get("https://localhost:5174/update/1"); // Open update student page

    // Wait for name field to be ready and then clear
    await driver.wait(until.elementLocated(By.name("name")), 5000);
    await driver.findElement(By.name("name")).click();
    await driver.findElement(By.name("name")).clear();

    // Wait for date of birth field to be ready and then clear
    await driver.wait(until.elementLocated(By.name("date_of_birth")), 5000);
    await driver.findElement(By.name("date_of_birth")).click();
    await driver.findElement(By.name("date_of_birth")).clear();


    await driver.wait(until.elementLocated(By.name("course_name")), 5000);
    await driver.findElement(By.name("course_name")).click();
    await driver.findElement(By.name("course_name")).clear();

    await driver.wait(until.elementLocated(By.name("course_code")), 5000);
    await driver.findElement(By.name("course_code")).click();
    await driver.findElement(By.name("course_code")).clear();

    await driver.findElement(By.className("create-submit-button")).click(); // Click submit button
    let nameInputEmpty = await driver.findElement(By.name("name"));
    let isEmptyName = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      nameInputEmpty
    );
    if (isEmptyName) {
      console.log("Test Passed: Empty Name Detected\n");
    } else {
      console.log("Test Failed: Empty Name Not Detected\n");
    }

    testNumbers++;

    let dobInputEmpty = await driver.findElement(By.name("date_of_birth"));
    let isEmptyDob = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      dobInputEmpty
    );
    if (isEmptyDob) {
      console.log("Test Passed: Empty Date of Birth Detected\n");
    } else {
      console.log("Test Failed: Empty Date of Birth Not Detected\n");
    }

    testNumbers++;

    

    let courseNameInputEmpty = await driver.findElement(By.name("course_name"));
    let isEmptyCourseName = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      courseNameInputEmpty
    );
    if (isEmptyCourseName) {
      console.log("Test Passed: Empty Course Name Detected\n");
    } else {
      console.log("Test Failed: Empty Course Name Not Detected\n");
    }

    testNumbers++;

    let courseCodeInputEmpty = await driver.findElement(By.name("course_code"));
    let isEmptyCourseCode = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      courseCodeInputEmpty
    );
    if (isEmptyCourseCode) {
      console.log("Test Passed: Empty Course Code Detected\n");
    } else {
      console.log("Test Failed: Empty Course Code Not Detected\n");
    }

    testNumbers++;

    //
    //
    //
    //
    //
    //
    //
    //
    // Test 4: Delete a Student
    console.log("Testing: Delete Student...");
    await driver.get("https://localhost:5174/view_all");
    let deleteButton = await driver.wait(
      until.elementLocated(By.name("delete-button")),
      5000
    );
    await deleteButton.click();

    let deleteAlert = await driver.wait(until.alertIsPresent(), 5000);

    // Get the text of the alert (the success message)
    let deleteText = await deleteAlert.getText();
    if (deleteText === "Student Deleted") {
      console.log("Test Passed: Student Deleted\n");
    } else {
      console.log("Delete Student Test Failed\n");
    }
    // Accept the alert (clicks "OK")
    await deleteAlert.accept();
    testNumbers++;
    //
    //
    //
    //
    //
    //
    //
    //
    console.log("Number of Tests Completed:" + testNumbers);
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await driver.quit(); // Close browser
  }
})();
