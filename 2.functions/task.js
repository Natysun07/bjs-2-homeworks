function getArrayParams(...arr) {
	let min = Infinity;
	let max = -Infinity;
	let sum = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
		if (arr[i] < min) {
			min = arr[i];
		}
		sum += arr[i];
	}

	const avg = +(sum / arr.length).toFixed(2);

	return {
		min,
		max,
		avg
	};
}

function summElementsWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}
	return arr.reduce((sum, current) => sum + current, 0);
}

function differenceMaxMinWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}
	const max = Math.max(...arr);
	const min = Math.min(...arr);
	return max - min;
}

function differenceEvenOddWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}
	let sumEvenElement = 0;
	let sumOddElement = 0;

	for (const num of arr) {
		if (num % 2 === 0) {
			sumEvenElement += num;
		} else {
			sumOddElement += num;
		}
	}

	return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}
	let sumEvenElement = 0;
	let countEvenElement = 0;

	for (const num of arr) {
		if (num % 2 === 0) {
			sumEvenElement += num;
			countEvenElement++;
		}
	}

	return sumEvenElement / countEvenElement;
}

function makeWork(arrOfArr, func) {
	let maxWorkerResult = -Infinity;

	for (const data of arrOfArr) {
		const result = func(...data);

		if (result > maxWorkerResult) {
			maxWorkerResult = result;
		}
	}

	return maxWorkerResult;
}


