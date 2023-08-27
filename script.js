const canvas = document.getElementById("whiteboard");

const deleteButton = document.getElementById("deleteButton");
const undoButton = document.getElementById("undoButton");
const colButton = document.getElementById("colButton");

const ctx = canvas.getContext("2d");
let drawing = false;
let objects = [];
let currPath = null;

colButton.addEventListener("input",changeColor);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
deleteButton.addEventListener("click", clear);
undoButton.addEventListener("click", undo);

function changeColor(){
    ctx.strokeStyle = colButton.value;
}

function startDrawing(e) {
    drawing = true;
    currPath = [{ x: e.clientX - canvas.offsetParent, y: e.clientY - canvas.offsetParent }];
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 3;
    
    currPath.push({ x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop });
}

function stopDrawing() {
    if (!drawing) return;
    drawing = false;
    addObjectToCanvas(currPath);
}

function addObjectToCanvas(path) {
    objects.push({ path });
    redrawCanvas();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const obj of objects) {
        ctx.beginPath();
        ctx.moveTo(obj.path[0].x, obj.path[0].y);
        for (const point of obj.path) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    }
}

function clear() {
    objects = [];
    redrawCanvas();
}

function undo() {
    objects.pop();
    redrawCanvas();
}