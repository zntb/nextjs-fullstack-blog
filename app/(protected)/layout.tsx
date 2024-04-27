import Footer from '@/components/footer/Footer';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
