import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-16 flex-col items-center border-r border-zinc-200 bg-white py-6 lg:flex">
        <Link href="/" className="mb-8 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-purple-600" />
        </Link>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}
