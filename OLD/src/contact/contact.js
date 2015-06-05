define(["app", "build/contactModel"], function(app, ContactModel) {

	var ContactController = {
		model: null,
		state: {isNew: false},
		init: init,
		saveContact: saveContact
	};

	function init(query){
		if (query && query.id) {
			var Homophones = JSON.parse(localStorage.getItem("f7Base"));
			for (var i = 0; i< Homophones.length; i++) {
				if (Homophones[i].id === query.id) {
					ContactController.model = new ContactModel(Homophones[i]);
					ContactController.state.isNew = false;
					break;
				}
			}
		}
		else {
			ContactController.model = new ContactModel();
			ContactController.state.isNew = true;
		}
	}

	function saveContact() {
		var contact = ContactController.model;
		var formInput = app.f7.formToJSON('#contactEdit');
		contact.setValues(formInput);
		if (!contact.validate()) {
			app.f7.alert("First name and last name are empty");
			return;
		}
		var Homophones = JSON.parse(localStorage.getItem("f7Base"));
		if (ContactController.state.isNew) {
			Homophones.push(contact);
		}
		else {
			for (var i = 0; i< Homophones.length; i++) {
				if (Homophones[i].id === contact.id) {
					Homophones[i] = contact;
					break;
				}
			}
		}
		localStorage.setItem("f7Base", JSON.stringify(Homophones));
		app.router.sendMessage('list', 'update');
		app.mainView.goBack();
	}

	return ContactController;
});