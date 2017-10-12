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
        case "CREATE":
            break;
        case "UPDATE":
            break;
        case "DELETE":
            break;
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