$(document).ready(function() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(!currentUser) window.location.href = "login.html";

    $('#user-name').text(currentUser.name)
    renderTasks()
    $('#warbler').click(() => { window.open("Warbler Site by Julian Flores/Main.html", "_blank")});
    $('#logout').click(() => { localStorage.removeItem("currentUser"); window.location.href = "login.html"; });

    $('#btn-add').click(function() {
        let name = $('#task-name').val()
        let time = $('#discTime').val();
        let classification = $('#task-class').val();
        let description = $('#task-desc').val()

        if(!name || !time){
            alert("Fill name and time!")
            return
            }

        currentUser.tasks.push({ 
            id: Date.now(), 
            name, 
            time, 
            classification, 
            description, 
            completed: false 
        });
        
        saveAndRender();
        $('#task-name, #discTime, #task-desc').val('');
    });

    $(document).on('change', '.check-complete', function() {

        let id = $(this).closest('li').data('id');

        let task = currentUser.tasks.find(t => t.id == id);

        task.completed = $(this).is(':checked');

        saveAndRender();
    });

    $(document).on('click', '.btn-delete', function() {

        let id = $(this).closest('li').data('id');

        currentUser.tasks = currentUser.tasks.filter(t => t.id != id);

        saveAndRender();

    });

    $(document).on('click', '.btn-edit', function() {
        let id = $(this).closest('li').data('id');
        let task = currentUser.tasks.find(t => t.id == id);
        let newName = prompt("Edit Name:", task.name);
        if(newName){task.name = newName; saveAndRender()}
    });

    function saveAndRender() {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        let users = JSON.parse(localStorage.getItem("users"));
        let userIndex = users.findIndex(u => u.email === currentUser.email);
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
        renderTasks();
    }

    function renderTasks() {
        $('#task-list').empty();
        currentUser.tasks.forEach(task => {
            let statusClass = task.completed ? 'completed' : '';


            $('#task-list').append(
                `<li class="list-group-item d-flex justify-content-between align-items-center taskentry ${statusClass}" data-id="${task.id}">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" class="form-check-input me-3 check-complete" ${task.completed ? 'checked' : ''}>
                        <div>
                            <h6 class="mb-0">${task.name} <span class="badge bg-info text-dark categorybadge ms-2">${task.classification}</span></h6>
                            <small class="text-muted">${task.time} — ${task.description}</small>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-warning btn-edit me-2">Edit</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete">Delete</button>
                    </div>
                </li>`
            );


        });
    }
});