"use client"

import React, { useRef, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Space_Mono as SpaceMono } from "next/font/google"
import { Wheel } from "react-custom-roulette"
import { FreeMode, Pagination } from "swiper"
import Modal from "@mui/material/Modal"

const mono = SpaceMono({
  variable: "--font-mono",
  weight: ["400", "700"],
  preload: true,
  subsets: ["latin"],
})

const listApp = [
  {
    image: "/grab.svg",
    title: "Đặt qua Grab",
    voucher: 50,
    recent: 10,
  },
  {
    image: "/grab.svg",
    title: "Đặt qua Grab",
    voucher: 50,
    recent: 10,
  },
]
export default function Home() {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<any[]>([
    { option: "Bún Đậu" },
    { option: "Cơm Rang" },
    { option: "Bún Chả" },
    { option: "Nem nướng" },
  ])
  const inputRef = useRef<any>(null)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      console.log("newPrizeNumber", newPrizeNumber)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  const handleAddOption = () => {
    setData([...data, { option: inputRef.current.value }])
    inputRef.current.value = ""
  }

  const hanleDeleteOption = (item: any) => {
    const newData = data?.filter((option) => option.option !== item.option)
    setData(newData)
  }

  return (
    <section
      className={`flex flex-col bg-home ${
        showModal && "backdrop-brightness-110"
      } `}
    >
      <div className="w-100">
        <Swiper
          slidesPerView={3}
          autoplay={{
            delay: 3000,
          }}
          slidesPerGroup={1}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mx-auto mt-5 mySwiper w-100"
        >
          <SwiperSlide>
            <img src="/banner.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner.png" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-row justify-center gap-5 gap-x-14">
        <div className="wheel">
          <Wheel
            outerBorderColor="#F9DBC8"
            innerBorderColor="#E0921B"
            innerBorderWidth={1}
            radiusLineColor="#F9DBC8"
            textColors={["#6B422D"]}
            fontSize={22}
            fontWeight={400}
            radiusLineWidth={1}
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false)
              setShowModal(true)
              console.log(prizeNumber)
            }}
            backgroundColors={["#FAF0EB", "#fff"]}
            pointerProps={{
              src: "pointerWheel.svg",
              style: {
                transform: "rotate(45deg)",
              },
            }}
          />
          <div className="btn-wheel" onClick={() => handleSpinClick()}>
            Quay
          </div>
        </div>
        <div className="flex flex-col selection-container">
          <div className="header-selection">
            Trưa nay ăn gì
            <img src="/jwl1.svg" className="jwl1" />
            <img src="/jwl2.svg" className="jwl2" />
            <img src="/jwl3.svg" className="jwl3" />
          </div>
          <div className="relative mx-auto input-container w-80">
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-2 text-sm input-selection "
              placeholder="Tên món cần thêm..."
              required
              ref={inputRef}
            />
            <button
              type="submit"
              className="absolute text-white btn-add"
              onClick={handleAddOption}
            >
              <img src={"/addIcon.svg"} className="mr-1" />
              THÊM
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 list-selected">
            {data.map((item) => (
              <div className="flex justify-center align-middle option-selected">
                <span>{item?.option}</span>
                <img
                  onClick={() => hanleDeleteOption(item)}
                  src="/deleteIcon.svg"
                  className="absolute top-0 right-0 delete-icon"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        className="max-w-4xl p-5 mx-auto my-6 min-h-fit"
      >
        {/*content*/}
        <div className="relative flex flex-col w-full p-5 pb-8 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none modal-result">
          {/*body*/}
          <div className="relative flex-auto p-6 ">
            <p className="title">Kết quả quay</p>
          </div>
          <div className="flex flex-row mx-auto result-container">
            <img src="/jwl4.svg" />
            <p className="result">Bún Hải sản</p>
            <img src="/jwl5.svg" />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 list-app">
            {listApp.map((item) => (
              <div className="flex justify-center align-middle app-option">
                <div className="bg-app">
                  <img src={item.image} />
                </div>
                <div className="info">
                  <p className="title-app">{item.title}</p>
                  <div className="divider"></div>
                  <p className="recent">30 quán gần bạn</p>
                  <p className="voucher">50 mã ưu đãi</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 btn-container">
            <button className="btn btn-re-wheel">Quay tiếp</button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
