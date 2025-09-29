/**
 * Tests para las utilidades matemáticas
 * Incluye verificación de cálculos de MCD, MCM y funciones auxiliares
 */

// Importar las utilidades (compatible con Node.js y browser)
let MathUtils;
if (typeof require !== 'undefined') {
    MathUtils = require('../src/js/modules/math-utils.js');
} else if (typeof window !== 'undefined' && window.MathUtils) {
    MathUtils = window.MathUtils;
}

// Framework de testing simple
class SimpleTest {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, testFunction) {
        try {
            testFunction();
            this.passed++;
            console.log(`✅ ${description}`);
        } catch (error) {
            this.failed++;
            console.error(`❌ ${description}:`, error.message);
        }
        this.tests.push({ description, passed: this.failed === 0 });
    }

    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${expected}, but got ${actual}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Expected truthy value, but got ${actual}`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Expected falsy value, but got ${actual}`);
                }
            }
        };
    }

    runSummary() {
        console.log('\n=== RESUMEN DE TESTS ===');
        console.log(`✅ Pasaron: ${this.passed}`);
        console.log(`❌ Fallaron: ${this.failed}`);
        console.log(`📊 Total: ${this.tests.length}`);
        console.log(`🎯 Éxito: ${((this.passed / this.tests.length) * 100).toFixed(1)}%`);
    }
}

