"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ChallengeCards from "./_components/ChallengeCards";
import FeatureCards from "./_components/FeatureCards";
import Benefits from "./_components/Benefits";
import Testimonials from "./_components/Testimonials";
import RotatedText from "@/components/decorators/RotatedText";

// hover:border-emerald-500 hover:border-green-500 hover:border-teal-500
// text-emerald-400 text-green-400 text-teal-400

const GridBackground = () => (
	<div className='absolute inset-0 bg-gray-900'>
		<div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
	</div>
);

export default function Home() {
	return (
		<div className='min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden'>
			<GridBackground />

			<div className='relative z-10'>
				<main className='container mx-auto px-4 py-16 max-w-7xl'>
					{/* Hero Section */}
					<div className='text-center mb-20'>
						<motion.h1
							className='text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600'
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							Redis Rush
						</motion.h1>
						<motion.p
							className='text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<span className='underline decoration-wavy text-2xl decoration-green-400 text-green-400 font-bold underline-offset-4'>
								Rush
							</span>{" "}
							brings you a comprehensive{" "}
							<span className='bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-bold'>
								Redis
							</span>{" "}
							learning experience with interactive,{" "}
							<RotatedText className={"bg-teal-600"}>hands-on</RotatedText> challenges
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<Button
								asChild
								size='lg'
								className='bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
							>
								<Link href='/redis-basics'>
									Get Started <ChevronRight className='ml-2' />
								</Link>
							</Button>
						</motion.div>
					</div>

					<FeatureCards />
					<Benefits />

					<Testimonials />
					<ChallengeCards />
				</main>
			</div>
		</div>
	);
}
