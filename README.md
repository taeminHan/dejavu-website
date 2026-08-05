# dejavu website

dejavu 소개 및 다운로드를 위한 React + Vite 정적 웹사이트입니다.

Windows 앱의 소스와 Release는 [`taeminHan/dejavu`](https://github.com/taeminHan/dejavu)에서 관리합니다. 이 저장소는 소개 페이지, 사용 설명서와 웹 배포 설정만 포함합니다.

- 제품 소개: `https://taemtaem.dev/dejavu/`
- 사용 설명서: `https://taemtaem.dev/dejavu/guide/`

## Development

```powershell
pnpm install
pnpm dev
```

## Production build

```powershell
pnpm build
```

생성되는 `dist` 폴더의 내용은 `https://taemtaem.dev/dejavu/` 경로를 기준으로 빌드됩니다. 별도 서버 런타임이나 환경 변수는 필요하지 않습니다.

다운로드 버튼은 GitHub API 응답을 기다리지 않고 최신 Release의 고정 자산명 `dejavu-Setup.exe`를 직접 내려받습니다. GitHub API는 버전 표시와 휴대용 ZIP 링크를 제공할 때만 사용합니다.

## Docker

`main` 브랜치의 빌드와 정적 검사가 성공하면 GitHub Actions가 `linux/amd64`와 `linux/arm64` 이미지를 함께 빌드해 GHCR에 게시합니다.

- 최신 이미지: `ghcr.io/taeminhan/dejavu-website:latest`
- 커밋별 이미지: `ghcr.io/taeminhan/dejavu-website:sha-<commit>`

이미지는 `/dejavu/` 경로를 8080 포트로 제공합니다. 서버의 Compose 파일은 [`deploy/docker-compose.example.yml`](deploy/docker-compose.example.yml)을 기준으로 구성합니다.

`main`에 반영된 이미지는 `production` 환경의 SSH 설정을 사용해 서버에도 자동 배포됩니다. 배포 작업은 새 이미지를 받은 뒤 컨테이너가 정상 상태가 될 때까지 확인합니다.

필요한 Environment secrets:

- `DEPLOY_HOST`
- `DEPLOY_SSH_KEY`
- `DEPLOY_KNOWN_HOSTS`

필요한 Environment variables:

- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_PATH`

문제가 생겼을 때 서버에서 수동으로 갱신하려면:

```bash
docker compose -f dejavu-compose.yml pull
docker compose -f dejavu-compose.yml up -d --remove-orphans
```

GHCR 패키지는 처음 게시된 직후 기본적으로 비공개입니다. GitHub의 패키지 설정에서 한 번만 공개로 변경하면 서버에서 별도 로그인 없이 이미지를 받을 수 있습니다.

기존 `taemtaem.dev` Nginx 컨테이너와 `dejavu-site` 컨테이너를 `f1ti_default` 네트워크에 연결한 뒤, HTTPS 서버의 기존 `location /`보다 앞에 `deploy/taemtaem-nginx-location.conf` 내용을 추가합니다. `proxy_pass` 뒤에 슬래시를 붙이지 않아 `/dejavu/` 요청 경로가 그대로 유지되어야 합니다.
