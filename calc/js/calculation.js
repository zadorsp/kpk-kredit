$(document).ready(function () {
	//drawGraf(300000, 6, 3.25);
	//n=pr[1];
	//drawGraf(n.summ, n.srok, n.stavk);
	//
	//заполняем option
	//для начала очистим
	document.getElementById("select_progr").innerHTML = "";
	//заполним данные из массива
	for (i = 0; i < pr.length; i++) {
		var el = pr[i];
		$("#select_progr").append($('<option value="' + i + '">' + pr[i].name + "</option>"));
	}

	//а это надо, что бы скрыть див c сообщением о закрытии сайта
	//$("a[href*=hostinger]").hide();

	//вызываем перерасчет странички
	actionChangeSelect();
});

//Функции

/** функция drawGraf - рисует в табличке график
 *summa, - сумма займа
 * srok, - срок в месяцах
 * stavka - ставка в % замесяц (формат: число[.(точка)числа после запятой] (например 3.25)
 * type_pogash - если 0, значит погашение вконце срока, иначе ежемесячно
 */
function drawGraf(summa, srok, stavka, type_pogash) {
	//очищаем табличку с расчетом
	$("tr[class^='calc_row']").empty();
	$("tr[class^='table_payment_footer']").empty();

	//функция возвращает строку таблицы
	//она для всех вариантов расчета будет одинаковой
	function getRaw(stroka, ost, pogash, vznos) {
		return (
			'<tr class="calc_row_1"> ' +
			'<th class="row">' +
			stroka +
			"</th>" + //номер строки
			"<td>" +
			prepareNumber2(ost) +
			"</td>" + //остаток
			"<td>" +
			prepareNumber2(pogash) +
			"</td>" + //поашение
			"<td>" +
			prepareNumber2(vznos) +
			"</td>" + //взнос
			"<td>" +
			prepareNumber2(MathRound2(vznos + pogash)) +
			"</td></tr>"
		); //платеж;
	}

	//график с погашением в конце срока или диф платами
	function drawGraf01(summa, srok, stavka, type_pogash) {
		//заполняем переменные
		var cell_summa_zayma = summa;
		var cell_srok_zayma = srok;
		var cell_stavka_zayma = stavka;

		var cell_num = 0; //номер строки
		var cell_ost = 0; //остаток
		var cell_pogash = 0; //погашение
		var cell_vznos = 0; //взнос
		var cell_itog_pogash = 0.0; //всего погашение
		var cell_itog_vznos = 0.0; //итоговая переплата
		/*
		 * возвращает текстовую строку, с отформатированным числом
		 * num - число для печати
		 * rou - округление
		 * pos - надпись после (например руб.)
		 * @устарела (наверное :(     )
		 **/
		function printNumber(num, rou, pogash, vznos) {
			//@TODO доделать
			return 0;
		}

		var tra; //тут будем хранить табличку расчета

		var i;

		cell_ost = cell_summa_zayma;
		//погашение каждый месяц одинаковое
		if (type_pogash == 0) {
			cell_pogash = 0;
		} else {
			cell_pogash = cell_summa_zayma / cell_srok_zayma;
			cell_pogash = MathRound2(cell_pogash);
		}

		for (i = 1; i <= cell_srok_zayma; i++) {
			cell_vznos = cell_ost * cell_stavka_zayma * 0.01;
			cell_vznos = MathRound2(cell_vznos);
			//в последний месяц погашение рассчитывается чуть по другому
			if (i == cell_srok_zayma) {
				cell_pogash = MathRound2(cell_summa_zayma - cell_itog_pogash);
			}

			tra = tra + getRaw(i, cell_ost, cell_pogash, cell_vznos);

			cell_ost = cell_ost - cell_pogash;
			cell_ost = MathRound2(cell_ost);
			cell_itog_pogash = cell_itog_pogash + cell_pogash;
			cell_itog_pogash = MathRound2(cell_itog_pogash);
			cell_itog_vznos = cell_itog_vznos + cell_vznos;
			cell_itog_vznos = MathRound2(cell_itog_vznos);
		}
		//dobavlaem podval
		//alert(document.getElementById('print_podval').checked);
		//alert($("#print_podval").is(':checked'));

		if (!document.getElementById("print_podval").checked) {
			tra =
				tra +
				'<tr class="table_payment_footer">' +
				'<th colspan="2">Итого за ' +
				cell_srok_zayma +
				" мес.</th>" +
				'<th scope="col">' +
				prepareNumber2(cell_itog_pogash) +
				"</th>" +
				'<th scope="col">' +
				prepareNumber2(cell_itog_vznos) +
				"</th>" +
				'<th scope="col">' +
				prepareNumber2(MathRound2(cell_itog_pogash + cell_itog_vznos)) +
				"</th>" +
				"</tr>";
		}
		$("tr[id^='table_payment']").after(tra);
	}

	//график с аннуитентными платежами
	function drawGraf2(summa, srok, stavka, type_pogash) {
		alert1("рачет по аннуитенту");
		//заполняем переменные
		var cell_summa_zayma = summa;
		var cell_srok_zayma = srok;
		var cell_stavka_zayma = stavka;

		var cell_num = 0; //номер строки
		var cell_ost = 0; //остаток
		var cell_pogash = 0; //погашение
		var cell_vznos = 0; //взнос
		var cell_itog_pogash = 0.0; //всего погашение
		var cell_itog_vznos = 0.0; //итоговая переплата
		stavka = stavka / 100;
		var plata_v_mes = MathRound2(summa * (stavka + stavka / (Math.pow(1 + stavka, srok) - 1))); //ежемесячный платеж

		var tra; //тут будем хранить табличку расчета

		var i;

		cell_ost = cell_summa_zayma;
		//погашение каждый месяц разное
		if (type_pogash == 2) {
			for (i = 1; i <= cell_srok_zayma; i++) {
				cell_vznos = MathRound2(cell_ost * cell_stavka_zayma * 0.01);
				cell_pogash = plata_v_mes - cell_vznos;
				//в последний месяц погашение рассчитывается чуть по другому
				if (i == cell_srok_zayma) {
					cell_pogash = MathRound2(cell_summa_zayma - cell_itog_pogash);
				}

				tra = tra + getRaw(i, cell_ost, cell_pogash, cell_vznos);

				cell_ost = cell_ost - cell_pogash;
				//cell_ost = MathRound2(cell_ost);
				cell_itog_pogash = cell_itog_pogash + cell_pogash;
				cell_itog_pogash = MathRound2(cell_itog_pogash);
				cell_itog_vznos = cell_itog_vznos + cell_vznos;
				cell_itog_vznos = MathRound2(cell_itog_vznos);
			}
			//dobavlaem podval
			//alert(document.getElementById('print_podval').checked);
			//alert($("#print_podval").is(':checked'));

			if (!document.getElementById("print_podval").checked) {
				tra =
					tra +
					'<tr class="table_payment_footer">' +
					'<th colspan="2">Итого за ' +
					cell_srok_zayma +
					" мес.</th>" +
					'<th scope="col">' +
					prepareNumber2(cell_itog_pogash) +
					"</th>" +
					'<th scope="col">' +
					prepareNumber2(cell_itog_vznos) +
					"</th>" +
					'<th scope="col">' +
					prepareNumber2(MathRound2(cell_itog_pogash + cell_itog_vznos)) +
					"</th>" +
					"</tr>";
			}
			$("tr[id^='table_payment']").after(tra);
		} else {
			alert("ERROR: косяк, позовите СП!!!");
		}
	}
	//корявое решение, согласен, но я пьяный, поэтому определяем тип погашения и вызываем соответствующие функции
	if (type_pogash == 2) {
		drawGraf2(summa, srok, stavka, type_pogash);
	} else {
		drawGraf01(summa, srok, stavka, type_pogash);
	}
}

