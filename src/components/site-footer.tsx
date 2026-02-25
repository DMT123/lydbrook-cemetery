import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-cwgc-green text-cwgc-stone/80">
      {/* Gold separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cwgc-gold/60 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                viewBox="0 0 24 32"
                className="h-7 w-5 text-cwgc-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2 L12 28" />
                <path d="M5 10 L19 10" />
                <path d="M12 28 L8 32 L16 32 Z" fill="currentColor" strokeWidth="0" />
              </svg>
              <div>
                <p className="text-sm font-semibold leading-tight text-cwgc-gold tracking-wide">
                  Lydbrook War Graves
                </p>
                <p className="text-[11px] text-cwgc-stone/50 leading-tight tracking-wider uppercase">
                  Baptist Church Cemetery
                </p>
              </div>
            </div>
            <p className="text-sm text-cwgc-stone/60 max-w-xs leading-relaxed">
              Preserving the memory of those laid to rest in the cemetery behind
              Lower Lydbrook Baptist Church, Forest of Dean, Gloucestershire.
            </p>
            <p className="text-xs text-cwgc-gold/60 mt-3 italic">
              &ldquo;Their Name Liveth for Evermore&rdquo;
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-cwgc-gold tracking-wide uppercase text-[11px]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-cwgc-stone/70">
              <li>
                <Link href="/records" className="hover:text-cwgc-gold transition-colors">
                  Search Records
                </Link>
              </li>
              <li>
                <Link href="/cemetery-plan" className="hover:text-cwgc-gold transition-colors">
                  Cemetery Plan
                </Link>
              </li>
              <li>
                <Link href="/add-record" className="hover:text-cwgc-gold transition-colors">
                  Add a Record
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cwgc-gold transition-colors">
                  About This Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-cwgc-gold tracking-wide uppercase text-[11px]">
              Location
            </h3>
            <address className="text-sm text-cwgc-stone/70 not-italic space-y-1">
              <p>Lower Lydbrook Baptist Church</p>
              <p>Main Road (B4234)</p>
              <p>Lydbrook, GL17 9NA</p>
              <p>Forest of Dean, Gloucestershire</p>
            </address>
            <div className="mt-4">
              <a
                href="https://www.cwgc.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cwgc-stone/50 hover:text-cwgc-gold transition-colors"
              >
                Commonwealth War Graves Commission &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cwgc-gold/10 text-center">
          <p className="text-xs text-cwgc-stone/40">
            Records compiled from burial certificates, headstone engravings, and
            parish archives.
          </p>
          <p className="mt-1 text-xs text-cwgc-stone/40">
            &copy; {new Date().getFullYear()} Lydbrook War Graves Cemetery
            Project
          </p>
        </div>
      </div>
    </footer>
  );
}
