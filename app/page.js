"use client";

import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import AddIncomeModal from '@/components/modals/AddIncomeModal';
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";
import DateFilter from "@/components/modals/DateFilterModal";
import Head from "./head";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0)
  
  const [isFiltered, setIsFiltered] = useState(false);

  const { 
    expenses,
    income,
    filteredExpenses,
    filteredIncome,
    filterByDate,
    dateRange 
  } = useContext(financeContext);
  const { user, loading } = useContext(authContext);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleDateFilterChange = (startDate, endDate) => {
    filterByDate(startDate, endDate);
    setIsFiltered(true);
  }

  const clearFilter = () => {
    setIsFiltered(false);
  }

  useEffect(() => {
    const expensesToUse = isFiltered ? filteredExpenses : expenses;
    const incomeToUse = isFiltered ? filteredIncome : income;

    const incomeTotal = incomeToUse.reduce((total, e) => {
      return total + (e.amount || 0);
    }, 0);

    const expensesTotal = expensesToUse.reduce((total, e) => {
      return total + (isFiltered && e.filteredTotal !== undefined ? e.filteredTotal : e.total || 0);
    }, 0);

    setBalance(incomeTotal - expensesTotal);
  }, [expenses, income, filteredExpenses, filteredIncome, isFiltered]);

  if(!user) {
    return <SignIn/>
  }

  const chartData = {
    labels: expenses.map(expense => expense.title),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(expense => expense.total),
        backgroundColor: expenses.map(expense => expense.color),
        borderColor: ['black'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStule: 'circle'
        },
      },
    },
  };

  return (
  <>

    <Head>
      <title>Mi Aplicación de Finanzas</title>
      <meta name="description" content="Gestiona tus ingresos y egresos de forma eficiente." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <AddIncomeModal
      show={showAddIncomeModal}
      onClose={setShowAddIncomeModal}
    />

    <AddExpensesModal 
      show={showAddExpenseModal}
      onClose={setShowAddExpenseModal}
    />

    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-gray-400 text-md">
          {isFiltered
          ? `Balance entre (${
                new Date(dateRange.start)
                .toLocaleDateString(
                    undefined,
                    { timeZone: userTimeZone})
            } - ${
              dateRange.end
              .toLocaleDateString(
                  undefined,
                  { timeZone: userTimeZone})})`
          : "Mi Balance"
          }
        </small>
        <h2 className="text-4xl font-bold">{ currencyFormatter(balance) }</h2>
      </section>
      
      <section>
        <DateFilter onFilterChange={handleDateFilterChange}/>
        {isFiltered && (
          <div className="flex justify-end mt-2">
            <button onClick={clearFilter} className="text-sm text-gray-400 hover:text-white">Limpiar Filtro</button>
          </div>
        )}
      </section>

      <section className="flex items-center gap-2 py-3">
        <button onClick={() => {
          setShowAddExpenseModal(true);
        }}
        className="btn-xl btn-primary">+ Egreso</button>
        <button onClick={() => { setShowAddIncomeModal(true) }} className="btn-xl btn-primary-outline">+ Ingreso</button>
      </section>

      {/* Expenses */}
      <section className='py-6'>
        <h3 className='text-2xl'>Mis Gastos</h3>
        <div className='flex flex-col gap-4 mt-6'>
          {(expenses).map((expense) => {
            return (
              <ExpenseCategoryItem
                key={expense.id}
                expense={expense}
              />
            );
          })}
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-6">
        <a id="stats" />
          <h3 className="text-2xl">Estadisticas</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
      </section>
    </main>
    </>
    );
}
