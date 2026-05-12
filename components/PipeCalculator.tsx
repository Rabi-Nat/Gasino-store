
import React, { useState, useMemo } from 'react';
import { Ruler, Droplets, Gauge, AlertCircle, Zap, TableProperties, ChevronLeft } from 'lucide-react';
import { PIPE_DATA, PIPE_SIZES, DENSITY_FACTORS } from '../constants';
import { CalculationResult } from '../types';

export const PipeCalculator: React.FC = () => {
  const [length, setLength] = useState<string>('');
  const [flow, setFlow] = useState<string>('');
  const [density, setDensity] = useState<string>('0.65');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getDensityFactor = (d: number): number => {
    if (d <= 0.5) return 1.15;
    if (d >= 1.0) return 0.8;
    for (let i = 0; i < DENSITY_FACTORS.length - 1; i++) {
      const p1 = DENSITY_FACTORS[i];
      const p2 = DENSITY_FACTORS[i + 1];
      if (d >= p1.d && d <= p2.d) {
        const ratio = (d - p1.d) / (p2.d - p1.d);
        return p1.f + ratio * (p2.f - p1.f);
      }
    }
    return 1.0;
  };

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const lenVal = parseFloat(length);
    const flowVal = parseFloat(flow);
    const densityVal = parseFloat(density);

    if (isNaN(lenVal) || isNaN(flowVal) || lenVal <= 0 || flowVal <= 0) {
      setError('لطفاً مقادیر معتبر وارد کنید.');
      return;
    }

    const factor = getDensityFactor(densityVal);
    const modifiedFlow = flowVal * factor;
    const row = PIPE_DATA.find(r => r.length >= lenVal);

    if (!row) {
      setError('طول بیش از حد مجاز (۳۰۰ متر).');
      return;
    }

    let foundIndex = -1;
    for (let i = 0; i < PIPE_SIZES.length; i++) {
      if (row.capacities[i] >= modifiedFlow) {
        foundIndex = i;
        break; 
      }
    }

    if (foundIndex !== -1) {
      setResult({
        size: PIPE_SIZES[foundIndex],
        actualCapacity: row.capacities[foundIndex],
        lengthUsed: row.length,
        modifiedFlow: modifiedFlow,
        densityFactor: factor
      });
    } else {
      setError(`مصرف اصلاح شده (${modifiedFlow.toFixed(1)}) بیش از ظرفیت لوله ۴ اینچ است.`);
    }
  };

  const tableContext = useMemo(() => {
    if (!result) return null;
    return PIPE_DATA.find(r => r.length === result.lengthUsed);
  }, [result]);

  return (
    <div className="space-y-5 page-enter">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <form onSubmit={calculateSize} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase mr-1">حداکثر طول مسیر (m)</label>
              <div className="relative">
                <Ruler className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type="number" step="0.1" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-slate-50 pr-11 pl-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold ltr"
                  placeholder="مثال: 15"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase mr-1">میزان مصرف (m³/hr)</label>
              <div className="relative">
                <Droplets className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type="number" step="0.01" inputMode="decimal" value={flow} onChange={(e) => setFlow(e.target.value)}
                  className="w-full bg-slate-50 pr-11 pl-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold ltr"
                  placeholder="مثال: 4.5"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 active:scale-95 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-lg"
          >
            محاسبه سایز لوله
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-6 rounded-2xl flex items-center gap-4 text-center">
          <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
          <p className="font-bold text-sm">{error}</p>
        </div>
      )}

      {result ? (
        <div className="bg-slate-900 text-white rounded-3xl p-7 relative overflow-hidden shadow-xl animate-in fade-in duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="relative z-10">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest block mb-1">سایز لوله استاندارد</span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-black font-mono tracking-tighter ltr" dir="ltr">{result.size}</span>
              <span className="text-2xl font-bold opacity-40 italic">Inch</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
              <div>
                <span className="text-slate-500 text-[10px] font-bold block mb-1">حداکثر طول</span>
                <span className="text-lg font-black">{result.lengthUsed} <span className="text-[10px] font-normal opacity-50">متر</span></span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block mb-1">حداکثر ظرفیت</span>
                <span className="text-lg font-black ltr" dir="ltr">{result.actualCapacity} <span className="text-[10px] font-normal opacity-50 italic">m³/h</span></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !error && (
          <div className="border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 flex flex-col items-center justify-center p-10 text-center">
            <Zap className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-slate-400 font-bold text-sm">منتظر ورود اطلاعات برای محاسبه...</p>
          </div>
        )
      )}

      {/* Full Pipe Sizing Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <TableProperties className="w-4 h-4" />
            جدول ظرفیت لوله‌ها (m³/hr)
          </h3>
          <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black">جدول ۱۷-۳-۱</span>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-right text-[10px]">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr className="ltr">
                <th className="p-3 text-slate-400 font-black whitespace-nowrap">طول (m)</th>
                {[...PIPE_SIZES].map(size => (
                  <th key={size} className="p-3 text-slate-400 font-black text-center whitespace-nowrap">{size}"</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-bold">
              {PIPE_DATA.map((row) => (
                <tr 
                  key={row.length} 
                  className={`
                    transition-colors ltr
                    ${result?.lengthUsed === row.length ? 'bg-blue-50/50' : 'hover:bg-slate-50/30'}
                  `}
                >
                  <td className="p-3 text-slate-500 font-black">{row.length}</td>
                  {row.capacities.map((cap, idx) => (
                    <td 
                      key={idx} 
                      className={`
                        p-3 text-center transition-all
                        ${result?.size === PIPE_SIZES[idx] && result?.lengthUsed === row.length 
                          ? 'bg-blue-600 text-white shadow-inner transform scale-110 rounded-sm' 
                          : 'text-slate-600'}
                      `}
                    >
                      {cap}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
