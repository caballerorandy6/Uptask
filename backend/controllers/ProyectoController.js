import Proyecto from "../models/Proyecto.js";

//Obtener todos los proyectos de un usuario Proyectos
const obtenerProyectos = async (req, res) => {};

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
const obtenerProyecto = async (req, res) => {};

//Editar Proyecto
const editarProyecto = async (req, res) => {};

//Eliminar Proyecto
const eliminarProyecto = async (req, res) => {};

//Agregar Colaborador
const agregarColaborador = async (req, res) => {};

//Eliminar Colaborador
const eliminarColaborador = async (req, res) => {};

//Obtener Tareas
const obtenerTareas = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
