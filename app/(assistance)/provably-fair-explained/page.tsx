'use client';
import ProvablyFairExplainedIndex from "@/components/assistance/provably-fair-explained/Index";
import ProvablyFairExplainedSlotMachines from "@/components/assistance/provably-fair-explained/SlotMachines";
import ProvablyFairExplainedVideoPoker from "@/components/assistance/provably-fair-explained/VideoPoker";
import ProvablyFairExplainedMultiHandVideoPoker from "@/components/assistance/provably-fair-explained/MultiHandVideoPoker";
import ProvablyFairExplainedKenoGames from "@/components/assistance/provably-fair-explained/KenoGames";
import ProvablyFairExplainedVerification from "@/components/assistance/provably-fair-explained/Verification";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ProvablyFairExplainedPage({ page }: { page?: string }) {
  const searchParams = useSearchParams();
  const nameQuery = searchParams.get('name'); 
  return (
    <div>
{
  !nameQuery&&<ProvablyFairExplainedIndex />
}
{
  nameQuery==='slot-machines'&&<ProvablyFairExplainedSlotMachines />
}
{
  nameQuery==='video-poker'&&<ProvablyFairExplainedVideoPoker />
}
{
  nameQuery==='multi-hand-video-poker'&&<ProvablyFairExplainedMultiHandVideoPoker />
}
{
  nameQuery==='keno-games'&&<ProvablyFairExplainedKenoGames />
}
{
  nameQuery==='verification'&&<ProvablyFairExplainedVerification />
}
    </div>
  );
}

export default ProvablyFairExplainedPage;
