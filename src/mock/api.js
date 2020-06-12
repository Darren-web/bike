import Mock from 'mockjs'
// let Mock = require("mockjs")
const url = {
    dataSource2:'http://localhost:3000/#/table/basic/dataSource2',
    dataSource3:'http://localhost:3000/#/table/high/dataSource3',
    city1:'http://localhost:3000/#/city/open_city',
    city2:'http://localhost:3000/#/city/open',
    order1:"http://localhost:3000/#/order/list",
    order2:"http://localhost:3000/#/order/ebike_info",
    order3:"http://localhost:3000/#/order/finish_order"
}
Mock.setup({
    timeout:500
})
Mock.mock(url.dataSource2,function(){
    return Mock.mock({
        "code":0,
        "msg":"",
        "result":{
            "list|15":[{
                "id|+1":1,
                userName:"@cname",
                "sex|0-1":"1",
                "status|1":[1,2,3,4,5],
                "interest|1":[1,2,3,4,5],
                birthday:"2020-5-20",
                address:"@province",
                time:"09:00"
            }],
            page:1,
            page_size:1,
            total:100
        }
    })
})
Mock.mock(url.dataSource3,function(){
    return Mock.mock({
        "code":0,
        "msg":"",
        "result":{
            "list|15":[{
                "id|+1":1,
                userName:"@cname",
                "age|10-40":1,
                "sex|0-1":"1",
                "status|1":[1,2,3,4,5],
                "interest|1":[1,2,3,4,5],
                birthday:"2020-5-20",
                address:"@province",
                time:"09:00"
            }],
            page:1,
            page_size:1,
            total:100
        }
    })
})
Mock.mock(url.city1,function(){
    return Mock.mock({
        code:0,
        "result":{
            page:1,
            page_size:1,
            total:99,
            total_count:6,
            "item_list|10":[{
                "id|+1":1,
                "name":"@city",
                "mode|1-2":1,
                "op_mode|1-2":1,
                "franchisee_id":77,
                "franchisee_name":"松果自营",
                "city_admins|1-2":[{
                    "user_name":"@cname",
                    "user_id|+1":10001
                }],
                "open_time":"@datetime",
                "sys_user_name":"@cname",
                "update_time":1520476737000
            }],
        }
    })
})
Mock.mock(url.city2,function(){
    return Mock.mock({
        code:0,
        "result":"开通成功"
    })
})
Mock.mock(url.order1,function(){
    return Mock.mock({
        code:0,
        result:{
            "page":1,
            "page_size":10,
            "total":99,
            "total_count":85,
            "page_count":9,
            "item_list|10":[{
                "id":2959165,
                order_sn:/T180[0-9]{6}/,
                bike_sn:"800116090",
                user_id:908352,
                user_name:"@cname",
                mobile:/1[0-9]{10}/,
                distance:2000,
                total_time:4000,
                "status|1-2":1,
                "start_time":"@datetime",
                "end_time":"@datetime",
                total_fee:1000,
                user_pay:300
            }]
        }
    })
})
Mock.mock(url.order2,function(){
    return Mock.mock({
        code:0,
        "result":{
            id:27296,
            bike_sn:800116116,
            battery:100,
            start_time:"@datetime",
            "location":"河北科技"
        }
    })
})
Mock.mock(url.order3,function(){
    return Mock.mock({
        code:0,
        "result":"ok"
    })
})