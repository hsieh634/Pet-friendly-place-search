
import { City } from './types';

export const PLACE_TYPES: string[] = [
  '不拘',
  '餐廳',
  '咖啡廳',
  '飯店',
  '公園',
  '景點',
  '寵物美容',
  '寵物用品店',
];

export const TAIWAN_CITIES: City[] = [
  {
    name: '臺北市',
    districts: [
      { name: '中正區' }, { name: '大同區' }, { name: '中山區' },
      { name: '松山區' }, { name: '大安區' }, { name: '萬華區' },
      { name: '信義區' }, { name: '士林區' }, { name: '北投區' },
      { name: '內湖區' }, { name: '南港區' }, { name: '文山區' },
    ],
  },
  {
    name: '新北市',
    districts: [
      { name: '板橋區' }, { name: '三重區' }, { name: '中和區' },
      { name: '永和區' }, { name: '新莊區' }, { name: '新店區' },
      { name: '樹林區' }, { name: '鶯歌區' }, { name: '三峽區' },
      { name: '淡水區' }, { name: '汐止區' }, { name: '瑞芳區' },
      { name: '土城區' }, { name: '蘆洲區' }, { name: '五股區' },
      { name: '泰山區' }, { name: '林口區' },
    ],
  },
  {
    name: '桃園市',
    districts: [
        { name: '桃園區' }, { name: '中壢區' }, { name: '平鎮區' },
        { name: '八德區' }, { name: '楊梅區' }, { name: '蘆竹區' },
        { name: '大溪區' }, { name: '龍潭區' }, { name: '龜山區' },
        { name: '大園區' }, { name: '觀音區' }, { name: '新屋區' },
    ]
  },
  {
    name: '臺中市',
    districts: [
      { name: '中區' }, { name: '東區' }, { name: '南區' },
      { name: '西區' }, { name: '北區' }, { name: '北屯區' },
      { name: '西屯區' }, { name: '南屯區' }, { name: '太平區' },
      { name: '大里區' }, { name: '霧峰區' }, { name: '烏日區' },
      { name: '豐原區' }, { name: '后里區' }, { name: '石岡區' },
      { name: '東勢區' }, { name: '和平區' }, { name: '新社區' },
      { name: '潭子區' }, { name: '大雅區' }, { name: '神岡區' },
      { name: '大肚區' }, { name: '沙鹿區' }, { name: '龍井區' },
      { name: '梧棲區' }, { name: '清水區' }, { name: '大甲區' },
      { name: '外埔區' }, { name: '大安區' },
    ],
  },
    {
    name: '臺南市',
    districts: [
        { name: '中西區' }, { name: '東區' }, { name: '南區' },
        { name: '北區' }, { name: '安平區' }, { name: '安南區' },
        { name: '永康區' }, { name: '歸仁區' }, { name: '新化區' },
    ]
  },
  {
    name: '高雄市',
    districts: [
        { name: '新興區' }, { name: '前金區' }, { name: '苓雅區' },
        { name: '鹽埕區' }, { name: '鼓山區' }, { name: '旗津區' },
        { name: '前鎮區' }, { name: '三民區' }, { name: '楠梓區' },
        { name: '小港區' }, { name: '左營區' },
    ]
  }
];
