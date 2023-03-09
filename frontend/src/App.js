import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./contexts/user/userContext";
import { TicketProvider } from "./contexts/ticket/ticketContext";
import { NoteProvider } from "./contexts/note/noteContext";
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

function App() {
    return (
        <>
            <UserProvider>
                <TicketProvider>
                    <NoteProvider>
                        <Router>
                            <div className="container">
                                <Header />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/new-ticket" element={<PrivateRoute />} >
                                        <Route path="/new-ticket" element={<NewTicket />} />
                                    </Route>
                                    <Route path="/tickets" element={<PrivateRoute />} >
                                        <Route path="/tickets" element={<Tickets />} />
                                    </Route>
                                    <Route path="/ticket/:ticketId" element={<PrivateRoute />} >
                                        <Route path="/ticket/:ticketId" element={<Ticket />} />
                                    </Route>
                                </Routes>
                            </div>
                        </Router>

                        <ToastContainer />
                    </NoteProvider>
                </TicketProvider>
            </UserProvider>
        </>
    );
}

export default App;
