"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomNotFoundPage = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4'>
			<motion.div
				className='text-center'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className='text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500'>
					404
				</h1>
				<p className='text-3xl font-semibold mb-6 text-gray-300'>Oops! Page Not Found</p>
				<div className='max-w-md mx-auto'>
					<p className='text-gray-400 mb-8'>
						Looks like this page got lost in the Redis cache. Don't worry, even the fastest databases have
						their moments!
					</p>
				</div>
				<div className='flex flex-col sm:flex-row justify-center gap-4 mb-12'>
					<Button
						asChild
						variant='default'
						className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400'
					>
						<Link href='/'>
							<Home className='mr-2 h-4 w-4' /> Go Home
						</Link>
					</Button>
					<Button asChild variant='outline' className='text-gray-300 border-gray-700 hover:bg-gray-800'>
						<Link href='/learn-upstash'>
							<BookOpen className='mr-2 h-4 w-4' /> Explore Challenges
						</Link>
					</Button>
				</div>
			</motion.div>
		</div>
	);
};

export default CustomNotFoundPage;
