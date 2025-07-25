import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RenderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} color="#FEC78A" size={10} />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} color="#FEC78A" size={10} />);
        } else {
            stars.push(<FaRegStar key={i} color="#FEC78A" size={10} />);
        }
    }
    return stars;
};

export default RenderStars;