/*
 *
 * округляет число до двух днаков после запятой
 **/

function MathRound2(num) {
	return Math.round(num * 100) / 100;
}
/**
 * возвращает строку, с округленным числом до двух знаков после запятой
 *
 *
 */
function printPrise(num) {
	//@TODO доделать
	return num;
}
/**
 * рисует табличку взносов
 *
 *
 */

function drawVznosi(summa_zayma, vznos, tolko_payshik) {
	//записываем взнос
	document.getElementById("vznos_strah1").innerHTML = vznos;
	document.getElementById("vznos_strah2").innerHTML = vznos;

	//
	//скрываем и показываем элементы, id которых начинается с "tr_vznos"
	if (tolko_payshik) {
		$("[id^='tr_vznos']").hide();
	} else {
		//считаем итого по взносам
		document.getElementById("vznosi_itog1").innerHTML = 2000 + 300 + vznos;
		document.getElementById("vznosi_itog2").innerHTML = 2000 + 300 + vznos;
		document.getElementById("summa_zayma").innerHTML = summa_zayma;

		//делаем видным элементы взносов
		$("[id^='tr_vznos']").show();
	}
}
/**
 * из 30000.2 сделает 30000.00
 */
function prepareNumber2(n) {
	var s = String(n);
	var k = s.indexOf(".");
	if (k < 0) {
		k = s.length;
		s += ".00";
	} else {
		s += "00";
	}
	s = s.substr(0, k + 3);
	//раскомментируй, если надо сделать 30,000.00
	//for (var i = k - 3, j = n < 0 ? 1 : 0; i > j; i -= 3) s = s.substr(0, i) + "," + s.substr(i);
	return s;
}

