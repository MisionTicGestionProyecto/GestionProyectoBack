//siempre para importar de mongo se debe tener modelo y esquema
import mongoose from 'mongoose';


const { Schema, model} = mongoose;

//Definir esquema, representación en codigo de lo que se define en los cuadros, definirse si es requerido si es unico y si es numerador
const userSchema = new Schema ({//el user garantiza que todos tengan el mismo tema que interface
    correo: {
        type: String,
        required: true,
        unique: true,
        validate: {
         validator: (email) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);//que cumpla con las condiciones
         },
         message: 'El formato del correo electrónico es incorrecto.',
        },
    },
    password: {
        type: String,
        required: true,

    },
    identificacion: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
    },
    estado: {
        type: String,
        required: true,
        enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
        default: 'PENDIENTE', //por defecto debe aparecer en estado pendiente
    },
    },
{ 
    toJSON: { virtuals: true },
    toObject: { virtuals: true},
}
);

userSchema.virtual('inscripciones',{
    ref:'Inscripcion', 
    localField: '_id',
    foreignField: 'estudiante',
});

userSchema.virtual('proyectosLiderados',{
    ref:'Proyecto', 
    localField: '_id',
    foreignField: 'lider',
});

userSchema.virtual('avancesCreados',{
    ref:'Avance', 
    localField: '_id',
    foreignField: 'creadoPor',
});
//creacion del modelo
const UserModel = model('User', userSchema, "Colección Usuarios");

export {UserModel};