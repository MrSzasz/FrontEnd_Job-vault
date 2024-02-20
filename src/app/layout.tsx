import { ThemeProvider } from '@/components/theme-providers'
import JobsProvider from '@/context/JobContext'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import '../styles/globals.css'

const fontKanit = Kanit({
  // https://fonts.google.com/specimen/Kanit
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-kanit',
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
          'kanit min-h-screen bg-background antialiased',
          fontKanit.variable,
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
