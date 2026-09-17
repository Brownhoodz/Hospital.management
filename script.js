```javascript
// Get existing patients from browser storage
let patients = JSON.parse(localStorage.getItem("patients")) || [];


// -------------------------------
// GO TO ADMISSION
// -------------------------------

function goToAdmission() {
    document.getElementById("admission").scrollIntoView({
        behavior: "smooth"
    });
}


// -------------------------------
// DISPLAY PATIENTS
// -------------------------------

function displayPatients() {

    const tableBody = document.getElementById("patientTableBody");

    const searchText =
        document.getElementById("searchBox").value.toLowerCase();

    tableBody.innerHTML = "";

    const filteredPatients = patients.filter(patient => {

        return (
            patient.name.toLowerCase().includes(searchText) ||
            patient.phone.toLowerCase().includes(searchText) ||
            patient.department.toLowerCase().includes(searchText)
        );

    });


    filteredPatients.forEach(patient => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td>${patient.department}</td>
            <td>${patient.reason}</td>

            <td>
                <button class="edit-btn"
                    onclick="editPatient(${patient.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deletePatient(${patient.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });
}


// -------------------------------
// ADD / UPDATE PATIENT
// -------------------------------

document
    .getElementById("admissionForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const editId =
            document.getElementById("editId").value;

        const patient = {

            id: editId
                ? Number(editId)
                : Date.now(),

            name:
                document.getElementById("patientName").value,

            age:
                document.getElementById("age").value,

            gender:
                document.getElementById("gender").value,

            phone:
                document.getElementById("phone").value,

            department:
                document.getElementById("department").value,

            reason:
                document.getElementById("reason").value
        };


        // UPDATE
        if (editId) {

            const index =
                patients.findIndex(
                    p => p.id === Number(editId)
                );

            patients[index] = patient;

            showMessage("Patient details updated successfully!");

        }

        // ADD
        else {

            patients.push(patient);

            showMessage("Patient admitted successfully!");

        }


        savePatients();

        this.reset();

        document.getElementById("editId").value = "";

        document.getElementById("submitButton").innerText =
            "Add Patient";

        document.getElementById("cancelButton").style.display =
            "none";

        displayPatients();

    });


// -------------------------------
// EDIT PATIENT
// -------------------------------

function editPatient(id) {

    const patient =
        patients.find(p => p.id === id);

    if (!patient) return;


    document.getElementById("editId").value =
        patient.id;

    document.getElementById("patientName").value =
        patient.name;

    document.getElementById("age").value =
        patient.age;

    document.getElementById("gender").value =
        patient.gender;

    document.getElementById("phone").value =
        patient.phone;

    document.getElementById("department").value =
        patient.department;

    document.getElementById("reason").value =
        patient.reason;


    document.getElementById("submitButton").innerText =
        "Update Patient";

    document.getElementById("cancelButton").style.display =
        "inline-block";


    goToAdmission();
}


// -------------------------------
// CANCEL EDIT
// -------------------------------

function cancelEdit() {

    document.getElementById("admissionForm").reset();

    document.getElementById("editId").value = "";

    document.getElementById("submitButton").innerText =
        "Add Patient";

    document.getElementById("cancelButton").style.display =
        "none";
}


// -------------------------------
// DELETE PATIENT
// -------------------------------

function deletePatient(id) {

    const patient =
        patients.find(p => p.id === id);

    if (!patient) return;


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            patient.name +
            "'s record?"
        );


    if (confirmDelete) {

        patients =
            patients.filter(p => p.id !== id);

        savePatients();

        displayPatients();

        showMessage("Patient record deleted.");

    }
}


// -------------------------------
// SAVE DATA
// -------------------------------

function savePatients() {

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );

}


// -------------------------------
// MESSAGE
// -------------------------------

function showMessage(text) {

    const message =
        document.getElementById("message");

    message.innerText = text;

    setTimeout(() => {

        message.innerText = "";

    }, 3000);

}


// Display patients when page loads
displayPatients();
```
