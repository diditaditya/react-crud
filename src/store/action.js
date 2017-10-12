import store from './configureStore';

const action = {
    add: (item) => {
        return {
            type: "CREATE",
            payload: item,
        }
    },
    getAll: () => {
        return store.getState()
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
    }
}

export default action;