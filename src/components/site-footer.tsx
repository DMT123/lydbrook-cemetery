import Link from "next/link";
import { Church } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-church-blue text-white/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Church className="h-5 w-5 text-white/90" />
              <div>
                <p className="text-sm font-semibold leading-tight text-white">
                  Lydbrook Baptist Church
                </p>
                <p className="text-[11px] text-white/50 leading-tight">
                  Cemetery Records
                </p>
              </div>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Preserving the records of those laid to rest in the burial ground
              behind Lydbrook Baptist Church, Forest of Dean, Gloucestershire.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-white/90">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/records" className="hover:text-white transition-colors">
                  Search Records
                </Link>
              </li>
              <li>
                <Link href="/cemetery-plan" className="hover:text-white transition-colors">
                  Cemetery Plan
                </Link>
              </li>
              <li>
                <Link href="/add-record" className="hover:text-white transition-colors">
                  Add a Record
                </Link>
              </li>
              <li>
                <a
                  href="https://www.lydbrookbaptist.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Lydbrook Baptist Church &rarr;
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-white/90">Location</h3>
            <address className="text-sm text-white/60 not-italic space-y-1">
              <p>Lydbrook Baptist Church</p>
              <p>Lower Lydbrook</p>
              <p>Gloucestershire, GL17 9NA</p>
            </address>
            <p className="text-xs text-white/40 mt-3">
              The burial ground is at the rear of the church, accessed via a
              steep path. Please wear sturdy footwear.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          <p>
            Records compiled from burial certificates, headstone engravings, and
            parish archives.
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Lydbrook Baptist Church Cemetery
            Records
          </p>
        </div>
      </div>
    </footer>
  );
}
