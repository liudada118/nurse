export const err = [60, 60, 60, 60, 60, 60, 60, 60]
// export const initialArr = [435, 487, 481, 527, 504, 382, 457, 608]

export const dataArr = new Array(8)
export const dataArr1 = new Array(8)
// let err = 150
let initial = 0
export const initialArr = new Array(8)
export const stableArr = new Array(8)
let wsdata = []
let flag = 0
let oldArr = 0
let allInitialArr = []
export const maxArr = []
let allArr = []
export const nowdataarr = []
let allnowArr = []
let minFlag = new Array(8).fill(0) 
let min1Flag = new Array(8).fill(0)
let maxFlag = new Array(8).fill(0) 
const minArrArr = new Array(8)
const maxArrArr = new Array(8)
const minArrArr1 = new Array(8)
const maxArrArr1 = new Array(8)
for (let i = 0; i < 8; i++) {
  
  maxArrArr[i] = []
  minArrArr[i] = []
  maxArrArr1[i] = []
  minArrArr1[i] = []
  // newsmooth[i] = []
  // stold[i] = []
}
export let number

// export function small(data){
//     initial++
//       if (initial == 1) {
//         for (let i = 0; i < 8; i++) {
//           initialArr[i] = (data[i * 4] + 255 * data[i * 4 + 1])
//         }
//         for (let i = 0; i < 8; i++) {
//           maxArr[i] = data[i * 4] + 255 * data[i * 4 + 1] + 30

//         }
//       }
//       // console.log()
//       for (let i = 0; i < 8; i++) {

       
//     dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
//     nowdataarr[i] = (dataArr[i] - initialArr[i]) / (maxArr[i] - initialArr[i])
//     if (dataArr[i] < initialArr[i]) {
//       // if (initialArr[i] < dataArr[i] + 80) {
//       //   min1Flag[i]++
//       //   if (min1Flag[i] / 5 == 1) {
//       //     initialArr[i] = dataArr[i]
//       //   }
//       // }
//       if (minArrArr[i].length < 30) {
//         minArrArr[i].push(dataArr[i])
//       } else {
//         let minArrRes = minArrArr[i].sort((a, b) => a - b)
//         initialArr[i] = minArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         minArrArr[i] = []
//       }

//     }else {
//       minArrArr[i] = []
//     }


//     if (dataArr[i] > maxArr[i]) {
//        if (maxArrArr[i].length < 30) {
//         maxArrArr[i].push(dataArr[i])
//       } else {
//         let maxArrRes = maxArrArr[i].sort((a, b) => a - b)
//         maxArr[i] =  maxArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         maxArrArr[i] = []
//       }
//     }else{
//       maxArrArr[i] = []
//     }


//     // 第二版
//     if (nowdataarr[i] < 0.4 && nowdataarr[i] > 0.05) {

//       if (minArrArr1[i].length < 30) {
//         minArrArr1[i].push(dataArr[i])
//       } else {
//         let minArrRes = minArrArr1[i].sort((a, b) => a - b)
//         initialArr[i] = minArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         minArrArr1[i] = []
//       }
//     } else {
//       minArrArr1[i] = []
//     }

//     if (nowdataarr[i] > 0.6 && nowdataarr[i] < 0.8) {
//       if (maxArrArr1[i].length < 30) {
//         maxArrArr1[i].push(dataArr[i])
//       } else {
//         let maxArrRes = maxArrArr1[i].sort((a, b) => a - b)
//         maxArr[i] =  maxArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         maxArrArr1[i] = []
//       }
//     } else {
//       maxArrArr1[i] = []
//     } 



        
//         // dataArr1[i] = nowdataarr[i] > 0.55 ? 1 : 0
//         dataArr1[i] = dataArr[i] >  initialArr[i] + 30 ? 1 : 0
//         stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] // > nowdataarr[i] > 0.60  ? data[i * 4] + 255 * data[i * 4 + 1] : 0
//         // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
//       }
//       number = nowdataarr.filter((a,index) => a >0.5).length
//     //   return [dataArr1,dataArr]
// }

// export function small(data) {
//   initial++

//   if (initial == 1) {
//     initial = 2
//     // 赋值初始最小值
//     for (let i = 0; i < 8; i++) {
//       initialArr[i] = (data[i * 4] + 255 * data[i * 4 + 1])
//     }
//     // 赋值最大初始值
//     for (let i = 0; i < 8; i++) {
//       maxArr[i] = data[i * 4] + 255 * data[i * 4 + 1] + 30

//     }
//   }

//   for (let i = 0; i < 8; i++) {

//     dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
//     nowdataarr[i] = (dataArr[i] - initialArr[i]) / (maxArr[i] - initialArr[i])
//     if (dataArr[i] < initialArr[i]) {
//       // if (initialArr[i] < dataArr[i] + 80) {
//       //   min1Flag[i]++
//       //   if (min1Flag[i] / 5 == 1) {
//       //     initialArr[i] = dataArr[i]
//       //   }
//       // }
//       if (minArrArr[i].length < 30) {
//         minArrArr[i].push(dataArr[i])
//       } else {
//         let minArrRes = minArrArr[i].sort((a, b) => a - b)
//         initialArr[i] = minArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         minArrArr[i] = []
//       }

//     }else {
//       minArrArr[i] = []
//     }


//     if (dataArr[i] > maxArr[i]) {
//        if (maxArrArr[i].length < 30) {
//         maxArrArr[i].push(dataArr[i])
//       } else {
//         let maxArrRes = maxArrArr[i].sort((a, b) => a - b)
//         maxArr[i] =  maxArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         maxArrArr[i] = []
//       }
//     }else{
//       maxArrArr[i] = []
//     }


