import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CongratsProps {
	onClose: () => void;
}

const Congrats: React.FC<CongratsProps> = ({ onClose }) => {
	const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<Confetti
				width={windowDimension.width}
				height={windowDimension.height}
				recycle={false}
				numberOfPieces={500}
			/>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='bg-gray-800 p-8 rounded-lg text-center max-w-md'
			>
				<h2 className='text-3xl font-bold mb-4 text-green-400'>Congratulations!</h2>
				<p className='text-gray-300 mb-6'>
					You've completed all the challenges on this section. Let's move on to the next one.
				</p>
				<Button asChild onClick={onClose} className='bg-green-500 hover:bg-green-600 text-white'>
					<Link href='/redis-data-structures'>Continue Learning</Link>
				</Button>
			</motion.div>
		</div>
	);
};

export default Congrats;
