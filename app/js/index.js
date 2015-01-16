import Store from './Store';
import Model from './TodoModel';
import Template from './TodoTemplate';
import Controller from './TodoCtrl';
import View from './TodoView';
import './Helpers';

class TodoApp {
	constructor(name) {
		this.storage = new Store(name);
		this.model = new Model(this.storage);
		this.template = new Template();
		this.view = new View(this.template);
		this.controller = new Controller(this.model, this.view);
	}

	setView() {
		todo.controller.setView(document.location.hash);
	}

}

try {
	var todo = new TodoApp('todos');
	$on(window, 'load', todo.setView);
	$on(window, 'hashchange', todo.setView);
} catch(e){
	console.log('App Could Not Be Started.');
}

window.app = {
	Controller: Controller,
	Model: Model,
	Template: Template,
	View: View
};

export default todo;