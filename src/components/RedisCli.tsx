import { useState, useRef, useEffect } from "react";

type RedisCLIProps = {
	onSubmit: (input: string) => void;
};

const RedisCLI = ({ onSubmit }: RedisCLIProps) => {
	const [inputValue, setInputValue] = useState("");
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const [cursorPosition, setCursorPosition] = useState(0);

	useEffect(() => {
		// without setTimeout, the focus doesn't work. One more reason to hate react or js...
		setTimeout(() => {
			if (inputRef.current) {
				console.log("run if");
				inputRef.current.focus();
			}
		}, 100);
	});

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				let newIndex = historyIndex + 1;
				setHistoryIndex(newIndex);
				setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
				setCursorPosition(commandHistory[commandHistory.length - 1 - newIndex].length);
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
				setCursorPosition(commandHistory[commandHistory.length - 1 - newIndex].length);
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setInputValue("");
				setCursorPosition(0);
			}
		}
	};

	const handleSubmit = () => {
		if (inputValue.trim()) {
			setCommandHistory([...commandHistory, inputValue]);
			onSubmit(inputValue);
			setInputValue("");
			setHistoryIndex(-1);
			setCursorPosition(0);
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = inputValue;
			inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
		}
	}, [inputValue, cursorPosition]);

	return (
		<div className='bg-black p-4 rounded-md font-mono text-sm'>
			{/* <div className='mb-2'>
				{commandHistory.map((cmd, index) => (
					<div key={index} className='text-gray-500'>
						$ {cmd}
					</div>
				))}
			</div> */}
			<div className='flex items-center'>
				<span className='text-green-500 mr-2'>$</span>
				<input
					ref={inputRef}
					type='text'
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						setCursorPosition(e.target.selectionStart || 0);
					}}
					onKeyDown={handleKeyDown}
					className='bg-transparent text-white outline-none flex-grow'
					placeholder='Enter Redis command...'
				/>
			</div>
		</div>
	);
};

export default RedisCLI;
