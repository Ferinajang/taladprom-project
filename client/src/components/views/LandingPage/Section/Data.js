const continentsPD =[
    {
        "_id":1,
        "name":"เสื้อผ้า"

    },
    {
        "_id":2,
        "name":"อาหาร"

    },
    {
        "_id":3,
        "name":"เครื่องใช้ไฟฟ้า" 

    },
    {
        "_id":4,
        "name":"ของใช้ภายในครัวเรือน"

    },
    {
        "_id":5,
        "name":"ผลิตภัณฑ์เสริมความงาม"

    },
]
const price = [
    {
      _id: 0,
      name: "Any",
      array: [],
    },
    {
      _id: 2,
      name: "0-100฿",
      array: [0, 100],
    },
    {
      _id: 3,
      name: "100฿-1000฿",
      array: [100, 1000],
    },
    {
      _id: 4,
      name: "1000฿-10000฿",
      array: [1000, 10000],
    },
    {
      _id: 5,
      name: "More than 10000",
      array: [10000, 100000000],
    },
  ];
export {
    price,
    continentsPD
}  