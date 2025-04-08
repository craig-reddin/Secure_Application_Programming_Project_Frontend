export async function createStudent(data: any) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch("https://127.0.0.1:5000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    alert("Error Creating Student");
  }
}

export async function updateStudent(url: any, data: any) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    alert("Error Updating Student");
  }
}

export async function getStudent(url: any) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return response;
  } catch (error) {
    alert("Error while getting Student");
  }
}

export async function deleteStudentApi(url: any) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return response;
  } catch (error) {
    alert("Error while getting Student");
  }
}

export async function signIn(data: any) {
  try {
    const response = await fetch("https://127.0.0.1:5000/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    alert("Error while Signing In");
  }
}
