/*global localStorage,define */
define(["build/contactModel"], function(Contact) {

	function loadHomophones() {
		var f7Base = localStorage.getItem("f7Base");
		var Homophones = f7Base ? JSON.parse(f7Base) : tempInitializeStorage();
		return Homophones;
	}

	function tempInitializeStorage() {
		var Homophones = [
			new Contact({id: "1", firstName: "Alex", lastName: "Black", phone: "+380501234567" }),
			new Contact({id: "2", firstName: "Kate", lastName: "White", phone: "+380507654321" })
		];
		localStorage.setItem("f7Base", JSON.stringify(Homophones));
		return JSON.parse(localStorage.getItem("f7Base"));
	}

	function deleteItem(id) {
		var Homophones = JSON.parse(localStorage.getItem("f7Base"));
		for (var i = 0; i < Homophones.length; i++) {
			if (Homophones[i].id === id) {
				Homophones.splice(i, 1);
			}
		}
		localStorage.setItem("f7Base", JSON.stringify(Homophones));
	}

	return {
		loadHomophones: loadHomophones,
		deleteItem: deleteItem
	};
});