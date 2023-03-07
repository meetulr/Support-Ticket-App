import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserContext from "../contexts/user/userContext";
import { useNavigate } from "react-router-dom";

function Header() {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const onLogout = () => {
        setUser(null);
        navigate("/");
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Support Desk</Link>
            </div>

            <ul>
                {user ? (
                    <>
                        <li>
                            <button className="btn" onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header;