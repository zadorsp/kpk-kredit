        //массив с кредитными программами																														
        //ключ																														
        /* 																														
        																														
        var pr = 																														
        [																														
        {name: 'первая', summ: 30000, srok: 6, stavk: 3.25, komm: 'комментарий'},																														
        {name: 'вторая', summ: 10000, srok: 12, stavk: 3, komm: 'комментарий2'}																														
        ]																														
        																														
        {name: 'первая', - имя программы 																														
        summ: 20000, - максимально-возможная сумма займа																														
        srok: 12,  - максимально возможный срок																														
        stavk: 3.25, - ставка (месячная)																														
        vznos: 0.5, - взнос в резервный фонд 																														
        tolko_payshik: false, заем выдается только пайщику: если true, то должна быть скрыта информация по ежегодному и паевому (включаа текстовое сопровождение))																														
        type_pogash: 1, тип погашения (0- в конце срока, 1- ежемес, дифференцированная система, 2 - ежемес. аннуитет)																														
        komm: 'комментарий'комментарий к кредитной программе, выводится в отдельном поле /////в поле Прочие условия после двоеточия/////																														
        																														
        },																														
        																														
        */																														
	var pr = 																													
	[		

	{name: 	'Потребительский'	,													summ:	500000	,	srok	:	60	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Коммерческий',															summ:	6000000	,	srok	:	36	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	{name: 	'Коммерческий (ипотека)',												summ:	6000000	,	srok	:	36	,	stavk	:	3,		vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	}
	
/*
	{name: 	'Моё подворье'	,														summ:	500000	,	srok	:	60	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Ремонт'	,															summ:	250000	,	srok	:	36	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Праздничный'	,														summ:	100000	,	srok	:	24	,	stavk	:	3,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Обучение в ВУЗе и колледже'	,										summ:	250000	,	srok	:	24	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Отдохни с комфортом'	,												summ:	250000	,	srok	:	24	,	stavk	:	3,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Уютный дом'	,														summ:	250000	,	srok	:	36	,	stavk	:	3,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Свадебный'	,															summ:	250000	,	srok	:	36	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'На лечение и стоматологию'	,											summ:	250000	,	srok	:	36	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Последний звонок  (выдается ежегодно с 01.04. по 30.06.)'	,			summ:	100000	,	srok	:	12	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Ремонтируем авто'	,													summ:	100000	,	srok	:	24	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Газификация'	,														summ:	250000	,	srok	:	60	,	stavk	:	2.92,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Пенсионный'	,														summ:	250000	,	srok	:	24	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Под ёлку внуку в Новый год (выдается ежегодно с 15.11. по 31.12.)'	,	summ:	75000	,	srok	:	12	,	stavk	:	2.75,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'От мамы и папы в Новый год (выдается ежегодно с 15.11. по'	,			summ:	75000	,	srok	:	12	,	stavk	:	2.75,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Подари любимым Новый год (выдается ежегодно с 15.11. по'	,			summ:	75000	,	srok	:	12	,	stavk	:	2.75,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Собираем детей в школу (выдается ежегодно с 01.07. по 30.09.)'	,		summ:	75000	,	srok	:	12	,	stavk	:	3	,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Подарочный (выдается ежегодно с 01.02. по 08.03.)'	,					summ:	75000	,	srok	:	12	,	stavk	:	2.75,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Для работников образования'	,										summ:	250000	,	srok	:	36	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Для работников здравоохранения'	,									summ:	250000	,	srok	:	36	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Для работников культуры'	,											summ:	250000	,	srok	:	36	,	stavk	:	3	,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Для государственных и муниципальных служащих'	,						summ:	250000	,	srok	:	36	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Для жителей села (выдается ежегодно с 01.09. по 31.12.)'	,			summ:	150000	,	srok	:	36	,	stavk	:	3	,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'На оказание юридических услуг'	,										summ:	100000	,	srok	:	24	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	
	{name: 	'Стань водителем'	,													summ:	75000	,	srok	:	12	,	stavk	:	2.92,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Обновляем свой гардероб'	,											summ:	75000	,	srok	:	24	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Энергосбережение'	,													summ:	300000	,	srok	:	60	,	stavk	:	3	,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	
	{name: 	'Личное подсобное хозяйство'	,										summ:	300000	,	srok	:	60	,	stavk	:	2.83,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Мастер - золотые руки'	,												summ:	150000	,	srok	:	36	,	stavk	:	3.08,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
	{name: 	'Крупная покупка'	,													summ:	6000000	,	srok	:	36	,	stavk	:	3.42,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	{name: 	'Весение полевые работы'			,									summ:	6000000	,	srok	:	36	,	stavk	:	3.42,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	{name: 	'Осенние полевые работы'			,									summ:	6000000	,	srok	:	36	,	stavk	:	2.67,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	//{name: 	'Заём на пополнение оборотных средств'	,								summ:	6000000	,	srok	:	24	,	stavk	:	4	,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	{name: 	'Новогодний (выдается ежегодно с 15.11. по 31.12.)'	,					summ:	1000000	,	srok	:	6	,	stavk	:	3,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	{name: 	'Овощи Дона'	,														summ:	250000	,	srok	:	24	,	stavk	:	3.33,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	}//,
	//{name: 	'Овощи Дона плюс'	,													summ:	750000	,	srok	:	12	,	stavk	:	3.42,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	0	,	komm	:	''	},
	//{name: 	'На строительство'	,													summ:	500000	,	srok	:	24	,	stavk	:	3	,	vznos	:	0.5	,	tolko_payshik	:	false	,	type_pogash	:	1	,	komm	:	''	},
																														
*/																													
																														
																														
																														
	]																													
