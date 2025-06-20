---
title: Зламаність квадратів
date: 2025-05-01
tags:
  - експеримент
  - генеративний дизайн
previewImg: /static/img/brokensquare.png
description: Процес створення бренду
author: Дмитро
---
<div class="p5-containe max-w-xs" id="p5-container"></div>

Ми тут разом із ChatGPT працюємо над моїм персональним брендом. Дішли, що я люблю мислити через протиріччя. Насправді, в багатьох моїх проєктаї сама така ідея закладена --- протиставлення та об'єднання полярного в одне ціле. Потім стали думати над формами, які б виразили цю ідею. Одна з них --- зламаний квадрат. Як символ системи, що зламалась, але не розсипалась.

Але зламаний квадрат для мене --- зовсім не той, що дав тріщину, а той, що зламався програмно. Ну а якщо чесно, то той, що вийшов зовсім випадково у мене незадовго до діалогу з ШІ. Ось такий.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

<div class="lg:flex gap-4 content-start">

![broken square](/static/img/svcTemple.png "broken square")

![broken square](/static/img/brokensquare.png "broken square")

</div>
<div>

![broken square](/static/img/brokensquare.png "broken square")

</div>

</div>

Тобто, три кути квадрату фіксовані, а четвертий розтягнутий контрольними точками кривої Без'є. Таким чином математично структура квадрату зберігається, а візуально він перетворюються на безліч варіантів форми з різною динамікою.

Можна використовувати як в якості окремого елемента, залитого, або контурного, так і в якості контейнера для фото.

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script src="/static/p5/distorted_square.js"></script>