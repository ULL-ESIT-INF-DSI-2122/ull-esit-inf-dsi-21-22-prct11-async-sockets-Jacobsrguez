import {Document, Schema, model} from 'mongoose';

export interface AthleteInterface extends Document {
  nombre: string,
  apellido: string,
  nif: string,
  edad: number,
  deporte: 'ciclismo' | 'natacion' | 'atletismo' | 'futbol' | 'baloncesto',
  prueba: string,
  marca: number,
}

export interface AthleteAuxInterface {
  nombre: string,
  apellido: string,
  nif: string,
  edad: number,
  deporte: 'ciclismo' | 'natacion' | 'atletismo' | 'futbol' | 'baloncesto',
  prueba: string,
  marca: number,
}

const AthleteSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length == 0) {
        throw new Error('El nombre no puede estar vacío');
      }
    },
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length == 0) {
        throw new Error('El apellido no puede estar vacío');
      }
    },
  },
  nif: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length != 9) {
        throw new Error('El NIF debe tener 9 dígitos');
      }
    },
  },
  edad: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('La edad no puede ser negativa');
      } else if (!Number.isInteger(value)) {
        throw new Error('La edad debe ser un número entero');
      }
    },
  },
  deporte: {
    type: String,
    required: true,
    trim: true,
    enum: ['ciclismo', 'natacion', 'atletismo', 'futbol', 'baloncesto'],
    validate: (value: string) => {
      if (value.length == 0) {
        throw new Error('El deporte no puede estar vacío');
      } else if ((['ciclismo', 'natacion', 'atletismo', 'futbol', 'baloncesto'].includes(value) == false)) {
        throw new Error('El deporte no es válido');
      }
    },
  },
  prueba: {
    type: String,
    required: true,
    trim: true,
    validator: (value: string) => {
      if (value.length == 0) {
        throw new Error('La prueba no puede estar vacía');
      }
    },
  },
  marca: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('La marca no puede ser negativa');
      } else if (!Number.isInteger(value)) {
        throw new Error('La marca debe ser un número entero');
      }
    },
  },
});

export const Athlete = model<AthleteInterface>('Athlete', AthleteSchema);
