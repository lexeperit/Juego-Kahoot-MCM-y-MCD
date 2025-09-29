/**
 * Gestor del Quiz - Maneja toda la lógica del juego
 * Incluye estado del quiz, navegación y puntuación
 */

class QuizManager {
    constructor() {
        this.state = {
            currentQuestionIndex: 0,
            score: 0,
            questions: [],
            userAnswers: [],
            timeLimit: 90,
            timerInterval: null,
            timeRemaining: 90,
            isActive: false,
            settings: {
                questionCount: 10,
                questionOrder: 'random',
                timeLimit: 90
            }
        };

        this.callbacks = {
            onQuestionChange: null,
            onScoreUpdate: null,
            onTimeUpdate: null,
            onQuizComplete: null,
            onAnswerSelected: null
        };

        this.achievements = {
            correctStreak: 0,
            mcmCorrect: 0,
            mcdCorrect: 0,
            perfectScore: false,
            speedBonus: 0
        };
    }

    /**
     * Configura los callbacks para eventos del quiz
     * @param {Object} callbacks - Objeto con funciones callback
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    /**
     * Configura las opciones del quiz
     * @param {Object} settings - Configuración del quiz
     */
    configure(settings) {
        this.state.settings = { ...this.state.settings, ...settings };
        this.state.timeLimit = settings.timeLimit || 90;
    }

    /**
     * Inicializa el quiz con las preguntas
     * @param {Array} allQuestions - Array de todas las preguntas disponibles
     */
    initialize(allQuestions) {
        const { questionCount, questionOrder } = this.state.settings;

        // Seleccionar preguntas según configuración
        if (questionOrder === 'random') {
            this.state.questions = this._shuffleArray([...allQuestions]).slice(0, questionCount);
        } else {
            this.state.questions = allQuestions.slice(0, questionCount);
        }

        // Resetear estado
        this.state.currentQuestionIndex = 0;
        this.state.score = 0;
        this.state.userAnswers = [];
        this.state.isActive = true;
        this.achievements = {
            correctStreak: 0,
            mcmCorrect: 0,
            mcdCorrect: 0,
            perfectScore: false,
            speedBonus: 0
        };

        this._startTimer();
        this._notifyQuestionChange();
    }

    /**
     * Procesa la respuesta seleccionada por el usuario
     * @param {number} answerIndex - Índice de la respuesta seleccionada
     */
    selectAnswer(answerIndex) {
        if (!this.state.isActive) return;

        const currentQuestion = this.getCurrentQuestion();
        const selectedAnswer = currentQuestion.answers[answerIndex];
        const isCorrect = selectedAnswer.correct;

        // Guardar respuesta del usuario
        this.state.userAnswers[this.state.currentQuestionIndex] = {
            questionId: currentQuestion.id,
            selectedIndex: answerIndex,
            isCorrect: isCorrect,
            timeUsed: this.state.timeLimit - this.state.timeRemaining
        };

        // Actualizar puntuación y estadísticas
        if (isCorrect) {
            this._handleCorrectAnswer(currentQuestion);
        } else {
            this._handleIncorrectAnswer();
        }

        // Notificar respuesta seleccionada
        if (this.callbacks.onAnswerSelected) {
            this.callbacks.onAnswerSelected({
                question: currentQuestion,
                selectedAnswer: selectedAnswer,
                isCorrect: isCorrect,
                explanation: selectedAnswer.explanation
            });
        }

        // Pausar timer temporalmente para mostrar feedback
        this._pauseTimer();
    }

    /**
     * Avanza a la siguiente pregunta
     */
    nextQuestion() {
        if (!this.state.isActive) return;

        this.state.currentQuestionIndex++;

        if (this.state.currentQuestionIndex >= this.state.questions.length) {
            this._endQuiz();
        } else {
            this._resetTimer();
            this._notifyQuestionChange();
        }
    }

