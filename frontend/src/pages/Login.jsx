import { useState, useContext } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import UserContext from "../contexts/user/userContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const { loading, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prevState) => (
            {
                ...prevState,
                [e.target.id]: e.target.value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        try {
            dispatch({
                type: "SET_LOADING"
            });

            const res = await axios.post("/api/users/login", userData);

            dispatch({
                type: "SET_USER",
                payload: res.data
            });

            navigate("/");

        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>

                <p>Please login to get support</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-block">Submit</button>
                </form>
            </section>
        </>
    )
}

export default Login