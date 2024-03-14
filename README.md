# Playwright_testing
Basic Playwright setup to test various things and reproduce possible Issues that may pop up 


use this command for running tests in Docker:

```
docker run -it --rm --ipc=host --net=host -v $(pwd):/src -w /work mcr.microsoft.com/playwright:v1.42.1 /bin/sh -c "cp -r /src src && cd src && npm --cache /tmp/.npm test -- --update-snapshots  && chown $(id -u):$(id -g) -R snapshots/ && cp -r snapshots/ /src/"
```