import { useEffect, useState, type CSSProperties } from 'react'
import { I18nProvider, LanguageSwitcher, useI18n } from './i18n'

const repositoryUrl = 'https://github.com/taeminHan/dejavu'
const fallbackReleaseTag = 'v0.9.0-rc.7'
const fallbackDownloadUrl = `${repositoryUrl}/releases/download/${fallbackReleaseTag}/dejavu-Setup.exe`
const homeUrl = '/dejavu/'
const guideUrl = '/dejavu/guide/'

type ReleaseAsset = { name: string; browser_download_url: string }
type Release = { tag_name: string; html_url: string; draft: boolean; published_at: string; assets: ReleaseAsset[] }
const brandMarkUrl = `${import.meta.env.BASE_URL}brand-mark.svg`

function BrandMark({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  return <img className={`brand-mark ${size}`} src={brandMarkUrl} alt="" aria-hidden="true" />
}

function FeatureIllustration({ number }: { number: string }) {
  const commonProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const artwork = {
    '01': <><rect x="34" y="29" width="172" height="102" rx="14" /><path d="M34 54h172" /><circle cx="49" cy="42" r="3" fill="currentColor" stroke="none" /><path d="M57 78h42M57 91h112M57 106h78" /><path className="accent-fill" d="M57 78h70" /></>,
    '02': <><rect x="34" y="31" width="172" height="98" rx="14" /><rect x="121" y="76" width="67" height="35" rx="8" className="raised" /><path d="M48 47h46M48 61h86" /><path d="M140 93h28" className="accent-stroke" /><circle cx="181" cy="47" r="5" className="accent-fill" /></>,
    '03': <><rect x="44" y="27" width="152" height="106" rx="14" /><path d="M101 133v13M139 133v13M88 146h64" /><path d="M120 52l27 10v20c0 19-12 31-27 38-15-7-27-19-27-38V62z" className="raised" /><path d="M108 83l8 8 17-19" className="accent-stroke" /></>,
    '04': <>
      <rect x="26" y="94" width="48" height="32" rx="8" className="raised" />
      <circle cx="39" cy="110" r="6" /><path d="M50 106h15M50 114h10" className="accent-stroke" />
      <rect x="88" y="72" width="62" height="54" rx="10" className="raised" />
      <path d="M88 88h62M99 101h40M99 114h28" /><path d="M99 101h24" className="accent-stroke" />
      <rect x="164" y="44" width="70" height="82" rx="12" className="raised" />
      <path d="M164 62h70M176 76h46M176 91h46M176 106h46" /><path d="M176 76h32M176 91h21M176 106h38" className="accent-stroke" />
      <path d="M22 136h216M50 132v8M119 132v8M199 132v8" />
      <text x="50" y="153" textAnchor="middle" className="size-label">S</text>
      <text x="119" y="153" textAnchor="middle" className="size-label">M</text>
      <text x="199" y="153" textAnchor="middle" className="size-label">L</text>
    </>,
    '05': <>
      <path d="M77 80h18m-6-6 6 6-6 6M145 80h18m-6-6 6 6-6 6" className="flow-connector" />
      <circle cx="52" cy="80" r="25" className="raised" />
      <path d="M40 80l8 8 16-18" className="accent-stroke" />
      <circle cx="120" cy="80" r="25" className="raised" />
      <path d="M120 64v22m-8-8 8 8 8-8M108 95h24" className="accent-stroke" />
      <circle cx="188" cy="80" r="25" className="raised" />
      <path d="M201 70a17 17 0 1 0 2 19M201 70V59m0 11h-11" className="accent-stroke" />
      <circle cx="52" cy="124" r="2.5" className="accent-fill" /><circle cx="120" cy="124" r="2.5" /><circle cx="188" cy="124" r="2.5" />
      <path d="M55 124h62M123 124h62" className="flow-timeline" />
    </>,
    '06': <><path d="M82 52h76l-5 81H87z" className="raised" /><path d="M72 52h96M101 52l3-16h32l3 16M106 73v38M134 73v38" /><circle cx="166" cy="116" r="23" className="status-circle" /><path d="M155 116l7 7 15-17" className="success-stroke" /></>,
  }[number]

  return <div className="feature-illustration" aria-hidden="true"><svg viewBox="0 0 240 160" {...commonProps}>{artwork}</svg></div>
}

const features = [
  { number: '01', title: 'Claude와 Codex를 한눈에', body: '5시간·주간 사용률과 다음 초기화 시각을 하나의 작은 위젯에서 확인하세요.' },
  { number: '02', title: '방해하지 않는 상시 표시', body: '투명도, 위치와 진행률 표시 방식을 작업 환경에 맞게 조절할 수 있습니다.' },
  { number: '03', title: '내 PC에서 직접 연결', body: '별도 dejavu 계정이나 중계 서버 없이 로컬 Claude Code와 Codex 로그인을 사용합니다.' },
  { number: '04', title: '진짜 작은 크기부터', body: '작음·중간·큼 세 단계와 한 줄·두 줄 배치로 필요한 정보만 알맞게 놓을 수 있습니다.' },
  { number: '05', title: '흐름을 끊지 않는 업데이트', body: '설정 화면에서 새 버전을 바로 확인하고, 앱 안에서 다운로드·적용한 뒤 자동으로 다시 시작합니다.' },
  { number: '06', title: '지울 때는 깔끔하게', body: '제거하면 앱과 시작프로그램뿐 아니라 dejavu의 설정·위치·캐시·진단 파일까지 함께 정리합니다.' },
]

const progressStyle = (value: number) => ({ '--progress': `${value}%` }) as CSSProperties

function LandingPage() {
  const { t, locale } = useI18n()
  const [release, setRelease] = useState<Release | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/repos/taeminHan/dejavu/releases?per_page=10', {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((releases: Release[]) => {
        const newestRelease = releases
          .filter((candidate) => !candidate.draft)
          .sort((left, right) => Date.parse(right.published_at) - Date.parse(left.published_at))[0]

        setRelease(newestRelease ?? null)
      })
      .catch(() => undefined)
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const portable = release?.assets.find((asset) => asset.name.toLowerCase().endsWith('portable.zip'))
  const installer = release?.assets.find((asset) => asset.name === 'dejavu-Setup.exe')
  const downloadHref = installer?.browser_download_url ?? fallbackDownloadUrl
  const releaseLabel = release?.tag_name ?? fallbackReleaseTag

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t('dejavu 홈')}>
          <BrandMark /><span>dejavu</span>
        </a>
        <button className="menu-button" type="button" aria-label={t('메뉴 열기')} aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label={t('주요 메뉴')}>
          <a href="#features" onClick={() => setMenuOpen(false)}>{t('기능')}</a>
          <a href={guideUrl}>{t('사용 설명서')}</a>
          <a href="#privacy" onClick={() => setMenuOpen(false)}>{t('개인정보')}</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          <LanguageSwitcher />
          <a className="nav-download" href={downloadHref}>{t('다운로드')}</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span /> {t('Windows 11용 AI 사용량 위젯')}</div>
            <h1>{t('사용량 확인은')}<br />{t('한눈에,')} <em>{t('가볍게.')}</em></h1>
            <p className="hero-description">{t('Claude와 Codex 사용량을 바탕화면에서 한눈에 확인하세요. 작업을 방해하지 않는 작은 위젯이 필요할 때 늘 같은 자리를 지킵니다.')}</p>
            <div className="hero-actions">
              <a className="primary-button" href={downloadHref}>
                <span className="windows-glyph" aria-hidden="true"><i /><i /><i /><i /></span>{t('Windows용 다운로드')}
              </a>
              <a className="secondary-button" href={repositoryUrl} target="_blank" rel="noreferrer">{t('소스 코드 보기')} <span aria-hidden="true">↗</span></a>
            </div>
            <p className="release-note">{releaseLabel} · Windows 11 x64 · {t('무료')}</p>
          </div>

          <div className="hero-visual" aria-label={t('dejavu 위젯 미리보기')}>
            <div className="ambient ambient-one" /><div className="ambient ambient-two" />
            <div className="widget-window">
              <div className="widget-topbar">
                <div className="widget-brand"><BrandMark size="small" /> dejavu</div>
                <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
              </div>
              <div className="service-row">
                <div className="service-heading"><strong>Codex</strong><span>{t('주간 초기화 금 15:00')}</span></div>
                <div className="meter-line"><div className="meter"><i style={progressStyle(39)} /></div><b>39%</b></div>
                <div className="service-meta"><span>{locale === 'ko' ? '5시간 —' : '5-hour —'}</span><span>{t('초기화권 2개')}</span></div>
              </div>
              <div className="service-divider" />
              <div className="service-row">
                <div className="service-heading"><strong>Claude</strong><span>{t('5시간 초기화 11:42')}</span></div>
                <div className="meter-line"><div className="meter"><i style={progressStyle(16)} /></div><b>16%</b></div>
                <div className="service-meta"><span>{t('주간 20%')}</span><span>Fable 27%</span></div>
              </div>
              <div className="live-pill"><i /> {t('최신 상태')}</div>
            </div>
            <div className="mini-widget">
              <span>Codex</span><div className="meter"><i style={progressStyle(39)} /></div><b>39%</b>
              <span>Claude</span><div className="meter"><i style={progressStyle(16)} /></div><b>16%</b>
            </div>
          </div>
          <a className="scroll-cue" href="#overview" aria-label={t('아래 제품 소개 보기')}>
            <span>{t('더 알아보기')}</span><i aria-hidden="true" />
          </a>
        </section>

        <section className="trust-strip" id="overview" aria-label={t('제품 특징 요약')} data-reveal="fade">
          <span>{t('항상 표시')}</span><i /><span>{t('약 1분 자동 갱신')}</span><i /><span>{t('앱 내 업데이트')}</span><i /><span>{t('완전 제거')}</span><i /><span>{t('소스 공개')}</span>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading" data-reveal="up"><p>WHY DEJAVU</p><h2>{t('확인은 한눈에.')}<br />{t('집중은 흐트러짐 없이.')}</h2></div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.number} data-reveal="up"
                style={{ '--delay': `${index * 120}ms` } as CSSProperties}>
                <span className="feature-number">{feature.number}</span>
                <FeatureIllustration number={feature.number} />
                <h3>{t(feature.title)}</h3><p>{t(feature.body)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="privacy-section" id="privacy">
          <div className="privacy-orbit" aria-hidden="true" data-reveal="scale"><BrandMark size="large" /></div>
          <div className="privacy-copy" data-reveal="right">
            <p className="section-kicker">LOCAL FIRST</p><h2><span className="nowrap">{t('당신의 데이터는')}</span><br />{t('당신의 PC에.')}</h2>
            <p>{t('dejavu는 자체 계정이나 중계 서버를 운영하지 않습니다. 사용량은 이 PC의 Claude Desktop·Claude Code와 Codex Desktop·CLI에서 조회하며 토큰과 대화 내용은 dejavu 설정에 저장하지 않습니다. 앱을 제거하면 dejavu가 만든 로컬 데이터도 함께 정리됩니다.')}</p>
            <a href={`${repositoryUrl}/blob/main/PRIVACY.md`} target="_blank" rel="noreferrer">{t('개인정보 처리 방식 자세히 보기')} <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="download-section" id="download">
          <div data-reveal="up"><p className="section-kicker">READY WHEN YOU ARE</p><h2>{t('사용량은 dejavu에 맡기고,')}<br />{t('당신은 작업에 집중하세요.')}</h2><p>{t('Windows 11에서 바로 시작할 수 있습니다.')}</p></div>
          <div className="download-card" data-reveal="scale" style={{ '--delay': '120ms' } as CSSProperties}>
            <a className="primary-button large-button" href={downloadHref}>
              <span className="windows-glyph" aria-hidden="true"><i /><i /><i /><i /></span>{t('Windows용 다운로드')}
            </a>
            <div className="download-meta"><span>{releaseLabel}</span><span>Windows 11 · x64</span></div>
            {portable && <a className="portable-link" href={portable.browser_download_url}>{t('휴대용 ZIP 받기')}</a>}
          </div>
        </section>

        <section className="name-story" aria-labelledby="name-story-title" data-reveal="up">
          <div className="name-story-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/ZbO9PBdFRdc?rel=0"
              title={t('리센느 Deja Vu 영상')}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="name-story-copy">
            <h2 id="name-story-title">{locale === 'ko' ? <>이름이 <em>Dejavu</em>인 이유는</> : <>Why the name <em>Dejavu?</em></>}</h2>
            <p>{t('그냥 리센느 Deja Vu 듣다가')}<br />{t('떠오른 아이디어여서 그렇습니다.')}</p>
            <span className="name-story-cheer">{t('리센느 화이팅')}</span>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><BrandMark /><span>dejavu</span></a>
        <p>{t('Claude와 Codex 사용량을 위한 작은 Windows 위젯.')}</p>
        <div className="footer-links"><a href={guideUrl}>{t('사용 설명서')}</a><a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a><a href={`${repositoryUrl}/blob/main/PRIVACY.md`} target="_blank" rel="noreferrer">{t('개인정보')}</a><a href={`${repositoryUrl}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">{t('보안')}</a><a href={`${repositoryUrl}/blob/main/CODE_SIGNING_POLICY.md`} target="_blank" rel="noreferrer">Code signing policy</a></div>
        <small>© 2026 taeminHan and contributors · MIT License<br />Free code signing provided by SignPath.io, certificate by SignPath Foundation</small>
      </footer>
    </div>
  )
}

function GuidePage() {
  const { t, locale } = useI18n()
  const sections = [
    ['install', '설치하기'],
    ['first-run', '처음 시작'],
    ['widget', '위젯 사용'],
    ['settings', '설정 안내'],
    ['updates', '업데이트'],
    ['uninstall', '완전 제거'],
    ['troubleshooting', '문제 해결'],
  ]

  return (
    <div className="site-shell guide-shell">
      <header className="site-header">
        <a className="brand" href={homeUrl} aria-label={t('dejavu 홈')}>
          <BrandMark /><span>dejavu</span>
        </a>
        <nav className="site-nav guide-top-nav" aria-label={t('설명서 메뉴')}>
          <a href={homeUrl}>{t('제품 소개')}</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          <LanguageSwitcher />
          <a className="nav-download" href={fallbackDownloadUrl}>{t('다운로드')}</a>
        </nav>
      </header>

      <main className="guide-main">
        <section className="guide-hero">
          <div className="eyebrow"><span /> DEJAVU GUIDE</div>
          <h1>{t('사용 설명서')}</h1>
          <p>{t('설치부터 위젯 배치, 서비스 연결, 업데이트와 완전 제거까지 필요한 내용을 한곳에 정리했습니다.')}</p>
          <div className="guide-quick-links">
            <a href="#install">{t('처음 설치하기')}</a><a href="#settings">{t('설정 살펴보기')}</a><a href="#troubleshooting">{t('문제 해결')}</a>
          </div>
        </section>

        <div className="guide-layout">
          <aside className="guide-sidebar" aria-label={t('목차')}>
            <p>{t('목차')}</p>
            {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{t(label)}</a>)}
          </aside>

          <article className="guide-content">
            <section className="guide-section" id="install">
              <p className="guide-number">01</p><h2>{t('설치하기')}</h2>
              <ol className="guide-steps">
                <li><strong>{t('설치 프로그램 받기')}</strong><span><a href={fallbackDownloadUrl}>dejavu-Setup.exe</a>{locale === 'ko' ? '를 내려받습니다.' : ' to begin.'}</span></li>
                <li><strong>{t('설치 실행')}</strong><span>{t('설치 파일을 실행하면 현재 Windows 사용자 계정에 설치됩니다. 관리자 권한은 필요하지 않습니다.')}</span></li>
                <li><strong>{t('SmartScreen 확인')}</strong><span>{t('아직 공인 코드 서명이 없는 시험판에서는 Windows의 게시자 경고가 표시될 수 있습니다.')}</span></li>
              </ol>
              <div className="guide-note"><strong>{t('시스템 요구 사항')}</strong><span>{t('Windows 11 64비트와 Claude Desktop·Claude Code 또는 Codex Desktop·CLI 중 사용할 서비스가 필요합니다.')}</span></div>
            </section>

            <section className="guide-section" id="first-run">
              <p className="guide-number">02</p><h2>{t('처음 시작')}</h2>
              <p>{t('dejavu는 별도 계정을 만들지 않습니다. 이 PC에 설치된 Claude와 Codex 앱의 로그인 상태를 자동으로 감지합니다.')}</p>
              <div className="guide-grid">
                <div><h3>Claude</h3><p>{t('Claude Desktop만 있어도 최근 5시간·주간 사용률을 감지합니다. Fable과 정확한 초기화 시각까지 보려면 안내 버튼으로 Claude Code에 로그인할 수 있습니다.')}</p></div>
                <div><h3>Codex</h3><p>{t('Codex Desktop의 내장 런타임 또는 별도 CLI의 공식 로컬 app-server에서 사용률, 초기화 시각과 초기화권 상태를 읽습니다.')}</p></div>
              </div>
              <p className="guide-muted">{t('토큰, 프롬프트와 대화 내용은 dejavu 설정 파일에 저장하지 않습니다.')}</p>
            </section>

            <section className="guide-section" id="widget">
              <p className="guide-number">03</p><h2>{t('위젯 사용')}</h2>
              <ul className="guide-list">
                <li><strong>{t('위치 이동')}</strong><span>{t('사용자 지정 배치에서는 위젯을 드래그해 원하는 곳으로 옮길 수 있습니다.')}</span></li>
                <li><strong>{t('한 줄 / 두 줄')}</strong><span>{t('한 줄로 나란히 표시하거나 Codex 위·Claude 아래의 두 줄로 배치할 수 있습니다.')}</span></li>
                <li><strong>{t('크기')}</strong><span>{t('작음, 중간, 큼 중에서 선택합니다. 작음은 가장 적은 화면 공간을 사용합니다.')}</span></li>
                <li><strong>{t('표시 값')}</strong><span>{t('진행률 막대와 퍼센트, 위젯 헤더 표시 여부를 선택할 수 있습니다.')}</span></li>
              </ul>
            </section>

            <section className="guide-section" id="settings">
              <p className="guide-number">04</p><h2>{t('설정 안내')}</h2>
              <div className="guide-grid three">
                <div><h3>{t('서비스')}</h3><p>{t('기본값인 자동 감지 또는 Claude + Codex, Claude만, Codex만 중에서 표시 대상을 고릅니다.')}</p></div>
                <div><h3>{t('모양')}</h3><p>{t('투명도, 배경색, 강조색, 글자색과 사용량 임계 색상을 작업 환경에 맞게 조정합니다.')}</p></div>
                <div><h3>{t('동작')}</h3><p>{t('새로고침 간격, Windows 시작 시 실행, 시작할 때 업데이트 확인 여부를 설정합니다.')}</p></div>
              </div>
              <div className="guide-note"><strong>{t('설정 저장')}</strong><span>{t('변경 내용은 자동 저장되며 위젯에 즉시 반영됩니다.')}</span></div>
            </section>

            <section className="guide-section" id="updates">
              <p className="guide-number">05</p><h2>{t('업데이트')}</h2>
              <p>{t('설치 버전은 실행할 때 GitHub Releases에서 새 버전을 한 번 확인합니다. 설정의 업데이트 확인을 누르면 별도 창 없이 현재 화면에서 확인 결과를 보여줍니다.')}</p>
              <p>{t('새 버전이 있을 때 업데이트 보기를 선택하면 다운로드 진행률을 확인하고 적용할 수 있습니다. 적용 후 dejavu가 자동으로 다시 시작됩니다.')}</p>
            </section>

            <section className="guide-section" id="uninstall">
              <p className="guide-number">06</p><h2>{t('완전 제거')}</h2>
              <ol className="guide-steps compact">
                <li><strong>{t('Windows 설정 열기')}</strong><span>{t('설정 → 앱 → 설치된 앱으로 이동합니다.')}</span></li>
                <li><strong>{t('dejavu 제거')}</strong><span>{t('dejavu 오른쪽 메뉴에서 제거를 선택합니다.')}</span></li>
                <li><strong>{t('로컬 데이터 정리')}</strong><span>{t('앱, 바로가기, 시작프로그램 등록과 함께 dejavu의 설정, 위젯 위치, 캐시 및 진단 파일이 삭제됩니다.')}</span></li>
              </ol>
              <div className="guide-note safe"><strong>{t('연결 앱 데이터는 유지됩니다')}</strong><span>{t('Claude와 Codex 앱의 로그인 정보, 설정 및 대화 데이터는 삭제하지 않습니다.')}</span></div>
            </section>

            <section className="guide-section" id="troubleshooting">
              <p className="guide-number">07</p><h2>{t('문제 해결')}</h2>
              <details><summary>{t('위젯이 보이지 않아요.')}</summary><p>{t('알림 영역의 dejavu 아이콘을 열어 위젯 표시 상태를 확인하세요. 그래도 보이지 않으면 설정에서 배치를 작업표시줄 오른쪽 또는 화면 오른쪽 위로 바꿔 위치를 복구할 수 있습니다.')}</p></details>
              <details><summary>{t('Claude 또는 Codex 하나만 표시돼요.')}</summary><p>{t('자동 감지는 로그인과 로컬 실행 환경이 준비된 서비스만 표시합니다. 두 서비스를 항상 표시하려면 설정의 표시할 서비스에서 Claude + Codex를 선택하세요.')}</p></details>
              <details><summary>{t('사용량이 갱신되지 않아요.')}</summary><p>{t('Claude Desktop·Claude Code 또는 Codex Desktop·CLI의 로그인 상태를 확인한 뒤 트레이 메뉴에서 지금 새로고침을 실행하세요. 서비스 측 제한이나 네트워크 오류가 있으면 마지막 정상 값을 유지합니다.')}</p></details>
              <details><summary>{t('도움이 더 필요해요.')}</summary><p>{locale === 'ko' ? <>민감한 토큰이나 개인정보를 제외한 뒤 <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">GitHub Issues</a>에 Windows 버전, dejavu 버전과 증상을 남겨주세요.</> : <>Remove any sensitive tokens or personal information, then share your Windows version, dejavu version, and symptoms on <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">GitHub Issues</a>.</>}</p></details>
            </section>
          </article>
        </div>
      </main>

      <footer className="guide-footer">
        <a className="brand footer-brand" href={homeUrl}><BrandMark /><span>dejavu</span></a>
        <p>{t('설명서에서 해결되지 않았다면 GitHub Issues로 알려주세요.')}</p>
        <div className="footer-links"><a href={homeUrl}>{t('제품 소개')}</a><a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">{t('문제 신고')}</a><a href={`${repositoryUrl}/blob/main/PRIVACY.md`} target="_blank" rel="noreferrer">{t('개인정보')}</a><a href={`${repositoryUrl}/blob/main/CODE_SIGNING_POLICY.md`} target="_blank" rel="noreferrer">Code signing policy</a></div>
        <small>Free code signing provided by SignPath.io, certificate by SignPath Foundation</small>
      </footer>
    </div>
  )
}

function App() {
  const isGuide = window.location.pathname.replace(/\/+$/, '').endsWith('/guide')
  return <I18nProvider>{isGuide ? <GuidePage /> : <LandingPage />}</I18nProvider>
}

export default App
