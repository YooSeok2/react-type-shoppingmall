import Gnb from "./gnb";
const AppLayout = ({ title, children }: { title?:string ,children: React.ReactNode }) => {
  return (
    <div>
      <Gnb />
      <div className="main">
        <h1 className="main__title">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;