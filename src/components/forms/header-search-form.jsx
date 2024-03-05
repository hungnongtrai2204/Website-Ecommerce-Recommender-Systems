import { useState } from "react";
// internal
import { Search } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";

const HeaderSearchForm = () => {
  const { setSearchText, setCategory, handleSubmit, searchText } =
    useSearchFormSubmit();

  // selectHandle
  const selectCategoryHandle = (e) => {
    setCategory(e.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tp-header-search-wrapper d-flex align-items-center">
        <div className="tp-header-search-box">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>
        <div className="tp-header-search-category">
          <NiceSelect
            options={[
              { value: "Select Category", text: "Chọn danh mục" },
              { value: "men's-clothing", text: "Thời trang nam" },
              { value: "women's-clothing", text: "Thời trang nữ" },
              {
                value: "dien-thoai-and-phu-kien",
                text: "Điện Thoại & Phụ Kiện",
              },
              { value: "laptop", text: "Laptop" },
            ]}
            defaultCurrent={0}
            onChange={selectCategoryHandle}
            name="Select Category"
          />
        </div>
        <div className="tp-header-search-btn">
          <button type="submit">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchForm;
