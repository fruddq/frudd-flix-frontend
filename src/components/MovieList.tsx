import { Movies } from "./Movies";
import { Header } from "./Header";
import { Footer } from "./Footer";
export const MovieList: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {

  const pageValue = Number(page);

  if (!Number.isInteger(pageValue) || pageValue < 1) {
    return (
      <div>
        <Header />
        <p className="error-message">Page must be a number over 0</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Movies page={page} />
      <Footer />
    </>
  );
};

