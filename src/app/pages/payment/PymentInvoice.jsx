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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-White-600">
          📄 Mes factures
        </h1>

        {/* Erreur */}
        {errMsg ? (
          <div className="mb-4 p-3 rounded border border-red-300 bg-red-50 text-red-700 text-sm sm:text-base">
            {errMsg}
          </div>
        ) : null}

        {/* Loading */}
        {loading ? (
          <div className="p-4 bg-white rounded-lg shadow animate-pulse text-sm sm:text-base">
            Chargement des factures...
          </div>
        ) : (
          <div className="overflow-x-auto bg-white-30 shadow-lg rounded-lg">
            <table className="w-full table-auto border-collapse text-xs sm:text-sm">
              <thead className="bg-gray-500/15 text-white-300">
                <tr>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Montant</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Date</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Référence</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((inv, idx) => (
                    <tr
                      key={inv.transaction_reference ?? idx}
                      className="border-b hover:bg-white-50"
                    >
                      <td className="py-2 px-2 sm:px-4 font-medium text-white-500">
                        {inv.amount} {inv.currency}
                      </td>
                      <td className="py-2 px-2 sm:px-4 text-white-500">
                        {inv.created_at
                          ? new Date(inv.created_at).toLocaleString("fr-FR")
                          : "—"}
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        <span className="text-white-500">
                          {inv.transaction_reference || "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-gray-500 text-sm sm:text-base"
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
