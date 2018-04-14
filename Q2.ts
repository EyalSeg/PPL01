import { type } from "os";
import { isNullOrUndefined } from "util";
import { stringify } from "querystring";

  
const assert = require('assert');

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

//returns an array of a pre-order traversal on BinTree
const TreePreArray : (tree : BinTree) => number[] = (tree) => {
    if (isNullOrUndefined(tree)) //changed this
        return []
    
    let leftVisit = (!(isNullOrUndefined(tree.left)) ? TreePreArray(tree.left) : [] )
    let rightVisit = (!(isNullOrUndefined(tree.right)) ? TreePreArray(tree.right) : [] )     
    
    return [tree.root].concat(leftVisit).concat(rightVisit)
};
//returns an array of a in-order traversal on BinTree
const TreeInArray : (tree : BinTree) => number[] = (tree) => {
    if (isNullOrUndefined(tree))
        return []
    
    let leftVisit = (!(isNullOrUndefined(tree.left)) ? TreeInArray(tree.left) : [] )
    let rightVisit = (!(isNullOrUndefined(tree.right)) ? TreeInArray(tree.right) : [] )     
    
    return leftVisit.concat([tree.root]).concat(rightVisit)
};
//returns an array of a post-order traversal on BinTree
const TreePostArray : (tree : BinTree) => number[] = (tree) => {
    if (isNullOrUndefined(tree))
        return []
    
    let leftVisit = (!(isNullOrUndefined(tree.left)) ? TreePostArray(tree.left) : [] )
    let rightVisit = (!(isNullOrUndefined(tree.right)) ? TreePostArray(tree.right) : [] )     
    
    return leftVisit.concat(rightVisit).concat([tree.root])
};

//variable declerations
let myTree = {root:10,
              left :{root:5,
                     left:{root:8}
                    },
              right : {root:7,
                       left:{root:9},
                       right:{root:2,
                              left:{root:1},
                              right:{root:12}
                            }
                        }
            }

let myTree2 = undefined
let myTree3 = null
let myTree4 = {root:5}
let myTree5 = {root:5,
                left :{root:1}
             }

let myTree6 = {root:5,
               right :{root:3}
             }
let myTree7 = {root:5,
               left : {root:1},
               right :{root:3}
              }
 
              
//Tests Pre Order Traversal
assert.deepEqual(TreePreArray(myTree),[ 10, 5, 8, 7, 9, 2, 1, 12 ], 
                "failed - the printed array is not in the correct order")
assert.deepEqual(TreePreArray(myTree2),[], "failed - pre order traversal on undefined should be []")
assert.deepEqual(TreePreArray(myTree3),[], "failed - pre order traversal on undefined should be []")
assert.deepEqual(TreePreArray(myTree4),[5], "failed - pre order traversal on binTree with only root should be [root]")
assert.deepEqual(TreePreArray(myTree5),[5, 1], "failed - pre order traversal is not correcrt")
assert.deepEqual(TreePreArray(myTree6),[5, 3], "failed - pre order traversal is not correcrt")
assert.deepEqual(TreePreArray(myTree7),[5, 1, 3], "failed - pre order traversal is not correcrt")

//Tests In Order Traversal
assert.deepEqual(TreeInArray(myTree),[ 8, 5, 10, 9, 7, 1, 2, 12 ], 
                "failed - the printed array is not in the correct order") 
assert.deepEqual(TreeInArray(myTree2),[], "failed - in order traversal on undefined should be []")
assert.deepEqual(TreeInArray(myTree3),[], "failed - in order traversal on undefined should be []")
assert.deepEqual(TreeInArray(myTree4),[5], "failed - in order traversal on binTree with only root should be [root]") 
assert.deepEqual(TreeInArray(myTree5),[1, 5], "failed - post order traversal is not correcrt")
assert.deepEqual(TreeInArray(myTree6),[5, 3], "failed - post order traversal is not correcrt")
assert.deepEqual(TreeInArray(myTree7),[1, 5, 3], "failed - post order traversal is not correcrt")

//Tests Post Order Traversal
assert.deepEqual(TreePostArray(myTree),[ 8, 5, 9, 1, 12, 2, 7, 10 ], 
                "failed - the printed array is not in the correct order")
assert.deepEqual(TreePostArray(myTree2),[], "failed - post order traversal on undefined should be []")
assert.deepEqual(TreePostArray(myTree3),[], "failed - post order traversal on undefined should be []") 
assert.deepEqual(TreePostArray(myTree4),[5], "failed - post order traversal on binTree with only root should be [root]")
assert.deepEqual(TreePostArray(myTree5),[1, 5], "failed - post order traversal is not correcrt")
assert.deepEqual(TreePostArray(myTree6),[3, 5], "failed - post order traversal is not correcrt")
assert.deepEqual(TreePostArray(myTree7),[1, 3, 5], "failed - post order traversal is not correcrt")



interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

