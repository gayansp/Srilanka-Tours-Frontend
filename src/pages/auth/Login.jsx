import api from '../../api/axios';

const Login = () => {

    

    const handleLogin = async (email, password)=>{
        try {
            const result = await api.post("auth/login",{
            email,
            password
        })

        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role);

        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
    }
  return (
    <div>
        <h1>Login</h1>
        <button onClick={() => handleLogin("nethminakasu585@gmail.com", "pissukat")}>login button</button>
        <button onClick={handleLogout}>Logout button</button>
    </div>
  )
}

export default Login