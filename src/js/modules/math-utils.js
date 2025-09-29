/**
 * Utilidades Matemáticas para MCM y MCD
 * Contiene todas las funciones de cálculo matemático
 */

/**
 * Calcula el Máximo Común Divisor (MCD) de dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} MCD de a y b
 */
function calculateMCD(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Calcula el MCD de múltiples números
 * @param {...number} numbers - Números para calcular MCD
 * @returns {number} MCD de todos los números
 */
function calculateMCDMultiple(...numbers) {
    return numbers.reduce(calculateMCD);
}

/**
 * Calcula el Mínimo Común Múltiplo (MCM) de dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} MCM de a y b
 */
function calculateMCM(a, b) {
    return Math.abs(a * b) / calculateMCD(a, b);
}

/**
 * Calcula el MCM de múltiples números
 * @param {...number} numbers - Números para calcular MCM
 * @returns {number} MCM de todos los números
 */
function calculateMCMMultiple(...numbers) {
    return numbers.reduce(calculateMCM);
}

/**
 * Verifica si un número es primo
 * @param {number} n - Número a verificar
 * @returns {boolean} true si es primo, false en caso contrario
 */
function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

/**
 * Descompone un número en factores primos
 * @param {number} n - Número a descomponer
 * @returns {Object} Objeto con factores primos y sus exponentes
 */
function primeFactorization(n) {
    const factors = {};
    let num = n;

    // Verificar factor de 2
    while (num % 2 === 0) {
        factors[2] = (factors[2] || 0) + 1;
        num /= 2;
    }

    // Verificar factores impares
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            factors[i] = (factors[i] || 0) + 1;
            num /= i;
        }
    }

    // Si num es un primo mayor que 2
    if (num > 2) {
        factors[num] = 1;
    }

    return factors;
}

/**
 * Verifica si dos números son primos entre sí (coprimos)
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {boolean} true si son coprimos, false en caso contrario
 */
function areCoprimes(a, b) {
    return calculateMCD(a, b) === 1;
}

/**
 * Calcula MCD y MCM usando la fórmula mágica: a × b = MCD × MCM
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {Object} Objeto con MCD y MCM
 */
function calculateMCDAndMCM(a, b) {
    const mcd = calculateMCD(a, b);
    const mcm = (a * b) / mcd;
    return { mcd, mcm };
}

/**
 * Encuentra el número que falta usando la fórmula mágica
 * @param {number} knownNumber - Número conocido
 * @param {number} mcd - MCD conocido
 * @param {number} mcm - MCM conocido
 * @returns {number} El número desconocido
 */
function findMissingNumber(knownNumber, mcd, mcm) {
    return (mcd * mcm) / knownNumber;
}

/**
 * Convierte minutos a formato de hora legible
 * @param {number} minutes - Minutos a convertir
 * @returns {string} Tiempo en formato "X horas Y minutos"
 */
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} minutos`;
    if (mins === 0) return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} y ${mins} minutos`;
}

/**
 * Valida si todos los argumentos son números enteros positivos
 * @param {...any} numbers - Números a validar
 * @returns {boolean} true si todos son números enteros positivos
 */
function validatePositiveIntegers(...numbers) {
    return numbers.every(n =>
        typeof n === 'number' &&
        Number.isInteger(n) &&
        n > 0
    );
}

// Exportar todas las funciones para uso modular
const MathUtils = {
    calculateMCD,
    calculateMCDMultiple,
    calculateMCM,
    calculateMCMMultiple,
    isPrime,
    primeFactorization,
    areCoprimes,
    calculateMCDAndMCM,
    findMissingNumber,
    minutesToTime,
    validatePositiveIntegers
};

// Para compatibilidad con diferentes sistemas de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathUtils;
}

// Para uso directo en el navegador
if (typeof window !== 'undefined') {
    window.MathUtils = MathUtils;
}