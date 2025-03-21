import { useContext, useState, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import Modal from "../Modal";
import { financeContext } from "@/lib/store/finance-context";
import { toast } from "react-toastify";

function AddExpensesModal({ show, onClose }) {
    const [ expenseAmount, setExpenseAmount ] = useState("");
    const [ selectedCategory, setSelectedCategory ] = useState(null);
    const [ showAddExpense, setShowAddExpense ] = useState(false);
    const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

    const titleRef = useRef()
    const colorRef = useRef()

    const addExpenseItemHandler = async () => {

        const expense = expenses.find(e => {
            return e.id === selectedCategory
        }) 

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: (expense.total || 0) + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4(),
                },
            ],
        };

        try {
            await addExpenseItem(selectedCategory, newExpense);

            console.log(newExpense);
            setExpenseAmount("");
            setSelectedCategory(null);
            onClose();
            toast.success("Egreso creado con exito");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }

    }

    const addCategoryHandler = async () => {
        const title = titleRef.current.value.trim();
        const color = colorRef.current.value;
        if (!title || !color) {
            alert("Por favor ingresa un nombre y un color para la categoría.");
            return;
        }
    
        try {
            await addCategory({ title, color, total: 0 });
            setShowAddExpense(false);
            toast.success("Categoria creada con exito");
            titleRef.current.value = "";
            colorRef.current.value = "";
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    
    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex flex-col gap-4">    
                <label className="text-xl">Ingresa una cantidad</label>
                <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    placeholder="ej. 100.00"
                    value={expenseAmount}
                    onChange={(e) => {
                        setExpenseAmount(e.target.value)
                    }}
                    
                />
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl">Selecciona la categoría del egreso</h3>
                    <button
                        onClick={() => {
                            setShowAddExpense(true)
                        }}
                        className="text-lime-400">+ Nueva Categoría</button>
                </div>

                {showAddExpense && (
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        ref={titleRef}
                    />

                    <label>Elige un color</label>
                    <input
                        type="color"
                        className="w-24 h-10"
                        ref={colorRef}
                    />

                    <button onClick={addCategoryHandler} className="btn btn-primary-outline">Crear</button>
                    <button onClick={() => {
                        setShowAddExpense(false)
                    }} className="btn btn-danger">Cancelar</button>
                </div>
                )}
                {expenses.map((expense) => {
                    return (
                    <button 
                        key={expense.id}
                        onClick={() => {
                            setSelectedCategory(expense.id);
                    }}>
                        <div style={{
                            boxShadow: expense.id === selectedCategory ? "1px 1px 4px" : "none",
                        }}
                        className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                            <div className="flex items-center gap-2">
                                <div className="w-[25px] h-[25px] rounded-full"
                                style={{
                                    backgroundColor: expense.color,
                                }}
                                />
                                <h4 className="capitalize">{expense.title}</h4>
                            </div>
                        </div>
                    </button>
                    );
                })}
            </div>

            
            {expenseAmount > 0 && selectedCategory && (
                <div className="mt-6">
                    <button
                    className="btn btn-primary"
                    onClick={addExpenseItemHandler}>
                        Añadir gasto
                    </button>
                </div>
            )}
        </Modal>
    );
}

export default AddExpensesModal;