import { render, screen } from "@testing-library/react";
import PromotionalBanner from "./PromotionalBanner";

describe("PromotionalBanner", () => {
  const header = "Welcome to Our Store";
  const description = "Shop the latest collection and enjoy great deals.";

  it("renders the header and description", () => {
    render(<PromotionalBanner header={header} description={description} />);

    const bannerHeader = screen.getByText(header);
    const bannerDescription = screen.getByText(description);

    expect(bannerHeader).toBeInTheDocument();
    expect(bannerDescription).toBeInTheDocument();
  });

  it("renders with the correct background image", () => {
    render(<PromotionalBanner header={header} description={description} />);

    const banner = screen.getByTestId("promotional-banner");

    expect(banner).toHaveStyle({
      backgroundImage: `url(/banner.png)`,
    });
  });
});
