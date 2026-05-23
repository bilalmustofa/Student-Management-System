// send data to server or backend
const studentForm = document.querySelector(".student-form");
studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get the value
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const department = document.getElementById('department').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;

    // send data to backend
    fetch("http://localhost:2020/insertStudent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            department: department,
            address: address,
            gender: gender
        })
    })
    .then(res => {
        if(!res.ok){
             throw new Error("Failed to add student");
        }
         return res.text();
    })
    .then(data => {
        const message = document.getElementById("messageDisplay");
        
        message.innerHTML += `
        <p class="alert alert-success">${data}</p>
        `

        // update student list
        studentList();

        //clear Form
        clearForm();

        setTimeout(() => {
            message.textContent = "";
        }, 3000);
    })
    .catch((err) => {
        const message = document.getElementById('messageDisplay');

        message.innerHTML += `
        <p class="alert alert-danger">${err.message}</p>
        `
        
        setTimeout(() => {
            message.textContent = "";
        }, 3000);
        
    });
});

// Receive data from server
function studentList() {
    fetch('http://localhost:2020/showStudent')
    .then(res => res.json())
    .then(data => {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = "";

        data.forEach(student => {
            let className = '';
            if(student.department === "Information System"){
                className = "IS-color";
            }
            if(student.department === "Information Technology"){
                className = "IT-color";
            }
            if(student.department === "Software Engineer"){
                className = "SE-color";
            }
            if(student.department === "Computer Science"){
                className = "CS-color";
            }

            tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.full_name}</td>
                <td>${student.email}</td>
                <td><p class="${className}">${student.department}</p></td>
                <td>${student.phone}</td>
                <td>
                    <span class="btn bg-warning me-1"><i class="fa-solid fa-edit"></i></span>
                    <span class="btn bg-danger text-white"><i class="fa-solid fa-trash"></i></span>
                </td>
            </tr>
            `
            const studentNumber = document.getElementById('studentNumber').textContent = `
            Showing ${data.length} Students`;
        });
    })
    .catch(err => {
        console.log(err);
    })
}
studentList(); 




// Reseat the form
const reset = document.getElementById('reset');
function clearForm() {
    //clear the form
    const fullName = document.getElementById('fullName').value = "";
    const email = document.getElementById('email').value = "";
    const phoneNumber = document.getElementById('phoneNumber').value = "";
    const department = document.getElementById('department').selectedIndex = 0;
    const address = document.getElementById('address').value = "";
    const gender = document.getElementById('gender').selectedIndex = 0;
}
reset.addEventListener('click', clearForm);

