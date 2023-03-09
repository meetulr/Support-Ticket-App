import axios from "axios";

const API_URL = "/api/tickets/";

// get ticket notes
export const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + ticketId + "/notes", config);
    return res.data;
}

// create ticket note
export const addNote = async (ticketId, token, noteText) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    await axios.post(API_URL + ticketId + "/notes", {text: noteText}, config);
}