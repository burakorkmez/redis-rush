"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { problems } from "@/utils/problems";
import {
	ChevronRight,
	Lock,
	Database,
	List,
	Hash,
	Layers,
	BarChart3,
	ExternalLink,
	Cloud,
	DollarSign,
	Zap,
	Info,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ChallengePage = () => {
	const router = useRouter();
	const [showUpstashInfo, setShowUpstashInfo] = useState(false);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "h" || event.key === "H") {
				setShowUpstashInfo(true);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
			},
		}),
	};

	const iconVariants = {
		hover: { scale: 1.1, transition: { duration: 0.2 } },
	};

	const problemIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
		"basic-caching": Database,
		"list-operations": List,
		"hash-operations": Hash,
		"set-operations": Layers,
		"sorted-set-operations": BarChart3,
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty.toLowerCase()) {
			case "easy":
				return "bg-green-400 text-black";
			case "medium":
				return "bg-yellow-400 text-black";
			case "hard":
				return "bg-red-400 text-black";
			default:
				return "bg-gray-400 text-black";
		}
	};

	const getIconColor = (difficulty: string) => {
		switch (difficulty.toLowerCase()) {
			case "easy":
				return "text-green-400";
			case "medium":
				return "text-yellow-400";
			case "hard":
				return "text-red-400";
			default:
				return "text-gray-400";
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8'>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.5 }}
				className='fixed z-10 top-20 right-4 flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-700'
			>
				<Info className='w-4 h-4 text-emerald-400' />
				<p className='text-gray-300 text-sm'>Press</p>
				<kbd className='px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md shadow'>H</kbd>
				<p className='text-gray-300 text-sm'>
					to learn about
					<span className='text-emerald-400 font-bold'> Upstash</span>
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-6xl mx-auto mt-5'
			>
				<h1 className='text-5xl font-bold mb-2 text-center text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text'>
					Upstash Redis Challenges
				</h1>
				<p className='text-xl text-center text-gray-400 mb-12'>Master Redis with hands-on exercises</p>

				<Dialog open={showUpstashInfo} onOpenChange={setShowUpstashInfo}>
					<DialogContent className='bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 border-gray-700 shadow-xl max-w-2xl'>
						<DialogHeader>
							<DialogTitle className='text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400'>
								What is Upstash?
							</DialogTitle>
						</DialogHeader>
						<DialogDescription className='text-gray-300'>
							<p className='mb-6 text-lg'>
								Upstash is the serverless Redis solution that you want to learn. Here's why it's the
								perfect fit:
							</p>
							<div className='grid grid-cols-2 gap-6'>
								<FeatureCard icon={<Cloud className='w-6 h-6 text-blue-400' />} title='Serverless'>
									True serverless architecture for modern development
								</FeatureCard>
								<FeatureCard
									icon={<DollarSign className='w-6 h-6 text-green-400' />}
									title='Cost-Effective'
								>
									Pay-per-use model optimized for varying workloads
								</FeatureCard>
								<FeatureCard icon={<Zap className='w-6 h-6 text-yellow-400' />} title='Low Latency'>
									Blazing fast response times for our challenges
								</FeatureCard>
								<FeatureCard
									icon={<Layers className='w-6 h-6 text-purple-400' />}
									title='Redis Compatible'
								>
									Supports standard Redis commands and data structures
								</FeatureCard>
							</div>
							<p className='mt-6 text-lg'>
								With Upstash, you're learning Redis in a cutting-edge, cloud-native environment that's
								built for the future of web development.
							</p>
							<motion.a
								href='https://upstash.com'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 transition-colors'
								whileHover={{ x: 5 }}
							>
								Learn more about Upstash <ExternalLink className='ml-2 w-4 h-4' />
							</motion.a>
						</DialogDescription>
					</DialogContent>
				</Dialog>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{problems.map((problem, index) => {
						const IconComponent = problemIcons[problem.slug] || Database;
						const iconColor = getIconColor(problem.difficulty);
						return (
							<motion.div
								key={problem.slug}
								variants={cardVariants}
								initial='hidden'
								animate='visible'
								custom={index}
								whileHover='hover'
							>
								<Card
									className='bg-gray-800/50 backdrop-blur-sm border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-all duration-300 shadow-lg hover:shadow-xl 
									h-full '
									onClick={() => router.push(`/learn-upstash/${problem.slug}`)}
								>
									<CardHeader>
										<div className='flex items-center justify-between'>
											<div className='flex items-center'>
												<motion.div
													variants={iconVariants}
													className={`mr-3 p-2 bg-${
														iconColor.split("-")[1]
													}-500/10 rounded-full`}
												>
													<IconComponent className={`w-6 h-6 ${iconColor}`} />
												</motion.div>
												<span className='text-gray-100'>{problem.title}</span>
											</div>
											<div className='flex items-center space-x-2'>
												<span
													className={`text-xs font-semibold py-1 px-2 rounded-full ${getDifficultyColor(
														problem.difficulty
													)}`}
												>
													{problem.difficulty}
												</span>
												<ChevronRight className='w-5 h-5 text-gray-400' />
											</div>
										</div>
									</CardHeader>
								</Card>
							</motion.div>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className='mt-16 text-center'
				>
					<h2 className='text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400'>
						More Challenges Coming Soon!
					</h2>
					<div className='grid gap-6 md:grid-cols-3'>
						{[1, 2, 3].map((_, index) => (
							<Card key={index} className='bg-gray-800/30 backdrop-blur-sm border-gray-700'>
								<CardHeader>
									<CardTitle className='flex justify-between items-center text-gray-400'>
										<span className='flex items-center'>
											<motion.div
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.3 }}
												className='mr-3 p-2 bg-emerald-500/10 rounded-full'
											>
												<Lock className='w-5 h-5 text-emerald-400' />
											</motion.div>
											Coming Soon
										</span>
									</CardTitle>
									<CardDescription className='text-gray-500 mt-2'>
										New exciting challenge on its way...
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ChallengePage;

const FeatureCard = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
	<div className='bg-gray-800/50 p-4 rounded-lg border border-gray-700'>
		<div className='flex items-center mb-2'>
			{icon}
			<h3 className='ml-2 text-lg font-semibold'>{title}</h3>
		</div>
		<p className='text-gray-400'>{children}</p>
	</div>
);
