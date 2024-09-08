import { Link } from "react-router-dom"
import { GiBalloonDog } from "react-icons/gi"


function Footer() {
    return (
        <footer className="bg-black text-white py-6 flex flex-col items-center">
            <div className="mb-4">
                <Link className="flex items-center px-2 py-0.5 " to="/">
                    <GiBalloonDog size={30} />
                </Link>      </div>
            <div className="mb-2 text-sm italic">
                <p>© SweetSpots by Simona</p>
            </div>
        </footer>
    )
}

export default Footer