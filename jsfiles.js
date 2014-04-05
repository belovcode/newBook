$(document).ready(function () {

							/* Вывод контактов, function */
	function shouContacts () {
		$('.main tbody tr').remove();
		$.each(Contacts, function (ind, value) {
			var firstName = value.firstName;
			var lastName = value.lastName;
			var phoneNumber = value.phoneNumber;
			
			var redDelBl = $('<div>').addClass('redDelImg');
			var img1 = $("<img src='img/karandash.png' alt='red' width='20' height='20'>").addClass('redactContact');
			var img2 = $("<img src='img/vedro.png' alt='del' width='20' height='20'>").addClass('deleteContact');
			redDelBl.append(img1, img2);

			var tr = $('<tr>').data("index",ind);
			$('<td>').addClass('numberContact').text(ind+1).appendTo(tr);
			$('<td>').text(firstName).appendTo(tr);
			$('<td>').text(lastName).appendTo(tr);
			$('<td>').text(phoneNumber).appendTo(tr);
			$('<td>').append(redDelBl).appendTo(tr);
			tr.appendTo($('tbody'));
			console.log(Contacts);
		});
	};
							/* Открытие формы, function */
	function openShouForm() {			
		var fon = $('<div>').addClass('fon');
		$('.main').append(fon);
		var reg = $('.addContactBlock');
		fon.fadeIn(300, function () { fon.append(reg); reg.fadeIn(300).animate ({
			'top': 150
		},200); });
	};
							/* Закрытие формы, function */
	function closeShouForm() {			
		$('.addContactBlock').animate ({
			'top': 0
		},200).fadeOut();
		$('.fon').fadeOut();
		$('input[name=firstName]').val('');
		$('input[name=lastName]').val('');
		$('input[name=phoneNumber]').val('');
	};
							/* Открытие формы Редактирования, function */
	function openRedactContact (numberContact,firstName,lastName,phoneNumber) {
		openShouForm();
		$('.novContact').text("Redact Contact");

		$('input[name=firstName]').val(firstName);
		$('input[name=lastName]').val(lastName);
		$('input[name=phoneNumber]').val(phoneNumber);
		$('input[name=submit]').val('Redact');
		$('input[name=submit]').removeClass('ok').addClass('redactButton').data("number",numberContact);
	};

							/* Редактирование контакта, function */
	function redactContact (numberContact,firstName,lastName,phoneNumber) {
		Contacts[numberContact].firstName = firstName;
		Contacts[numberContact].lastName = lastName;
		Contacts[numberContact].phoneNumber = phoneNumber;

		$('.novContact').text("New contact");
		$('input[name=submit]').val('Add Contact');
		$('input[name=submit]').addClass('ok').removeClass('redactButton');
		shouContacts();
	};


	// Открытие формы добовления контакта

	$('#addNewContacts').click(openShouForm);

	// Закрытие формы добовления контакта

	$('.closeImg').click(closeShouForm);

	// Вывод контактов

	var Contacts = [];
	shouContacts();

	// Добовление контакта

	$('.addContactForm').submit( function (event) {
		event.preventDefault();
		var firstName = $('input[name=firstName]').val();
		var lastName = $('input[name=lastName]').val();
		var phoneNumber = $('input[name=phoneNumber]').val();

		if ( firstName && lastName && phoneNumber ) {
			var contact = {
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber
			};
			Contacts.push(contact);
			closeShouForm(); /*Закрытие формы*/
			shouContacts(); /*Вывод всех контактов*/
		} else {
			if (!firstName) {
				$('input[name=firstName]').css({
					'border':'solid 2px red'
				});
			};
			if (!lastName) {
				$('input[name=lastName]').css({
					'border':'solid 2px red'
				});
			};
			if (!phoneNumber) {
				$('input[name=phoneNumber]').css({
					'border':'solid 2px red'
				});
			};
		};
	});

	// Перенос контакта для редактирования

	$('body').on('click','.redactContact', function () {
		var numberContact = $(this).closest('tr').data("index");
		var firstName = Contacts[numberContact].firstName;
		var lastName = Contacts[numberContact].lastName;
		var phoneNumber = Contacts[numberContact].phoneNumber;

		openRedactContact(numberContact,firstName,lastName,phoneNumber);
	});

	// Редактирование контакта

	$('body').on('click','.redactButton', function (event) {
		event.preventDefault();

		var numberContact = $(this).data("number");
		var firstName = $('input[name=firstName]').val();
		var lastName = $('input[name=lastName]').val();
		var phoneNumber = $('input[name=phoneNumber]').val();

		if (firstName && lastName && phoneNumber) {
			redactContact(numberContact,firstName,lastName,phoneNumber);
			closeShouForm(); /*Закрытие формы*/
		} else {
			if (!firstName) {
				$('input[name=firstName]').css({
					'border':'solid 2px red'
				});
			};
			if (!lastName) {
				$('input[name=lastName]').css({
					'border':'solid 2px red'
				});
			};
			if (!phoneNumber) {
				$('input[name=phoneNumber]').css({
					'border':'solid 2px red'
				});
			};
		};
	});
		
	// Удоление контакта

	$('body').on('click','.deleteContact', function () {
		var tr = $(this).closest('tr').remove();
		var numberContact = tr.data("index");
		Contacts.splice(1,1);
		shouContacts(); /*Вывод всех контактов*/
	})









	$('#addNewContacts').css({
		'outline':'none'
	});
	$('.search input').css({
		'outline':'none'
	});


})