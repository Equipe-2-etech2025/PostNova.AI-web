import React from 'react';
import { BsFileEarmark, BsChevronUp, BsChevronDown, BsEye, BsHandThumbsUp, BsShare } from 'react-icons/bs';
import SectionBlock from "@layouts/SectionBlock";
import Spinner from "@components/Spinner";

const CampaignHistory = ({ 
  campaigns, 
  loadingCampaigns, 
  expandedSections, 
  toggleSection 
}) => {
  return (
    <section className="mb-12">
      <SectionBlock
        title="Historique des campagnes"
        icon={<BsFileEarmark />}
        action={
          <button
            onClick={() => toggleSection("campaigns")}
            className="md:hidden"
          >
            {expandedSections.campaigns ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        }
      >
        <div
          className={`${!expandedSections.campaigns ? "hidden md:block" : ""}`}
        >
          {loadingCampaigns ? (
            <Spinner />
          ) : campaigns.length === 0 ? (
            <div className="py-6 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">Aucune campagne pour le moment</p>
              <p className="text-sm">Créez votre première campagne pour la voir ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3">Nom</th>
                    <th className="text-left py-3">Statut</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-center py-3">
                      <BsEye className="inline" />
                    </th>
                    <th className="text-center py-3">
                      <BsHandThumbsUp className="inline" />
                    </th>
                    <th className="text-center py-3">
                      <BsShare className="inline" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 font-medium">{campaign.name}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{campaign.status.label}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {campaign.dates.created_at}
                      </td>
                      <td className="py-3 text-center">{campaign.total_views}</td>
                      <td className="py-3 text-center">{campaign.total_likes}</td>
                      <td className="py-3 text-center">{campaign.total_shares}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </SectionBlock>
    </section>
  );
};

export default CampaignHistory;
