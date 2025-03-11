import { useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";

import { currencyFormatter } from "@/lib/utils";
import Modal from "../Modal";

import { FaRegTrashAlt } from "react-icons/fa";

import { toast } from "react-toastify";

function ViewExpenseModal({ show, onClose, expense }) {
    const { deleteExpenseItem, deleteExpenseCategory } = useContext(financeContext);

    const deleteExpenseHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id)
            toast.success("Categoría eliminada con exito");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const deleteExpenseItemHandler = async (item) => {

        try {
            const updatedItems = expense.items.filter((i) => i.id !== item.id);

            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total - item.amount,
            }

            await deleteExpenseItem(updatedExpense, expense.id)
            toast.success("Item eliminado con exito");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }

    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between">
                <h2 className="text-4xl">{expense.title}</h2>
                <button onClick={deleteExpenseHandler} className="btn btn-danger">Borrar</button>
            </div>

            <div>
                <h3 className="my-4 text-2xl">Historial de egreso</h3>
                {expense.items.map((item) => {
                    return (
                        <div key={item.id} className="flex items-center justify-between">
                            <small>
                            {item.createdAt && item.createdAt.toMillis
                                ? new Date(item.createdAt.toMillis()).toISOString()
                                : item.createdAt
                                ? new Date(item.createdAt).toISOString()
                                : "Fecha no disponible"}
                            </small>
                            <p className="flex items-center gap-2">
                                {currencyFormatter(item.amount)}
                                <button onClick={() => {
                                    deleteExpenseItemHandler(item);
                                }}>
                                    <FaRegTrashAlt />
                                </button>
                            </p>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default ViewExpenseModal;