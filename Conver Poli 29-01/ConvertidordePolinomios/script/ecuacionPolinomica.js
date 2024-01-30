let zoomFactor = 1;
let aActual, bActual, nActual;
let desplazamientoX = 0;
let desplazamientoY = 0;
let isDragging = false;
let lastMouseX, lastMouseY;

function calcularEcuacionPolinomica() {
    aActual = parseFloat(document.getElementById('a').value);
    bActual = parseFloat(document.getElementById('b').value);
    nActual = parseInt(document.getElementById('n').value);

    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
}

function graficarEcuacionPolinomica(a, b, n, zoom) {
    const canvas = document.getElementById('graficoCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(desplazamientoX, desplazamientoY);
    dibujarEjesConValores(ctx, width, height, zoom, desplazamientoX, desplazamientoY);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let x = -width; x <= width; x++) {
        let xReal = (x - desplazamientoX) / (50 / zoom);
        let yReal = a * Math.pow(xReal, n) + b * Math.pow(xReal, n);
        ctx.lineTo(width / 2 + x, height / 2 - yReal * zoom * 50);
    }
    ctx.stroke();
    ctx.restore();
}


function dibujarEjesConValores(ctx, width, height, zoom, desplazamientoX, desplazamientoY) {
    const paso = 50 * zoom;
    const rangoExtraX = Math.max(Math.abs(desplazamientoX), width);
    const rangoExtraY = Math.max(Math.abs(desplazamientoY), height);
    const valorMaximoX = rangoExtraX / paso;
    const valorMaximoY = rangoExtraY / paso;

    ctx.strokeStyle = "#ddd";
    ctx.beginPath();

    for (let x = -valorMaximoX; x <= valorMaximoX; x++) {
        ctx.moveTo(width / 2 + x * paso, -rangoExtraY);
        ctx.lineTo(width / 2 + x * paso, height + rangoExtraY);
    }

    for (let y = -valorMaximoY; y <= valorMaximoY; y++) {
        ctx.moveTo(-rangoExtraX, height / 2 + y * paso);
        ctx.lineTo(width + rangoExtraX, height / 2 + y * paso);
    }
    ctx.stroke();

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-rangoExtraX, height / 2);
    ctx.lineTo(width + rangoExtraX, height / 2);
    ctx.moveTo(width / 2, -rangoExtraY);
    ctx.lineTo(width / 2, height + rangoExtraY);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillStyle = "#000";
    // Dibujar marcas y valores en los ejes
    for (let i = -valorMaximoX; i <= valorMaximoX; i++) {
        if (i !== 0) {
            const x = width / 2 + i * paso;
            let valorEtiquetaX = Math.round(i * 10 / zoom) / 10;
            ctx.fillText(valorEtiquetaX, x, height / 2 + 20);
            ctx.beginPath();
            ctx.moveTo(x, height / 2 - 10);
            ctx.lineTo(x, height / 2 + 10);
            ctx.stroke();
        }
    }

    for (let i = -valorMaximoY; i <= valorMaximoY; i++) {
        if (i !== 0) {
            const y = height / 2 - i * paso;
            let valorEtiquetaY = Math.round(i * 10 / zoom) / 10;
            ctx.fillText(-valorEtiquetaY, width / 2 + 5, y);
            ctx.beginPath();
            ctx.moveTo(width / 2 - 10, y);
            ctx.lineTo(width / 2 + 10, y);
            ctx.stroke();
        }
    }
}



function zoomIn() {
    zoomFactor *= 1.1;
    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
    actualizarNivelZoom();
}

function zoomOut() {
    zoomFactor /= 1.1;
    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
    actualizarNivelZoom();
}

function actualizarNivelZoom() {
    document.getElementById('zoomLevel').textContent = `Zoom: ${zoomFactor.toFixed(1)}x`;
}

// Función para actualizar el zoom manualmente
function actualizarZoomManual() {
    const zoomInputValue = parseFloat(document.getElementById('zoomInput').value);
    if (!isNaN(zoomInputValue) && zoomInputValue > 0) {
        zoomFactor = zoomInputValue;
        graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
        actualizarNivelZoom();
    }
}

// Funciones para manejar el arrastre del gráfico
function iniciarArrastre(event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function arrastrar(event) {
    if (!isDragging) return;
    desplazamientoX += event.clientX - lastMouseX;
    desplazamientoY += event.clientY - lastMouseY;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    graficarEcuacionPolinomica(aActual, bActual, nActual, zoomFactor);
}

function detenerArrastre() {
    isDragging = false;
}

// Event listeners para el arrastre
const canvas = document.getElementById('graficoCanvas');
canvas.addEventListener('mousedown', iniciarArrastre);
canvas.addEventListener('mousemove', arrastrar);
canvas.addEventListener('mouseup', detenerArrastre);
canvas.addEventListener('mouseleave', detenerArrastre);