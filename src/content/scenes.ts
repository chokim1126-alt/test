export type SceneType = 'waiting' | 'text' | 'image' | 'video' | 'map' | 'alert_text'

export interface Scene {
  id: number
  type: SceneType
  background: string
  content: any
  audio_url?: string  // 오퍼 노트북 스피커 전용 음원
}

export const scenes: Scene[] = [
  {
    id: 0,
    type: 'waiting',
    background: '#0a0a0a',
    content: { blink_text: "37°33′N  126°58′E", blink_color: '#3a3a3a' },
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
  {
    id: 1,
    type: 'alert_text',
    background: '#0d0d0d',
    content: { message: '지도가 도착했습니다.', font_size: 'large', color: '#e8d5b0' },
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: 2,
    type: 'text',
    background: '#0a0a0a',
    content: { title: null, body: '지금부터\n안내를 따라\n이동하십시오.', color: '#e8d5b0', font_size: 'large', align: 'center' },
  },
  {
    id: 3,
    type: 'map',
    background: '#110f08',
    content: { image_url: '/images/map_step1.svg', caption: '북쪽으로 이동하십시오', highlight_point: 1 },
  },
  {
    id: 4,
    type: 'text',
    background: '#0d0d0d',
    content: { title: null, body: '멈추십시오.', color: '#e8d5b0', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 5,
    type: 'text',
    background: '#0d0d0d',
    content: { title: '지점 1 / 4', body: '여기입니다.', color: '#c9a84c', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 6,
    type: 'waiting',
    background: '#0a0a0a',
    content: { blink_text: '· · ·', blink_color: '#4a4a4a' },
  },
  {
    id: 7,
    type: 'map',
    background: '#110f08',
    content: { image_url: '/images/map_step2.svg', caption: '동쪽 길을 따라가십시오', highlight_point: 2 },
  },
  {
    id: 8,
    type: 'text',
    background: '#0d0d0d',
    content: { title: null, body: '멈추십시오.', color: '#e8d5b0', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 9,
    type: 'text',
    background: '#0d0d0d',
    content: { title: '지점 2 / 4', body: '여기입니다.', color: '#c9a84c', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 10,
    type: 'waiting',
    background: '#0a0a0a',
    content: { blink_text: '· · ·', blink_color: '#4a4a4a' },
  },
  {
    id: 11,
    type: 'alert_text',
    background: '#0d0d0d',
    content: { message: '경로가\n변경되었습니다.', font_size: 'large', color: '#c8b97a' },
  },
  {
    id: 12,
    type: 'map',
    background: '#110f08',
    content: { image_url: '/images/map_step1.svg', caption: '남쪽으로 우회하십시오', highlight_point: 1 },
  },
  {
    id: 13,
    type: 'text',
    background: '#0d0d0d',
    content: { title: '지점 3 / 4', body: '여기입니다.', color: '#c9a84c', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 14,
    type: 'waiting',
    background: '#0a0a0a',
    content: { blink_text: '· · ·', blink_color: '#4a4a4a' },
  },
  {
    id: 15,
    type: 'alert_text',
    background: '#0d0d0d',
    content: { message: '목적지가\n가까워지고 있습니다.', font_size: 'large', color: '#c8b97a' },
  },
  {
    id: 16,
    type: 'map',
    background: '#110f08',
    content: { image_url: '/images/map_complete.svg', caption: '최종 목적지', highlight_point: 'all' },
  },
  {
    id: 17,
    type: 'text',
    background: '#0d0d0d',
    content: { title: null, body: '멈추십시오.', color: '#e8d5b0', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 18,
    type: 'text',
    background: '#0a0a0a',
    content: { title: '지점 4 / 4', body: '도착했습니다.', color: '#c9a84c', font_size: 'xlarge', align: 'center' },
  },
  {
    id: 19,
    type: 'waiting',
    background: '#000000',
    content: { blink_text: '·', blink_color: '#555555' },
  },
]
