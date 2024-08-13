"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { List, Hash, LayoutGrid, BarChart3 } from "lucide-react";
import { dataStructuresContent } from "@/utils/constants";

const icons: Record<string, React.ComponentType<any>> = {
	lists: List,
	sets: LayoutGrid,
	hashes: Hash,
	"sorted-sets": BarChart3,
};

const colors: Record<string, Record<string, string>> = {
	lists: { bg: "from-blue-500 to-blue-700", text: "text-blue-400", border: "border-blue-400/30" },
	sets: { bg: "from-green-500 to-green-700", text: "text-green-400", border: "border-green-400/30" },
	hashes: { bg: "from-purple-500 to-purple-700", text: "text-purple-400", border: "border-purple-400/30" },
	"sorted-sets": { bg: "from-red-500 to-red-700", text: "text-red-400", border: "border-red-400/30" },
};

export default function RedisDataStructures() {
	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100'>
			<main className='container mx-auto px-4 py-16 max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-12'
				>
					<h1 className='text-5xl font-extrabold mb-4 text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text'>
						Redis Data Structures
					</h1>
					<p className='text-xl text-gray-300 mb-8'>Master the powerful data structures in Redis</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{dataStructuresContent.map((structure, index) => {
						if (!structure.slug) return null;
						const Icon = icons[structure.slug];
						const color = colors[structure.slug];

						return (
							<motion.div
								key={structure.slug}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Link href={`/redis-data-structures/${structure.slug}`}>
									<Card
										className={`bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 cursor-pointer h-full relative overflow-hidden group
                                    border ${color.border} shadow-lg hover:shadow-xl`}
									>
										<CardHeader className='pb-2'>
											<div className='flex items-center'>
												<div
													className={`w-10 h-10 rounded-full ${color.text} bg-opacity-10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
												>
													<span className='text-xl font-bold'>{index + 1}</span>
												</div>
												<CardTitle className='flex items-center text-2xl font-bold text-gray-100'>
													<Icon className={`mr-2 h-6 w-6 ${color.text}`} />
													{structure.title}
												</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<div
												className={`w-full h-1 bg-gradient-to-r ${color.bg} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
											/>
										</CardContent>
									</Card>
								</Link>
							</motion.div>
						);
					})}
				</div>
			</main>
		</div>
	);
}
