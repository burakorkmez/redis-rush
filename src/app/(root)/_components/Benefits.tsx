import { benefits } from "@/utils/constants";
import { motion } from "framer-motion";

const Benefits = () => {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.8 }}
				className='mb-20'
			>
				<h2 className='text-4xl font-bold text-center mb-10 text-gray-100'>
					Why Choose{" "}
					<span className='bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-bold'>
						Rush?
					</span>{" "}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
					{benefits.map((benefit, index) => (
						<div key={index} className='flex items-center'>
							<div className='flex-shrink-0 mr-4'>
								<div className='w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center'>
									<benefit.icon className='w-8 h-8 text-white' />
								</div>
							</div>
							<div>
								<h3 className='text-xl font-semibold mb-1 text-gray-100'>{benefit.title}</h3>
								<p className='text-gray-300 text-sm'>{benefit.description}</p>
							</div>
						</div>
					))}
				</div>
			</motion.div>
			<div
				className='absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent blur-3xl -z-10'
				aria-hidden='true'
			/>
		</>
	);
};
export default Benefits;