/**
 *
 * обработка события изменения выделения в списке кредитных программ
 * на него же повешу изменение поля суммы и срока
 *
 */
function actionChangeSelect() {
	//@TODO доделать проверку введенных значений в текстовые поля
	//ХОТЯ БЫ ЧТО БЫ СРОК НЕ БОЛЕЕ 24 МЕС И СУММА НЕ МЕНЕЕ 0

	//получаем текущую кредитную программу и настройки по умолчанию
	n = pr[$("#select_progr option:selected").val()];
	//сатавим настройки по умолчанию
	set_select_type_pogash(n.type_pogash);
	set_text_koefficient(n.stavk);

	//рисуем график и пишем инфо
	drawGrafDef(n);
}
/**
 *
 * рисуем график, при этом используем значения из текстовых полей фронтенда
 * и обновляем то что написано на расчете в соответствии с условиями по займу
 *
 */
function drawGrafDef(n) {
	drawGraf($("#tfsumma").val(), $("#tfsrok").val(), get_text_koefficient(), get_select_type_pogash());
	drawVznosi($("#tfsumma").val(), $("#tfsumma").val() * (n.vznos * 0.01), n.tolko_payshik);

	//обновляем то что написано на расчете в соответствии с условиями по займу
	$("[class^='tr_komm_kr_prog']").html(n.komm);
	//$("[class^='tr_name_kr_prog']").html('<br>'+n.name);
	$("[class^='tr_komm_max_summ']").html(n.summ);
	$("[class^='tr_komm_max_srok']").html(n.srok);

	if (n.type_pogash == 0) {
		$("[class^='tr_komm_pogash']").html("в конце срока");
	} else {
		$("[class^='tr_komm_pogash']").html("ежемесячно");
	}

	//$("[class^='tr_komm_pogash']").html(prepareNumber8(30000.2));

	//проверяем ошибки:
	//срок
	var err = "";
	if ($("#tfsumma").val() > n.summ) {
		err = err + "сумма займа не соответствует выбранной кредитной программе<br>";
	}
	if ($("#tfsrok").val() > n.srok) {
		err = err + "срок займа не соответствует выбранной кредитной программе<br>";
	}
	//	if(err!==""){
	$("[class^='diverror']").html(err);
	//		}else{

	//		}
}

/**
 *
 * обработка события изменения выделения в настройках (когда меняются настройки по умаолчанию
 * на него же повешу изменение поля суммы и срока
 *
 */
function actionChangeNastroiki() {
	//получаем текущие значения программы
	var n = jQuery.extend(true, {}, pr[$("#select_progr option:selected").val()]);

	//заменяем на наши
	n.type_pogash = get_select_type_pogash();
	n.stavk = get_text_koefficient();
	//рисуем график и пишем инфо
	drawGrafDef(n);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//GETTERi and SETTERi        начало                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//ставим настройки по умолчанию (а в принципе нафиг, при выборе кредитной программы они сами будут ставиться
function setDefaultsValues() {}
///+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//тип погашения
//select_type_pogash
//select_type_pogash_def = "0"

function get_select_type_pogash() {
	return $("#select_type_pogash option:selected").val();
}

function set_select_type_pogash(new_val) {
	//$("#select_type_pogash [value='" + String(new_val) + "']").attr("selected", "selected");
	//$("#select_type_pogash [value='2']").attr("selected", "selected");
	$("#select_type_pogash [value='" + String(new_val) + "']").prop("selected", true);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Коэффициент
//text_koefficient

function get_text_koefficient() {
	return $("#text_koefficient").val().replace(",", ".");
}

function set_text_koefficient(new_val) {
	$("#text_koefficient").val(new_val);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//GETTERi and SETTERi        конец                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function alert1(val) {
	//закомментируй и алертов не станет
	//alert(val);
}
