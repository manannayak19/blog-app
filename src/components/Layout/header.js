"use client";

import { Edit, LogOut, Search, Wallet } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
//import { logoutUserAction } from "@/actions/logout";
import * as z from "zod";
import { useState } from "react";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { searchPostsAction } from "@/actions/blogInteractions";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "../ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";
import { logoutUserAction } from "@/actions/logout";
//import PaypalButton from "../payment/paypal";
//import { prePaymentAction } from "@/actions/prePayment";

export default function Header() {

  const router = useRouter();

  async function handleLogout() {
       const result = await logoutUserAction();
       if(result.success){
        router.push('/login')
       } else{
        console.error(result.error);
        
       }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                onClick={() => router.push("/")}
                className="text-2xl cursor-pointer font-bold font-serif tracking-tighter"
              >
                <span className="bg-black text-white px-2 py-1 rounded-full">
                  B&B
                </span>
                <span className="ml-1">Blog and Blog</span>
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                
                {/* Search functionality */}
                <Input
                  placeholder="Search Blogs"
                  className="pl-10 pr-4 py-1 w-64 rounded-full bg-gray-100 border-0 focus-visible:ring-1"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 cursor-pointer" />
              </div>

              {/* Create new blog button */}
              <Button
                onClick={() => router.push("/blog/create")}
                variant="ghost"
                size="icon"
              >
                <Edit className="h-6 w-6"></Edit>
              </Button>

            {/*  dropdown as the name suggests */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>MN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span className="">Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
