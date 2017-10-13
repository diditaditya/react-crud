const initialState = {
    list: [{
        id: 1,
        firstName: 'Dora',
        lastName: 'Emon',
        address: 'aiueo',
        phone: '1233456789',
    }, {
        id: 2,
        firstName: 'Nobita',
        lastName: 'Nobi',
        address: 'qwerty',
        phone: '987654321',
    }],
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
        case "TOGGLE_ADD":
            return {
                ...state,
                isAddOpen: !state.isAddOpen,
            }
        default:
            break;
    }
    return state;
}

export default reducer;