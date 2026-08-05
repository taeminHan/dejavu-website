/* oxlint-disable react/only-export-components -- locale provider, hook, and switcher form one small public API */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'ko' | 'en'

const translations: Record<string, string> = {
  'dejavu 홈': 'dejavu home',
  '메뉴 열기': 'Open menu',
  '주요 메뉴': 'Main navigation',
  '설명서 메뉴': 'Guide navigation',
  '기능': 'Features',
  '사용 설명서': 'Guide',
  '개인정보': 'Privacy',
  '보안': 'Security',
  '다운로드': 'Download',
  'Windows 11용 AI 사용량 위젯': 'AI usage widget for Windows 11',
  '사용량 확인은': 'Usage at a glance.',
  '한눈에,': 'Stay focused,',
  '가볍게.': 'effortlessly.',
  'Claude와 Codex 사용량을 바탕화면에서 한눈에 확인하세요. 작업을 방해하지 않는 작은 위젯이 필요할 때 늘 같은 자리를 지킵니다.': 'See Claude and Codex usage at a glance from your desktop. A small, unobtrusive widget that stays right where you need it.',
  'Windows용 다운로드': 'Download for Windows',
  '소스 코드 보기': 'View source',
  '무료': 'Free',
  'dejavu 위젯 미리보기': 'dejavu widget preview',
  '주간 초기화 금 15:00': 'Weekly reset Fri 15:00',
  '초기화권 2개': '2 reset credits',
  '5시간 초기화 11:42': '5-hour reset 11:42',
  '주간 20%': 'Weekly 20%',
  '최신 상태': 'Up to date',
  '아래 제품 소개 보기': 'Explore the product below',
  '더 알아보기': 'Explore',
  '제품 특징 요약': 'Product highlights',
  '항상 표시': 'Always visible',
  '약 1분 자동 갱신': 'Refreshes about every minute',
  '앱 내 업데이트': 'In-app updates',
  '완전 제거': 'Clean uninstall',
  '소스 공개': 'Open source',
  '확인은 빠르게.': 'Check at a glance.',
  '집중은 그대로.': 'Stay in the flow.',
  '확인은 한눈에.': 'Everything at a glance.',
  '집중은 흐트러짐 없이.': 'Nothing breaks your focus.',
  'Claude와 Codex를 한눈에': 'Claude and Codex at a glance',
  '5시간·주간 사용률과 다음 초기화 시각을 하나의 작은 위젯에서 확인하세요.': 'See 5-hour and weekly usage, plus the next reset time, in one compact widget.',
  '방해하지 않는 상시 표시': 'Always visible, never in the way',
  '투명도, 위치와 진행률 표시 방식을 작업 환경에 맞게 조절할 수 있습니다.': 'Adjust opacity, position, and progress styles to fit your workspace.',
  '내 PC에서 직접 연결': 'Connect directly on your PC',
  '별도 dejavu 계정이나 중계 서버 없이 로컬 Claude Code와 Codex 로그인을 사용합니다.': 'Uses your local Claude Code and Codex sessions—no dejavu account or relay server.',
  '진짜 작은 크기부터': 'Compact really means compact',
  '작음·중간·큼 세 단계와 한 줄·두 줄 배치로 필요한 정보만 알맞게 놓을 수 있습니다.': 'Choose Small, Medium, or Large and arrange services in one or two rows.',
  '흐름을 끊지 않는 업데이트': 'Updates without breaking your flow',
  '설정 화면에서 새 버전을 바로 확인하고, 앱 안에서 다운로드·적용한 뒤 자동으로 다시 시작합니다.': 'Check, download, and apply updates in the app, then restart automatically.',
  '지울 때는 깔끔하게': 'A genuinely clean uninstall',
  '제거하면 앱과 시작프로그램뿐 아니라 dejavu의 설정·위치·캐시·진단 파일까지 함께 정리합니다.': 'Uninstalling removes the app, startup entry, settings, position, cache, and diagnostics.',
  '당신의 데이터는': 'Your data stays',
  '당신의 PC에.': 'on your PC.',
  'dejavu는 자체 계정이나 중계 서버를 운영하지 않습니다. 사용량은 이 PC의 Claude Desktop·Claude Code와 Codex Desktop·CLI에서 조회하며 토큰과 대화 내용은 dejavu 설정에 저장하지 않습니다. 앱을 제거하면 dejavu가 만든 로컬 데이터도 함께 정리됩니다.': 'dejavu has no account system or relay server. It reads usage from Claude Desktop, Claude Code, Codex Desktop, or the Codex CLI on this PC. Tokens and conversations are never stored in dejavu settings, and uninstalling removes the local data dejavu created.',
  '개인정보 처리 방식 자세히 보기': 'Read the privacy details',
  '사용량 대신,': 'Focus on the work,',
  '작업에 집중하세요.': 'not the meter.',
  '사용량은 dejavu에 맡기고,': 'Let dejavu watch the meter.',
  '당신은 작업에 집중하세요.': 'You stay focused on the work.',
  'Windows 11에서 바로 시작할 수 있습니다.': 'Get started on Windows 11.',
  '휴대용 ZIP 받기': 'Download portable ZIP',
  '이름이 Dejavu인 이유는': 'Why the name Dejavu?',
  '그냥 리센느 Deja Vu 듣다가': 'The idea simply came to me',
  '떠오른 아이디어여서 그렇습니다.': 'while listening to RESCENE’s Deja Vu.',
  '리센느 화이팅': 'Go RESCENE!',
  '리센느 Deja Vu 영상': 'RESCENE — Deja Vu',
  'Claude와 Codex 사용량을 위한 작은 Windows 위젯.': 'A small Windows widget for Claude and Codex usage.',
  '제품 소개': 'Overview',
  '문제 신고': 'Report an issue',
  '설명서에서 해결되지 않았다면 GitHub Issues로 알려주세요.': 'Still need help? Let us know on GitHub Issues.',
  '설치부터 위젯 배치, 서비스 연결, 업데이트와 완전 제거까지 필요한 내용을 한곳에 정리했습니다.': 'Everything you need—from installation and service setup to widget placement, updates, and a clean uninstall.',
  '처음 설치하기': 'Install for the first time',
  '설정 살펴보기': 'Explore settings',
  '문제 해결': 'Troubleshooting',
  '목차': 'On this page',
  '설치하기': 'Installation',
  '처음 시작': 'First launch',
  '위젯 사용': 'Using the widget',
  '설정 안내': 'Settings',
  '업데이트': 'Updates',
  '설치 프로그램 받기': 'Download the installer',
  'dejavu-Setup.exe를 내려받습니다.': 'Download dejavu-Setup.exe.',
  '설치 실행': 'Run the installer',
  '설치 파일을 실행하면 현재 Windows 사용자 계정에 설치됩니다. 관리자 권한은 필요하지 않습니다.': 'Run the installer to install dejavu for your current Windows account. Administrator access is not required.',
  'SmartScreen 확인': 'Review SmartScreen',
  '아직 공인 코드 서명이 없는 시험판에서는 Windows의 게시자 경고가 표시될 수 있습니다.': 'Preview builds without public code signing may show a Windows publisher warning.',
  '시스템 요구 사항': 'System requirements',
  'Windows 11 64비트와 Claude Desktop·Claude Code 또는 Codex Desktop·CLI 중 사용할 서비스가 필요합니다.': 'Windows 11 64-bit and at least one supported service: Claude Desktop, Claude Code, Codex Desktop, or the Codex CLI.',
  'dejavu는 별도 계정을 만들지 않습니다. 이 PC에 설치된 Claude와 Codex 앱의 로그인 상태를 자동으로 감지합니다.': 'dejavu does not require its own account. It automatically detects supported Claude and Codex sessions on this PC.',
  'Claude Desktop만 있어도 최근 5시간·주간 사용률을 감지합니다. Fable과 정확한 초기화 시각까지 보려면 안내 버튼으로 Claude Code에 로그인할 수 있습니다.': 'Claude Desktop alone can provide recent 5-hour and weekly usage. To see Fable and precise reset times, use the guided Claude Code sign-in.',
  'Codex Desktop의 내장 런타임 또는 별도 CLI의 공식 로컬 app-server에서 사용률, 초기화 시각과 초기화권 상태를 읽습니다.': 'Usage, reset times, and reset-credit status come from the official local app server in Codex Desktop or the standalone CLI.',
  '토큰, 프롬프트와 대화 내용은 dejavu 설정 파일에 저장하지 않습니다.': 'dejavu never stores tokens, prompts, or conversations in its settings.',
  '위치 이동': 'Move the widget',
  '사용자 지정 배치에서는 위젯을 드래그해 원하는 곳으로 옮길 수 있습니다.': 'With custom placement enabled, drag the widget wherever you want it.',
  '한 줄 / 두 줄': 'One row or two',
  '한 줄로 나란히 표시하거나 Codex 위·Claude 아래의 두 줄로 배치할 수 있습니다.': 'Place services side by side, or stack Codex above Claude.',
  '크기': 'Size',
  '작음, 중간, 큼 중에서 선택합니다. 작음은 가장 적은 화면 공간을 사용합니다.': 'Choose Small, Medium, or Large. Small uses the least screen space.',
  '표시 값': 'Displayed values',
  '진행률 막대와 퍼센트, 위젯 헤더 표시 여부를 선택할 수 있습니다.': 'Choose whether to show progress indicators, percentages, and other widget details.',
  '서비스': 'Services',
  '기본값인 자동 감지 또는 Claude + Codex, Claude만, Codex만 중에서 표시 대상을 고릅니다.': 'Choose Auto detect, Claude + Codex, Claude only, or Codex only.',
  '모양': 'Appearance',
  '투명도, 배경색, 강조색, 글자색과 사용량 임계 색상을 작업 환경에 맞게 조정합니다.': 'Adjust opacity, background, accent, text, and usage-threshold colors.',
  '동작': 'Behavior',
  '새로고침 간격, Windows 시작 시 실행, 시작할 때 업데이트 확인 여부를 설정합니다.': 'Set the refresh interval, launch at Windows startup, and startup update checks.',
  '설정 저장': 'Saving settings',
  '변경 내용은 자동 저장되며 위젯에 즉시 반영됩니다.': 'Changes are saved automatically and applied to the widget immediately.',
  '설치 버전은 실행할 때 GitHub Releases에서 새 버전을 한 번 확인합니다. 설정의 업데이트 확인을 누르면 별도 창 없이 현재 화면에서 확인 결과를 보여줍니다.': 'Installed builds check GitHub Releases once at startup. Select Check for updates in Settings to see the result in place—without opening another window.',
  '새 버전이 있을 때 업데이트 보기를 선택하면 다운로드 진행률을 확인하고 적용할 수 있습니다. 적용 후 dejavu가 자동으로 다시 시작됩니다.': 'When an update is available, select View update to download and apply it with visible progress. dejavu restarts automatically afterward.',
  'Windows 설정 열기': 'Open Windows Settings',
  '설정 → 앱 → 설치된 앱으로 이동합니다.': 'Go to Settings → Apps → Installed apps.',
  'dejavu 제거': 'Uninstall dejavu',
  'dejavu 오른쪽 메뉴에서 제거를 선택합니다.': 'Open the menu beside dejavu and select Uninstall.',
  '로컬 데이터 정리': 'Remove local data',
  '앱, 바로가기, 시작프로그램 등록과 함께 dejavu의 설정, 위젯 위치, 캐시 및 진단 파일이 삭제됩니다.': 'The app, shortcuts, startup entry, settings, widget position, cache, and diagnostics are removed.',
  '연결 앱 데이터는 유지됩니다': 'Connected app data stays intact',
  'Claude와 Codex 앱의 로그인 정보, 설정 및 대화 데이터는 삭제하지 않습니다.': 'Claude and Codex sign-ins, settings, and conversation data are not deleted.',
  '위젯이 보이지 않아요.': 'I cannot see the widget.',
  '알림 영역의 dejavu 아이콘을 열어 위젯 표시 상태를 확인하세요. 그래도 보이지 않으면 설정에서 배치를 작업표시줄 오른쪽 또는 화면 오른쪽 위로 바꿔 위치를 복구할 수 있습니다.': 'Open the dejavu tray icon and check whether the widget is visible. If it is still missing, restore its position by choosing the taskbar-right or top-right placement in Settings.',
  'Claude 또는 Codex 하나만 표시돼요.': 'Only Claude or Codex is shown.',
  '자동 감지는 로그인과 로컬 실행 환경이 준비된 서비스만 표시합니다. 두 서비스를 항상 표시하려면 설정의 표시할 서비스에서 Claude + Codex를 선택하세요.': 'Auto detect only shows services with a ready local session. To always show both, choose Claude + Codex under Services to display.',
  '사용량이 갱신되지 않아요.': 'Usage is not refreshing.',
  'Claude Desktop·Claude Code 또는 Codex Desktop·CLI의 로그인 상태를 확인한 뒤 트레이 메뉴에서 지금 새로고침을 실행하세요. 서비스 측 제한이나 네트워크 오류가 있으면 마지막 정상 값을 유지합니다.': 'Check your Claude Desktop, Claude Code, Codex Desktop, or CLI session, then select Refresh now from the tray menu. If a service or network error occurs, dejavu keeps the last valid reading.',
  '도움이 더 필요해요.': 'I still need help.',
  '민감한 토큰이나 개인정보를 제외한 뒤 GitHub Issues에 Windows 버전, dejavu 버전과 증상을 남겨주세요.': 'Remove any sensitive tokens or personal information, then share your Windows version, dejavu version, and symptoms on GitHub Issues.',
}

