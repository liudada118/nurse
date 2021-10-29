// 输入一个矩阵 arr 矩阵的长height，宽width, 加的厚度 num

export function addSide(arr, width, height, num) {
    let narr = new Array(height)
    let res = []
    for (let i = 0 ; i < height; i++){
        narr[i] = []
        for (let j = 0; j < width ; j++){
            if(j == 0){
                narr[i].push(...new Array(num).fill(0) , arr[i*width+j])
            }else if(j == width -1){
                narr[i].push(arr[i*width+j],...new Array(num).fill(0))
            }else{
                narr[i].push(arr[i*width+j])
            }
        } 
    }
    for(let i = 0 ; i < height; i++){
        res.push(...narr[i])
    }

    return [...new Array(num*(width+2*num)).fill(0) , ...res , ...new Array(num*(width+2*num)).fill(0)]   
}

