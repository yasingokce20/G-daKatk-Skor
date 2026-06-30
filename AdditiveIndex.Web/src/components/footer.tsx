import { Link } from "wouter";

export function Footer() {
  const internalLinks = [
    { name: "Topluluk", href: "/community" },
    { name: "Veri Güvenliği", href: "/data-security" },
    { name: "API Rehberi", href: "/api-guide" },
    { name: "Swagger UI", href: "http://localhost:5004/swagger" },
  ];

  return (
    <footer className="bg-[#eef4ff] border-t border-[#bccac0] mt-16">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold text-xl text-[#121c28]">
              GıdaKatkıRadarı
            </span>
            <p className="text-[#3d4a42] text-sm text-center md:text-left">
              © 2025 GıdaKatkıRadarı. Gıda katkı maddelerinde şeffaflık için bilimsel veri.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {internalLinks.map((link) => (
              link.href.startsWith("http") ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3d4a42] hover:text-[#121c28] transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#3d4a42] hover:text-[#121c28] transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
