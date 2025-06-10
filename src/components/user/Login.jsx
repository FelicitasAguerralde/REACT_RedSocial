import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../../helpers/Global";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  // Estado del formulario
  const { form, changed } = useForm({});

  const {setAuth} = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { password } = form;
    //console.log("Login data:", { email, password });

    // Validación de longitud de contraseña
    if (!password || password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    const userToLogin = form;

    try {
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogin),
      });

      const response = await request.json();
      //console.log("Respuesta del servidor:", response);

      if (response.status === "success") {
        // Guarda el token y el usuario en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success("¡Login exitoso!");

        // Redirección a /social

      } else {
        toast.error("Error al iniciar sesión. Verifica tus datos.");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Verifica tus datos.");
      console.error("Error en la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="content__header">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
        <form className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email" name="email">
              Email
            </label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password" name="password">
              Contraseña
            </label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input 
            type="submit" 
            value={loading ? "Cargando..." : "Logueate"} 
            className={`btn btn-success ${loading ? 'loading' : ''}`}
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
};
