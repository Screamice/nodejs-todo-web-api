window.addEventListener('DOMContentLoaded', e => {
    updateTodos();
});

const updateTodos = () => {
    fetch('http://localhost:3000/listall')
    .then(res => res.json())
    .then(data => {
        if(data.response === "success"){
            const todos = data.data;
            document.querySelector('.show-list').innerHTML = '';
            todos.forEach(todo => {
                document.querySelector('.show-list').innerHTML += `
                    <div class="todo__item" id="${todo._id}">
                        <p class="todo__item__text ${(todo.status === true)? 'completed' : ''}">${todo.name}</p>
                        <div class="todo__item__actions">
                            <input type="checkbox" class="todo-status" ${(todo.status === true)? 'checked' : ''} />
                            <a id="delete-todo" href="#">X</a>
                        </div>
                    </div>
                `;
            });

            mapCheckBoxes();
            mapDelete();
        }
    })
    .catch(err => {
        console.error(err)
    });
};

const mapCheckBoxes = () => {
    document.querySelectorAll('.todo-status').forEach(item => {
        item.addEventListener('click', async event => {
            const id = event.target.parentNode.parentNode.id;
            let classes = event.target.parentNode.parentNode.childNodes[3].className.replace('completed', '').trim();

            const completed = event.target.checked;
            console.log(id);
            console.log(completed);
            
            const res = await completeTodo(id, completed);
            if(res.response === "success"){
                if(completed){
                    event.target.parentNode.parentNode.childNodes[2].className += 'completed';
                }
                else{
                    event.target.parentNode.parentNode.childNodes[2].className += classes;
                }
            }
        });
    });
};

const completeTodo = async (id, completed) => {
    const res = await fetch('http://localhost:3000/update', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            status: completed
        })
    });

    return res;
};

document.querySelector('#formulario').addEventListener('submit', e => {
    e.preventDefault();

    const text = document.querySelector('#input-todo').value;

    if(text === '') return false;

    fetch('http://localhost:3000/new-todo', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: text
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.response === 'success'){
            updateTodos();
            document.querySelector('#input-todo').value = '';
        }
    })
});

const mapDelete = () => {
    document.querySelectorAll('#delete-todo').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            const id = event.target.parentNode.parentNode.id;

            fetch('http://localhost:3000/delete', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.response === 'success'){
                    updateTodos();
                }
            });
        });
    });
};