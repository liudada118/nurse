const defauleState = {}
export const reducer = (state =defauleState , action) => {
    switch (action.type){
        case 'change' : 
        return action.payload;
    default : 
        return state
    }
}