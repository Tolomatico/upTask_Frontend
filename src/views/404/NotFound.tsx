import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1 className="text-center text-4xl font-black text-white">Página No Encontrada</h1>
            <p
                className="mt-10 text-center font-bold  text-white">
                Tal vez quieras ir  a
                <Link to="/"
                    className="text-center text-2xl font-black text-fuchsia-500"> Proyectos
                </Link>
            </p>
        </>
    )
}
