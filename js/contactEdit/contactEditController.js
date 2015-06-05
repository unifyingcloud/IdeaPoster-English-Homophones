define(["app", "js/contactModel", "js/contactEdit/contactEditView"], function(app, Contact, View) {

	var contact = null;
	var state = {
		isNew: false
	};
	var bindings = [{
		element: '.contact-delete-button',
		event: 'click',
		handler: deleteContact
	}];

	function init(query){
		var Homophones = JSON.parse(localStorage.getItem("f7Homophones"));
		if (query && query.id) {
			contact = new Contact(_.find(Homophones, { id: query.id }));
			state.isNew = false;
		}
		else {
			contact = new Contact({ isFavorite: query.isFavorite });
			state.isNew = true;
		}
		View.render({ model: contact, bindings: bindings, state: state, doneCallback: saveContact });
	}

	function deleteContact() {
		app.f7.actions([[{
			text: 'Delete word',
			red: true,
			onClick: function() {
				var Homophones = JSON.parse(localStorage.getItem("f7Homophones"));
				_.remove(Homophones, { id: contact.id });
				localStorage.setItem("f7Homophones", JSON.stringify(Homophones));
				app.router.load('list'); // reRender main page view
				app.mainView.goBack("index.html", false);
				app.f7.closeModal();
			}
		}], [{
			text: 'Cancel',
			bold: true
		}]]);
	}

	function saveContact(inputValues) {
		contact.setValues(inputValues);
		if (!contact.validate()) {
			app.f7.alert("First name and last name are empty");
			return;
		}
		var Homophones = JSON.parse(localStorage.getItem("f7Homophones"));
		if (!state.isNew) {
			_.remove(Homophones, { id: contact.id });
		}
		Homophones.push(contact);
		localStorage.setItem("f7Homophones", JSON.stringify(Homophones));
		app.router.load('list'); // reRender main page view
		closePage();
	}

	function closePage() {
		if (!state.isNew) {
			app.router.load('contact', {id: contact.id});
		}
		else {
			app.mainView.loadPage('contact.html?id=' + contact.id, false);
		}
		app.f7.closeModal();
	}

	return {
		init: init
	};
});