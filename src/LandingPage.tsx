import { useEffect, useState } from 'react'
import { LanguageSwitcher, useI18n } from './i18n'
import { FirstRunNotice, PlatformIcon } from './ProductUI'

const repo = 'https://github.com/taeminHan/dejavu'
const brand = `${import.meta.env.BASE_URL}brand-mark.svg`
type Release = { tag_name: string; html_url: string; draft: boolean; published_at: string; assets: { name: string; browser_download_url: string }[] }

export default function LandingPage() {
  const { locale } = useI18n()
  const text = (ko: string, en: string) => locale === 'ko' ? ko : en
  const [platform, setPlatform] = useState<'windows' | 'mac'>('windows')
  const [release, setRelease] = useState<Release | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    setPlatform(/Mac|iPhone|iPad/.test(navigator.userAgent) ? 'mac' : 'windows')
    const controller = new AbortController()
    fetch(`${'https://api.github.com/repos/taeminHan/dejavu'}/releases?per_page=10`, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then(response => { if (!response.ok) throw new Error('Release unavailable'); return response.json() })
      .then((data: unknown) => {
        if (!Array.isArray(data)) return
        const releases = data.filter((r): r is Release => !!r && typeof r.tag_name === 'string' && typeof r.html_url === 'string' && !r.draft && Array.isArray(r.assets))
        setRelease(releases.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))[0] ?? null)
      }).catch(() => { /* Download links remain usable without the release API. */ })
    return () => controller.abort()
  }, [])
  const asset = (name: string) => release?.assets.find(a => a.name === name)?.browser_download_url
  const windowsUrl = asset('dejavu-Setup.exe') ?? `${repo}/releases/latest/download/dejavu-Setup.exe`
  const macUrl = asset('Dejavu-macOS-arm64.dmg')
  const releaseUrl = release?.html_url ?? `${repo}/releases/latest`
  const portable = release?.assets.find(a => a.name.toLowerCase().endsWith('portable.zip'))?.browser_download_url
  const benefits = [
    [text('두 서비스 사용량을 함께', 'Both services in one place'), text('Claude와 Codex를 한곳에서 확인합니다.', 'Check Claude and Codex usage together.')],
    [text('필요한 항목만 표시', 'Choose what you see'), text('서비스와 사용량 지표를 직접 고릅니다.', 'Select the services and metrics to display.')],
    [text('사용량은 자동으로 갱신', 'Usage updates automatically'), text('약 1분마다 최신 사용량을 불러옵니다.', 'Usage refreshes about once a minute.')],
  ]
  return <div className="landing" id="top">
    <a className="skip-link" href="#main">{text('본문으로 이동', 'Skip to content')}</a>
    <header className="site-header"><a className="brand" href="#top" aria-label={text('dejavu 홈', 'dejavu home')}><img src={brand} alt="" />dejavu</a>
      <button className="menu-button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{text('메뉴', 'Menu')}</button>
      <nav id="main-nav" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label={text('주요 메뉴', 'Main navigation')}>
        <a href="#start" onClick={() => setMenuOpen(false)}>{text('사용 방법', 'Get started')}</a><a href="/dejavu/guide/">{text('사용 설명서', 'Guide')}</a><a href={repo} target="_blank" rel="noreferrer">GitHub ↗</a><LanguageSwitcher /><a className="nav-download" href="#download" onClick={() => setMenuOpen(false)}>{text('다운로드', 'Download')}</a>
      </nav>
    </header>
    <main id="main">
      <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">{text('Claude · Codex 사용량 모니터', 'Usage monitor for Claude & Codex')}</p>
          <h1>{text('지금 얼마나 썼는지,', 'See your usage.')}<br />{text('앱을 열지 않고 확인하세요.', 'Without opening an app.')}</h1>
          <p className="hero-description">{text('Claude와 Codex 사용량을 바탕화면 위젯이나 Mac 메뉴 막대에 표시합니다.', 'Keep Claude and Codex usage on your desktop or in the Mac menu bar.')}</p>
          <div className="hero-actions"><a className="primary-button" href="#download"><span aria-hidden="true">↓</span>{text('무료 다운로드', 'Download for free')}</a><a className="text-link" href="#start">{text('어떻게 사용하나요?', 'How does it work?')} <span aria-hidden="true">↓</span></a></div>
          <p className="release-note">Windows 10+ · macOS 14+ · {text('무료 · 오픈 소스', 'Free · Open source')}</p>
        </div>
        <div className="product-preview">
          <div className="preview-toolbar"><div className="platform-switch" role="group" aria-label={text('운영체제별 화면 예시', 'Platform preview')}><button aria-pressed={platform === 'windows'} onClick={() => setPlatform('windows')}><PlatformIcon platform="windows" />Windows</button><button aria-pressed={platform === 'mac'} onClick={() => setPlatform('mac')}><PlatformIcon platform="mac" />macOS</button></div><span>{text('화면 구성 예시', 'Illustrative preview')}</span></div>
          <div className={`desktop-preview ${platform}`}><div className="desktop-bar"><span>{platform === 'mac' ? 'Finder' : text('바탕화면', 'Desktop')}</span>{platform === 'mac' && <span className="menu-metrics">Claude 16% &nbsp; Codex 39%</span>}<span>09:41</span></div><div className="desktop-work"><div className="desktop-file"><span aria-hidden="true">▱</span>{text('내 프로젝트', 'Projects')}</div><div className="usage-widget"><div className="widget-header"><strong><img src={brand} alt="" />dejavu</strong><span aria-hidden="true">···</span></div>
            <div className="service"><div className="service-heading"><strong>Claude</strong><span>{text('5시간 사용량', '5-hour usage')}</span><b>16<small>%</small></b></div><div className="meter"><i style={{ width: '16%' }} /></div><p>{text('주간 사용량 20%', 'Weekly usage 20%')}<span>{text('초기화 11:42', 'Resets at 11:42')}</span></p></div>
            <div className="service"><div className="service-heading"><strong>Codex</strong><span>{text('사용량', 'Usage')}</span><b>39<small>%</small></b></div><div className="meter codex"><i style={{ width: '39%' }} /></div><p>{text('주간 기준', 'Weekly window')}<span>{text('방금 갱신됨', 'Just updated')}</span></p></div>
          </div></div><div className="desktop-caption"><span>{platform === 'mac' ? text('메뉴 막대 + 플로팅 오버레이', 'Menu bar + floating overlay') : text('바탕화면 위젯', 'Desktop widget')}</span><span>{text('사용량은 예시입니다', 'Example values')}</span></div></div>
          <p className="preview-caption" aria-live="polite">{platform === 'mac' ? text('Mac에서는 메뉴 막대와 플로팅 오버레이를 사용할 수 있습니다.', 'On Mac, use the menu bar and an optional floating overlay.') : text('Windows에서는 위젯의 크기와 위치를 조절할 수 있습니다.', 'On Windows, adjust the widget size and position.')}</p>
        </div>
      </section>
      <section className="benefits" aria-label={text('주요 기능', 'Features')}>{benefits.map(([title, body], i) => <article key={i}><span className="feature-symbol" aria-hidden="true">{['◷', '☷', '↻'][i]}</span><h2>{title}</h2><p>{body}</p></article>)}</section>
      <section className="start-section" id="start"><div><p className="eyebrow">{text('시작하기', 'Get started')}</p><h2>{text('설치 후, 사용 중인 서비스를 연결하세요.', 'Install dejavu and connect your services.')}</h2><p>{text('dejavu 계정은 따로 만들지 않아도 됩니다.', 'No separate dejavu account is needed.')}</p><a className="text-link" href="/dejavu/guide/">{text('사용 설명서 보기', 'Read the guide')} →</a></div><ol className="start-steps">{[
        [text('Claude 또는 Codex에 로그인', 'Sign in to Claude or Codex'), text('Claude Code나 Codex Desktop·CLI가 설치되어 있어야 합니다.', 'Install and sign in to Claude Code or Codex Desktop / CLI.')],
        [text('dejavu 설치하고 실행', 'Install and open dejavu'), text('내 컴퓨터의 로그인 상태를 이용해 사용량을 조회합니다.', 'dejavu reads usage through your local signed-in services.')],
        [text('표시할 항목 선택', 'Choose what to display'), text('설정에서 서비스, 지표, 위젯 모양을 조절하세요.', 'Choose services, metrics, and widget appearance in settings.')],
      ].map(([title, body], i) => <li key={i}><span>{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
      <section className="download-section" id="download"><p className="eyebrow">{text('다운로드', 'Download')}</p><h2>{text('내 컴퓨터에 맞는 버전을 받으세요.', 'Get dejavu for your computer.')}</h2><p className="download-version">{release?.tag_name ?? text('최신 버전은 GitHub에서 확인할 수 있습니다.', 'See GitHub for the latest version.')} · <a href={releaseUrl} target="_blank" rel="noreferrer">{text('변경 내역', 'Release notes')} ↗</a></p>
        <div className="download-grid"><article className="download-card"><PlatformIcon platform="windows" /><h3>Windows</h3><p className="requirements">Windows 10+ · x64</p><a className="primary-button" href={windowsUrl}>{text('설치 파일 받기', 'Download installer')} <span aria-hidden="true">↓</span></a><div className="package-meta"><span>EXE</span><a href={portable ?? releaseUrl}>{text('포터블 ZIP', 'Portable ZIP')} ↗</a></div><p className="compatibility-note">{text('Windows 10에서는 일부 기능이 제한됩니다.', 'Some features are limited on Windows 10.')}</p><FirstRunNotice platform="windows" /></article>
        <article className="download-card"><PlatformIcon platform="mac" /><h3>macOS</h3><p className="requirements">macOS 14+ · Apple silicon</p><a className="primary-button" href={macUrl ?? releaseUrl}>{macUrl ? text('DMG 받기', 'Download DMG') : text('macOS 출시 페이지', 'macOS releases')} <span aria-hidden="true">{macUrl ? '↓' : '↗'}</span></a><div className="package-meta"><span>{text('Apple silicon Mac용', 'For Apple silicon Macs')}</span><span>DMG</span></div><p className="compatibility-note">{text('Intel Mac은 지원하지 않습니다.', 'Intel Macs are not supported.')}</p><FirstRunNotice platform="mac" /></article></div>
      </section>
      <section className="privacy-section" id="privacy"><span className="privacy-symbol" aria-hidden="true">◎</span><div><h2>{text('별도 계정과 중계 서버 없이 사용합니다.', 'No separate account or relay server.')}</h2><p>{text('내 컴퓨터의 Claude·Codex 로그인 상태를 사용하며, 토큰과 대화 내용은 dejavu 설정에 저장하지 않습니다.', 'Uses your local Claude and Codex sessions. Tokens and conversations are not stored in dejavu settings.')}</p></div><a href={`${repo}/blob/main/PRIVACY.md`} target="_blank" rel="noreferrer">{text('자세히', 'Details')} ↗</a></section>
    </main>
    <footer><div><a href="#top" className="brand"><img src={brand} alt="" />dejavu</a><p>© 2026 taeminHan and contributors · MIT License</p></div><div className="footer-right"><div className="footer-links"><a href="/dejavu/guide/">{text('사용 설명서', 'Guide')}</a><a href={`${repo}/issues`}>{text('문제 신고', 'Report an issue')}</a><a href={`${repo}/blob/main/SECURITY.md`}>{text('보안', 'Security')}</a><a href={`${repo}/blob/main/CODE_SIGNING_POLICY.md`}>{text('코드 서명 정책', 'Code signing policy')}</a></div><details><summary>{text('이름이 dejavu인 이유', 'Why dejavu?')}</summary><p>{text('리센느의 Deja Vu를 듣다가 떠오른 아이디어에서 시작했습니다. 리센느 화이팅!', 'An idea that came to me while listening to RESCENE’s Deja Vu. Go RESCENE!')} <a href="https://www.youtube.com/watch?v=ZbO9PBdFRdc" target="_blank" rel="noreferrer">{text('영상 보기', 'Watch')} ↗</a></p></details><small>{text('Windows 코드 서명 지원: SignPath.io · SignPath Foundation', 'Windows code signing support: SignPath.io · SignPath Foundation')}</small></div></footer>
  </div>
}
