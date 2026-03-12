// rutas/pedidos.js
import {
  creaPedido,
  listaPedidos,
  listaAllPedidos,
  listaPedidosByNombre,
  listPedidosByPagado,
  getPedidoById,
  modificaPedido,
  eliminaPedido
} from '../servicios/pedidos.js'
import { verificarToken } from '../middlewares/auth.js'

/**
 * Funcion que define las rutas para pedidos
 * @param {*} app
 */
export function pedidosRoutes(app) {
 
  // Listar Pedidos con filtros opcionales
  app.get('/api/v1/pedidos', verificarToken, async (req, res) => {
    const { sortBy, sortOrder, nombre, pagado } = req.query
    const opciones = { sortBy, sortOrder }
    const clienteId = req.user.sub // El ID del usuario está guardado en el sub del Token

    try {
      if (nombre && pagado) {
        return res
          .status(400)
          .json({ error: 'Consulta por nombre o status, No Ambos' })
      } else if (nombre) {
        return res.json(await listaPedidosByNombre(clienteId, nombre, opciones))
      } else if (pagado) {
        return res.json(await listPedidosByPagado(clienteId, pagado, opciones))
      } else {
        return res.json(await listaAllPedidos(clienteId, opciones))
      }
    } catch (err) {
      console.error('Error listando Pedidos', err)
      return res.status(500).end()
    }
  })


  // Obtener un Pedido por ID
  app.get('/api/v1/pedidos/:id', verificarToken, async (req, res) => {
    const { id } = req.params
    try {
      const pedido = await getPedidoById(id)
      if (pedido === null) return res.status(404).end()
      return res.json(pedido)
    } catch (err) {
      console.error('Error Obtiendo un Pedido', err)
      return res.status(500).end()
    }
  })


  // Crear un nuevo Pedido
  app.post('/api/v1/pedidos', verificarToken, async (req, res) => {
    try {
      const pedido = await creaPedido(req.body)
      return res.json(pedido)
    } catch (err) {
      console.error('Error creando un pedido', err)
      return res.status(500).end()
    }
  })


  // Modificar un Pedido existente
  app.patch('/api/v1/pedidos/:id', verificarToken, async (req, res) => {
    try {
      const pedido = await modificaPedido(req.params.id, req.body)
      return res.json(pedido)
    } catch (err) {
      console.error('Error modificando Pedido', err)
      return res.status(500).end()
    }
  })


  // Eliminar un Pedido por ID
  app.delete('/api/v1/pedidos/:id', verificarToken, async (req, res) => {
    try {
      const { deletedCount } = await eliminaPedido(req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('Error Eliminando un Pedido', err)
      return res.status(500).end()
    }
  })
}
