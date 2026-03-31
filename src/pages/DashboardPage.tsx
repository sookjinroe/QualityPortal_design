
import { motion } from 'motion/react';
import { MetricCard, ChartCard } from '../components/DashboardComponents';

export const DashboardPage = () => {
  return (
    <motion.div 
      key="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="일정 리스크" score="7.0" status="위험" sub="납기 D+8 초과 예측" value={70} color="#DC2626" />
        <MetricCard label="배포 리스크" score="8.0" status="위험" sub="취약점 3건 · 빌드 83%" value={80} color="#DC2626" />
        <MetricCard label="코드 품질 리스크" score="7.0" status="주의" sub="PR 리뷰 사이클 40.3h" value={70} color="#D97706" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="스프린트 진척 (계획 vs 실제)" bars={[
          { h: 60, c: '#E5E7EB' }, { h: 50, c: '#3B82F6', o: 0.6 },
          { h: 80, c: '#E5E7EB' }, { h: 55, c: '#3B82F6', o: 0.6 },
          { h: 75, c: '#E5E7EB' }, { h: 40, c: '#3B82F6', o: 0.6 },
          { h: 90, c: '#E5E7EB' }, { h: 47, c: '#EF4444', o: 0.7 }
        ]} />
        <ChartCard title="빌드 성공률 추이" bars={[
          { h: 90, c: '#10B981', o: 0.5 }, { h: 85, c: '#10B981', o: 0.5 },
          { h: 70, c: '#FBBF24', o: 0.6 }, { h: 60, c: '#EF4444', o: 0.6 },
          { h: 75, c: '#FBBF24', o: 0.6 }, { h: 83, c: '#FBBF24', o: 0.6 }
        ]} />
        <ChartCard title="취약점 현황" bars={[
          { h: 70, c: '#EF4444', o: 0.5 }, { h: 50, c: '#EF4444', o: 0.5 },
          { h: 40, c: '#EF4444', o: 0.5 }, { h: 30, c: '#EF4444', o: 0.7 }
        ]} />
      </div>
    </motion.div>
  );
};
