const tipMsg = (state = {text: '', show: false}, action) => {
    switch (action.type) {
        case 'SHOW_TIP':
            return Object.assign({}, {
                text: action.item.text,
                show: action.item.show
            });
        default:
            return state;
    }
}
const Hospital = (state = {}, action) => {
    switch (action.type) {
        case 'HOSPITAL':
            return Object.assign({}, action.item);
        default:
            return state;
    }
}
const Departments = (state = {}, action) => {
    switch (action.type) {
        case 'DEPARTMENTS':
            return Object.assign({}, action.item);
        default:
            return state;
    }
}




export {tipMsg, Hospital, Departments};