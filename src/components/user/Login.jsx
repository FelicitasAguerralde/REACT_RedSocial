import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";

export const Login = () => {

  // Estado del formulario
  const { form, changed } = useForm({});

  const loginUser = async (e) => {
    e.preventDefault();
    const { password } = form;
    //console.log("Login data:", { email, password });

    // Validación de longitud de contraseña
    if (!password || password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
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
      } else {
        toast.error("Error al iniciar sesión. Verifica tus datos.");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Verifica tus datos.");
      console.error("Error en la petición:", error);
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
          <input type="submit" value="Logueate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
