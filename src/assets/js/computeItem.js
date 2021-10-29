export function computeItem(dataf ,outf){
    let flag = 0
    let outFlag = 0
    let flagNum = 0
          let outNum = 0
    let sleep_Arr1 = []
    for (let i = 0; i < dataf.length; i++) {

        if (outf[i] == 0 && dataf[i] == 0) {
          sleep_Arr1.push({
            value: 3,
            num: 1,
            color: '#ffb500'
          })
          continue
        }
        if (dataf[i] != flag) {
          sleep_Arr1.push({
            value: flag,
            num: flagNum + 1,
            color: flag == 0 ? ' #4ec46d' : flag == 1 ? '#497dea' : flag == 2 ? '#344fff' : '#ffb500'
          })
          flag = dataf[i]
          flagNum = 0

        }

        else if (dataf[i] == flag && flag == 0) {
          if (outf[i] != outFlag) {
            sleep_Arr1.push({
              value: outFlag,
              num: outNum + 1,
              color: outFlag == 0 ? ' #4ec46d' : outFlag == 1 ? '#497dea' : outFlag == 2 ? '#344fff' : '#ffb500'
            })
            outFlag = outf[i] == 0 ? 3 : 0
            outNum = 0
          }
          outNum++
        } else if (dataf[i + 1] != 0 && dataf[i] == 0) {
          sleep_Arr1.push({
            value: outFlag,
            num: outNum + 1,
            color: outFlag == 0 ? ' #4ec46d' : outFlag == 1 ? '#497dea' : outFlag == 2 ? '#344fff' : '#ffb500'
          })
        }
        else {
          flagNum++
        }


        if (i == dataf.length - 1 && dataf[i] == flag) {
          sleep_Arr1.push({
            value: flag,
            num: flagNum + 1,
            color: flag == 0 ? ' #4ec46d' : flag == 1 ? '#497dea' : flag == 2 ? '#344fff' : '#ffb500'
          })
        }

        else if (i == dataf.length - 1 && dataf[i] == flag && flag == 0) {
          sleep_Arr1.push({
            value: 3,
            num: outNum + 1,
            color: flag == 0 ? ' #4ec46d' : flag == 1 ? '#497dea' : flag == 2 ? '#344fff' : '#ffb500'
          })
        }
        // oldFlag = flag
      }
    //   console.log(sleep_Arr1)
      return sleep_Arr1
}