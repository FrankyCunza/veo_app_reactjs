const Login = () => {
    return (
        <div className="w-full text-center mx-auto bg-blue-500 h-screen">
            <div>
                <h1 className="text-4xl font-semibold py-8 text-white">Iniciar sesión</h1>
            </div>
            <form action="#" className="max-w-2xl bg-white shadow rounded p-8 mx-auto">
                <div className="text-left">
                    <label htmlFor="" className="text-xl font-medium block">Usuario</label>
                    <input type="text" className="h-12 w-full rounded mt-2 pl-4 bg-gray-200" />
                </div>

                <div className="text-left mt-4">
                    <label htmlFor="" className="text-xl font-medium block">Contraseña</label>
                    <input type="text" className="h-12 w-full rounded mt-2 pl-4 bg-gray-200" />
                </div>

                <div className="text-left mt-4 flex justify-center w-full">
                    <button type="submit" className="px-10 w-full bg-blue-600 rounded text-white py-3 text-lg">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Login