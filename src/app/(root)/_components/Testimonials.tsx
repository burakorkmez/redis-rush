import { testimonials } from "@/utils/constants";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='mb-20 relative'
		>
			<h2 className='text-5xl font-bold text-center text-gray-100 mb-4'>
				What Is Our{" "}
				<span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500'>Goal</span>?
			</h2>
			<p className='text-gray-300 text-center max-w-2xl mx-auto mt-2 mb-12 text-lg'>
				(To hear these from you soon! 🙌)
			</p>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4'>
				{testimonials.map((testimonial, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<Card className='bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 h-full'>
							<CardContent className='pt-6 relative h-full flex flex-col'>
								<Quote className='absolute top-4 right-4 w-10 h-10 text-green-500/20' />
								<div className='flex items-center mb-4'>
									{[...Array(5)].map((_, i) => (
										<Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
									))}
								</div>
								<p className='text-gray-300 mb-6 italic flex-grow'>"{testimonial.quote}"</p>
								<div className='flex items-center mt-4'>
									<div className='w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg'>
										{testimonial.name.charAt(0)}
									</div>
									<div className='ml-4'>
										<p className='text-gray-200 font-semibold'>{testimonial.name}</p>
										<p className='text-gray-400 text-sm'>{testimonial.role}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default Testimonials;
