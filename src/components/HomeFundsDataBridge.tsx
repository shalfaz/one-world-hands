import DonationFundsCarousel from "@/components/DonationFundsCarousel";
import QuickDonationBox from "@/components/QuickDonationBox";

export default async function HomeFundsDataBridge() {
  // TODO: Load funds from MongoDB
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const funds: any[] = [];

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