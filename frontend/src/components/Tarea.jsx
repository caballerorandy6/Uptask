import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-400">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">{prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleModalEditarTarea(tarea)}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Editar
        </button>

        {estado ? (
          <button className="bg-sky-600 hover:bg-sky-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 hover:bg-gray-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}

        <button
          onClick={() => handleModalEliminarTarea(tarea)}
          className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
