import { Zap, Twitter, Github, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	const socialLinks = [
		{ href: "https://x.com/asaprogrammer_", icon: Twitter, label: "Twitter" },
		{ href: "https://github.com/burakorkmez/redis-rush", icon: Github, label: "GitHub" },
		{ href: "https://www.youtube.com/@asaprogrammer_", icon: Youtube, label: "YouTube" },
	];

	return (
		<footer className='bg-gray-900 text-gray-300 py-12 px-4 border-t border-gray-800 mt-auto'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-8'>
					<div className='text-center md:text-left'>
						<Link
							href='/'
							className='text-2xl font-bold text-white flex items-center max-w-fit mx-auto md:mx-0'
						>
							<span className='bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600'>
								rush
							</span>
							<Zap className='size-6 ml-1 text-teal-500' />
						</Link>
						<p className='text-sm text-gray-400 mt-2'>Learn Redis with interactive challenges</p>
					</div>
					<div className='flex gap-4'>
						{socialLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-400 hover:text-white transition-colors duration-300'
								aria-label={link.label}
							>
								<link.icon className='size-6' />
							</a>
						))}
					</div>
				</div>

				<div className='mt-12 pt-8 border-t border-gray-800 max-w-4xl mx-auto'>
					<div className='space-y-4 text-xs text-gray-500 text-center'>
						<p>
							* Redis is a trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. Any use
							by Redis Rush is for referential purposes only and does not indicate any sponsorship,
							endorsement or affiliation between Redis and Redis Rush.
						</p>
						<p>
							** Upstash and the Upstash logo are trademarks and/or registered trademarks of Upstash, Inc.
							in the United States and other jurisdictions.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
