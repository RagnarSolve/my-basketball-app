const API_HOST = "api-basketball-nba.p.rapidapi.com";
const API_KEY = "fb5b97e76cmsh38082f281eee200p1b934djsn5c328e81464b";

const fetchTransactionsByTeamAndYear = async (teamId, year) => {
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

        
        return allTransactions;
    } catch (error) {
        console.error(`Error fetching transactions for team ${teamId} in ${year}:`, error);
        return [];
    }
};

export const fetchTransactionByTeam = async (teamId) => {
    const transactions2025 = await fetchTransactionsByTeamAndYear(teamId, 2025);
    const transactions2024 = await fetchTransactionsByTeamAndYear(teamId, 2024);
    
    return { transactions2025, transactions2024 };
};