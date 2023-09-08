import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { useParams } from 'react-router-dom';
import MySpinner from '../../layout/MySpinner';
import { faCubes, faLocationDot, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Profile = () => {
  const [count, setCount] = useState(null)
  const { storeId } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const loadCountInStore = async () => {
      let { data } = await Apis.get(endpoints['count-products'](storeId));
      setCount(data);
      console.info(data)
    }
    const loadStoreInfo = async () => {
      let { data } = await Apis.get(endpoints['store-info'](storeId));
      setStore(data);
      console.info(data);
    }
    loadStoreInfo()
    loadCountInStore();
  }, [storeId])

  if (store === null) {
    return <MySpinner />
  }
  return (
    <>
      <h2>Thông tin shop</h2>
      <div className="profile-info">
        <FontAwesomeIcon icon={faCubes} /> Số sản phẩm <strong>{count}+</strong>
      </div>
      <div className="profile-info">
        <FontAwesomeIcon icon={faLocationDot} /> Vị trí <strong>{store[0][3]}</strong>
      </div>
      <div className="profile-info">
        <FontAwesomeIcon icon={faShop} /> Mô tả cửa hàng <strong>{store[0][2]}</strong>
      </div>

    </>
  )
}
