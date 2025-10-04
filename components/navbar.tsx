"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 dark:bg-black/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center p-1.5">
              <Image src="/charge-icon-white.svg" alt="NextGenAI" width={20} height={20} />
            </div>
            <span className="text-xl font-bold text-foreground">NextGenAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/home" 
              className="text-muted-foreground hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/api-docs" 
              className="text-muted-foreground hover:text-primary font-medium transition-colors"
            >
              API
            </Link>
            <Link 
              href="/docs" 
              className="text-muted-foreground hover:text-primary font-medium transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/sign-in">
              <button className="px-4 py-1.5 border border-border hover:border-primary text-foreground hover:text-primary rounded-md font-medium text-sm transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium text-sm transition-colors shadow-sm hover:shadow-md">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/home" 
                className="text-muted-foreground hover:text-primary font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/api-docs" 
                className="text-muted-foreground hover:text-primary font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                API
              </Link>
              <Link 
                href="/docs" 
                className="text-muted-foreground hover:text-primary font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </Link>
              <div className="border-t border-border pt-4 flex flex-col space-y-2">
                <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-1.5 border border-border hover:border-primary text-foreground hover:text-primary rounded-md font-medium text-sm transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium text-sm shadow-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}