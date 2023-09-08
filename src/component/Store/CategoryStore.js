import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import MySpinner from '../../layout/MySpinner';
import { Link, useParams } from 'react-router-dom';

export default function CategoryStore() {
    const { storeId } = useParams();
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    useEffect(() => {
      const loadCatesFromStore = async () => {
        let res = await Apis.get(endpoints['store-cate'](storeId));
        setCategories(res.data);
      };
      loadCatesFromStore();
    }, [storeId]);
  
    if (categories === null) {
      return <MySpinner />;
    }
  
    let all = true;
    let p = `/store/${storeId}?all=${all}`;
  
    const handleCategoryClick = (categoryId) => {
      setSelectedCategory(categoryId);
    };
  
    return (
      <div className="grid__column-2">
        <nav className="category">
          <h3 className="category_heading">
            <FontAwesomeIcon icon={faListUl} style={{ marginRight: "5px" }} />
            Danh mục
          </h3>
          <ul className="category-list">
            <li className="category-items">
              <Link to={p} className={`category-items-text ${selectedCategory === null ? "active-category" : ""}`}
              onClick={() => handleCategoryClick(null)}
              >
                Tất cả
              </Link>
            </li>
            {categories.map((c) => {
              let h = `/store/${storeId}?cateId=${c[0]}`;
              return (
                <li
                  className="category-items"
                  key={c[0]}
                >
                  <Link
                    to={h}
                    className={`category-items-text ${selectedCategory === c[0] ? "active-category" : ""}`}
                    onClick={() => handleCategoryClick(c[0])}
                  >
                    {c[1]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }