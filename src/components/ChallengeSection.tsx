import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import RedisCLI from "./RedisCli";
import type { Challenge } from "@/utils/constants";
type ChallengeSectionProps = {
	challenge: Challenge;
	onNext: () => void;
	onPrevious: () => void;
};

const ChallengeSection = ({ challenge, onNext, onPrevious }: ChallengeSectionProps) => {
	const [feedback, setFeedback] = useState("");
	const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
	const [showSolution, setShowSolution] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (isChallengeCompleted) {
			const timer = setTimeout(() => {
				setIsTransitioning(true);
				setTimeout(() => {
					setFeedback("");
					setIsChallengeCompleted(false);
					setIsTransitioning(false);
				}, 300);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [isChallengeCompleted]);

	const handleSubmit = async (input: string) => {
		//TODO make it a regx

		if ( (challenge.regx && challenge.regx.test(input)) || input.toLowerCase().trim() === challenge.answer.toLowerCase()) {
			RightAnswer();
			return
		}
			setFeedback("Not quite. Try again!");
			setIsChallengeCompleted(false);
		

		function RightAnswer() {
			setFeedback("Correct! Great job!");
			setIsChallengeCompleted(true);
			setShowSolution(false);
			onNext();
		}
	};

	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-gray-100'>Challenge</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-gray-300 mb-4'>
					<Terminal className='w-6 h-6 inline-block mr-2 text-green-400' />
					{challenge.prompt}
				</p>
				<RedisCLI onSubmit={handleSubmit} />
				{feedback && (
					<p
						className={`mt-4 p-2 rounded text-white transition-opacity duration-300 ${
							isTransitioning ? "opacity-0" : "opacity-100"
						}`}
						style={{
							backgroundColor: isChallengeCompleted ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
							borderColor: isChallengeCompleted ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
							borderWidth: 1,
						}}
					>
						{isChallengeCompleted ? (
							<CheckCircle2 className='w-5 h-5 inline-block mr-2' />
						) : (
							<AlertCircle className='w-5 h-5 inline-block mr-2' />
						)}
						{feedback}
					</p>
				)}
				{showSolution && (
					<div className='mt-4 p-4 rounded border border-gray-600 bg-gray-800'>
						<p className='text-gray-300'>
							<strong>Solution:</strong> {challenge.answer}
						</p>
					</div>
				)}
				<div className='flex justify-between mt-6'>
					<Button
						onClick={onPrevious}
						variant='outline'
						className='text-gray-300 border-gray-600 hover:bg-gray-700'
					>
						Previous
					</Button>
					<Button
						onClick={() => setShowSolution(!showSolution)}
						className='bg-gradient-to-r from-green-400 to-teal-500 text-white'
					>
						{showSolution ? (
							<>
								<EyeOff className='w-4 h-4 mr-2' /> Hide Solution
							</>
						) : (
							<>
								<Eye className='w-4 h-4 mr-2' /> Reveal Solution
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</>
	);
};

export default ChallengeSection;
