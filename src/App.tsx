import { I18nProvider, LanguageSwitcher, useI18n } from './i18n'
import LandingPage from './LandingPage'
import { FirstRunNotice, PlatformIcon } from './ProductUI'
const repositoryUrl = 'https://github.com/taeminHan/dejavu'
const fallbackWindowsDownloadUrl = `${repositoryUrl}/releases/latest/download/dejavu-Setup.exe`
const fallbackMacReleaseUrl = `${repositoryUrl}/releases/latest`
const homeUrl = '/dejavu/'
function BrandMark() { return <img className="brand-mark" src={`${import.meta.env.BASE_URL}brand-mark.svg`} alt="" /> }

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
          <a className="nav-download" href="#install">{t('다운로드')}</a>
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
              <div className="guide-platforms">
                <section className="guide-platform-card">
                  <div className="platform-card-heading"><PlatformIcon platform="windows" /><h3>Windows</h3></div>
                  <ol className="guide-steps compact">
                    <li><strong>{t('설치 프로그램 받기')}</strong><span><a href={fallbackWindowsDownloadUrl}>dejavu-Setup.exe</a>{locale === 'ko' ? '를 내려받습니다.' : ' to begin.'}</span></li>
                    <li><strong>{t('설치 실행')}</strong><span>{t('설치 파일을 실행하면 현재 Windows 사용자 계정에 설치됩니다. 관리자 권한은 필요하지 않습니다.')}</span></li>
                    <li><strong>{t('SmartScreen 확인')}</strong><span>{locale === 'ko' ? 'Windows SmartScreen 경고가 표시될 수 있습니다. 아래 첫 실행 안내를 확인하세요.' : 'Windows may display a SmartScreen warning. See the first-launch note below.'}</span></li>
                  </ol>
                  <p className="platform-requirement">Windows 10+ · x64</p><p>{locale === 'ko' ? 'Windows 10에서는 일부 기능이 제한됩니다.' : 'Some features are limited on Windows 10.'}</p><FirstRunNotice platform="windows" />
                </section>
                <section className="guide-platform-card">
                  <div className="platform-card-heading"><PlatformIcon platform="mac" /><h3>macOS</h3></div>
                  <ol className="guide-steps compact">
                    <li><strong>{t('DMG 받기')}</strong><span><a href={fallbackMacReleaseUrl}>GitHub Release</a>{locale === 'ko' ? '에서 Dejavu-macOS-arm64.dmg를 내려받습니다.' : ' and download Dejavu-macOS-arm64.dmg.'}</span></li>
                    <li><strong>{t('응용 프로그램으로 복사')}</strong><span>{t('DMG를 열고 Dejavu를 Applications 폴더로 드래그합니다.')}</span></li>
                    <li><strong>{t('첫 실행 승인')}</strong><span>{t('현재 무료 배포본은 Apple 공증 전입니다. 앱을 한 번 연 뒤 시스템 설정 → 개인정보 보호 및 보안에서 확인 없이 열기를 선택합니다.')}</span></li>
                  </ol>
                  <p className="platform-requirement">macOS 14+ · Apple silicon</p><FirstRunNotice platform="mac" />
                </section>
              </div>
              <div className="guide-note"><strong>{t('연결 준비')}</strong><span>{t('Claude CLI 또는 Codex Desktop·CLI 중 사용할 서비스가 이 기기에 설치되어 있어야 합니다.')}</span></div>
            </section>

            <section className="guide-section" id="first-run">
              <p className="guide-number">02</p><h2>{t('처음 시작')}</h2>
              <p>{t('dejavu는 별도 계정을 만들지 않습니다. 이 기기에 설치된 Claude와 Codex의 로컬 로그인 상태를 사용합니다.')}</p>
              <div className="guide-grid">
                <div><h3>Claude</h3><p>{t('Claude CLI 상태 표시 연결로 5시간·주간 사용률을 읽습니다. Fable은 설정에서 확장 접근을 명시적으로 켠 경우에만 추가됩니다.')}</p></div>
                <div><h3>Codex</h3><p>{t('Codex Desktop의 내장 런타임 또는 별도 CLI의 공식 로컬 app-server에서 사용률을 읽습니다.')}</p></div>
              </div>
              <p className="guide-muted">{t('토큰, 프롬프트와 대화 내용은 dejavu 설정 파일에 저장하지 않습니다.')}</p>
            </section>

            <section className="guide-section" id="widget">
              <p className="guide-number">03</p><h2>{t('위젯 사용')}</h2>
              <ul className="guide-list">
                <li><strong>{t('Windows 위젯')}</strong><span>{t('바탕화면 위젯의 크기, 한 줄·두 줄 배치와 위치를 작업 환경에 맞게 조정합니다.')}</span></li>
                <li><strong>{t('macOS 메뉴 막대')}</strong><span>{t('Claude 5시간·주간·Fable과 Codex 중 원하는 지표를 여러 개 골라 메뉴 막대에 표시합니다.')}</span></li>
                <li><strong>{t('플로팅 오버레이')}</strong><span>{t('macOS에서는 플로팅 오버레이를 켜거나 끌 수 있습니다. 꺼도 메뉴 막대 앱과 업데이트는 계속 동작합니다.')}</span></li>
                <li><strong>{t('표시 값')}</strong><span>{t('퍼센트와 진행률 막대는 같은 값과 임계 색상을 사용하며, 없는 값은 --%로 표시합니다.')}</span></li>
              </ul>
              <div className="guide-note"><strong>{t('macOS 시스템 위젯')}</strong><span>{t('Desktop과 알림 센터용 시스템 위젯은 Apple Developer 서명 전 무료 배포의 보장 기능에 포함되지 않습니다.')}</span></div>
            </section>

            <section className="guide-section" id="settings">
              <p className="guide-number">04</p><h2>{t('설정 안내')}</h2>
              <div className="guide-grid three">
                <div><h3>{t('서비스와 지표')}</h3><p>{t('Claude와 Codex 표시 여부, 메뉴 막대 지표, Fable과 플로팅 오버레이를 각자 선택합니다.')}</p></div>
                <div><h3>{t('모양')}</h3><p>{t('크기, 배치, 진행률과 사용량 임계 색상을 작업 환경에 맞게 조정합니다.')}</p></div>
                <div><h3>{t('동작')}</h3><p>{t('새로고침과 시작 동작, 업데이트 확인 여부를 설정합니다.')}</p></div>
              </div>
              <div className="guide-note"><strong>{t('설정 저장')}</strong><span>{t('변경 내용은 자동 저장되며 위젯에 즉시 반영됩니다.')}</span></div>
            </section>

            <section className="guide-section" id="updates">
              <p className="guide-number">05</p><h2>{t('업데이트')}</h2>
              <p>{t('Windows와 macOS는 같은 제품 버전과 GitHub Release를 사용합니다. Windows는 Velopack, macOS는 Sparkle을 통해 새 버전을 확인합니다.')}</p>
              <p>{t('자동 확인을 끄더라도 설정에서 수동 확인할 수 있습니다. macOS 업데이트 ZIP은 Sparkle EdDSA 서명으로 무결성을 확인합니다.')}</p>
            </section>

            <section className="guide-section" id="uninstall">
              <p className="guide-number">06</p><h2>{t('완전 제거')}</h2>
              <div className="guide-grid">
                <div><h3>Windows</h3><p>{t('설정 → 앱 → 설치된 앱에서 dejavu를 제거합니다. 앱과 시작프로그램 등록, dejavu 로컬 데이터가 함께 정리됩니다.')}</p></div>
                <div><h3>macOS</h3><p>{t('Applications의 Dejavu를 휴지통으로 옮깁니다. 설정까지 초기화하려면 ~/Library/Application Support/dejavu 폴더를 별도로 삭제합니다.')}</p></div>
              </div>
              <div className="guide-note safe"><strong>{t('연결 앱 데이터는 유지됩니다')}</strong><span>{t('Claude와 Codex 앱의 로그인 정보, 설정 및 대화 데이터는 삭제하지 않습니다.')}</span></div>
            </section>

            <section className="guide-section" id="troubleshooting">
              <p className="guide-number">07</p><h2>{t('문제 해결')}</h2>
              <details><summary>{t('위젯이 보이지 않아요.')}</summary><p>{t('Windows는 알림 영역에서 위젯 표시 상태를 확인하세요. macOS는 메뉴 막대의 dejavu를 열어 플로팅 오버레이를 다시 켤 수 있습니다.')}</p></details>
              <details><summary>{t('Claude 또는 Codex 하나만 표시돼요.')}</summary><p>{t('자동 감지는 로그인과 로컬 실행 환경이 준비된 서비스만 표시합니다. 두 서비스를 항상 표시하려면 설정의 표시할 서비스에서 Claude + Codex를 선택하세요.')}</p></details>
              <details><summary>{t('사용량이 갱신되지 않아요.')}</summary><p>{t('Claude CLI 또는 Codex Desktop·CLI의 로그인 상태를 확인한 뒤 메뉴에서 지금 새로고침을 실행하세요. 서비스 측 제한이나 네트워크 오류가 있으면 마지막 정상 값을 유지합니다.')}</p></details>
              <details><summary>{t('macOS 앱이 열리지 않아요.')}</summary><p>{t('현재 무료 배포본은 Apple 공증 전입니다. 앱을 한 번 실행한 뒤 시스템 설정 → 개인정보 보호 및 보안 → 보안에서 확인 없이 열기를 선택하세요.')}</p></details>
              <details><summary>{t('도움이 더 필요해요.')}</summary><p>{locale === 'ko' ? <>민감한 토큰이나 개인정보를 제외한 뒤 <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">GitHub Issues</a>에 운영체제 버전, dejavu 버전과 증상을 남겨주세요.</> : <>Remove sensitive tokens or personal information, then share your operating-system version, dejavu version, and symptoms on <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">GitHub Issues</a>.</>}</p></details>
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
