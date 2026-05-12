
import React from 'react';
import { Info } from 'lucide-react';

interface MeterData {
  type: string;
  maxArea: number;
  maxFlow: number;
  maxUnits: number;
  replacementLength: string;
  replacementDiameter: string;
  connectorSize: string;
}

const METER_DATA: MeterData[] = [
  { type: 'G2.5', maxArea: 60, maxFlow: 4, maxUnits: 1, replacementLength: '25-30', replacementDiameter: '1', connectorSize: '1' },
  { type: 'G4', maxArea: 150, maxFlow: 6, maxUnits: 1, replacementLength: '25-30', replacementDiameter: '1', connectorSize: '1' },
  { type: 'G6', maxArea: 450, maxFlow: 10, maxUnits: 3, replacementLength: '25-30', replacementDiameter: '1', connectorSize: '1' },
  { type: 'G10', maxArea: 750, maxFlow: 16, maxUnits: 5, replacementLength: '35-40', replacementDiameter: '1 1/2', connectorSize: '1' },
  { type: 'G16', maxArea: 1100, maxFlow: 25, maxUnits: 7, replacementLength: '35-40', replacementDiameter: '1 1/2', connectorSize: '1 1/2' },
  { type: 'G25', maxArea: 1800, maxFlow: 40, maxUnits: 12, replacementLength: '82', replacementDiameter: '2', connectorSize: '1 1/2' },
  { type: 'G40', maxArea: 3000, maxFlow: 65, maxUnits: 20, replacementLength: '120-150', replacementDiameter: '2', connectorSize: '1 1/2' },
  { type: 'G65', maxArea: 4500, maxFlow: 100, maxUnits: 30, replacementLength: '120-150', replacementDiameter: '2', connectorSize: '1 1/2' },
];

export const MeterSpecs: React.FC = () => {
  return (
    <div className="space-y-4 lg:space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs lg:text-sm text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3.5 lg:px-6 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider">مدل</th>
                <th className="px-3 py-3.5 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">زیربنا(m²)</th>
                <th className="px-3 py-3.5 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">ظرفیت</th>
                <th className="px-3 py-3.5 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">واحد</th>
                <th className="px-3 py-3.5 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">ابعاد(cm)</th>
                <th className="px-3 py-3.5 lg:px-4 lg:py-4 font-black text-slate-400 text-[9px] uppercase tracking-wider text-center">شیر(in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {METER_DATA.map((row, index) => (
                <tr key={row.type} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 lg:px-6 lg:py-3.5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[10px] lg:text-xs">
                          {row.type}
                       </div>
                       <span className="font-bold text-slate-700 hidden sm:inline">کنتور {row.type}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center">
                    <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500">تا {row.maxArea}</span>
                  </td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono font-bold text-emerald-600">{row.maxFlow}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center text-slate-500 font-bold">{row.maxUnits}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-mono text-slate-500 text-[10px] lg:text-xs">{row.replacementLength}</td>
                  <td className="px-3 py-2.5 lg:px-4 lg:py-3.5 text-center font-bold text-slate-700 ltr" dir="ltr">
                    {row.replacementDiameter}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-4 lg:p-5 rounded-2xl flex items-start gap-3 shadow-sm shadow-emerald-50">
        <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="text-[11px] lg:text-xs font-medium text-emerald-900 leading-relaxed">
          <strong className="block mb-0.5">نکته تخصصی:</strong>
          برای واحدهای تجاری، ظرفیت کنتور صرفاً بر اساس "مجموع مصرف کل" تعیین می‌گردد.
        </div>
      </div>
    </div>
  );
};
