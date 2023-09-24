// ------------------------------
// Recursion
// ------------------------------

function normal_sum_all(arr: number[]): number {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      result += arr[i];
    }
    return result;
  }
  console.log(normal_sum_all([1, 2, 3, 4, 5]));
  
  // if you know the base case and recursive case then you can define it
  
  type SumAll = (arr: number[]) => number;
  const sumAll: SumAll = (arr) =>
    arr.length === 0 ? 0 : arr[0] + sumAll(arr.slice(1));
  console.log(sumAll([1, 2, 3, 4, 5]));
  
  type SumAllToString = (xs: number[]) => string
  const sumAllToString: SumAllToString = compose(tostring, sumAll)
  console.log(sumAllToString([1,2,3,4,5,6]))
  