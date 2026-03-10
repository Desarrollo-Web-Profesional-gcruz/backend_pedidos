import 'dotenv/config'
import { initBaseDeDatos } from './bd/init.js'
import { Pedido } from './bd/modelos/pedido.js'

await initBaseDeDatos()

// Crear y guardar el pedido
const pedido = new Pedido({
    nombre: 'Juan Gabriel Lopez',
    telefono: '4181231234',
    direccion: 'Calle Tamaulipas, Colonia Centro Casa Guinda', // ← requerido
    fecha_solicitud: new Date('2026-02-07'), // ← formato ISO: YYYY-MM-DD
    fecha_envio: new Date('2026-02-09'),     // ← formato ISO: YYYY-MM-DD
    total: 45.00,
    pagado: ['PAGADO'],
    comentario: 'Ha sido pagado el pedido',
})

const createdPedido = await pedido.save() // ← solo una vez

// Actualizar el nombre del cliente
await Pedido.findByIdAndUpdate(createdPedido._id, {
    $set: { nombre: 'Juan Gabriel Lopez Beltran' },
})

// Consultar y mostrar todos los pedidos
const pedidos = await Pedido.find()
console.log(pedidos)

process.exit(0) // ← cierra la conexión al terminar
