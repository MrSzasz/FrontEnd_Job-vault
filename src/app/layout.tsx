import { ThemeProvider } from '@/components/theme-providers'
import JobsProvider from '@/context/JobContext'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../styles/globals.css'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Job Vault',
  description:
    "Effortlessly curate and save your preferred job listings with Job Vault's intuitive interface. Seamlessly store and organize opportunities that match your career goals, all at your fingertips. Start building your personalized job archive with Job Vault now",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JobsProvider>{children}</JobsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
