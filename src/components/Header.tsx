"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, Github, Star } from "lucide-react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const navItems = [
		{ href: "/redis-basics", label: "Basics" },
		{ href: "/redis-data-structures", label: "Data Structures" },
		{ href: "/learn-upstash", label: "Upstash" },
	];

	return (
		<header className='fixed top-0 left-0 right-0 z-50 py-4 bg-gray-800/70 backdrop-blur-md border-b border-green-500/20 shadow-lg'>
			<div className='container mx-auto px-4 max-w-6xl flex flex-wrap justify-between items-center'>
				<Link href='/' className='text-2xl font-bold text-white flex items-center'>
					<span className='bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600'>
						rush
					</span>
					<Zap className='size-6 ml-1 text-teal-500' />
					<span className='text-xs bg-teal-500 text-white px-1 ml-2'>BETA</span>
				</Link>

				{/* Hamburger menu for mobile */}
				<button className='md:hidden text-gray-300 hover:text-white focus:outline-none' onClick={toggleMenu}>
					{isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
				</button>

				{/* Navigation for larger screens */}
				<nav className='hidden md:flex items-center gap-4'>
					{navItems.map((item) => (
						<Button
							key={item.href}
							variant='ghost'
							asChild
							className='text-gray-300 hover:text-white hover:bg-green-500/10'
						>
							<Link href={item.href}>{item.label}</Link>
						</Button>
					))}
					<GithubStarButton />
				</nav>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className='md:hidden mt-4 pb-4 px-4 bg-gray-800/90 backdrop-blur-md'>
					<nav className='flex flex-col gap-2'>
						{navItems.map((item) => (
							<Button
								key={item.href}
								variant='ghost'
								asChild
								className='text-gray-300 hover:text-white hover:bg-green-500/10 w-full justify-start'
								onClick={toggleMenu}
							>
								<Link href={item.href}>{item.label}</Link>
							</Button>
						))}
						<GithubStarButton />
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;

const GithubStarButton = () => {
	return (
		<motion.a
			href='https://github.com/burakorkmez/redis-rush'
			target='_blank'
			rel='noopener noreferrer'
			className='inline-flex items-center px-2 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-md shadow-md hover:from-green-500 hover:to-teal-600 transition-all duration-300 ease-in-out overflow-hidden sm:w-auto max-w-fit'
			whileHover='hover'
			initial='initial'
		>
			<Github className='mr-2 h-4 w-4' />
			<span className='mr-2'>Star us</span>
			<motion.div
				className='flex items-center bg-white/20 rounded-full px-2 py-1'
				variants={{
					initial: { opacity: 0, x: 50 },
					hover: { opacity: 1, x: 0 },
				}}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			>
				<Star className='h-3 w-3 mr-1 text-yellow-300' />
				<span className='text-xs font-semibold'>:)</span>
			</motion.div>
		</motion.a>
	);
};
