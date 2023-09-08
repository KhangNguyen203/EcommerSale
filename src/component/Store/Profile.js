import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { useParams } from 'react-router-dom';

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
      setStore(data);console.info(data)
    }
    loadStoreInfo()
    loadCountInStore();
  }, [storeId])

  return (
    // <div>{count} {store[0][2]}</div>\
    <h1>utgyugu</h1>
  )
}
