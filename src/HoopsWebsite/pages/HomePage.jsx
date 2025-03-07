import { MainContent } from "../components/MainContent";
import { PrimaryNav } from "../components/PrimaryNav";
import { SecondaryNav } from "../components/SecondaryNav";

export function HomePage() {
    return <>
      <PrimaryNav />
      <SecondaryNav />
      <MainContent />
      
    </>
  }