//     // 第二版
//     if (nowdataarr[i] < 0.4 && nowdataarr[i] > 0.05) {

//       if (minArrArr1[i].length < 30) {
//         minArrArr1[i].push(dataArr[i])
//       } else {
//         let minArrRes = minArrArr1[i].sort((a, b) => a - b)
//         initialArr[i] = minArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         minArrArr1[i] = []
//       }
//     } else {
//       minArrArr1[i] = []
//     }

//     if (nowdataarr[i] > 0.6 && nowdataarr[i] < 0.8) {
//       if (maxArrArr1[i].length < 30) {
//         maxArrArr1[i].push(dataArr[i])
//       } else {
//         let maxArrRes = maxArrArr1[i].sort((a, b) => a - b)
//         maxArr[i] =  maxArrRes.reduce((a, b, index) => {
//           if (index < 5 || index > 24) { return a + 0 } else {
//             return a + b
//           }
//         })/20
//         maxArrArr1[i] = []
//       }
//     } else {
//       maxArrArr1[i] = []
//     }





//     // dataArr1[i] = nowdataarr[i] > 0.55 ? 1 : 0
//     dataArr1[i] = dataArr[i] >  initialArr[i] + 30 ? 1 : 0
//     stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] //> nowdataarr[i] > 0.60 ? data[i * 4] + 255 * data[i * 4 + 1] : 0
//     // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
//   }
//   number = nowdataarr.filter((a, index) => a > 0.5).length
//   //   return [dataArr1,dataArr]
// }


export function small(data) {
  initial++

  if (initial == 1) {
    initial = 2
    // 赋值初始最小值
    for (let i = 0; i < 8; i++) {
      initialArr[i] = (data[i * 4] + 255 * data[i * 4 + 1])
    }
    // 赋值最大初始值
    for (let i = 0; i < 8; i++) {
      maxArr[i] = data[i * 4] + 255 * data[i * 4 + 1] + 30

    }
  }

  for (let i = 0; i < 8; i++) {

    dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
    nowdataarr[i] = (dataArr[i] - initialArr[i]) / (maxArr[i] - initialArr[i])
    if (dataArr[i] < initialArr[i]) {
      // if (initialArr[i] < dataArr[i] + 80) {
      //   min1Flag[i]++
      //   if (min1Flag[i] / 5 == 1) {
      //     initialArr[i] = dataArr[i]
      //   }
      // }
      if (minArrArr[i].length < 30) {
        minArrArr[i].push(dataArr[i])
      } else {
        let minArrRes = minArrArr[i].sort((a, b) => a - b)
        initialArr[i] = minArrRes.reduce((a, b, index) => {
          if (index < 5 || index > 24) { return a + 0 } else {
            return a + b
          }
        })/20
        minArrArr[i] = []
      }

    }else {
      minArrArr[i] = []
    }


    if (dataArr[i] > maxArr[i]) {
       if (maxArrArr[i].length < 30) {
        maxArrArr[i].push(dataArr[i])
      } else {
        let maxArrRes = maxArrArr[i].sort((a, b) => a - b)
        maxArr[i] =  maxArrRes.reduce((a, b, index) => {
          if (index < 5 || index > 24) { return a + 0 } else {
            return a + b
          }
        })/20
        maxArrArr[i] = []
      }
    }else{
      maxArrArr[i] = []
    }


    // 第二版
    if (nowdataarr[i] < 0.4 && nowdataarr[i] > 0.05) {

      if (minArrArr1[i].length < 30) {
        minArrArr1[i].push(dataArr[i])
      } else {
        let minArrRes = minArrArr1[i].sort((a, b) => a - b)
        initialArr[i] = minArrRes.reduce((a, b, index) => {
          if (index < 5 || index > 24) { return a + 0 } else {
            return a + b
          }
        })/20
        minArrArr1[i] = []
      }
    } else {
      minArrArr1[i] = []
    }

    if (nowdataarr[i] > 0.6 && nowdataarr[i] < 0.8) {
      if (maxArrArr1[i].length < 30) {
        maxArrArr1[i].push(dataArr[i])
      } else {
        let maxArrRes = maxArrArr1[i].sort((a, b) => a - b)
        maxArr[i] =  maxArrRes.reduce((a, b, index) => {
          if (index < 5 || index > 24) { return a + 0 } else {
            return a + b
          }
        })/20
        maxArrArr1[i] = []
      }
    } else {
      maxArrArr1[i] = []
    }





    dataArr1[i] = nowdataarr[i] > 0.50 ? 1 : 0
    // dataArr1[i] = dataArr[i]> initialArr[i] + 30 ? 1 : 0
    stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] //> nowdataarr[i] > 0.60 ? data[i * 4] + 255 * data[i * 4 + 1] : 0
    // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
  }
  number = nowdataarr.filter((a, index) => a > 0.5).length
  //   return [dataArr1,dataArr]
}




export function Data(arr) {
  if(arr.length == 1){
      return 0
  }
  let res = 0
  for (let i = 1; i < arr.length; i++) {
      res += (arr[i] - arr[i - 1]) * (arr[i] - arr[i - 1])
  }
  return res / (arr.length - 1)
}

// export function Data(arr){
//     if(arr.length == 1){
//         return 0
//     }
//     let res = 0
//     let avea = arr.reduce((a,b) => a+b , 0)/arr.length
//     for(let i = 1; i < arr.length; i++){
//         res = (arr[i] - avea) * (arr[i] - avea)
//     }
//     return res / arr.length
// }

export function sum(arr){
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue , 0)
}

const localurl = 'http://127.0.0.1:8080'
export const onwsurl = 'ws://127.0.0.1:9999'
// export const wsurl = ''
 const un = ''
export const lourl = localurl
