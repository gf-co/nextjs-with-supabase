import Authentication from "@/components/Authentication";
import Database from "@/components/Database";
import EdgeFunctions from "@/components/EdgeFunctions";
import Footer from "@/components/Footer";
import Introduction from "@/components/Introduction";
import Realtime from "@/components/Realtime";
import Section from "@/components/Section";
import Storage from "@/components/Storage";

export default function Home() {
  return (
    <main className="max-w-md mx-auto my-40 p-3 gap-5 flex flex-col">
      <Introduction />
      <Section
        title="Authentication"
        description="supabase.com/docs/guides/auth"
      >
        <Authentication />
      </Section>
      <Section title="Database" description="supabase.com/docs/guides/database">
        <Database />
      </Section>
      <Section title="Realtime" description="supabase.com/docs/guides/realtime">
        <Realtime />
      </Section>
      <Section title="Storage" description="supabase.com/docs/guides/storage">
        <Storage />
      </Section>
      <Section
        title="Edge Functions"
        description="supabase.com/docs/guides/functions"
      >
        <EdgeFunctions />
      </Section>
      <Footer />
    </main>
  );
}
