import { createStore } from 'redux'
import { reducer } from './reduce'
const store = createStore(reducer)
const ws = new WebSocket('ws://sensor.bodyta.com:8888/insure/12')
ws.onopen = () => {
    console.log('open')
}
ws.onmessage = (e) => {
    let allData = JSON.parse(e.data)
    
    store.dispatch({ type: 'change', payload: allData })
    // console.log(store.getState(),'allData')
}
export default store