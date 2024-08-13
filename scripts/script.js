// Получаем элемент, который будет увеличиваться и уменьшаться
const round = document.getElementById("round");
const content = document.getElementById("content");
const cards = document.getElementById("cards");
// Получаем все блоки
const blocks = document.querySelectorAll('.card');

let delay = 0;
// Задаем начальный размер блока
let blockSize = 511;
// Задаём начальный отступ текстового блока
let marginTop = 390;

// Добавляем обработчик события прокрутки колесика
document.addEventListener("wheel", (event) => {
  // Определяем направление прокрутки
  const delta = Math.sign(event.deltaY);

  // Увеличиваем или уменьшаем размер блока
  blockSize += delta * 40;

  // Увеличиваем или уменьшаем отступ
  marginTop -= delta * 40;

  // Ограничиваем размер блока и отступа
  blockSize = Math.max(511, Math.min(2500, blockSize));
  marginTop = Math.min(390, Math.min(390, marginTop));

  // Применяем новый размер блока
  round.style.width = `${blockSize}px`;
  round.style.height = `${blockSize}px`;

  // Применяем новый отступ
  content.style.marginTop = `${marginTop}px`;
  round.style.marginLeft = `${-marginTop}px`;

  if (blockSize + 300 >= window.innerWidth || blockSize >= window.innerHeight) {
    round.style.left = `${marginTop}px`;
    round.style.top = `${0}px`;
    round.style.right = `${marginTop}px`;
    round.style.bottom = `${0}px`;
    round.style.margin = `auto`;
  } else {
    round.style.left = `${152}px`;
    round.style.top = `${52}px`;
    round.style.right = `auto`;
    round.style.bottom = `auto`;
    round.style.margin = `${0}px`;
  }
  
  // Если текстовый блок скрылся, покажем следующую страницу
  if (marginTop <= -275) {
    cards.style.display = `flex`;
    cards.style.marginTop = `${window.innerHeight + marginTop}px`;
    if (window.innerHeight + marginTop <= 0) {
        cards.style.marginTop = 0;
        blocks.forEach((block) => {
          block.style.opacity = '1';
          block.style.transform = 'translateY(0)';
          block.style.transition = `all 1s ${delay}s ease`;
          delay += .5;
        });
    } else {
        cards.style.marginTop = `${window.innerHeight + marginTop}px`;
    }
    
  }
});


// // Делаем ореол для курсора
// const circle = document.querySelector(".circle");

// document.addEventListener("mousemove", (e) => {
//   const x = e.clientX - circle.offsetWidth / 2;
//   const y = e.clientY - circle.offsetHeight / 2;

//   circle.style.transform = `translate(${x}px, ${y}px)`;
// });

// Получаем элемент, для которого будет применен эффект
// const block = document.querySelector('.round');

// const container = document.querySelector('.main');

//     container.addEventListener('mousemove', (e) => {
//       const { offsetWidth, offsetHeight } = container;
//       const { clientX, clientY } = e;
//       const xPos = (clientX - offsetWidth / 2) / (offsetWidth / 2);
//       const yPos = (clientY - offsetHeight / 2) / (offsetHeight / 2);

//       block.style.transform = `translate(-${xPos * 50}%, -${yPos * 50}%) rotate(${Math.atan2(yPos, xPos) * (180 / Math.PI)}deg)`;
//     });


// Массив слов, которые будут отображаться
const words = ["вдохновляющие", "запоминающиеся", "выдающиеся"];

// Получаем элемент, в котором будет отображаться эффект
const textElement = document.getElementById("span");

// Текущий индекс слова в массиве
let currentWordIndex = 0;

// Функция, которая выводит эффект пишущей машинки
function typewriter() {
  // Получаем текущее слово
  const currentWord = words[currentWordIndex];

  // Очищаем содержимое элемента
  textElement.textContent = "";

  // Поочередно выводим каждый символ слова
  let i = 0;
  const interval = setInterval(() => {
    textElement.textContent += currentWord.charAt(i);
    i++;

    // Когда все символы выведены, очищаем содержимое и переходим к следующему слову
    if (i > currentWord.length - 1) {
      clearInterval(interval);
      setTimeout(() => {
        textElement.textContent = "";
        currentWordIndex = (currentWordIndex + 1) % words.length;
        typewriter();
      }, 1000);
    }
  }, 100);
}

// Запускаем эффект пишущей машинки
typewriter();

