import DonationFundsCarousel from "@/components/DonationFundsCarousel";
import QuickDonationBox from "@/components/QuickDonationBox";
import { getPublicFunds } from "@/lib/public-funds";

export default async function HomeFundsDataBridge() {
  const funds = await getPublicFunds();

  if (!funds.length) {
    return null;
  }

  return (
    <>
      <DonationFundsCarousel funds={funds.slice(0, 4)} />
      <QuickDonationBox funds={funds} />
    </>
  );
}