import Mock from 'mockjs'
// let Mock = require("mockjs")
const url = {
    dataSource2:'http://localhost:3000/#/table/basic/dataSource2',
    dataSource3:'http://localhost:3000/#/table/high/dataSource3'
}
Mock.setup({
    timeout:1000
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