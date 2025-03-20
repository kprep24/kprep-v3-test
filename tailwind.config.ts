import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/features/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {  
			screens: {
				'2lg': '1380px',
			},
			colors: {
        mainpage:{
          light: {
            DEFAULT: '#fffefa', // Light mode background
            text: '#212529', // Light mode text color
            border: '#ced4da', // Light mode border color
          },
          dark: {
            DEFAULT: '#030712c8', // Dark mode background
            text: '#f8f9fa', // Dark mode text color
            border: '#6c757d', // Dark mode border color
          },
        },
        usersidebar: {
          light: {
            DEFAULT: '#fffef7', // Light mode background
            text: '#212529', // Light mode text color
            border: '#ced4da', // Light mode border color
            link: {
              DEFAULT: '#799670', // Link background
              text: '#fff', // Link text color
              hover: '#dee2e6', // Hover background color
            },
          },
          dark: {
            DEFAULT: '#030712', // Dark mode background
            text: '#f8f9fa', // Dark mode text color
            border: '#6c757d', // Dark mode border color
            link: {
              DEFAULT: '#436174', // Link background
              text: '#fff', // Link text color
              hover: '#C6E2BA', 
            },
          },
        },
        Homecards: {
          light: {
            DEFAULT: 'linear-gradient(180deg, #FFF6B4 0%, #446377 100%)', // Light mode background gradient
          },
          dark: {
            DEFAULT: 'linear-gradient(180deg, #FFF6B4 0%, #446377 100%)', // Dark mode background gradient
          },
        },
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}