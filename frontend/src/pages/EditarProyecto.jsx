import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import FormularioProyecto from "../components/FormularioProyecto";
import Trash from "../components/Trash";

const EditarProyecto = () => {
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
    useProyectos();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  //Eliminar Proyecto
  const handleClick = () => {
    if (confirm("Desea eliminar este proyecto?")) {
      eliminarProyecto(id);
    }
  };

  const { nombre } = proyecto;

  if (cargando) return "Cargando..."; //Implementar un PULSE ver en documentacion en TailwindCSS

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-black text-4xl">{nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black font-bold cursor-pointer">
          <Trash />
          <button onClick={handleClick} className="uppercase fontbold">
            Eliminar
          </button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
