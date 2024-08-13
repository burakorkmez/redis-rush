import { challenges } from "@/utils/constants";
import { motion } from "framer-motion";
import { useState } from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MotionCard = motion(Card);

const ChallengeCards = () => {
	const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);

	return (
		<>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1.2 }}
				className='text-4xl font-bold text-center mb-10 text-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600'
			>
				Choose Your Path
			</motion.h2>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{challenges.map((challenge, index) => (
					<MotionCard
						key={challenge.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 + 1.4 }}
						className={`overflow-hidden bg-gray-800 border-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:border-teal-500`}
						onMouseEnter={() => setHoveredChallenge(challenge?.id)}
						onMouseLeave={() => setHoveredChallenge(null)}
					>
						<CardHeader className='pb-4'>
							<motion.div
								className={`w-16 h-16 rounded-full bg-gradient-to-br ${challenge.color} flex items-center justify-center mb-4`}
								animate={{
									scale: hoveredChallenge === challenge.id ? 1.1 : 1,
									rotate: hoveredChallenge === challenge.id ? 360 : 0,
								}}
								transition={{ duration: 0.3 }}
							>
								<challenge.icon className='w-8 h-8 text-white' />
							</motion.div>
							<CardTitle className='text-2xl font-bold text-gray-100'>{challenge.title}</CardTitle>
							<CardDescription className='text-gray-400'>{challenge.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Button
								asChild
								className={`w-full bg-gradient-to-r ${challenge.color} hover:opacity-90 text-white border-0 transition-all duration-300 transform hover:scale-105`}
							>
								<Link href={challenge.href} className='flex items-center justify-center'>
									Start Challenge
								</Link>
							</Button>
						</CardContent>
					</MotionCard>
				))}
			</div>
		</>
	);
};
export default ChallengeCards;
