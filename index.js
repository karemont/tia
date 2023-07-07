const Integers = (subject) => {
	const cache = {}

	return {
		// 0. Getter
		get: function () {
			return subject
		},

		// 1.1
		unique: function () {
			const cacheKey = `unique.${subject.toString()}`
			if (cache[cacheKey]) return this

			subject = subject.reduce((acc, curr) => {
				if (!acc.includes(curr)) {
					return [...acc, curr]
				}
				return acc
			}, [])

			cache[cacheKey] = subject

			return this
		},

		// 1.2
		sortBy: function (order) {
			const cacheKey = `sortBy.${order.toString()}.${subject.toString()}`
			if (cache[cacheKey]) return this

			if (order === 'asc') {
				subject.sort((a, b) => a - b)
			} else if (order === 'desc') {
				subject.sort((a, b) => b - a)
			} else if (typeof order === 'function') {
				subject.sort(order)
			} else {
				throw new Error('Invalid sorting order. Accepted values are "asc", "desc" or a sorting function.')
			}

			cache[cacheKey] = subject

			return this
		},

		// 2.
		multiplyBy: function (multiplier) {
			//* Caching is pointless here
			// const cacheKey = `multiplyBy.${multiplier.toString()}.${subject.toString()}`
			// if (cache[cacheKey]) return this

			subject = subject.map((number) => number * multiplier)

			// cache[cacheKey] = subject

			return this
		},

		// 3.
		odd: function () {
			const cacheKey = `odd.${subject.toString()}`
			if (cache[cacheKey]) return this

			subject = subject.filter((number) => number % 2 !== 0)

			cache[cacheKey] = subject

			return this
		},

		// 4. Getter
		sum: function () {
			const cacheKey = `sum.${subject.toString()}`
			if (cache[cacheKey]) return cache[cacheKey]

			const sum = subject.reduce((acc, curr) => acc + curr, 0)

			cache[cacheKey] = sum

			return sum
		},

		// 5.
		divisibleBy: function (divisor) {
			const cacheKey = `divisibleBy.${divisor.toString()}.${subject.toString()}`
			if (cache[cacheKey]) return this

			subject = subject.filter((number) => number % divisor === 0)

			cache[cacheKey] = subject

			return this
		},
	}
}

// Benchmarking
const benchmarkFlag = process.argv.findLast((arg) => arg.startsWith('-benchmark'))
if (benchmarkFlag) {
	const benchmark = (integers, ops) => {
		// 1.
		console.time('Task 1')
		let processor = Integers(integers)
		for (let i = 0; i < ops; i++) {
			processor.unique().sortBy('desc').get()
		}
		console.timeEnd('Task 1');

		// 2.
		console.time('Task 2')
		processor = Integers(integers)
		for (let i = 0; i < ops; i++) {
			processor.multiplyBy(2).get()
		}
		console.timeEnd('Task 2');

		// 3.
		console.time('Task 3')
		processor = Integers(integers)
		for (let i = 0; i < ops; i++) {
			processor.odd().get()
		}
		console.timeEnd('Task 3');

		// 4.
		console.time('Task 4')
		processor = Integers(integers)
		for (let i = 0; i < ops; i++) {
			processor.sum()
		}
		console.timeEnd('Task 4');

		// 5.
		console.time('Task 5')
		processor = Integers(integers)
		for (let i = 0; i < ops; i++) {
			processor.divisibleBy(3).sum()
		}
		console.timeEnd('Task 5');

	};

	const benchmarkLength = benchmarkFlag.split('=')[1] || 1000
	const benchmarkOps = process.argv.findLast((arg) => arg.startsWith('-ops'))?.split('=')[1] || 1000
	benchmark(
		Array.from({length: Number(benchmarkLength)}, (_, index) => index),
		benchmarkOps
	)

	process.exit();
}


//* Assessment
const integers = [24, 56, 1, 25, 67, 24, 89, 21, 53, 24, 56]

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
)

// 5. Return sum of all numbers that are divisible by 3.
processor = Integers(integers)
console.log(
	'\nSum of numbers divisible by 3: ',
	processor.divisibleBy(3)
		.sum()
)