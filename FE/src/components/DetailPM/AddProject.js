import React from "react";
import { useFormik } from "formik";
import moment from "moment";
import { DatePicker } from "antd";
import https from "../../services/configServ";
import { END_POINT } from "../../constant/endpoint.constant.js";

const AddProject = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      status: "",
      description: "",
      due_Date: null,
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      for (let key in values) {
        if (key === "dueDate" && values[key]) {
          formData.append(key, moment(values[key]).format("DD-MM-YYYY"));
        } else {
          formData.append(key, values[key]);
        }
      }

      https
        .post(END_POINT.PROJECT.CREATE_PROJECT(), formData)
        .then((data) => {
          console.log("Project added successfully:", data.data);

          resetForm();
          // Thông báo thành công và chuyển hướng người dùng
        })
        .catch(() => {
          console.error("Error adding project:");
          // Thông báo lỗi cho người dùng
        });
    },
  });

  const { handleChange, handleSubmit, values, setFieldValue } = formik;

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Add Project</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Project Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Project Name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Status"
            onChange={handleChange}
            value={values.status}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Description"
            onChange={handleChange}
            value={values.description}
          />
        </div>
        <div>
          <label
            htmlFor="due_date"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Due Date
          </label>
          <DatePicker
            onChange={(date, dateString) => {
              setFieldValue("due_date", date);
            }}
            format={"DD-MM-YYYY"}
            value={values.due_date}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-black py-2 px-5 rounded-md"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
