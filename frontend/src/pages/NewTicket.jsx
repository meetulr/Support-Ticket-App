import { useState, useContext } from "react";
import UserContext from "../contexts/user/userContext";
import TicketContext from "../contexts/ticket/ticketContext";
import { createTicket } from "../contexts/ticket/ticketService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButon from "../components/BackButon";

function NewTicket() {
    const { user } = useContext(UserContext);
    const { isloading, dispatch } = useContext(TicketContext);

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState("iPhone");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const onsubmit = async (e) => {
        e.preventDefault();

        const ticketData = {
            name,
            email,
            product,
            description,
            status: "new"
        }

        dispatch({
            type: "SET_LOADING"
        })

        try {
            await createTicket(ticketData, user.token);
            toast.success("Successfully created a new ticket");
            navigate("/");
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }

        dispatch({
            type: "STOP_LOADING"
        })
    }

    if (isloading) {
        return <Spinner />
    }

    return (
        <>
            <BackButon url="/" />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input className="form-control" type="text" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Email</label>
                    <input className="form-control" type="email" value={email} disabled />
                </div>

                <form onSubmit={onsubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}>
                            <option value="iPhone">iPhone</option>
                            <option value="iPad">iPad</option>
                            <option value="iMac">iMac</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea name="desription"
                            id="desription"
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket