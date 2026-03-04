import ProvablyFairExplainedIndex from "@/components/assistance/provably-fair-explained/Index";
import ProvablyFairExplainedSlotMachines from "@/components/assistance/provably-fair-explained/SlotMachines";
import ProvablyFairExplainedVideoPoker from "@/components/assistance/provably-fair-explained/VideoPoker";
import ProvablyFairExplainedMultiHandVideoPoker from "@/components/assistance/provably-fair-explained/MultiHandVideoPoker";
import ProvablyFairExplainedKenoGames from "@/components/assistance/provably-fair-explained/KenoGames";
import ProvablyFairExplainedVerification from "@/components/assistance/provably-fair-explained/Verification";

function ProvablyFairExplainedPage({ page }: { page?: string }) {
  return (
    <div>
 <ProvablyFairExplainedIndex />
    </div>
  );
}

export default ProvablyFairExplainedPage;