//returns an array of a pre-order traversal on GBinTree
const GBinTreePreArray: <T>(tree : GBinTree<T>) => T[] = (tree) => {
    if (isNullOrUndefined(tree))
        return []
    
    let leftVisit = (!(isNullOrUndefined(tree.left)) ? GBinTreePreArray(tree.left) : [] )
    let rightVisit = (!(isNullOrUndefined(tree.right)) ? GBinTreePreArray(tree.right) : [] )     
    
    return [tree.root].concat(leftVisit).concat(rightVisit)
};

//returns an array of a in-order traversal on GBinTree
const GBinTreeInArray : <T>(tree : GBinTree<T>) => T[] = (tree) => {
    if (isNullOrUndefined(tree))
        return []
    
    let leftVisit = (!(isNullOrUndefined(tree.left)) ? GBinTreeInArray(tree.left) : [] )
    let rightVisit = (!(isNullOrUndefined(tree.right)) ? GBinTreeInArray(tree.right) : [] )     
    
    return leftVisit.concat([tree.root]).concat(rightVisit)
};

//returns an array of a post-order traversal on GBinTree
const GBinTreePostArray :<T> (tree : GBinTree<T>) => T[] = (tree) => {
    if (isNullOrUndefined(tree))
        return []
    
    let leftVisit = (!(isNullOrUndefined(tree.left)) ? GBinTreePostArray(tree.left) : [] )
    let rightVisit = (!(isNullOrUndefined(tree.right)) ?  GBinTreePostArray(tree.right) : [] )     
    
    return leftVisit.concat(rightVisit).concat([tree.root])
};

//variables declerations
let myTree8 = {root:'a',
    left :{root:'b',
           left:{root:'d'}
          },
    right : {root:'c',
             left:{root:'e'},
             right:{root:'f',
                    left:{root:'g'},
                    right:{root:'h'}
                  }
              }
  }

let myTree9 = undefined
let myTree10 = null
let myTree11 = {root:'a'}
let myTree12 = {root:'a',
      left :{root:'b'}
   }

let myTree13 = {root:'a',
     right :{root:'c'}
   }
let myTree14 = {root:'a',
     left : {root:'b'},
     right :{root:'c'}
    }


//TESTS
//Tests Pre Order Traversal
console.log(GBinTreePreArray(myTree8))
assert.deepEqual(GBinTreePreArray(myTree8),[ 'a', 'b', 'd', 'c', 'e', 'f', 'g', 'h'], 
                "failed - the printed array is not in the correct order")
assert.deepEqual(GBinTreePreArray(myTree9),[], "failed - pre order traversal on undefined should be []")
assert.deepEqual(GBinTreePreArray(myTree10),[], "failed - pre order traversal on undefined should be []")
assert.deepEqual(GBinTreePreArray(myTree11),['a'], "failed - pre order traversal on binTree with only root should be [root]")
assert.deepEqual(GBinTreePreArray(myTree12),['a', 'b'], "failed - pre order traversal is not correcrt")
assert.deepEqual(GBinTreePreArray(myTree13),['a', 'c'], "failed - pre order traversal is not correcrt")
assert.deepEqual(GBinTreePreArray(myTree14),['a', 'b', 'c'], "failed - pre order traversal is not correcrt")

//Tests In Order Traversal
assert.deepEqual(GBinTreeInArray(myTree8),[ 'd', 'b', 'a', 'e', 'c', 'g', 'f', 'h' ], 
                "failed - the printed array is not in the correct order") 
assert.deepEqual(GBinTreeInArray(myTree9),[], "failed - in order traversal on undefined should be []")
assert.deepEqual(GBinTreeInArray(myTree10),[], "failed - in order traversal on undefined should be []")
assert.deepEqual(GBinTreeInArray(myTree11),['a'], "failed - in order traversal on binTree with only root should be [root]") 
assert.deepEqual(GBinTreeInArray(myTree12),['b', 'a'], "failed - post order traversal is not correcrt")
assert.deepEqual(GBinTreeInArray(myTree13),['a', 'c'], "failed - post order traversal is not correcrt")
assert.deepEqual(GBinTreeInArray(myTree14),['b', 'a', 'c'], "failed - post order traversal is not correcrt")

//Tests Post Order Traversal
assert.deepEqual(GBinTreePostArray(myTree8),[ 'd', 'b', 'e', 'g', 'h', 'f', 'c', 'a' ], 
                "failed - the printed array is not in the correct order")
assert.deepEqual(GBinTreePostArray(myTree9),[], "failed - post order traversal on undefined should be []")
assert.deepEqual(GBinTreePostArray(myTree10),[], "failed - post order traversal on undefined should be []") 
assert.deepEqual(GBinTreePostArray(myTree11),['a'], "failed - post order traversal on binTree with only root should be [root]")
assert.deepEqual(GBinTreePostArray(myTree12),['b', 'a'], "failed - post order traversal is not correcrt")
assert.deepEqual(GBinTreePostArray(myTree13),['c', 'a'], "failed - post order traversal is not correcrt")
assert.deepEqual(GBinTreePostArray(myTree14),['b', 'c', 'a'], "failed - post order traversal is not correcrt")

