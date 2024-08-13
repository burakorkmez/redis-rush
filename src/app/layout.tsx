import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
	title: "Redis Rush",
	description:
		"Redis Rush brings you a comprehensive Redis learning experience with interactive, hands-on challenges designed to take you from beginner to expert",
	openGraph: {
		title: "Redis Rush | Practice Redis",
		description:
			"Master Redis through hands-on challenges. Learn, practice, and excel with real-world scenarios using cutting-edge serverless technology.",
		url: "https://redisrush.com",
		siteName: "Redis Rush",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Redis Rush - Interactive Redis Learning",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Redis Rush | Master Redis Interactively",
		description:
			"Level up your Redis skills with hands-on challenges and real-world scenarios. Learn, practice, excel!",
		images: ["https://redisrush.com/og-image.png"],
		creator: "@asaprogrammer_",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<main className='pt-16'>{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}
