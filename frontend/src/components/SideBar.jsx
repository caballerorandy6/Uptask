import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SideBar = () => {
  const { auth } = useAuth();
  const { nombre } = auth;

  return (
    <aside className="md:w-8-0 lg:w-96 px-5 py-10">
      <p>Hola: {nombre} </p>

      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block my-5 text-center rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default SideBar;
