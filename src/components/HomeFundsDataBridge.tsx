import DonationFundsCarousel from "@/components/DonationFundsCarousel";
import QuickDonationBox from "@/components/QuickDonationBox";
import {
  getPublicDonationFunds,
  getQuickDonationFunds,
} from "@/lib/data/donationFunds";

export default async function HomeFundsDataBridge() {
  const [funds, quickDonationFunds] = await Promise.all([
    getPublicDonationFunds(),
    getQuickDonationFunds(),
  ]);

  return (
    <>
      <DonationFundsCarousel funds={funds.slice(0, 4)} />
      <QuickDonationBox funds={quickDonationFunds} />
    </>
  );
}
