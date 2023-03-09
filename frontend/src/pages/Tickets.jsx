import { useContext, useEffect } from "react";
import UserContext from "../contexts/user/userContext";
import TicketContext from "../contexts/ticket/ticketContext";
import { getTickets } from "../contexts/ticket/ticketService";
import Spinner from "../components/Spinner";
import BackButon from "../components/BackButon";
import TicketItem from "../components/TicketItem";

function Tickets() {
    const { user } = useContext(UserContext);
    const { tickets, isLoading, dispatch } = useContext(TicketContext);

    useEffect(() => {
        const fetchTickets = async () => {
            dispatch({
                type: "SET_LOADING"
            })

            const data = await getTickets(user.token);

            dispatch({
                type: "GET_TICKETS",
                payload: data
            })
        }

        fetchTickets();
    }, [dispatch, user])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButon url="/" />
            <h1>Tickets</h1>

            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>

                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets