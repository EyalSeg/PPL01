// if this line fails, run the following in the terminal: npm install @types/node --save-dev
var assert = require('assert');
var KSubsets = function (array, subsetSize) {
    if (array.length < subsetSize)
        return [];
    if (subsetSize == 1)
        return array.map(function (item) { return [item]; });
    if (subsetSize == array.length)
        return [array];
    var head = array[0];
    var tail = array.slice(1);
    var skipCurrentItem = KSubsets(tail, subsetSize);
    var takeCurrentItem = KSubsets(tail, subsetSize - 1).map(function (subset) { return [head].concat(subset); });
    return takeCurrentItem.concat(skipCurrentItem);
};
assert.deepEqual(KSubsets([1, 2, 3], 3), [[1, 2, 3]], "A subset at the size of the array should be the array itself");
assert.deepEqual(KSubsets([1, 2, 3], 4), [], "No subsets larger than the array are allowed");
// TODO: test size, elements, etc'
//# sourceMappingURL=Q2.js.map