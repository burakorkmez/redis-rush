import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featureCards } from "@/utils/constants";
import { motion } from "framer-motion";
import Image from "next/image";

const FeatureCards = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.6 }}
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'
		>
			{featureCards.map((card, index) => (
				<Card
					key={index}
					className={`bg-gray-800 border-gray-700 hover:border-${card.color}-500 transition-all duration-300 transform hover:-translate-y-1`}
				>
					<CardHeader>
						<CardTitle className={`flex items-center text-${card.color}-400 text-xl`}>
							{card.icon && <card.icon className='w-6 h-6 mr-2' />}
							{card.img && (
								<Image src={card.img} alt='Upstash logo' className='mr-2' width={24} height={24} />
							)}
							{card.title}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-lg text-gray-300'>{card.description}</p>
					</CardContent>
				</Card>
			))}
		</motion.div>
	);
};
export default FeatureCards;
