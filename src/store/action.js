const action = {
    add: (item) => {
        return {
            type: "ADD_CONTACT",
            payload: item,
        }
    },
    update: (item) => {
        return {
            type: "UPDATE",
            payload: item,
        }
    },
    delete: (itemId) => {
        return {
            type: "DELETE",
            payload: itemId,
        }
    },
}

export default action;
