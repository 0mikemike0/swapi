window.onload = function () {

  // Вешаем обработчик на кнопку
  const button = document.querySelector('.button');
  const input = document.querySelector('.person_search');
  const resultList = document.querySelector('.search_result');

  button.addEventListener('click', function () {
    showResults ();
    input.value = '';
  });

  resultList.addEventListener('click', function (e) {
    document.querySelector('#name').innerHTML = event.target.name;
    document.querySelector('#height').innerHTML = event.target.height;
    document.querySelector('#mass').innerHTML = event.target.mass;
    document.querySelector('#birth_year').innerHTML = event.target.birth_year;
    document.querySelector('#films_count').innerHTML = event.target.films;
  })

  function showResults () {

    if (!input.value) {
      alert("Вы ничего не ввели");
      return;
    }   


    // Сохраняем адрес API
    var api = "https://swapi.dev/api/";

    // Формируем полный адрес запроса:
    var url = api + "people/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation
    url += input.value; // значение переменной запроса search
    // Таким образом формируется строка вида:
    // https://swapi.dev/api/people/?search=obi

    // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
    let request = new XMLHttpRequest();
  
    // Назначаем обработчик события load для запроса
    request.addEventListener("load", function () {
      
      // парсим его из JSON-строки в JavaScript-объект
      let response = JSON.parse(request.response); 

      // Проверяем статус-код, который прислал сервер
      // 200 — это ОК, остальные — ошибка или не подходят
      if (request.status !== 200) {
        alert(
          "Произошла ошибка при получении ответа от сервера:\n\n" +
            response.message
        );
        return;
      }

      // Проверяем, если поле имя в ответе на запрос
      if (response.count == 0) {
        alert("К сожалению, данные не получены по запросу: " + url);
        return;
      }
      
      document.querySelector('.search_result').innerHTML = '';
      for (let person of response.results) {
        let listItem = document.createElement('li');
        listItem.innerHTML = person.name;
        listItem.name = person.name;
        listItem.height = person.height;
        listItem.mass = person.mass;
        listItem.birth_year = person.birth_year;
        listItem.films = person.films.length;
        document.querySelector('.search_result').append(listItem);

      }
    });

    request.onerror = function() {
      alert('Произошла ошибка во время отправки');
    };

    // Обработчик готов, можно отправлять запрос
    // Открываем соединение и отправляем
    request.open("get", url);
    request.send();
  }
  
 


};