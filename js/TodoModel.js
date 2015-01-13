class TodoModel {
    constructor(storage) {
        this.storage = storage;
    }

    create(title) {
        title = title || '';

        var newItem = {
            title: title.trim(),
            completed: false
        };

        return this.storage.save(newItem);
    }

    read(query) {
        var queryType = typeof query;
        switch(queryType) {
            case (queryType === 'function'):
                return this.storage.findAll();
            case (queryType === 'string'):
            case (queryType === 'number'):
                return this.storage.find({id: parseInt(query, 10)});
            default: 
                return this.storage.find(query);
        }
    }

    update(id, data) {
        return this.storage.save(data, id);
    }

    remove(id) {
        return this.storage.remove(id);
    }

    removeAll() {
        return this.storage.drop();
    }

    getCount() {
        var todoCounts = {
            active: 0,
            completed: 0,
            total: 0
        };

        var todos = this.storage.findAll().next();
        todos.value.forEach(todo => {
            if (todo.completed) {
                todoCounts.completed++;
            } else {
                todoCounts.active++;
            }
            todoCounts.total++;
        });

        return todoCounts;
    }


}

export default TodoModel;