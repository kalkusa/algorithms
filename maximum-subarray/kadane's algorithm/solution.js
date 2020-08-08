let solution = arg => {
    return maxSubArray(arg)
}

let maxSubArray = function (nums) {
    //Kadane's algorithm
    if (nums.length == 0) {
        return 0;
    }
    let maximumGlobalSum = nums[0]
    let maximumTemporarySum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let currentElement = nums[i];
        if (maximumTemporarySum + currentElement >= currentElement) {
            maximumTemporarySum = maximumTemporarySum + currentElement;
        } else {
            maximumTemporarySum = currentElement;
        }
        maximumGlobalSum = Math.max(maximumGlobalSum, maximumTemporarySum)
    }

    return maximumGlobalSum;
};

module.exports = solution