
import React from 'react';
import { Banknote, TrendingUp, Calendar } from 'lucide-react';

interface PriceRow {
  title: string;
  g2_5: string;
  g4: string;
  g6: string;
  g10: string;
  g16: string;
  g25: string;
  g40: string;
  g65: string;
}

const PRICE_DATA: PriceRow[] = [
  { title: 'نظارت سامانه گاز روکار', g2_5: '15,288,768', g4: '17,667,021', g6: '19,854,164', g10: '21,765,260', g16: '24,525,732', g25: '28,517,799', g40: '32,807,148', g65: '45,760,132' },
  { title: 'طراحی سامانه گاز روکار', g2_5: '6,879,946', g4: '7,950,159', g6: '8,934,373', g10: '9,794,367', g16: '11,036,579', g25: '12,833,009', g40: '14,763,216', g65: '20,592,059' },
  { title: 'نظارت سامانه گاز توکار', g2_5: '21,404,275', g4: '24,733,829', g6: '27,795,829', g10: '30,471,364', g16: '34,336,024', g25: '39,924,918', g40: '45,930,007', g65: '64,064,184' },
  { title: 'طراحی سامانه گاز توکار', g2_5: '9,631,923', g4: '11,130,223', g6: '12,508,123', g10: '13,712,113', g16: '15,451,210', g25: '17,966,213', g40: '20,668,503', g65: '28,828,882' },
  { title: 'بازرسی آنکال و منقضی', g2_5: '5,096,256', g4: '5,889,007', g6: '6,618,054', g10: '7,255,086', g16: '8,175,244', g25: '9,505,933', g40: '10,935,716', g65: '15,253,377' },
];

export const PriceList: React.FC = () => {
  return (
    <div className="space-y-4 lg:space-y-6 max-w-4xl mx-auto">
      
      <div className="bg-blue-600 rounded-2xl p-4 lg:p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg shadow-blue-100">
         <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
               <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <div>
               <h3 className="text-sm lg:text-lg font-black">تعرفه‌های مصوب ۱۴۰۴</h3>
               <p className="text-blue-100 text-[9px] lg:text-xs mt-0.5">بروزرسانی ابلاغیه سازمان نظام مهندسی</p>
            </div>
         </div>
         <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-bold text-[10px]">اجرا از ۱ اردیبهشت</span>
         </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-[11px] lg:text-sm text-right">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 lg:px-6 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider sticky right-0 bg-slate-50 z-10 border-l border-slate-100 min-w-[140px]">شرح خدمات</th>
                <th className="px-3 py-3 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">G2.5</th>
                <th className="px-3 py-3 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">G4</th>
                <th className="px-3 py-3 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">G6</th>
                <th className="px-3 py-3 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">G10</th>
                <th className="px-3 py-3 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">G16+</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PRICE_DATA.map((row, index) => (
                <tr key={index} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 lg:px-6 lg:py-3.5 font-bold text-slate-700 sticky right-0 bg-white group-hover:bg-slate-50 z-10 border-l border-slate-100">{row.title}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono font-medium text-slate-600 ltr" dir="ltr">{row.g2_5}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono font-medium text-slate-600 ltr" dir="ltr">{row.g4}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono font-medium text-slate-600 ltr" dir="ltr">{row.g6}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono font-medium text-slate-600 ltr" dir="ltr">{row.g10}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono font-bold text-blue-600 ltr" dir="ltr">{row.g16}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">مبالغ به واحد ریال می‌باشد</div>
    </div>
  );
};
