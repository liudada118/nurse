export function computeData1(data,data1,data2,data3,data4){
    let twoData = new Array(5)
          if(data/60 >= 8 && data/60<=9){
            twoData[0] = 10
          }else if(data/60 > 9){
            twoData[0] = 8
          }else if(data/60 <= 5){
            twoData[0] = 2
          }else if(data/60 <= 6){
            twoData[0] = 4
          }else if(data/60 <= 7){
            twoData[0] = 6
          }else if(data/60 <= 8){
            twoData[0] = 8
          }

          if(data1 == 0){
            twoData[1] = 10
          }else if(data1 == 1){
            twoData[1] = 8
          }else if(data1 >=2){
            twoData[1] = 6
          }

          if(data2 == 0){
            twoData[2] = 10
          }else if(data2 == 1){
            twoData[2] = 8
          }else if(data2 >=2){
            twoData[2] = 6
          }

          if(data3 >= 0.25){
            twoData[3] = 10
          }else if(data3 >= 0.2){
            twoData[3] = 8
          }else if(data3 >= 0.15){
            twoData[3] = 6
          }else if(data3 >= 0.1){
            twoData[3] = 4
          }else{
            twoData[3] = 2
          }
          
          if(data4 == 22){
            twoData[4] = 10
          }else  if(data4 == 23){
            twoData[4] = 8
          }else  if(data4 == 0){
            twoData[4] = 6
          }else  if(data4 == 1){
            twoData[4] = 4
          }else  if(data4 >= 2 &&data4 <= 6){
            twoData[4] = 2
          }else if(data4 > 20 && data4 < 22){
            twoData[4] = 6
          }else{
            twoData[4] = 2
          }

          return twoData
}

