import { Cross } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-stone-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Cross className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Lower Lydbrook Baptist Church
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  Cemetery Records
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Preserving the memory of those laid to rest in the Lower Lydbrook
              Baptist Church Cemetery, Forest of Dean, Gloucestershire.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/records" className="hover:text-foreground transition-colors">
                  Search Records
                </Link>
              </li>
              <li>
                <Link href="/cemetery-plan" className="hover:text-foreground transition-colors">
                  Cemetery Plan
                </Link>
              </li>
              <li>
                <Link href="/add-record" className="hover:text-foreground transition-colors">
                  Add a Record
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About This Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Location</h3>
            <address className="text-sm text-muted-foreground not-italic space-y-1">
              <p>Lower Lydbrook Baptist Church</p>
              <p>Lydbrook, Forest of Dean</p>
              <p>Gloucestershire, England</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>
            Records compiled from burial certificates, headstone engravings, and
            parish archives.
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Lower Lydbrook Baptist Church
            Cemetery Project
          </p>
        </div>
      </div>
    </footer>
  );
}
