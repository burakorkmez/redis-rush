import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Book, Code, Lightbulb } from "lucide-react";

import UseCaseTab from "./UseCaseTab";
import { useRouter, useSearchParams } from "next/navigation";
import OverviewTab from "./OverviewTab";
import CommandsTab from "./CommandsTab";
import { Section } from "@/utils/constants";

interface LearningSectionProps {
	section: Section;
	onNext: () => void;
}

const LearningSection = ({ section, onNext }: LearningSectionProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [activeTab, setActiveTab] = useState("overview");

	useEffect(() => {
		const tab = searchParams.get("tab");
		if (tab && ["overview", "commands", "usecase"].includes(tab)) {
			setActiveTab(tab);
		}
	}, [searchParams]);

	const overview = section.content.overview;
	const keyCommands = section.content.keyCommands;
	const useCase = section.content.useCase;

	const handleTabChange = (value: string) => {
		setActiveTab(value);
		const params = new URLSearchParams(searchParams);
		params.set("tab", value);
		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className='space-y-6 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-xl shadow-2xl'>
			<h2 className='text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500'>
				First Learn, Then Practice
			</h2>

			<Tabs value={activeTab} onValueChange={handleTabChange}>
				<TabsList className='grid grid-cols-3 gap-4 bg-gray-800/50 p-1 rounded-lg'>
					{["overview", "commands", "usecase"].map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab}
							className='relative  text-gray-300 transition-all data-[state=active]:text-green-400'
						>
							<span className='flex items-center justify-center'>
								{tab === "overview" && <Book className='mr-2 h-4 w-4' />}
								{tab === "commands" && <Code className='mr-2 h-4 w-4' />}
								{tab === "usecase" && <Lightbulb className='mr-2 h-4 w-4' />}
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</span>
						</TabsTrigger>
					))}
				</TabsList>

				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
				>
					{/* OVERVIEW TAB */}
					<TabsContent value='overview' className='mt-4'>
						<OverviewTab overview={overview} title={section.title} />
					</TabsContent>

					{/* COMMANDS TAB */}
					<TabsContent value='commands' className='mt-4'>
						<CommandsTab keyCommands={keyCommands} />
					</TabsContent>

					{/* USE-CASE TAB */}
					<TabsContent value='usecase' className='mt-4'>
						<UseCaseTab useCase={useCase} />
					</TabsContent>
				</motion.div>
			</Tabs>

			<div className='flex justify-end mt-6'>
				<Button
					onClick={() => {
						onNext();
					}}
					className={`bg-gradient-to-r from-green-500 to-emerald-800 text-white px-6 py-3 rounded-full font-semibold transition-all 
             opacity-100 hover:shadow-lg `}
				>
					I'm Ready for the Challenge <ArrowRight className='ml-2 h-5 w-5' />
				</Button>
			</div>
		</div>
	);
};

export default LearningSection;
