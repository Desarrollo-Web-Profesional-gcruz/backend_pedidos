import { createUsuario, loginUsuario, getUsuarioInfoById, getAllUsuarios } from '../servicios/usuarios.js'
import { verificarToken } from '../middlewares/auth.js'

export function usuarioRoutes(app) {

  app.post('/api/v1/usuario/signup', async (req, res) => {
    try {
      const usuario = await createUsuario(req.body)
      return res.status(201).json({ username: usuario.username })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  })

  app.post('/api/v1/usuario/login', async (req, res) => {
    try {
      const token = await loginUsuario(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  })

  app.get('/api/v1/usuarios/:id', verificarToken, async (req, res) => {
    const userInfo = await getUsuarioInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })

  app.get('/api/v1/usuarios', verificarToken, async (req, res) => {
    try {
      const usuarios = await getAllUsuarios()
      return res.status(200).json(usuarios)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  })
}
