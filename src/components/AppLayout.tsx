import Gnb from "./Gnb";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

const AppLayout = ({ title, children }: { title?:string ,children: React.ReactNode }) => {
  return (
    <div  className={`flex min-h-screen flex-col justify-between p-12 ${inter.className}`}>
      <Gnb />
      <div className="main">
        <h1 className="main__title">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;