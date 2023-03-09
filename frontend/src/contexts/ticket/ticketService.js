import axios from "axios";

const API_URL = "/api/tickets/";

// create new ticket
export const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    await axios.post(API_URL, ticketData, config);
}

// get user ticket
export const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL, config);

    return res.data;
}

// get selected ticket
export const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + ticketId, config);
    return res.data;
}

// update selected ticket
export const closeTicket = async (ticketId, token) => { 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(API_URL + ticketId, {status: "closed"}, config);
    return res.data;
}

// delete selected ticket
export const deleteTicket = async () => { }