import { Helmet } from "react-helmet-async";
import Categories  from "./Category/Categories";
import DiscountSlider from "./DiscountSlider";
import QueriesSlider from "./QueriesSlider";
import Slider from "./Slider";

const Home = () => {
	return (
		<div className="">
			<Helmet>
					<title>HealthSphere | Home</title>
				</Helmet>
			<Slider></Slider>
      <Categories></Categories>
      <DiscountSlider></DiscountSlider>
      {/* <QueriesSlider></QueriesSlider> */}
		</div>
	);
};

export default Home;
