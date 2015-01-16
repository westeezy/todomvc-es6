class TodoTemplate {
	constructor() {
		this.defaultTemplate =	
				'<li data-id="{{id}}" class="{{completed}}">' +
				'<div class="view">' +
					'<input class="toggle" type="checkbox" {{checked}}>' + 
					'<label>{{title}}</label>' + 
					'<button class="destroy"></button>' + 
				'</div>' +
			'</li>';
	}

	show (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var completed = '';
			var checked = '';

			if (data[i].completed) {
				completed = 'completed';
				checked = 'checked';
			}

			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', data[i].title);
			template = template.replace('{{completed}}', completed);
			template = template.replace('{{checked}}', checked);

			view = view + template;
		}

		return view;
	}

	itemCounter (activeTodos) {
		var plural = activeTodos === 1 ? '' : 's';

		return `<strong>${activeTodos}</strong> item${plural} left`;
	}
	clearCompletedButton (completedTodos) {
		return completedTodos > 0 ? `Clear completed (${completedTodos})` 
								  : '';
	}
}

export default TodoTemplate;