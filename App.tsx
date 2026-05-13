import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Calculator, 
  Wind, 
  Gauge, 
  Ruler, 
  ShieldCheck, 
  Banknote, 
  MessageSquare,
  ChevronLeft,
  Store as StoreIcon
} from 'lucide-react';
import { PipeCalculator } from './components/PipeCalculator';
import { Ventilation } from './components/Ventilation';
import { MeterSpecs } from './components/MeterSpecs';
import { ValveInstallation } from './components/ValveInstallation';
import { ApplianceDistance } from './components/ApplianceDistance';
import { PriceList } from './components/PriceList';
import { ContactUs } from './components/ContactUs';
import { Store } from './components/Store';

type TabId = 'pipe' | 'ventilation' | 'meter' | 'valve' | 'safety' | 'price' | 'contact' | 'store';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('pipe');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'pipe' as TabId, label: 'سایز لوله‌کشی', icon: Calculator, component: PipeCalculator },
    { id: 'ventilation' as TabId, label: 'تهویه و دریچه', icon: Wind, component: Ventilation },
    { id: 'meter' as TabId, label: 'مشخصات کنتور', icon: Gauge, component: MeterSpecs },
    { id: 'valve' as TabId, label: 'فواصل شیرآلات', icon: Ruler, component: ValveInstallation },
    { id: 'safety' as TabId, label: 'فواصل ایمنی', icon: ShieldCheck, component: ApplianceDistance },
    { id: 'price' as TabId, label: 'تعرفه ۱۴۰۴', icon: Banknote, component: PriceList },
    { id: 'store' as TabId, label: 'فروشگاه', icon: StoreIcon, component: Store },
    { id: 'contact' as TabId, label: 'تماس با ما', icon: MessageSquare, component: ContactUs },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || PipeCalculator;
  const activeLabel = tabs.find(t => t.id === activeTab)?.label || '';

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-blue-600 flex flex-col items-center justify-center transition-opacity duration-700">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl animate-bounce mb-6">
          <Flame className="text-blue-600 w-16 h-16" />
        </div>
        <h1 className="text-white text-4xl font-black mb-2">Gasino</h1>
        <div className="mt-12">
          <div className="w-32 h-1 bg-blue-400/30 rounded-full overflow-hidden">
            <div className="w-full h-full bg-white" style={{ animation: 'loading-bar 1.5s ease-in-out infinite' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden text-slate-900 bg-slate-50 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-l border-slate-200 p-6 z-50 no-print">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-100">
            <Flame className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-tight">Gasino</h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">محاسبات مبحث ۱۷</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1 overflow-y-auto custom-scrollbar pr-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                sidebar-btn flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${activeTab === tab.id ? 'active' : 'text-slate-500 hover:bg-slate-50'}
              `}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 font-sans">
            <p className="text-[10px] text-blue-700 font-black leading-relaxed">ویرایش پنجم ۱۴۰۳</p>
            <p className="text-[9px] text-blue-400 mt-0.5 uppercase font-bold tracking-tighter ltr">National Building Regulations</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 sticky top-0 z-40 no-print">
        <div className="flex items-center gap-3">
          <Flame className="text-blue-600 w-6 h-6" />
          <span className="font-black text-lg">{activeLabel}</span>
        </div>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black italic">V5-1403</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full custom-scrollbar p-4 md:p-10 pb-28 md:pb-10 overflow-y-auto">
          <ActiveComponent />
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-between items-center z-40 no-print">
          <div className="flex w-full overflow-x-auto no-scrollbar gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center justify-center min-w-[70px] py-1 transition-all duration-300 relative
                  ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}
                `}
              >
                {activeTab === tab.id && (
                  <div className="absolute top-[-8px] w-5 h-1 bg-blue-600 rounded-full" />
                )}
                <tab.icon className="w-6 h-6 mb-1" />
                <span className="text-[9px] font-bold">
                  {tab.id === 'valve' ? 'شیر' : tab.label.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
};

export default App;
