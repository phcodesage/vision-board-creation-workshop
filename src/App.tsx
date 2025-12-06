import { Calendar, Clock, Heart, Lightbulb, Users, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import heroImage from './assets/hero-img.jpg';

function App() {
  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="relative bg-[#0e1f3e] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f7e0e0] rounded-full blur-3xl"></div>
        </div>

        <nav className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="https://lirp.cdn-website.com/3bba8822/dms3rep/multi/opt/Exceed-learning-center-1920w.png" alt="Exceed Learning Center" className="h-14 w-auto" />
            </div>
            <button
              onClick={scrollToRegistration}
              className="bg-[#ca3433] hover:bg-[#a82928] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-lg"
            >
              Register Now
            </button>
          </div>
        </nav>

        <div className="relative container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                  Vision Board Creation Workshop
                </h1>
                <p className="text-3xl md:text-4xl text-[#f7e0e0] mb-8 font-light">
                  Dream it. See it. Create it.
                </p>
                <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed">
                  Join us to craft your vision board and map out your goals with clarity.
                  Transform your dreams into a visual masterpiece that inspires action.
                </p>
                <button
                  onClick={scrollToRegistration}
                  className="bg-[#ca3433] hover:bg-[#a82928] text-white px-12 py-5 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Register Now
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#ca3433] to-[#f7e0e0] rounded-2xl blur-lg opacity-30"></div>
                <img
                  src={heroImage}
                  alt="Vision Board Workshop Atmosphere"
                  className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-8 text-[#f7e0e0] text-center">Upcoming Sessions</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-center">
                    <Calendar className="w-10 h-10 mb-4 mx-auto text-[#f7e0e0]" />
                    <p className="font-bold text-xl mb-3">January 2</p>
                    <div className="flex items-center justify-center space-x-2 text-base">
                      <Clock className="w-5 h-5" />
                      <span>1:00-4:00 PM</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-center">
                    <Calendar className="w-10 h-10 mb-4 mx-auto text-[#f7e0e0]" />
                    <p className="font-bold text-xl mb-3">January 4</p>
                    <div className="flex items-center justify-center space-x-2 text-base">
                      <Clock className="w-5 h-5" />
                      <span>12:00-3:00 PM</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-center">
                    <Calendar className="w-10 h-10 mb-4 mx-auto text-[#f7e0e0]" />
                    <p className="font-bold text-xl mb-3">January 8</p>
                    <div className="flex items-center justify-center space-x-2 text-base">
                      <Clock className="w-5 h-5" />
                      <span>6:00-9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-[#f7e0e0]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0e1f3e] text-center mb-12">
              What to Expect
            </h2>
            <p className="text-xl text-[#0e1f3e]/80 text-center mb-16 max-w-4xl mx-auto leading-relaxed">
              Our Vision Board Creation Workshop is a guided, hands-on experience where you'll create a powerful
              visual representation of your goals and dreams. In a supportive, creative environment, you'll learn
              proven techniques for effective goal-setting while crafting a beautiful board that keeps you inspired.
              All materials are provided, or feel free to bring your own special items to personalize your creation.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#ca3433] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0e1f3e] mb-4 text-center">
                  Clarify Your Goals
                </h3>
                <p className="text-[#0e1f3e]/70 text-center leading-relaxed text-lg">
                  Get crystal clear on what you want to achieve through guided exercises and intentional reflection.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#ca3433] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0e1f3e] mb-4 text-center">
                  Visualize Your Dreams
                </h3>
                <p className="text-[#0e1f3e]/70 text-center leading-relaxed text-lg">
                  Transform abstract goals into a tangible, inspiring visual that keeps you motivated daily.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#ca3433] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0e1f3e] mb-4 text-center">
                  Connect with Others
                </h3>
                <p className="text-[#0e1f3e]/70 text-center leading-relaxed text-lg">
                  Share your journey with like-minded people in a supportive, encouraging community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0e1f3e] text-center mb-20">
              Event Details
            </h2>

            <div className="space-y-8 mb-20">
              <div className="bg-[#f7e0e0] rounded-2xl p-10 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-6 md:mb-0">
                    <h3 className="text-3xl font-bold text-[#0e1f3e] mb-3">Session 1</h3>
                    <div className="flex items-center space-x-6 text-[#0e1f3e]/80 text-xl">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-[#ca3433]" />
                        <span className="font-semibold">January 2, 2025</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-6 h-6 text-[#ca3433]" />
                        <span>1:00-4:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={scrollToRegistration}
                    className="bg-[#ca3433] hover:bg-[#a82928] text-white px-10 py-4 rounded-full font-semibold transition-all hover:scale-105 text-lg"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>

              <div className="bg-[#f7e0e0] rounded-2xl p-10 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-6 md:mb-0">
                    <h3 className="text-3xl font-bold text-[#0e1f3e] mb-3">Session 2</h3>
                    <div className="flex items-center space-x-6 text-[#0e1f3e]/80 text-xl">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-[#ca3433]" />
                        <span className="font-semibold">January 4, 2025</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-6 h-6 text-[#ca3433]" />
                        <span>1:00-3:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={scrollToRegistration}
                    className="bg-[#ca3433] hover:bg-[#a82928] text-white px-10 py-4 rounded-full font-semibold transition-all hover:scale-105 text-lg"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>

              <div className="bg-[#f7e0e0] rounded-2xl p-10 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-6 md:mb-0">
                    <h3 className="text-3xl font-bold text-[#0e1f3e] mb-3">Session 3</h3>
                    <div className="flex items-center space-x-6 text-[#0e1f3e]/80 text-xl">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-[#ca3433]" />
                        <span className="font-semibold">January 8, 2025</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-6 h-6 text-[#ca3433]" />
                        <span>6:00-9:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={scrollToRegistration}
                    className="bg-[#ca3433] hover:bg-[#a82928] text-white px-10 py-4 rounded-full font-semibold transition-all hover:scale-105 text-lg"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0e1f3e] to-[#0e1f3e]/90 rounded-2xl p-10 text-white">
              <div className="flex items-start space-x-4 mb-4">
                <MapPin className="w-8 h-8 text-[#f7e0e0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-2xl mb-2">Location</h4>
                  <p className="text-gray-200 text-xl">In-person workshop at Creative Studio</p>
                  <p className="text-gray-300 text-base mt-2">Full address provided upon registration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0e1f3e] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              What to Bring & What You'll Get
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                <h3 className="text-3xl font-bold mb-8 text-[#f7e0e0]">What to Bring</h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg"><strong>Optional:</strong> Personal magazines, photos, or printed images that inspire you</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg"><strong>Optional:</strong> Special mementos or items you'd like to include</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">An open mind and willingness to dream big</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Comfortable clothing you don't mind getting crafty in</span>
                  </li>
                </ul>
                <div className="mt-8 p-6 bg-[#ca3433]/20 rounded-xl border border-[#ca3433]/30">
                  <p className="text-base text-[#f7e0e0]">
                    <strong>All supplies provided:</strong> Poster boards, magazines, scissors, glue sticks, markers,
                    decorative materials, and more!
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                <h3 className="text-3xl font-bold mb-8 text-[#f7e0e0]">What You'll Get</h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Your own completed vision board to take home</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Goal-setting framework and planning worksheets</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Step-by-step guide to manifesting your vision</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Access to our supportive community group</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Light refreshments and snacks throughout the session</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-[#ca3433] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg">Renewed motivation and clarity about your future</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7e0e0]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0e1f3e] text-center mb-6">
              What People Are Saying
            </h2>
            <p className="text-center text-[#0e1f3e]/70 mb-20 text-xl">Real stories from past participants</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 text-[#ca3433]">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-6 h-6 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[#0e1f3e]/80 mb-8 leading-relaxed text-lg">
                  "This workshop changed my life. Seeing my goals every day on my vision board kept me focused
                  and motivated. Six months later, I've achieved things I only dreamed about!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#ca3433] rounded-full flex items-center justify-center text-white font-bold">
                    SM
                  </div>
                  <div>
                    <p className="font-bold text-[#0e1f3e]">Sarah Mitchell</p>
                    <p className="text-sm text-[#0e1f3e]/60">Entrepreneur</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 text-[#ca3433]">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-6 h-6 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[#0e1f3e]/80 mb-8 leading-relaxed text-lg">
                  "I was skeptical at first, but the guided process helped me clarify what I really want.
                  The community was so supportive, and my vision board is now my daily inspiration."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#ca3433] rounded-full flex items-center justify-center text-white font-bold">
                    JL
                  </div>
                  <div>
                    <p className="font-bold text-[#0e1f3e]">James Liu</p>
                    <p className="text-sm text-[#0e1f3e]/60">Teacher</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 text-[#ca3433]">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-6 h-6 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[#0e1f3e]/80 mb-8 leading-relaxed text-lg">
                  "The perfect blend of creativity and intention-setting. I left feeling energized and clear
                  about my path forward. Highly recommend to anyone feeling stuck or seeking direction!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#ca3433] rounded-full flex items-center justify-center text-white font-bold">
                    MP
                  </div>
                  <div>
                    <p className="font-bold text-[#0e1f3e]">Maria Patel</p>
                    <p className="text-sm text-[#0e1f3e]/60">Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="registration" className="py-20 bg-gradient-to-br from-[#0e1f3e] to-[#ca3433] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-20 h-20 mx-auto mb-8 text-[#f7e0e0]" />
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to Create Your Vision?
            </h2>
            <p className="text-2xl mb-12 text-gray-200 leading-relaxed">
              Spaces are limited to ensure an intimate, focused experience.
              Reserve your spot today and start manifesting your dreams.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 mb-10 border border-white/20">
              <h3 className="text-3xl font-bold mb-8">Registration Information</h3>
              <div className="space-y-6 text-left max-w-2xl mx-auto">
                <div className="flex items-start space-x-4">
                  <Mail className="w-8 h-8 text-[#f7e0e0] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-2 text-xl">Email</p>
                    <a href="mailto:Info@ExceedLearningCenterny.com" className="text-[#f7e0e0] hover:underline text-lg">
                      Info@ExceedLearningCenterny.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-8 h-8 text-[#f7e0e0] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-2 text-xl">Phone</p>
                    <a href="tel:+17186831750" className="text-[#f7e0e0] hover:underline text-lg">
                      +1 718-683-1750
                    </a>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-white/10 rounded-xl">
                  <p className="text-lg">
                    <strong>Investment:</strong> $75 per person (includes all materials and refreshments)
                  </p>
                  <p className="text-lg mt-3">
                    <strong>Early Bird Special:</strong> Register by December 20th and save $15!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = 'mailto:Info@ExceedLearningCenterny.com?subject=Vision Board Workshop Registration'}
              className="bg-[#ca3433] hover:bg-[#a82928] text-white px-14 py-5 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Register Now
            </button>

            <p className="mt-8 text-base text-gray-300">
              Questions? We're here to help! Reach out anytime.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#0e1f3e] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src="https://lirp.cdn-website.com/3bba8822/dms3rep/multi/opt/Exceed-learning-center-1920w.png" alt="Exceed Learning Center" className="h-10 w-auto" />
                </div>
                <p className="text-gray-400 text-base leading-relaxed">
                  Empowering individuals to visualize and achieve their dreams through creative expression
                  and intentional goal-setting.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-[#f7e0e0] text-lg">Contact</h4>
                <div className="space-y-3 text-base text-gray-400">
                  <p className="flex items-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <a href="mailto:Info@ExceedLearningCenterny.com" className="hover:text-white">
                      Info@ExceedLearningCenterny.com
                    </a>
                  </p>
                  <p className="flex items-center space-x-3">
                    <Phone className="w-5 h-5" />
                    <a href="tel:+17186831750" className="hover:text-white">
                      +1 718-683-1750
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-[#f7e0e0] text-lg">Quick Links</h4>
                <div className="space-y-3 text-base text-gray-400">
                  <p><a href="#" className="hover:text-white">About Us</a></p>
                  <p><a href="#" className="hover:text-white">Past Workshops</a></p>
                  <p><a href="#" className="hover:text-white">FAQ</a></p>
                  <p><a href="#" className="hover:text-white">Privacy Policy</a></p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
              <p>© 2025 Vision Board Workshop. All rights reserved.</p>
              <p className="mt-2">Creating clarity, one vision board at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
