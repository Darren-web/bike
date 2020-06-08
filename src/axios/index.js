import Jsonp from 'jsonp'
// import axios from 'axios'
// import { Modal } from 'antd';
// import "./../mock/api"
export default class Axios {
    static jsonp(options){
        return new Promise((resolve,reject) => {
            Jsonp(options.url,{
                param:'callback'
            },(err,response)=>{
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    // static ajax(options) {
    //     let baseApi = 'http://localhost:3000/#/table/basic';
    //     console.log('url', baseApi+options.url)
    //     return new Promise((resolve,reject)=>{
    //         axios({
    //             url:baseApi+options.url,
    //             method:"get",
    //             timeout:1000,
    //             params:(options.data&&options.data.params) || ""
    //         }).then((response)=>{
    //             console.log('response', response)
    //             if(response.status == "200"){
    //                 let res = response.data
    //                 console.log('res', res)
    //                 if(res.code == "0"){
    //                     resolve(res)
    //                 }else{
    //                     Modal.info({
    //                         title:"提示",
    //                         content:res.msg
    //                     })
    //                 }
    //             }else{
    //                 reject(response.data)
    //             }
    //         })
    //     })
    // }
}