let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
}

function addToCart(name, price, size){

if(!size){
alert("Please select a size first");
return;
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name: name,
price: price,
size: size
});

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
showToast();

}

function removeFromCart(index){

cart.splice(index,1);

saveCart();

displayCart();

}

function displayCart(){

let container = document.getElementById("cart-items");
let total = 0;
let orderText="";

if(!container) return;

container.innerHTML="";

cart.forEach((item,index)=>{

total += item.price;

let div = document.createElement("div");

div.classList.add("cart-item");

div.innerHTML = `
<span>${item.name} (${item.size}) - ${item.price}€</span>
<button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
`;

container.appendChild(div);

orderText += item.name + " ("+item.size+") - " + item.price + "€\n";

});

document.getElementById("cart-total").innerText = total;

document.getElementById("orderField").value = orderText;

}

function updateCartCount(){

let count = document.getElementById("cart-count");

if(count){
count.innerText = cart.length;
}

}

function showToast(){

let toast = document.getElementById("toast");

if(!toast) return;

toast.classList.remove("show");

void toast.offsetWidth;

toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2000);

}

document.addEventListener("DOMContentLoaded",()=>{

updateCartCount();

displayCart();

});

function toggleCart(){

let sidebar = document.getElementById("cartSidebar");

if(!sidebar) return;

sidebar.classList.toggle("open");

displayCart();

}
function changeImage(img){

let main = document.getElementById("mainImage");

if(!main) return;

main.src = img.src;

}

document.addEventListener("click",function(e){

if(e.target.id === "mainImage"){

e.target.classList.toggle("zoomed");

}

});
let startX = 0;

const mainImage = document.getElementById("mainImage");

if(mainImage){

mainImage.addEventListener("touchstart",e=>{
startX = e.touches[0].clientX;
});

mainImage.addEventListener("touchend",e=>{

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50){
nextImage();
}

if(endX - startX > 50){
prevImage();
}

});

}

const images = [
"images/item1.jpg",
"images/item2.jpg",
"images/item3.jpg",
"images/item4.jpg"
];

let currentImage = 0;

function nextImage(){

currentImage++;

if(currentImage >= images.length){
currentImage = 0;
}

mainImage.src = images[currentImage];

}

function prevImage(){

currentImage--;

if(currentImage < 0){
currentImage = images.length - 1;
}

mainImage.src = images[currentImage];

}

window.addEventListener("load",()=>{
document.body.classList.add("loaded");
});
document.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",function(e){

if(this.hostname === window.location.hostname){

e.preventDefault();

let url = this.href;

document.body.style.opacity = 0;

setTimeout(()=>{
window.location = url;
},300);

}

});

});


let selectedSize = null;

function selectSize(btn,size){

document.querySelectorAll(".size-btn").forEach(b=>{
b.classList.remove("active");
});

btn.classList.add("active");

selectedSize = size;

}
function addToCartWithSize(name, price){

if(!selectedSize){
alert("Please select a size");
return;
}

cart.push({
name: name,
price: price,
size: selectedSize
});

saveCart();

showToast();

toggleCart();

displayCart();

}
