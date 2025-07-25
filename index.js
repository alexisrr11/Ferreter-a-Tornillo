import { responder } from "./chatBot/funcionesChatbot.js";

const botonChat = document.getElementById("botonChat");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("inputMensaje");
const mensajes = document.getElementById("mensajes");
const productosTodos = document.getElementById("productos");
const btnMenu = document.getElementById("btnMenu");
const menuNav = document.getElementById("menuNav");
const formulario = document.querySelector('#form');
const buttonMailto = document.querySelector('#mailto');

//Llamar API local
try {
    fetch("https://raw.githubusercontent.com/alexisrr11/APIferre/refs/heads/main/productos.json")
    .then(respuesta => respuesta.json()) 
    .then(productos => {
        renderProductos(productos);
        window.productos = productos;
    })
} catch {
    error => console.error("Error al cargar los productos", error);
}

function renderProductos(array) {
  productosTodos.innerHTML = "";
  array.forEach(e => {
    const nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("p-4", "border", "rounded", "mb-4", "bg-white", "shadow");

    nuevoElemento.innerHTML = `
      <img src="${e.img}" alt="${e.nombre}" class="w-full rounded mb-4">
      <h3 class="text-xl font-semibold">${e.nombre}</h3>
      <p class="text-sm mb-2">${e.descripcion}</p>
      <p class="font-bold">$${e.precio}</p>
    `;

    productosTodos.appendChild(nuevoElemento);
  });
}

//Renderizado del chatBot

botonChat.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
        const userMsg = input.value;
        setTimeout(()=> {
            mensajes.innerHTML += `<div><strong>Vos:</strong> ${userMsg}</div>`;
            mensajes.innerHTML += `<div><strong>Bot:</strong> ${responder(userMsg)}</div>`;
        }, 600)
        input.value = "";
        mensajes.scrollTop = mensajes.scrollHeight;
    }
});

//Envio de mails

formulario.addEventListener('submit', handleSubtmit)

function handleSubtmit (event){
    event.preventDefault()
    const form = new FormData(this)
    buttonMailto.setAttribute('href', `mailto:alexis.r4995@gmail.com?subject=${form.get('name')}${form.get('email')}&body=${form.get('mensaje')}`)
    buttonMailto.click()
}

//Menu

btnMenu.addEventListener("click", () => {
  menuNav.classList.toggle("hidden");
});