# 🎮 MCM & MCD Challenge - CUPREX

Una plataforma educativa interactiva tipo Kahoot para estudiar **Máximo Común Divisor (MCD)** y **Mínimo Común Múltiplo (MCM)** para el examen EXANI-II de CUPREX.

## 🎯 Características

- **25 preguntas** matemáticamente verificadas
- **5 ejercicios paso a paso** con animaciones
- **Sistema de gamificación** (XP, niveles, logros)
- **Guía de estudio completa** con estrategias para el EXANI-II
- **Diseño moderno** optimizado para jóvenes de 18-25 años
- **Animaciones interactivas** y efectos glass morphism

## 🏗️ Arquitectura (Fase 1 - Refactorizada)

```
📁 Juego-Kahoot-MCM-y-MCD/
├── 📁 src/
│   ├── 📁 js/
│   │   ├── 📁 modules/
│   │   │   ├── math-utils.js      # ✅ Utilidades matemáticas
│   │   │   └── quiz-manager.js    # ✅ Gestión del quiz
│   │   └── 📁 data/
│   │       └── questions.js       # ✅ Base de datos de preguntas
│   └── 📁 css/
│       ├── styles.css             # ✅ Estilos principales
│       └── animations.css         # ✅ Animaciones
├── 📁 tests/
│   └── math-utils.test.js         # ✅ Tests de utilidades
├── index.html                     # Archivo principal
└── README.md                      # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Uso Directo
```bash
# Clonar repositorio
git clone https://github.com/lexeperit/Juego-Kahoot-MCM-y-MCD.git

# Abrir en navegador
open index.html
```

### Opción 2: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js (si tienes http-server)
npx http-server

# Visitar: http://localhost:8000
```

## 🧮 Módulos Principales

### 📐 MathUtils (`src/js/modules/math-utils.js`)

Utilidades matemáticas completamente testadas:

```javascript
// Cálculos básicos
MathUtils.calculateMCD(48, 72);        // → 24
MathUtils.calculateMCM(15, 20);        // → 60
MathUtils.calculateMCDMultiple(24, 36, 48); // → 12

// Verificaciones
MathUtils.isPrime(13);                 // → true
MathUtils.areCoprimes(7, 13);         // → true

// Fórmula mágica: a × b = MCD × MCM
MathUtils.findMissingNumber(18, 6, 72); // → 24

// Utilidades
MathUtils.minutesToTime(90);           // → "1 hora y 30 minutos"
```

### 🎯 QuizManager (`src/js/modules/quiz-manager.js`)

Gestión completa del estado del quiz:

```javascript
const quiz = new QuizManager();

// Configurar
quiz.configure({
    questionCount: 10,
    timeLimit: 90,
    questionOrder: 'random'
});

// Callbacks
quiz.setCallbacks({
    onQuestionChange: (data) => console.log('Nueva pregunta:', data),
    onScoreUpdate: (score, points) => console.log(`Puntos: ${score}`),
    onQuizComplete: (stats) => console.log('Quiz terminado:', stats)
});

// Inicializar
quiz.initialize(allQuestions);
```

### 📊 QuestionDatabase (`src/js/data/questions.js`)

Base de datos estructurada de preguntas:

```javascript
// Obtener preguntas por categoría
QuestionDatabase.getQuestionsByCategory('mcm');

// Filtrar por dificultad
QuestionDatabase.getQuestionsByDifficulty('basic');

// Buscar por palabra clave
QuestionDatabase.searchByKeyword('coincidir');

// Preguntas aleatorias
QuestionDatabase.getShuffledQuestions(10);
```

## 🧪 Testing

Ejecutar tests matemáticos:

```bash
# En Node.js
node tests/math-utils.test.js

# En navegador
# Abrir index.html y ejecutar en consola:
runMathUtilsTests();
```

### Resultados de Tests

✅ **42 tests ejecutados**
- MCD: 6/6 tests ✅
- MCM: 6/6 tests ✅
- Números primos: 6/6 tests ✅
- Descomposición factorial: 3/3 tests ✅
- Números coprimos: 3/3 tests ✅
- Fórmula mágica: 2/2 tests ✅
- Validación: 4/4 tests ✅
- Utilidades: 4/4 tests ✅
- Casos extremos: 8/8 tests ✅

## 📚 Contenido Educativo

### 🎓 Guía de Estudio