    /**
     * Obtiene la pregunta actual
     * @returns {Object} Pregunta actual
     */
    getCurrentQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length) {
            return this.state.questions[this.state.currentQuestionIndex];
        }
        return null;
    }

    /**
     * Obtiene el estado actual del quiz
     * @returns {Object} Estado del quiz
     */
    getState() {
        return {
            ...this.state,
            progress: this.getProgress(),
            achievements: this.achievements
        };
    }

    /**
     * Obtiene el progreso actual como porcentaje
     * @returns {number} Progreso del 0 al 100
     */
    getProgress() {
        return (this.state.currentQuestionIndex / this.state.questions.length) * 100;
    }

    /**
     * Termina el quiz prematuramente
     */
    exitQuiz() {
        this._endQuiz();
    }

    /**
     * Pausa o reanuda el timer
     */
    toggleTimer() {
        if (this.state.timerInterval) {
            this._pauseTimer();
        } else {
            this._startTimer();
        }
    }

    /**
     * Obtiene estadísticas del quiz completado
     * @returns {Object} Estadísticas del quiz
     */
    getStatistics() {
        const correctAnswers = this.state.userAnswers.filter(a => a.isCorrect).length;
        const accuracy = (correctAnswers / this.state.userAnswers.length) * 100;
        const averageTime = this.state.userAnswers.reduce((sum, a) => sum + a.timeUsed, 0) / this.state.userAnswers.length;

        return {
            totalQuestions: this.state.questions.length,
            correctAnswers: correctAnswers,
            incorrectAnswers: this.state.userAnswers.length - correctAnswers,
            accuracy: Math.round(accuracy),
            averageTimePerQuestion: Math.round(averageTime),
            finalScore: this.state.score,
            achievements: this.achievements
        };
    }

    // Métodos privados

    /**
     * Mezcla un array aleatoriamente
     * @param {Array} array - Array a mezclar
     * @returns {Array} Array mezclado
     */
    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Inicia el timer de la pregunta
     */
    _startTimer() {
        this._clearTimer();
        this.state.timeRemaining = this.state.timeLimit;

        this.state.timerInterval = setInterval(() => {
            this.state.timeRemaining--;

            if (this.callbacks.onTimeUpdate) {
                this.callbacks.onTimeUpdate(this.state.timeRemaining, this.state.timeLimit);
            }

            if (this.state.timeRemaining <= 0) {
                this._handleTimeOut();
            }
        }, 1000);
    }

    /**
     * Pausa el timer
     */
    _pauseTimer() {
        this._clearTimer();
    }

    /**
     * Resetea el timer para la siguiente pregunta
     */
    _resetTimer() {
        this._clearTimer();
        this._startTimer();
    }

    /**
     * Limpia el timer
     */
    _clearTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    /**
     * Maneja respuesta correcta
     * @param {Object} question - Pregunta respondida correctamente
     */
    _handleCorrectAnswer(question) {
        // Calcular puntos base
        let points = 100;

        // Bonus por tiempo restante
        const timeBonus = Math.floor(this.state.timeRemaining * 2);
        points += timeBonus;

        // Bonus por racha consecutiva
        this.achievements.correctStreak++;
        if (this.achievements.correctStreak >= 3) {
            points += 50; // Bonus por racha
        }

        // Estadísticas por categoría
        if (question.category === 'mcm') {
            this.achievements.mcmCorrect++;
        } else if (question.category === 'mcd') {
            this.achievements.mcdCorrect++;
        }

        this.state.score += points;

        if (this.callbacks.onScoreUpdate) {
            this.callbacks.onScoreUpdate(this.state.score, points);
        }
    }

    /**
     * Maneja respuesta incorrecta
     */
    _handleIncorrectAnswer() {
        this.achievements.correctStreak = 0; // Resetear racha
    }

    /**
     * Maneja cuando se agota el tiempo
     */
    _handleTimeOut() {
        // Marcar como respuesta incorrecta por tiempo
        const currentQuestion = this.getCurrentQuestion();
        this.state.userAnswers[this.state.currentQuestionIndex] = {
            questionId: currentQuestion.id,
            selectedIndex: -1, // No respondió
            isCorrect: false,
            timeUsed: this.state.timeLimit
        };

        this._handleIncorrectAnswer();

        if (this.callbacks.onAnswerSelected) {
            this.callbacks.onAnswerSelected({
                question: currentQuestion,
                selectedAnswer: null,
                isCorrect: false,
                explanation: "Tiempo agotado - No se seleccionó respuesta"
            });
        }
    }

    /**
     * Notifica cambio de pregunta
     */
    _notifyQuestionChange() {
        if (this.callbacks.onQuestionChange) {
            this.callbacks.onQuestionChange({
                question: this.getCurrentQuestion(),
                index: this.state.currentQuestionIndex,
                total: this.state.questions.length
            });
        }
    }

    /**
     * Finaliza el quiz
     */
    _endQuiz() {
        this.state.isActive = false;
        this._clearTimer();

        // Verificar logros finales
        const correctAnswers = this.state.userAnswers.filter(a => a.isCorrect).length;
        if (correctAnswers === this.state.questions.length) {
            this.achievements.perfectScore = true;
        }

        if (this.callbacks.onQuizComplete) {
            this.callbacks.onQuizComplete(this.getStatistics());
        }
    }
}

// Para compatibilidad con diferentes sistemas de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizManager;
}

// Para uso directo en el navegador
if (typeof window !== 'undefined') {
    window.QuizManager = QuizManager;
}