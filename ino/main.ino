#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>

#define API_KEY "AIzaSyAeW-oRdds8R8GpJ08isjYwxD24yH9h8-I"
#define DATABASE_URL "https://sensor-mqs-default-rtdb.firebaseio.com/"

void dataCollect(){
  heart_pulse = ReadPin(mq2sensor);    
  tempeture = ReadPin(mq8sensor); 
 
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/Valor",sensorvalueMQ2);
  Firebase.RTDB.setInt(&fbdo, "MQ8 Sensor/Valor",sensorvalueMQ8);
  Firebase.RTDB.setInt(&fbdo, "MQ9 Sensor/Valor",sensorvalueMQ9);
}