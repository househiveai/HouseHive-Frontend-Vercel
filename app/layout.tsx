
import './globals.css'
export const metadata = { title: 'HouseHive.ai', description: 'AI-Powered Property Assistant' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{maxWidth: 1100, margin: '0 auto', padding: 24}}>
          <header>
            <h1 style={{fontWeight:700}}>🏠 HouseHive.ai</h1>
            <nav>
              <a href="/dashboard">Dashboard</a>
              <a href="/properties">Properties</a>
              <a href="/tasks">Maintenance</a>
              <a href="/messages">Messages</a>
              <a href="/billing">Billing</a>
              <a href="/">Logout</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
