import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { TaoLichChieu } from "../../pages/TaoLichChieu/TaoLichChieu";
const { Header, Sider, Content } = Layout;
const Management = () => {
  // const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   // kiểm tra người dùng nếu không phải admin sẽ đá người dùng về trang google hoặc bất kì trang bạn muốn
  //   if (user) {
  //     if (user.maLoaiNguoiDung != "QuanTri") {
  //       window.location.href = "https://www.google.com/";
  //     }
  //   } else {
  //     // chưa đăng nhập nên không có dữ liệu trên redux
  //     navigate("/login");
  //   }
  // }, [location.pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          className="mt-3"
          // lấy localtion từ hook useLocation để kiểm tra xem người dùng đang đứng ở component nào để active nút menu
          defaultSelectedKeys={[location.pathname]}
          items={[
           
            {
              key: "/admin",
              icon: <VideoCameraOutlined />,
              label: <Link to={"/admin"}>Project Manager</Link>,
            },
            {
              key: '/admin/addProject',
              icon: <UploadOutlined />,
              label: 
                <Link to={'/admin/addNew'}>Add Project</Link>
            },
            // {
            //   key: "/admin/taolichchieu",
            //   icon: <TaoLichChieu />,
            //   label: <Link to={"/admin/taolichchieu"}>Films</Link>,
            // },
          ]}
        />
      </Sider>
      <Layout>
      <Header
              className="flex justify-between"
              style={{
                background: colorBgContainer,
                padding: '10px 20px',
                fontSize: '30px',
              }}
            >
              <Button
                className="btnTrigger btnCollapse"
                type="dashed"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  // width: 64,
                  height: 46,
                }}
              />
              <span className="flex " style={{ fontWeight: "600",fontSize:"12px" }}>
            {/* {curUser ?  <p>Wellcome {curUser?.name}</p>  : <p>Wellcome {USER?.name}</p> }
               
                <Avatar
                  size={30}
                  className="mx-3 my-3 "
                  style={{ fontSize: "12px", color: "black",fontWeight:"400" }}
                >
                  {curUser ? curUser.name.slice(0, 2).toUpperCase() : USER?.name?.slice(0, 2).toUpperCase() }
                </Avatar> */}
                <Link to="/login" >
                {/* onClick={handleLogout} */}
                  {/* <LogoutOutlined  style={{ fontSize: '20px', color: "red" }}/> */}
                  Hello
                </Link>
              </span>
            </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Management;