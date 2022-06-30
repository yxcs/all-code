// pages/retreatingNote/retreatingNote.js
import { getOrderDetail } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderConfirmList: [],
    cancelRuleList: [],
    refundProcessList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    getOrderDetail(options.id).then(data => {
      // const datas = data.data.data;
      let datas = {
        "status": 200,
        "data": {
          "_id": "8Z1P3EET",
          "updatedAt": "2018-06-22T08:44:48.668Z",
          "createdAt": "2018-06-22T08:43:20.607Z",
          "order_code": "8Z1P3EET",
          "city": {
            "_id": "59291cbbb980cb5ec758841d",
            "service_telephone": {
              "order": "010-57273085",
              "default_telephone": "400-150-1868"
            }
          },
          "user": {
            "_id": "5b20c0281468ed18a7d1df95"
          },
          "timestamp": 1529656914819,
          "nonce_str": "Qnqsh23hybTdcZt1pBmAfT9SUxxFiT3n",
          "product_type": "hotels",
          "product_id": "59292a0c78647808cee95275",
          "product_count": 1,
          "product_snapshot": {
            "_id": "59292a0c78647808cee95275",
            "short_introduction": "拥有矿泉泳池的绝美景色酒店",
            "updatedBy": "59291cb8b980cb5ec75880a2",
            "telephone": "00 65 6845 1188",
            "hotel_discounted_price": "",
            "city_name": "新加坡",
            "updatedAt": "2018-02-08T06:37:07.923Z",
            "createdAt": "2017-05-27T07:26:04.847Z",
            "category": {
              "_id": "59291d1cb980cb5ec75a0747",
              "name": "独立精品",
              "name_en": ""
            },
            "city": {
              "_id": "59291cbbb980cb5ec758841d",
              "latitude": 1.352083,
              "name_en": "Singapore",
              "name": "新加坡",
              "longitude": 103.819836,
              "service_telephone": {
                "order": "010-57273085",
                "default_telephone": "400-150-1868"
              }
            },
            "ROOMS_info": {
              "Premier Room with Marina Bay": {
                "lowest_price_usd": 301.5,
                "room_type": "尊贵客房 ",
                "room_detail": {
                  "room_type": "尊贵客房 ",
                  "_id": "5984aaf59a26030970d0dce7",
                  "price_info": {
                    "no_breakfast": {
                      "total_pay_usd": 216,
                      "id": "186911829-64",
                      "total_pay_cny": 1288,
                      "one_night_room_price_usd": 216,
                      "one_night_room_price_cny": 1288,
                      "room": {
                        "RoomType": {
                          "__": {
                            "code": "7313488",
                            "text": "Premier Room with Marina Bay View + Free Wifi"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "215.22"
                          }
                        },
                        "MealType": {
                          "__": {
                            "code": "1000041",
                            "text": "Room only"
                          }
                        }
                      },
                      "nights": 1
                    },
                    "have_breakfast": {
                      "total_pay_usd": 232,
                      "id": "186937607-66",
                      "total_pay_cny": 1385,
                      "one_night_room_price_usd": 232,
                      "one_night_room_price_cny": 1385,
                      "room": {
                        "RoomType": {
                          "__": {
                            "code": "7313490",
                            "text": "Twin Premier Room with Marina Bay View + Free Wifi"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "231.43"
                          }
                        },
                        "MealType": {
                          "__": {
                            "code": "1",
                            "text": "Breakfast"
                          }
                        }
                      },
                      "nights": 1
                    }
                  },
                  "cover_image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_332_b.jpg",
                  "__v": 1,
                  "enabled": false,
                  "bed_type": "1 张特大床或 2 张单人床",
                  "keyword": "Premier Room with Marina Bay",
                  "room_type_en": "Premier Room with Marina Bay View + Free Wifi",
                  "capture_id": "5984575de9eea940584eb0ff",
                  "recreation": " 平板电视带有有线频道和收费电影",
                  "gallery": [{
                    "published": true,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/70ba1424_b.jpg",
                    "_id": "5984aaf59a26030970d0dcee"
                  }, {
                    "published": false,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_332_b.jpg",
                    "_id": "5984aaf59a26030970d0dced"
                  }, {
                    "published": false,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_333_b.jpg",
                    "_id": "5984aaf59a26030970d0dcec"
                  }, {
                    "published": false,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_341_b.jpg",
                    "_id": "5984aaf59a26030970d0dceb"
                  }, {
                    "published": false,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_353_b.jpg",
                    "_id": "5984aaf59a26030970d0dcea"
                  }, {
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/3a36eb41_b.jpg",
                    "_id": "5984aaf59a26030970d0dce9"
                  }, {
                    "published": false,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/4d388905_b.jpg",
                    "_id": "5984aaf59a26030970d0dce8"
                  }],
                  "add_bed_type": [],
                  "updatedBy": "59291cb8b980cb5ec75880a1",
                  "createdBy": "592e7406bcc7c81e078f7d8c",
                  "occupancy_info": "可入住 2 人（最多含 1 名儿童）",
                  "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏大海景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n吸烟区/无烟区客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                  "serve": " 空调和每日客房清洁",
                  "hotel": "59292a0c78647808cee95275",
                  "room_size": "房间面积 31 平方米（ 334 平方英尺），阳台可欣赏大海景观",
                  "bed_size": "",
                  "createdAt": "2017-08-04T17:12:21.098Z",
                  "dining": " 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务",
                  "network": " 免费无线和有线上网接入服务",
                  "bathroom": " 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋",
                  "displayOrder": 0,
                  "keywords": [{
                    "keyword": "Premier Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde2474",
                    "quoter": "59afe1e0a389295de92f47f8"
                  }, {
                    "keyword": "Premier Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde2473",
                    "quoter": "59b0b035a389295de92f4814"
                  }, {
                    "keyword": "Premier Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde2472",
                    "quoter": "59b0b048a389295de92f4815"
                  }, {
                    "keyword": "Premier Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde2471",
                    "quoter": "59b20729a389295de92f4952"
                  }],
                  "updatedAt": "2017-08-14T03:51:30.702Z",
                  "has_fetch_price": true,
                  "facilities": [{
                    "_id": "59911e4286e31c5077a1e342"
                  }],
                  "updated_by_editor": false,
                  "hotel_discounted_price": "",
                  "useful": " 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床"
                },
                "no_breakfast": {
                  "total_pay_usd": 216,
                  "id": "186911829-64",
                  "total_pay_cny": 1288,
                  "one_night_room_price_usd": 216,
                  "one_night_room_price_cny": 1288,
                  "room": {
                    "RoomType": {
                      "__": {
                        "code": "7313488",
                        "text": "Premier Room with Marina Bay View + Free Wifi"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "215.22"
                      }
                    },
                    "MealType": {
                      "__": {
                        "code": "1000041",
                        "text": "Room only"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏大海景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n吸烟区/无烟区客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                "room_type_en": "Premier Room with Marina Bay room",
                "lowest_price_cny": 1804.5,
                "have_breakfast": {
                  "total_pay_usd": 232,
                  "id": "186937607-66",
                  "total_pay_cny": 1385,
                  "one_night_room_price_usd": 232,
                  "one_night_room_price_cny": 1385,
                  "room": {
                    "RoomType": {
                      "__": {
                        "code": "7313490",
                        "text": "Twin Premier Room with Marina Bay View + Free Wifi"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "231.43"
                      }
                    },
                    "MealType": {
                      "__": {
                        "code": "1",
                        "text": "Breakfast"
                      }
                    }
                  },
                  "nights": 1
                }
              },
              "Executive Deluxe Room with Marina Bay": {
                "lowest_price_usd": 245.70000000000002,
                "room_type": "豪华客房, 海湾景观 ",
                "room_detail": {
                  "room_type": "豪华客房, 海湾景观 ",
                  "_id": "5984aaf59a26030970d0dca3",
                  "price_info": {
                    "no_breakfast": {
                      "total_pay_usd": 200,
                      "id": "187135372-72",
                      "total_pay_cny": 1195,
                      "one_night_room_price_usd": 200,
                      "one_night_room_price_cny": 1195,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1000041",
                            "text": "Room only"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "199.60"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313483",
                            "text": "Double Executive Deluxe Room with Marina Bay View  + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    },
                    "have_breakfast": {
                      "total_pay_usd": 216,
                      "id": "187135372-75",
                      "total_pay_cny": 1290,
                      "one_night_room_price_usd": 216,
                      "one_night_room_price_cny": 1290,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1",
                            "text": "Breakfast"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "215.52"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313483",
                            "text": "Double Executive Deluxe Room with Marina Bay View  + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    }
                  },
                  "cover_image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/49010ff4_b.jpg",
                  "__v": 1,
                  "enabled": false,
                  "bed_type": "1 张特大床",
                  "keyword": "Executive Deluxe Room with Marina Bay",
                  "room_type_en": "Double Executive Deluxe Room with Marina Bay View  + Free Wifi",
                  "capture_id": "598456f9e9eea940584eb0f6",
                  "recreation": " 平板电视带有有线频道和收费电影",
                  "gallery": [{
                    "published": false,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/49010ff4_b.jpg",
                    "_id": "5984aaf59a26030970d0dca7"
                  }, {
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_327_b.jpg",
                    "_id": "5984aaf59a26030970d0dca6"
                  }, {
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_341_b.jpg",
                    "_id": "5984aaf59a26030970d0dca5"
                  }, {
                    "published": true,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/6736296b_b.jpg",
                    "_id": "5984aaf59a26030970d0dca4"
                  }],
                  "add_bed_type": [],
                  "updatedBy": "59291cb8b980cb5ec75880a1",
                  "createdBy": "592e7406bcc7c81e078f7d8c",
                  "occupancy_info": "可入住 3 人（最多含 1 名儿童）",
                  "room_desc": "1 张特大床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏大海景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n无烟客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                  "serve": " 空调和每日客房清洁",
                  "hotel": "59292a0c78647808cee95275",
                  "room_size": "房间面积 31 平方米（ 334 平方英尺），阳台可欣赏大海景观",
                  "bed_size": "",
                  "createdAt": "2017-08-04T17:12:21.093Z",
                  "dining": " 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务",
                  "network": " 免费无线和有线上网接入服务",
                  "bathroom": " 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋",
                  "displayOrder": 0,
                  "keywords": [{
                    "keyword": "Executive Deluxe Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde246f",
                    "quoter": "59afe1e0a389295de92f47f8"
                  }, {
                    "keyword": "Executive Deluxe Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde246e",
                    "quoter": "59b0b035a389295de92f4814"
                  }, {
                    "keyword": "Executive Deluxe Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde246d",
                    "quoter": "59b0b048a389295de92f4815"
                  }, {
                    "keyword": "Executive Deluxe Room with Marina Bay",
                    "_id": "59b2722a94e62b3badde246c",
                    "quoter": "59b20729a389295de92f4952"
                  }],
                  "updatedAt": "2017-08-14T03:50:16.588Z",
                  "has_fetch_price": true,
                  "facilities": [{
                    "_id": "59911df886e31c5077a1e340"
                  }],
                  "updated_by_editor": false,
                  "hotel_discounted_price": "",
                  "useful": " 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床"
                },
                "no_breakfast": {
                  "total_pay_usd": 200,
                  "id": "187135372-72",
                  "total_pay_cny": 1195,
                  "one_night_room_price_usd": 200,
                  "one_night_room_price_cny": 1195,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1000041",
                        "text": "Room only"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "199.60"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313483",
                        "text": "Double Executive Deluxe Room with Marina Bay View  + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_desc": "1 张特大床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏大海景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n无烟客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                "room_type_en": "Executive Deluxe Room with Marina Bay room",
                "lowest_price_cny": 1466.1000000000001,
                "have_breakfast": {
                  "total_pay_usd": 216,
                  "id": "187135372-75",
                  "total_pay_cny": 1290,
                  "one_night_room_price_usd": 216,
                  "one_night_room_price_cny": 1290,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1",
                        "text": "Breakfast"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "215.52"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313483",
                        "text": "Double Executive Deluxe Room with Marina Bay View  + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                }
              },
              "Deluxe Room": {
                "lowest_price_cny": 963,
                "lowest_price_usd": 161.1,
                "room_type": "豪华客房",
                "room_detail": {
                  "displayOrder": 0,
                  "gallery": [],
                  "_id": "599144a4f7b9ed0771e8ac0c",
                  "keywords": [{
                    "keyword": "Deluxe Room",
                    "_id": "59b2723e94e62b3badde2f73",
                    "quoter": "59afe1e0a389295de92f47f8"
                  }, {
                    "keyword": "Deluxe Room",
                    "_id": "59b2723e94e62b3badde2f72",
                    "quoter": "59b0b035a389295de92f4814"
                  }, {
                    "keyword": "Deluxe Room",
                    "_id": "59b2723e94e62b3badde2f71",
                    "quoter": "59b0b048a389295de92f4815"
                  }, {
                    "keyword": "Deluxe Room",
                    "_id": "59b2723e94e62b3badde2f70",
                    "quoter": "59b20729a389295de92f4952"
                  }],
                  "updatedAt": "2017-08-14T06:35:16.232Z",
                  "cover_image_url": "",
                  "createdAt": "2017-08-14T06:35:16.232Z",
                  "has_fetch_price": true,
                  "__v": 0,
                  "add_bed_type": [],
                  "room_type": "豪华客房",
                  "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n无烟客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                  "enabled": true,
                  "hotel": "59292a0c78647808cee95275",
                  "updated_by_editor": false,
                  "facilities": [],
                  "room_type_en": "Double Deluxe Room + Free Wifi",
                  "keyword": "Deluxe Room",
                  "price_info": {
                    "no_breakfast": {
                      "total_pay_usd": 164,
                      "id": "186937607-0",
                      "total_pay_cny": 979,
                      "one_night_room_price_usd": 164,
                      "one_night_room_price_cny": 979,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1000041",
                            "text": "Room only"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "163.56"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313477",
                            "text": "Double Deluxe Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    },
                    "have_breakfast": {
                      "total_pay_usd": 182,
                      "id": "186937607-2",
                      "total_pay_cny": 1085,
                      "one_night_room_price_usd": 182,
                      "one_night_room_price_cny": 1085,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1",
                            "text": "Breakfast"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "181.18"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313477",
                            "text": "Double Deluxe Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    }
                  }
                },
                "cover_image": null,
                "cover_image_url": null,
                "no_breakfast": {
                  "total_pay_usd": 164,
                  "id": "186937607-0",
                  "total_pay_cny": 979,
                  "one_night_room_price_usd": 164,
                  "one_night_room_price_cny": 979,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1000041",
                        "text": "Room only"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "163.56"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313477",
                        "text": "Double Deluxe Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n无烟客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                "have_breakfast": {
                  "total_pay_usd": 182,
                  "id": "186937607-2",
                  "total_pay_cny": 1085,
                  "one_night_room_price_usd": 182,
                  "one_night_room_price_cny": 1085,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1",
                        "text": "Breakfast"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "181.18"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313477",
                        "text": "Double Deluxe Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_type_en": "Deluxe Room room",
                "isBargainRoom": null
              },
              "Premier Room": {
                "lowest_price_usd": 213.3,
                "room_type": "尊贵客房",
                "room_detail": {
                  "displayOrder": 0,
                  "gallery": [],
                  "_id": "59912887f7b9ed0771e8a5a0",
                  "keywords": [{
                    "keyword": "Premier Room",
                    "_id": "59b2723e94e62b3badde2f55",
                    "quoter": "59afe1e0a389295de92f47f8"
                  }, {
                    "keyword": "Premier Room",
                    "_id": "59b2723e94e62b3badde2f54",
                    "quoter": "59b0b035a389295de92f4814"
                  }, {
                    "keyword": "Premier Room",
                    "_id": "59b2723e94e62b3badde2f53",
                    "quoter": "59b0b048a389295de92f4815"
                  }, {
                    "keyword": "Premier Room",
                    "_id": "59b2723e94e62b3badde2f52",
                    "quoter": "59b20729a389295de92f4952"
                  }],
                  "updatedAt": "2017-08-14T04:35:19.338Z",
                  "cover_image_url": "",
                  "createdAt": "2017-08-14T04:35:19.338Z",
                  "has_fetch_price": true,
                  "__v": 0,
                  "add_bed_type": [],
                  "room_type": "尊贵客房",
                  "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 电话、可放入便携式电脑的保险箱和免费报纸（周一至周五）；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n吸烟区/无烟区客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                  "enabled": true,
                  "hotel": "59292a0c78647808cee95275",
                  "updated_by_editor": false,
                  "facilities": [],
                  "room_type_en": "Twin Premier Room + Free Wifi",
                  "keyword": "Premier Room",
                  "price_info": {
                    "no_breakfast": {
                      "total_pay_usd": 197,
                      "id": "187135372-12",
                      "total_pay_cny": 1178,
                      "one_night_room_price_usd": 197,
                      "one_night_room_price_cny": 1178,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1000041",
                            "text": "Room only"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "196.80"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313487",
                            "text": "Twin Premier Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    },
                    "have_breakfast": {
                      "total_pay_usd": 213,
                      "id": "187135372-15",
                      "total_pay_cny": 1270,
                      "one_night_room_price_usd": 213,
                      "one_night_room_price_cny": 1270,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1",
                            "text": "Breakfast"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "212.21"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313487",
                            "text": "Twin Premier Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    }
                  }
                },
                "no_breakfast": {
                  "total_pay_usd": 197,
                  "id": "187135372-12",
                  "total_pay_cny": 1178,
                  "one_night_room_price_usd": 197,
                  "one_night_room_price_cny": 1178,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1000041",
                        "text": "Room only"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "196.80"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313487",
                        "text": "Twin Premier Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 电话、可放入便携式电脑的保险箱和免费报纸（周一至周五）；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n吸烟区/无烟区客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                "room_type_en": "Premier Room room",
                "lowest_price_cny": 1275.3,
                "have_breakfast": {
                  "total_pay_usd": 213,
                  "id": "187135372-15",
                  "total_pay_cny": 1270,
                  "one_night_room_price_usd": 213,
                  "one_night_room_price_cny": 1270,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1",
                        "text": "Breakfast"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "212.21"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313487",
                        "text": "Twin Premier Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                }
              },
              "Meritus Club Room": {
                "lowest_price_usd": 276.3,
                "room_type": "俱乐部客房 ",
                "room_detail": {
                  "room_type": "俱乐部客房 ",
                  "_id": "5984aaf59a26030970d0dcc4",
                  "price_info": {
                    "no_breakfast": {
                      "total_pay_usd": 296,
                      "id": "187135372-68",
                      "total_pay_cny": 1769,
                      "one_night_room_price_usd": 296,
                      "one_night_room_price_cny": 1769,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1000041",
                            "text": "Room only"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "295.60"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313493",
                            "text": "Twin Meritus Club Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    },
                    "have_breakfast": {
                      "total_pay_usd": 296,
                      "id": "187135372-67",
                      "total_pay_cny": 1769,
                      "one_night_room_price_usd": 296,
                      "one_night_room_price_cny": 1769,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1",
                            "text": "Breakfast"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "295.60"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313493",
                            "text": "Twin Meritus Club Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    }
                  },
                  "cover_image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_279_b.jpg",
                  "__v": 1,
                  "enabled": false,
                  "bed_type": "1 张特大床或 2 张单人床",
                  "keyword": "Meritus Club Room",
                  "room_type_en": "Twin Meritus Club Room + Free Wifi",
                  "capture_id": "59845661e9eea940584eb0c7",
                  "recreation": " 平板电视带有有线频道和收费电影",
                  "gallery": [{
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_274_b.jpg",
                    "_id": "5984aaf59a26030970d0dcca"
                  }, {
                    "published": false,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_279_b.jpg",
                    "_id": "5984aaf59a26030970d0dcc9"
                  }, {
                    "published": false,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_341_b.jpg",
                    "_id": "5984aaf59a26030970d0dcc8"
                  }, {
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/55190704_b.jpg",
                    "_id": "5984aaf59a26030970d0dcc7"
                  }, {
                    "published": true,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/3a36eb41_b.jpg",
                    "_id": "5984aaf59a26030970d0dcc6"
                  }, {
                    "published": false,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/4d388905_b.jpg",
                    "_id": "5984aaf59a26030970d0dcc5"
                  }],
                  "add_bed_type": [],
                  "updatedBy": "59291cb8b980cb5ec75880a1",
                  "createdBy": "592e7406bcc7c81e078f7d8c",
                  "occupancy_info": "可入住 2 人（最多含 1 名儿童）",
                  "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 电话、可放入便携式电脑的保险箱和免费报纸（周一至周五）；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n吸烟区/无烟区客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                  "serve": " 空调和每日客房清洁",
                  "hotel": "59292a0c78647808cee95275",
                  "room_size": "房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观",
                  "bed_size": "",
                  "createdAt": "2017-08-04T17:12:21.095Z",
                  "dining": " 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务",
                  "network": " 免费无线和有线上网接入服务",
                  "bathroom": " 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋",
                  "displayOrder": 0,
                  "keywords": [{
                    "keyword": "Meritus Club Room",
                    "_id": "59b2722a94e62b3badde2479",
                    "quoter": "59afe1e0a389295de92f47f8"
                  }, {
                    "keyword": "Meritus Club Room",
                    "_id": "59b2722a94e62b3badde2478",
                    "quoter": "59b0b035a389295de92f4814"
                  }, {
                    "keyword": "Meritus Club Room",
                    "_id": "59b2722a94e62b3badde2477",
                    "quoter": "59b0b048a389295de92f4815"
                  }, {
                    "keyword": "Meritus Club Room",
                    "_id": "59b2722a94e62b3badde2476",
                    "quoter": "59b20729a389295de92f4952"
                  }],
                  "updatedAt": "2017-08-14T03:55:14.271Z",
                  "has_fetch_price": true,
                  "facilities": [{
                    "_id": "59911f228649a775567539be"
                  }],
                  "updated_by_editor": false,
                  "hotel_discounted_price": "",
                  "useful": " 电话、可放入便携式电脑的保险箱和免费报纸（周一至周五）；如有需要，可提供折叠床/加床和免费婴儿床/小童床"
                },
                "no_breakfast": {
                  "total_pay_usd": 296,
                  "id": "187135372-68",
                  "total_pay_cny": 1769,
                  "one_night_room_price_usd": 296,
                  "one_night_room_price_cny": 1769,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1000041",
                        "text": "Room only"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "295.60"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313493",
                        "text": "Twin Meritus Club Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 电话、可放入便携式电脑的保险箱和免费报纸（周一至周五）；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n吸烟区/无烟区客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                "room_type_en": "Meritus Club Room room",
                "lowest_price_cny": 1652.4,
                "have_breakfast": {
                  "total_pay_usd": 296,
                  "id": "187135372-67",
                  "total_pay_cny": 1769,
                  "one_night_room_price_usd": 296,
                  "one_night_room_price_cny": 1769,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1",
                        "text": "Breakfast"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "295.60"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313493",
                        "text": "Twin Meritus Club Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                }
              },
              "Executive Deluxe Room": {
                "lowest_price_usd": 201.6,
                "room_type": "奢华客房 ",
                "room_detail": {
                  "room_type": "奢华客房 ",
                  "_id": "5984aaf59a26030970d0dd0b",
                  "price_info": {
                    "no_breakfast": {
                      "total_pay_usd": 182,
                      "id": "187135372-9",
                      "total_pay_cny": 1087,
                      "one_night_room_price_usd": 182,
                      "one_night_room_price_cny": 1087,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1000041",
                            "text": "Room only"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "181.48"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313481",
                            "text": "Twin Executive Deluxe Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    },
                    "have_breakfast": {
                      "total_pay_usd": 197,
                      "id": "187135372-11",
                      "total_pay_cny": 1178,
                      "one_night_room_price_usd": 197,
                      "one_night_room_price_cny": 1178,
                      "room": {
                        "MealType": {
                          "__": {
                            "code": "1",
                            "text": "Breakfast"
                          }
                        },
                        "Price": {
                          "__": {
                            "amt": "196.80"
                          }
                        },
                        "RoomType": {
                          "__": {
                            "code": "7313481",
                            "text": "Twin Executive Deluxe Room + Free Wifi"
                          }
                        }
                      },
                      "nights": 1
                    }
                  },
                  "cover_image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/c80d6fc8_b.jpg",
                  "__v": 1,
                  "enabled": false,
                  "bed_type": "1 张特大床或 2 张单人床",
                  "keyword": "Executive Deluxe Room",
                  "room_type_en": "Twin Executive Deluxe Room + Free Wifi",
                  "capture_id": "5984579ce9eea940584eb101",
                  "recreation": " 平板电视带有有线频道和收费电影",
                  "gallery": [{
                    "published": false,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/c80d6fc8_b.jpg",
                    "_id": "5984aaf59a26030970d0dd0f"
                  }, {
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_326_b.jpg",
                    "_id": "5984aaf59a26030970d0dd0e"
                  }, {
                    "published": true,
                    "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_327_b.jpg",
                    "_id": "5984aaf59a26030970d0dd0d"
                  }, {
                    "published": true,
                    "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/6736296b_b.jpg",
                    "_id": "5984aaf59a26030970d0dd0c"
                  }],
                  "add_bed_type": [],
                  "updatedBy": "59291cb8b980cb5ec75880a1",
                  "createdBy": "592e7406bcc7c81e078f7d8c",
                  "occupancy_info": "可入住 3 人（最多含 1 名儿童）",
                  "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n无烟客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                  "serve": " 空调和每日客房清洁",
                  "hotel": "59292a0c78647808cee95275",
                  "room_size": "房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观",
                  "bed_size": "",
                  "createdAt": "2017-08-04T17:12:21.110Z",
                  "dining": " 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务",
                  "network": " 免费无线和有线上网接入服务",
                  "bathroom": " 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋",
                  "displayOrder": 0,
                  "keywords": [{
                    "keyword": "Executive Deluxe Room",
                    "_id": "59b2722a94e62b3badde2483",
                    "quoter": "59afe1e0a389295de92f47f8"
                  }, {
                    "keyword": "Executive Deluxe Room",
                    "_id": "59b2722a94e62b3badde2482",
                    "quoter": "59b0b035a389295de92f4814"
                  }, {
                    "keyword": "Executive Deluxe Room",
                    "_id": "59b2722a94e62b3badde2481",
                    "quoter": "59b0b048a389295de92f4815"
                  }, {
                    "keyword": "Executive Deluxe Room",
                    "_id": "59b2722a94e62b3badde2480",
                    "quoter": "59b20729a389295de92f4952"
                  }],
                  "updatedAt": "2017-08-14T03:57:13.693Z",
                  "has_fetch_price": true,
                  "facilities": [{
                    "_id": "59911f998649a775567539c2"
                  }],
                  "updated_by_editor": false,
                  "hotel_discounted_price": "",
                  "useful": " 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床"
                },
                "no_breakfast": {
                  "total_pay_usd": 182,
                  "id": "187135372-9",
                  "total_pay_cny": 1087,
                  "one_night_room_price_usd": 182,
                  "one_night_room_price_cny": 1087,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1000041",
                        "text": "Room only"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "181.48"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313481",
                        "text": "Twin Executive Deluxe Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                },
                "room_desc": "1 张特大床或 2 张单人床\r\n房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观\r\n网络 - 免费无线和有线上网接入服务\r\n 娱乐 - 平板电视带有有线频道和收费电影\r\n餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务\r\n舒适睡眠 - 遮光窗帘 \r\n浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋\r\n实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床\r\n舒适设施/服务 - 空调和每日客房清洁\r\n无烟客房\r\n可要求提供连通房/毗邻房，视供应情况而定",
                "room_type_en": "Executive Deluxe Room room",
                "lowest_price_cny": 1206,
                "have_breakfast": {
                  "total_pay_usd": 197,
                  "id": "187135372-11",
                  "total_pay_cny": 1178,
                  "one_night_room_price_usd": 197,
                  "one_night_room_price_cny": 1178,
                  "room": {
                    "MealType": {
                      "__": {
                        "code": "1",
                        "text": "Breakfast"
                      }
                    },
                    "Price": {
                      "__": {
                        "amt": "196.80"
                      }
                    },
                    "RoomType": {
                      "__": {
                        "code": "7313481",
                        "text": "Twin Executive Deluxe Room + Free Wifi"
                      }
                    }
                  },
                  "nights": 1
                }
              }
            },
            "checkin_time": "",
            "introduction": "Marina Mandarin酒店提供可欣赏新加坡天际线绝美景色的典雅客房、多种餐饮选择和矿泉水泳池，充分地体现了新加坡著名的殷勤好客传统。\r\n酒店周围有多处景点，如滨海艺术中心（The Esplanad）、新加坡摩天观景轮（Singapore Flyer）和新达城会展中心（Suntec City Convention Centre）距离酒店均不到1公里的路程。",
            "fet_rooms_fail_count": 0,
            "__fetched_image_hash": {
              "e92221dfb3d8f393397d143e2ec70825": true,
              "2e707c2b1074615aa41867b35ea0a665": true,
              "3323d19738acb538653e0cb5d824d152": true,
              "1eff78a85d0e1d85895fd0cee011a87c": true,
              "7411c49ba2f7dbfbe0ba6f4dbed2694c": true,
              "5a26de3cfdeb02859712dd57aadedc9e": true,
              "4e701b461f38997b6f61b13e815ad7f2": true,
              "732216fbe0a66c4d3355025861a9e090": true,
              "e757675475a31b1eba7e63a0218a23c3": true,
              "38c2134a00089da808250252d3e6288a": true,
              "06068b0516056557b3a3dc22b827a2c6": true,
              "1ae071ec48bd6419e0681088fa8ef56d": true,
              "0f362236cacae223e795c3194395f6f8": true,
              "823515aa4cb87c043e36bf3195d2eff4": true,
              "fc951174f1f29488c11136c9ffa8e617": true,
              "2bcfbb94553ba0a6c4df25735df5b7e5": true,
              "1057012e090dcb130af9c209f854aec0": true,
              "2dc834b0776a52423cf51529fdfc237e": true,
              "f3d6fae0eae95cfcbb24008270253e66": true,
              "9e758b5ed64e02e22531ec4e4d2cdcb2": true,
              "e1fd3d522e4fe9d764adac4d77bb7869": true,
              "fbfe0bfcfb3d774720acd41e699a75cc": true,
              "36288e9380cc61203b80cd5df3cb8ddd": true,
              "162fa42d547c64982281546deacaf042": true,
              "6933f6c01a31c6dac49317b97e0ab3b6": true,
              "35699c1690d213d3b7586d8c9ff20509": true,
              "dd741e7235b7611f4dd688550ff0b27e": true,
              "d0441590bdcab3083250bb2f6f5f1a2f": true,
              "0e08514d520dc8fafdb0b44e999fcd79": true,
              "0e78bd467322c2ffc54de153949a2520": true,
              "ca4d7ab6cd3d3fde53e936d2dbdac8af": true,
              "83ce39da7731e0eaca5a22bcf6838b1b": true,
              "2a9f357f1b2ef1a06b397b813f8b4d5b": true,
              "96ce2d816674619f2b7baaaf64bf2222": true,
              "6719dc5650fc571595da57d4b9c74097": true,
              "8c632f256b27414de841a94088cb6900": true,
              "7a018de87fd182674541e4261f94e86b": true,
              "e46afb2de1771770bcb2ec4936614db7": true,
              "48740c069cc2d8a59ce45fc0b41131c2": true,
              "d94fc9e31031688bf371e43694cdffaa": true,
              "ba56955e409dbd13888ce4f34ce5e766": true,
              "7c51bb38ed9a14d19408bf7682141c75": true,
              "ad9788ebc3da1cfeccf8905b90a2f92d": true,
              "92351d6fcb41ee4bed856678bcb07f76": true,
              "2088b47d8d725715a01be9f6c7e2a565": true,
              "4950563b6bbec892d0fe391ed4ba032a": true,
              "45eba5d0a66ea857a64c630771291339": true,
              "ffbf631e3ed9f04217efc17c36438bf7": true,
              "187aea00ffc5923576fab4e2de3b2edc": true,
              "357726b1387be772c402a430f909d1e2": true,
              "a1c704fb7121bf0e0ca9522e5fd203dd": true,
              "ca9bb44bc68e8adf1ec228393c5f0b97": true,
              "d21f7083a0bbb6e52250b07c7b01d9e1": true,
              "4227d852abb824c2fc60b53ad0510f07": true,
              "2da38d0b48a2a1279345138dc7bfc54a": true,
              "fedf4250a35292eba21b8e7996b303f7": true,
              "c5e4f88bdfebef3f242c3467551e3909": true,
              "36c1bd03a00c42593be3abc0a803ff5e": true,
              "b2e7570ae26f31cc7208dca707e83cad": true,
              "f1e5250f0410f7065f38eb21d7ed3934": true,
              "76fa8a63ff077200d96017b605c287ed": true,
              "ae1030cd299b13b806c470233b5b17ee": true,
              "71f9d0b181e8d75504a1cb543218bea8": true,
              "20dd77fbd03715c2f1ad6d1f192ab9a8": true,
              "c398681623da96f2e415b1cd49f234ec": true,
              "d1c614fba582558dd19e98f266f8da82": true,
              "fbd60ec0408636df495e132417237025": true,
              "090e93528dc9a80086144c7954fee51e": true,
              "a71828531327b8a1bfde77017ff30d52": true,
              "afbc5bafb3f64f7e5e131cfb57a8a923": true,
              "22e37d04188fc42e775578c81931f470": true,
              "005ec4844df5768a9d5f40950895f4f0": true,
              "53c61f5c7ce6ea6743fe619f0c667fa8": true,
              "f40b33039f33e270502a0d90d4f33630": true,
              "c7cbbcfc8e9ff5ee26ed1d33485c9ff6": true,
              "161e3bfe4754f87f5120b43dc3891d0c": true,
              "48a0298b785b0f7039108b5b605fa3fd": true,
              "bcbd962c19c02ef6767d21de6f024b3d": true,
              "16c0e21b0d9cf9afca1df21fa4c90cd8": true,
              "dc1d62c96844f8f26d831bbd2f1db7fc": true,
              "507fdc36fe23f2fa1630503417828fd4": true,
              "538a2345102c49f0d387c3c5f1d5c98b": true,
              "1bd5390faeac23009fb7ddff7efc0979": true,
              "cc382dafa136a8a85dc3fd78668069c7": true,
              "7c8208dd728f7591c160e3af087a263a": true,
              "017dcc75a0449771807f29550aa98c48": true,
              "82a9d51c95ea3add8a332c422e6d0fea": true,
              "fcb531b8341640955ff82ea1da8df877": true,
              "bb9707a400500a121b2345bfc637eb61": true,
              "c5f0332b6d7306e35e3bcab551318247": true
            },
            "latitude": 1.2918201,
            "recommend_reason": "无",
            "tips": "所有额外入住的12岁以下的儿童，加床的收费是每晚 SGD 80 。\r\n所有额外入住的年龄较大的儿童或者成人，加床的收费是每晚 SGD 80 。\r\n最多容纳：每间客房1张加床。\r\n所提出的任何加床或婴儿床的要求均需获得酒店的确认。\r\n附加费用不会自动计算在总价中，您需在入住时另行支付。",
            "website": "http://meritushotels.com/en/marina-mandarin-singapore/index.html",
            "baseRoomIncludeCaseWord": "",
            "old_id": "5902eb287338e86bc55fe682",
            "price": "1507",
            "capture_url": "http://scripture.weegotr.com/api/v1/crawled/59844b126afb7e10d071ebd7",
            "comments_url": "https://www.tripadvisor.cn/Hotel_Review-g294265-d300855-Reviews-m11419-Marina_Mandarin_Singapore-Singapore.html",
            "checkout_time": "",
            "hotel_id": "65491",
            "baseRoomExclusiveCaseWord": "",
            "address": "6 Raffles Boulevard Marina Square, Singapore, 039594, Singapore",
            "services": "",
            "capture_id": "59844b126afb7e10d071ebd7",
            "name_en": "Marina Mandarin",
            "google_place_id": "",
            "best_visit_duration": "180",
            "name": "新加坡滨华大酒店",
            "longitude": 103.8549195,
            "__v": 19,
            "comments_from": "TripAdvisor",
            "published": true,
            "refund_explain": "",
            "__t": "Hotel",
            "random": {
              "type": "Point",
              "coordinates": [0.30945745089694476, 0.14717182983047938]
            },
            "updated_by_editor": true,
            "en": {
              "name": "Marina Mandarin",
              "address": "6 Raffles Boulevard Marina Square, Singapore, 039594, Singapore",
              "info": "",
              "introduction": "",
              "tips": ""
            },
            "policy": [{
              "content": "入住时间 14:00后\r\n退房时间 12:00前",
              "type": "入住政策",
              "_id": "5a5c22e4702b40001ce70e6a"
            }],
            "facilities": [{
              "facility": "575 间客房",
              "_id": "5a5c22e4702b40001ce70e69"
            }],
            "attractions": [{
              "distance": "",
              "name": "位于滨海湾",
              "_id": "5a5c22e4702b40001ce70e68"
            }],
            "room_images_ref": {
              "md": "* 房间名: Double Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 314.01 \n* 房间名: Twin Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 314.01 \n* 房间名: Twin Deluxe Room + Free Wifi | 餐食信息: Breakfast | 价格: 330.93 \n* 房间名: Double Deluxe Room + Free Wifi | 餐食信息: Breakfast | 价格: 330.93 \n* 房间名: Double Deluxe Room + Free Wifi | 餐食信息: Breakfast | 价格: 338.64 \n* 房间名: Double Executive Deluxe Room + Free Wifi | 餐食信息: Room only | 价格: 213.41 \n* 房间名: Double Premier Room + Free Wifi | 餐食信息: Room only | 价格: 230.53 \n* 房间名: Double Executive Deluxe Room + Free Wifi | 餐食信息: Breakfast | 价格: 230.53 \n* 房间名: Double Premier Room + Free Wifi | 餐食信息: Breakfast | 价格: 247.55 \n* 房间名: Double Meritus Club Room with Bay View + Free Wifi | 餐食信息: Breakfast | 价格: 307.11 \n* 房间名: Double Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 291.39 \n* 房间名: Double Premier Room + Free Wifi | 餐食信息: Breakfast | 价格: 299.10 \n* 房间名: Twin Executive Deluxe Room + Free Wifi | 餐食信息: Room only | 价格: 231.03 \n* 房间名: Twin Premier Room + Free Wifi | 餐食信息: Room only | 价格: 245.75 \n* 房间名: Twin Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 287.69 \n* 房间名: Twin Meritus Club Room + Free Wifi | 餐食信息: Room only | 价格: 287.69 \n* 房间名: Twin Meritus Club Room with Bay View + Free Wifi | 餐食信息: Breakfast | 价格: 303.30 \n* 房间名: Twin Meritus Club Room with Bay View + Free Wifi | 餐食信息: Room only | 价格: 303.30 \n* 房间名: Double Executive Deluxe Room + Free Wifi | 餐食信息: Room only | 价格: 231.03 \n* 房间名: Double Premier Room + Free Wifi | 餐食信息: Room only | 价格: 245.75 \n* 房间名: Double Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 287.69 \n* 房间名: Double Meritus Club Room + Free Wifi | 餐食信息: Room only | 价格: 287.69 \n* 房间名: Double Meritus Club Room with Bay View + Free Wifi | 餐食信息: Breakfast | 价格: 303.30 \n* 房间名: Double Meritus Club Room with Bay View + Free Wifi | 餐食信息: Room only | 价格: 303.30 \n* 房间名: Executive Deluxe Room + Free Wifi | 餐食信息: Breakfast | 价格: 248.75 \n* 房间名: Executive Deluxe Room with Marina Bay View  + Free Wifi | 餐食信息: Room only | 价格: 264.56 \n* 房间名: Premier Room + Free Wifi | 餐食信息: Room only | 价格: 264.56 \n* 房间名: Premier Room with Marina Bay View + Free Wifi | 餐食信息: Room only | 价格: 280.38 \n* 房间名: Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 335.64 \n* 房间名: Meritus Club Room with Bay View + Free Wifi | 餐食信息: Breakfast | 价格: 351.35 \n* 房间名: Deluxe Room + Free Wifi | 餐食信息: Room only | 价格: 450.05 \n* 房间名: Atrium Suite | 餐食信息: Breakfast | 价格: 461.96 \n* 房间名: Executive Deluxe Room + Free Wifi | 餐食信息: Room only | 价格: 231.63 \n* 房间名: Executive Deluxe Room with Marina Bay View  + Free Wifi | 餐食信息: Room only | 价格: 246.35 \n* 房间名: Premier Room + Free Wifi | 餐食信息: Room only | 价格: 246.35 \n* 房间名: Executive Deluxe Room + Free Wifi | 餐食信息: Breakfast | 价格: 255.76 \n* 房间名: Premier Room with Marina Bay View + Free Wifi | 餐食信息: Room only | 价格: 261.06 \n* 房间名: Meritus Club Room + Free Wifi | 餐食信息: Breakfast | 价格: 312.51 \n* 房间名: Meritus Club Room with Bay View + Free Wifi | 餐食信息: Breakfast | 价格: 327.23 \n* 房间名: Family Room | 餐食信息: Room only | 价格: 419.12 \n* 房间名: Atrium Suite | 餐食信息: Breakfast | 价格: 430.13 \n* 房间名: Double Executive Deluxe Room + Free Wifi | 餐食信息: Room only | 价格: 246.35 \n* 房间名: Double Premier Room + Free Wifi | 餐食信息: Breakfast | 价格: 261.96 \n"
            },
            "room_images": [{
              "_id": "5943c5a08b1fdf0d9132a176",
              "room_type": "高级客房",
              "room_desc": "",
              "key_world": "premier",
              "image_url": "http://img1.weegotr.com/cms/uploads/xY2pMBCl_OAcKta-.jpg"
            }, {
              "_id": "5943c5a08b1fdf0d9132a178",
              "room_type": "俱乐部",
              "room_desc": "",
              "key_world": "Club",
              "image_url": "http://img1.weegotr.com/cms/uploads/xY2pMBCl_OAcKta-.jpg"
            }, {
              "_id": "5943c5a08b1fdf0d9132a179",
              "room_type": "行政客房",
              "room_desc": "",
              "key_world": "Executive",
              "image_url": "http://img1.weegotr.com/cms/uploads/xY2pMBCl_OAcKta-.jpg"
            }, {
              "_id": "5943c5a08b1fdf0d9132a17a",
              "room_type": "豪华客房",
              "room_desc": "",
              "key_world": "Deluxe",
              "image_url": "http://img1.weegotr.com/cms/uploads/xY2pMBCl_OAcKta-.jpg"
            }, {
              "_id": "5943c5a08b1fdf0d9132a17b",
              "room_type": "套房",
              "room_desc": "",
              "key_world": "Suite",
              "image_url": "http://img1.weegotr.com/cms/uploads/xY2pMBCl_OAcKta-.jpg"
            }, {
              "_id": "5964b36cb418b1398643f627",
              "room_type": "高级房",
              "room_desc": "",
              "key_world": "Superior",
              "image_url": ""
            }],
            "hotel_rooms": ["59660e8e7a9caa2aa525d543", "59660e8e7a9caa2aa525d540", "5984aaf59a26030970d0dca3", "5984aaf59a26030970d0dce7", "5984aaf59a26030970d0dcc4", "5984aaf59a26030970d0dc5e", "5984aaf59a26030970d0dc82", "5984aaf59a26030970d0dd0b", "59912887f7b9ed0771e8a59f", "59912887f7b9ed0771e8a5a0", "599144a4f7b9ed0771e8ac0c"],
            "comments": [{
              "_id": "5a26616ad96a647d586fe0eb",
              "published_date": "2017-10-21T00:00:00.000Z",
              "published_by": "png-kl",
              "published_at": "2017-10-21",
              "title": "休闲",
              "description": "我们于2017年10月20-22在这里住了两晚。房间是干净的，宽敞的但有点过时，需要维修。枕头很硬，很不舒服，因为在你的头部休息的那个地方变得平坦。我的保险柜需要开锁，开锁的工作人员很粗鲁。他甚至不知道保险柜在哪里，不得不问我！我们吃了晚饭，发现工作人员缺乏顾客服务，态度粗鲁。一个女服务员不小心撞到我的丈夫，没有道歉，反而是皱着眉，看上去很恼火觉得是我丈夫挡住了她的路！",
              "rating": 3,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0ea",
              "published_date": "2017-10-13T00:00:00.000Z",
              "published_by": "Ivy C",
              "published_at": "2017-10-13",
              "title": "旧型的饭店",
              "description": "饭店本身与隔壁商场的连结性有待加强，若是从商场进入饭店本身容易迷路；大厅虽然是用篓空挑高的方式呈现，但是光线不足，感觉起来还满昏暗的；房间本身带有一股霉味，我不知道是不是因为连日下雨的关系，但一进房间的感觉很不好；床满舒适好睡的；浴室还满宽敞，但有些设备还需加强；早餐选择性多，每天所提供的餐点都会做些调整。感觉这间是一间有\"年纪\"的饭店，虽然一楼的大厅有装修拉皮过，感觉还满新的，但内部设施还有满多都需要再加强的地方。",
              "rating": 4,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e9",
              "published_date": "2017-10-11T00:00:00.000Z",
              "published_by": "lichi H",
              "published_at": "2017-10-11",
              "title": "住一晚&吃一顿午餐",
              "description": "食物不错吃 住宿很幸运没有住到雷的房间，餐厅的Terry服务非常好，待人也很亲切，喜欢中庭的设计，抬头可看见所有套房",
              "rating": 4,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e8",
              "published_date": "2017-09-30T00:00:00.000Z",
              "published_by": "badri85",
              "published_at": "2017-09-30",
              "title": "舒适的停留！",
              "description": "待在那里真的很舒服。员工很友好。很棒的自助早餐。我唯一不开心的就是洗澡区。它太小了，必须增加一点空间。此外，酒店还可以为孩子们提供婴儿车，至少是可以出租。所以旅行的人不需要一直带着婴儿车!",
              "rating": 4,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e7",
              "published_date": "2017-09-08T00:00:00.000Z",
              "published_by": "Kartika T",
              "published_at": "2017-09-08",
              "title": "低于我们的预期了",
              "description": "为了纪念我们的周年纪念日，我们在这儿订了五天四晚。当初选择这家是因为看了评论都很好，但是抱歉的是，我们觉得很失望。房间看起来不错，但有些损坏，多亏了维修员及时维修。运行浴缸、推拉门，有一盏灯坏掉了。客观讲，气氛还可以。早餐时员工看起来不知道在干什么，除了瑞秋小姐，用餐区几乎所有的面孔都很疲惫阴郁。相对于我们付出的金钱来讲，我希望能得到更好的服务和微笑。食物和往常一样多种多样。希望看到我的评论后，酒店能够更好地去改善和提升！",
              "rating": 3,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e6",
              "published_date": "2017-08-25T00:00:00.000Z",
              "published_by": "Neil And Kate F",
              "published_at": "2017-08-25",
              "title": "住在这里",
              "description": "酒店地理位置比较好，穿过一个桥，在它旁边有一个购物中心。从我的经验来说，这是非常安全的。在游泳池旁边我丢了我的钱包，保安员Ravi非常善良地将它捡回来交给了我，里面没丢任何东西。",
              "rating": 4,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e5",
              "published_date": "2017-08-14T00:00:00.000Z",
              "published_by": "Ming明",
              "published_at": "2017-08-14",
              "title": "只有SOP而不重视客人实际反应的老饭店",
              "description": "8/8我搭一大早班机到新加坡出差，在赶急拜访客户后回到饭店已很晚了，进房间把所有行李打开规位，准备洗澡时，脱光衣服一要进浴室就发现蟑螂cockroah和灰尘一起被丢在马桶内，感觉真的很差，让我怀疑饭店的软体不行。我穿起浴袍打了电话给柜台，告诉马桶有蟑螂，结果等了15分钟后，出现一位讲大陆口音的房务员生手来，看了马桶内蟑螂把它冲掉，然后道歉的说是撒清洁剂所产生的，问我要不要让柜台帮我换房。我告诉他一个五星收费如此贵的饭店怎么会发生这种事，我很累要洗澡却这样，如何安心住房，请大厅副理回电。这过程也花了五分钟了。结果15分钟后，有位男性自称主管没讲他是谁，快速的用专业快速的英文说完后（应该是SOP流程)，说要换房间给我，我告诉他换房间我要收拾所有行李，我累的只想洗澡，他说请另一人打电话给我，又等了十分钟。一位说中文讲话较慢的女性打电话来，态度好点且一再道歉，并说明要换高楼层房间给我，我拒绝了，我觉得很累不想再大费周章的收拾行李又换房间，但我不能接受这样品质，等明天再看看。结果隔天8/9什么问候关怀也没有，大概常发生蟑螂出现或觉得没什么吧！本来早餐吃得很开心，结果最后去拿水果回来时，找不到我的座位，因为原本座位对面坐了位外国人，而我没吃完的餐和餐具仍放在桌上，害我站在那质疑很久也没人注意到，这种不控位的事竟然发生在五星级饭店内。8/10算是没啥事，还有像住五星级饭店的一天。8/11早上不到九点（之前都是接近十点时），就有人来敲门急促再三的查mini bar或收洗衣服的，当时我正在厕所，对一直敲门感觉很差。最后8/12check out 时，柜台照SOP问我住宿有问题吗？我告诉他你的记录应该有，第一晚的蟑螂，但柜台的男士做势打了电脑一阵子后，给我收据，一句致歉也没说就结束了服务。我要说的是这是个老饭店，老的不只只有硬体，所有SOP只是照规定做，不管客人的反应，做完就结束了。感觉就是你以后来不来或者这饭店对客人感受都无所谓或对华人有歧视（我新加坡客户听到时说的），总之，让我对这二三十年来新加坡水准大打折扣，这只是个硬梆梆的冰冷软件的饭店，已经没有昔日五星的价值了，完全不推荐，我相信新加坡还有其他很多我住过的五星饭店，应该不会这么掉漆。（连最后一晚去试每人快100新币的晚餐Buffet都觉得不会想再推荐）",
              "rating": 3,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e4",
              "published_date": "2017-08-08T00:00:00.000Z",
              "published_by": "Cherish Y",
              "published_at": "2017-08-08",
              "title": "聚会",
              "description": "听歌、品小酒的地方-乐队唱的不错。喜欢鸿桃轩的中餐馆，菜式味道比东方文华的樱桃园中餐馆好一些。不过喝茶聊天的话、没有东方文华的那种户外风景看。。",
              "rating": 4,
              "locale": "cmn"
            }, {
              "_id": "5a26616ad96a647d586fe0e3",
              "published_date": "2017-08-04T00:00:00.000Z",
              "published_by": "Butterfllyjoyce",
              "published_at": "2017-08-04",
              "title": "超赞的服务",
              "description": "我们在这家旅馆住了一个星期，对这里的优质服务感到非常满意。我丈夫是残疾人，他们很友善地帮我管理轮椅。我们在酒店最喜欢的餐厅是中国的橘子花。食物很好，桌布使得它感觉像一个很特别的地方，食物和服务一样优良！强烈推荐这家酒店。礼宾部经理Suresh Singh让我们感觉像家一样。他非常亲切。",
              "rating": 5,
              "locale": "cmn"
            }],
            "open_timespan": [],
            "highlights": [{
              "description": "Marina Mandarin Singapore酒店距离市政厅（City Hall）地铁站有10 分钟步行路程。",
              "title": "交通便利",
              "_id": "594b93e243832615268def9a",
              "isHandledImageSize": true,
              "image": {
                "size": 124026,
                "mimetype": "image/jpeg"
              },
              "image_url": "http://img1.weegotr.com/cms/uploads/JqXP_PGA2pEqKEl8.jpg"
            }, {
              "description": "经过清真认证的AquaMarine Restaurant餐厅供应新鲜的海鲜和国际美食自助餐。Peach Blossoms餐厅提供点心和粤菜。客人可以在Atrium Lounge & Senses Patisserie休息室享用下午茶。 ",
              "title": "美食诱惑",
              "_id": "594b93e243832615268def9b",
              "isHandledImageSize": true,
              "image": {
                "size": 90641,
                "mimetype": "image/jpeg"
              },
              "image_url": "http://img1.weegotr.com/cms/uploads/JrJJCsL4V7-6XbU_.jpg"
            }, {
              "description": "Marina Mandarin酒店的客房装有温暖的灯光和落地窗，享有码头海湾和城市天际线的全景。每间客房都装潢优雅，并配有一台平面电视和沏茶/咖啡设施。\r\n一个设备齐全的24小时健身中心为客人提供在逗留期间工作的机会。",
              "title": "设施齐全",
              "_id": "594b93e243832615268def9c",
              "isHandledImageSize": true,
              "image": {
                "size": 82276,
                "mimetype": "image/jpeg"
              },
              "image_url": "http://img1.weegotr.com/cms/uploads/VrqRmZg8ig_ceuyP.jpg"
            }],
            "gallery": [{
              "_id": "5a55cb756fdf1e34eba2880d",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 382582
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/00d2b5d9_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2880e",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 296276
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/198d347b_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2880f",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 366998
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_115_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28810",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 181450
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/c13e1067_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28811",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 318850
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/6fb7431e_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28812",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 266329
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_274_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28813",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 230673
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_279_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28814",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 335347
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_305_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28815",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 159242
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_322_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28816",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 165921
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_326_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28817",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 168844
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_327_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28818",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 317581
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_332_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28819",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 263018
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_333_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2881a",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 96600
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_341_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2881b",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 233108
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_343_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2881c",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 188475
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_351_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2881d",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 159044
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_352_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2881e",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 317789
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_353_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2881f",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 179336
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_354_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28820",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 213626
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/1a8201d3_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28821",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 188878
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/c80d6fc8_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28822",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 187440
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/dfee8e06_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28823",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 209370
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/70ba1424_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28824",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 227798
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/49010ff4_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28825",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 254533
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/84bc7522_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28826",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 173073
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/10db2906_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28827",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 238718
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/b4777246_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28828",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 314316
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_298_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28829",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 263997
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_330_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2882a",
              "published": true,
              "image": {
                "mimetype": "image/jpeg",
                "size": 285738
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_331_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2882b",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 224370
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/664c2aa7_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2882c",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 130519
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/55190704_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2882d",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 82464
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/3a36eb41_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2882e",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 205305
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/6736296b_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2882f",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 95415
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/4d388905_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28830",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 229933
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/3789fba9_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28831",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 235169
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/791a9497_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28832",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 404427
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/72760ccf_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28833",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 277489
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_130_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28834",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 203752
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_266_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28835",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 88206
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/7a10c103_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28836",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 106100
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_268_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28837",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 315456
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/8d726ddb_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28838",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 304954
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/d9c266c3_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28839",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 226141
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/f92a8bd1_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2883a",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 91590
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/361519de_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2883b",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 123691
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/2d3ec487_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2883c",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 359001
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_121_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2883d",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 304785
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_127_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2883e",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 276654
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_293_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2883f",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 214082
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/74861d75_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28840",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 270457
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/a72a1c91_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28841",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 371230
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/67985aa1_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28842",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 341386
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_291_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28843",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 330783
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_295_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28844",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 391424
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_302_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28845",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 166213
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_306_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28846",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 412327
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/328749_307_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28847",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 152191
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/b1c3bb6a_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28848",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 344675
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/074ae1b0_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28849",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 391433
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/49217821_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2884a",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 165154
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/138c021c_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2884b",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 369564
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/100eb8f6_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2884c",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 390920
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/4567b749_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2884d",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 133618
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/66b3ba58_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2884e",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 154832
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/1ca2f7e0_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba2884f",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 178028
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/d1547d02_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28850",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 485222
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/7b696468_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28851",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 518856
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/328749_119_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28852",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 346532
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/8908977b_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28853",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 432432
              },
              "image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/8bb91c89_w.jpg",
              "isHandledImageSize": false
            }, {
              "_id": "5a55cb756fdf1e34eba28854",
              "published": false,
              "image": {
                "mimetype": "image/jpeg",
                "size": 485444
              },
              "image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/c9a333e5_w.jpg",
              "isHandledImageSize": false
            }],
            "recommend_products": [],
            "fetch_rooms_fail_count": 0,
            "hotel_price": {
              "price_cny": 1507,
              "price_usd": 226,
              "price_local": 226
            },
            "quote_ids": [{
              "quoter": "59afe1e0a389295de92f47f8",
              "_id": "5a26616ad96a647d586fe0ef",
              "hotel_id": "65491"
            }, {
              "quoter": "59b0b048a389295de92f4815",
              "_id": "5a26616ad96a647d586fe0ee",
              "hotel_id": "10295f"
            }, {
              "quoter": "59b0b035a389295de92f4814",
              "_id": "5a26616ad96a647d586fe0ed",
              "hotel_id": "16239"
            }, {
              "quoter": "59c1f0f8e1812033000e1de8",
              "_id": "5a26616ad96a647d586fe0ec",
              "hotel_id": "74304"
            }],
            "publish_status": "online",
            "is_recommend": false,
            "tags": [{
              "_id": "59291d1cb980cb5ec75a0750",
              "name": "四星级",
              "name_en": ""
            }, {
              "_id": "59291d1cb980cb5ec75a074c",
              "name": "城市特色",
              "name_en": ""
            }],
            "is_handled_cover_image_size": true,
            "cover_image_url": "http://img2.weegotr.com/hotels/1000000/330000/328800/328749/00d2b5d9_w.jpg",
            "cover_image": {
              "mimetype": "image/jpeg",
              "url": "/public/uploads/r1MYjRmrhQiL1zAU.jpg",
              "filename": "r1MYjRmrhQiL1zAU.jpg",
              "originalname": "91319534.jpg",
              "path": "/home/work/fe/hub/public/uploads",
              "size": 382582
            },
            "traffic_info": [],
            "ranking": 48,
            "rating": 4,
            "weight": 1669879009,
            "edit_status": "edited",
            "telephone_not_found": false,
            "geo_location": []
          },
          "cancel_rule": "在2018年06月22日之后至2018年07月03日之前取消扣除手续费1517元。",
          "hotel_price_info": {
            "averagePriceCny": 1517,
            "averagePriceUsd": 234,
            "totalPayCny": 1517,
            "totalPayUsd": 234,
            "cityTaxRate": 0.17,
            "cityTax": "",
            "isInRightRange": true
          },
          "hotel_room_info": {
            "quoteId": "5b2cb64d5480e16ab7fe9151",
            "roomCount": 1,
            "nights": 1,
            "currentRoomPrice": {
              "hotel_id": "10295f",
              "room_type": "Deluxe Room",
              "nonrefundable": true,
              "additional_info": "",
              "cancellation_policies": [{
                "ratio": "1",
                "days_remaining": 11
              }],
              "currency": "CNY",
              "meal_type": null,
              "price": "1517",
              "total_price": "1517",
              "nights": 1,
              "checkin": "2018-07-02",
              "identity": {
                "provider": "HotelsPro",
                "provider_id": "59b0b048a389295de92f4815",
                "room_type_code": "10295f_629832535_1_11_2_1_0_0_629832551_0_2-3-0_11-100.20180702_1_2_0_47_2aac17b7f0344e899dee05da2289985c_"
              },
              "supports_cancellation": true,
              "_is_package": false,
              "_is_agent": false,
              "ori_price": "223",
              "ori_total_price": "223",
              "ori_currency": "USD",
              "_premium_ratio": "2",
              "_package_premium_ratio": "2",
              "_agent_package_premium_ratio": "2",
              "_agent_hotel_premium_ratio": "2",
              "average_price_cny": "1517",
              "total_pay_cny": "1517",
              "average_price_usd": "234",
              "total_pay_usd": "234",
              "cachekey": "QUOTES:HotelsPro::8349787166893839f22c7d79098dcb91",
              "keyword": "deluxe room",
              "keyword_en": "deluxe room",
              "version": "2",
              "code": "5b2cb57a5480e16ab6fe8f65",
              "hotel_room_id": "5984aaf59a26030970d0dc5e_0",
              "published": true,
              "room_info": {
                "_id": "5984aaf59a26030970d0dc5e",
                "room_type": "豪华客房",
                "room_type_en": "Deluxe Room",
                "room_desc": ["1 张特大床或 2 张单人床", "房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观", "网络 - 免费无线和有线上网接入服务", "娱乐 - 平板电视带有有线频道和收费电影", "餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务", "舒适睡眠 - 遮光窗帘", "浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋", "实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床", "舒适设施/服务 - 空调和每日客房清洁", "无烟客房", "可要求提供连通房/毗邻房，视供应情况而定"],
                "room_desc_order": ["1 张特大床或 2 张单人床", "房间面积 31 平方米（ 334 平方英尺），阳台可欣赏城市景观", "网络 - 免费无线和有线上网接入服务", "娱乐 - 平板电视带有有线频道和收费电影", "餐饮 - 冰箱、迷你吧、咖啡壶/茶具和24 小时客房送餐服务", "舒适睡眠 - 遮光窗帘", "浴室 - 私人浴室备有淋浴/浴缸组合、浴衣和拖鞋", "实用 - 可放入便携式电脑的保险箱、免费报纸（周一至周五）和书桌；如有需要，可提供折叠床/加床和免费婴儿床/小童床", "舒适设施/服务 - 空调和每日客房清洁", "无烟客房", "可要求提供连通房/毗邻房，视供应情况而定"],
                "bed_type": "1 张特大床或 2 张单人床",
                "occupancy_info": "可入住 3 人（最多含 1 名儿童）",
                "cover_image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/c80d6fc8_b.jpg",
                "gallery": [],
                "facilities": [{
                  "_id": "5a26616ba03c891b108f6007",
                  "facility": "冰箱"
                }, {
                  "_id": "5a26616ba03c891b108f6006",
                  "facility": "吹风机"
                }, {
                  "_id": "5a26616ba03c891b108f6005",
                  "facility": "电话"
                }, {
                  "_id": "5a26616ba03c891b108f6004",
                  "facility": "房内保险箱（可放笔记本电脑）"
                }, {
                  "_id": "5a26616ba03c891b108f6003",
                  "facility": "房内儿童看护（收费）"
                }, {
                  "_id": "5a26616ba03c891b108f6002",
                  "facility": "房内恒温控制（空调）"
                }, {
                  "_id": "5a26616ba03c891b108f6001",
                  "facility": "付费电影"
                }, {
                  "_id": "5a26616ba03c891b108f6000",
                  "facility": "客房送餐服务（24 小时）"
                }, {
                  "_id": "5a26616ba03c891b108f5fff",
                  "facility": "空调"
                }, {
                  "_id": "5a26616ba03c891b108f5ffe",
                  "facility": "淋浴/浴缸组合"
                }, {
                  "_id": "5a26616ba03c891b108f5ffd",
                  "facility": "每日客房清洁"
                }, {
                  "_id": "5a26616ba03c891b108f5ffc",
                  "facility": "迷你吧"
                }, {
                  "_id": "5a26616ba03c891b108f5ffb",
                  "facility": "免费 WiFi"
                }, {
                  "_id": "5a26616ba03c891b108f5ffa",
                  "facility": "免费儿童床/婴儿床"
                }, {
                  "_id": "5a26616ba03c891b108f5ff9",
                  "facility": "免费平日报纸"
                }, {
                  "_id": "5a26616ba03c891b108f5ff8",
                  "facility": "免费瓶装水"
                }, {
                  "_id": "5a26616ba03c891b108f5ff7",
                  "facility": "免费洗浴用品"
                }, {
                  "_id": "5a26616ba03c891b108f5ff6",
                  "facility": "免费有线高速上网"
                }, {
                  "_id": "5a26616ba03c891b108f5ff5",
                  "facility": "平板电视"
                }, {
                  "_id": "5a26616ba03c891b108f5ff4",
                  "facility": "书桌"
                }, {
                  "_id": "5a26616ba03c891b108f5ff3",
                  "facility": "私人浴室"
                }, {
                  "_id": "5a26616ba03c891b108f5ff2",
                  "facility": "提供连通房/相邻房"
                }, {
                  "_id": "5a26616ba03c891b108f5ff1",
                  "facility": "拖鞋"
                }, {
                  "_id": "5a26616ba03c891b108f5ff0",
                  "facility": "阳台"
                }, {
                  "_id": "5a26616ba03c891b108f5fef",
                  "facility": "有线电视服务"
                }, {
                  "_id": "5a26616ba03c891b108f5fee",
                  "facility": "浴袍"
                }, {
                  "_id": "5a26616ba03c891b108f5fed",
                  "facility": "遮光挂帘/窗帘"
                }, {
                  "_id": "5a26616ba03c891b108f5fec",
                  "facility": "折叠床/加床（收费）"
                }],
                "add_bed_type": [],
                "can_show_detail": true
              },
              "price_cny": 1260,
              "currencyRate": {
                "CNY": 1,
                "GBP": 8.5861,
                "EUR": 7.520599999999999,
                "CAD": 4.866499999999999,
                "AUD": 4.7799000000000005,
                "JPY": 0.058944,
                "USD": 6.4803999999999995,
                "HKD": 0.8261
              },
              "checkout": "2018-07-03"
            },
            "mealType": "不含餐",
            "checkOutTime": "2018-07-03",
            "checkInTime": "2018-07-02",
            "cancelRule": "在2018年06月22日之后至2018年07月03日之前取消扣除手续费1517元。",
            "useTips": "",
            "detail": {
              "cover_image_url": "http://img1.weegotr.com/hotels/1000000/330000/328800/328749/c80d6fc8_b.jpg",
              "room_type": "豪华客房",
              "room_type_en": "Deluxe Room",
              "room_id": "5984aaf59a26030970d0dc5e_0"
            }
          },
          "quote_name": "HotelsPro",
          "__v": 0,
          "room_filters": [{
            "adults": 2,
            "children": 0
          }],
          "package_conform_info": [],
          "memo": "",
          "has_send_confirm_failed_email": false,
          "has_send_email": false,
          "cancel_code": "",
          "deal_check_code": "",
          "voucher": "",
          "cancel_info": {
            "applied_at": "2018-06-22T08:44:48.664Z"
          },
          "extra": {
            "checkin_date": "2018-07-02T00:00:00.000Z",
            "checkout_date": "2018-07-03T00:00:00.000Z",
            "customer_count": 2,
            "room_count": 1,
            "booking_response": "{\"average_price_cny\":\"1517\",\"average_price_usd\":\"234\",\"total_pay_cny\":\"1517\",\"total_pay_usd\":\"234\",\"use_tips\":\"\",\"cancel_rules\":[{\"policy_from\":\"2018-06-22\",\"policy_to\":\"2018-07-03\",\"policy_fee\":\"223\",\"policy_fee_cny\":\"1517\",\"policy_fee_usd\":\"234\"}],\"nights\":1,\"code\":\"5b2cb64d5480e16ab7fe9151\"}",
            "room_id": "5b2cb64d5480e16ab7fe9151"
          },
          "customers": [{
            "first_name": "zhang",
            "last_name": "san",
            "_id": "5b2cb6a84c4bb8128b016c70",
            "gender": "MR"
          }, {
            "first_name": "li",
            "last_name": "si",
            "_id": "5b2cb6a84c4bb8128b016c6f",
            "gender": "MR"
          }],
          "contact_info": {
            "mobile": "13575466439",
            "email": "test4444@qqc.om"
          },
          "payment": {
            "amount": 1517,
            "amount_usd": 234,
            "method": "alipay",
            "started_at": "2018-06-22T08:43:26.286Z",
            "uri": "app_id=2017032406392298&biz_content={\"subject\":\"Weego - 新加坡滨华大酒店\",\"body\":\"拥有矿泉泳池的绝美景色酒店\",\"out_trade_no\":\"5b2cb6a84c4bb8128b016c6e\",\"total_amount\":\"1517.00\",\"timeout_express\":\"30m\",\"product_code\":\"QUICK_MSECURITY_PAY\"}&charset=utf-8&format=JSON&method=alipay.trade.wap.pay&notify_url=https://sandbox.api.feifanweige.com/api/orders/paynotify/alipay&return_url=http://localhost:8011/order/pay?orderinfo=5b2cb6a84c4bb8128b016c6e.order.true&sign_type=RSA2&timestamp=2018-06-22 16:43:26&version=1.0&sign=Bt59a9VHP5NE9FCk05c/YiyKWMeQtGzF3Y60hLbbMwzezxCwOHINXydfwWhi99QPim4WnSXf3Pcpo2dGPHzzu9GvHYKJ1kHc9VDnIze0bZlpwoNmRh54vLUouMB/Jgm86DNtg5Z3N1gvoQVLpyXCBei80+O6UFf1tzb0A9Qd0c+/rot0qivlcHlR+xe6b+zHGQy0JRyjQYEHwH1KY6k2uPGr0RpMChnrWhi4pgJ0C81SIrdm2b4x6PHyCIOGTj5oxQp0ifhmNar7v7MzuJHDhn76AxjBZP55c30s1HxicjaxgGPYtQbymejUNXws9Xpd0xRAsCfp1M0gmfOVLWwl+Q=="
          },
          "source": "web",
          "status": "cancelled",
          "coupon_snapshot": {
            "is_transfer_supported": false
          },
          "deleted": false,
          "currency_rate": {
            "CNY": 1,
            "JPY": 0.059733,
            "HKD": 0.8439,
            "GBP": 8.7821,
            "USD": 6.6234,
            "CAD": 5.0394,
            "AUD": 4.9145,
            "EUR": 7.7687
          },
          "pay_methods": ["alipay"],
          "user_snapshot": {},
          "current_date": {
            "canChoose": false,
            "isToday": false
          }
        }
      }
      datas = datas.data;
      if (datas.product_snapshot.order_confirm) {
        let orderConfirmList = datas.product_snapshot.order_confirm.split('\n');
        this.setData({ orderConfirmList });
      }
      const cancelRule = datas.product_snapshot.cancel_rule || datas.cancel_rule;
      if (cancelRule) {
        this.setData({ cancelRuleList: cancelRule.split('\n') });
      }
      if (datas.product_snapshot.refund_process) {
        let refundProcessList = datas.product_snapshot.refund_process.split('\n');
        this.setData({ refundProcessList });
      }

      // if (data.data.status === 200) {
      //   this.setData({

      //   })
      // }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})