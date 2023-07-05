const integers = [24, 56, 1, 25, 67, 24, 89, 21, 53, 24, 56]

const Integers = (subject) => {
	return {
		// 0.
		get: function () {
			return subject
		},

		// 1.1
		unique: function () {
			subject = subject.reduce((acc, curr) => {
				if (!acc.includes(curr)) {
					return [...acc, curr]
				}
				return acc
			}, [])
			return this
		},

		// 1.2
		sortBy: function (order) {
			if (order === 'asc') {
				subject.sort((a, b) => a - b)
			} else if (order === 'desc') {
				subject.sort((a, b) => b - a)
			} else if (typeof order === 'function') {
				subject.sort(order)
			} else {
				throw new Error('Invalid sorting order. Accepted values are "asc", "desc" or a sorting function.')
			}
			return this
		},

		// 2.
		multiplyBy: function (multiplier) {
			subject = subject.map((number) => number * multiplier)
			return this
		},

		// 3.
		odd: function () {
			subject = subject.filter((number) => number % 2 !== 0)
			return this
		},

		// 4.
		sum: function () {
			subject = subject.reduce((acc, curr) => acc + curr, 0)
			return this
		},

		// 5.
		divisibleBy: function (divisor) {
			subject = subject.filter((number) => number % divisor === 0)
			return this
		},
	}
}


//* Assessment
//	1. Return all unique numbers, ordered from larger to smallest.
let processor = Integers(integers)
console.log(
	'Unique numbers from larger to smallest: ',
	processor.unique()
		.sortBy('desc')
		.get()
)

// 2. Return all numbers, where each of them is multiplied by two
processor = Integers(integers)
console.log(
	'\nNumbers multiplied by two: ',
	processor.multiplyBy(2)
		.get()
)

// 3. Return all odd numbers.
processor = Integers(integers)
console.log(
	'\nOdd numbers: ',
	processor.odd()
		.get()
)

// 4. Return sum of all numbers
processor = Integers(integers)
console.log(
	'\nNumbers sum: ',
	processor.sum()
		.get()
)

// 5. Return sum of all numbers that are divisible by 3.
processor = Integers(integers)
console.log(
	'\nSum of numbers divisible by 3: ',
	processor.divisibleBy(3)
		.sum()
		.get()
)