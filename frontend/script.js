const API_URL = "http://localhost:5000/students";

// ✅ Load all students
async function loadStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();

  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td>
        <button class="edit-btn" onclick="editStudent('${student._id}', '${student.name}', '${student.email}', '${student.course}')">Edit</button>
        <button class="delete-btn" onclick="deleteStudent('${student._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ✅ Add or Update student
async function addOrUpdateStudent() {
  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;

  if (!name || !email || !course) {
    alert("Please fill all fields!");
    return;
  }

  const studentData = { name, email, course };

  if (id) {
    // Update
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
    if (res.ok) alert("Student updated successfully!");
  } else {
    // Add new
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
    if (res.ok) alert("Student added successfully!");
  }

  clearForm();
  loadStudents();
}

// ✅ Edit Student (populate form)
function editStudent(id, name, email, course) {
  document.getElementById("studentId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("course").value = course;
}

// ✅ Delete Student
async function deleteStudent(id) {
  console.log("Deleting student with id:", id); // debug line
  if (!id) {
    alert("Invalid student ID!");
    return;
  }
  if (confirm("Are you sure you want to delete this student?")) {
    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Student deleted successfully!");
        loadStudents();
      } else {
        const data = await res.json();
        alert("Error deleting student: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error deleting student: " + err.message);
    }
  }
}



// ✅ Clear Form
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("course").value = "";
}

// Load data on page load
loadStudents();
