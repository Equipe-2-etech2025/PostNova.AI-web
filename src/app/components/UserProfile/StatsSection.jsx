import React from 'react';
import { BsBarChartLine, BsPieChart, BsBullseye, BsHeartFill } from 'react-icons/bs';
import SectionBlock from '@components/Dashboard/SectionBlock';

const StatsSection = ({ 
  userStats, 
  loadingStats, 
  quotaPrompt, 
  tarif 
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <SectionBlock title="Activités" icon={<BsBarChartLine />}>
        <div className="grid grid-cols-2 gap-6 h-full">
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Total campagne
            </h3>
            <p className="text-4xl font-bold flex items-center gap-2">
              <BsBullseye className="text-blue-500" />
              {loadingStats ? "0" : userStats.totalCampaigns}
            </p>
          </div>
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Mention j'aime
            </h3>
            <p className="text-4xl font-bold flex items-center gap-2">
              <BsHeartFill className="text-pink-500" />
              {loadingStats ? "0" : userStats.mentionJaime}
            </p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock title="Quota utilisé" icon={<BsPieChart />}>
        <div className="flex flex-col justify-between h-full">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 dark:text-gray-400">Quota</span>
              <strong className="text-xl">
                {quotaPrompt?.daily_quota_used ?? "2"}/
                {tarif?.tarif?.max_limit ?? "3"}
              </strong>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                style={{
                  width:
                    tarif?.tarif?.max_limit != null &&
                    quotaPrompt?.daily_quota_used != null
                      ? `${Math.min((quotaPrompt.daily_quota_used / tarif?.tarif?.max_limit) * 100, 100)}%`
                      : "40%",
                }}
              ></div>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-auto">
            Il vous reste{" "}
            <span className="text-black dark:text-white font-semibold">
              {tarif?.tarif?.max_limit != null &&
              quotaPrompt?.daily_quota_used != null
                ? tarif.tarif.max_limit - quotaPrompt.daily_quota_used
                : "3"}{" "}
              campagnes
            </span>{" "}
            aujourd'hui.
          </p>
        </div>
      </SectionBlock>
    </section>
  );
};

export default StatsSection;