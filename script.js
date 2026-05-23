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

        message.textContent = data;
        message.style.color = "green";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    })
    .catch((err) => {
        const message = document.getElementById('messageDisplay');

        message.textContent = err.message;
        message.style.color = "red";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
        
    });

    //clear Form
    clearForm();
});

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

