// Existing project evidence and stable IDs retained; narrative copy revised.
const COMPETENCY_META = {
  "gameplay": {
    "label": "GAMEPLAY",
    "kr": "게임플레이",
    "color": "#ff403b",
    "bgColor": "#201312",
    "desc": "상호작용과 게임 진행 로직 구현", "class": "gameplay"
  },
  "graphics": {
    "label": "GRAPHICS",
    "kr": "그래픽스",
    "color": "#ff403b",
    "bgColor": "#201312",
    "desc": "렌더링 파이프라인과 3D 수학 적용", "class": "graphics"
  },
  "performance": {
    "label": "PERFORMANCE",
    "kr": "최적화",
    "color": "#ff403b",
    "bgColor": "#201312",
    "desc": "병목 분석과 렌더링 비용 개선", "class": "performance"
  },
  "tools": {
    "label": "AI & TOOLS",
    "kr": "AI·도구",
    "color": "#ff403b",
    "bgColor": "#201312",
    "desc": "분석 결과와 사용자 인터페이스 연결", "class": "tools"
  }
};

const PROJECTS_DATA = [
  {
    "id": "mute-brush",
    "isFeatured": true,
    "type": "main",
    "category": "unity",
    "title": "The Mute Brush",
    "titleKr": "침묵의 붓",
    "genre": "VR 시뮬레이션 / 내러티브 체험",
    "engine": "Unity + URP + VR (Meta Quest)",
    "period": "2024.06.01 ~ 2025.05.24",
    "periodShort": "2024.06 – 2025.05",
    "duration": "약 1년",
    "team": "3인 팀 (클라이언트 1[본인], 기획 1, 3D 모델링 1)",
    "role": "VR 클라이언트 개발 담당",
    "tags": [
      "Unity",
      "C#",
      "URP",
      "VR",
      "HLSL",
      "Meta Quest",
      "VR Optimization"
    ],
    "createdDate": "2024.06.01 ~ 2025.05.24",
    "summary": "붓으로 기억을 그리는 VR 내러티브 시뮬레이션 구현",
    "achievement": "URP 렌더 패스 최적화 · VR HMD 90fps 목표 달성",
    "media": {
      "thumbnail": "assets/images/projects/mute-brush/mb_hero_thumb.jpg",
      "screenshots": [
        "assets/images/projects/mute-brush/mb_texture_before.jpg",
        "assets/images/projects/mute-brush/mb_texture_after.jpg",
        "assets/images/projects/mute-brush/mb_portal_view.jpg",
        "assets/images/projects/mute-brush/mb_glitch_effect.jpg"
      ],
      "videoUrl": "https://www.youtube-nocookie.com/embed/njvaomx2ybs"
    },
    "links": {
      "github": "https://github.com/gktjddyd/The-Mute-Brush_",
      "youtube": "https://www.youtube.com/watch?v=njvaomx2ybs",
      "notion": ""
    },
    "overview": {
      "story": "붓으로 과거의 기억을 복원하고, 기억의 왜곡과 상실을 드로잉 인터랙션으로 표현한 VR 체험 구현"
    },
    "implementations": [
      {
        "id": "drawing",
        "title": "VR 3D 드로잉, 팔레트, 지우개 구현",
        "valueTag": "gameplay",
        "content": [
          "VR 핸드 컨트롤러의 잡기·트리거 입력을 통한 3D 드로잉 구현",
          "평면을 넘어 3D 공간에 선을 남기는 입체 드로잉 구현",
          "Unity Line Renderer Component 기반 선 렌더링 구현",
          "드로잉 좌표의 2중 리스트 저장 및 선 단위 수정·삭제 지원",
          "기본 Unlit 라인의 질감 부족에 대한 사용자 피드백 확인",
          {
            "type": "compare",
            "before": {
              "src": "assets/images/projects/mute-brush/mb_texture_before.jpg",
              "label": "BEFORE - 단조로운 Unlit 라인"
            },
            "after": {
              "src": "assets/images/projects/mute-brush/mb_texture_after.jpg",
              "label": "AFTER - Normal Map + Lit Shader 붓터치"
            }
          },
          "붓 자국 텍스처와 Normal Map을 결합한 Material 제작 및 Line Renderer 적용",
          "양면 렌더링을 통한 관찰 방향별 선 가시성 확보",
          "Lit Shader 기반 조명 반응 구현 및 Tiling·Offset 조정을 통한 UV 정렬",
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_drawing_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/3D_Pen_drawing"
          },
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_palette_view.jpg",
            "label": "3D 공간 팔레트 시스템"
          },
          "붓과 팔레트의 직접 접촉을 통한 색상 선택 및 붓 끝 색상 표시",
          "Sphere Collider 기반 색상 충돌 감지 및 왼손·오른손 옵션 지원",
          "토글 지우개의 조작 부담 개선을 위한 덧칠 기반 기억 삭제 인터랙션 설계",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_eraser_deleted.jpg",
            "label": "지우개 덧칠 페인팅 삭제 연출"
          },
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_dementia_worse.jpg",
            "label": "치매 심화 - 기억 왜곡/지워지는 연출"
          },
          "Bounding Box와 Segment Sphere Intersection 검사에 따른 선 좌표 삭제"
        ]
      },
      {
        "id": "portal",
        "title": "VR 장면 전환을 위한 포털 구현",
        "valueTag": "gameplay",
        "content": [
          "문 너머의 목적지를 미리 보여주는 VR 포털 시스템 구현",
          "VR Multi-pass 환경의 Render Texture 사용 시 시선 불일치 문제 확인",
          "Stencil Buffer 기반 포털 영역 픽셀 마스킹 적용",
          "Quad Material의 Stencil ID와 레이어를 활용한 포털 공간 표시",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_portal_view.jpg",
            "label": "Stencil Buffer 포탈 렌더링 결과"
          },
          "포털 뷰 전용 맵 구성 및 비가시 오브젝트 제거를 통한 렌더링 부담 감소",
          "포털 충돌 감지에 따른 플레이어 위치 갱신 및 공간 전환 구현",
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_portal_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/Portal_Stencil_Buffer"
          }
        ]
      },
      {
        "id": "dialogue",
        "title": "VR 다이얼로그 GUI, Interaction",
        "valueTag": "gameplay",
        "content": [
          "Inspector의 String 배열을 활용한 대사 데이터 출력",
          "시선 기반 상호작용을 통한 VR 몰입감 개선",
          "Raycast 기반 오브젝트 응시 판정 및 조건부 다이얼로그 표시",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_dialogue_gaze.jpg",
            "label": "Gaze 시선 감지 다이얼로그 UI"
          },
          "진행 상황 안내를 위한 다이얼로그 시스템 구현",
          "Box Collider 진입과 대상 응시 조건을 결합한 안내 이벤트 제어",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_dialogue_world.jpg",
            "label": "3D 공간 월드 텍스트 연출"
          },
          "플레이어 시야를 따라 이동하는 텍스트 UI 구현",
          "Vector3.Lerp 기반 위치 보간 및 LookAt 기반 시선 방향 정렬",
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_dialogue_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/VR_TextDialogue_System"
          },
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_follow_camera_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/VR_TextDialogue_System"
          }
        ]
      },
      {
        "id": "gesture",
        "title": "제스처 인식",
        "valueTag": "gameplay",
        "content": [
          "VR 핸드 컨트롤러 기반 제스처 인식 구현",
          "P Dollar Point-Cloud Recognizer 기반 입력 궤적 분류",
          "인식 동작과 일치율 반환을 통한 판정 결과 처리",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_gesture_hint.jpg",
            "label": "제스처 궤적 힌트 화살표 연출"
          },
          "제스처 판정과 다음 이벤트·기억 보호 퀘스트의 연결",
          "제스처 학습 데이터의 XML 저장 및 Resources 기반 빌드 포함",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_gesture_debug.png",
            "label": "제스처 일치율 0.9057 콘솔 로그",
            "fit": "natural"
          },
          "영벡터 검사와 sqrMagnitude 활용을 통한 방향 연산 안정성 개선",
          "Quaternion 기반 회전 제어 및 사용자 방향으로의 오브젝트 정렬",
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_gesture_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/Gesture_Recognize"
          }
        ]
      },
      {
        "id": "glitch",
        "title": "Optimize Glitch Frame Drop",
        "valueTag": "performance",
        "content": [
          "Post-Processing 기반 글리치 효과를 활용한 화면 왜곡 연출",
          "VR HMD에서 글리치 후처리로 인한 프레임 지연 및 멀미 문제 확인",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_glitch_effect.jpg",
            "label": "글리치 시각 왜곡 연출 씬"
          },
          "다운샘플링 및 프레임 스킵을 통한 프레임별 처리 부담 감소",
          "Kino Glitch의 URP Render Pass 코드 분석 및 최적화",
          "핵심 시각 연출 유지와 VR HMD 90fps 성능 목표 달성",
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_glitch_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/Optimize_Glitch_Effect"
          }
        ]
      },
      {
        "id": "footstep",
        "title": "Foot Step Sound",
        "valueTag": "gameplay",
        "content": [
          "조이스틱 입력과 실제 이동 거리의 동시 확인을 통한 제자리 발소리 방지",
          "걸음 간격 타이머 기반 발소리 재생 주기 제어",
          "하향 Raycast를 통한 바닥 태그 감지",
          "바닥 재질별 오디오 클립 분리 및 무작위 재생 구현",
          {
            "type": "code",
            "src": "assets/images/projects/mute-brush/mb_footstep_code.png",
            "github": "https://github.com/gktjddyd/The-Mute-Brush_/tree/main/FootStep"
          }
        ]
      },
      {
        "id": "lightmaps",
        "title": "Baked lightmaps, Post-Processing",
        "valueTag": "performance",
        "content": [
          "VR 렌더링 부하 감소를 위한 라이트맵 베이킹 적용",
          "1024×1024 BC6H 압축 라이트맵 및 Baked GI 적용",
          "실시간 조명 연산 감소와 간접광 표현 개선",
          {
            "type": "image",
            "src": "assets/images/projects/mute-brush/mb_baked_lightmaps.png",
            "label": "라이트맵 베이킹 인스펙터"
          },
          "장면 분위기 표현을 위한 Post-Processing 적용",
          "블러·글리치·색상 필터 기반 시각 효과 구현"
        ]
      }
    ],
    "troubleshooting": [
      {
        "issue": "VR Multi-pass 렌더링 환경에서 Render Texture 사용 시 시선 불일치로 극심한 멀미 유발",
        "analysis": "VR의 좌안/우안 각각 다른 뷰포트를 렌더링하는 Multi-pass 구조에서, Render Texture가 단일 뷰포트 기준으로 갱신되어 눈과 화면이 어긋나는 현상 확인",
        "solution": "Stencil Buffer 마스킹 기술로 전환. 문 안쪽 Quad에 Stencil ID 부여 후 해당 픽셀에만 포탈 맵을 렌더링. 비가시 오브젝트 컬링으로 부하 최소화",
        "result": "Stencil Buffer 기반 포털 마스킹 및 공간 전환 구현",
        "valueTag": "performance"
      },
      {
        "issue": "Kino Glitch Post-Processing 적용 시 VR HMD에서 극심한 프레임 드랍 및 멀미 재발",
        "analysis": "오픈소스 Kino Glitch의 URP Render Pass가 VR 환경의 고해상도 더블 렌더링에 맞게 최적화되지 않아 GPU 과부하 발생 확인",
        "solution": "URP Render Pass 코드를 직접 수정. downsampleFactor를 활용한 렌더 타깃 다운샘플링 및 프레임 스킵 기법 추가 구현",
        "result": "핵심 글리치 연출 유지 및 VR HMD 90fps 성능 목표 달성",
        "valueTag": "performance"
      }
    ],
    "competencies": [
      "gameplay",
      "performance"
    ]
  },
  {
    "id": "carrot-mansion",
    "isFeatured": false,
    "type": "sub",
    "category": "unity",
    "title": "Carrot Mansion",
    "titleKr": "캐럿 맨션",
    "genre": "1인칭 공포 인터랙션 시뮬레이션",
    "engine": "Unity, C#",
    "period": "2024.08",
    "periodShort": "2024.08",
    "duration": "1개월",
    "team": "1인 개발",
    "role": "기획 및 게임 클라이언트 개발",
    "tags": [
      "Unity",
      "C#",
      "Horror",
      "Endless Hallway"
    ],
    "createdDate": "2024.08",
    "summary": "반복되는 복도와 상태 기반 이벤트를 활용한 1인칭 공포 게임 구현",
    "achievement": "무한 복도 루프 및 상태 기반 이벤트 설계",
    "media": {
      "thumbnail": "assets/images/projects/carrot-mansion/cm_thumb.jpg",
      "screenshots": [
        "assets/images/projects/carrot-mansion/cm_monsters.jpg",
        "assets/images/projects/carrot-mansion/cm_endless_hallway.jpg",
        "assets/images/projects/carrot-mansion/cm_loop_code.png"
      ],
      "videoUrl": "https://www.youtube-nocookie.com/embed/C_BWhqFXEhw"
    },
    "links": {
      "github": "",
      "youtube": "https://youtu.be/C_BWhqFXEhw",
      "notion": ""
    },
    "overview": {
      "story": "저택의 사물 상호작용, 반복 공간 탐색, 순차적 이상 현상을 결합한 공포 연출 구현"
    },
    "implementations": [
      {
        "id": "endless",
        "title": "텔레포트 기반 끝없는 복도 무한 루프",
        "valueTag": "gameplay",
        "content": [
          "반복되는 복도 공간을 활용한 무한 루프 게임플레이 구현",
          {
            "type": "image",
            "src": "assets/images/projects/carrot-mansion/cm_endless_hallway.jpg",
            "label": "끝없는 복도 전경"
          },
          "복도 끝의 어두운 구간에 진행 감지용 Raycast 배치",
          "진행 조건 충족 시 복도 시작 지점으로 플레이어 위치 이동",
          "Character Controller의 일시 비활성화를 통한 위치 변경 처리",
          "위치 이동과 조명 사운드의 동기화를 통한 공간 반복 연출",
          "루프별 currentIndex 갱신 및 상태 기반 공포 이벤트 설계",
          {
            "type": "image",
            "src": "assets/images/projects/carrot-mansion/cm_monsters.jpg",
            "label": "저택 이상 현상 씬"
          },
          "단일 Raycast 감지 누락 분석 및 다중 Raycast·Box Collider 보강 방안 검토",
          {
            "type": "code",
            "src": "assets/images/projects/carrot-mansion/cm_loop_code.png",
            "label": "텔레포트 & 루프 카운트 코드"
          }
        ]
      }
    ],
    "troubleshooting": [
      {
        "issue": "currentIndex 루프 상태와 연동한 순차적 공포 이벤트 발동 시 단일 Raycast 프레임 누락 현상",
        "analysis": "빠른 이동 속도에서 단일 Raycast가 트리거 영역을 건너뛰는 프레임 단위 누락 발생",
        "solution": "감지 영역 보강을 위한 다중 Raycast 및 Box Collider 트리거 적용 방안 검토",
        "result": "감지 누락 원인 분석 및 루프 이벤트 안정성 개선 방향 도출",
        "valueTag": "gameplay"
      }
    ],
    "competencies": [
      "gameplay",
      "performance"
    ]
  },
  {
    "id": "eorum",
    "isFeatured": false,
    "type": "sub",
    "category": "other",
    "title": "이오름 · Eorum",
    "titleKr": "이오름",
    "genre": "AI 기반 청각장애인 보조 앱",
    "engine": "Android Studio, FastAPI, OpenCV, Docker",
    "period": "2024 (캡스톤디자인 프로젝트)",
    "periodShort": "2024",
    "duration": "약 4개월",
    "team": "3인 팀 (프론트엔드 전담, DTW 알고리즘, AI 프롬프트 설계)",
    "role": "Android 클라이언트 및 분석 결과 연동",
    "tags": [
      "Android",
      "FastAPI",
      "OpenCV",
      "DTW",
      "AI",
      "Docker"
    ],
    "createdDate": "2024 (캡스톤디자인)",
    "summary": "청각장애인을 위한 구화 학습과 AI 교정 피드백 기능 구현",
    "achievement": "Android·FastAPI 연동 및 학습 피드백 UI 구현",
    "media": {
      "thumbnail": "assets/images/projects/eorum/eorum_mouth.jpg",
      "screenshots": [
        "assets/images/projects/eorum/eorum_mouth.jpg",
        "assets/images/projects/eorum/eorum_score.jpg",
        "assets/images/projects/eorum/eorum_feedback.jpg"
      ],
      "videoUrl": ""
    },
    "links": {
      "github": "https://github.com/naboyeong/Eorum",
      "youtube": "",
      "notion": ""
    },
    "overview": {
      "story": "입모양·발음 학습부터 분석 결과 확인까지 연결하는 모바일 학습 흐름 구현"
    },
    "implementations": [
      {
        "id": "dtw",
        "title": "DTW(Dynamic Time Warping) 알고리즘 구화 분석",
        "valueTag": "tools",
        "content": [
          "녹음 기반 발음 피드백 UI 개발",
          "촬영 영상의 입모양 분석 결과와 유사도 점수 표시 기능 개발",
          {
            "type": "image",
            "src": "assets/images/projects/eorum/eorum_mouth.jpg",
            "label": "구화 학습 및 입모양 카메라 인식 UI"
          },
          "입모양 랜드마크 시계열을 활용한 DTW 유사도 분석 기능 구현",
          "발화 속도 차이를 고려한 시계열 매칭 로직 구현",
          {
            "type": "image",
            "src": "assets/images/projects/eorum/eorum_score.jpg",
            "label": "DTW 시계열 분석 점수 측정 UI"
          },
          "발음 교정 결과 제공을 위한 AI 피드백 프롬프트 설계",
          {
            "type": "image",
            "src": "assets/images/projects/eorum/eorum_feedback.jpg",
            "label": "AI 피드백 및 발음/혀 위치 가이드"
          },
          "Android와 FastAPI 간 멀티미디어 비동기 전송 및 발음 피드백 UI 연동",
          "클라이언트·서버 간 영상 및 음성 데이터 통신 파이프라인 연결"
        ]
      }
    ],
    "troubleshooting": [],
    "competencies": [
      "tools"
    ]
  },
  {
    "id": "seek-card",
    "isFeatured": false,
    "type": "sub",
    "category": "opengl",
    "title": "Seek the Card",
    "titleKr": "카드 탐색",
    "genre": "3D 탐색 퍼즐 / 방 탈출",
    "engine": "C++, OpenGL, GLSL",
    "period": "2024.05",
    "periodShort": "2024.05",
    "duration": "약 3주",
    "team": "1인 개발",
    "role": "렌더링 파이프라인 및 카메라 개발",
    "tags": [
      "C++",
      "OpenGL",
      "GLSL",
      "1인칭 카메라",
      "FBO",
      "Kernel Filter"
    ],
    "createdDate": "2024.05",
    "summary": "C++과 OpenGL 기반 3D 카드 탐색 퍼즐 구현",
    "achievement": "FBO 후처리 및 FPS 카메라 직접 구현",
    "media": {
      "thumbnail": "assets/images/projects/seek-card/sc_thumb.jpg",
      "screenshots": [
        "assets/images/projects/seek-card/sc_village.jpg",
        "assets/images/projects/seek-card/sc_camera_code.png",
        "assets/images/projects/seek-card/sc_postprocess_before.jpg",
        "assets/images/projects/seek-card/sc_postprocess_after.jpg"
      ],
      "videoUrl": "https://www.youtube-nocookie.com/embed/c1g3beWfdfM"
    },
    "links": {
      "github": "https://github.com/gktjddyd/Seek-the-card/tree/main/CodeCollection",
      "youtube": "https://youtu.be/c1g3beWfdfM",
      "notion": ""
    },
    "overview": {
      "story": "단서 카드 탐색과 공간 이동을 지원하는 3D 그래픽스 파이프라인 구현"
    },
    "implementations": [
      {
        "id": "camera",
        "title": "1인칭 카메라 시스템 구현",
        "valueTag": "graphics",
        "content": [
          "Euler Angle 기반 FPS 카메라 회전 로직 구현",
          {
            "type": "image",
            "src": "assets/images/projects/seek-card/sc_village.jpg",
            "label": "3D 스테이지 마을 전경"
          },
          "마우스 입력에 따른 Yaw·Pitch 계산 및 CameraFront 벡터 갱신",
          "삼각함수 기반 방향 벡터 계산 및 Pitch 범위 제한을 통한 화면 반전 방지",
          "WASD 입력과 방향 벡터 외적을 활용한 3D 이동 구현",
          {
            "type": "code",
            "src": "assets/images/projects/seek-card/sc_camera_code.png",
            "label": "오일러 각 FPS 카메라 코드"
          }
        ]
      },
      {
        "id": "fbo",
        "title": "포스트 프로세싱 구현",
        "valueTag": "graphics",
        "content": [
          "OpenGL FBO 생성 및 3D 장면의 텍스처 렌더링 구현",
          "오프스크린 렌더링 결과의 Screen Quad 매핑",
          {
            "type": "compare",
            "before": {
              "src": "assets/images/projects/seek-card/sc_postprocess_before.jpg",
              "label": "BEFORE (원본)"
            },
            "after": {
              "src": "assets/images/projects/seek-card/sc_postprocess_after.jpg",
              "label": "AFTER (3x3 엣지 필터)"
            }
          },
          "GLSL 3×3 커널 기반 Sharpening·Blur·Edge Detection 구현",
          "후처리 필터 적용과 원본 화면 비교 기능 구현"
        ]
      }
    ],
    "troubleshooting": [],
    "competencies": [
      "graphics"
    ]
  },
  {
    "id": "homer-simpson",
    "isFeatured": false,
    "type": "sub",
    "category": "opengl",
    "title": "3D Virtual Human",
    "titleKr": "호머 심슨 3D 캐릭터",
    "genre": "3D 그래픽스 수학 모델링",
    "engine": "C++, OpenGL, GLUT",
    "period": "2025.04 ~ 2025.05",
    "periodShort": "2025.04 – 2025.05",
    "duration": "약 2주",
    "team": "4인 팀 (하반신 파트, 텍스처, 카메라 전담)",
    "role": "하반신·신발 모델링 및 카메라 구현",
    "tags": [
      "C++",
      "OpenGL",
      "GLUT",
      "UV 매핑"
    ],
    "createdDate": "2024.04",
    "summary": "기본 도형과 행렬 변환을 활용한 3D 캐릭터 협업 제작",
    "achievement": "하반신 계층적 모델링 및 UV 텍스처 매핑 구현",
    "media": {
      "thumbnail": "assets/images/projects/homer-simpson/homer_simpson_render.jpg",
      "screenshots": [
        "assets/images/projects/homer-simpson/homer_simpson_render.jpg",
        "assets/images/projects/homer-simpson/homer_pants_render.jpg"
      ],
      "videoUrl": ""
    },
    "links": {
      "github": "https://github.com/Graphics-Project-Homor-Simpson/Graphics-Project/blob/main/new.cpp",
      "youtube": "",
      "notion": ""
    },
    "overview": {
      "story": "Homer Simpson 캐릭터 협업 프로젝트에서 하반신·신발 모델링과 Orbit Camera 담당"
    },
    "implementations": [
      {
        "id": "spherical",
        "title": "구면 좌표계(Spherical Coordinates) 궤도 카메라",
        "valueTag": "graphics",
        "content": [
          "구면 좌표계 기반 Orbit Camera와 거리 조절 구현",
          "마우스 회전 및 줌 입력을 활용한 캐릭터 관찰 기능 구현",
          {
            "type": "image",
            "src": "assets/images/projects/homer-simpson/homer_simpson_render.jpg",
            "label": "호머 심슨 3D 모델링 전체 모습"
          }
        ]
      },
      {
        "id": "primitive",
        "title": "기하학 프리미티브 계층 변환 & UV 텍스처 매핑",
        "valueTag": "graphics",
        "content": [
          "외부 3D 모델 파일 없이 OpenGL 기본 도형을 조합한 하반신 모델링",
          "HalfSphere와 Cylinder 조합을 통한 허리·다리 형태 구성",
          "Quad·Cube·HalfCircle·Capsule 조합과 변환 행렬을 활용한 신발 모델링",
          "원통·평면 UV 좌표 계산 및 청바지 텍스처 매핑",
          {
            "type": "image",
            "src": "assets/images/projects/homer-simpson/homer_pants_render.jpg",
            "label": "하반신 기하학 프리미티브 조립 & 청바지 UV 텍스처 매핑"
          },
          "바지 메시의 UV 좌표 조정과 텍스처 정렬",
          "부위별 이동·회전·크기 변환을 연결한 계층적 모델링 구현"
        ]
      }
    ],
    "troubleshooting": [],
    "competencies": [
      "graphics"
    ]
  },
  {
    "id": "dicom",
    "isFeatured": false,
    "type": "sub",
    "category": "other",
    "title": "DICOM Segmentation",
    "titleKr": "CT DICOM 영상 분할",
    "genre": "의료 영상 처리 / 컴퓨터 비전",
    "engine": "C++, OpenCV",
    "period": "2025.05 ~ 2025.06",
    "periodShort": "2025.05 – 2025.06",
    "duration": "약 2주",
    "team": "1인 개발",
    "role": "영상 처리 파이프라인 설계 및 구현",
    "tags": [
      "C++",
      "OpenCV",
      "DICOM",
      "Otsu",
      "Watershed",
      "Medical Image"
    ],
    "createdDate": "2024 (그래픽스 과제)",
    "summary": "CT 영상의 폐 영역 분할과 Mask 시각화 구현",
    "achievement": "전처리·분할·시각화 파이프라인 구현",
    "media": {
      "thumbnail": "assets/images/projects/dicom/dicom_artifact_reduction.png",
      "screenshots": [
        "assets/images/projects/dicom/dicom_pipeline.png",
        "assets/images/projects/dicom/dicom_mask_overlay.jpg",
        "assets/images/projects/dicom/dicom_artifact_reduction.png"
      ],
      "videoUrl": ""
    },
    "links": {
      "github": "https://github.com/gktjddyd/Dicom-Image-Segementation/blob/main/segmetation.cpp",
      "youtube": "",
      "notion": ""
    },
    "overview": {
      "story": "C++과 OpenCV 기반 DICOM 전처리 및 관심 영역 추출 구현"
    },
    "implementations": [
      {
        "id": "pipeline",
        "title": "의료 영상 전처리 및 분할 파이프라인",
        "valueTag": "tools",
        "content": [
          "OpenCV 기반 CT DICOM 로드 및 픽셀 데이터 전처리",
          {
            "type": "image",
            "src": "assets/images/projects/dicom/dicom_pipeline.png",
            "label": "영상 전처리 및 분할 알고리즘 플로우차트"
          },
          {
            "type": "image",
            "src": "assets/images/projects/dicom/dicom_mask_overlay.jpg",
            "label": "Watershed & Artifact Reduction 연산 과정"
          },
          "Watershed 기반 관심 영역 분할 및 불필요 영역 정제",
          "분할 영역의 붉은색 Overlay와 Mask 시각화 구현",
          {
            "type": "image",
            "src": "assets/images/projects/dicom/dicom_artifact_reduction.png",
            "label": "폐 CT 붉은색 관심 영역 마스킹 결과"
          },
          "전처리부터 분할·시각화까지 연결한 C++ 영상 처리 파이프라인 구현"
        ]
      }
    ],
    "troubleshooting": [],
    "competencies": [
      "tools"
    ]
  }
];

PROJECTS_DATA.sort((a,b)=>["mute-brush","eorum","carrot-mansion","seek-card","homer-simpson","dicom"].indexOf(a.id)-["mute-brush","eorum","carrot-mansion","seek-card","homer-simpson","dicom"].indexOf(b.id));
