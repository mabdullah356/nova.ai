import { Sparkles, Video } from "lucide-react";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";
// import { Image } from "lucide-react";
import { PanelLeftOpen } from "lucide-react";
// import { FilePlay } from "lucide-react";
import { ImagePlus } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardHeader/>
      <section className="flex-1">{children}</section>
    </div>
  );
}


function DashboardHeader(){

  type NavLinks={
    name:string,
    link:string
    icon:React.ReactElement
  };

  const NavigationLinks:NavLinks[]=[
    {
      name:"Chat",
      link:"/chat",
      icon: <MessageSquareText />
    },
    {
      name:"Image Generation",
      link:"/image-generation",
      icon:<ImagePlus />
    },{
      name:"Video Generation",
      link:"/video-generation",
      icon:<Video />
    },
    {
      name:"Slides",
      link:"/slides",
      icon:<PanelLeftOpen />
    },
  ]
  return (
       <header className="hidden md:block md:w-72 flex-col items-center border-r border-zinc-200 bg-white py-6 lg:flex">
        <Link href="/" className="mb-8 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="text-purple-800 text-md font-bold">nova.ai</span>
        </Link>
        <nav>
          {NavigationLinks.map((nav,i)=>(
            <li key={i} className=" flex gap-2 list-none hover:bg-gray-200 hover:text-purple-800 py-2 px-3 font-medium font-sans rounded-xl">
              <span className="text-xs">{nav.icon}</span>
              <Link href={nav.link}>{nav.name}</Link>
            </li>
          ))}
        </nav>
      </header>
   
  )
}