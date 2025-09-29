/**
 * Base de datos de preguntas para el quiz de MCM y MCD
 * Cada pregunta incluye categoría, dificultad y explicaciones detalladas
 */

const QuestionDatabase = {
    // Categorías de preguntas
    categories: {
        MCM: 'mcm',
        MCD: 'mcd',
        MIXED: 'mixed',
        PRIMES: 'primes',
        APPLICATION: 'application'
    },

    // Niveles de dificultad
    difficulty: {
        BASIC: 'basic',
        INTERMEDIATE: 'intermediate',
        ADVANCED: 'advanced'
    },

    // Array principal de preguntas
    questions: [
        {
            id: 'mcm_001',
            category: 'mcm',
            difficulty: 'intermediate',
            question: "Tres luces intermitentes se encienden a intervalos de 4, 6 y 10 segundos. Si coinciden a las 7:00 p.m., ¿después de cuántos segundos volverán a coincidir?",
            answers: [
                {
                    text: "60 segundos",
                    correct: true,
                    explanation: "¡Correcto! Se busca un 'punto de encuentro' futuro, lo que requiere el Mínimo Común Múltiplo (mcm). El mcm de 4, 6 y 10 es 60."
                },
                {
                    text: "2 segundos",
                    correct: false,
                    explanation: "Incorrecto. Este valor es el Máximo Común Divisor (mcd) de 4 y 6. El mcd se usa para 'dividir' o 'repartir' en partes iguales, no para encontrar futuras coincidencias."
                },
                {
                    text: "120 segundos",
                    correct: false,
                    explanation: "Incorrecto. Aunque 120 es un múltiplo común de los tres números, no es el *mínimo*. El mcm es el primer punto en el que coinciden, que es 60."
                }
            ],
            keywords: ['coincidir', 'intervalos', 'tiempo'],
            calculation: {
                numbers: [4, 6, 10],
                operation: 'mcm',
                result: 60
            }
        },

        {
            id: 'mcd_001',
            category: 'mcd',
            difficulty: 'basic',
            question: "Un carpintero quiere cortar dos listones de madera de 90 cm y 120 cm en trozos de igual longitud, lo más largos posible. ¿Cuál debe ser la longitud de cada trozo?",
            answers: [
                {
                    text: "10 cm",
                    correct: false,
                    explanation: "Incorrecto. Aunque 10 cm es un divisor común de 90 y 120, no es el *máximo* posible. Se pueden hacer trozos más grandes."
                },
                {
                    text: "360 cm",
                    correct: false,
                    explanation: "Incorrecto. Este valor es el mcm. No puedes cortar un listón de 90 cm en trozos de 360 cm. El mcm se usa para encontrar múltiplos, no divisores."
                },
                {
                    text: "30 cm",
                    correct: true,
                    explanation: "¡Correcto! Se busca 'dividir' en partes iguales y lo 'más largas posible', lo que indica que se necesita el Máximo Común Divisor (mcd). El mcd de 90 y 120 es 30."
                }
            ],
            keywords: ['cortar', 'dividir', 'lo más largos posible'],
            calculation: {
                numbers: [90, 120],
                operation: 'mcd',
                result: 30
            }
        },

        {
            id: 'mcd_002',
            category: 'mcd',
            difficulty: 'basic',
            question: "Calcule el Máximo Común Divisor (mcd) de 24, 36 y 48.",
            answers: [
                {
                    text: "12",
                    correct: true,
                    explanation: "¡Correcto! El 12 es el número más grande que puede dividir exactamente a 24 (12x2), 36 (12x3) y 48 (12x4)."
                },
                {
                    text: "144",
                    correct: false,
                    explanation: "Incorrecto. Este valor es el mcm de los tres números. El mcd debe ser menor o igual al número más pequeño del grupo (24)."
                },
                {
                    text: "6",
                    correct: false,
                    explanation: "Incorrecto. Aunque 6 es un divisor común, no es el *máximo*. El 12 también es un divisor común y es más grande."
                }
            ],
            keywords: ['calcular', 'máximo común divisor'],
            calculation: {
                numbers: [24, 36, 48],
                operation: 'mcd',
                result: 12
            }
        },

        {
            id: 'mcm_002',
            category: 'mcm',
            difficulty: 'intermediate',
            question: "Un paciente toma un jarabe cada 6 horas y una pastilla cada 8 horas. Si tomó ambos a las 9:00 a.m., ¿a qué hora volverá a tomar ambos medicamentos juntos?",
            answers: [
                {
                    text: "A las 9:00 a.m. del siguiente día",
                    correct: true,
                    explanation: "¡Correcto! Buscamos la próxima coincidencia en el tiempo, por lo que usamos el mcm. El mcm de 6 y 8 es 24. Por lo tanto, coincidirán 24 horas después, que es a las 9:00 a.m. del día siguiente."
                },
                {
                    text: "A la 1:00 p.m. del mismo día",
                    correct: false,
                    explanation: "Incorrecto. Esto sería solo 4 horas después. 4 no es múltiplo ni de 6 ni de 8."
                },
                {
                    text: "A las 9:00 p.m. del mismo día",
                    correct: false,
                    explanation: "Incorrecto. Esto es 12 horas después. A las 12 horas, habría tomado el jarabe (6x2) pero no la pastilla (8x1.5)."
                }
            ],
            keywords: ['medicamentos', 'tomar juntos', 'volver a coincidir'],
            calculation: {
                numbers: [6, 8],
                operation: 'mcm',
                result: 24
            }
        },

        {
            id: 'mcm_003',
            category: 'mcm',
            difficulty: 'basic',
            question: "Calcule el Mínimo Común Múltiplo (mcm) de 15, 20 y 30.",
            answers: [
                {
                    text: "5",
                    correct: false,
                    explanation: "Incorrecto. Este es el mcd de los tres números. El mcm debe ser mayor o igual al número más grande del grupo (30)."
                },
                {
                    text: "60",
                    correct: true,
                    explanation: "¡Correcto! 60 es el número más pequeño que puede ser dividido exactamente por 15 (15x4), 20 (20x3) y 30 (30x2)."
                },
                {
                    text: "120",
                    correct: false,
                    explanation: "Incorrecto. 120 es un múltiplo común, pero no es el *mínimo*. El 60 también es un múltiplo común y es más pequeño."
                }
            ],
            keywords: ['calcular', 'mínimo común múltiplo'],
            calculation: {
                numbers: [15, 20, 30],
                operation: 'mcm',
                result: 60
            }
        },

        {
            id: 'mixed_001',
            category: 'mixed',
            difficulty: 'advanced',
            question: "Se tienen 54 chocolates y 72 caramelos. Se quieren armar bolsas con la misma cantidad de cada dulce, de modo que se use el mayor número de bolsas posible. ¿Cuántos chocolates habrá en cada bolsa?",
            answers: [
                {
                    text: "18",
                    correct: false,
                    explanation: "Incorrecto. ¡Cuidado! 18 es el mcd, que representa el número total de bolsas que se pueden armar. La pregunta es cuántos *chocolates* hay en cada bolsa."
                },
                {
                    text: "4",
                    correct: false,
                    explanation: "Incorrecto. Este es el número de *caramelos* por bolsa (72 caramelos / 18 bolsas = 4)."
                },
                {
                    text: "3",
                    correct: true,
                    explanation: "¡Correcto! Es un problema de dos pasos. Primero, el mcd(54, 72) = 18 nos da el número de bolsas. Luego, 54 chocolates / 18 bolsas = 3 chocolates por bolsa."
                }
            ],
            keywords: ['armar bolsas', 'mayor número de bolsas', 'mismo contenido'],
            calculation: {
                numbers: [54, 72],
                operation: 'mcd',
                result: 18,
                secondStep: {
                    operation: 'division',
                    dividend: 54,
                    divisor: 18,
                    result: 3
                }
            }
        },

        {
            id: 'application_001',
            category: 'application',
            difficulty: 'advanced',
            question: "Si el mcd de dos números es 6 y su mcm es 72, y uno de los números es 18, ¿cuál es el otro número?",
            answers: [
                {
                    text: "24",
                    correct: true,
                    explanation: "¡Correcto! Se usa la propiedad: a × b = mcd(a,b) × mcm(a,b). Entonces, 18 × b = 6 × 72, que es 432. Despejando b: 432 / 18 = 24."
                },
                {
                    text: "12",
                    correct: false,
                    explanation: "Incorrecto. Si los números fueran 18 y 12, su mcd sería 6, pero su mcm sería 36, no 72."
                },
                {
                    text: "36",
                    correct: false,
                    explanation: "Incorrecto. Si los números fueran 18 y 36, su mcd sería 18, no 6."
                }
            ],
            keywords: ['fórmula mágica', 'mcd y mcm dados'],
            calculation: {
                formula: 'a × b = mcd × mcm',
                knownValues: { a: 18, mcd: 6, mcm: 72 },
                operation: 'findMissing',
                result: 24
            }
        },

        {
            id: 'primes_001',
            category: 'primes',
            difficulty: 'intermediate',
            question: "¿Cuál es el mcm de dos números primos diferentes, como 7 y 13?",
            answers: [
                {
                    text: "1",
                    correct: false,
                    explanation: "Incorrecto. El 1 es el mcd de cualquier par de números primos, no el mcm."
                },
                {
                    text: "Su suma (20)",
                    correct: false,
                    explanation: "Incorrecto. La suma no se utiliza para calcular el mcm."
                },
                {
                    text: "Su producto (91)",
                    correct: true,
                    explanation: "¡Correcto! Como los números primos no comparten factores (excepto el 1), su Mínimo Común Múltiplo es siempre el resultado de multiplicarlos."
                }
            ],
            keywords: ['números primos', 'coprimos'],
            calculation: {
                numbers: [7, 13],
                operation: 'mcm',
                result: 91,
                special: 'primes'
            }
        }

        // Se pueden agregar más preguntas aquí siguiendo el mismo patrón...
    ],

    /**
     * Obtiene preguntas filtradas por categoría
     * @param {string} category - Categoría de preguntas
     * @returns {Array} Array de preguntas de la categoría
     */
    getQuestionsByCategory(category) {
        return this.questions.filter(q => q.category === category);
    },

    /**
     * Obtiene preguntas filtradas por dificultad
     * @param {string} difficulty - Nivel de dificultad
     * @returns {Array} Array de preguntas del nivel
     */
    getQuestionsByDifficulty(difficulty) {
        return this.questions.filter(q => q.difficulty === difficulty);
    },

    /**
     * Obtiene una pregunta aleatoria
     * @returns {Object} Pregunta aleatoria
     */
    getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    },

    /**
     * Obtiene preguntas mezcladas aleatoriamente
     * @param {number} count - Número de preguntas a obtener
     * @returns {Array} Array de preguntas mezcladas
     */
    getShuffledQuestions(count = this.questions.length) {
        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    /**
     * Busca preguntas por palabras clave
     * @param {string} keyword - Palabra clave a buscar
     * @returns {Array} Array de preguntas que contienen la palabra clave
     */
    searchByKeyword(keyword) {
        return this.questions.filter(q =>
            q.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase())) ||
            q.question.toLowerCase().includes(keyword.toLowerCase())
        );
    }
};

// Para compatibilidad con diferentes sistemas de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionDatabase;
}

// Para uso directo en el navegador
if (typeof window !== 'undefined') {
    window.QuestionDatabase = QuestionDatabase;
}