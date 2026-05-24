// stores current editing student id
let editingStudentId = null;

// send data to server or backend
const studentForm = document.querySelector(".student-form");
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get the value
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const department = document.getElementById("department").value;
  const address = document.getElementById("address").value;
  const gender = document.getElementById("gender").value;

  // create object
  const studentData = {
    fullName,
    email,
    phoneNumber,
    department,
    address,
    gender,
  };
  // UPDATE STUDENT
  if (editingStudentId) {
    fetch(`http://localhost:2020/updateStudent/${editingStudentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update student");
        }
        return res.text();
      })
      .then((data) => {
        //UPDATE IS SUCCESS
        const message = document.getElementById("messageDisplay");

        message.innerHTML = `
                <p class="alert alert-success">
                    ${data}
                </p>
            `;
            setTimeout(() => {
              message.textContent = "";
            }, 3000);

            document.getElementById("submitBtn").textContent = "Update Student...";
            setTimeout(() => {
             document.getElementById("submitBtn").textContent = "Save Student";
            }, 3500);

        // refresh table
        studentList();

        // clear form
        clearForm();

        // rest edit mode
        editingStudentId = null;

      })
      .catch((err) => {
        // UPDATE IS FAIL 
        const message = document.getElementById("messageDisplay");
        message.innerHTML = `
                <p class="alert alert-danger">
                    ${err.message}
                </p>
            `;
        setTimeout(() => {
          message.textContent = "";
        }, 3000);
      });
  } else {
    // ADD NEW Student data
    fetch("http://localhost:2020/insertStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add student");
        }
        return res.text();
      })
      .then((data) => {
        const message = document.getElementById("messageDisplay");

        message.innerHTML += `
        <p class="alert alert-success">${data}</p>
        `;

        // update student list
        studentList();

        //clear Form
        clearForm();

        setTimeout(() => {
          message.textContent = "";
        }, 3000);
      })
      .catch((err) => {
        const message = document.getElementById("messageDisplay");

        message.innerHTML += `
        <p class="alert alert-danger">${err.message}</p>
        `;

        setTimeout(() => {
          message.textContent = "";
        }, 3000);
      });
  }
});

// Receive data from server
function studentList() {
  fetch("http://localhost:2020/showStudent")
    .then((res) => res.json())
    .then((data) => {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      data.forEach((student, index) => {
        let className = "";
        if (student.department === "Information System") {
          className = "IS-color";
        }
        if (student.department === "Information Technology") {
          className = "IT-color";
        }
        if (student.department === "Software Engineer") {
          className = "SE-color";
        }
        if (student.department === "Computer Science") {
          className = "CS-color";
        }

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
           <!-- <td>${student.id}</td> -->
                <td>${student.full_name}</td>
                <td>${student.email}</td>
                <td><p class="${className}">${student.department}</p></td>
                <td>${student.phone}</td>
                <td>
                    <span class="btn bg-warning me-1" onclick="editStudent(${student.id})"><i class="fa-solid fa-edit"></i></span>
                    <span class="btn bg-danger text-white" onclick="deleteStudent(${student.id})"><i class="fa-solid fa-trash"></i></span>
                </td>
            </tr>
            `;
        const studentNumber = (document.getElementById(
          "studentNumber",
        ).textContent = `
            Showing ${data.length} Students`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
studentList();

// get single student data and load in the form filed
function editStudent(id) {
  // console.log(id);
  fetch(`http://localhost:2020/students/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      document.getElementById("fullName").value = data.full_name;
      document.getElementById("email").value = data.email;
      document.getElementById("phoneNumber").value = data.phone;
      document.getElementById("department").value = data.department;
      document.getElementById("address").value = data.address;
      document.getElementById("gender").value = data.gender;
      // console.log(data.gender);

      // save the updated student id
      editingStudentId = id;
      // console.log(editingStudentId);

      //scroll in the form
      window.scrollTo(0, 0);
    })
    .catch((err) => {
      console.log(err);
    });
}

//delete singe student
function deleteStudent(id) {
  // confirm before delete
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?",
  );

  if (!confirmDelete) {
    return;
  }
  fetch(`http://localhost:2020/deleteStudent/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete student");
      }
      return res.text();
    })
    .then((data) => {
      const message = document.getElementById("messageDisplay");

      message.innerHTML = `
                <p class="alert alert-success">
                    ${data}
                </p>
            `;
      // refresh table
      studentList();
      //scroll in the form
      window.scrollTo(0, 0);

      setTimeout(() => {
        message.textContent = "";
      }, 3000);
    })
    .catch((err) => {
        const message = document.getElementById("messageDisplay");

        message.innerHTML += `
        <p class="alert alert-danger">${err.message}</p>
        `;
        setTimeout(() => {
          message.textContent = "";
        }, 3000);
    })
}

// Reseat the form
const reset = document.getElementById("reset");
function clearForm() {
  //clear the form
  const fullName = (document.getElementById("fullName").value = "");
  const email = (document.getElementById("email").value = "");
  const phoneNumber = (document.getElementById("phoneNumber").value = "");
  const department = (document.getElementById("department").selectedIndex = 0);
  const address = (document.getElementById("address").value = "");
  const gender = (document.getElementById("gender").selectedIndex = 0);
}
reset.addEventListener("click", clearForm);
