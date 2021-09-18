import { Link } from 'react-router-dom';

const Protocols = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Protocolos</h1>
            </div>
        </div>
    )
}

export default Protocols