import { BarChart, BookOpen, Briefcase, Code, Layout, Rocket, Shield, Users, Zap } from "lucide-react";

export const featureCards = [
	{
		title: "Interactive Learning",
		description: "Hands-on challenges for practical skill development",
		icon: Layout,
		color: "teal",
	},
	{
		title: "Real-World Use Cases",
		description: "Industry-relevant scenarios and case studies",
		icon: Briefcase,
		color: "teal",
	},
	{
		title: "Upstash Integration",
		description: "Learn with cutting-edge serverless Redis technology",
		img: "/upstash-logo.png",
		color: "teal",
	},
];

export const challenges = [
	{
		id: 1,
		title: "Redis Basics",
		description: "Master the fundamentals",
		icon: BookOpen,
		color: "from-emerald-500 to-teal-500",
		href: "/redis-basics",
	},
	{
		id: 2,
		title: "Data Structures",
		description: "Lists, sets, and beyond",
		icon: Code,
		color: "from-emerald-500 to-teal-500",
		href: "/redis-data-structures",
	},
	{
		id: 3,
		title: "Practice Upstash",
		description: "Real-world challenges",
		icon: Rocket,
		color: "from-emerald-500 to-teal-500",
		href: "/learn-upstash",
	},
];

export const benefits = [
	{
		title: "Rapid Skill Acquisition",
		description: "Master Redis concepts faster with our hands-on approach",
		icon: Zap,
	},
	{ title: "Industry-Relevant Skills", description: "Learn techniques used by top tech companies", icon: Users },
	{ title: "Real-Time Feedback", description: "Get instant feedback on your code and progress", icon: Code },
	{ title: "Performance Tracking", description: "Monitor your growth with detailed analytics", icon: BarChart },
];

export const testimonials = [
	{
		name: "Alex Johnson",
		role: "Senior Developer at TechCorp",
		quote: "Redis Rush transformed my team's understanding of Redis. It's now an integral part of our tech stack.",
	},
	{
		name: "Samantha Lee",
		role: "CTO at StartupX",
		quote: "The real-world scenarios in Redis Rush's challenges prepared us for scaling our infrastructure effortlessly.",
	},
	{
		name: "Raj Chen",
		role: "Software Engineer",
		quote: "Redis Rush's hands-on challenges fast-tracked my Redis skills, making me more confident in building high-performance apps.",
	},
];

export interface Section {
	slug: string;
	title: string;
	content: {
		overview: string;
		keyCommands: {
			name: string;
			description: string;
			example: string;
		}[];
		useCase: string;
	};
	challenges: Challenge[];
}

export interface Challenge {
    id: number;
    prompt: string;
    answer: string;
	// check out https://regex101.com/ to try the regx you want;
	// I am not supporting putting a keyword in a "" or '' like "get" or 'set' they need to be get or set ¯\_(ツ)_/¯;
    regx: RegExp;
    type: "command" | "multiple_choice" | "true_false";
}

