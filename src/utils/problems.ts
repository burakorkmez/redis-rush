export interface TestCase {
	name: string;
	run: (functions: any) => Promise<boolean>;
}

export interface Problem {
	slug: string;
	title: string;
	description: string;
	initialCode: string;
	solutionCode: string;
	hints: string[];
	exampleUsage: string;
	difficulty: string;
	testCases: TestCase[];
}

export const problems: Problem[] = [
	{
		slug: "basic-caching",
		title: "Basic Caching",
		description:
			"Implement a caching system using Upstash Redis with two functions: `setCacheValue(key, value)` to store a key-value pair, and `getCacheValue(key)` to retrieve a value for a given key.",
		initialCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function setCacheValue(key, value) {
  // Implement setCacheValue function
}

async function getCacheValue(key) {
  // Implement getCacheValue function
}`,
		solutionCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function setCacheValue(key, value) {
  return await client.set(key, value);
}

async function getCacheValue(key) {
  return await client.get(key);
}`,
		hints: [
			"Use the `client.set` method to store a value in Redis.",
			"Use the `client.get` method to retrieve a value from Redis.",
			"Remember to use `await` with Redis methods as they return Promises.",
			"The `setCacheValue` function should return the result of the set operation.",
			"The `getCacheValue` function may return `null` if the key does not exist.",
		],
		exampleUsage: `// Set cache value
await setCacheValue("user1", "John Doe")
// OK

// Get cache value
const value = await getCacheValue("user1")
console.log(value) // "John Doe"

// Get non-existent value
const nullValue = await getCacheValue("user2")
console.log(nullValue) // null`,
		difficulty: "easy",
		testCases: [
			{
				name: "Set and get a value",
				run: async ({ setCacheValue, getCacheValue }) => {
					await setCacheValue("user1", "John Doe");
					const result = await getCacheValue("user1");
					return result === "John Doe";
				},
			},
			{
				name: "Get a non-existent value",
				run: async ({ getCacheValue }) => {
					const result = await getCacheValue("nonexistent");
					return result === null;
				},
			},
			{
				name: "Update an existing value",
				run: async ({ setCacheValue, getCacheValue }) => {
					await setCacheValue("user1", "John Doe");
					await setCacheValue("user1", "Jane Doe");
					const result = await getCacheValue("user1");
					return result === "Jane Doe";
				},
			},
		],
	},
	{
		slug: "list-operations",
		title: "List Operations",
		description:
			"Implement two functions for managing a task queue: `addTask(task)` to add a task to the end of the queue, and `getNextTask()` to retrieve and remove the first task from the queue.",
		initialCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function addTask(task) {
  // Implement addTask function
}

async function getNextTask() {
  // Implement getNextTask function
}`,
		solutionCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function addTask(task) {
  return await client.rpush('tasks', task);
}

async function getNextTask() {
  return await client.lpop('tasks');
}`,
		hints: [
			"Use the `client.rpush` method to append a task to the end of the list.",
			"Use the `client.lpop` method to remove and return the first task from the list.",
			"The list of tasks is stored under the key 'tasks'.",
			"Be aware that `lpop` will return `null` if the list is empty.",
		],
		exampleUsage: `// Add tasks to the queue
await addTask("Buy groceries")
await addTask("Walk the dog")

// Get the next task
const nextTask = await getNextTask()
console.log(nextTask) // "Buy groceries"

// Get the next task again
const nextTask2 = await getNextTask()
console.log(nextTask2) // "Walk the dog"

// Try to get a task from an empty queue
const emptyQueueTask = await getNextTask()
console.log(emptyQueueTask) // null`,
		difficulty: "easy",
		testCases: [
			{
				name: "Add and get a task",
				run: async ({ addTask, getNextTask }) => {
					await addTask("Test task");
					const result = await getNextTask();
					return result === "Test task";
				},
			},
			{
				name: "Get from empty queue",
				run: async ({ getNextTask }) => {
					const result = await getNextTask();
					return result === null;
				},
			},
			{
				name: "Add multiple tasks and get them in order",
				run: async ({ addTask, getNextTask }) => {
					await addTask("Task 1");
					await addTask("Task 2");
					const result1 = await getNextTask();
					const result2 = await getNextTask();
					return result1 === "Task 1" && result2 === "Task 2";
				},
			},
		],
	},
	{
		slug: "hash-operations",
		title: "Hash Operations",
		description:
			"Implement two functions for managing user profiles: `setUserProfile(userId, field, value)` to set a field in a user's profile, and `getUserProfile(userId)` to retrieve all fields of a user's profile.",
		initialCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function setUserProfile(userId, field, value) {
  // Implement setUserProfile function
}

async function getUserProfile(userId) {
  // Implement getUserProfile function
}`,
		solutionCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function setUserProfile(userId, field, value) {
  return await client.hset(\`user:\${userId}\`, field, value);
}

async function getUserProfile(userId) {
  return await client.hgetall(\`user:\${userId}\`);
}`,
		hints: [
			"Use the `client.hset` method to set a field in a hash.",
			"Use the `client.hgetall` method to retrieve all fields and values of a hash.",
			"Follow a consistent key pattern for user profiles, such as 'user:{userId}'.",
			"The `getUserProfile` function returns an object with all the fields and values for a user.",
		],
		exampleUsage: `// Set user profile fields
await setUserProfile("user1", "name", "John Doe")
await setUserProfile("user1", "email", "john@example.com")

// Get the complete user profile
const profile = await getUserProfile("user1")
console.log(profile)
// Output: { name: "John Doe", email: "john@example.com" }

// Try to get a non-existent user profile
const emptyProfile = await getUserProfile("user2")
console.log(emptyProfile) // null`,
		difficulty: "easy",
		testCases: [
			{
				name: "Set and get a user profile",
				run: async ({ setUserProfile, getUserProfile }) => {
					await setUserProfile("user1", "name", "John Doe");
					await setUserProfile("user1", "email", "john@example.com");
					const profile = await getUserProfile("user1");
					return profile.name === "John Doe" && profile.email === "john@example.com";
				},
			},
			{
				name: "Get a non-existent user profile",
				run: async ({ getUserProfile }) => {
					const profile = await getUserProfile("nonexistent");
					return profile === null;
				},
			},
			{
				name: "Update an existing profile field",
				run: async ({ setUserProfile, getUserProfile }) => {
					await setUserProfile("user1", "name", "John Doe");
					await setUserProfile("user1", "name", "Jane Doe");
					const profile = await getUserProfile("user1");
					return profile.name === "Jane Doe";
				},
			},
		],
	},

	{
		slug: "expiring-cache",
		title: "Expiring Cache",
		description:
			"Implement an expiring cache using Upstash Redis. Create two functions: `setWithExpiry(key, value, expiryInSeconds)` to set a value with an expiration time, and `getWithExpiry(key)` to retrieve a value if it hasn't expired.",
		initialCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function setWithExpiry(key, value, expiryInSeconds) {
  // Implement setWithExpiry function
}

async function getWithExpiry(key) {
  // Implement getWithExpiry function
}

// Test your implementation
async function main() {
  await setWithExpiry('user:1', JSON.stringify({ name: 'John' }), 5)
  console.log(await getWithExpiry('user:1'))
  await new Promise(resolve => setTimeout(resolve, 6000))
  console.log(await getWithExpiry('user:1'))
}

main().catch(console.error)`,
		solutionCode: `import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

/* DO NOT MODIFY THE CODE ABOVE */

async function setWithExpiry(key, value, expiryInSeconds) {
  return await client.set(key, value, { ex: expiryInSeconds })
}

async function getWithExpiry(key) {
  const value = await client.get(key)
  return value ? JSON.parse(value) : null
}

async function main() {
  await setWithExpiry('user:1', JSON.stringify({ name: 'John' }), 5)
  console.log(await getWithExpiry('user:1'))
  await new Promise(resolve => setTimeout(resolve, 6000))
  console.log(await getWithExpiry('user:1'))
}

main().catch(console.error)`,
		hints: [
			"Use the 'ex' option with client.set to set expiration time.",
			"Remember to stringify objects before storing and parse them after retrieval.",
			"The getWithExpiry function should return null for expired or non-existent keys.",
			"No need to manually check expiration in getWithExpiry, Redis handles it automatically.",
		],
		exampleUsage: `// Set a value with 10 seconds expiry
await setWithExpiry('session:123', JSON.stringify({ userId: 'user1' }), 10)

// Get the value immediately
console.log(await getWithExpiry('session:123')) // { userId: 'user1' }

// Wait for 11 seconds
await new Promise(resolve => setTimeout(resolve, 11000))

// Try to get the expired value
console.log(await getWithExpiry('session:123')) // null`,
		difficulty: "medium",
		testCases: [
			{
				name: "Set and get a value before expiration",
				run: async ({ setWithExpiry, getWithExpiry }) => {
					await setWithExpiry("test:1", JSON.stringify({ data: "test" }), 2);
					const result = await getWithExpiry("test:1");
					return result && result.data === "test";
				},
			},
			{
				name: "Get an expired value",
				run: async ({ setWithExpiry, getWithExpiry }) => {
					await setWithExpiry("test:2", JSON.stringify({ data: "test" }), 1);
					await new Promise((resolve) => setTimeout(resolve, 1100));
					const result = await getWithExpiry("test:2");
					return result === null;
				},
			},
			{
				name: "Get a non-existent key",
				run: async ({ getWithExpiry }) => {
					const result = await getWithExpiry("nonexistent");
					return result === null;
				},
			},
		],
	},
	{
		slug: "counter-with-reset",
		title: "Counter with Reset",
		description:
			"Implement a counter system with a reset functionality using Upstash Redis. Create three functions: `incrementCounter(key)` to increment a counter, `getCounter(key)` to get the current count, and `resetCounter(key)` to reset the counter to zero.",
		initialCode: `import { Redis } from '@upstash/redis'
	
const client = new Redis({
	url: process.env.UPSTASH_REDIS_URL,
	token: process.env.UPSTASH_REDIS_TOKEN,
})

/* DO NOT MODIFY THE CODE ABOVE */

async function incrementCounter(key) {
	// Implement incrementCounter function
}

async function getCounter(key) {
	// Implement getCounter function
}

async function resetCounter(key) {
	// Implement resetCounter function
}`,
		solutionCode: `import { Redis } from '@upstash/redis'
	
const client = new Redis({
	url: process.env.UPSTASH_REDIS_URL,
	token: process.env.UPSTASH_REDIS_TOKEN,
})

/* DO NOT MODIFY THE CODE ABOVE */

async function incrementCounter(key) {
	const currentValue = await client.get(key);
	const newValue = (parseInt(currentValue) || 0) + 1;
	await client.set(key, newValue.toString());
	return newValue;
}

async function getCounter(key) {
	const value = await client.get(key);
	return value ? parseInt(value) : 0;
}

async function resetCounter(key) {
	await client.set(key, '0');
	return 0;
}`,
		hints: [
			"Use client.get and client.set to implement increment functionality.",
			"Remember to parse the string returned by client.get to an integer.",
			"Use client.set with a value of 0 to reset the counter.",
			"Handle the case where the counter doesn't exist in getCounter and incrementCounter.",
		],
		exampleUsage: `// Increment the 'pageviews' counter
await incrementCounter('pageviews')
await incrementCounter('pageviews')
await incrementCounter('pageviews')

// Get the current count
const views = await getCounter('pageviews')
console.log('Page views:', views) // 3

// Reset the counter
await resetCounter('pageviews')
console.log('After reset:', await getCounter('pageviews')) // 0`,
		difficulty: "medium",
		testCases: [
			{
				name: "Increment and get counter",
				run: async ({ incrementCounter, getCounter }) => {
					await incrementCounter("test1");
					const value = await getCounter("test1");
					return value === 1;
				},
			},
			{
				name: "Multiple increments",
				run: async ({ incrementCounter, getCounter }) => {
					await incrementCounter("test2");
					await incrementCounter("test2");
					await incrementCounter("test2");
					const value = await getCounter("test2");
					return value === 3;
				},
			},
			{
				name: "Reset counter",
				run: async ({ incrementCounter, resetCounter, getCounter }) => {
					await incrementCounter("test3");
					await incrementCounter("test3");
					await resetCounter("test3");
					const value = await getCounter("test3");
					return value === 0;
				},
			},
			{
				name: "Get non-existent counter",
				run: async ({ getCounter }) => {
					const value = await getCounter("nonexistent");
					return value === 0;
				},
			},
			{
				name: "Increment after reset",
				run: async ({ incrementCounter, resetCounter, getCounter }) => {
					await incrementCounter("test4");
					await incrementCounter("test4");
					await resetCounter("test4");
					await incrementCounter("test4");
					const value = await getCounter("test4");
					return value === 1;
				},
			},
		],
	},
];

export function getProblemBySlug(slug: string): Problem | undefined {
	return problems.find((problem) => problem.slug === slug);
}

export function getNextProblemSlug(currentSlug: string): string | null {
	const currentIndex = problems.findIndex((problem) => problem.slug === currentSlug);
	if (currentIndex < problems.length - 1) {
		return problems[currentIndex + 1].slug;
	}
	return null;
}

export function getPreviousProblemSlug(currentSlug: string): string | null {
	const currentIndex = problems.findIndex((problem) => problem.slug === currentSlug);
	if (currentIndex > 0) {
		return problems[currentIndex - 1].slug;
	}
	return null;
}
