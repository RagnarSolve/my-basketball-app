import { useEffect, useState } from "react";
import { fetchTransactionByTeam } from "../api/nbaTransactionApi";

const teams = [
  { id: 1, name: "Atlanta Hawks" },
  { id: 2, name: "Boston Celtics" },
  { id: 4, name: "Brooklyn Nets" },
  { id: 5, name: "Charlotte Hornets" },
  { id: 6, name: "Chicago Bulls" },
  { id: 7, name: "Cleveland Cavaliers" },
  { id: 8, name: "Dallas Mavericks" },
  { id: 9, name: "Denver Nuggets" },
  { id: 10, name: "Detroit Pistons" },
  { id: 11, name: "Golden State Warriors" },
  { id: 14, name: "Houston Rockets" },
  { id: 15, name: "Indiana Pacers" },
  { id: 16, name: "LA Clippers" },
  { id: 17, name: "Los Angeles Lakers" },
  { id: 19, name: "Memphis Grizzlies" },
  { id: 20, name: "Miami Heat" },
  { id: 21, name: "Milwaukee Bucks" },
  { id: 22, name: "Minnesota Timberwolves" },
  { id: 23, name: "New Orleans Pelicans" },
  { id: 24, name: "New York Knicks" },
  { id: 25, name: "Oklahoma City Thunder" },
  { id: 26, name: "Orlando Magic" },
  { id: 27, name: "Philadelphia 76ers" },
  { id: 28, name: "Phoenix Suns" },
  { id: 29, name: "Portland Trail Blazers" },
  { id: 30, name: "Sacramento Kings" },
  { id: 31, name: "San Antonio Spurs" },
  { id: 32, name: "Toronto Raptors" },
  { id: 33, name: "Utah Jazz" },
  { id: 34, name: "Washington Wizards" }
];

const TransactionPage = () => {
    const [selectedTeam, setSelectedTeam] = useState(1);
    const [transactions2025, setTransactions2025] = useState([]);
    const [transactions2024, setTransactions2024] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTransactions = async () => {
            setLoading(true);
            setError(null);

            try {
                const { transactions2025, transactions2024 } = await fetchTransactionByTeam(selectedTeam);
                
                setTransactions2025(transactions2025);
                setTransactions2024(transactions2024);
            } catch (err) {
                setError("Failed to load transactions.");
                console.error("Error fetching transactions:", err);
            } finally {
                setLoading(false);
            }
        };

        getTransactions();
    }, [selectedTeam]);

    return (
        <div className="transaction-container">
            <h1>Transactions History</h1>
            <p>Select a team to view transaction history.</p>

            <label>Team: </label>
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(Number(e.target.value))}>
                {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.name}
                    </option>
                ))}
            </select>

            {loading && <p className="loading-message">Loading transactions...</p>}

            {error && <p className="error-message">{error}</p>}

            <h3>2025</h3>
            {transactions2025.length > 0 ? (
                transactions2025.map((trade, index) => (
                    <div className="transaction-item" key={index}>
                        <strong>{new Date(trade.date).toDateString()}</strong>: {trade.description}
                    </div>
                ))
            ) : (
                !loading && <p className="no-data">No trades found for this team in 2025.</p>
            )}

            <h3>2024</h3>
            {transactions2024.length > 0 ? (
                transactions2024.map((trade, index) => (
                    <div className="transaction-item" key={index}>
                        <strong>{new Date(trade.date).toDateString()}</strong>: {trade.description}
                    </div>
                ))
            ) : (
                !loading && <p className="no-data">No trades found for this team in 2024.</p>
            )}
        </div>
    );
};

export default TransactionPage;
