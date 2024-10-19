"use client"
import "./globals.css";
import Navbar from "./components/Navbar";
import { Space_Grotesk } from "next/font/google";

// RainbowKit Setup
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "TechFiesta",
  projectId: "274de4271228fdd69013c56274f0e688",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-[#E6ECF7] via-[#EDF0F7] to-[#F0EDF7]">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
            theme={lightTheme({
              accentColor: '#1570ef',
              accentColorForeground: 'white',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small'
            },
            )}
            >
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                <footer className="bg-white text-black p-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <p>&copy; 2024 TechFiesta. All rights reserved.</p>
                  </div>
                </footer>
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
