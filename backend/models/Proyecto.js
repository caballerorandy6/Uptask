import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
      //Relacionando el Creador con la tabla de Usuario
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", //El ref señala donde obtiene la referencia ObjectId
    },
    //Colaboradores es una arreglo de objetos ya que pueden existir varios
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
export default Proyecto;
