import {
  Wallet,
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  PiggyBank,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const features = [
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Multi-Wallet Management",
      description:
        "Kelola berbagai dompet digital dan rekening bank dalam satu aplikasi dengan mudah dan aman.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analisis Keuangan",
      description:
        "Dapatkan insight mendalam tentang pola pengeluaran dan pemasukan Anda dengan grafik interaktif.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keamanan Terjamin",
      description:
        "Teknologi enkripsi tingkat bank untuk melindungi data keuangan Anda dari ancaman cyber.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Laporan Real-time",
      description:
        "Monitor transaksi dan saldo secara real-time dengan notifikasi instant untuk setiap aktivitas.",
    },
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Goal Tracking",
      description:
        "Tetapkan target tabungan dan investasi, pantau progress Anda menuju kebebasan finansial.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description:
        "Aplikasi yang dioptimalkan untuk penggunaan mobile dengan interface yang intuitif dan responsif.",
    },
  ];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900">Kelola</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    Keuangan
                  </span>
                  <br />
                  <span className="text-gray-900">dengan Cerdas</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  TataCuan adalah solusi manajemen keuangan terdepan yang
                  membantu Anda mengontrol setiap rupiah dengan mudah, aman, dan
                  efisien.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  Mulai Gratis Sekarang
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300">
                  Lihat Demo
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50K+</div>
                  <div className="text-gray-600">Pengguna Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">4.9★</div>
                  <div className="text-gray-600">Rating App Store</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Total Saldo
                    </h3>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    Rp 15,750,000
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-700">
                        Pemasukan Bulan Ini
                      </span>
                      <span className="font-semibold text-green-600">
                        +Rp 8,500,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-700">
                        Pengeluaran Bulan Ini
                      </span>
                      <span className="font-semibold text-red-600">
                        -Rp 3,250,000
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      75% dari target bulanan tercapai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan <span className="text-green-600">TataCuan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dilengkapi dengan teknologi terdepan untuk memberikan pengalaman
              manajemen keuangan yang tak tertandingi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white to-green-50 border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-r from-green-500 to-emerald-600"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-4xl font-bold mb-6">
                Mengapa Memilih TataCuan?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-200 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Teknologi AI Terdepan
                    </h3>
                    <p className="text-green-100">
                      Algoritma machine learning untuk prediksi keuangan yang
                      akurat
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-200 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Bank-Grade Security
                    </h3>
                    <p className="text-green-100">
                      Enkripsi end-to-end dan sertifikasi keamanan internasional
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-200 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      24/7 Customer Support
                    </h3>
                    <p className="text-green-100">
                      Tim support berpengalaman siap membantu kapan saja
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">50K+</div>
                    <div className="text-green-100">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-green-100">Secure</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">25%</div>
                    <div className="text-green-100">Avg. Savings</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">4.9</div>
                    <div className="text-green-100">App Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Siap Mengambil Kontrol Keuangan Anda?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan
            mengelola keuangan dengan TataCuan
          </p>
          <button className="bg-white text-green-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
            Download Sekarang - Gratis!
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-green-200 mt-4">
            Tersedia di App Store dan Google Play
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TataCuan</span>
              </div>
              <p className="text-gray-400">
                Solusi manajemen keuangan terdepan untuk masa depan yang lebih
                sejahtera.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <div className="space-y-2 text-gray-400">
                <div>Mobile App</div>
                <div>Web Dashboard</div>
                <div>API Integration</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <div className="space-y-2 text-gray-400">
                <div>Tentang Kami</div>
                <div>Karir</div>
                <div>Blog</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Kontak</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TataCuan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
