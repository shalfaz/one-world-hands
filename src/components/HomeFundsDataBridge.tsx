import DonationFundsCarousel from "@/components/DonationFundsCarousel";
import QuickDonationBox from "@/components/QuickDonationBox";
import {
  getPublicDonationFunds,
  getQuickDonationFunds,
} from "@/lib/data/donationFunds";

export default function HomeFundsDataBridge() {
  const funds = getPublicDonationFunds();
  const quickDonationFunds = getQuickDonationFunds();

  return (
    <>
      <DonationFundsCarousel funds={funds.slice(0, 4)} />
      <QuickDonationBox funds={quickDonationFunds} />
    </>
  );
}
