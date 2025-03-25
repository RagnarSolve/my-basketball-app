const API_HOST = "api-basketball-nba.p.rapidapi.com";
const API_KEY = "fb5b97e76cmsh38082f281eee200p1b934djsn5c328e81464b";

/**
 * fetchar spelarövergångar och kontraktsförnyelser m.m. för ett specifikt lag och år.
 * Datan sparas i localStorage efter första hämtningen och uppdateras inte automatiskt,
 * till skillnad från funktionerna i nbaApi.js och nbaNewsApi.js som uppdateras efter en viss tid.
 *
 * @param {number} teamId - id för laget
 * @param {number} year - årtalet för övergångarna
 * @returns {Promise<Array>} en promise som innehåller en lista med spelarövergångar
 */
const fetchTransactionsByTeamAndYear = async (teamId, year) => {
    const cacheKey = `transactions_${teamId}_${year}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        console.log(`Using stored transactions for team ${teamId} in ${year}`);
        return JSON.parse(cachedData);
    }

    const url = `https://${API_HOST}/team/transactions?teamId=${teamId}&year=${year}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST
            }
        });

        const data = await response.json();
        const transactions = data?.data?.transactions || {};
        const allTransactions = Object.keys(transactions).flatMap((month) => transactions[month]);

        localStorage.setItem(cacheKey, JSON.stringify(allTransactions));

        return allTransactions;
    } catch (error) {
        console.error(`Error fetching transactions for team ${teamId} in ${year}:`, error);
        return [];
    }
};

/**
 * fetchar spelarövergångar för både 2024 och 2025 för ett specifikt lag i nba.
 *
 * @param {number} teamId - id för laget.
 * @returns {Promise<Object>} en promise som innehållet ett object med två listor (transactions2024 och transactions2025).
 */
export const fetchTransactionByTeam = async (teamId) => {
    const transactions2025 = await fetchTransactionsByTeamAndYear(teamId, 2025);
    const transactions2024 = await fetchTransactionsByTeamAndYear(teamId, 2024);
    
    return { transactions2025, transactions2024 };
};