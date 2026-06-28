export type SceneType = 'waiting' | 'text' | 'image' | 'video' | 'map' | 'alert_text'

export interface Scene {
  id: number
  type: SceneType
  background: string
  content: any
}

export const scenes: Scene[] = [
  {
    id: 0,
    type: 'waiting',
    background: '#000000',
    content: {
      blink_text: "37°33'N  126°58'E",
      blink_color: '#444444',
    },
  },
  {
    id: 1,
    type: 'alert_text',
    background: '#0d0d0d',
    content: {
      message: '누군가의 기억이 담긴 지도가\n당신의 폰에 도착했습니다.',
      font_size: 'large',
      color: '#e8d5b0',
    },
  },
  {
    id: 2,
    type: 'map',
    background: '#1a1208',
    content: {
      image_url: '/images/map_step1.png',
      caption: '첫 번째 기억이 있는 곳으로',
      highlight_point: 1,
    },
  },
  {
    id: 3,
    type: 'text',
    background: '#0d0d1a',
    content: {
      title: '기억의 조각 #1',
      body: '그날의 공기는 유난히 차가웠다.\n손끝이 닿으면 무언가 기억날 것 같았는데,\n끝내 잡히지 않았다.',
      color: '#c8d4e8',
    },
  },
  {
    id: 4,
    type: 'map',
    background: '#1a1208',
    content: {
      image_url: '/images/map_step2.png',
      caption: '두 번째 기억이 있는 곳으로',
      highlight_point: 2,
    },
  },
  {
    id: 5,
    type: 'text',
    background: '#1a0d0d',
    content: {
      title: '기억의 조각 #2',
      body: '어떤 목소리는 사라지지 않는다.\n들리지 않아도, 여전히 울린다.\n당신도 알고 있을 것이다.',
      color: '#e8c8c8',
    },
  },
  {
    id: 6,
    type: 'alert_text',
    background: '#0d0d0d',
    content: {
      message: '마지막 기억이\n깨어납니다.',
      font_size: 'xlarge',
      color: '#ffffff',
    },
  },
  {
    id: 7,
    type: 'map',
    background: '#1a1208',
    content: {
      image_url: '/images/map_complete.png',
      caption: '모든 기억이 연결되었습니다.',
      highlight_point: 'all',
    },
  },
  {
    id: 8,
    type: 'text',
    background: '#000000',
    content: {
      title: null,
      body: '당신이 찾은 것은,\n\n기억입니다.',
      color: '#e8d5b0',
      font_size: 'xlarge',
      align: 'center',
    },
  },
  {
    id: 9,
    type: 'waiting',
    background: '#000000',
    content: {
      blink_text: '·',
      blink_color: '#888888',
    },
  },
]
