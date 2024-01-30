// Variables globales para manejar el zoom y los valores actuales de la ecuación
let zoomFactor = 1;
let mActual, bActual;

function prepararCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    dibujarPlanoCartesiano(ctx, width, height);

    return ctx;
}

function dibujarPlanoCartesiano(ctx, width, height) {
    // Dibujar los ejes
    ctx.beginPath();
    ctx.strokeStyle = "#3f3f3f";
    ctx.lineWidth = 1;
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Dibujar las líneas del cuadriculado
    ctx.strokeStyle = "#ddd";
    for (let i = 0; i < width; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }
    ctx.stroke();
}
function graficarEcuacionLineal(m, b) {
    const ctx = prepararCanvas('graficoCanvas');
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centroX = width / 2;
    const centroY = height / 2;
    const escala = 50; // Escala para el gráfico

    // Ajustar la línea a la escala del canvas y al zoom
    ctx.beginPath();
    ctx.strokeStyle = 'blue';

    // Punto de inicio (extremo izquierdo del canvas)
    ctx.moveTo(0, centroY - (m * -centroX / zoomFactor + b) * escala * zoomFactor);
    // Punto final (extremo derecho del canvas)
    ctx.lineTo(width, centroY - (m * (width - centroX) / zoomFactor + b) * escala * zoomFactor);

    ctx.stroke();
}



function zoomIn() {
    zoomFactor *= 1.1;
    graficarEcuacionLineal(mActual, bActual);
}

function zoomOut() {
    zoomFactor /= 1.1;
    graficarEcuacionLineal(mActual, bActual);
}

function calcularEcuacionLineal() {
    mActual = parseFloat(document.getElementById('m').value);
    bActual = parseFloat(document.getElementById('b').value);
    graficarEcuacionLineal(mActual, bActual);
}
