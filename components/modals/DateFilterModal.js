import { useState } from "react";

function DateFilter({ onFilterChange }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterType, setFilterType] = useState('');

    const handleFilterTypeChange = (type) => {
        setFilterType(type);

        setStartDate('');
        setEndDate('');

        const now = new Date();

        if (type === 'month') {
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            setStartDate(formatDate(firstDay));
            setEndDate(formatDate(lastDay));
            onFilterChange(firstDay, lastDay);
        }

        else if (type === 'year') {
            const firstDay = new Date(now.getFullYear(), 0, 1);
            const lastDay = new Date(now.getFullYear(), 11, 31);

            setStartDate(formatDate(firstDay));
            setEndDate(formatDate(lastDay));
            onFilterChange(firstDay, lastDay);
        }
    };

    const handleDateChange = (isStart, value) => {
        if (isStart) {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    }

    const applyCustomFilter = () => {
        if (startDate && endDate) {
            onFilterChange(new Date(startDate), new Date(endDate));
        }
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    return (
        <div className="my-4 p-4 bg-slate-800 rounded-xl">
            <h3 className="text-xl mb-4">Filtrar por fecha:</h3>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => handleFilterTypeChange('month')}
                    className={`btn ${filterType === 'month' ? 'btn-primary' : 'btn-primary-outline'}`}
                >
                    Este mes
                </button>
                <button
                    onClick={() => handleFilterTypeChange('year')}
                    className={`btn ${filterType === 'year' ? 'btn-primary' : 'btn-primary-outline'}`}
                >
                    Este año
                </button>
                <button
                    onClick={() => handleFilterTypeChange('custom')}
                    className={`btn ${filterType === 'custom' ? 'btn-primary' : 'btn-primary-outline'}`}
                >
                    Personalizado
                </button>
            </div>

            {filterType === 'custom' && (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-2">Desde:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => handleDateChange(true, e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2">Hasta:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => handleDateChange(false, e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <button
                        onClick={applyCustomFilter}
                        className="btn btn-primary"
                        disabled={!startDate || !endDate}
                    >
                        Aplicar filtro
                    </button>
                </div>
            )}
        </div>
    )
}

export default DateFilter;