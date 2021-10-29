export function computeStoke(arr,oldArr , height , width){
    let left = 0 , right = 0
    for(let i = 0 ; i < height; i++){
        for(let j = 0 ; j < width ; j++){
            if(j < width / 2){
                left += Math.abs( arr[i*32 + j] - oldArr[i*32 + j])
            }else{
                right +=Math.abs( arr[i*32 + j] - oldArr[i*32 + j])
            }
        }
    }
    // console.log(arr,left,right)
    return [left , right]
}

export class Stoke{
    constructor(value){
        this.length = value
        this.stack = []
    }

    addValue(value){
        if(this.stack.length < this.length){
            this.stack.push(Math.abs(value) )
        }else{
            this.stack.push(Math.abs(value))
            this.stack.shift()
        }
        // console.log(this.stack)
    }

    computeValue(value){
       return this.stack.filter((a) => a > value).length
    }
}