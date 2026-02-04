import AdminPanel from '@/app/components/Calculator/AdminPanel';
import NavBar from '@/app/components/NavBar'; // ADD THIS
import Footer from '@/app/components/Footer'; // ADD THIS

export const metadata = {
  title: 'Admin Panel - Pricing Settings | Duka Interiors',
  description: 'Update calculator pricing settings',
};

export default function AdminSettingsPage() {
  return (
    <>
      <NavBar />
      <AdminPanel />
      <Footer />
    </>
  );
}