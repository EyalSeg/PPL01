// if this line fails, run the following in the terminal: npm install @types/node --save-dev
const assert = require('assert');



const KSubsets : (array: any[], subsetSize : number) => any[] = (array, subsetSize) => {
    if (array.length < subsetSize)
        return []

    if (subsetSize == 1)
        return array.map(item => [item])

    if (subsetSize == array.length)
        return [array]
    
    let head = array[0]
    let tail = array.slice(1)

    let skipCurrentItem = KSubsets(tail, subsetSize)
    let takeCurrentItem = KSubsets(tail, subsetSize - 1).map(subset => [head, ...subset])

    return takeCurrentItem.concat(skipCurrentItem)
}


assert.deepEqual(KSubsets([1, 2, 3], 3), [[1, 2, 3]], "A subset at the size of the array should be the array itself")
assert.deepEqual(KSubsets([1, 2, 3], 4), [], "No subsets larger than the array are allowed")
