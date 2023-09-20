const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
toolBtns = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");
sizeSlider = document.querySelector("#size-slider");
colorBtns = document.querySelectorAll(".colors .option");
colorPicker = document.querySelector("#color-picker");
clearCanvas = document.querySelector(".clear-canvas")
saveImg = document.querySelector(".save-img")

let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
selectedTool = "brush";
brushWidth = 5;
selectedColor = "#000";

const setCanvasBackground = () =>{
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor
}

window.addEventListener("load", () => {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) =>
	fillColor.checked
		? ctx.fillRect(
				e.offsetX,
				e.offsetY,
				prevMouseX - e.offsetX,
				prevMouseY - e.offsetY
		  )
		: ctx.strokeRect(
				e.offsetX,
				e.offsetY,
				prevMouseX - e.offsetX,
				prevMouseY - e.offsetY
		  );

const drawCircle = (e) => {
	ctx.beginPath();
	let radius = Math.sqrt(
		Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
	);
	ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
	fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (e) => { //Buduję trójkąt używając funkcji 
    ctx.beginPath(); //Rozpoczynam nową ścieżkę rysowania 
    ctx.moveTo(prevMouseX, prevMouseY); //Steruję trójkątem podążając za kursorem
    ctx.lineTo(e.offsetX, e.offsetY); // Tworzę pierwszą linię zgodnie z ruchem kursora 
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Tworzę dolną krawędź trójkąta 
    ctx.closePath(); //Zamykam ścieżkę rysowania tworząc trójkąt
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
	isDrawing = true;
	prevMouseX = e.offsetX;
	prevMouseY = e.offsetY;
	ctx.beginPath();
	ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
	if (!isDrawing) return;
	ctx.putImageData(snapshot, 0, 0);
	if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
	} else if (selectedTool === "rectangle") {
		drawRect(e);
	} else if (selectedTool === "circle") {
		drawCircle(e);
	} else {
        drawTriangle(e);
    }
};

toolBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		// document.querySelector(".options .active").classList.remove("active");
		btn.classList.toggle("active");
		selectedTool = btn.id;
		console.log(btn.id);
	});
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // Nasłuchiwanie na zmianę, które ustawia wartość slidera jako grubość pędzla 

colorBtns.forEach(btn =>{
    btn.addEventListener("click", () => {
        // document.querySelector(".oprtions .selected").classList.remove("selected");
        btn.classList.toggle("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

colorPicker.addEventListener("change", () =>{
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click()
})

clearCanvas.addEventListener("click", () =>{
    ctx.clearRect(0,0, canvas.width, canvas.height)
    setCanvasBackground();
})

saveImg.addEventListener("click", () =>{
    const link = document.createElement("a"); //Tworzę tag linku <a>
    link.download = `${Date.now()}.jpg`; //Przypisuję aktualną datę jako wartość linku do pobrania
    link.href = canvas.toDataURL(); // CanvasData jako wartość href linku
    link.click(); //klikanie linku do pobrania 
})

canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => (isDrawing = false));

