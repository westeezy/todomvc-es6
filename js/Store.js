/*jshint eqeqeq:false */

class Store {
	constructor(name) {
		this._dbName = name;

		if (!localStorage[name]) {
			var data = {
				todos: []
			};

			localStorage[name] = JSON.stringify(data);
		}
	}

	find (query) {
		var todos = JSON.parse(localStorage[this._dbName]).todos;
		return (function *findGenerator(){
		 	yield todos.filter(function (todo) {
					for (var q in query) {
						if (query[q] !== todo[q]) {
							return false;
						}
					}
					return true;
				});
		})();
	}

	findAll () {
		return (function *findAllGenerator(dbName){
			yield  JSON.parse(localStorage[dbName]).todos;
		})(this._dbName);
	}

	save (updateData, id=false) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0, len = todos.length; i < len; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);

			return (function *updateGenerator(dbName){
				yield JSON.parse(localStorage[dbName]).todos;
			})(this._dbName);
		} else {
			// Generate an ID
			updateData.id = new Date().getTime();

			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);

			return (function *updateGenerator(){
				yield [updateData];
			})();
		}
	}

	remove (id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		for (var i = 0, len = todos.length; i < len; i++) {
			if (todos[i].id == id) {
				todos.splice(i, 1);
				break;
			}
		}

		localStorage[this._dbName] = JSON.stringify(data);
		return (function *removeGen(dbName){
			yield JSON.parse(localStorage[dbName]).todos;
		})(this._dbName);
	}

	drop () {
		localStorage[this._dbName] = JSON.stringify({todos: []});
		return (function *dropGenerator(dbName){
			yield JSON.parse(localStorage[this._dbName]).todos;
		})(this._dbName);
	}
}

export default Store;