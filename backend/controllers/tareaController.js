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

  //Almacenando Tarea
  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

//Obtener Tarea
const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  //Utilizando el populate se obtiene toda la informacion de la tarea y del proyecto junta. Esto se hace pq cuando se obtiene una tarea no se puede ver quien fue el creador pero si el proyecto al que pertenece que a su ves contiene al creador.
  const tarea = await Tarea.findById(id).populate("proyecto"); //console.log(tarea);

  if (!tarea) {
    const error = new Error("Tarea no encontrada!");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida!");
    return res.status(403).json({ msg: error.message });
  }
  res.json(tarea);
};

//Actualizar Tarea
const actualizarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto"); //console.log(tarea);

  if (!tarea) {
    const error = new Error("Tarea no encontrada!");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida!");
    return res.status(403).json({ msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenada = await tarea.save();
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

//Eliminar Tarea
const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto"); //console.log(tarea);

  if (!tarea) {
    const error = new Error("Tarea no encontrada!");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida!");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await tarea.deleteOne();
    res.json({ msg: "Tarea Eliminada!" });
  } catch (error) {
    console.log(error);
  }
};

//Cambiar Estado Tarea
const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
