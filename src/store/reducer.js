const initialState = {
    list: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case "UPDATE":
            let index = null;
            state.list.map((contact, idx) => {
                if (String(contact.id) === String(action.payload.id)) {
                    index = idx;
                }
                return idx;
            });
            return {
                ...state,
                list: [
                    ...state.list.slice(0, index), 
                    action.payload, 
                    ...state.list.slice(index+1)
                ]
            }
        case "DELETE":
            let deleteIndex = null;
            state.list.map((contact, idx) => {
                if (String(contact.id) === String(action.payload)) {
                    deleteIndex = idx;
                }
                return idx;
            });
            return {
                ...state,
                list: [
                    ...state.list.slice(0, deleteIndex),
                    ...state.list.slice(deleteIndex +1)
                ]
            }
        default:
            break;
    }
    return state;
}

export default reducer;