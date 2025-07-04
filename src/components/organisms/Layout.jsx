import Header from '@/components/organisms/Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;