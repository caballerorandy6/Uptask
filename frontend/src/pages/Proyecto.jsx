import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Pencil from "../components/Pencil";

const Proyecto = () => {
  const params = useParams();
  const { id } = params;

  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre } = proyecto;

  if (cargando) return "Cargando..."; //Implementar un PULSE ver en documentacion en TailwindCSS

  return (
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
  );
};

export default Proyecto;
