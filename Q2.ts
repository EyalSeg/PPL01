const assert = require('assert');

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};


const TreePreArray : (tree : BinTree) => number[] = (tree) => {
    if (tree === null)
        return []
    
    let leftVisit = (tree.left !== undefined ? TreePreArray(tree.left) : [] )
    let rightVisit = (tree.right !== undefined ? TreePreArray(tree.right) : [] )     
    
    return [tree.root].concat(leftVisit).concat(rightVisit)
};

const TreeInArray : (tree : BinTree) => number[] = (tree) => {
    if (tree === null)
        return []
    
    let leftVisit = (tree.left !== undefined ? TreePreArray(tree.left) : [] )
    let rightVisit = (tree.right !== undefined ? TreePreArray(tree.right) : [] )     
    
    return leftVisit.concat([tree.root]).concat(rightVisit)
};

const TreePostArray : (tree : BinTree) => number[] = (tree) => {
    if (tree === null)
        return []
    
    let leftVisit = (tree.left !== undefined ? TreePreArray(tree.left) : [] )
    let rightVisit = (tree.right !== undefined ? TreePreArray(tree.right) : [] )     
    
    return leftVisit.concat(rightVisit).concat([tree.root])
};


let myTree = {root:10, left :{root:5}, right : {root:3} }
console.log(TreePreArray(myTree))


//TO DO: tests


interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};


const GBinTreePreArray: <T>(tree : GBinTree<T>) => T[] = (tree) => {
    if (tree === null)
        return []
    
    let leftVisit = (tree.left !== undefined ? GBinTreePreArray(tree.left) : [] )
    let rightVisit = (tree.right !== undefined ? GBinTreePreArray(tree.right) : [] )     
    
    return [tree.root].concat(leftVisit).concat(rightVisit)
};

const GBinTreeInArray : <T>(tree : GBinTree<T>) => T[] = (tree) => {
    if (tree === null)
        return []
    
    let leftVisit = (tree.left !== undefined ? GBinTreeInArray(tree.left) : [] )
    let rightVisit = (tree.right !== undefined ? GBinTreeInArray(tree.right) : [] )     
    
    return leftVisit.concat([tree.root]).concat(rightVisit)
};

const GBinTreePostArray :<T> (tree : GBinTree<T>) => T[] = (tree) => {
    if (tree === null)
        return []
    
    let leftVisit = (tree.left !== undefined ? GBinTreePostArray(tree.left) : [] )
    let rightVisit = (tree.right !== undefined ?  GBinTreePostArray(tree.right) : [] )     
    
    return leftVisit.concat(rightVisit).concat([tree.root])
};



// if this line fails, run the following in the terminal: npm install @types/node --save-dev




const KSubsets : (array: any[], subsetSize : number) => any[][]= (array, subsetSize) => {
    if (array.length < subsetSize) //check in Forum
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

const AllSubsets :( array : any[]) => any[][] = (array) =>{
    if (array.length == 0)
        return [[]]

    let head = array[0]
    let tail = array.slice(1)
    
    let skipCurrentItem = AllSubsets(tail)
    let takeCurrentItem = AllSubsets(tail).map(subset => [head, ... subset])

    return skipCurrentItem.concat(takeCurrentItem)
}




console.log(AllSubsets([1,2,3]))
assert.deepEqual(KSubsets([1, 2, 3], 3), [[1, 2, 3]], "A subset at the size of the array should be the array itself")
assert.deepEqual(KSubsets([1, 2, 3], 4), [], "No subsets larger than the array are allowed")
// TODO: test size, elements, etc'



const flatmap :(func : Function  , array: any) => any[] = (func , array) => {
    return array.map(func).reduce((acc,curVal)=> acc.concat(curVal),[])
}

console.log(flatmap((x) => x[0], [[[1,2], [3,4]], [[5,6], [7,8]]]))


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

const getBoxarts:( movieLists:movieList[]) => {id: string, title: string ,boxart: string}[] = (movieLists)=>{
    let videos = flatmap((movieList) => movieList.videos, movieLists) //videos array
   // let allVideos = flatmap((video: video)=> video.boxarts.map((boxart)=>
   // {id: video.id; title: video.title; boxart : boxart}),
  //   videos)
  //  let filteredVideos = allVideos. .filter((video)=>video.boxart.width == 50 && video.boxart.height == 150)
  //  return filteredVideos.map((video)=> {id : video.id ; title : video.title; boxart: video.boxart.url})
 
    let boxarts = flatmap((video: video)=> video.boxarts.map((boxart)=>
     ({id: video.id, title: video.title, boxart: boxart}))
    , videos)
        
    let filteredBoxarts = boxarts.filter((video)=>video.boxart.width == 150 && video.boxart.height == 200)
    return filteredBoxarts.map((video)=> 
        ({id: video.id, title:video.title, boxart: video.boxart.url}))
}

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


