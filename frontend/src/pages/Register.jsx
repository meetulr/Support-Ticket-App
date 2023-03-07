import { useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/user/userContext";
import Spinner from "../components/Spinner";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    const { setUser } = useContext(UserContext);

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

        if (password !== password2) {
            toast.error("Passwords don't match");
        }
        else {
            const userData = {
                name,
                email,
                password
            }

            try {
                const res = await axios.post("/api/users", userData);
                setUser(res.data);
                navigate("/");

            } catch (error) {
                const message = error.response.data.message;
                toast.error(message);
            }
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>

                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id="password2"
                            placeholder="Confirm password"
                            value={password2}
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

export default Register