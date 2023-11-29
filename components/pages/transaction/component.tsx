  "use client";
  import React, { useEffect, useState } from "react";

  // UI
  import { ScrollArea } from "@/components/ui/scroll-area";
  import TransactionCard from "./card";
  import { userId } from "@/utils/constants";
  import { fetchTransactionId } from "@/lib/actions/parent.action";
  import { TransactionsType } from "@/lib/interfaces/transaction.interface";
  import { useTabContext } from "./tabcontext";
  import { UserType } from "@/lib/interfaces/user.interface";
  import { useSession } from "next-auth/react";

  const TransactionComponent = () => {
    const {data:session} = useSession();
    const userInfo = session?.user as UserType
    const { selectedTab } = useTabContext();
    const [transactions, setTransactionData] = useState<TransactionsType[]>([]);
    const mapSelectedTabToStatus = (selectedTab: string) => {
      switch (selectedTab) {
        case "All":
          return "All";
        case "Paid":
          return "Paid";
        case "Pending":
          return "Not Paid";
        case "Cancelled":
          return "Declined"; 
        default:
          return "All";
      }
    };
    useEffect(() => {
      const getParentData = async () => {
        try {
          const data = await fetchTransactionId({ _id: userInfo._id || ''  });
          const status = mapSelectedTabToStatus(selectedTab);

          const filteredTransactions = (status === "All")
          ? data.transactions
          : data.transactions.filter((transaction: { status: string; }) => transaction.status === status);
          setTransactionData(filteredTransactions);
        } catch (error) {
          console.error("Error fetching parent data:", error);
        }
      };

      getParentData();
    }, [userInfo, selectedTab]);
    return (
      <div className="flex flex-1 w-full p-4 pt-14">
        <ScrollArea className="w-full h-[31rem]">
          <div className="flex flex-col w-full h-full gap-4 overflow-hidden">
          {transactions.map((transaction) => (
              <TransactionCard transactions={transaction} />
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  export default TransactionComponent;
