const canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d");
toolBtns = document.querySelectorAll(".tool")

let isDrawing = false;
selectedTool = "brush";
brushWidth = 1;

window.addEventListener("load", () =>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})
const drawing = (e) =>{
    if(!isDrawing) return;

    if(selectedTool === "brush"){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if(selectedTool === "rectangle"){
        drawRect();
    }
    
}

const startDraw = () =>{
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

toolBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id
        console.log(btn.id)
    })
})

canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => isDrawing = false);

/*    const canvas = document.querySelector("canvas"):
Ta linia kodu tworzy zmienną o nazwie canvas. Wartość tej zmiennej jest ustawiana na pierwszy element <canvas>, który jest znaleziony na stronie internetowej. Element <canvas> jest obszarem, na którym możemy rysować grafikę za pomocą JavaScript.

ctx = canvas.getContext("2d");:
    Ta linia kodu tworzy zmienną ctx, która będzie przechowywać kontekst rysowania (w tym przypadku 2D) dla elementu <canvas>. Kontekst rysowania jest potrzebny, aby móc używać funkcji do rysowania na elemencie <canvas>.

window.addEventListener("load", () => {:
    Ta linia kodu dodaje nasłuchiwanie zdarzenia load na obiekcie window. Zdarzenie load występuje, gdy cała strona internetowa została w pełni załadowana, włącznie z zawartością elementów takich jak obrazki i style. Funkcja strzałkowa, która jest przekazywana jako drugi argument do addEventListener, zostanie uruchomiona, gdy zdarzenie load wystąpi.

canvas.width = canvas.offsetWidth;:
    Ta linia kodu ustawia szerokość elementu <canvas> na szerokość jego kontenera. Jest to często używane, aby upewnić się, że element <canvas> zajmuje całą dostępną przestrzeń w swoim kontenerze.

canvas.height = canvas.offsetHeight;:
    Ta linia kodu ustawia wysokość elementu <canvas> na wysokość jego kontenera. To pomaga dostosować rozmiar elementu <canvas> do rozmiaru kontenera, co jest ważne dla responsywnego projektowania.

const drawing = (e) => {:
    Ta linia kodu definiuje funkcję o nazwie drawing, która zostanie wywołana, gdy użytkownik będzie poruszać myszą po elemencie <canvas>. Funkcja ta przyjmuje argument e, który reprezentuje obiekt zdarzenia myszy.

ctx.lineTo(e.offsetX, e.offsetY);:
    W tej linii kodu używamy kontekstu rysowania (ctx), aby stworzyć linię od aktualnej pozycji rysowania do nowej pozycji o współrzędnych (e.offsetX, e.offsetY). e.offsetX i e.offsetY to współrzędne myszy na elemencie <canvas>, gdzie kursor myszy aktualnie się znajduje.

ctx.stroke();:
    Ta linia kodu wywołuje metodę stroke() na kontekście rysowania (ctx). Metoda ta rysuje linię z punktu A do punktu B na elemencie <canvas>. Linia będzie rysowana zgodnie z aktualnie ustawionymi parametrami rysowania, takimi jak kolor i grubość linii.

canvas.addEventListener("mousemove", drawing);:
    Ta linia kodu dodaje nasłuchiwanie zdarzenia mousemove na elemencie <canvas>. Kiedy użytkownik porusza myszą po elemencie <canvas>, funkcja drawing zostanie wywołana, co pozwoli na rysowanie linii w czasie rzeczywistym, śledząc ruch myszy.

To jest podstawowy przykład, który demonstruje, jak rysować na elemencie <canvas> w JavaScript. Warto zrozumieć, że ctx to kontekst rysowania, który pozwala na wykonywanie różnych operacji rysowania na elemencie <canvas>, a nasłuchiwanie zdarzeń, takie jak mousemove, pozwala na reakcję na interakcje użytkownika.*/