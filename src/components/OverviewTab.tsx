import { Card, CardContent } from "./ui/card";

const OverviewTab = ({ overview, title }: { overview: string; title: string }) => {
	const formatOverview = (text: string) => {
		const lines = text.split("\n").filter((line) => line.trim() !== "");
		const formattedLines = lines.map((line, index) => {
			if (line.match(/^\d+\./)) {
				return (
					<li key={index} className='mb-2'>
						<span className='font-semibold text-green-400'>{line.split(".")[0]}.</span>
						{line.split(".").slice(1).join(".")}
					</li>
				);
			}
			return (
				<p key={index} className='mb-2'>
					{line}
				</p>
			);
		});
		return formattedLines;
	};

	return (
		<Card className='bg-gray-800/50 border-gray-700'>
			<CardContent className='p-6'>
				<div className='text-gray-300 leading-relaxed space-y-4'>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>{title}</h3>
					{formatOverview(overview)}
				</div>
			</CardContent>
		</Card>
	);
};
export default OverviewTab;
