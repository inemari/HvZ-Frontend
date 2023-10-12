import { fetchSquads, createSquad } from "./api";

export const getSquads = async () => {
    try {
        const squadsData = await fetchSquads();
        return squadsData;
    } catch (error) {
        throw error;
    }
}

export const createNewSquad = async (squadName) => {
    try {
        const newSquad = await createSquad(squadName);
        return newSquad;
    } catch (error) {
        throw error;
    }
}