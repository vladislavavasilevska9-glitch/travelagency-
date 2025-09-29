const tours = [
  {id:1, name:"Рим, Італія", price:12000, description:"Місто вічності та історії.", image:"images/rome.jpg"},
  {id:2, name:"Барселона, Іспанія", price:15000, description:"Море, сонце та архітектура Гауді.", image:"images/barcelona.jpg"},
  {id:3, name:"Париж, Франція", price:20000, description:"Місто кохання та романтики.", image:"images/paris.jpg"},
  {id:4, name:"Прага, Чехія", price:10000, description:"Казкові вулички та смачне пиво.", image:"images/prague.jpg"},
  {id:5, name:"Будапешт, Угорщина", price:11000, description:"Термальні купальні та Дунай.", image:"images/budapest.jpg"}
];
let currency = "UAH";
const rate = 40; // 1 EUR = 40 UAH

function renderTours(){
  const container = document.getElementById("tours");
  if(!container) return;
  container.innerHTML="";
  let min = document.getElementById("minPrice")?.value || 0;
  let max = document.getElementById("maxPrice")?.value || Infinity;
  tours.forEach(t=>{
    let price = (currency=="UAH"? t.price: (t.price/rate).toFixed(2));
    if(t.price>=min && t.price<=max){
      container.innerHTML += `<div class='tour'>
        <h3>${t.name}</h3>
        <img src="${t.image}" alt="${t.name}" class="tour-img">
        <p>${t.description}</p>
        <p>Ціна: ${price} ${currency}</p>
        <button onclick="bookTour(${t.id})">Забронювати</button>
      </div>`;
    }
  });
}

function filterTours(){ renderTours(); }

function changeCurrency(){
  currency = document.getElementById("currency").value;
  renderTours();
}

function bookTour(id){
  const tour = tours.find(t=>t.id===id);
  const name = prompt("Ваше ім’я:");
  const email = prompt("Ваш email:");
  const phone = prompt("Ваш телефон:");
  const date = prompt("Дата виїзду (рррр-мм-дд):");
  const days = parseInt(prompt("Кількість днів:"));
  const persons = parseInt(prompt("Кількість осіб:"));
  const insurance = confirm("Додати страхування (+500 грн)?");
  const excursion = confirm("Додати екскурсію (+1000 грн)?");
  let total = tour.price*persons*days;
  if(insurance) total+=500;
  if(excursion) total+=1000;
  const booking = {tour:tour.name, name,email,phone,date,days,persons,total};
  let bookings = JSON.parse(localStorage.getItem("bookings")||"[]");
  bookings.push(booking);
  localStorage.setItem("bookings",JSON.stringify(bookings));
  alert("Бронювання підтверджено. Вартість: "+total+" грн.");
  renderBookings();
}

function renderBookings(){
  const container = document.getElementById("bookings");
  if(!container) return;
  let bookings = JSON.parse(localStorage.getItem("bookings")||"[]");
  container.innerHTML = bookings.map(b=>`<div>
    <strong>${b.tour}</strong><br>
    Ім’я: ${b.name}, Email: ${b.email}, Тел: ${b.phone}<br>
    Дата: ${b.date}, Осіб: ${b.persons}, Днів: ${b.days}<br>
    Вартість: ${b.total} грн.
  </div>`).join("<hr>");
}

window.onload = ()=>{renderTours(); renderBookings();};
