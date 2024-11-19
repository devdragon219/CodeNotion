FROM docker.io/library/jetty:9.4-jre11

RUN rm -rf /var/lib/jetty/webapps/ROOT
COPY inmemory.war /var/lib/jetty/webapps/inmemory.war

EXPOSE 8081

CMD ["java","-jar","/usr/local/jetty/start.jar","jetty.http.port=8081"]