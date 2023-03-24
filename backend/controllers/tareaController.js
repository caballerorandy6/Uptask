import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

//Agregar Tarea
const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  //Comprobando que el proyecto donde se va a crear la tarea existe
  if (!existeProyecto) {
    const error = new Error("El proyecto no existe!");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobando que la persona que esta creando la tarea es quien creo el proyecto
  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para añadir tareas!");
    return res.status(404).json({ msg: error.message });
  }

  const tarea = new Tarea(req.body);

  //Almacenando Tarea
  try {
    const tareaAlmacenada = await tarea.save();
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

//Obtener Tarea
const obtenerTarea = async (req, res) => {};

//Actualizar Tarea
const actualizarTarea = async (req, res) => {};

//Eliminar Tarea
const eliminarTarea = async (req, res) => {};

//Cambiar Estado Tarea
const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
