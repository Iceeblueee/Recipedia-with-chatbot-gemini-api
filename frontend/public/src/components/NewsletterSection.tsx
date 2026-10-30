import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Mohon masukkan alamat email yang valid.');
      return;
    }

    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-[#526B50] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider">
          Buletin Kuliner Mingguan
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mt-4">
          Temukan Inspirasi Masakan Setiap Hari.
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mt-3 leading-relaxed">
          Dapatkan inspirasi resep, tips dapur mingguan, dan ide masakan menarik langsung dari Recipedia.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl max-w-md mx-auto border border-white/20 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#D98B55]" />
            <span className="text-sm font-medium">
              Terima kasih! Kami telah mengirimkan inspirasi resep perdana ke email Anda.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-1.5 rounded-2xl shadow-xl gap-2">
              <div className="flex items-center px-3 flex-1 gap-2 text-[#282B25]">
                <Mail className="w-5 h-5 text-[#809276] shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda..."
                  className="w-full bg-transparent border-none text-[#282B25] placeholder-[#77796F] text-sm focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#D98B55] hover:bg-[#C57741] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
              >
                Langganan
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-red-200 mt-2 text-left px-2">{errorMsg}</p>
            )}
            <p className="text-[11px] text-white/60 mt-3">
              Privasi Anda aman. Kami tidak akan pernah mengirimkan spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
