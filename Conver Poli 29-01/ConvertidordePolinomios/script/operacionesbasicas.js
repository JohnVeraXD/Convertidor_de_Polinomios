function clic() {
    // Obtener los coeficientes del primer polinomio
    var a1 = parseFloat(document.getElementsByName("a")[0].value);
    var b1 = parseFloat(document.getElementsByName("b")[0].value);
    var c1 = parseFloat(document.getElementsByName("c")[0].value);

    // Obtener los coeficientes del segundo polinomio
    var a2 = parseFloat(document.getElementsByName("a")[1].value);
    var b2 = parseFloat(document.getElementsByName("b")[1].value);
    var c2 = parseFloat(document.getElementsByName("c")[1].value);

    // Validar campos vacíos
    if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2) || !a1 || !b1 || !c1 || !a2 || !b2 || !c2) {
        alert("Por favor, completa todos los campos con valores numéricos.");
        return;
    }

    // Validar si son números reales
    if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2)) {
        alert("Ingresa valores numéricos válidos en todos los campos.");
        return;
    }

    // Limitar los valores numéricos hasta 1000
    if (Math.abs(a1) > 1000 || Math.abs(b1) > 1000 || Math.abs(c1) > 1000 || Math.abs(a2) > 1000 || Math.abs(b2) > 1000 || Math.abs(c2) > 1000) {
        alert("Ingresa valores numéricos menores o iguales a 1000 en todos los campos.");
        return;
    }

    // Calcular las operaciones
    var suma = {
        a: a1 + a2,
        b: b1 + b2,
        c: c1 + c2
    };

    var resta = {
        a: a1 - a2,
        b: b1 - b2,
        c: c1 - c2
    };

    var multiplicacion = multiplyPolynomials(a1, b1, c1, a2, b2, c2);

    var division = {
        a: a1 / a2,
        b: (b1 * a2 - a1 * b2) / (a2 * a2),
        c: (c1 * a2 - a1 * c2 + b1 * b2) / (a2 * a2)
    };

   // Mostrar los resultados
   var respuesta = document.getElementById("reponse");
    respuesta.innerHTML = `
        Suma: <span class='result'>${suma.a}x² + ${suma.b}x + ${suma.c} </span> <br>
        Resta: <span class='result'>${resta.a}x² + ${resta.b}x + ${resta.c} </span> <br>
        Multiplicación: <span class='result'>${formatPolynomial(multiplicacion)}</span> <br>
        División: <span class='result'>${division.a}x² + ${division.b}x + ${division.c} </span> <br>
    `;
    respuesta.hidden = false;
}
function multiplyPolynomials(a1, b1, c1, a2, b2, c2) {
    var result = {
        a: a1 * a2,
        b: a1 * b2 + b1 * a2,
        c: a1 * c2 + b1 * b2 + c1 * a2,
        d: b1 * c2 + c1 * b2,
        e: c1 * c2
    };

    return result;
}
function formatPolynomial(polynomial) {
    var result = "";

    if (polynomial.a !== 0) {
        result += `${polynomial.a}x^5`;
    }

    if (polynomial.b !== 0) {
        if (result !== "") {
            result += " + ";
        }
        result += `${polynomial.b}x^4`;
    }

    if (polynomial.c !== 0) {
        if (result !== "") {
            result += " + ";
        }
        result += `${polynomial.c}x^3`;
    }

    if (polynomial.d !== 0) {
        if (result !== "") {
            result += " + ";
        }
        result += `${polynomial.d}x^2`;
    }

    if (polynomial.e !== 0) {
        if (result !== "") {
            result += " + ";
        }
        result += `${polynomial.e}`;
    }

    return result;
}