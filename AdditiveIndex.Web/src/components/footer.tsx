export function Footer() {
  const links = [
    { name: "Community Guidelines", href: "#" },
    { name: "Methodology", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "API Documentation", href: "http://localhost:5004/swagger" },
    { name: "Contact Support", href: "#" },
  ];

  return (
    <footer className="bg-[#eef4ff] border-t border-[#bccac0] mt-16">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold text-xl text-[#121c28]">
              PureFood Trace
            </span>
            <p className="text-[#3d4a42] text-sm text-center md:text-left">
              © 2024 PureFood Trace. Clinical data for food safety transparency.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[#3d4a42] hover:text-[#121c28] transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
