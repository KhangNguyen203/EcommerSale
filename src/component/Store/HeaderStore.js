import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import MySpinner from '../../layout/MySpinner';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function HeaderStore() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [q] = useSearchParams();
  const [kw, setKw] = useState("")
  const [avgStarReview, setAvgStarReview] = useState("")

  const nav = useNavigate();

  useEffect(() => {
    const loadStoreInfo = async () => {
      let { data } = await Apis.get(endpoints['store-info'](storeId));
      setStore(data);
      // console.info(data)
    }
    const loadAvgStar = async () => {
      let { data } = await Apis.get(endpoints['avg-star'](storeId));
      setAvgStarReview(data);
    }

    loadStoreInfo();
    loadAvgStar();
  }, [q, storeId])


  if (store === null) {
    return <MySpinner />
  }

  const searchStore = (e) => {
    e.preventDefault()
    nav(`/store/${storeId}?kw=${kw}`)
  }

  return (
    <>
      <div className=" grid__auto">
        <div className="header__store grid__row">
          <div>
            <img src={store[0][1]}
              width="60" height="60" className="rounded-circle" alt="logo"
            />
          </div>
          <div className="header__store-name" >
            <div className="display-4">
              {store[0][0]}
            </div>
            <div>
              <span style={{color: 'gold'}}>★</span>
              {avgStarReview}/5
            </div>
          </div>
          <div class="header__search">
            <Form style={{ height: "100%" }} onSubmit={searchStore}>
              <input value={kw}
                onChange={e => setKw(e.target.value)}
                class="header__search-input" type="text" placeholder="Tìm kiếm trong cửa hàng" />
              <button class="header__search-btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '15px' }} />
              </button>
            </Form>

          </div>
        </div>

      </div>

    </>
  )
}
