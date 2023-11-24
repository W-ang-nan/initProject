import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/auth";
// import { userStore } from '@/stores/userStore';

// export function uploadFile(file: any) {
//     let url = `${import.meta.env.VITE_APP_DEV_URL}/workflow/file/uploadFile`;
//     return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         // formData.append(file.name, file.file);
//         console.log(file);
//         formData.append("file", file);
//         axios
//             .post(url, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     // Authorization: getToken(),
//                 },
//             })
//             .then((response) => {
//                 resolve(response.data);
//                 ElMessage({
//                     message: response.data.msg,
//                 });
//             })
//             .catch((error) => {
//                 ElMessage({
//                     message: error.message,
//                     type: "error",
//                 });
//                 reject(error);
//             });
//     });
// }

// export function addFile(data: any) {
//     const userData = userStore()
//     let companyId = userData.user.companyId?.toString();
//     let url = `${import.meta.env.VITE_APP_DEV_URL}/workflow/file/addFile`;
//     return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         // formData.append(file.name, file.file);
//         formData.append("file", data.file);
//         formData.append("companyId", companyId as string);
//         formData.append("fileName", data.fileName);

//         axios
//             .post(url, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     // Authorization: getToken(),
//                 },
//             })
//             .then((response) => {
//                 resolve(response.data);
//                 ElMessage.success({
//                     message: response.data.msg,
//                 });
//             })
//             .catch((error) => {
//                 ElMessage.error({
//                     message: error.message,
//                     type: "error",
//                 });
//                 reject(error);
//             });
//     });
// }