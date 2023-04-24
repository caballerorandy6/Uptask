import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Pencil from "../components/Pencil";
import Plus from "../components/Plus";
import ModalFormularioTarea from "../components/ModalFormularioTarea";

const Proyecto = () => {
  const params = useParams();
  const { id } = params;

  const { obtenerProyecto, proyecto, cargando, handleModalTarea } =
    useProyectos();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre } = proyecto;

  if (cargando) return "Cargando..."; //Implementar un PULSE ver en documentacion en TailwindCSS

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-black text-4xl">{nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black font-bold cursor-pointer">
          <Pencil />
          <Link
            to={`/proyectos/editar/${params.id}`}
            className="uppercase fontbold"
          >
            Editar
          </Link>
        </div>
      </div>

      <button
        onClick={handleModalTarea}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
      >
        <Plus />
        Nueva Tarea
      </button>

      <ModalFormularioTarea />
    </>
  );
};

export default Proyecto;
