'use client'
import React from 'react';
import { signOut } from "next-auth/react"; // Import signOut function
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import {User } from "next-auth";
import { LogOut } from 'lucide-react';
import Link from  "next/link";
type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

const UserAccountNav = ({ user }: Props) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div> {/* Wrap trigger content in a single parent element */}
            {/* {user.image && <img src={user.image} alt={user.name} />}  */}
            {user.name}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white' align='end'>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className='font-medium'>{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-zinc-700">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/'>Meow</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild onClick={(e) => {
            e.preventDefault();
            signOut().catch(console.error); 
          }}
               className="text-red-600 cursor-pointer">
            <div> {/* Wrap Sign Out content in a single parent element */}
              Sign Out
              <LogOut className="w-4 h-4 ml-2"/>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

export default UserAccountNav;