import React, { useEffect, useState } from "react";
// import { quanLyPhimServ } from "../../services/quanLyPhimServ";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { getAllMovieThunk } from "../../redux/slice/movieSlice";
import { Link } from "react-router-dom";

const ProjectManager = () => {
  const dispatch = useDispatch();
//   const { listMovie } = useSelector((state) => state.movieSlice);
  // const [listMovie, setListMovie] = useState([]);
  const columns = [
    {
      // title là tên cột
      title: "Mã phim",
      // dataIndex giúp bắt được thuộc tính cần lấy dữ liệu của phần tử trong mảng
      dataIndex: "maPhim",
      key: "maPhim",
      // render: (text, record, index) => {
      //   // console.log(text);
      //   // console.log(record);
      //   // console.log(index);
      // },
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url) => {
        return <img className="w-20" src={url} />;
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Mô tả",
      key: "moTa",
      dataIndex: "moTa",
      render: (text) => {
        return <p className="w-56 line-clamp-2">{text}</p>;
      },
    },
    {
      title: "Hành động",
      key: "hanhDong",
      render: (_, record) => {
        return (
          <div className="space-x-3">
            <button
            //   onClick={() => {
            //     quanLyPhimServ
            //       .deleteMovie(record.maPhim)
            //       .then(() => {
            //         // gọi render lại phim khi đã xoá
            //         quanLyPhimServ.getAllMovie().then((res) => {
            //           dispatch(getAllMovieThunk());
            //         });
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //       });
            //   }}
              className="text-white bg-red-600 py-2 px-4 rounded-md"
            >
              Xoá
            </button>
            <Link
              to={"add-movie"}
              className="text-white bg-yellow-600 py-2 px-4 rounded-md"
            >
              Sửa
            </Link>
            <Link
              to={`/admin/taolichchieu/${record.maPhim}`}
              className="ml-5 py-2 px-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
            >
              Tạo lịch chiếu <span aria-hidden="true">→</span>
            </Link>
          </div>
        );
      },
    },
  ];
//   useEffect(() => {
//     // gọi dữ liệu thông qua phương thức được tạo ra từ thunk
//     dispatch(
//       getAllMovieThunk({
//         hoTen: "Đông",
//         gioiTinh: "Nam",
//       })
//     );
//   }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Danh sách phim</h2>
      <input type="text" />
      <Table
        columns={columns}
        // dataSource={listMovie}
        pagination={{
          // pageSize giúp giới hạn số phần tử trên mỗi trang
          pageSize: 5,
          // current giúp đưa người dùng tới trang mà người dùng muốn
          // current: 8,
          // total
        }}
      />
    </div>
  );
};

export default ProjectManager;
