'use strict';

class TodoCtrl {

	constructor(model, view){
		this.model = model;
		this.view = view;
		this._attachEventListeners();
	}

	/**
	 * Loads and initialises the view
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	setView (locationHash) {
		var route = locationHash.split('/')[1];
		var page = route || '';
		this._updateFilterState(page);
	}

	/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	showAll () {
		var todos = this.model.read().next();
		this.view.render('showEntries', todos.value);
	}

	/**
	 * Renders all active tasks
	 */
	showActive () {
		var activeTodos = this.model.read({completed: false}).next();
		this.view.render('showEntries', activeTodos.value);
	}

	/**
	 * Renders all completed tasks
	 */
	showCompleted () {
		var completedTodos = this.model.read({completed: true}).next();
		this.view.render('showEntries', completedTodos.value);
	}

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	addItem (title) {
		if (title.trim() === '') {
			return;
		}

		this.model.create(title).next();
		this.view.render('clearNewTodo');
		this._filter(true);
	}

	/*
	 * Triggers the item editing mode.
	 */
	editItem (id) {
		var data = this.model.read(id).next();
		this.view.render('editItem', {id: id, title: data.value[0].title});
	}

	/*
	 * Finishes the item editing mode successfully.
	 */
	editItemSave (id, title) {
		if (title.trim()) {
			this.model.update(id, {title: title}).next();
			this.view.render('editItemDone', {id: id, title: title});
		} else {
			this.removeItem(id);
		}
	}

	/*
	 * Cancels the item editing mode.
	 */
	editItemCancel (id) {
		var data = this.model.read(id).next();
		this.view.render('editItemDone', {id: id, title: data.value[0].title});
	}

	/**
	 * By giving it an ID it'll find the DOM element matching that ID,
	 * remove it from the DOM and also remove it from storage.
	 *
	 * @param {number} id The ID of the item to remove from the DOM and
	 * storage
	 */
	removeItem (id) {
		this.model.remove(id).next();
		this.view.render('removeItem', id);
		this._filter();
	}

	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	removeCompletedItems () {
		var completed = this.model.read({completed: true}).next();
		completed.value.forEach(item=> {
			this.removeItem(item.id);
		});
		this._filter();
	}

	/**
	 * Give it an ID of a model and a checkbox and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} checkbox The checkbox to check the state of complete
	 *                          or not
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	toggleComplete (id, completed, silent) {
		this.model.update(id, {completed: completed}).next();
		this.view.render('elementComplete',{
			id: id,
			completed: completed
		});

		if (!silent) {
			this._filter();
		}
	}

	/**
	 * Will toggle ALL checkboxe's on/off state and completeness of models.
	 * Just pass in the event object.
	 */
	toggleAll (completed) {
		var todos = this.model.read({completed: !completed}).next();
		todos.value.forEach(item => {
			this.toggleComplete(item.id, completed, true);
		});

		this._filter();
	}	

	_attachEventListeners (){
		var that = this;
		this.view.bind('newTodo', function (title) {
			that.addItem(title);
		});

		this.view.bind('itemEdit', function (item) {
			that.editItem(item.id);
		});

		this.view.bind('itemEditDone', function (item) {
			that.editItemSave(item.id, item.title);
		});

		this.view.bind('itemEditCancel', function (item) {
			that.editItemCancel(item.id);
		});

		this.view.bind('itemRemove', function (item) {
			that.removeItem(item.id);
		});

		this.view.bind('itemToggle', function (item) {
			that.toggleComplete(item.id, item.completed);
		});

		this.view.bind('removeCompleted', function () {
			that.removeCompletedItems();
		});

		this.view.bind('toggleAll', function (status) {
			that.toggleAll(status.completed);
		});
	}

	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 */
	_updateCount () {
		var todos = this.model.getCount();
		this.view.render('updateElementCount', todos.active);
		this.view.render('clearCompletedButton', {
			completed: todos.completed,
			visible: todos.completed > 0
		});

		this.view.render('toggleAll', {checked: todos.completed === todos.total});
		this.view.render('contentBlockVisibility', {visible: todos.total > 0});
	}

	/**
	 * Re-filters the todo items, based on the active route.
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 */
	_filter (force) {
		var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

		// Update the elements on the page, which change with each completed todo
		this._updateCount();

		// If the last active route isn't "All", or we're switching routes, we
		// re-create the todo item elements, calling:
		//   this.show[All|Active|Completed]();
		if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this['show' + activeRoute]();
		}

		this._lastActiveRoute = activeRoute;
	}

	/**
	 * Simply updates the filter nav's selected states
	 */
	_updateFilterState (currentPage) {
		// Store a reference to the active route, allowing us to re-filter todo
		// items as they are marked complete or incomplete.
		this._activeRoute = currentPage;

		if (currentPage === '') {
			this._activeRoute = 'All';
		}

		this._filter();

		this.view.render('setFilter', currentPage);
	}
}


export default TodoCtrl;