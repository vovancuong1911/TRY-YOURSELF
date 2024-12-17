import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

import imgLoading from "./img/logo.png"; // Hình ảnh loading

const cx = classNames.bind(styles);

function Loading({ isLoading, message, showOverlay = true }) {
  if (!isLoading) return null;

  return (
    <div className={cx("wrapper")}>
      {showOverlay && (
        <div className={cx("overlay")}>
          <div className={cx("inner")}>
            <img
              className={cx("img-loading")}
              src={imgLoading}
              alt="Loading..."
            />
          </div>
          <div className={cx("test")} aria-live="polite" role="status">
            <span>{message || "We are processing your request, please wait a few minutes"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired, // Trạng thái hiển thị loading
  message: PropTypes.string, // Thông báo hiển thị
  showOverlay: PropTypes.bool, // Có hiển thị overlay mờ hay không
};

export default Loading;