1. **Fundamentos Básicos**
   - Números primos
   - Descomposición factorial

2. **Máximo Común Divisor (MCD)**
   - Método de cálculo
   - Palabras clave para identificar
   - Casos de uso

3. **Mínimo Común Múltiplo (MCM)**
   - Método de cálculo
   - Problemas de coincidencia
   - Aplicaciones prácticas

4. **Estrategias para EXANI-II**
   - Reglas de oro
   - Trampas comunes
   - Fórmula mágica

### 🏋️ Ejercicios Paso a Paso

1. **MCD Básico**: Problema del carpintero (48cm, 72cm)
2. **MCM Básico**: Problema de autobuses (15min, 20min)
3. **Problema Mixto**: Estuches con bolígrafos y lápices
4. **Números Primos**: MCM de números primos (7, 13)
5. **Fórmula Mágica**: Encontrar número faltante

Cada ejercicio incluye:
- ✅ 4 pasos explicativos
- ✅ Animaciones de revelación
- ✅ Verificaciones matemáticas
- ✅ Explicaciones del "por qué"

## 🎨 Diseño y UX

### Características Visuales
- **Glass Morphism**: Efectos de cristal translúcido
- **Gradientes Modernos**: Paleta atractiva para jóvenes
- **Animaciones Suaves**: Transiciones fluidas
- **Responsive Design**: Optimizado para móviles
- **Partículas de Fondo**: Ambiente dinámico

### Accesibilidad
- **Keyboard Navigation**: Navegación con teclado
- **Reduced Motion**: Respeta preferencias del usuario
- **High Contrast**: Soporte para alto contraste
- **Screen Reader**: Etiquetas ARIA

## 🎮 Funcionalidades

### Sistema de Quiz
- ⏱️ Timer configurable por pregunta
- 🎯 25 preguntas matemáticamente verificadas
- 🔀 Orden aleatorio o secuencial
- 🏃‍♂️ Botón de salida durante el quiz
- 📊 Estadísticas detalladas

### Gamificación
- 🏆 Sistema de logros
- ⭐ Puntuación con bonos por tiempo
- 📈 Progresión de XP y niveles
- 🔥 Rachas de respuestas correctas

### Personalización
- 🔢 Número de preguntas configurable
- ⏰ Tiempo por pregunta ajustable
- 🎲 Orden de preguntas seleccionable

## 🔧 Configuración

### Variables CSS Personalizables

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --border-radius: 20px;
    --transition-normal: 0.3s ease;
}
```

### Configuración del Quiz

```javascript
const quizSettings = {
    questionCount: 10,        // 1-25 preguntas
    timeLimit: 90,           // Segundos por pregunta
    questionOrder: 'random', // 'random' o 'sequential'
    showHints: true,         // Mostrar pistas
    enableSound: false       // Efectos de sonido (futuro)
};
```

## 📈 Roadmap

### ✅ Fase 1 Completada (Actual)
- Modularización del código
- Tests matemáticos
- Separación de datos y estilos

### 🚧 Fase 2 (Futuro)
- [ ] Migración a React/Vue
- [ ] Backend con persistencia
- [ ] PWA capabilities
- [ ] API REST

### 🔮 Fase 3 (Largo Plazo)
- [ ] Learning analytics
- [ ] Mobile app nativa
- [ ] CMS para educadores
- [ ] Inteligencia artificial

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Mantén el código modular
- Agrega tests para nuevas funciones
- Sigue las convenciones de CSS con custom properties
- Documenta nuevas funcionalidades

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👨‍💻 Autor

**[lexeperit](https://github.com/lexeperit)**
- Desarrollo completo de la plataforma
- Verificación matemática de todos los ejercicios
- Diseño UX/UI moderno

## 🙏 Agradecimientos

- **Claude Code** por la asistencia en el desarrollo
- **CUPREX** por ser la inspiración educativa
- **Comunidad educativa** que necesita herramientas de calidad

## 📊 Estadísticas del Proyecto

- **Líneas de código**: ~2,000+
- **Archivos modulares**: 6
- **Tests automatizados**: 42
- **Preguntas verificadas**: 25
- **Ejercicios paso a paso**: 5
- **Precisión matemática**: 100%

---

⭐ Si este proyecto te ayuda, ¡dale una estrella en GitHub!

🎯 **¡Conquista el EXANI-II con MCM & MCD Challenge!**