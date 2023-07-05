window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = { // characteristics 
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			//key  : value
			createdAt: new Date().getTime() //conclusion didnt do much we can use it though by adding the .ort thing regarding the items in the list to sort them by dates 
		}

		todos.push(todo); // adding the current task to the list of tasks 

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos() // 
	})

	DisplayTodos() // basically it will do its function everytime we click the submit button not just refresh the page
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input'); //inside a div we created
		const span = document.createElement('span'); //inside label
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');//both buttons under the action div
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

		//	if (todo.done) {
		//		todoItem.classList.add('done');
		//	} else {
		//		todoItem.classList.remove('done');
		//	}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly'); //removing read only 
			input.focus(); //.focus is 
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true); //adding read only again
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				//DisplayTodos()//refresh button, unneeded here

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos() //kindof a refresh button
		})

	})
}