import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

const Proyecto = () => {
  const params = useParams();
  const { id } = params;

  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  const { nombre } = proyecto;

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  return cargando ? (
    "Mostrar aqui un PULSE, BUSCARLO EN TAILWIND..."
  ) : (
    <div>
      <h1 className="font-black text-4xl">{nombre}</h1>
    </div>
  );
};

export default Proyecto;
