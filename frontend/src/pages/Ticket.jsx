import { useContext, useEffect } from "react";
import UserContext from "../contexts/user/userContext";
import TicketContext from "../contexts/ticket/ticketContext";
import { getTicket, closeTicket } from "../contexts/ticket/ticketService";
import Spinner from "../components/Spinner";
import BackButon from "../components/BackButon";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Ticket() {
    const { user } = useContext(UserContext);
    const { ticket, isLoading, dispatch } = useContext(TicketContext);

    const params = useParams();
    const navigate = useNavigate();

    const { ticketId } = params;
    const { token } = user

    useEffect(() => {
        const fetchTicket = async () => {
            dispatch({
                type: "SET_LOADING"
            })

            try {
                const data = await getTicket(ticketId, token);
                dispatch({
                    type: "GET_TICKET",
                    payload: data
                })
            } catch (error) {
                const message = error.response.data.message;
                toast.error(message);
                dispatch({
                    type: "STOP_LOADING"
                })
            }
        }

        fetchTicket();
        // eslint-disable-next-line
    }, []);

    const onTicketClose = async () => {
        dispatch({
            type: "SET_LOADING"
        })

        try {
            const data = await closeTicket(ticketId, token);
            dispatch({
                type: "GET_TICKET",
                payload: data
            })
            toast.success("Ticket closed");
            navigate("/tickets");
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
            dispatch({
                type: "STOP_LOADING"
            })
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButon url="/tickets" />

                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>

                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}</h3>

                <h3>Product: {ticket.product}</h3>

                <hr />

                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            {ticket.status !== "closed" && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket;