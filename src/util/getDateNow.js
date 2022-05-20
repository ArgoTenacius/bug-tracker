export const getDateNow = () => {
    const dateNow = new Date();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();
    const yearNow = dateNow.getFullYear();
    const cardDate = `${monthNow}/${dayNow}/${yearNow}`
    return cardDate;
}