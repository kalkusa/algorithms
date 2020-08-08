let solution = arg => {
    return mergeSort(arg)
}

let mergeSort = array => {
    if (array.length === 0) {
        return []
    }

    if (array.length === 1) {
        return array
    }

    let pointOfArraySplit = Math.floor(array.length / 2);
    let leftArray = array.slice(0, pointOfArraySplit);
    let rightArray = array.slice(pointOfArraySplit, array.length)

    let leftSortedArray = mergeSort(leftArray)
    let rightSortedArray = mergeSort(rightArray)
    let mergedArray = merge(leftSortedArray, rightSortedArray)

    return mergedArray
}

let merge = (leftSortedArray, rightSortedArray) => {
    let leftArrayPositionMarker = 0;
    let rightArrayPositionMarker = 0;
    let mergedArray = [];

    let expectedMergedArraySize = leftSortedArray.length + rightSortedArray.length;

    while (mergedArray.length != expectedMergedArraySize) {
        let leftArrayElement = leftSortedArray[leftArrayPositionMarker]
        let rightArrayElement = rightSortedArray[rightArrayPositionMarker]

        if (leftArrayPositionMarker >= leftSortedArray.length) {
            mergedArray.push(rightArrayElement);
            rightArrayPositionMarker++;
            continue;
        }

        if (rightArrayPositionMarker >= rightSortedArray.length) {
            mergedArray.push(leftArrayElement);
            leftArrayPositionMarker++;
            continue;
        }

        if (leftArrayElement < rightArrayElement) {
            mergedArray.push(leftArrayElement);
            leftArrayPositionMarker++;
        } else {
            mergedArray.push(rightArrayElement);
            rightArrayPositionMarker++;
        }
    }

    return mergedArray;
}


module.exports = solution