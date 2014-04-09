$(document).ready(function () {

	if(!localStorage.getItem("Contacts")){
			var Contact = [];
			localStorage.setItem("Contacts",JSON.stringify(Contact));
		};
		var Contacts = JSON.parse(localStorage.getItem("Contacts"));

	// Вывод контактов
	
	shouContacts();

							/* Вывод контактов, function */
	function shouContacts () {
		if (!Contacts[0]) {
			$('.dobContact').css({'display':'block'})
		} else {
			$('.dobContact').css({'display':'none'})
		};
		$('.main tbody tr').remove();
		
		$.each(Contacts, function (ind, value) {
			if (value.visible) {
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
			};
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
		localStorage.setItem("Contacts", JSON.stringify(Contacts));

		$('.novContact').text("New contact");
		$('input[name=submit]').val('Add Contact');
		$('input[name=submit]').addClass('ok').removeClass('redactButton');
		shouContacts();
	};

	// Открытие формы добовления контакта

	$('#addNewContacts').click(openShouForm);

	// Закрытие формы добовления контакта

	$('.closeImg').click(closeShouForm);

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
				phoneNumber: phoneNumber,
				visible: true
			};
			$('input[type=text]').css({
				'backgroundColor':'white'
			});
			Contacts.push(contact);
			localStorage.setItem("Contacts", JSON.stringify(Contacts));
			closeShouForm(); /*Закрытие формы*/
			shouContacts(); /*Вывод всех контактов*/
		} else {
			if (!firstName) {
				$('input[name=firstName]').css({
					'backgroundColor':'#FF9090'
				});
			};
			if (!lastName) {
				$('input[name=lastName]').css({
					'backgroundColor':'#FF9090'
				});
			};
			if (!phoneNumber) {
				$('input[name=phoneNumber]').css({
					'backgroundColor':'#FF9090'
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
			$('input[type=text]').css({
				'backgroundColor':'white'
			});
			closeShouForm(); /*Закрытие формы*/
		} else {
			if (!firstName) {
				$('input[name=firstName]').css({
					'backgroundColor':'#FF9090'
				});
			};
			if (!lastName) {
				$('input[name=lastName]').css({
					'backgroundColor':'#FF9090'
				});
			};
			if (!phoneNumber) {
				$('input[name=phoneNumber]').css({
					'backgroundColor':'#FF9090'
				});
			};
		};
	});
		
	// Удоление контакта

	$('body').on('click','.deleteContact', function () {
		var tr = $(this).closest('tr');
		var numberContact = tr.data("index");
		Contacts.splice(numberContact,1);
		localStorage.setItem("Contacts", JSON.stringify(Contacts));
		tr.remove();
		shouContacts(); /*Вывод всех контактов*/
	});

	// Поиск

	$('input[name=searchVal]').keyup(function () {
		var searchValue = $(this).val();

		$.each(Contacts, function (index, contact) {
			var name = contact.firstName;
			if (contact.firstName.indexOf(searchValue) >= 0 || contact.lastName.indexOf(searchValue) >= 0 || contact.phoneNumber.indexOf(searchValue) >= 0) {
				contact.visible = true;
			} else {
				contact.visible = false;
			};
			shouContacts();
		})
	})

	// Отправка значений в localStorage

		// Без передачи переменной
			localStorage.setItem("name","Dima"); /* setItem - Передаёт значения */
			var a = localStorage.getItem("name"); /* getItem - Возвращает значения */
			// var a = localStorage.name; Одно и тоже
			// alert(a);

		// С передачей переменной
			var b = "OLOLO";
			localStorage.setItem("name",b); /*Задаём ключ name и передаём значение OLOLO*/
			var b1 = localStorage.getItem("name");
			// var a = localStorage.name; Одно и тоже
			// alert(b1);

		// Передача массивов ( кодируем данныи )
			var mas1 = {/*Асоциативный массив*/ 
				value1: "a",
				value2: "b",
				value3: "c"
			};
			localStorage.setItem("data1", JSON.stringify(mas1));
			var c1 = JSON.parse(localStorage.getItem("data1"));
			// alert(c1.value2);

			var mas2 = ['A','B','C'];/*Простой массив*/
			localStorage.setItem("data2", JSON.stringify(mas2));
			var c2 = JSON.parse(localStorage.getItem("data2"));
			// alert(c2[1]);

			var mas3 = [/*Сложный массив*/
				{
					value1: "a",
					value2: "b",
					value3: "c"
				},
				{
					value4: "e",
					value5: "f",
					value6: "j"
				}];
			localStorage.setItem("data3", JSON.stringify(mas3));
			var c3 = JSON.parse(localStorage.getItem("data3"));
			// alert(c3[1].value5);

		// Удоление из Хранилища
			localStorage.removeItem("data");/*Удоление элем. из хранилища*/
			// localStorage.clear(); Полная очистка хранилища


	$('#addNewContacts').css({
		'outline':'none'
	});
	$('.search input').css({
		'outline':'none'
	});


})