// Ejecutar tests
function runMathUtilsTests() {
    const test = new SimpleTest();

    console.log('🧮 Iniciando tests de utilidades matemáticas...\n');

    // === TESTS DE MCD ===
    console.log('📐 Tests de MCD (Máximo Común Divisor):');

    test.test('MCD(48, 72) debería ser 24', () => {
        test.expect(MathUtils.calculateMCD(48, 72)).toBe(24);
    });

    test.test('MCD(90, 120) debería ser 30', () => {
        test.expect(MathUtils.calculateMCD(90, 120)).toBe(30);
    });

    test.test('MCD(24, 36, 48) debería ser 12', () => {
        test.expect(MathUtils.calculateMCDMultiple(24, 36, 48)).toBe(12);
    });

    test.test('MCD(100, 150) debería ser 50', () => {
        test.expect(MathUtils.calculateMCD(100, 150)).toBe(50);
    });

    test.test('MCD(7, 13) debería ser 1 (números primos)', () => {
        test.expect(MathUtils.calculateMCD(7, 13)).toBe(1);
    });

    test.test('MCD(54, 72) debería ser 18', () => {
        test.expect(MathUtils.calculateMCD(54, 72)).toBe(18);
    });

    // === TESTS DE MCM ===
    console.log('\n📏 Tests de MCM (Mínimo Común Múltiplo):');

    test.test('MCM(4, 6) debería ser 12', () => {
        test.expect(MathUtils.calculateMCM(4, 6)).toBe(12);
    });

    test.test('MCM(15, 20) debería ser 60', () => {
        test.expect(MathUtils.calculateMCM(15, 20)).toBe(60);
    });

    test.test('MCM(6, 8) debería ser 24', () => {
        test.expect(MathUtils.calculateMCM(6, 8)).toBe(24);
    });

    test.test('MCM(15, 20, 30) debería ser 60', () => {
        test.expect(MathUtils.calculateMCMMultiple(15, 20, 30)).toBe(60);
    });

    test.test('MCM(7, 13) debería ser 91 (números primos)', () => {
        test.expect(MathUtils.calculateMCM(7, 13)).toBe(91);
    });

    test.test('MCM(50, 60) debería ser 300', () => {
        test.expect(MathUtils.calculateMCM(50, 60)).toBe(300);
    });

    // === TESTS DE NÚMEROS PRIMOS ===
    console.log('\n🔢 Tests de números primos:');

    test.test('2 debería ser primo', () => {
        test.expect(MathUtils.isPrime(2)).toBeTruthy();
    });

    test.test('7 debería ser primo', () => {
        test.expect(MathUtils.isPrime(7)).toBeTruthy();
    });

    test.test('13 debería ser primo', () => {
        test.expect(MathUtils.isPrime(13)).toBeTruthy();
    });

    test.test('4 no debería ser primo', () => {
        test.expect(MathUtils.isPrime(4)).toBeFalsy();
    });

    test.test('15 no debería ser primo', () => {
        test.expect(MathUtils.isPrime(15)).toBeFalsy();
    });

    test.test('1 no debería ser primo', () => {
        test.expect(MathUtils.isPrime(1)).toBeFalsy();
    });

    // === TESTS DE DESCOMPOSICIÓN FACTORIAL ===
    console.log('\n⚗️ Tests de descomposición factorial:');

    test.test('Factorización de 12 debería ser {2: 2, 3: 1}', () => {
        test.expect(MathUtils.primeFactorization(12)).toEqual({2: 2, 3: 1});
    });

    test.test('Factorización de 24 debería ser {2: 3, 3: 1}', () => {
        test.expect(MathUtils.primeFactorization(24)).toEqual({2: 3, 3: 1});
    });

    test.test('Factorización de 30 debería ser {2: 1, 3: 1, 5: 1}', () => {
        test.expect(MathUtils.primeFactorization(30)).toEqual({2: 1, 3: 1, 5: 1});
    });

    // === TESTS DE COPRIMOS ===
    console.log('\n🤝 Tests de números coprimos:');

    test.test('7 y 13 deberían ser coprimos', () => {
        test.expect(MathUtils.areCoprimes(7, 13)).toBeTruthy();
    });

    test.test('4 y 6 no deberían ser coprimos', () => {
        test.expect(MathUtils.areCoprimes(4, 6)).toBeFalsy();
    });

    test.test('9 y 16 deberían ser coprimos', () => {
        test.expect(MathUtils.areCoprimes(9, 16)).toBeTruthy();
    });

    // === TESTS DE FÓRMULA MÁGICA ===
    console.log('\n✨ Tests de fórmula mágica (a × b = MCD × MCM):');

    test.test('MCD y MCM de 12 y 18', () => {
        const result = MathUtils.calculateMCDAndMCM(12, 18);
        test.expect(result.mcd).toBe(6);
        test.expect(result.mcm).toBe(36);
        // Verificar fórmula: 12 × 18 = 6 × 36 = 216
        test.expect(12 * 18).toBe(result.mcd * result.mcm);
    });

    test.test('Encontrar número faltante con fórmula mágica', () => {
        // Si MCD=6, MCM=72, uno es 18, el otro debería ser 24
        const missing = MathUtils.findMissingNumber(18, 6, 72);
        test.expect(missing).toBe(24);
    });

    // === TESTS DE VALIDACIÓN ===
    console.log('\n✅ Tests de validación:');

    test.test('Números enteros positivos válidos', () => {
        test.expect(MathUtils.validatePositiveIntegers(5, 10, 15)).toBeTruthy();
    });

    test.test('Número negativo debería ser inválido', () => {
        test.expect(MathUtils.validatePositiveIntegers(5, -10, 15)).toBeFalsy();
    });

    test.test('Número decimal debería ser inválido', () => {
        test.expect(MathUtils.validatePositiveIntegers(5, 10.5, 15)).toBeFalsy();
    });

    test.test('String debería ser inválido', () => {
        test.expect(MathUtils.validatePositiveIntegers(5, "10", 15)).toBeFalsy();
    });

    // === TESTS DE UTILIDADES ===
    console.log('\n🕒 Tests de utilidades de tiempo:');

    test.test('60 minutos debería convertirse a "1 hora"', () => {
        test.expect(MathUtils.minutesToTime(60)).toBe('1 hora');
    });

    test.test('90 minutos debería convertirse a "1 hora y 30 minutos"', () => {
        test.expect(MathUtils.minutesToTime(90)).toBe('1 hora y 30 minutos');
    });

    test.test('30 minutos debería convertirse a "30 minutos"', () => {
        test.expect(MathUtils.minutesToTime(30)).toBe('30 minutos');
    });

    test.test('120 minutos debería convertirse a "2 horas"', () => {
        test.expect(MathUtils.minutesToTime(120)).toBe('2 horas');
    });

    // === CASOS EXTREMOS ===
    console.log('\n🚨 Tests de casos extremos:');

    test.test('MCD con números iguales', () => {
        test.expect(MathUtils.calculateMCD(15, 15)).toBe(15);
    });

    test.test('MCM con números iguales', () => {
        test.expect(MathUtils.calculateMCM(15, 15)).toBe(15);
    });

    test.test('MCD con 1', () => {
        test.expect(MathUtils.calculateMCD(1, 25)).toBe(1);
    });

    test.test('MCM con 1', () => {
        test.expect(MathUtils.calculateMCM(1, 25)).toBe(25);
    });

    // Mostrar resumen
    test.runSummary();

    return {
        passed: test.passed,
        failed: test.failed,
        total: test.tests.length,
        success: test.failed === 0
    };
}

// Ejecutar tests automáticamente si el archivo se ejecuta directamente
if (typeof module !== 'undefined' && require.main === module) {
    runMathUtilsTests();
}

// Para uso en el navegador
if (typeof window !== 'undefined') {
    window.runMathUtilsTests = runMathUtilsTests;
}

// Para sistemas de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runMathUtilsTests, SimpleTest };
}