import { ThemeProvider } from '@/components/theme-providers'
import JobsProvider from '@/context/JobContext'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import '../styles/globals.css'
import SessionWrapper from '@/components/SessionWrapper/SessionWrapper'
import { Toaster } from '@/components/ui/toaster'

const fontKanit = Kanit({
  // https://fonts.google.com/specimen/Kanit
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://job-vault.vercel.app/'),
  title: 'Job Vault',
  description:
    "Effortlessly curate and save your preferred job listings with Job Vault's intuitive interface. Seamlessly store and organize opportunities that match your career goals, all at your fingertips. Start building your personalized job archive with Job Vault now",
  keywords:
    'job, job listing, job vault, vault, linkedin, links, order, management, manager, careers, vite, react, next, tailwind, turso, sql, sqlite, drizzle, orm, save, notes, jobs, trabajo, carreras, links',
  authors: [
    { name: 'Tomas Lugo', url: 'https://lugo-tomas-portfolio.vercel.app/' },
  ],
  openGraph: {
    authors: 'Tomas Lugo',
    title: 'Job Vault',
    description:
      "Effortlessly curate and save your preferred job listings with Job Vault's intuitive interface. Seamlessly store and organize opportunities that match your career goals, all at your fingertips. Start building your personalized job archive with Job Vault now",
    url: 'https://job-vault.vercel.app/',
    siteName: 'Job Vault',
  },
  robots: 'robots.txt',
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
          <SessionWrapper>
            <JobsProvider>
              {children}
              <Toaster />
            </JobsProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
