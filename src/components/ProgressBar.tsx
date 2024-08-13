import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
	currentSection: number;
	totalSections: number;
	currentChallenge: number;
	totalChallenges: number;
	isLastChallenge: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	currentSection,
	totalSections,
	currentChallenge,
	totalChallenges,
	isLastChallenge,
}) => {
	const sectionProgress = (currentSection / totalSections) * 100;
	const challengeProgress = (currentChallenge / totalChallenges) * (100 / totalSections);
	const totalProgress = isLastChallenge ? 100 : Math.min(sectionProgress + challengeProgress, 99);

	return <Progress value={totalProgress} className='w-full [&>*]:bg-emerald-600' />;
};

export default ProgressBar;
