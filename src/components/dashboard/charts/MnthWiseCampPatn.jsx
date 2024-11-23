import React, { useState, useEffect } from 'react';
import './chart.css';
import MonthlyCampPatientChart from './MonthlyCampPatientChart';

function App() {
    const sampleData = [
        {
            month: 'August',
            camps: [
                { name: 'Camp A', patientCount: 120 },
                { name: 'Camp B', patientCount: 90 },
                { name: 'Camp C', patientCount: 90 },
            ],
        },
        {
            month: 'July',
            camps: [
                { name: 'Camp D', patientCount: 80 },
                { name: 'Camp E', patientCount: 70 },
            ],
        },
        {
            month: 'September',
            camps: [
                { name: 'Camp F', patientCount: 150 },
                { name: 'Camp G', patientCount: 100 },
                { name: 'Camp H', patientCount: 100 },
                { name: 'Camp I', patientCount: 100 },
            ],
        },
        {
            month: 'October',
            camps: [
                { name: 'Camp J', patientCount: 200 },
                { name: 'Camp K', patientCount: 150 },
            ],
        },
    ];

    const getCurrentMonth = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonthIndex = new Date().getMonth();
        return monthNames[currentMonthIndex];
    };

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const monthData = sampleData.find(item => item.month === selectedMonth);
        setFilteredData(monthData ? [monthData] : []);
    }, [selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div style={{ width: '470px', height: 'auto'}}>
            <div className="month-selector">
                <label>
                    Select Month:
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {sampleData.map(item => (
                            <option key={item.month} value={item.month}>{item.month}</option>
                        ))}
                    </select>
                </label>
            </div>
            {filteredData.length > 0 && <MonthlyCampPatientChart data={filteredData} />}

        </div>
    );
}

export default App;