//returns an array with all the subsets of size k of A (each subset will be an array itself).
const KSubsets : <T>(array: any[], subsetSize : number) => T[][] = (array, subsetSize) => {
    if (isNullOrUndefined(array) || array.length < subsetSize || array.length == 0) 
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

//returns an array with all the subsets of A (each subset will be an array itself
const AllSubsets : <T>( array : T[]) => T[][] = (array) =>{
    if (isNullOrUndefined(array) || array.length == 0)
        return [[]]

    let head = array[0]
    let tail = array.slice(1)
    
    let skipCurrentItem = AllSubsets(tail)
    let takeCurrentItem = AllSubsets(tail).map(subset => [head, ... subset])

    return skipCurrentItem.concat(takeCurrentItem)
}

//checks if an element is contained in an array (for tests)
const contains = (array, element) => {
    return array.reduce((accumulator, value) => accumulator || element.toString() == value.toString(), false)
}

//Test method
const testSetsEqual : <T>(actual : T[], expected : T[]) => void = (actual, expected)=> {
    assert.deepEqual(true, actual.length == expected.length, "different amount of subsets found!")
    
    expected.forEach((element) =>{
        let elementContained = contains(actual, element)

        assert.deepEqual(true, elementContained,
        "subset " + element.toString() + "expected but not found")
    })

    actual.forEach((element) =>{
        let elementContained = contains(expected, element)

        assert.deepEqual(true, elementContained,
        "subset " + element.toString() + "found but not expected")
    })
}



//TESTS
assert.deepEqual(KSubsets([1, 2, 3], 3), [[1, 2, 3]], "A subset at the size of the array should be the array itself")
assert.deepEqual(KSubsets([1, 2, 3], 4), [], "No subsets larger than the array are allowed")
assert.deepEqual(KSubsets([], 1), [], "Empty set has no subsets")
assert.deepEqual(KSubsets(undefined, 1), [], "Empty set has no subsets")
assert.deepEqual(KSubsets([1, 2, 3], 0), [], "No subsets at the size of 0")
testSetsEqual(KSubsets([1, 2, 3], 2), [[1, 2], [2, 3], [1, 3]]) //function with assert

assert.deepEqual(AllSubsets([1]), [[], [1]], "A set at the the size of 1 has only 1 subset")
assert.deepEqual(AllSubsets([]), [[]], "Empty set has no subsets")
assert.deepEqual(AllSubsets(undefined), [[]], "Empty set has no subsets")
testSetsEqual(AllSubsets([1, 2, 3]), [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]) //function with assert


//gets a function f and an array A as parameter.
//returns the concatenation of all the arrays returned by f when it is applied to each element in A.
const flatmap : <T1, T2>(func : (value : T1) => T2  , array: T1[][])=> T2[] = (func , array) => {
    if (isNullOrUndefined(array))
        return []
        
    return array.map((subarray) => subarray.map(func))
        .reduce((acc,curVal)=> acc.concat(curVal),[])
}


//TESTS
assert.deepEqual(flatmap((x) => x.toUpperCase(), [['a', 'b'] ,[ 'c', 'd']]), ['A', 'B', 'C', 'D'])
assert.deepEqual(flatmap((x) => x[0].toString(), [[[1,2], [3,4]], [[5,6], [7,8]]]), ['1', '3', '5', '7'])
assert.deepEqual(flatmap((x) => x, []), [], "flatmap of an empty set should be an empty set")
assert.deepEqual(flatmap((x) => x, [[], [], []]), [], "flatmap of an set of empty sets should be an empty set")
assert.deepEqual(flatmap((x) => x, null), [], "flatmap of null of empty sets should be an empty set")
assert.deepEqual(flatmap((x) => x, undefined), [], "flatmap of undefined of empty sets should be an empty set")


interface boxart {
    width:number
    height: number
    url: string
};


interface video {
    id: number
    title: string
    boxarts: boxart[]
};

interface movieList {
   name: string
   videos : video[] ;
};

//gets a type similar to movieLists
// returns a map {id, title, boxart} for every video in the movieLists
// such that the boxart property in the result will be the url of the boxart object with dimensions of 150x200px.
const getBoxarts:(movieLists:movieList[]) => {id: number, title: string ,boxart: string}[] = (movieLists)=>{
    let movieCollections = movieLists.map((movieList) => movieList.videos)
    let videos = flatmap((movie) => movie, movieCollections)
    let boxarts = videos.map((video) => video.boxarts.map((boxart) => ({id: video.id, title: video.title, boxart: boxart})))
    let boxarts_flattened = flatmap((x) => x, boxarts)

    let filteredBoxarts = boxarts_flattened.filter((video)=>video.boxart.width == 150 && video.boxart.height == 200)

    return filteredBoxarts.map((video)=> 
        ({id: video.id, title:video.title, boxart: video.boxart.url}))
}


//var definiton
let movieLists = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
]

console.log(getBoxarts(movieLists ))


