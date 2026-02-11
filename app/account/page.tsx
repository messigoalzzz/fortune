import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalCenter from "@/components/PersonalCenter";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main>
        <PersonalCenter />
      </main>
      <Footer />
    </div>
  );
}
