const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema,
    rolesValidos = {
        values: ['ADMIN_ROLE','USER_ROLE'],
        message: '{VALUE} no es un rol valido'
    };

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombres es necesario']
    },
    email: {
        type: String,
        unique:true,
        required:[true,'El correo es necesario']
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    img: {
        type:String,
        required:false
    },
    role: {
        type:String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:false
    }
});

usuarioSchema.methods.toJSON =  function(){
    let user = this,
        userObj = user.toObject();
    delete userObj.password;
    return userObj;
}

usuarioSchema.plugin(uniqueValidator,{ message:'{PATH} debe de ser unico' });

module.exports = mongoose.model('Usuario',usuarioSchema);