"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressBar from "@/components/ProgressBar";
import LearningSection from "@/components/LearningSection";
import ChallengeSection from "@/components/ChallengeSection";
import Congrats from "@/components/Congrats";
import { dataStructuresContent } from "@/utils/constants";

export default function DataStructurePage() {
	const router = useRouter();
	const { slug } = useParams();
	const [content, setContent] = useState<any>(null);
	const [currentChallenge, setCurrentChallenge] = useState(0);
	const [activeTab, setActiveTab] = useState("learn");
	const [showCongrats, setShowCongrats] = useState(false);

	useEffect(() => {
		const structureContent = dataStructuresContent.find((s) => s.slug === slug);
		if (structureContent) {
			setContent(structureContent);
		} else {
			router.push("/redis-data-structures");
		}
	}, [slug, router]);

	if (!content) {
		return null;
	}

	const isLastChallenge = currentChallenge === content.challenges.length - 1;

	const handleNext = () => {
		if (activeTab === "learn") {
			setActiveTab("challenge");
		} else if (currentChallenge < content.challenges.length - 1) {
			setCurrentChallenge(currentChallenge + 1);
		} else {
			setShowCongrats(true);
		}
	};

	const handlePrevious = () => {
		if (activeTab === "challenge" && currentChallenge === 0) {
			setActiveTab("learn");
		} else if (currentChallenge > 0) {
			setCurrentChallenge(currentChallenge - 1);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100'>
			<main className='container mx-auto px-4 py-16 max-w-4xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-12'
				>
					<h1 className='text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600'>
						{content.title}
					</h1>
					<p className='text-xl text-gray-300 mb-4'>Master the power of {content.title}</p>
					<ProgressBar
						currentSection={dataStructuresContent.findIndex((s) => s.slug === slug)}
						totalSections={dataStructuresContent.length}
						currentChallenge={currentChallenge}
						totalChallenges={dataStructuresContent.find((s) => s.slug === slug)!.challenges.length}
						isLastChallenge={isLastChallenge}
					/>
				</motion.div>

				<Card className='bg-gray-800 border-gray-700 shadow-lg'>
					<CardContent className='p-6'>
						<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
							<TabsList className='grid w-full grid-cols-2'>
								<TabsTrigger value='learn'>Learn</TabsTrigger>
								<TabsTrigger value='challenge'>Challenge</TabsTrigger>
							</TabsList>
							<TabsContent value='learn'>
								<LearningSection section={content} onNext={handleNext} />
							</TabsContent>
							<TabsContent value='challenge'>
								<ChallengeSection
									challenge={content.challenges[currentChallenge]}
									onNext={handleNext}
									onPrevious={handlePrevious}
								/>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</main>
			{showCongrats && <Congrats onClose={() => setShowCongrats(false)} />}
		</div>
	);
}
