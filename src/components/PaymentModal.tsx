import { useState, useRef, useEffect } from "react";
import { X, CreditCard, Banknote, Send, CheckCircle2, Upload, ImageIcon, Loader2, Sparkles } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  cashPrice: string;   // e.g. "$160"
  cardPrice: string;   // e.g. "$166.40" (price + 4%)
  stripeLink: string;
}

export function calcCardPrice(priceStr: string): string {
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return priceStr;
  return "$" + (num * 1.04).toFixed(2);
}

export default function PaymentModal({
  isOpen,
  onClose,
  courseName,
  cashPrice,
  cardPrice,
  stripeLink,
}: PaymentModalProps) {
  const [step, setStep] = useState<"choose" | "zelle" | "done">("choose");
  const [form, setForm] = useState({ name: "", phone: "", reference: "" });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleClose() {
    setStep("choose");
    setForm({ name: "", phone: "", reference: "" });
    setScreenshot(null);
    setScreenshotPreview(null);
    setLoading(false);
    onClose();
  }

  function handleCardPay() {
    window.open(stripeLink, "_blank", "noopener,noreferrer");
    handleClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleZelleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!screenshot) {
      alert("Please upload a screenshot of your Zelle payment.");
      return;
    }
    setLoading(true);
    
    try {
      const supabase = getSupabase();
      let publicUrl = "";

      if (supabase) {
        // 1. Upload screenshot to Supabase Storage
        const fileExt = screenshot.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `screenshots/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('payments')
          .upload(filePath, screenshot);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl: url } } = supabase.storage
          .from('payments')
          .getPublicUrl(filePath);
        
        publicUrl = url;
      } else {
        // Fallback to Base64 storage in MongoDB since Supabase is unconfigured
        console.warn("Supabase not configured, using Base64 string from preview.");
        publicUrl = screenshotPreview || "";
      }

      // 2. Submit to MongoDB API
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          courseName,
          screenshotUrl: publicUrl,
          amount: cashPrice,
          status: 'pending'
        }),
      });

      if (!response.ok) throw new Error('Failed to submit payment details');
      
      setStep("done");
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b bg-[#05264d]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Payment Options
            </p>
            <h2 className="text-lg font-bold text-white mt-0.5">{courseName}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Note Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <Banknote className="w-4 h-4 shrink-0" />
            Zelle Cash Payment: <span className="text-green-700 font-bold">{cashPrice}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <CreditCard className="w-4 h-4 shrink-0" />
            Card Payment: <span className="text-[#d53033] font-bold">{cardPrice}</span>
            <span className="text-amber-600 font-normal text-xs">(Includes 4% processing fee)</span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" data-lenis-prevent>
          {/* STEP: Choose */}
          {step === "choose" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center mb-2">
                Choose your preferred payment method below.
              </p>
              
              <button
                onClick={() => setStep("zelle")}
                className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">Pay with Cash (Zelle)</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Recommended — Save 4% fees
                  </p>
                </div>
              </button>

              <button
                onClick={handleCardPay}
                className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#05264d] flex items-center justify-center shrink-0 shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">Pay by Card (Stripe)</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Standard — Quick & Secure
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* STEP: Zelle form */}
          {step === "zelle" && (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-sm">
                <p className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Zelle Instructions:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-600 uppercase font-bold mb-1 tracking-wider">Send To:</p>
                    <p className="text-lg font-black text-green-900 break-all leading-tight">
                      payments@exceedlearningcenterny.com
                    </p>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-green-700 font-medium ml-1">
                    <li>Send <strong className="text-green-900">{cashPrice}</strong> via Zelle</li>
                    <li>Take a screenshot of the confirmation</li>
                    <li>Upload the screenshot below</li>
                  </ol>
                </div>
              </div>

              <form onSubmit={handleZelleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider ml-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-[#05264d] font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider ml-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="000-000-0000"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-[#05264d] font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider ml-1">
                    Zelle Reference # *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. ZL12345678"
                    value={form.reference}
                    onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-[#05264d] font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider ml-1">
                    Payment Screenshot *
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative overflow-hidden cursor-pointer border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition-all min-h-[120px] ${
                      screenshotPreview 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {screenshotPreview ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <img src={screenshotPreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold uppercase tracking-widest">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                          <Upload className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">Tap to upload screenshot</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("choose")}
                    className="flex-1 py-4 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex-[2] py-4 rounded-xl bg-green-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-60 shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? "Processing..." : "Confirm My Payment"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP: Done */}
          {step === "done" && (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                Submission Received!
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                Thank you, <strong>{form.name}</strong>! We've received your Zelle payment details and screenshot. Our team will verify it shortly and confirm your enrollment via email.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-4 rounded-2xl bg-[#05264d] text-white font-black text-sm hover:bg-[#05264d]/90 shadow-xl shadow-[#05264d]/10 transition-all active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

