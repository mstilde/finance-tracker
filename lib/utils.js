export const currencyFormatter = (amount) => {
    const formatter = Intl.NumberFormat("es-AR", {
      currency: "ARS",
      style: "currency",
    });
  
    return formatter.format(amount);
  };