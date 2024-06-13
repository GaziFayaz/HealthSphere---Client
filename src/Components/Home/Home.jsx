import Categories  from "./Category/Categories";
import DiscountSlider from "./DiscountSlider";
import QueriesSlider from "./QueriesSlider";
import Slider from "./Slider";

const Home = () => {
	return (
		<div className="">
			<Slider></Slider>
      <Categories></Categories>
      <DiscountSlider></DiscountSlider>
      <QueriesSlider></QueriesSlider>
		</div>
	);
};

export default Home;
