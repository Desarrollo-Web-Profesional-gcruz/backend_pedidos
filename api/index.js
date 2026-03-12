import { app } from '../src/app.js'
import { initBaseDeDatos } from '../src/bd/init.js'

// Inicializar la base de datos antes de manejar las peticiones
initBaseDeDatos().catch(console.error)

export default app
