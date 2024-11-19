FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /build
COPY . .
RUN scripts/build.sh && rm /build/tmp/appsettings.json

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0 AS run

RUN apt-get update \
  && apt-get install -y libc6-dev libcairo2-dev libgdiplus libpango1.0-dev libpangocairo-1.0-0 locales \
  && locale-gen en_US.UTF-8 \
  && dpkg-reconfigure locales \
  && rm -rf /var/lib/apt/lists/*

ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8

WORKDIR /app

COPY --from=build /build/tmp/ /app/
EXPOSE 80

ENTRYPOINT [ "/app/RealGimm.Web" ]
