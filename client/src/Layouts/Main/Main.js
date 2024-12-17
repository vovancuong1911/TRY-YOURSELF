import classNames from "classnames/bind";
import styles from "./Main.module.scss";
import Slide from "./Slide/Slide";
import ItemProducts from "./ItemProducts/ItemProducts";
import Testimonial from "./Testimonial/Testimonial";
import CategoriesArea from "./CategoriesArea/CategoriesArea";
import BlogPreview from "../../Pages/Admin/Blogs/BlogPreview";


const cx = classNames.bind(styles);

function Main() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("slide")}>
        <Slide />
      </div>

      <div className={cx("item-products")}>
        <ItemProducts />
      </div>

      {/* Hiển thị bài viết ngắn gọn */}
      <div className={cx("blog-preview")}>
        <BlogPreview />
      </div>

      <div>
        <Testimonial />
      </div>

      <div className={cx("categories-area")}>
        <CategoriesArea />
      </div>
    </div>
  );
}

export default Main;
