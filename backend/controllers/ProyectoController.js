import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

//Obtener todos los proyectos de un usuario Proyectos
const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find()
    .where("creador")
    .equals(req.usuario)
    .select("-tareas"); // Utilizando el .select("-tareas") estamos seleccionando todos los proyectos pero in la informacion de las tareas

  console.log(proyectos);
  res.json(proyectos);
};

//Crear nuevo Proyecto
const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  //console.log(proyecto);

  //El trycash se utiliza para intentar almacenar un proyecto
  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

//Obtener Proyecto
const obtenerProyecto = async (req, res) => {
  const { id } = req.params; //Accediendo al routing dinamico

  const proyecto = await Proyecto.findById(id).populate("tareas"); // Utilizamos el populate para obtener del objeto "tareas toda la informacion"
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado!");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar que la persona que esta intentando acceder al proyecto es su creador. Si no es esa persona no tiene el acceso permitido, hay que convertir los objetos a String para hacer esta comprobacion
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida o no tienes los permisos");
    return res.status(401).json({ msg: error.message });
  }

  res.json(proyecto);
};

//Editar Proyecto
const editarProyecto = async (req, res) => {
  const { id } = req.params; //Accediendo al routing dinamico

  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado!");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida o no tienes los permisos");
    return res.status(401).json({ msg: error.message });
  }

  //Esto quiere decir que si utilice el nombre que el usuario introdujo o si no que utilice el que ya se encuentra en la base de datos
  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

//Eliminar Proyecto
const eliminarProyecto = async (req, res) => {
  const { id } = req.params; //Accediendo al routing dinamico

  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado!");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida o no tienes los permisos");
    return res.status(401).json({ msg: error.message });
  }
  try {
    await proyecto.deleteOne();
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

//Agregar Colaborador
const agregarColaborador = async (req, res) => {};

//Eliminar Colaborador
const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
};
