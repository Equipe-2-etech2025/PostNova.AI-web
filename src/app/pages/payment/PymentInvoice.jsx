import React, { useEffect, useState } from "react";
import { getUserInvoices } from "@services/invoiceService";

const PaymentInvoice = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setErrMsg("");
      const res = await getUserInvoices();

      if (!mounted) return;

      if (res.success) {
        setRows(Array.isArray(res.data) ? res.data : []);
      } else {
        setErrMsg(res.message || "Impossible de charger les factures.");
      }
      setLoading(false);
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          📄 Mes factures
        </h1>

        {/* Erreur */}
        {errMsg ? (
          <div className="mb-4 p-4 rounded-lg border border-red-300 bg-red-50 text-red-700 text-base">
            {errMsg}
          </div>
        ) : null}

        {/* Loading */}
        {loading ? (
          <div className="p-6 bg-white rounded-lg shadow animate-pulse text-base">
            Chargement des factures...
          </div>
        ) : (
          <div className="overflow-x-auto w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
            <table className="w-full border-collapse text-sm md:text-base lg:text-lg">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Montant</th>
                  <th className="py-4 px-6 text-left">Date</th>
                  <th className="py-4 px-6 text-left">Référence</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((inv, idx) => (
                    <tr
                      key={inv.transaction_reference ?? idx}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">
                        {inv.amount} {inv.currency}
                      </td>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                        {inv.created_at
                          ? new Date(inv.created_at).toLocaleString("fr-FR")
                          : "—"}
                      </td>
                      <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                        {inv.transaction_reference || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-gray-500 text-base md:text-lg"
                    >
                      Aucune facture trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInvoice;
