/* global app */
/*jshint expr: true*/
describe('Todo', function() {
    'use strict';

    var subject, model, view;

    var setUpModel = function(todos) {

        var todoCounts = {
            active: todos.filter(function(todo) {
                return !todo.completed;
            }).length,
            completed: todos.filter(function(todo) {
                return !!todo.completed;
            }).length,
            total: todos.length
        };

        model.read.returns({next: function(){return {value: todos};}});
        model.getCount.returns(todoCounts);
        model.remove.returns({next: function(){return {value: null};}});
        model.create.returns({next: function(){return {value: null};}});
        model.update.returns({next: function(){return {value: null};}});
    };

    var createViewStub = function() {
        var eventRegistry = {};
        return {
            render: function() {},
            bind: function(event, handler) {
                eventRegistry[event] = handler;
            },
            trigger: function(event, parameter) {
                eventRegistry[event](parameter);
            }
        };
    };

    beforeEach(function() {
        model = {
            read: function() {},
            getCount: function() {},
            remove: function() {},
            create: function() {},
            update: function() {}
        };

        sinon.stub(model);
        view = createViewStub();
        sinon.spy(view, 'render');

        subject = new app.Controller(model, view);
    });

    it('App exists', function() {
        expect(window.app).is.not.undefined();
    });

    describe('routing', function() {

        it('should show entries on start-up', function() {
            setUpModel([]);
            subject.setView('');

            expect(view.render).to.have.been.calledWith('showEntries');
        });

        it('should show all entries without a route', function () {
            var todo = {title: 'my todo'};
            setUpModel([todo]);
            subject.setView('');

            expect(view.render).to.have.been.calledWith('showEntries', [todo]);
        });

        it('should show active entries', function () {
            var todo = {title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('#/active');

            expect(model.read).to.have.been.calledWith({completed: false});
            expect(view.render).to.have.been.calledWith('showEntries', [todo]);
        });

        it('should show completed entries', function () {
            var todo = {title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('#/completed');

            expect(model.read).to.have.been.calledWith({completed: true});
            expect(view.render).to.have.been.calledWith('showEntries', [todo]);
        });
    });

	describe('stuff rename me', function(){

	 	it('should show the content block when todos exists', function () {
	        setUpModel([{title: 'my todo', completed: true}]);
	        subject.setView('');

	        expect(view.render).to.have.been.calledWith('contentBlockVisibility', {
	            visible: true
	        });
	    });

	    it('should hide the content block when no todos exists', function () {
	        setUpModel([]);
	        subject.setView('');

	        expect(view.render).to.have.been.calledWith('contentBlockVisibility', {
	            visible: false
	        });
	    });

	    it('should check the toggle all button, if all todos are completed', function () {
	        setUpModel([{title: 'my todo', completed: true}]);
	        subject.setView('');

	        expect(view.render).to.have.been.calledWith('toggleAll', {
	            checked: true
	        });
	    });

	    it('should set the "clear completed" button', function () {
	        var todo = {id: 42, title: 'my todo', completed: true};
	        setUpModel([todo]);
	        subject.setView('');

	        expect(view.render).to.have.been.calledWith('clearCompletedButton', {
	            completed: 1,
	            visible: true
	        });
	    });

	    it('should highlight "All" filter by default', function () {
	        setUpModel([]);
	        subject.setView('');

	        expect(view.render).to.have.been.calledWith('setFilter', '');
	    });

	    it('should highlight "Active" filter when switching to active view', function () {
	        setUpModel([]);
	        subject.setView('#/active');

	        expect(view.render).to.have.been.calledWith('setFilter', 'active');
	    });
	});

	describe('toggle all', function () {
        it('should toggle all todos to completed', function () {
            var todos = [{
                    id: 42,
                    title: 'my todo',
                    completed: false
                }, {
                    id: 21,
                    title: 'another todo',
                    completed: false
                }];
            setUpModel(todos);
            subject.setView('');
            view.trigger('toggleAll', {completed: true});

            expect(model.update).to.have.been.calledWith(42, {completed: true});
            expect(model.update).to.have.been.calledWith(21, {completed: true});
        });

        it('should update the view', function () {
            var todos = [{
                    id: 42,
                    title: 'my todo',
                    completed: true
                }];
            setUpModel(todos);
            subject.setView('');
            view.trigger('toggleAll', {completed: false});

            expect(view.render).to.have.been.calledWith('elementComplete', {id : 42, completed : false});
        });
    });

	describe('new todo', function () {
        it('should add a new todo to the model', function () {
            setUpModel([]);
            subject.setView('');
            view.trigger('newTodo', 'a new todo');

            expect(model.create).to.have.been.calledWith('a new todo');
        });

        it('should add a new todo to the view', function () {
        	var newTodo = [{title: 'a new todo', completed: false}];
            setUpModel([]);
            subject.setView('');
            model.read.returns({next: function(){return {value: newTodo};}});
            view.trigger('newTodo', 'a new todo');

            expect(model.read).to.have.been.called;

            expect(view.render).to.have.been.calledWith('showEntries', [{
                title: 'a new todo',
                completed: false
            }]);
        });

        it('should clear the input field when a new todo is added', function () {
            setUpModel([]);
            subject.setView('');
            view.trigger('newTodo', 'a new todo');

            expect(view.render).to.have.been.calledWith('clearNewTodo');
        });
    });

    describe('element removal', function () {
        it('should remove an entry from the model', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemRemove', {id: 42});

            expect(model.remove).to.have.been.calledWith(42);
        });

        it('should remove an entry from the view', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemRemove', {id: 42});

            expect(view.render).to.have.been.calledWith('removeItem', 42);
        });

        it('should update the element count', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemRemove', {id: 42});

            expect(view.render).to.have.been.calledWith('updateElementCount', 0);
        });
    });

    describe('remove completed', function () {
        it('should remove a completed entry from the model', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('removeCompleted');

            expect(model.read).to.have.been.calledWith({completed: true});
            expect(model.remove).to.have.been.calledWith(42);
        });

        it('should remove a completed entry from the view', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('removeCompleted');

            expect(view.render).to.have.been.calledWith('removeItem', 42);
        });
    });

    describe('element complete toggle', function () {
        it('should update the model', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemToggle', {id: 21, completed: true});

            expect(model.update).to.have.been.calledWith(21, {completed: true});
        });

        it('should update the view', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemToggle', {id: 42, completed: false});

            expect(view.render).to.have.been.calledWith('elementComplete', {id: 42, completed: false});
        });
    });

    describe('edit item', function () {
        it('should switch to edit mode', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEdit', {id: 21});

            expect(view.render).to.have.been.calledWith('editItem', {id: 21, title: 'my todo'});
        });

        it('should leave edit mode on done', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEditDone', {id: 21, title: 'new title'});

            expect(view.render).to.have.been.calledWith('editItemDone', {id: 21, title: 'new title'});
        });

        it('should persist the changes on done', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEditDone', {id: 21, title: 'new title'});

            expect(model.update).to.have.been.calledWith(21, {title: 'new title'});
        });

        it('should remove the element from the model when persisting an empty title', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEditDone', {id: 21, title: ''});

            expect(model.remove).to.have.been.calledWith(21);
        });

        it('should remove the element from the view when persisting an empty title', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEditDone', {id: 21, title: ''});

            expect(view.render).to.have.been.calledWith('removeItem', 21);
        });

        it('should leave edit mode on cancel', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEditCancel', {id: 21});

            expect(view.render).to.have.been.calledWith('editItemDone', {id: 21, title: 'my todo'});
        });

        it('should not persist the changes on cancel', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');
            view.trigger('itemEditCancel', {id: 21});

            expect(model.update).not.to.have.been.called;
        });
    });
});
