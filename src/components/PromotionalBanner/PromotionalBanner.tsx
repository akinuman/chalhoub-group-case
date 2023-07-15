const PromotionalBanner = ({
  header,
  description,
}: {
  header: string;
  description: string;
}) => {
  return (
    <div
      data-testid="promotional-banner"
      className="h-[347px] w-full bg-cover bg-center flex items-center justify-end text-black"
      style={{ backgroundImage: `url(/banner.png)` }}
    >
      <div className="text-right w-full max-w-[450px] mx-auto md:mr-20 p-2.5">
        <h1 className="text-3xl md:text-5xl mb-4">{header}</h1>
        <p className="text-lg md:text-2xl">{description}</p>
      </div>
    </div>
  );
};

export default PromotionalBanner;
