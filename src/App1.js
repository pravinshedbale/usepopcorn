// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";
export default function App() {
    const [input, setInput] = useState();
    const [currentCurrency, setCurrentCurreny] = useState("USD");
    const [targetCurrency, setTargetCurrency] = useState("EUR");
    const [output, setOutput] = useState("");
    useEffect(() => {
        const callConvertAPI = async () => {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${input}&from=${currentCurrency}&to=${targetCurrency}`
            );
            const data = await res.json();
            setOutput(data.rates[targetCurrency]);
        };
        if (
            !input ||
            !currentCurrency ||
            !targetCurrency ||
            currentCurrency === targetCurrency
        )
            return;
        callConvertAPI();
    }, [input, currentCurrency, targetCurrency]);
    return (
        <div>
            <input
                type="number"
                onChange={(e) => setInput(e.target.value)}
                value={input}
            />
            <select
                onChange={(e) => {
                    setCurrentCurreny(e.target.value);
                }}
                value={currentCurrency}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select
                onChange={(e) => {
                    setTargetCurrency(e.target.value);
                }}
                value={targetCurrency}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>OUTPUT:{output}</p>
        </div>
    );
}
