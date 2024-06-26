import React, { useEffect, useState } from "react";
// import { quanLyPhimServ } from "../../services/quanLyPhimServ";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { getAllMovieThunk } from "../../redux/slice/movieSlice";
import { Link } from "react-router-dom";
import https from "../../services/configServ";
import { END_POINT } from "../../constant/endpoint.constant";

const ProjectManager = () => {
  const dispatch = useDispatch();

  const [listProject, setListProject] = useState(null);

  useEffect(() => {
    https
      .get(END_POINT.PROJECT.GET_LIST())
      .then(({ data }) => {
        console.log(data);
        setListProject(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   const { listMovie } = useSelector((state) => state.movieSlice);
  // const [listMovie, setListMovie] = useState([]);
  const columns = [
    {
      // title là tên cột
      title: "Project Name",
      // dataIndex giúp bắt được thuộc tính cần lấy dữ liệu của phần tử trong mảng
      dataIndex: "title",
      key: "title",
      // render: (text, record, index) => {
      //   // console.log(text);
      //   // console.log(record);
      //   // console.log(index);
      // },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (url) => {
      //   return <img className="w-20" src={url} />;
      // },
    },
    {
      title: "Due_Date",
      dataIndex: "due_date",
      key: "due_date",
    },
    {
      title: "Description",
      key: "descrition",
      dataIndex: "description",
      render: (text) => {
        return <p className="w-56 line-clamp-2">{text}</p>;
      },
    },
    {
      title: "Action",
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
              Delete
            </button>
            <Link className="text-white bg-yellow-600 py-2 px-4 rounded-md">
              Fix
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
      <h2 className="font-bold text-2xl mb-5">Project Table</h2>
      <input type="text" />
      <Table
        columns={columns}
        dataSource={listProject?.map((item, i) => {
          return {
            key: i,
            ...item,
          };
        })}
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
