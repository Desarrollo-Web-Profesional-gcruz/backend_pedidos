import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization']
  
  if (!tokenHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' })
  }

  const token = tokenHeader.split(' ')[1] // Formato: "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token malformado.' })
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified // { sub: userId, iat, exp }
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' })
  }
}
