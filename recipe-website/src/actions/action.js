export const add = (product) => {
    return {
        type: "ADDTOCART",
        payload: product
    }
}

export default add