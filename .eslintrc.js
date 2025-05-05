module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        // 같은 종류 함수 반환 일관성은 룰로 강제하기 어려워서 리뷰/테스트로,
        // 숨은 로직 회피를 도와줄 수 있는 보조 룰들:
        'no-console': 'warn', // 의도치 않은 로깅 잡기
        'unicorn/filename-case': [
          'error',
          {cases: {camelCase: true, pascalCase: true}},
        ],
        'sonarjs/no-duplicate-string': 'warn', // 동일한 문자열의 중복 사용을 경고
        'max-lines-per-function': [
          'warn',
          {max: 120, skipComments: true, skipBlankLines: true}, // 함수당 최대 라인 수 제한 (주석 및 빈 줄 제외)
        ],
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              // 특정 계층에서 직접적인 import를 제한
              // 예: services 계층이 UI에서 직접 axios를 가져오지 못하게 차단하고 httpService만 사용하도록 강제
              {
                group: ['axios'],
                message: 'axios는 httpService로 감싸서 사용하세요.', // axios 사용 제한 메시지
              },
            ],
          },
        ],
        // 동일 슬라이스 내부 파일을 외부에서 직접 import 금지
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              // features 외부에서 features 내부 깊은 경로 접근 금지
              {
                group: ['@/features/*/*/*'],
                message: 'features는 index.ts(공개 API)로 import하세요.', // features import 제한 메시지
              },
              // entities 외부에서 entities 내부 깊은 경로 접근 금지
              {
                group: ['@/entities/*/*/*'],
                message: 'entities는 index.ts(공개 API)로 import하세요.', // entities import 제한 메시지
              },
              // widgets 외부에서 widgets 내부 깊은 경로 접근 금지
              {
                group: ['@/widgets/*/*/*'],
                message: 'widgets는 index.ts(공개 API)로 import하세요.', // widgets import 제한 메시지
              },
              // pages 외부에서 pages 내부 깊은 경로 접근 금지
              {
                group: ['@/pages/*/*/*'],
                message: 'pages는 index.ts(공개 API)로 import하세요.', // pages import 제한 메시지
              },
            ],
          },
        ],
        // import 순서 설정
        'import/order': [
          'warn',
          {
            groups: [
              'builtin', // 내장 모듈
              'external', // 외부 라이브러리
              'internal', // 내부 모듈
              'parent', // 부모 경로
              'sibling', // 형제 경로
              'index', // index 파일
            ],
            'newlines-between': 'always', // 그룹 간 줄바꿈 강제
            alphabetize: {order: 'asc', caseInsensitive: true}, // 알파벳 순서로 정렬 (대소문자 구분 없음)
          },
        ],
      },
    },
  ],
};
