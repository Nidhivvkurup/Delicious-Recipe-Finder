const initialState = {
    cart: []
}

const updateCart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDTOCART':
            // Check if an item with the same ID exists in the cart
            const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);

            if (existingIndex !== -1) {
                // If an item with the same ID exists, remove it from the cart
                return {
                    ...state,
                    cart: state.cart.filter((item, index) => index !== existingIndex)
                };
            } else {
                // If the item is not found, add it to the cart
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                };
            }

        default:
            return state;
    }
}

//             const index = state.cart.findIndex(i => i.id === action.payload.id)
//             if (index >= 0) {
//                 state.cart[index].rating.count += 1
//                 return {


//                     ...state
//                 }
//             }
//             else {

//                 const rating = { ...action.payload.rating, count: 1 }

//                 return {


//                     ...state, cart: [...state.cart, { ...action.payload, rating }]
//                 }
//             }
//         case "REMOVEONE":
//             {
//                 const index = state.cart.findIndex(i => i.id === action.payload.id)
//                 if (index >= 0) {
//                     state.cart[index].rating.count -= 1
//                 }
//                 return {


//                     ...state
//                 }

//             }
//         case "REMOVE":
//             {
//                 state.cart = state.cart.filter(i => i.id !== action.payload.id)
//                 return {
//                     ...state
//                 }
//             }


//         default:
//             return state

//     }
// }
export default updateCart