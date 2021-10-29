const ws = new WebSocket('ws://sensor.bodyta.com:8888/insure/1');

let data
ws.onopen = () => {
    console.log('ws open')
}

ws.onmessage = (e) => {
    console.log(e)
    data = e
}

export const obj = { data : data }