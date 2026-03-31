
import { motion } from 'motion/react';
import { GitBranch, AlertCircle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export const RiskAnalysisPage = () => {
  return (
    <motion.div 
      key="risk-analysis"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      <div className="bg-white rounded-2xl border border-border-base p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-base">
            <GitBranch size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">리스크 분석 (Risk Analysis)</h1>
            <p className="text-text-secondary text-sm">Jira · Bitbucket · Sparrow · Jenkins 교차 분석 결과</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-nested-bg border border-border-base">
            <div className="flex items-center gap-2 mb-4 text-danger font-bold">
              <AlertCircle size={18} />
              <span>고위험 (High Risk)</span>
            </div>
            <div className="text-3xl font-bold text-text-primary mb-1">3</div>
            <div className="text-xs text-text-muted">즉시 조치가 필요한 항목</div>
          </div>
          
          <div className="p-6 rounded-xl bg-nested-bg border border-border-base">
            <div className="flex items-center gap-2 mb-4 text-warning font-bold">
              <Clock size={18} />
              <span>중위험 (Medium Risk)</span>
            </div>
            <div className="text-3xl font-bold text-text-primary mb-1">7</div>
            <div className="text-xs text-text-muted">모니터링 및 계획 수립 필요</div>
          </div>

          <div className="p-6 rounded-xl bg-nested-bg border border-border-base">
            <div className="flex items-center gap-2 mb-4 text-success font-bold">
              <CheckCircle2 size={18} />
              <span>안전 (Safe)</span>
            </div>
            <div className="text-3xl font-bold text-text-primary mb-1">12</div>
            <div className="text-xs text-text-muted">안정적으로 관리 중인 항목</div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-bold text-text-primary mb-4">상세 분석 리포트</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 rounded-xl border border-border-base hover:border-brand-base transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-app-bg flex items-center justify-center text-text-secondary group-hover:text-brand-base">
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-text-primary">리스크 항목 #{i}</div>
                      <div className="text-[12px] text-text-muted">발견일: 2026.03.30 · 영향도: 높음</div>
                    </div>
                  </div>
                  <div className="text-brand-base opacity-0 group-hover:opacity-100 transition-opacity">
                    상세보기 →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
