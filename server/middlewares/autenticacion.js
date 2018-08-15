// =======================
// verificar token ========
// ========
const jwt = require('jsonwebtoken');

let verificaToken = (req,res,next) =>{
    let token = req.get('token'); //header
    jwt.verify(token,process.env.SEED,(err,decoded) => {
        if (err) {
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    });
};

// ================
// Verifica Admin Rol
// ================
let verificaAdminRole = (req,res,next) =>{
    let usuario = req.usuario
        if (usuario.role === 'ADMIN_ROLE') {
            next();
        }else{
            return res.json({
                ok: false,
                err: {
                    message: 'El usuario no es administrador'
                }
            })
        }

};

module.exports = {
    verificaToken,
    verificaAdminRole
}