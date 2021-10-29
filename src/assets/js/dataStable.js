export class stick {
    arr = []
    dataStable(num) {
        // let arr = []
        let dataNum = []
        if (this.arr.length < 10) {
            this.arr.push(num)
        } else {
            this.arr.push(num)
            this.arr.shift()
        }
        let dataArr = Array.from(new Set(this.arr))
        dataArr.forEach((data, index) => {
            let num = this.arr.reduce((acc, cur) => {
                if (cur === data) {
                    return acc + 1
                } else {
                    return acc
                }
            }, 0)
            dataNum.push(num)
        })
        let numMax = [...dataNum].sort((x, y) => y - x)
        // console.log(numMax, dataNum)
        return dataArr[dataNum.indexOf(numMax[0])]
    }

}