export const redisBasicsContent: Section = {
    slug: "basics",
    title: "Redis Basics",
    content: {
        overview: `
Redis is a key-value store, and its fundamental operations revolve around setting and retrieving values. These basic operations form the foundation for more complex data manipulations and are essential for understanding how Redis works.
      `,
        keyCommands: [
            {
                name: "SET key value",
                description: "Sets the value for a key",
                example: 'SET mykey "Hello Redis"',
            },
            {
                name: "GET key",
                description: "Retrieves the value of a key",
                example: "GET mykey",
            },
            {
                name: "EXISTS key",
                description: "Checks if a key exists",
                example: "EXISTS mykey",
            },
            {
                name: "DEL key",
                description: "Deletes a key",
                example: "DEL mykey",
            },
            {
                name: "MSET key1 value1 [key2 value2 ...]",
                description: "Sets multiple key-value pairs",
                example: 'MSET key1 "value1" key2 "value2"',
            },
            {
                name: "MGET key1 [key2 ...]",
                description: "Gets the values of multiple keys",
                example: "MGET key1 key2",
            },
            {
                name: "INCR key",
                description: "Increments the integer value of a key",
                example: "INCR counter",
            },
            {
                name: "DECR key",
                description: "Decrements the integer value of a key",
                example: "DECR counter",
            },
            {
                name: "EXPIRE key seconds",
                description: "Sets a key's time to live in seconds",
                example: "EXPIRE mykey 60",
            },
            {
                name: "TTL key",
                description: "Returns the remaining time to live of a key",
                example: "TTL mykey",
            },
        ],
        useCase: `
In a real-world scenario, these basic operations can be used to build a simple caching system:

1. Use SET to store frequently accessed data in Redis.
2. Use GET to retrieve this data quickly without hitting the main database.
3. Use EXPIRE to ensure the cache stays fresh by automatically removing old entries.
4. Use INCR/DECR for maintaining counters, like tracking page views or API calls.
5. Use MSET and MGET for bulk operations, improving efficiency when dealing with multiple related pieces of data.

This caching system can significantly reduce load on your primary database and improve application response times.
      `,
    },
    challenges: [
        {
            id: 0,
            prompt: "Set a key 'mykey' with the value 'Hello Redis'",
            answer: "SET mykey 'Hello Redis'",
            regx: /^\s*[sS][eE][tT]\s+(['"]?)mykey\1\s+(['"])Hello\sRedis\2\s*$/,
            type: "command",
        },
        {
            id: 1,
            prompt: "Retrieve the value of 'mykey'",
            answer: "GET mykey",
            regx: /^\s*[gG][eE][Tt]\s+(['"]?)mykey\1\s*$/,
            type: "command",
        },
        {
            id: 2,
            prompt: "Check if 'mykey' exists",
            answer: "EXISTS mykey",
            regx: /^\s*[eE][xX][iI][sS][tT][sS]\s+(['"]?)mykey\1\s*$/,
            type: "command",
        },
        {
            id: 3,
            prompt: "Delete 'mykey'",
            answer: "DEL mykey",
            regx: /^\s*[dD][eE][lL]\s+(['"]?)mykey\1/,
            type: "command",
        },
        {
            id: 4,
            prompt: "Set keys 'fruit1' to 'apple' and 'fruit2' to 'banana' in one command",
            answer: "MSET fruit1 apple fruit2 banana",
            // it is abit longer cus it allaws for MSET fruit1 apple fruit2 banana and MSET fruit2 banana fruit1 apple
            regx: /^\s*(?!.*fruit2.*fruit2)(?!.*fruit1.*fruit1)[mM][sS][eE][tT]\s+((?:(['"]?)(fruit1)\2\s+(['"]?)(apple)\4)|(?:(['"]?)(fruit2)\6\s+(['"]?)(banana)\8))\s+((?:(['"]?)fruit1\11\s+(['"]?)apple\12)|(?:(['"]?)fruit2\13\s+(['"]?)banana\14))\s*$/,
            type: "command",
        },
        {
            id: 5,
            prompt: "Retrieve the values of both 'fruit1' and 'fruit2' in one command",
            answer: "MGET fruit1 fruit2",
            regx: /^\s*(?!.*fruit2.*fruit2)(?!.*fruit1.*fruit1)[Mm][gG][eE][Tt]\s+(?:(['"]?)fruit1\1|(['"]?)fruit2\2)\s+(?:(['"]?)fruit2\3|(['"]?)fruit1\4)\s*$/,
            type: "command",
        },
        {
            id: 6,
            prompt: "Increment the value of 'counter' by 1",
            answer: "INCR counter",
			regx: /^\s*[iI][nN][cC][rR]\s+(['"]?)counter\1\s*$/,
            type: "command",
        },
        {
            id: 7,
            prompt: "Decrement the value of 'counter' by 1",
            answer: "DECR counter",
			regx: /^\s*[dD][eE][Cc][rR]\s+(['"]?)counter\1\s*$/,
            type: "command",
        },
        {
            id: 8,
            prompt: "Set 'tempkey' to expire in 60 seconds",
            answer: "EXPIRE tempkey 60",
			regx: /^\s*[eE][xX][pP][iI][rR][eE]\s+(['"]?)tempkey\1\s+(['"]?)60\2\s*$/,
            type: "command",
        },
        {
            id: 9,
            prompt: "Check how many seconds are left until 'tempkey' expires",
            answer: "TTL tempkey",
			regx:/^\s*[tT][Tt][lL]\s+(['"]?)tempkey\1\s*$/,
            type: "command",
        },
    ],
};

export const dataStructuresContent: Section[] = [
	{
		slug: "lists",
		title: "Lists in Redis",
		content: {
			overview: `
Redis Lists are linked lists of string values. They're ideal for:
• Implementing stacks and queues
• Managing shared to-do lists
• Tracking latest items (like recent posts)
• Creating a timeline of events
      `,
			keyCommands: [
				{
					name: "LPUSH key element [element ...]",
					description: "Add one or more elements to the left (head) of the list",
					example: "LPUSH mylist world hello",
				},
				{
					name: "RPUSH key element [element ...]",
					description: "Add one or more elements to the right (tail) of the list",
					example: "RPUSH mylist good morning",
				},
				{
					name: "LRANGE key start stop",
					description: "Retrieve a range of elements from the list",
					example: "LRANGE mylist 0 -1",
				},
				{
					name: "LPOP key",
					description: "Remove and return the first element of the list",
					example: "LPOP mylist",
				},
				{
					name: "RPOP key",
					description: "Remove and return the last element of the list",
					example: "RPOP mylist",
				},
				{
					name: "LLEN key",
					description: "Get the length of the list",
					example: "LLEN mylist",
				},
				{
					name: "LINDEX key index",
					description: "Get an element from a list by its index",
					example: "LINDEX mylist 1",
				},
				{
					name: "LINSERT key BEFORE|AFTER pivot element",
					description: "Insert an element before or after another element in the list",
					example: "LINSERT mylist BEFORE world there",
				},
			],
			useCase: `
Imagine you're building a social media application. You can use Redis Lists to maintain a user's timeline:

1. When a user posts a new status, use LPUSH to add it to their timeline list.
2. To display the most recent posts, use LRANGE to retrieve a certain number of posts.
3. If you want to limit the timeline to the last 1000 posts, you can use LTRIM after each LPUSH to keep only the most recent 1000 items.

This approach ensures fast insertion of new posts and quick retrieval of the most recent content, which is crucial for a responsive social media platform.
      `,
		},
		challenges: [
			{
				id: 1,
				prompt: "Create a list 'fruits' and add 'apple' and 'banana' to it",
				answer: "LPUSH fruits apple banana",
				regx: /^\s*[lL][pP][uU][sS][hH]\s+(['"]?)fruits\1\s+(["']?)apple\2\s+(['"]?)banana\3\s*$/,
				type: "command",
			},
			{
				id: 2,
				prompt: "Retrieve all elements from the 'fruits' list",
				answer: "LRANGE fruits 0 -1",
				regx: /^\s*[lL][rR][aA][nN][Gg][eE]\s+(['"]?)fruits\1\s+(['"]?)0\2\s+(['"]?)-1\3\s*$/,
				type: "command",
			},
			{
				id: 3,
				prompt: "Add 'orange' to the right side of the 'fruits' list",
				answer: "RPUSH fruits orange",
				regx:/^\s*[rR][pP][uU][sS][hH]\s+(['"]?)fruits\1\s+(['"]?)orange\2\s*$/,
				type: "command",
			},
			{
				id: 4,
				prompt: "Remove and return the leftmost element from 'fruits'",
				answer: "LPOP fruits",
				regx: /^\s*[lL][pP][oO][pP]\s+(['"]?)fruits\1\s*$/,
				type: "command",
			},
			{
				id: 5,
				prompt: "Get the current length of the 'fruits' list",
				answer: "LLEN fruits",
				regx:/^\s*[lL][lL][eE][nN]\s+(['"]?)fruits\1\s*$/,
				type: "command",
			},
			{
				id: 6,
				prompt: "Insert 'grape' before 'orange' in the 'fruits' list",
				answer: "LINSERT fruits BEFORE orange grape",
				regx: /^\s*[lL][iI][nN][sS][Ee][rR][Tt]\s+(['"]?)fruits\1\s+[bB][eE][fF][oO][rR][Ee]\s+(['"]?)orange\2\s+(['"]?)grape\3\s*$/,
				type: "command",
			},
		],
	},
	{
		slug: "sets",
		title: "Sets in Redis",
		content: {
			overview: `
Redis Sets are unordered collections of unique strings. They're great for:
• Tracking unique items (e.g., unique visitors)
• Implementing tag systems
• Performing set operations (unions, intersections)
• Managing relationships in social networks
      `,
			keyCommands: [
				{
					name: "SADD key member [member ...]",
					description: "Add one or more members to a set",
					example: "SADD myset Hello World",
				},
				{
					name: "SMEMBERS key",
					description: "Get all members of a set",
					example: "SMEMBERS myset",
				},
				{
					name: "SISMEMBER key member",
					description: "Check if a value is in the set",
					example: "SISMEMBER myset Hello",
				},
				{
					name: "SREM key member [member ...]",
					description: "Remove one or more members from a set",
					example: "SREM myset World",
				},
				{
					name: "SCARD key",
					description: "Get the number of members in a set",
					example: "SCARD myset",
				},
				{
					name: "SINTER key [key ...]",
					description: "Perform set intersection",
					example: "SINTER set1 set2",
				},
				{
					name: "SUNION key [key ...]",
					description: "Perform set union",
					example: "SUNION set1 set2",
				},
				{
					name: "SDIFF key [key ...]",
					description: "Perform set difference",
					example: "SDIFF set1 set2",
				},
			],
			useCase: `
Consider a music streaming service where you want to recommend new artists to users based on their listening history:

1. For each user, maintain a set of artist IDs they've listened to.
2. When a user listens to a new artist, add the artist ID to their set using SADD.
3. To find common artists between two users, use SINTER.
4. To recommend new artists, you could use SDIFF between a user's set and a set of popular artists they haven't listened to yet.

This approach allows for quick comparisons between user preferences and efficient generation of recommendations, which is crucial for a personalized user experience in a music streaming platform.
      `,
		},
		challenges: [
			{
				id: 1,
				prompt: "Create a set 'colors' with 'red', 'blue', and 'green'",
				answer: "SADD colors red blue green",
				// it is that long cus it support onother oreder of ther answer cus the set doesn't save the order 
				regx: /^\s*[sS][aA][Dd][Dd]\s+(['"]?)colors\1\s+(?!.*red.*red)(?!.*green.*green)(?!.*blue.*blue)(?:(['"]?)red\2|(['"]?)blue\3|(['"]?)green\4)\s+(?:(['"]?)red\5|(['"]?)blue\6|(['"]?)green\7)\s+(?:(['"]?)red\8|(['"]?)blue\9|(['"]?)green\10)\s*$/,
				type: "command",
			},
			{
				id: 2,
				prompt: "Check if 'yellow' is in the 'colors' set",
				answer: "SISMEMBER colors yellow",
				regx: /^\s*[sS][iI][sS][mM][eE][mM][bB][eE][rR]\s+(['"]?)colors\1\s+(['"]?)yellow\2\s*$/,
				type: "command",
			},
			{
				id: 3,
				prompt: "Add 'blue' to 'colors' again (notice it won't add a duplicate)",
				answer: "SADD colors blue",
				regx: /^\s*[sS][aA][Dd][dD]\s+(['"]?)colors\1\s+(['"]?)blue\2\s*$/,
				type: "command",
			},
			{
				id: 4,
				prompt: "Remove 'green' from the 'colors' set",
				answer: "SREM colors green",
				regx:/^\s*[sS][rR][eE][mM]\s+(['"]?)colors\1\s+(["']?)green\2/,
				type: "command",
			},
			{
				id: 5,
				prompt: "Get the number of colors in the 'colors' set",
				answer: "SCARD colors",
				regx: /^\s*[sS][Cc][Aa][rR][dD]\s+(['"]?)colors\1\s*$/,
				type: "command",
			},
			{
				id: 6,
				prompt: "Create a new set 'primary_colors' with 'red', 'blue', and 'yellow', then find the intersection with 'colors' ( separate them by a semicolon ) ",
				answer: "SADD primary_colors red blue yellow; SINTER colors primary_colors",
				// this one took along time to make (^人^) it had a bug in it (ಥ _ ಥ)
				regx: /^\s*[sS][aA][Dd][Dd]\s+(['"]?)primary_colors\1\s+(?!.*red.*red)(?!.*yellow.*yellow)(?!.*blue.*blue)(?:(['"]?)red\2|(['"]?)yellow\3|(['"]?)blue\4)\s+(?:(['"]?)red\5|(['"]?)yellow\6|(['"]?)blue\7)\s+(?:(['"]?)red\8|(['"]?)yellow\9|(['"]?)blue\10)\s*;\s*[sS][iI][nN][tT][eE][rR]\s+(['"]?)colors\11\s+(['"]?)primary_colors\12\s*$/m,
				type: "command",
			},
		],
	},
	{
		slug: "hashes",
		title: "Hashes in Redis",
		content: {
			overview: `
Redis Hashes are maps between string fields and string values. They're perfect for:
• Representing objects
• Storing user profiles or configurations
• Tracking multiple related pieces of data
• Caching database rows or API responses
      `,
			keyCommands: [
				{
					name: "HSET key field value [field value ...]",
					description: "Set field(s) in a hash",
					example: 'HSET user:1 name "John Doe" email john@example.com',
				},
				{
					name: "HGET key field",
					description: "Get the value of a field",
					example: "HGET user:1 name",
				},
				{
					name: "HGETALL key",
					description: "Get all fields and values in the hash",
					example: "HGETALL user:1",
				},
				{
					name: "HDEL key field [field ...]",
					description: "Delete field(s) from the hash",
					example: "HDEL user:1 email",
				},
				{
					name: "HEXISTS key field",
					description: "Check if a field exists in the hash",
					example: "HEXISTS user:1 name",
				},
				{
					name: "HKEYS key",
					description: "Get all field names in the hash",
					example: "HKEYS user:1",
				},
				{
					name: "HVALS key",
					description: "Get all values in the hash",
					example: "HVALS user:1",
				},
				{
					name: "HINCRBY key field increment",
					description: "Increment the integer value of a field by a number",
					example: "HINCRBY user:1 age 1",
				},
			],
			useCase: `
Imagine you're building an e-commerce platform and need to store product information:

1. Each product can be represented as a hash, with the key being "product:{id}".
2. Use HSET to store various attributes of the product (name, price, stock, etc.).
3. Use HGET to quickly retrieve specific attributes without loading the entire product data.
4. Use HGETALL to get all product details when needed.
5. Use HINCRBY to manage stock levels or track the number of views/purchases.

This structure allows for efficient storage and retrieval of product data, easy updates to individual fields, and atomic operations on numeric values, which is crucial for maintaining accurate inventory in a high-traffic e-commerce system.
      `,
		},
		challenges: [
			{
				id: 1,
				prompt: "Create a hash 'user:1' with fields 'name' (John Doe) and 'email' (john@example.com)",
				answer: 'HSET user:1 name "John Doe" email john@example.com',
				regx: /^\s*(?!.*name.*name)(?!.*email.*email)[hH][Ss][eE][tT]\s+(['"]?)user:1\1\s+(?:(['"]?)name\2\s+(['"])John Doe\3|(['"]?)email\4\s+(['"]?)john@example\.com\5)\s+(?:(['"]?)name\6\s+(['"])John Doe\7|(['"]?)email\8\s+(['"]?)john@example\.com\9)\s*$/,
				type: "command",
			},
			{
				id: 2,
				prompt: "Get the 'name' of 'user:1'",
				answer: "HGET user:1 name",
				regx: /^\s*[hH][gG][eE][tT]\s+(['"]?)user:1\1\s+(['"]?)name\2\s*$/,
				type: "command",
			},
			{
				id: 3,
				prompt: "Add an 'age' field with value '30' to 'user:1'",
				answer: "HSET user:1 age 30",
				regx: /^\s*[hH][sS][eE][tT]\s+(['"]?)user:1\1\s+(['"]?)age\2\s+(['"]?)30\3\s*$/,
				type: "command",
			},
			{
				id: 4,
				prompt: "Retrieve all fields and values of 'user:1'",
				answer: "HGETALL user:1",
				regx: /^\s*[hH][gG][eE][tT][aA][lL][Ll]\s+(['"]?)user:1\1\s*$/,
				type: "command",
			},
			{
				id: 5,
				prompt: "Check if 'user:1' has a 'phone' field",
				answer: "HEXISTS user:1 phone",
				regx:/^\s*[hH][eE][xX][iI][sS][tT][sS]\s+(['"]?)user:1\1\s+(["']?)phone\2\s*$/,
				type: "command",
			},
			{
				id: 6,
				prompt: "Increment the 'age' of 'user:1' by 1",
				answer: "HINCRBY user:1 age 1",
				regx:/^\s*[hH][iI][nN][cC][rR][bB][yY]\s+(['"]?)user:1\1\s+(['"]?)age\2\s+(['"]?)1\3\s*$/,
				type: "command",
			},
		],
	},
	{
		slug: "sorted-sets",
		title: "Sorted Sets in Redis",
		content: {
			overview: `
Redis Sorted Sets are sets where each member has an associated score. They're useful for:
1. Leaderboards and ranking systems
2. Priority queues
3. Time-series data
4. Managing queues with priority
      `,
			keyCommands: [
				{
					name: "ZADD key score member [score member ...]",
					description: "Add member(s) with scores to a sorted set",
					example: "ZADD leaderboard 100 Alice 95 Bob 97 Charlie",
				},
				{
					name: "ZRANGE key start stop [WITHSCORES]",
					description: "Retrieve members by index range (low to high score)",
					example: "ZRANGE leaderboard 0 -1 WITHSCORES",
				},
				{
					name: "ZREVRANGE key start stop [WITHSCORES]",
					description: "Retrieve members by index range (high to low score)",
					example: "ZREVRANGE leaderboard 0 -1 WITHSCORES",
				},
				{
					name: "ZRANK key member",
					description: "Get the rank of a member (by low to high score)",
					example: "ZRANK leaderboard Bob",
				},
				{
					name: "ZREVRANK key member",
					description: "Get the rank of a member (by high to low score)",
					example: "ZREVRANK leaderboard Bob",
				},
				{
					name: "ZSCORE key member",
					description: "Get the score of a member",
					example: "ZSCORE leaderboard Alice",
				},
				{
					name: "ZREM key member [member ...]",
					description: "Remove member(s) from the sorted set",
					example: "ZREM leaderboard Bob",
				},
				{
					name: "ZINCRBY key increment member",
					description: "Increment the score of a member",
					example: "ZINCRBY leaderboard 5 Alice",
				},
			],
			useCase: `
Consider a real-time analytics system for a popular website:

1. Use a sorted set for each metric you want to track (e.g., page views, unique visitors).
2. The score can be the timestamp, and the member can be the page URL or user ID.
3. Use ZADD to add new data points as they come in.
4. Use ZRANGE with WITHSCORES to get data for a specific time range.
5. Use ZCOUNT to get the number of events in a time range.
6. Use ZREMRANGEBYSCORE to remove old data and maintain a rolling window of recent data.

This structure allows for efficient storage and retrieval of time-series data, easy querying of recent events, and automatic ordering by timestamp, which is crucial for real-time analytics and reporting.
      `,
		},
		challenges: [
			{
				id: 1,
				prompt: "Create a sorted set 'leaderboard' with members: Alice (score: 100), Bob (score: 85), Charlie (score: 95)",
				answer: "ZADD leaderboard 100 Alice 85 Bob 95 Charlie",
				// it is long for the same reason 
				regx: /^\s*[zZ][aA][dD][dD]\s+(['"]?)leaderboard\1\s+(?!.*Alice.*Alice)(?!.*Charlie.*Charlie)(?!.*Bob.*Bob)(?:(['"]?)100\2\s+(['"]?)Alice\3|(['"]?)95\4\s+(['"]?)Charlie\5|(['"]?)85\6\s+(['"]?)Bob\7)\s+(?:(['"]?)100\8\s+(['"]?)Alice\9|(['"]?)95\10\s+(['"]?)Charlie\11|(['"]?)85\12\s+(['"]?)Bob\13)\s+(?:(['"]?)100\14\s+(['"]?)Alice\15|(['"]?)95\16\s+(['"]?)Charlie\17|(['"]?)85\18\s+(['"]?)Bob\19)\s*$/,
				type: "command",
			},
			{
				id: 2,
				prompt: "Get the top 2 players from the 'leaderboard'",
				answer: "ZREVRANGE leaderboard 0 1",
				regx: /^\s*[zZ][rR][eE][vV][rR][aA][nN][gG][eE]\s+(['"]?)leaderboard\1\s+(['"]?)0\2\s+(['"]?)1\3\s*$/,
				type: "command",
			},
			{
				id: 3,
				prompt: "Get Bob's rank in the 'leaderboard' (0-based, high to low score)",
				answer: "ZREVRANK leaderboard Bob",
				regx: /^\s*[zZ][rR][eE][vV][rR][aA][nN][kK]\s+(['"]?)leaderboard\1\s+(['"]?)Bob\2\s*$/,
				type: "command",
			},
			{
				id: 4,
				prompt: "Get Charlie's score",
				answer: "ZSCORE leaderboard Charlie",
				regx: /^\s*[zZ][sS][cC][oO][rR][eE]\s+(['"]?)leaderboard\1\s+(['"]?)Charlie\2\s*$/,
				type: "command",
			},
			{
				id: 5,
				prompt: "Increase Alice's score by 15 points",
				answer: "ZINCRBY leaderboard 15 Alice",
				regx: /^\s*[zZ][iI][nN][cC][rR][bB][yY]\s+(['"]?)leaderboard\1\s+(['"]?)15\2\s+(["']?)Alice\3\s*$/,
				type: "command",
			},
			{
				id: 6,
				prompt: "Get all scores and members, ordered from lowest to highest score",
				answer: "ZRANGE leaderboard 0 -1 WITHSCORES",
				regx: /^\s*[zZ][rR][aA][nN][gG][eE]\s+(['"]?)leaderboard\1\s+(['"]?)0\2\s+(['"]?)-1\3\s+[wW][iI][tT][hH][sS][cC][oO][rR][eE][sS]\s*$/,
				type: "command",
			},
		],
	},
];
