import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import  swal  from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  // Función para la navegación entre páginas
  const navigate = useNavigate();
  const alerta = () => {
    swal.fire({
      title: "Error",
      text: "No se pudo crear la cuenta, intenta de nuevo",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    try {
      // Realiza la petición POST al servidor para iniciar sesión
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          password: password,
          nombre: nombre,
        }),
      });

      if (!response.ok) {
        // Lanza un error si la respuesta no es exitosa
        throw new Error(`Error en la petición: ${response.status}`);
      }

      // Parsea la respuesta a formato JSON
      const jsonData = await response.json();
      // Actualiza el estado con los datos recibidos

      // Navega a la página principal
      navigate("/", { state: { token: jsonData.token } });
      // Muestra en consola el token de acceso (puedes personalizar este manejo según tus necesidades)
      // console.log("Token de acceso:", jsonData.token);
    } catch (error) {
      // Captura cualquier error durante el proceso
      console.error("Error al realizar la petición:", error.message);
      alerta();
    }
  };

  return (
    <div>
      <h1 className="text-white flex items-center justify-center text-5xl m-20"></h1>
      <div className="py-16">
        <form>
          <div className="flex bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div
              className="hidden lg:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>
            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-700 text-center">
                Shopy shop
              </h2>
              <p className="text-xl text-gray-600 dark:text-slate-200 text-center">
                Bienvenido
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b dark:border-white w-1/5 lg:w-1/4"></span>
                <a
                  href="#"
                  className="text-xs text-center dark:text-white text-gray-500 uppercase"
                >
                  Registrate aqui
                </a>
                <span className="border-b dark:border-white w-1/5 lg:w-1/4"></span>
              </div>
              <div className="mt-4">
                <label className="block dark:text-white text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  className="bg-gray-200 dark:text-white dark:bg-slate-600 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block dark:text-white text-gray-700 text-sm font-bold mb-2">
                  Correo
                </label>
                <input
                  className="bg-gray-200 dark:text-white dark:bg-slate-600 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block dark:text-white text-gray-700 text-sm font-bold mb-2">
                    Contraseña
                  </label>
                </div>
                <input
                  className="bg-gray-200  dark:text-white dark:bg-slate-600 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <button onClick={handleSubmit} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Registrate
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b dark:border-white w-1/5 md:w-1/4"></span>
                <Link
                  to="/login"
                  className="text-xs dark:text-white text-gray-500 uppercase"
                >
                  Login
                </Link>
                <span className="border-b dark:border-white w-1/5 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Register };
