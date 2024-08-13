"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeSection from "@/components/ChallengeSection";
import LearningSection from "@/components/LearningSection";
import Congrats from "@/components/Congrats";
import ProgressBar from "@/components/ProgressBar";
import { redisBasicsContent } from "@/utils/constants";

export default function RedisBasics() {
	const [currentSection, setCurrentSection] = useState(0);
	const [currentChallenge, setCurrentChallenge] = useState(0);
	const [activeTab, setActiveTab] = useState("learn");
	const [showCongrats, setShowCongrats] = useState(false);

	const isLastChallenge = currentChallenge === redisBasicsContent.challenges.length - 1;

	const handleNext = () => {
		if (activeTab === "learn") {
			setActiveTab("challenge");
		} else {
			if (currentChallenge < redisBasicsContent.challenges.length - 1) {
				setCurrentChallenge(currentChallenge + 1);
			} else {
				setShowCongrats(true);
			}
		}
	};

	const handlePrevious = () => {
		if (activeTab === "challenge" && currentChallenge === 0) {
			setActiveTab("learn");
		} else if (currentChallenge > 0) {
			setCurrentChallenge(currentChallenge - 1);
		} else if (currentSection > 0) {
			setCurrentSection(currentSection - 1);
			setCurrentChallenge(redisBasicsContent.challenges.length - 1);
			setActiveTab("challenge");
		}
	};

	return (
		<Suspense>
			<div className='min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden'>
				{/* Blurry radial gradient */}
				<div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
					<div className='absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-500 rounded-full filter blur-[150px] opacity-20 ' />
				</div>

				<div className='relative z-10'>
					<main className='container mx-auto px-4 py-16 max-w-4xl'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='text-center mb-12'
						>
							<h1 className='text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600'>
								Redis Basics
							</h1>
							<p className='text-xl text-gray-300 mb-4'>
								Challenge {currentChallenge + 1} of {redisBasicsContent.challenges.length}
							</p>
							<ProgressBar
								currentSection={currentSection}
								totalSections={1}
								currentChallenge={currentChallenge}
								totalChallenges={redisBasicsContent.challenges.length}
								isLastChallenge={isLastChallenge}
							/>
						</motion.div>

						<Card className='bg-gray-800 border-gray-700'>
							<CardHeader />
							<CardContent>
								<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
									<TabsList className='grid w-full grid-cols-2 bg-gray-700/50 p-1 rounded-lg'>
										<TabsTrigger
											value='learn'
											className='relative text-gray-300 transition-all data-[state=active]:text-green-400'
										>
											Learn
										</TabsTrigger>
										<TabsTrigger
											value='challenge'
											className='relative text-gray-300 transition-all data-[state=active]:text-green-400'
										>
											Challenge
										</TabsTrigger>
									</TabsList>
									<TabsContent value='learn'>
										<LearningSection section={redisBasicsContent} onNext={handleNext} />
									</TabsContent>
									<TabsContent value='challenge'>
										<ChallengeSection
											challenge={redisBasicsContent.challenges[currentChallenge]}
											onNext={handleNext}
											onPrevious={handlePrevious}
										/>
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					</main>
				</div>
				{showCongrats && <Congrats onClose={() => setShowCongrats(false)} />}
			</div>
		</Suspense>
	);
}
