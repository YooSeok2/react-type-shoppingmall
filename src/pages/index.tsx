import { Inter } from 'next/font/google'
import AppLayout from '@/components/AppLayout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AppLayout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
      Hello World
      </main>
    </AppLayout>
  )
}
