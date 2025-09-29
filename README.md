# 💰 Gestor de Gastos

Una aplicación moderna y elegante para el control de finanzas personales, desarrollada con React, TypeScript y Tailwind CSS.

## 📋 Características

- ✅ **Persistencia de datos** en localStorage
- ✅ **Resumen financiero** con totales y balance automático
- ✅ **Edición y eliminación** de transacciones
- ✅ **Interfaz responsiva** optimizada para móvil y desktop
- ✅ **Diseño moderno** con gradientes y animaciones suaves
- ✅ **Validación de formularios** en tiempo real
- ✅ **Formato de moneda colombiana** automático

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Vite** - Herramienta de desarrollo rápida
- **Heroicons** - Iconos SVG elegantes
- **UUID** - Generación de identificadores únicos


## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Form.tsx         # Formulario de registro
│   ├── EventList.tsx    # Lista de transacciones
│   ├── BillsTracker.tsx # Resumen de totales
│   └── BillsDisplay.tsx # Display de montos
├── reducers/            # Gestión de estado
│   └── event-reducer.ts # Reducer principal
├── types/               # Definiciones TypeScript
│   └── index.ts        # Tipos de la aplicación
├── data/               # Datos estáticos
│   └── index.ts       # Categorías predefinidas
└── App.tsx            # Componente principal
```

## 🎯 Funcionalidades Detalladas

### 📊 Gestión de Transacciones
- **Campos requeridos**: Descripción, monto y fecha
- **Validación automática**: El botón se habilita solo con datos válidos

### 💾 Persistencia de Datos
- **Almacenamiento local**: Los datos se guardan automáticamente
- **Recuperación al iniciar**: La aplicación carga los datos previos
- **Manejo de fechas**: Conversión automática entre string y Date

### 🎨 Interfaz de Usuario
- **Diseño responsivo**: Funciona en móvil, tablet y desktop
- **Gradientes modernos**: Colores elegantes y profesionales
- **Animaciones suaves**: Transiciones CSS para mejor UX
- **Iconografía consistente**: Heroicons para todas las acciones

### 📈 Resumen Financiero
- **Total de gastos**: Suma automática de todas las salidas
- **Total de ingresos**: Suma automática de todas las entradas  
- **Balance neto**: Cálculo automático del saldo disponible
- **Códigos de color**: Rojo para gastos, verde para ingresos

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la construcción

# Linting
npm run lint         # Ejecuta ESLint para revisar el código

```

## 🎨 Paleta de Colores

- **Primario**: Azul (#4F46E5) - Botones principales
- **Secundario**: Púrpura (#7C3AED) - Gradientes
- **Gastos**: Rojo (#DC2626) - Indicadores de salida
- **Ingresos**: Verde (#16A34A) - Indicadores de entrada
- **Neutral**: Grises - Textos y fondos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**fipestar** - [GitHub](https://github.com/fipestar)
