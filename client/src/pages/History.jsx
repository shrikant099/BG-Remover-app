import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/image/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl animate-pulse">Loading History...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
        Your History
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden shadow-xl">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1 font-medium">
                      Original Image
                    </p>
                    <img
                      src={item.orignalImageUrl}
                      alt="Original"
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1 font-medium">
                      BG Removed
                    </p>
                    <img
                      src={item.bgRemovedImageUrl}
                      alt="BG Removed"
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400">
                      1 credit used
                    </span>
                  </div>
                 
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {history.length === 0 && (
        <p className="text-center text-zinc-400 mt-10">No history found.</p>
      )}
    </div>
  );
};

export default History;
