import Gnb from "./Gnb";

const AppLayout = ({ title, children }: { title?:string ,children: React.ReactNode }) => {
  return (
    <div  className={`flex min-h-screen flex-col justify-between p-12`}>
      <Gnb />
      <div className="main">
        <h1 className="main__title">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;