type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (text: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem('dejavu-locale')
    if (saved === 'ko' || saved === 'en') return saved
  } catch {
    // Browser storage can be unavailable in restricted browsing contexts.
  }
  return navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(detectLocale)

  const setLocale = (nextLocale: Locale) => {
    try {
      localStorage.setItem('dejavu-locale', nextLocale)
    } catch {
      // The current page can still switch languages without persistence.
    }
    updateLocale(nextLocale)
  }

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = locale === 'ko'
      ? 'dejavu — Claude와 Codex 사용량 위젯'
      : 'dejavu — Claude and Codex usage widget'
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = locale === 'ko'
      ? 'Claude와 Codex 사용량을 바탕화면에서 확인하는 Windows 11 위젯, dejavu.'
      : 'dejavu is a Windows 11 widget for checking Claude and Codex usage from your desktop.'
  }, [locale])

  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale,
    t: (text) => locale === 'ko' ? text : translations[text] ?? text,
  }), [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <div className="language-switcher" role="group" aria-label={locale === 'ko' ? '언어 선택' : 'Choose language'}>
      <button type="button" className={locale === 'ko' ? 'is-active' : ''} aria-pressed={locale === 'ko'} onClick={() => setLocale('ko')}>KO</button>
      <button type="button" className={locale === 'en' ? 'is-active' : ''} aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
    </div>
  )
}
