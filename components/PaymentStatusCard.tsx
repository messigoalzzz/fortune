"use client";

import { useRouter } from "next/navigation";

type PaymentStatusCardProps = {
  type: "success" | "cancel";
  title: string;
};

export default function PaymentStatusCard({ type, title }: PaymentStatusCardProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  const isSuccess = type === "success";

  return (
    <section className="relative min-h-[calc(100vh-210px)] overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(239,68,68,0.2),transparent_35%),linear-gradient(180deg,#030303_0%,#0c1118_100%)]" />

      <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/50 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-10">
          <div
            className={`mx-auto mb-6 flex size-20 max-md:size-16 max-sm:size-12 items-center justify-center rounded-full shadow-lg ${
              isSuccess
                ? "bg-[linear-gradient(135deg,#22c55e_0%,#16a34a_100%)] text-white"
                : "bg-[linear-gradient(135deg,#fb7185_0%,#ef4444_100%)] text-white"
            }`}
            aria-hidden="true"
          >
            {isSuccess ? (
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            )}
          </div>

          <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-[#0f172a] xl:text-4xl sm:text-3xl">{title}</h1>

          <button
            type="button"
            onClick={handleBack}
            className="mt-8 text-sm xl:text-base inline-flex items-center justify-center rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0b1220]"
          >
            返回
          </button>
        </div>
      </div>
    </section>
  );
}
