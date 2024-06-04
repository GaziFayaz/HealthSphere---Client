import Category from "./Category/Category";
import DiscountSlider from "./DiscountSlider";
import QueriesSlider from "./QueriesSlider";
import Slider from "./Slider";

const Home = () => {
	return (
		<div className="">
			<Slider></Slider>
      <Category></Category>
      <DiscountSlider></DiscountSlider>
      <QueriesSlider></QueriesSlider>
		</div>
	);
};

export default Home;
