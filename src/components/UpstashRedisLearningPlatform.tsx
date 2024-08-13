import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Code, Type, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Problem } from "../utils/problems";
import { useToast } from "@/components/ui/use-toast";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

interface UpstashRedisLearningPlatformProps {
	problem: Problem;
	onNextProblem: () => void;
	onPreviousProblem: () => void;
	hasNextProblem: boolean;
	hasPreviousProblem: boolean;
}

// TODO: should be in a separate file
class MockRedis {
	private storage: { [key: string]: any } = {};

	async set(key: string, value: any, options?: { ex?: number }) {
		this.storage[key] = { value, expiry: options?.ex ? Date.now() + options.ex * 1000 : null };
		return "OK";
	}

	async get(key: string) {
		const item = this.storage[key];
		if (item && (!item.expiry || item.expiry > Date.now())) {
			return item.value;
		}
		return null;
	}

	async rpush(key: string, value: any) {
		if (!Array.isArray(this.storage[key])) {
			this.storage[key] = [];
		}
		this.storage[key].push(value);
		return this.storage[key].length;
	}

	async lpop(key: string) {
		if (Array.isArray(this.storage[key]) && this.storage[key].length > 0) {
			return this.storage[key].shift();
		}
		return null;
	}

	async hset(key: string, field: string, value: any) {
		if (typeof this.storage[key] !== "object" || this.storage[key] === null) {
			this.storage[key] = {};
		}
		this.storage[key][field] = value;
		return 1;
	}

	async hgetall(key: string) {
		return this.storage[key] || null;
	}

	async incr(key: string) {
		if (typeof this.storage[key] !== "number") {
			this.storage[key] = 0;
		}
		this.storage[key]++;
		return this.storage[key];
	}

	async setnx(key: string, value: any) {
		if (this.storage[key] === undefined) {
			this.storage[key] = value;
			return 1;
		}
		return 0;
	}

	async del(key: string) {
		const existed = key in this.storage;
		delete this.storage[key];
		return existed ? 1 : 0;
	}

	async exists(key: string) {
		return key in this.storage ? 1 : 0;
	}

	async sadd(key: string, value: any) {
		if (!Array.isArray(this.storage[key])) {
			this.storage[key] = [];
		}
		if (!this.storage[key].includes(value)) {
			this.storage[key].push(value);
			return 1;
		}
		return 0;
	}

	async smembers(key: string) {
		return Array.isArray(this.storage[key]) ? this.storage[key] : [];
	}

	async publish(channel: string, message: string) {
		console.log(`Published to ${channel}: ${message}`);
		return 0; // returns 0  bc we don't have actual subscribers in this mock
	}
}

