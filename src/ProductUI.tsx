import { useI18n } from './i18n'

export function PlatformIcon({ platform }: { platform: 'windows' | 'mac' }) {
  return platform === 'windows' ? (
    <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 3h9v8H2zm11 0h9v8h-9zM2 13h9v8H2zm11 0h9v8h-9z" /></svg>
  ) : (
    <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c.03 3.23 2.83 4.3 2.86 4.31-.02.08-.45 1.54-1.48 3.05-.9 1.3-1.83 2.6-3.3 2.63-1.43.03-1.89-.85-3.53-.85-1.64 0-2.15.82-3.5.88-1.42.05-2.5-1.41-3.4-2.71-1.84-2.66-3.24-7.51-1.35-10.78.94-1.63 2.61-2.66 4.42-2.69 1.38-.02 2.68.94 3.52.94.85 0 2.43-1.16 4.09-.99.69.03 2.63.28 3.88 2.11-.1.07-2.31 1.34-2.28 4.1zM14.35 4.56c.75-.91 1.25-2.18 1.11-3.44-1.08.05-2.39.72-3.17 1.63-.7.8-1.32 2.08-1.15 3.31 1.2.09 2.43-.61 3.21-1.5z" /></svg>
  )
}

export function FirstRunNotice({ platform }: { platform: 'windows' | 'mac' }) {
  const { locale } = useI18n()
  const ko = locale === 'ko'
  return <aside className="first-run-note" aria-label={ko ? '첫 실행 안내' : 'First launch'}>
    <span className="notice-icon" aria-hidden="true">i</span>
    <div><strong>{ko ? '처음 실행할 때 확인하세요' : 'Before your first launch'}</strong>
      {platform === 'windows' ? <p>{ko ? 'Windows SmartScreen 경고가 표시될 수 있습니다. 공식 배포 파일인지 확인한 뒤 ' : 'Windows may show a SmartScreen warning. Verify that the file is an official download, then choose '}<b>{ko ? '추가 정보 → 실행' : 'More info → Run anyway'}</b>{ko ? '을 선택하세요.' : '.'}</p>
      : <p>{ko ? '현재 배포본은 Apple 공증 전입니다. 실행이 차단되면 시스템 설정 → 개인정보 보호 및 보안에서 ' : 'This build is not yet notarized by Apple. If macOS blocks it, go to System Settings → Privacy & Security and choose '}<b>{ko ? '확인 없이 열기' : 'Open Anyway'}</b>{ko ? '를 선택하세요.' : '.'}</p>}
    </div>
  </aside>
}
