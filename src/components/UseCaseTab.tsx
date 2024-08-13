import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const UseCaseTab = ({ useCase }: { useCase: string }) => {
	const lines = useCase.trim().split("\n");
	const intro = lines[0];
	const steps = lines.slice(2, -2);
	const conclusion = lines[lines.length - 1];

	const highlightCommands = (text: string) => {
		const commands = ["SET", "GET", "EXISTS", "DEL", "MSET", "MGET", "INCR", "DECR", "EXPIRE", "TTL"];
		const regex = new RegExp(`\\b(${commands.join("|")})\\b`, "g");
		return text.replace(regex, '<code class="bg-gray-700 text-yellow-400 px-1 rounded">$1</code>');
	};

	return (
		<Card className='bg-gray-800/50 border-gray-700 overflow-hidden'>
			<CardContent className='p-6'>
				<div className='flex items-center mb-4'>
					<Lightbulb className='w-6 h-6 text-yellow-400 mr-2' />
					<h3 className='text-xl font-semibold text-green-400'>Use Case:</h3>
				</div>
				<p className='text-gray-300 italic mb-4'>{intro}</p>
				<ul className='list-none space-y-2 mb-4'>
					{steps.map((step, index) => (
						<li key={index} className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span
								className='text-gray-200'
								dangerouslySetInnerHTML={{ __html: highlightCommands(step.substring(3)) }}
							/>
						</li>
					))}
				</ul>
				<p
					className='text-gray-300 bg-gray-700/50 p-4 rounded-md'
					dangerouslySetInnerHTML={{ __html: highlightCommands(conclusion) }}
				/>
			</CardContent>
		</Card>
	);
};

export default UseCaseTab;
