"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProblemBySlug, getNextProblemSlug, getPreviousProblemSlug } from "@/utils/problems";
import UpstashRedisLearningPlatform from "@/components/UpstashRedisLearningPlatform";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProblemNotFound = () => (
	<div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
		<AlertCircle className='w-16 h-16 text-emerald-500 mb-4' />
		<h1 className='text-3xl font-bold mb-2'>Oops! Problem Not Found</h1>
		<p className='text-gray-500 mb-8 max-w-md'>
			We couldn't find the problem you're looking for. It might have been moved or doesn't exist.
		</p>
		<div className='flex flex-col sm:flex-row gap-4'>
			<Button asChild variant='outline'>
				<Link href='/learn-upstash'>
					<Home className='mr-2 h-4 w-4' /> Back to Challenges
				</Link>
			</Button>
		</div>
	</div>
);

export default function ProblemPage() {
	const params = useParams();
	const router = useRouter();
	const slug = params.slug as string;

	const problem = getProblemBySlug(slug);
	const nextProblemSlug = getNextProblemSlug(slug);
	const previousProblemSlug = getPreviousProblemSlug(slug);

	if (!problem) {
		return <ProblemNotFound />;
	}

	const handleNextProblem = () => {
		if (nextProblemSlug) {
			router.push(`/learn-upstash/${nextProblemSlug}`);
		}
	};

	const handlePreviousProblem = () => {
		if (previousProblemSlug) {
			router.push(`/learn-upstash/${previousProblemSlug}`);
		}
	};

	return (
		<UpstashRedisLearningPlatform
			problem={problem}
			onNextProblem={handleNextProblem}
			onPreviousProblem={handlePreviousProblem}
			hasNextProblem={!!nextProblemSlug}
			hasPreviousProblem={!!previousProblemSlug}
		/>
	);
}