const UpstashRedisLearningPlatform = ({
	problem,
	onNextProblem,
	onPreviousProblem,
	hasNextProblem,
	hasPreviousProblem,
}: UpstashRedisLearningPlatformProps) => {
	const [code, setCode] = useState(problem.initialCode);
	const [fontSize, setFontSize] = useState(14);
	const [showConfetti, setShowConfetti] = useState(false);
	const { toast } = useToast();

	const highlightText = (hint: string) => {
		return hint.split(/(`[^`]+`)/g).map((part, index) => {
			if (part.startsWith("`") && part.endsWith("`")) {
				return (
					<span key={index} className='bg-gray-700 text-gray-200 px-1 rounded'>
						{part.slice(1, -1)}
					</span>
				);
			}
			return part;
		});
	};

	const runTests = useCallback(async () => {
		const results = [];
		const client = new MockRedis();

		try {
			// Strip out the "do not modify" section
			const userCode = code.split("/* DO NOT MODIFY THE CODE ABOVE */")[1];

			const userCodeFunction = new Function(
				"client",
				`
				${userCode}
				return {
					${userCode
						.match(/async function (\w+)/g)
						?.map((match) => match.split(" ")[2])
						.join(", ")}
				};
			`
			);

			const userFunctions = userCodeFunction(client);

			for (const testCase of problem.testCases) {
				try {
					const passed = await testCase.run(userFunctions);
					results.push({
						name: testCase.name,
						passed,
						message: passed ? "Passed" : "Failed",
					});
				} catch (error: any) {
					results.push({
						name: testCase.name,
						passed: false,
						message: `Error: ${error.message}`,
					});
				}
			}
		} catch (error: any) {
			results.push({
				name: "Code Execution",
				passed: false,
				message: `Error: ${error.message}`,
			});
		}

		const allPassed = results.every((result) => result.passed);
		if (allPassed) {
			setShowConfetti(true);
			toast({
				title: "Congratulations!",
				description: "All tests passed successfully!",
			});
		} else {
			toast({
				title: "Tests Failed",
				description: "Some tests did not pass. Check the results for details.",
				variant: "destructive",
			});
		}
	}, [code, problem.testCases, toast]);

	return (
		<>
			<div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 sm:p-8 overflow-hidden'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='max-w-screen-2xl mx-auto flex flex-col'
				>
					<ResizablePanelGroup direction='horizontal' className='flex-1 gap-1'>
						<ResizablePanel defaultSize={50}>
							<Tabs defaultValue='description' className='h-full flex flex-col'>
								<TabsList className='grid w-full grid-cols-2'>
									<TabsTrigger value='description'>Description</TabsTrigger>
									<TabsTrigger value='hints'>Hints</TabsTrigger>
								</TabsList>
								<TabsContent value='description' className='flex-1 overflow-auto'>
									<Card className='bg-gray-800/50 backdrop-blur-sm border-gray-700 h-full overflow-auto'>
										<CardContent className='p-6'>
											<div className='flex items-center justify-between mb-4'>
												<h1
													className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
														problem.difficulty === "easy"
															? "from-green-400 to-green-500"
															: problem.difficulty === "medium"
															? "from-yellow-400 to-yellow-500"
															: "from-red-400 to-red-500"
													} mb-4 sm:mb-0`}
												>
													{problem.title}
												</h1>
												<span
													className={`px-2 py-1 rounded-full text-sm font-medium ${
														problem.difficulty === "easy"
															? "bg-green-500 text-green-100"
															: problem.difficulty === "medium"
															? "bg-yellow-500 text-yellow-100"
															: "bg-red-500 text-red-100"
													}`}
												>
													{problem.difficulty}
												</span>
											</div>
											<p className='mb-4 text-gray-300'>{highlightText(problem.description)}</p>

											<h3 className='text-xl font-semibold my-4 flex items-center'>
												Example Usage
											</h3>
											<SyntaxHighlighter
												language='javascript'
												style={vscDarkPlus}
												customStyle={{
													backgroundColor: "#282C34",
													padding: "1rem",
													borderRadius: "0.5rem",
													fontSize: "1.1em",
												}}
												codeTagProps={{}}
											>
												{problem.exampleUsage}
											</SyntaxHighlighter>
										</CardContent>
									</Card>
								</TabsContent>
								<TabsContent value='hints' className='h-[calc(100%-40px)] overflow-auto'>
									<Card className='bg-gray-800/50 backdrop-blur-sm border-gray-700 h-full'>
										<CardContent className='p-6'>
											<h2 className='text-2xl font-semibold mb-4 flex items-center'>Hints</h2>
											<ul className='list-disc pl-5 space-y-2 text-gray-300'>
												{problem.hints.map((hint, index) => (
													<li key={index} className='flex items-start space-x-2'>
														<span className='text-gray-400'>•</span>
														<span>{highlightText(hint)}</span>
													</li>
												))}
											</ul>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={50}>
							<Card className='bg-gray-800/50 backdrop-blur-sm border-gray-700 h-full flex flex-col overflow-hidden'>
								<div className='flex items-center justify-between bg-gray-800/80 px-4 py-2 overflow-auto'>
									<h3 className='text-lg font-semibold'>Solution</h3>
									<div className='flex items-center gap-2'>
										<div className='flex items-center'>
											<Type className='h-4 w-4 mr-2 text-gray-400' />
											<Slider
												value={[fontSize]}
												onValueChange={(value) => setFontSize(value[0])}
												min={10}
												max={24}
												step={1}
												className='w-24'
											/>
											<span className='ml-2 text-sm text-gray-400'>{fontSize}px</span>
										</div>
										<Button
											size='sm'
											variant='outline'
											className='text-emerald-300 border-emerald-600 hover:bg-emerald-900/20'
											onClick={runTests}
										>
											<Play className='mr-2 h-4 w-4' /> Run Tests
										</Button>
										<Button
											size='sm'
											variant='outline'
											className='text-emerald-300 border-emerald-600 hover:bg-emerald-900/20'
											onClick={() => {
												setCode(problem.solutionCode);
											}}
										>
											<Eye className='mr-2 h-4 w-4' /> Reveal Solution
										</Button>
										<Button
											variant='outline'
											className='text-emerald-300 border-emerald-600 hover:bg-emerald-900/20'
											onClick={onPreviousProblem}
											size={"sm"}
											disabled={!hasPreviousProblem}
										>
											<ChevronLeft className='size-6' />
										</Button>
										<Button
											variant='outline'
											className='text-emerald-300 border-emerald-600 hover:bg-emerald-900/20'
											onClick={onNextProblem}
											size={"sm"}
											disabled={!hasNextProblem}
										>
											<ChevronRight className='size-6' />
										</Button>
									</div>
								</div>
								<div className='h-full flex-1 overflow-auto'>
									<CodeMirror
										value={code}
										theme='dark'
										className='h-full'
										height='100%'
										extensions={[javascript({ jsx: true })]}
										onChange={(value) => setCode(value)}
										style={{ fontSize: `${fontSize}px` }}
									/>
								</div>
							</Card>
						</ResizablePanel>
					</ResizablePanelGroup>
				</motion.div>
			</div>

			{showConfetti && (
				<ReactConfetti
					width={window.innerWidth - 30}
					height={window.innerHeight - 1}
					numberOfPieces={1000}
					recycle={false}
				/>
			)}
		</>
	);
};

export default UpstashRedisLearningPlatform;
