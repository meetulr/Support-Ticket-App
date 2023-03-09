import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user/userContext";
import TicketContext from "../contexts/ticket/ticketContext";
import NoteContext from "../contexts/note/noteContext";
import { getTicket, closeTicket } from "../contexts/ticket/ticketService";
import { addNote, getNotes } from "../contexts/note/noteService";
import Spinner from "../components/Spinner";
import BackButon from "../components/BackButon";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";


const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'
    },
};

Modal.setAppElement("#root");


function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");

    const { user } = useContext(UserContext);
    const { ticket, isLoading, dispatch } = useContext(TicketContext);
    const { notes, isLoading: notesIsLoading, dispatch: notesDispatch } = useContext(NoteContext);


    const params = useParams();
    const navigate = useNavigate();

    const { ticketId } = params;
    const { token } = user

    useEffect(() => {
        fetchTicketAndNotes();
        // eslint-disable-next-line
    }, []);

    const fetchTicketAndNotes = async () => {
        dispatch({
            type: "SET_LOADING"
        })
        notesDispatch({
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

        try {
            const data = await getNotes(ticketId, token);
            notesDispatch({
                type: "GET_NOTES",
                payload: data
            })
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
            notesDispatch({
                type: "STOP_LOADING"
            })
        }
    }

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

    // open / close Modal
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    // create note submit
    const onNoteSubmit = async (e) => {
        e.preventDefault();

        if (noteText === "") {
            toast.error("Please enter some text");
        }
        else {
            notesDispatch({
                type: "SET_LOADING"
            })

            try {
                await addNote(ticketId, token, noteText);
                await fetchTicketAndNotes();
            } catch (error) {
                const message = error.response.data.message;
                toast.error(message);
            }

            setNoteText("");
            closeModal();
        }
    }

    if (isLoading || notesIsLoading) {
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

                <h2>Notes</h2>
            </header>

            {ticket.status !== "closed" && (
                <button className="btn" onClick={openModal}>
                    <FaPlus /> Add Note
                </button>
            )}

            <Modal isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>

                <button className="btn-close" onClick={closeModal}>X</button>

                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="Note Text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {notes.map(note => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== "closed" && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket;