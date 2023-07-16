interface Todo {
    id: number;
    content: string;
    complete: boolean;
}

export function createTodoApp(id: string) {
    let todos: Todo[] = [];
    const root = document.getElementById(id);

    if (!root) {
        throw new Error(`Element with id "${id}" not found`);
    }

    // Get the DOM elements
    const input = root.querySelector('#todo-input') as HTMLInputElement;
    const list = root.querySelector('#todo-list') as HTMLUListElement;
    const info = root.querySelector('#todo-info') as HTMLElement;
    const totalCount = root.querySelector('#total-count') as HTMLElement;

    function addTodo(content: string) {
        const todo: Todo = {
            id: Date.now(),
            content,
            complete: false,
        };
        todos = [todo, ...todos];
        render('all' );
    }


    function deleteTodo(id: number) {
        todos = todos.filter(todo => todo.id !== id);
        render('all' );
    }

    function sortTodos() {
        todos.sort((a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1));
        render('all' );
    }

    function toggleTodo(id: number) {
        todos = todos.map(todo =>
            todo.id === id ? { ...todo, complete: !todo.complete } : todo
        );
        sortTodos();
    }
    function render(filter: 'all' | 'active' | 'complete') {
        // Clear the current list
        list.innerHTML = '';
    
        // Create and append a new li element for each todo
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.dataset.id = String(todo.id);
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.complete;
            checkbox.hidden = true;
           // checkbox.hidden = true; // This makes the checkbox hidden
            li.appendChild(checkbox);
    
            // Text node for the content
            const text = document.createTextNode(todo.content);
            li.appendChild(text);
    
            // Button for deletion
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            li.appendChild(deleteButton);
            
            // Styling for completed items
            if (todo.complete) {
                li.style.textDecoration = 'line-through';
                li.style.color = 'gray';
            }
            li.hidden = (filter === 'all')? false :
                        (filter === 'complete' && todo.complete)? false :
                        (filter === 'complete')? true :
                        (filter === 'active' && todo.complete)? true : false;

                            
    
            // Append the li element to the list
            list.appendChild(li);
        });
    
        // Update total count
        totalCount.textContent = String(todos.length);
    }
    
    function initRender() {
        console.log('inputis',input)
    }

    // Set up event handlers
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo(input.value);
            input.value = '';
        }
    });

    list.addEventListener('click', (event) => {

        const target = event.target as HTMLElement;
        console.log('click',target.tagName)
        if (target.tagName === 'LI') {
            toggleTodo(Number(target.dataset.id));
        } else if (target.tagName === 'BUTTON') {
            deleteTodo(Number(target.parentElement?.dataset.id));
        }
    });

    info.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        let filter: 'all' | 'active' | 'complete' = 'all';
        if (target.tagName === 'BUTTON') {
            if (target.id === 'delete-complete') {
                todos = todos.filter(todo => !todo.complete);
            } else {
                filter = target.id.split('-')[1] as 'all' | 'active' | 'complete';
                
            }
            console.log(todos)
            render(filter);
        }
    });

    return {
        addTodo,
        toggleTodo,
        deleteTodo,
        initRender,

    };
}

// Usage

