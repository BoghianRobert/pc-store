export const totalPrice = (cart = []) => {
    let total = 0;
    for(let i=0;i<cart?.length;i++) {
        total = total + cart[i].price;
    }
    return(total)
};

export const gettotalTaxa = (cart = []) => {
    let total = 5.99;
    for(let i=0;i<cart?.length;i++) {
        total = total + cart[i].price;
    }
    return(total)
};