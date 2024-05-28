import { useNavigate } from "react-router-dom";
import "../scss/Header.scss";

export const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
        <div className="header">
            <div>
                <div>LOGO</div>
                <div>JOBS</div>
            </div>
            <div>
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
        </>
    )
}
