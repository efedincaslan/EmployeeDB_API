function fetchEmployees() {
    fetch('http://127.0.0.1:8000/employees')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderTable(data);
        })
        .catch(error => console.error('Fetch error:', error));
}

fetchEmployees();

function renderTable(data) {
    let tableHTML = '<table border="1"><tr><th>ID</th><th>Name</th><th>Department</th><th>Action</th><th>Update</th></tr>';
    for (let i = 0; i < data.length; i++) {
        tableHTML += `<tr>
                                        <td>${data[i].id}</td>
                                        <td>${data[i].name}</td>
                                        <td>${data[i].department}</td>
                                        <td><button onclick="deleteEmployee(${data[i].id})">Delete</button></td>
                                        <td>
                                            
                                            <button onclick="updateEmployee(${data[i].id}, '${data[i].name}', '${data[i].department}')">Update</button>
                                        </td>
                                    </tr>`;
    }
    tableHTML += '</table>';
    document.getElementById("table-container").innerHTML = tableHTML;
    
}

function deleteEmployee(id) {
    fetch(`http://127.0.0.1:8000/employees/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchEmployees();
        })
        .catch(error => console.error('Delete error:', error));
}

function addEmployee() {
    const name = document.getElementById('new-name').value;
    const department = document.getElementById('new-department').value;

    fetch('http://127.0.0.1:8000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, department: department })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchEmployees();
        })
        .catch(error => console.error('Add error:', error));
}

function searchEmployees() {
    const query = document.getElementById('search-department').value;

    fetch(`http://127.0.0.1:8000/employees/search?department=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderTable(data); // Call a function to render the table with the fetched data
        })
        .catch(error => console.error('Search error:', error));}

function updateEmployee(id, currentName, currentDepartment) {
    const newName = prompt("New name:", currentName)
    const newDepartment = prompt("New department:", currentDepartment)
    
    if (!newName || !newDepartment) return // user cancelled
    
    fetch(`http://127.0.0.1:8000/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, department: newDepartment })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchEmployees();
    })
    .catch(error => console.error('Update error:', error));
}