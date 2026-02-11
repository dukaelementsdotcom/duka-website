// app/estimate/page.tsx
import ProjectScopePro from '@/components/ProjectScopePro/ProjectScopePro';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function EstimatePage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-32">
        <ProjectScopePro />
      </main>
      <Footer />
    </>
  );
}