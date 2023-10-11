import Authentication from "@/components/Authentication";
import Database from "@/components/Database";
import EdgeFunctions from "@/components/EdgeFunctions";
import Footer from "@/components/Footer";
import Introduction from "@/components/Introduction";
import Realtime from "@/components/Realtime";
import Section from "@/components/Section";
import Storage from "@/components/Storage";
import { NotificationProvider } from "@/contexts/NotificationProvider";
import { UserProvider } from "@/contexts/UserProvider";
import { icons } from "@/lib/icons";

export default function Home() {
  return (
    <NotificationProvider>
      <UserProvider>
        <main className="mx-auto my-40 flex max-w-md flex-col gap-5 p-3">
          <Introduction />
          <Section
            title="Authentication"
            description="supabase.com/docs/guides/auth"
            icon={icons["authentication"]}
          >
            <Authentication />
          </Section>
          <Section
            title="Database"
            description="supabase.com/docs/guides/database"
            icon={icons["database"]}
          >
            <Database />
          </Section>
          <Section
            title="Realtime"
            description="supabase.com/docs/guides/realtime"
            icon={icons["realtime"]}
          >
            <Realtime />
          </Section>
          <Section
            title="Storage"
            description="supabase.com/docs/guides/storage"
            icon={icons["storage"]}
          >
            <Storage />
          </Section>
          <Section
            title="Edge Functions"
            description="supabase.com/docs/guides/functions"
            icon={icons["edgeFunctions"]}
          >
            <EdgeFunctions />
          </Section>
          <Footer />
        </main>
      </UserProvider>
    </NotificationProvider>
  );
}
