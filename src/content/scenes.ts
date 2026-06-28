export type SceneType = 'waiting' | 'text' | 'image' | 'video' | 'map' | 'alert_text'

export interface Scene {
  id: number
  type: SceneType
  background: string
  content: any
}

export const scenes: Scene[] = [
  {
    // 씬 0: 집결 대기 — 좌표 깜박임
    id: 0,
    type: 'waiting',
    background: '#0a0a0a',
    content: {
      blink_text: "37°33′N  126°58′E",
      blink_color: '#3a3a3a',
    },
  },
  {
    // 씬 1: 지도 수신 알림
    id: 1,
    type: 'alert_text',
    background: '#0d0d0d',
    content: {
      message: '지도가 도착했습니다.',
      font_size: 'large',
      color: '#e8d5b0',
    },
  },
  {
    // 씬 2: 첫 번째 지점 — 지도 + 방향 안내
    id: 2,
    type: 'map',
    background: '#110f08',
    content: {
      image_url: '/images/map_step1.png',
      caption: '북쪽으로 이동하십시오',
      highlight_point: 1,
    },
  },
  {
    // 씬 3: 첫 번째 지점 도착
    id: 3,
    type: 'text',
    background: '#0d0d0d',
    content: {
      title: '지점 1 / 3',
      body: '여기입니다.',
      color: '#e8d5b0',
      font_size: 'xlarge',
      align: 'center',
    },
  },
  {
    // 씬 4: 두 번째 지점 — 지도 + 방향 안내
    id: 4,
    type: 'map',
    background: '#110f08',
    content: {
      image_url: '/images/map_step2.png',
      caption: '동쪽 길을 따라가십시오',
      highlight_point: 2,
    },
  },
  {
    // 씬 5: 두 번째 지점 도착
    id: 5,
    type: 'text',
    background: '#0d0d0d',
    content: {
      title: '지점 2 / 3',
      body: '여기입니다.',
      color: '#e8d5b0',
      font_size: 'xlarge',
      align: 'center',
    },
  },
  {
    // 씬 6: 마지막 지점 접근 — 진동 알림
    id: 6,
    type: 'alert_text',
    background: '#0d0d0d',
    content: {
      message: '목적지가\n가까워지고 있습니다.',
      font_size: 'large',
      color: '#c8b97a',
    },
  },
  {
    // 씬 7: 세 번째 지점 — 완성된 지도
    id: 7,
    type: 'map',
    background: '#110f08',
    content: {
      image_url: '/images/map_complete.png',
      caption: '최종 목적지',
      highlight_point: 'all',
    },
  },
  {
    // 씬 8: 도착
    id: 8,
    type: 'text',
    background: '#0a0a0a',
    content: {
      title: null,
      body: '도착했습니다.',
      color: '#e8d5b0',
      font_size: 'xlarge',
      align: 'center',
    },
  },
  {
    // 씬 9: 종료 대기
    id: 9,
    type: 'waiting',
    background: '#000000',
    content: {
      blink_text: '·',
      blink_color: '#555555',
    },
  },
]
