import { Card, CardContent } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CommandsTab = ({ keyCommands }: { keyCommands: { name: string; description: string }[] }) => {
	return (
		<Card className='bg-gray-800/50 border-gray-700'>
			<CardContent className='p-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{keyCommands?.map((command, index) => {
						const { name, description } = command;
						return (
							<div
								key={index}
								className='bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors'
							>
								<h3 className='text-yellow-400 font-mono mb-2'>
									{index + 1}. {name.trim()}
								</h3>
								<p className='text-gray-300 mb-2 text-sm'>{description.trim()}</p>
								<SyntaxHighlighter
									language='redis'
									style={atomOneDark}
									customStyle={{ background: "transparent" }}
								>
									{name.trim()}
								</SyntaxHighlighter>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};
export default CommandsTab;
