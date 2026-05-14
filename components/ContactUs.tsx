
import React, { useState } from 'react';
import { Mail, MessageSquare, Heart, ExternalLink, Copy, Check } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const email = 'rabi.nateghi@gmail.com';
  const phoneNumber = '09031848877';
  const [copied, setCopied] = useState(false);

  const copyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      
      <div className="bg-white rounded-[3rem] premium-shadow border border-slate-200/60 p-10 lg:p-12 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
         
         <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-8 shadow-inner border border-blue-100">
               <MessageSquare className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-6">ارتباط با ما</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
               این پلتفرم با هدف ساده‌سازی محاسبات مهندسی طراحی شده است. 
               هرگونه ایده یا گزارش خطا، گامی است به سوی کمال این ابزار.
            </p>
         </div>
      </div>

      <div className="grid md:grid-cols-1 max-w-lg mx-auto gap-6">
          <a 
            href={`mailto:${email}`} 
            className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm group hover:border-blue-400 hover:scale-[1.02] transition-all duration-500 flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Mail className="w-7 h-7" />
               </div>
               <div className="flex flex-col text-right">
                <span className="font-mono text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors ltr mb-1" dir="ltr">
                  {email}
                </span>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">شماره تماس:</span>
                  <span className="font-mono text-[11px] font-bold text-slate-400 ltr" dir="ltr">
                    {phoneNumber}
                  </span>
                  <button 
                    onClick={copyPhone}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center"
                    title="کپی شماره"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                </div>
               </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-all" />
          </a>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              <Mail className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-2 ltr" dir="ltr">
              <span className="font-mono text-[13px] font-bold text-slate-500">Farid.sep@gmail.com</span>
              <span className="font-mono text-[13px] font-bold text-slate-500">En.ebrahimnezhad@gmail.com</span>
            </div>
          </div>
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
         <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
            <span>ساخته شده با</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>برای جامعه مهندسی ایران</span>
         </div>
      </div>
    </div>
  );
};
